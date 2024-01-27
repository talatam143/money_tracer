import React, { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Menu from "../home/menu";
import { statesEnum } from "../../utils/enums";
import "./transactions_styles.css";
import TransactionButton from "../elements/transaction_button";
import TransactionItem from "./transaction_item";
import TransactionFilter from "./transactions_filter";
import { transactionService } from "../../services/transactions/transactions";
import {
  setTransactionsData,
  updateTransactionsData,
} from "../../features/transactions/transactions";
import { MemoizedNoTransactions } from "./transactions_constant_components";

const Transactions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const transactionsObserver = useRef();
  const transactionsContainer = useRef(null);
  const fetchState = useSelector((state) => state.fetchState);
  const { transactions, transactionsCount, isDataFetched } = useSelector(
    (state) => state.transactionData
  );
  const [transactionsFetched, setTransactionsFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const queryParams = new URLSearchParams(location.search);
      const queries = {};
      queryParams.forEach((value, key) => {
        queries[key] = value;
      });

      const { status, data } = await transactionService(
        {},
        "get",
        `?skip=${transactions?.length || 0}`,
        queries
      );
      if (status === 200) {
        dispatch(
          setTransactionsData({
            transactionsCount: data?.transactionsCount,
            transactions: data.transactions,
          })
        );
        setTransactionsFetched(true);
      }
    }
    if (!isDataFetched || transactions.length < transactionsCount) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              queries[key] = value;
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

  return (
    <>
      {transactions.length > 0 ? (
        <div
          className="transactions-list-container"
          ref={transactionsContainer}
        >
          <TransactionFilter />
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((eachItem) => (
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
      {transactions.length === 0 && transactionsFetched ? (
        <MemoizedNoTransactions />
      ) : null}
      <TransactionButton />
      <Menu />
    </>
  );
};

export default Transactions;
