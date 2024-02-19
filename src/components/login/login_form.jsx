import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";
import { userAuthService } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState(initialFormState);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(true);
  const [otpStatus, setOTPStatus] = useState(false);
  const [otp, setOTP] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (verifiedUser) {
      const response = await userAuthService(loginForm, "post", "/login");
      if (response.status === 200) {
        navigate("/");
      } else if (response.status === 202) {
        if (response?.data?.isVerified === false) {
          setVerifiedUser(false);
        }
      }
    } else {
      const response = await userAuthService(
        { email: loginForm.email, otp },
        "post",
        "/verifyUser"
      );

      if (response.status === 200) {
        navigate("/");
      }
    }
  };

  const handleFormChange = (e) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const resendOtp = async () => {
    const { status } = await userAuthService(
      { email: loginForm.email },
      "post",
      "/resendotp"
    );

    if (status === 200) {
      setOTPStatus(true);
    }
  };

  const verifyOtp = async () => {
    const { status } = await userAuthService(
      { email: loginForm.email, otp: otp },
      "post",
      "/verifyotp"
    );

    if (status === 200) {
      setChangePassword(true);
    }
  };

  const handleForgotPassword = async () => {
    if (changePassword) {
      if (loginForm.password === loginForm.confirmPassword) {
        const { status } = await userAuthService(
          { email: loginForm.email, password: loginForm.password },
          "post",
          "/changepassword"
        );
        if (status === 200) {
          resetForgotPasswordState();
        }
      } else {
        setPasswordMatch(true);
      }
    } else if (otpStatus) {
      verifyOtp();
    } else {
      resendOtp();
    }
  };

  const resetForgotPasswordState = () => {
    setOTP();
    setVerifiedUser(true);
    setOTPStatus(false);
    setChangePassword(false);
    setPasswordMatch(false);
    setForgotPassword(false);
  };

  return forgotPassword ? (
    <form className="login-form">
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        label="Email"
        icon="email"
        value={loginForm.email}
        onChange={handleFormChange}
        required={true}
        readOnly={otpStatus ? true : false}
      />
      {!changePassword && otpStatus ? (
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
            handleClick={() => resendOtp()}
          />
        </>
      ) : null}
      {changePassword ? (
        <>
          <InputField
            type="password"
            name="password"
            placeholder="Enter new password"
            label="Enter new password"
            icon="password"
            value={loginForm.password}
            onChange={handleFormChange}
            required={true}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            label="Confirm new password"
            icon="password"
            value={loginForm.confirmPassword}
            onChange={handleFormChange}
            required={true}
            error={passwordMatch}
            errorText="Passwords doesn't match"
          />
        </>
      ) : null}

      <Button
        content={
          changePassword
            ? "Change Password"
            : otpStatus
            ? "Verify OTP"
            : "Send OTP"
        }
        backgroundColor="#000000"
        color="#FFFFFF"
        border="none"
        borderRadius="8px"
        height="40px"
        fontSize="18px"
        fontWeight="600"
        handleClick={handleForgotPassword}
      />
      <span className="forgot-password-span" onClick={resetForgotPasswordState}>
        Go Back
      </span>
    </form>
  ) : (
    <form onSubmit={handleLoginSubmit} className="login-form">
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        label="Email"
        icon="email"
        value={loginForm.email}
        onChange={handleFormChange}
        required={true}
        readOnly={!verifiedUser ? true : false}
      />

      <InputField
        type="password"
        name="password"
        placeholder="Enter your password"
        label="Password"
        icon="password"
        value={loginForm.password}
        onChange={handleFormChange}
        required={true}
        readOnly={!verifiedUser ? true : false}
      />
      {!verifiedUser ? (
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
      <div className="loginform-options-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <span
          onClick={() => {
            setForgotPassword(true);
          }}
          className="forgot-password-span"
        >
          Forgot password?
        </span>
      </div>
      <Button
        content="Login"
        backgroundColor="#000000"
        color="#FFFFFF"
        border="none"
        borderRadius="8px"
        height="40px"
        fontSize="18px"
        fontWeight="600"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
