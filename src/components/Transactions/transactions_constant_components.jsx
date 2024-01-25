import React from "react";
import NoTransactions from "../../assets/no_transactions";
import Text from "../elements/text";

export const MemoizedNoTransactions = React.memo(() => (
  <div className="no-transactions-container">
    <NoTransactions />
    <Text
      content="No Transactions found."
      m="10px 0 0 0"
      weight="600"
      size="24px"
    />

    <Text
      content="Click the add button to add a new transaction."
      m="5px 0 0 0"
      weight="500"
      size="22px"
      align="center"
    />
  </div>
));
