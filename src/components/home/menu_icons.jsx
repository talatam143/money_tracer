import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa";
import {
  HiOutlineClipboardDocumentList,
  HiClipboardDocumentList,
} from "react-icons/hi2";

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
        <HiClipboardDocumentList style={iconStyle} />
      ) : (
        <HiOutlineClipboardDocumentList style={iconStyle} />
      );
    case "Account":
      return isSelected ? (
        <FaUser style={iconStyle} />
      ) : (
        <FaRegUser style={iconStyle} />
      );
    default:
      break;
  }
};

export default MenuIcon;
