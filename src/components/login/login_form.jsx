import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";
import { userAuthService } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState(initialFormState);
  const [verifiedUser, setVerifiedUser] = useState(true);
  const [otp, setOTP] = useState();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (verifiedUser) {
      const response = await userAuthService(loginForm, "post", "/login");
      if (response.status === 200) {
        navigate("/");
      } else {
        if (response?.data?.isVerified === false) setVerifiedUser(false);
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
    await userAuthService({ email: loginForm.email }, "post", "/resendotp");
  };

  return (
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
        <a href="/" style={{ textDecoration: "none" }}>
          Forgot password?
        </a>
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
