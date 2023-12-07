import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";
import dayjs from "dayjs";

const initialFormState = {
  name: "",
  email: "",
  mobileNumber: "",
  date: "",
  password: "",
  mpin: "",
};

const initialErrorState = {
  mobileNumber: { state: false, text: "Mobile should contain only 10 digits" },
  date: {
    state: false,
    text: "You should have atleast 18 Years to create account",
  },
  password: {
    state: false,
    text: "Password must have 8+ chars with 1 uppercase, 1 lowercase, 1 digit, and 1 special character.",
  },
  mpin: { state: false, text: "MPIN should contain only 4 digits" },
};

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[/@.$!%*#?&])[A-Za-z\d/@$.!%*#?&]{8,}$/;
const currentDate = dayjs();

const SignUpForm = () => {
  const [signupForm, setSignupForm] = useState(initialFormState);
  const [errorState, setErrorState] = useState(initialErrorState);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (
      !errorState.mobileNumber.state &&
      !errorState.date.state &&
      !errorState.password.state &&
      !errorState.mpin.state
    ) {
    }
  };

  const handleFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    function isFieldValid() {
      if (value.length === 0) return false;
      if (name === "mobileNumber" && value.length !== 10) {
        return true;
      } else if (name === "mpin" && value.length !== 4) {
        return true;
      } else if (name === "password" && !passwordRegex.test(value)) {
        return true;
      } else if (name === "date" && currentDate.diff(value, "years") < 18) {
        return true;
      } else {
        return false;
      }
    }

    setErrorState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        state: isFieldValid(),
      },
    }));

    setSignupForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleLoginSubmit} className="login-form">
      <InputField
        type="text"
        name="name"
        placeholder="Enter your name"
        label="Name"
        icon="name"
        value={signupForm.name}
        onChange={handleFormChange}
        required={true}
      />
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        label="Email"
        icon="email"
        value={signupForm.email}
        onChange={handleFormChange}
        required={true}
      />
      <InputField
        type="number"
        name="mobileNumber"
        placeholder="Enter your mobile number"
        label="Mobile number"
        icon="mobileNumber"
        value={signupForm.mobileNumber}
        onChange={handleFormChange}
        required={true}
        error={errorState.mobileNumber.state}
        errorText={errorState.mobileNumber.text}
      />
      <InputField
        type="date"
        name="date"
        placeholder="Enter your date of birth"
        label="Date of birth"
        icon="date"
        value={signupForm.date}
        onChange={handleFormChange}
        required={true}
        error={errorState.date.state}
        errorText={errorState.date.text}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Enter your password"
        label="Password"
        icon="password"
        value={signupForm.password}
        onChange={handleFormChange}
        required={true}
        error={errorState.password.state}
        errorText={errorState.password.text}
      />
      <InputField
        type="number"
        name="mpin"
        placeholder="Enter your MPIN"
        label="MPIN"
        icon="mpin"
        value={signupForm.mpin}
        onChange={handleFormChange}
        required={true}
        error={errorState.mpin.state}
        errorText={errorState.mpin.text}
      />
      <Button
        content="Send OTP"
        backgroundColor="#000000"
        color="#FFFFFF"
        border="none"
        borderRadius="8px"
        height="40px"
        fontSize="18px"
        fontWeight="500"
        margin="10px 0 0 0"
        type="submit"
      />
    </form>
  );
};

export default SignUpForm;
