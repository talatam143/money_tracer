import React from "react";
import Text from "./text";
import Button from "./button";

const RadioInput = (props) => {
  const {
    data,
    checkedValue,
    handleChange,
    name,
    containerWidth,
    radioLabelHeading,
    resetRadioButton,
  } = props;

  const RenderInput = () => {
    switch (name) {
      case "paymentMethod":
        return (
          <>
            {data?.map((eachData) => (
              <div
                key={eachData}
                className={`radio-input ${
                  eachData === checkedValue ? "radio-input-checked" : null
                }`}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  id={eachData}
                  name={name}
                  value={eachData}
                  onChange={handleChange}
                  checked={eachData === checkedValue}
                />
                <label htmlFor={eachData}>{eachData}</label>
              </div>
            ))}
          </>
        );
      case "bank":
      case "paymentInfo":
        return (
          <>
            {data?.map((eachData) => (
              <div
                key={eachData.name}
                className={`radio-input ${
                  eachData.name === checkedValue ? "radio-input-checked" : null
                }`}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  id={eachData.name}
                  name={name}
                  value={eachData.name}
                  onChange={handleChange}
                  checked={eachData.name === checkedValue}
                />
                <label htmlFor={eachData.name}>
                  {eachData.iconUrl || eachData.imageUrl ? (
                    <img
                      src={eachData.iconUrl || eachData.imageUrl}
                      alt="radio-label-icon"
                      className="radio-input-label-image"
                    />
                  ) : null}
                  {eachData.name}
                </label>
              </div>
            ))}
          </>
        );

      default:
        break;
    }
  };

  return data ? (
    <div style={{ width: containerWidth }}>
      <div style={{ display: "flex" }}>
        <Text
          content={radioLabelHeading}
          m="0 10px 0 0"
          p="0"
          weight="600"
          size="16px"
        />
        {checkedValue !== "reset" ? (
          <Button
            content="Reset"
            borderRadius="25px"
            background="transparent"
            border="solid 1px grey"
            handleClick={() => resetRadioButton(name)}
          />
        ) : null}
      </div>

      <div className="radio-input-list-container">
        <RenderInput />
      </div>
    </div>
  ) : null;
};

export default RadioInput;
