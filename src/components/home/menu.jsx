import React, { useEffect, useState } from "react";
import Text from "../elements/text";
import MenuIcon from "./menu_icons";

const menuItems = ["Dashboard", "Transactions", "Account"];

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);

  useEffect(() => {}, []);
  return (
    <div className="menu-container">
      {menuItems.map((eachMenu) => (
        <div
          className="menu-item-container"
          onClick={() => setSelectedMenu(eachMenu)}
        >
          <MenuIcon icon={eachMenu} isSelected={eachMenu === selectedMenu} />
          <Text
            content={eachMenu}
            m="0"
            p="0"
            size="12px"
            weight={eachMenu === selectedMenu ? "600" : "500"}
            color={eachMenu === selectedMenu ? "#000000" : "grey"}
          />
        </div>
      ))}
    </div>
  );
};

export default Menu;
