import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";
import dayjs from "dayjs";
import { userAuthService } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  password: "",
  mpin: "",
};

const initialErrorState = {
  mobileNumber: { state: false, text: "Mobile should contain only 10 digits" },
  dateOfBirth: {
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
  const [errorState, setErrorDataState] = useState(initialErrorState);
  const [otp, setOTP] = useState();
  const [otpFetched, setOtpFetched] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!otpFetched) {
      getOtp();
    } else {
      verifyUser();
    }
  };

  const getOtp = async () => {
    if (
      !errorState.mobileNumber.state &&
      !errorState.dateOfBirth.state &&
      !errorState.password.state &&
      !errorState.mpin.state
    ) {
      const response = await userAuthService(signupForm, "post", "/signup");
      if (response.status === 200) {
        setOtpFetched(true);
      }
    }
  };

  const resendOtp = async () => {
    await userAuthService({ email: signupForm.email }, "post", "/resendotp");
  };

  const verifyUser = async () => {
    const response = await userAuthService(
      { email: signupForm.email, otp },
      "post",
      "/verifyUser"
    );
    if (response.status === 200) {
      navigate("/");
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
      } else if (
        name === "dateOfBirth" &&
        currentDate.diff(value, "years") < 18
      ) {
        return true;
      } else {
        return false;
      }
    }

    setErrorDataState((prevState) => ({
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
        readOnly={otpFetched}
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
        readOnly={otpFetched}
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
        readOnly={otpFetched}
      />
      <InputField
        type="date"
        name="dateOfBirth"
        placeholder="Enter your date of birth"
        label="Date of birth"
        icon="date"
        value={signupForm.date}
        onChange={handleFormChange}
        required={true}
        error={errorState.dateOfBirth.state}
        errorText={errorState.dateOfBirth.text}
        readOnly={otpFetched}
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
        readOnly={otpFetched}
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
        readOnly={otpFetched}
      />
      {otpFetched ? (
        <>
          <InputField
            type="number"
            name="otp"
            placeholder="Enter 6 digit OTP"
            label="OTP"
            icon="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required={true}
          />
          <Button
            content="Resend OTP"
            border="none"
            backgroundColor="transparent"
            color="red"
            width="fit-content"
            fontSize="14px"
            fontWeight="500"
            type="button"
            handleClick={resendOtp}
          />
        </>
      ) : null}

      <Button
        content={otpFetched ? "Sign up" : "Send OTP"}
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
