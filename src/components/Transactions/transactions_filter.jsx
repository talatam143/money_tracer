import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputField from "../elements/input_field";
import TransactionsFilterIcon from "../../assets/transactions_filter";

const TransactionFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortOptions, setSortOptions] = useState("");

  const handleSortOption = (e) => {
    const urlParams = new URLSearchParams(location.search);
    let value = e.target.value;
    if (value === "reset") {
      setSortOptions("");
      urlParams.delete("sort");
      urlParams.delete("order");
    } else {
      setSortOptions(value);
      urlParams.set("sort", value.split("-")[0]);
      urlParams.set("order", value.split("-")[1]);
    }
    navigate(`?${urlParams.toString()}`);
  };

  return (
    <div className="transaction-filter-container">
      <InputField
        width="100%"
        icon="search"
        type="search"
        margin="-2px 0 0 0"
        placeholder="Search Transactions"
        fontSize="30px"
      />
      <button className="transaction-filter-button">
        <TransactionsFilterIcon />
      </button>
      <div>
        <FormControl
          sx={{
            m: "0 0 0 5px",
            minWidth: 185,
            "& .MuiInputLabel-root": {
              color: "#000000",
              fontWeight: 500,
              fontSize: 18,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#000000",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000000",
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "#000000",
            },
            "& .MuiInputBase-root.MuiInput-root ": {
              borderBottom: "#000000",
            },
            "& .MuiInputBase-root.MuiInput-root:after ": {
              borderBottom: "2px solid #000000",
            },
            "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
              {
                WebkitAppearance: "none",
                appearance: "none",
                margin: 0,
              },
          }}
          size="small"
        >
          <InputLabel id="transaction-sort-filter">Sort</InputLabel>
          <Select
            labelId="transaction-sort-filter"
            value={sortOptions}
            label="Sort"
            onChange={handleSortOption}
            sx={{
              "& .MuiSelect-select.MuiInputBase-input": {
                color: "#000000",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              },
              "& .MuiSvgIcon-root.MuiSelect-icon": {
                fill: "#000000",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000000 !important",
              },
            }}
          >
            <MenuItem value="reset">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"amount-desc"}>Amount: High to Low</MenuItem>
            <MenuItem value={"amount-asec"}>Amount: Low to High</MenuItem>
            <MenuItem value={"transactiondate-desc"}>
              Latest Transactions
            </MenuItem>
            <MenuItem value={"transactiondate-asec"}>Old Transactions</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default TransactionFilter;
