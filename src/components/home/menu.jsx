import React, { useEffect, useState } from "react";
import Text from "../elements/text";
import MenuIcon from "./menu_icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./menu_styles.css";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Transactions", path: "/transactions" },
  { name: "Account", path: "/account" },
];

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  const location = useLocation();
  const naviagte = useNavigate();

  useEffect(() => {
    let currentPath = menuItems.filter(
      (eachMenu) => eachMenu.path === location.pathname
    );
    setSelectedMenu(currentPath[0].name);
  }, [location]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu.name);
    naviagte(menu.path);
  };

  return (
    <div className="menu-container">
      {menuItems.map((eachMenu) => (
        <div
          className="menu-item-container"
          onClick={() => handleMenuClick(eachMenu)}
          key={eachMenu.name}
        >
          <MenuIcon
            icon={eachMenu.name}
            isSelected={eachMenu.name === selectedMenu}
          />
          <Text
            content={eachMenu.name}
            m="0"
            p="0"
            size="11px"
            weight={eachMenu.name === selectedMenu ? "600" : "500"}
            color={eachMenu.name === selectedMenu ? "#000000" : "grey"}
          />
        </div>
      ))}
    </div>
  );
};

export default Menu;
