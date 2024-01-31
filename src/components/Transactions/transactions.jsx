import React, { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../home/menu";
import { statesEnum } from "../../utils/enums";
import "./transactions_styles.css";
import TransactionButton from "../elements/transaction_button";
import TransactionItem from "./transaction_item";
import TransactionFilter from "./transactions_filter";
import { transactionService } from "../../services/transactions/transactions";
import {
  resetTransactionsData,
  setTransactionsData,
  updateTransactionsData,
} from "../../features/transactions/transactions";
import { FaArrowUp } from "react-icons/fa";
import { MemoizedNoTransactions } from "./transactions_constant_components";
import Text from "../elements/text";
import Button from "../elements/button";

const Transactions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const transactionsObserver = useRef();
  const transactionsContainer = useRef(null);
  const fetchState = useSelector((state) => state.fetchState);
  const { transactions, transactionsCount, isDataFetched } = useSelector(
    (state) => state.transactionData
  );
  const [transactionsFetched, setTransactionsFetcing] = useState(false);
  const [hasQueries, setHasQueries] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTransactionsFetcing(true);
      const queryParams = new URLSearchParams(location.search);
      const queries = {};
      queryParams.forEach((value, key) => {
        if (["sort", "order", "date", "fromdate", "todate"].includes(key)) {
          queries[key] = value;
        } else {
          queries[key] = value.split(",");
        }
      });
      Object.keys(queries).length > 0
        ? setHasQueries(true)
        : setHasQueries(false);

      const { status, data } = await transactionService(
        {},
        "get",
        `?skip=${transactions?.length || 0}`,
        queries
      );
      if (status === 200) {
        console.log("herer");
        dispatch(
          updateTransactionsData({
            transactionsCount: data?.transactionsCount,
            transactions: data.transactions,
          })
        );
      }
      setTransactionsFetcing(false);
    }
    if (!isDataFetched) {
      fetchData();
    }
    return () => {
      const queryParams = new URLSearchParams(location.search);
      const hasQueryParams = queryParams.keys().next().done === false;
      if (hasQueryParams) {
        dispatch(resetTransactionsData());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2500) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lastTransactionElementRef = useCallback(
    (node) => {
      if (fetchState.state === statesEnum.LOADING) return;
      if (transactionsObserver.current)
        transactionsObserver.current.disconnect();
      transactionsObserver.current = new IntersectionObserver(
        async (entries) => {
          if (
            entries[0].isIntersecting &&
            transactions.length < transactionsCount
          ) {
            let pageNumber = transactions.length;
            const queryParams = new URLSearchParams(location.search);
            const queries = {};
            queryParams.forEach((value, key) => {
              if (
                ["sort", "order", "date", "fromdate", "todate"].includes(key)
              ) {
                queries[key] = value;
              } else {
                queries[key] = value.split(",");
              }
            });

            const { status, data } = await transactionService(
              {},
              "get",
              `?skip=${pageNumber}`,
              queries
            );
            if (status === 200) {
              dispatch(
                setTransactionsData({
                  transactionsCount: data?.transactionsCount,
                  transactions: data.transactions,
                })
              );
            }
          }
        }
      );
      if (node) transactionsObserver.current.observe(node);
    },
    [dispatch, fetchState, location, transactions, transactionsCount]
  );

  const updateDeleteTransactions = (id) => {
    let removedIndex = transactions.findIndex((obj) => obj._id === id);
    if (removedIndex !== -1) {
      let updatedTransactions = [
        ...transactions.slice(0, removedIndex),
        ...transactions.slice(removedIndex + 1),
      ];
      dispatch(
        updateTransactionsData({
          transactionsCount: transactionsCount - 1,
          transactions: updatedTransactions,
        })
      );
    }
  };

  const handleResetFilters = () => {
    dispatch(resetTransactionsData());
    navigate("/transactions");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <TransactionFilter transactionsCount={transactionsCount} />
      {transactions.length > 0 ? (
        <div
          className="transactions-list-container"
          ref={transactionsContainer}
        >
          {hasQueries ? (
            <div className="transaction-list-query-reset-container">
              <Text
                content={`${transactionsCount}  ${
                  transactionsCount > 1 ? " Transactions" : " Transaction"
                }`}
                align="left"
                m="0"
                size="16px"
                weight="500"
                background="#202020"
                color="#FFFFFF"
                borderRadius="8px"
                p="5px 8px"
                width="fit-content"
              />
              <Button
                content="Reset Filters"
                border="solid 1px #f44336"
                borderRadius="8px"
                backgroundColor="transparent"
                color="#f44336"
                width="140px"
                height="33px"
                fontSize="16px"
                fontWeight="600"
                icon="delete"
                iconPosition="end"
                handleClick={handleResetFilters}
              />
            </div>
          ) : null}
          {transactions.map((eachTransaction, index) => (
            <TransactionItem
              updateDeleteTransactions={updateDeleteTransactions}
              key={eachTransaction._id}
              transactionsLength={transactions.length}
              index={index}
              lastTransactionElementRef={lastTransactionElementRef}
              transactionItem={eachTransaction}
            />
          ))}
          {scrollTop ? (
            <button
              className="transaction-scroll-top-btn"
              onClick={scrollToTop}
            >
              <FaArrowUp />
            </button>
          ) : null}
        </div>
      ) : null}
      {fetchState.state === statesEnum.LOADING ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((eachItem) => (
            <Skeleton
              variant="rectangular"
              width="95%"
              height={70}
              animation="wave"
              sx={{ mt: 1, borderRadius: "8px" }}
              key={eachItem}
            />
          ))}
        </div>
      ) : null}
      {transactions.length === 0 && !transactionsFetched ? (
        <MemoizedNoTransactions
          hasQueries={hasQueries}
          handleResetFilters={handleResetFilters}
        />
      ) : null}
      <TransactionButton />
      <Menu />
    </>
  );
};

export default Transactions;
