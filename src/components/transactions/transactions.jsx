import React, { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
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
import TransactionForm from "./transactionForm/transaction_form";

const Transactions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const transactionsObserver = useRef();
  const transactionsContainer = useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const [editTransaction, setEditTransaction] = useState(false);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const fetchState = useSelector((state) => state.fetchState);
  const {
    transactions,
    transactionsCount,
    isDataFetched,
    totalTransactionsAmount,
  } = useSelector((state) => state.transactionData);
  const [transactionsFetched, setTransactionsFetcing] = useState(false);
  const [hasQueries, setHasQueries] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setTransactionsFetcing(true);

      let queries = constructQueries();
      if (
        (Object.keys(queries).length === 3 ||
          Object.keys(queries).length === 1) &&
        Object.keys(queries).includes("monthly")
      ) {
        setHasQueries(false);
      } else if (Object.keys(queries).length > 0) {
        setHasQueries(true);
      } else {
        setHasQueries(false);
      }

      const { status, data } = await transactionService(
        {},
        "get",
        `?skip=${transactions?.length || 0}`,
        queries
      );
      if (status === 200) {
        dispatch(
          updateTransactionsData({
            transactionsCount: data?.transactionsCount,
            totalAmount: data?.totalAmount,
            transactions: data.transactions,
          })
        );
      }
      setTransactionsFetcing(false);
    }
    if (!isDataFetched && isUserLoggedIn) {
      fetchData();
    }
    return () => {
      const queryParams = new URLSearchParams(location.search);
      const hasQueryParams = queryParams.keys().next().done === false;
      if (hasQueryParams) {
        dispatch(resetTransactionsData());
      }
      localStorage.removeItem("ur-ti");
      localStorage.removeItem("tr-ln");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isUserLoggedIn]);

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
            let queries = constructQueries();
            const { status, data } = await transactionService(
              {},
              "get",
              `?skip=${localStorage.getItem("tr-ln") || transactions?.length}`,
              queries
            );
            if (status === 200) {
              localStorage.removeItem("tr-ln");
              dispatch(
                setTransactionsData({
                  transactionsCount: data?.transactionsCount,
                  totalAmount: data?.totalAmount,
                  transactions: data.transactions,
                })
              );
            }
          }
        }
      );
      if (node) transactionsObserver.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, fetchState, location, transactions, transactionsCount]
  );

  const constructQueries = () => {
    const queryParams = new URLSearchParams(location.search);
    const queries = {};
    queryParams.forEach((value, key) => {
      if (["sort", "order", "date", "fromdate", "todate"].includes(key)) {
        queries[key] = value;
      } else {
        queries[key] = value.split(",");
      }
    });
    let toDate = "";
    let currDate = new Date();
    if (currDate.getMonth() === 11) {
      toDate = `${currDate.getFullYear() + 1}-1-1`;
    } else {
      toDate = `${currDate.getFullYear()}-${currDate.getMonth() + 2}-1`;
    }
    let fromDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-1`;

    if (queryParams.get("monthly") === "true") {
      queries.fromdate = fromDate;
      queries.toDate = toDate;
    }
    return queries;
  };

  const updateDeleteTransactions = (id) => {
    let tempTransactions = transactions.filter((obj) => obj._id !== id);
    localStorage.setItem("tr-ln", tempTransactions.length);
    dispatch(
      updateTransactionsData({
        transactionsCount: transactionsCount - 1,
        transactions: tempTransactions,
      })
    );
  };

  const handleResetFilters = () => {
    const queryParams = new URLSearchParams(location.search);

    dispatch(resetTransactionsData());
    if (queryParams.get("monthly") === "false") {
      navigate("/transactions?monthly=false");
    } else {
      navigate("/transactions?monthly=true");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return !editTransaction ? (
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
                borderRadius="50px"
                p="5px 8px"
                width="fit-content"
              />
              <Button
                content="Reset Filters"
                border="solid 1px #f44336"
                borderRadius="50px"
                backgroundColor="transparent"
                color="#f44336"
                width="135px"
                height="28px"
                fontSize="16px"
                fontWeight="600"
                icon="delete"
                iconPosition="end"
                handleClick={handleResetFilters}
              />
            </div>
          ) : null}
          {queryParams.get("monthly") === "true" && totalTransactionsAmount ? (
            <div className="transactions-monthly-container">
              <div className="transactions-monthly-count-container">
                <HiOutlineClipboardDocumentList size={50} />
                <div>
                  <Text
                    content={transactionsCount}
                    m="0"
                    size="20px"
                    weight="600"
                  />
                  <Text content="Transactions" m="0" size="15px" />
                </div>
              </div>
              <div>
                <Text
                  content={`₹ ${totalTransactionsAmount}`}
                  m="0"
                  size="20px"
                  weight="600"
                />
                <Text content="Amount" m="0" size="15px" />
              </div>
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
              setEditTransaction={setEditTransaction}
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
  ) : (
    <TransactionForm setEditTransaction={setEditTransaction} />
  );
};

export default Transactions;
