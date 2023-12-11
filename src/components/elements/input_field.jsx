import React, { useState } from "react";
import {
  MdAlternateEmail,
  MdOutlinePermPhoneMsg,
  MdPermIdentity,
  MdPassword,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
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
    icon,
    required,
    error,
    errorText,
    readOnly,
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
      top: 35,
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
      default:
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
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
          border: "solid 1px",
          borderColor: error ? "#F44336" : "grey",
          borderRadius: "8px",
          boxSizing: "border-box",
          paddingLeft: icon ? "35px" : "10px",
          marginTop: "5px",
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
            <IoEyeOutline style={iconStyle} />
          ) : (
            <IoEyeOffOutline style={iconStyle} />
          )}
        </button>
      ) : null}
      <Icon />
    </div>
  );
};

export default InputField;
