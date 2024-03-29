import React, { useState } from "react";
import {
  MdAlternateEmail,
  MdOutlinePermPhoneMsg,
  MdPermIdentity,
  MdPassword,
  MdCurrencyRupee,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCalendarOutline,
  IoSearch,
  IoAddSharp,
  IoPricetagsOutline,
} from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import { LuSubtitles } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Text from "./text";

const InputField = (props) => {
  const {
    type,
    placeholder,
    label,
    name,
    value,
    onChange,
    width,
    height,
    margin,
    icon,
    required,
    error,
    errorText,
    readOnly,
    containerWidth,
    containerMargin,
    addButton,
    handleAddButtonClick,
  } = props;
  const [inputType, setInputType] = useState(props.type);

  const handleChangeType = () => {
    if (inputType === "text") {
      setInputType("password");
    } else if (inputType === "password") {
      setInputType("text");
    }
  };

  const iconStyle = { fontSize: "25px" };

  const Icon = () => {
    const iconStyles = {
      position: "absolute",
      top: 30,
      left: 5,
      fontSize: "25px",
    };
    switch (icon) {
      case "email":
        return <MdAlternateEmail style={iconStyles} />;
      case "password":
        return <RiLockPasswordLine style={iconStyles} />;
      case "mobileNumber":
        return <MdOutlinePermPhoneMsg style={iconStyles} />;
      case "name":
        return <MdPermIdentity style={iconStyles} />;
      case "mpin":
        return <GrSecure style={iconStyles} />;
      case "date":
        return <IoCalendarOutline style={iconStyles} />;
      case "otp":
        return <MdPassword style={iconStyles} />;
      case "title":
        return <LuSubtitles style={iconStyles} />;
      case "amount":
        return <MdCurrencyRupee style={iconStyles} />;
      case "user":
        return <FaRegUser style={iconStyles} />;
      case "tags":
        return <IoPricetagsOutline style={iconStyles} />;
      case "search":
        return <IoSearch style={{ ...iconStyles, top: 5 }} />;

      default:
        break;
    }
  };

  return (
    <div
      style={{
        position: "relative",
        margin: containerMargin ?? null,
        width: containerWidth ?? null,
      }}
    >
      {label ? (
        <>
          <label
            style={{ fontWeight: 600, color: error ? "#F44336" : null }}
            htmlFor={name}
          >
            {label}
          </label>
          <br />
        </>
      ) : null}
      <input
        id={name}
        type={inputType}
        placeholder={placeholder}
        name={name}
        readOnly={readOnly ? readOnly : null}
        value={value}
        onChange={onChange}
        required={required ? true : null}
        style={{
          height: height ? height : "40px",
          width: width ? width : "100%",
          border: "solid 1px lightgrey",
          borderColor: error ? "#F44336" : "lightgrey",
          borderRadius: "8px",
          boxSizing: "border-box",
          paddingLeft: icon ? "35px" : "10px",
          margin: margin ? margin : "0px",
          paddingRight: type === "password" ? "40px" : null,
        }}
      />
      {error ? (
        <Text
          content={errorText}
          p="0"
          m="2px 0 0 0"
          size="13px"
          color="#F44336"
        />
      ) : null}

      {type === "password" ? (
        <button
          style={{
            border: "none",
            background: "none",
            position: "absolute",
            right: 0,
            top: 34,
            cursor: "pointer",
          }}
          onClick={handleChangeType}
          type="button"
        >
          {inputType === "password" ? (
            <IoEyeOutline
              style={{
                position: "absolute",
                bottom: "-18px",
                left: "-20px",
                ...iconStyle,
              }}
            />
          ) : (
            <IoEyeOffOutline
              style={{
                position: "absolute",
                bottom: "-18px",
                left: "-20px",
                ...iconStyle,
              }}
            />
          )}
        </button>
      ) : null}
      {addButton ? (
        <button
          style={{
            border: "none",
            background: "#202020",
            color: "#FFFFFF",
            position: "absolute",
            right: 0,
            top: 21.7,
            height: "40px",
            cursor: "pointer",
            borderRadius: "0 8px 8px 0",
          }}
          onClick={handleAddButtonClick}
          type="button"
        >
          <IoAddSharp style={iconStyle} />
        </button>
      ) : null}
      <Icon />
    </div>
  );
};

export default InputField;
