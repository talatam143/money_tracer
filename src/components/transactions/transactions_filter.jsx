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
import Button from "../elements/button";

const intialFilters = {
  categories: [],
  paymentMethods: [],
  banks: [],
  UPI: [],
  creditCards: [],
  date: "",
  fromdate: "",
  todate: "",
};

const TransactionFilter = (props) => {
  const { transactionsCount } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortOptions, setSortOptions] = useState("reset");
  const [toggleFilters, setToggleFilters] = useState(false);
  const [filterType, setFilterType] = useState("sort");
  const [filterOption, setFilterOption] = useState(transactionFilterHeaders[0]);
  const [searchfield, setSearchField] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(intialFilters);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queries = {};
    queryParams.forEach((value, key) => {
      queries[key] = value;
    });

    let queryKeys = Object.keys(queries);
    if (queryKeys?.length > 0) {
      if (
        queryKeys.includes("sort") &&
        queryDataEnums.sort.includes(queries.sort)
      ) {
        setSortOptions(
          `${queries["sort"]}-${
            queryDataEnums.order.includes(queries.order)
              ? queries.order
              : "asec"
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
      Object.keys(selectedFilters).forEach((eachFilter) => {
        if (queryKeys.includes(eachFilter)) {
          setSelectedFilters((prevSelectedCategories) => ({
            ...prevSelectedCategories,
            [eachFilter]: queries[eachFilter].split(","),
          }));
        }
      });
    } else {
      setSelectedFilters(intialFilters);
      setSearchField("");
    }
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

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevSelectedCategories) => ({
      ...prevSelectedCategories,
      [name]: e.target.checked
        ? [...prevSelectedCategories[name], value]
        : prevSelectedCategories[name].filter((category) => category !== value),
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
      <SwipeableDrawer
        anchor="bottom"
        open={toggleFilters}
        onClose={handleToggleFilters}
        onOpen={handleToggleFilters}
        sx={{
          "& .MuiPaper-root.MuiDrawer-paper": {
            backgroundColor: "antiquewhite",
            borderRadius: "18px 18px 0 0",
            height: filterType === "sort" ? null : "60vh",
            overflowY: "auto",
          },
        }}
      >
        <Text
          content={filterType === "sort" ? "Sort By" : "Filters"}
          p="15px 15px 0 15px"
          m="5px 0 10px 0"
          weight="600"
          size="22px"
          color="#202020"
        />
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
            <div className="transaction-filter-settings-header">
              {transactionFilterHeaders.map((eachFilter) => (
                <button
                  key={eachFilter.displayText}
                  className="transaction-filter-settings-button"
                  style={{
                    backgroundColor:
                      filterOption === eachFilter ? "#FFFFFF" : null,
                  }}
                  onClick={() => setFilterOption(eachFilter)}
                >
                  {eachFilter.displayText}
                  {selectedFilters[eachFilter.name].length > 0
                    ? eachFilter.name === "date"
                      ? " (1)"
                      : ` (${selectedFilters[eachFilter.name].length})`
                    : null}
                </button>
              ))}
              <Button
                content="Apply Filters"
                border="none"
                fontSize="22px"
                fontWeight="600"
                backgroundColor="#202020"
                color="#FFFFFF"
                width="40%"
                height="50px"
                handleClick={handleFiltersQuery}
              />
            </div>
            <div className="transaction-filter-settings-options">
              <TransactionFilterLayer
                filterOption={filterOption}
                selectedFilters={selectedFilters}
                handleCategoryChange={handleCategoryChange}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
        )}
      </SwipeableDrawer>
    </div>
  );
};

export default TransactionFilter;
