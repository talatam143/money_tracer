import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import InputField from "../elements/input_field";
import TransactionsFilterIcon from "../../assets/transactions_filter";
import { TbArrowsSort } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { resetTransactionsData } from "../../features/transactions/transactions";
import { queryDataEnums } from "../../utils/enums";
import {
  transactionFilterHeaders,
  transactionSortOptions,
} from "../../utils/transactions_form_data";
import Text from "../elements/text";
import TransactionFilterLayer from "./transaction_filter_layout";

const intialFilters = {
  categories: [],
  paymentMethods: [],
  banks: [],
  UPI: [],
  creditCards: [],
  date: "",
  fromdate: "",
  todate: "",
  monthly: true,
};

const TransactionFilter = (props) => {
  const { transactionsCount } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [monthlyFilter, setMonthlyFilter] = useState(true);
  const [sortOptions, setSortOptions] = useState("reset");
  const [toggleFilters, setToggleFilters] = useState(false);
  const [filterType, setFilterType] = useState("sort");
  const [searchfield, setSearchField] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(intialFilters);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queries = {};
    queryParams.forEach((value, key) => {
      queries[key] = value;
    });

    if (queryParams.get("monthly") !== "true") {
      setMonthlyFilter(false);
    }

    let queryKeys = Object.keys(queries);

    if (
      queryKeys.includes("sort") &&
      queryDataEnums.sort.includes(queries.sort)
    ) {
      setSortOptions(
        `${queries["sort"]}-${
          queryDataEnums.order.includes(queries.order) ? queries.order : "asec"
        }`
      );
    } else {
      setSortOptions("reset");
    }
    if (queryKeys.includes("searchfield")) {
      setSearchField(queries["searchfield"]);
    } else {
      setSearchField("");
    }
    if (queryKeys.includes("monthly") && queries.monthly === "false") {
      setMonthlyFilter(false);
    }
    Object.keys(selectedFilters).forEach((eachFilter) => {
      if (queryKeys.includes(eachFilter)) {
        setSelectedFilters((prevSelectedCategories) => ({
          ...prevSelectedCategories,
          [eachFilter]: queries[eachFilter].split(","),
        }));
      } else {
        setSelectedFilters((prevSelectedCategories) => ({
          ...prevSelectedCategories,
          [eachFilter]: [],
        }));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSortOption = (e) => {
    const urlParams = new URLSearchParams(location.search);
    let value = e.target.value;
    if (value === "reset") {
      setSortOptions("reset");
      urlParams.delete("sort");
      urlParams.delete("order");
    } else {
      setSortOptions(value);
      urlParams.set("sort", value.split("-")[0]);
      urlParams.set("order", value.split("-")[1]);
    }
    navigate(`?${urlParams.toString()}`);
    dispatch(resetTransactionsData());
    setToggleFilters(false);
  };

  const handleCategoryChange = (name, value) => {
    setSelectedFilters((prevSelectedCategories) => ({
      ...prevSelectedCategories,
      [name]: prevSelectedCategories[name].includes(value)
        ? prevSelectedCategories[name].filter((category) => category !== value)
        : [...prevSelectedCategories[name], value],
    }));
  };

  const handleDateChange = (value) => {
    setSelectedFilters((prevSelectedCategories) => ({
      ...prevSelectedCategories,
      date: `${value.$y}-${value.$M + 1}-${value.$D}`,
    }));
  };

  const handleToggleFilters = (type) => {
    setFilterType(type);
    setToggleFilters(!toggleFilters);
  };

  const handleFiltersQuery = () => {
    const urlParams = new URLSearchParams(location.search);
    let oldString = urlParams.toString();
    for (const key of urlParams.keys()) {
      urlParams.delete(key);
    }
    Object.keys(selectedFilters).forEach((eachFilter) => {
      if (
        ["date", "fromdate", "todate"].includes(eachFilter) &&
        selectedFilters[eachFilter].length > 0
      ) {
        urlParams.set(eachFilter, selectedFilters[eachFilter]);
      } else if (selectedFilters[eachFilter].length > 0) {
        urlParams.set(eachFilter, selectedFilters[eachFilter].join(","));
      }
    });
    if (urlParams.toString().length > 0 && oldString !== urlParams.toString()) {
      navigate(`?${urlParams.toString()}`);
      dispatch(resetTransactionsData());
      setToggleFilters(false);
    }
  };

  const handleSearchChange = (e) => {
    let value = "";
    if (e.target.value === "\\") {
      value = "";
    } else {
      value = e.target.value;
    }
    setSearchField(value);
    const urlParams = new URLSearchParams(location.search);
    if (value.length === 0) {
      urlParams.delete("searchfield");
      navigate(`?${urlParams.toString()}`);
      dispatch(resetTransactionsData());
    } else if (value.length >= 3) {
      urlParams.set("searchfield", value);
      navigate(`?${urlParams.toString()}`);
      dispatch(resetTransactionsData());
    }
  };

  const handleMonthlyFilter = (type) => {
    const urlParams = new URLSearchParams(location.search);

    if (type === "monthly" && monthlyFilter === false) {
      setMonthlyFilter(true);
      let oldString = urlParams.toString();
      for (const key of urlParams.keys()) {
        urlParams.delete(key);
      }
      urlParams.set("monthly", true);
      if (
        urlParams.toString().length > 0 &&
        oldString !== urlParams.toString()
      ) {
        navigate(`?${urlParams.toString()}`);
        dispatch(resetTransactionsData());
        setToggleFilters(false);
      }
    } else if (type === "all" && monthlyFilter === true) {
      setMonthlyFilter(false);
      dispatch(resetTransactionsData());
      navigate("/transactions?monthly=false");
    }
  };

  return (
    <div className="transaction-filter-container">
      <div className="transaction-filter-search-container">
        <InputField
          width="100%"
          icon="search"
          type="search"
          margin="-2px 0 0 0"
          placeholder="Search Transactions"
          fontSize="30px"
          value={searchfield}
          onChange={handleSearchChange}
        />
        <button
          className="transaction-filter-button"
          onClick={() => handleToggleFilters("filters")}
          disabled={transactionsCount > 0 ? false : true}
        >
          <TransactionsFilterIcon />
        </button>
        <button
          className="transaction-filter-button"
          onClick={() => handleToggleFilters("sort")}
          disabled={transactionsCount > 0 ? false : true}
        >
          <TbArrowsSort fontSize={30} />
        </button>
      </div>
      <div className="transactions-month-filter-container">
        <button
          className={
            monthlyFilter
              ? "transactions-monthly-filter-active-btn"
              : "transactions-monthly-filter-inactive-btn"
          }
          onClick={() => handleMonthlyFilter("monthly")}
        >
          {new Date().toLocaleDateString("en-US", { month: "long" })}{" "}
          Transactions
        </button>
        <button
          onClick={() => handleMonthlyFilter("all")}
          className={
            !monthlyFilter
              ? "transactions-all-filter-active-btn"
              : "transactions-all-filter-inactive-btn"
          }
        >
          All-Time Transactions
        </button>
      </div>
      <SwipeableDrawer
        anchor="bottom"
        open={toggleFilters}
        onClose={handleToggleFilters}
        onOpen={handleToggleFilters}
        sx={{
          "& .MuiPaper-root.MuiDrawer-paper": {
            backgroundColor: "antiquewhite",
            borderRadius: "18px 18px 0 0",
            height: filterType === "sort" ? null : "70dvh",
            overflowY: "auto",
          },
        }}
      >
        <div className="transactions-filter-header-container">
          <Text
            content={
              filterType === "sort"
                ? "Sort Transactions"
                : "Filter Transactions"
            }
            p="15px 15px 0 15px"
            m="5px 0 10px 0"
            weight="600"
            size="22px"
            color="#202020"
          />
        </div>

        {filterType === "sort" ? (
          <div className="transaction-filter-radio-container">
            {transactionSortOptions.map((eachOption) => (
              <div
                key={eachOption.value}
                className="transaction-filter-radio-items"
              >
                <input
                  type="radio"
                  value={eachOption.value}
                  id={eachOption.value}
                  name="sort-transactions"
                  checked={sortOptions === eachOption.value}
                  onChange={handleSortOption}
                />
                <label
                  htmlFor={eachOption.value}
                  className="transaction-filter-radio-label"
                >
                  {eachOption.name}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="transaction-filter-settings-container">
            {transactionFilterHeaders.map((eachFilter) => {
              return eachFilter.name === "date" && monthlyFilter ? null : (
                <div
                  key={eachFilter.displayText}
                  className="transaction-filter-each-settings-container"
                >
                  <Text
                    m="0"
                    p="0"
                    weight="600"
                    size="18px"
                    color="#000000"
                    content={`${eachFilter.displayText} ${
                      selectedFilters[eachFilter.name].length > 0
                        ? eachFilter.name === "date"
                          ? " (1)"
                          : ` (${selectedFilters[eachFilter.name].length})`
                        : ""
                    }`}
                  />
                  <TransactionFilterLayer
                    filterOption={eachFilter}
                    selectedFilters={selectedFilters}
                    handleCategoryChange={handleCategoryChange}
                    handleDateChange={handleDateChange}
                  />
                </div>
              );
            })}
          </div>
        )}
      </SwipeableDrawer>
    </div>
  );
};

export default TransactionFilter;
