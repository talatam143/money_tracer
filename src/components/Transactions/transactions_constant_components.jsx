import React from "react";
import NoTransactions from "../../assets/no_transactions";
import Text from "../elements/text";
import Button from "../elements/button";

export const MemoizedNoTransactions = React.memo((props) => {
  const { hasQueries, handleResetFilters } = props;

  return (
    <div className="no-transactions-container">
      <NoTransactions />
      <Text
        content="No Transactions found."
        m="10px 0 0 0"
        weight="600"
        size="24px"
      />
      {hasQueries ? (
        <Button
          content="Reset Filters"
          border="none"
          borderRadius="8px"
          backgroundColor="#202020"
          color="#FFFFFF"
          width="140px"
          height="40px"
          fontSize="20px"
          fontWeight="600"
          margin="5px 0 0 0"
          handleClick={handleResetFilters}
        />
      ) : (
        <Text
          content="Click the add button to add a new transaction."
          m="5px 0 0 0"
          weight="500"
          size="22px"
          align="center"
        />
      )}
    </div>
  );
});
