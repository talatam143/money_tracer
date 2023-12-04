import React from "react";
import { FcGoogle } from "react-icons/fc";
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
    handleClick,
    transition,
  } = props;

  const iconStyle = { fontSize: "25px" };

  const Icon = () => {
    switch (icon) {
      case "google":
        return <FcGoogle style={iconStyle} />;

      default:
        break;
    }
  };
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      className={icon ? "button-icon-style" : null}
      style={{
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
      {icon ? <Icon /> : null}
      {content}
    </button>
  );
};

export default Button;
