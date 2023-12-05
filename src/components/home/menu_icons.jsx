import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import { IoIosList, IoIosListBox } from "react-icons/io";
import { BiSolidUser, BiSolidUserRectangle } from "react-icons/bi";

const MenuIcon = (props) => {
  const { icon, isSelected } = props;

  const iconStyle = {
    fontSize: "24px",
    color: isSelected ? "#000000" : "grey",
  };

  switch (icon) {
    case "Dashboard":
      return isSelected ? (
        <MdDashboard style={iconStyle} />
      ) : (
        <MdOutlineDashboard style={iconStyle} />
      );
    case "Transactions":
      return isSelected ? (
        <IoIosListBox style={iconStyle} />
      ) : (
        <IoIosList style={iconStyle} />
      );
    case "Account":
      return isSelected ? (
        <BiSolidUserRectangle style={iconStyle} />
      ) : (
        <BiSolidUser style={iconStyle} />
      );
    default:
      break;
  }
};

export default MenuIcon;
