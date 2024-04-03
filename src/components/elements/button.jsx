import React from "react";
import { FcGoogle } from "react-icons/fc";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import "./elements.css";

const Button = (props) => {
  const {
    content,
    width,
    height,
    padding,
    margin,
    color,
    backgroundColor,
    borderRadius,
    border,
    fontSize,
    fontWeight,
    type,
    icon,
    iconPosition,
    handleClick,
    transition,
    textAlign,
    disabled,
  } = props;

  const iconStyle = { fontSize: "25px" };

  const Icon = () => {
    switch (icon) {
      case "google":
        return <FcGoogle style={iconStyle} />;
      case "add":
        return <MdAddBox style={{ fontSize: height, marginLeft: "4px" }} />;
      case "delete":
        return (
          <MdDeleteForever style={{ color: "#f44336", fontSize: "20px" }} />
        );

      default:
        break;
    }
  };

  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      disabled={disabled || false}
      className={icon ? "button-icon-style" : null}
      style={{
        textAlign: textAlign || "center",
        cursor: "pointer",
        width: width ? width : null,
        height: height ? height : null,
        padding: padding ? padding : null,
        margin: margin ? margin : null,
        color: color ? color : null,
        backgroundColor: backgroundColor ? backgroundColor : null,
        borderRadius: borderRadius ? borderRadius : null,
        border: border ? border : null,
        fontSize: fontSize ? fontSize : null,
        fontWeight: fontWeight ? fontWeight : null,
        transition: transition ? "0.3s all ease" : null,
      }}
    >
      {iconPosition === "start" || !iconPosition ? (
        icon ? (
          <Icon />
        ) : null
      ) : null}
      {content}
      {iconPosition === "end" ? icon ? <Icon /> : null : null}
    </button>
  );
};

export default Button;
