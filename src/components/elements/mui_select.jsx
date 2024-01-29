import { ListSubheader, MenuItem, Select } from "@mui/material";
import React from "react";

const MuiSelect = (props) => {
  const { id, name, value, onChange, menuItems } = props;

  return (
    <Select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
        height: "40px",
        background: "#FFFFFF",
        borderRadius: "8px",
        margin: "5px 0 0 0",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#202020 !important",
        },
      }}
    >
      <MenuItem
        value="reset"
        sx={{
          minHeight: "10px",
        }}
      >
        {menuItems?.length > 0 || name === "category" ? "None" : "No Details"}
      </MenuItem>
      {name === "category"
        ? Object.keys(menuItems).map((eachCategory) => [
            <ListSubheader
              key={eachCategory}
              sx={{
                background: "#121926",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 18,
              }}
            >
              {eachCategory}
            </ListSubheader>,
            ...Object.keys(menuItems[eachCategory]).map((eachSubCategory) => (
              <MenuItem
                value={`${eachCategory}-${menuItems[eachCategory][eachSubCategory].name}`}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  color: "#202020",
                  minHeight: "10px",
                }}
                key={`${eachCategory}-${menuItems[eachCategory][eachSubCategory].name}`}
              >
                {menuItems[eachCategory][eachSubCategory].icon}
                <p className="categoryPara">
                  {menuItems[eachCategory][eachSubCategory].name}
                </p>
              </MenuItem>
            )),
          ])
        : menuItems?.map((eachItem) => (
            <MenuItem
              value={eachItem?.name || eachItem}
              key={eachItem?.name || eachItem}
              sx={{
                minHeight: "10px",
                wordBreak: "break-word !important",
              }}
            >
              {eachItem?.name || eachItem}
            </MenuItem>
          ))}
    </Select>
  );
};

export default MuiSelect;
