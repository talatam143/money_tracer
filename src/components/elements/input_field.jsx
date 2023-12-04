import React, { useState } from "react";
import {
  MdAlternateEmail,
  MdOutlinePermPhoneMsg,
  MdPermIdentity,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";

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
  } = props;
  const [inputType, setInputType] = useState(props.type);

  const handleChangeType = () => {
    if (inputType === "text") {
      setInputType("password");
    } else if (inputType === "password") {
      setInputType("text");
    }
  };

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
      default:
        break;
    }
  };

  const iconStyle = { fontSize: "25px" };

  return (
    <div style={{ position: "relative" }}>
      {label ? (
        <>
          <label style={{ fontWeight: 600 }} htmlFor={name}>
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
        value={value}
        onChange={onChange}
        style={{
          height: height ? height : "40px",
          width: width ? width : "100%",
          border: "solid 1px grey",
          borderRadius: "8px",
          boxSizing: "border-box",
          paddingLeft: icon ? "35px" : null,
          marginTop: "5px",
          paddingRight: type === "password" ? "40px" : null,
        }}
      />
      {type === "password" ? (
        <button
          style={{
            border: "none",
            background: "none",
            position: "absolute",
            right: 0,
            bottom: 5,
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
