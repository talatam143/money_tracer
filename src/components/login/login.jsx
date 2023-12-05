import React, { useState } from "react";

import LoginForm from "./login_form";
import SignUpForm from "./signup_form";
import "./login_styles.css";
import BrandLogo from "../../assets/brand_logo";
import Text from "../elements/text";
import Button from "../elements/button";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className="login-container">
      <BrandLogo width="80" height="80" />
      <div className="login-sub-container">
        <div className="login-toggle-container">
          <Button
            content="Login"
            backgroundColor={isLoginForm ? "#FFFFFF" : "transparent"}
            color="#000000"
            border="none"
            borderRadius="8px"
            height="40px"
            fontSize="16px"
            fontWeight="600"
            type="submit"
            icon="none"
            transition={true}
            handleClick={() => {
              if (!isLoginForm) setIsLoginForm(!isLoginForm);
            }}
          />
          <Button
            content="Sign up"
            backgroundColor={!isLoginForm ? "#FFFFFF" : "transparent"}
            color="#000000"
            border="none"
            borderRadius="8px"
            height="40px"
            fontSize="16px"
            fontWeight="600"
            type="submit"
            icon="none"
            transition={true}
            handleClick={() => {
              if (isLoginForm) setIsLoginForm(!isLoginForm);
            }}
          />
        </div>
        <Text
          content={isLoginForm ? "Welcome back" : "Create your account"}
          size={22}
          weight={700}
          align="center"
          m="10px 0 0 0"
        />
        {isLoginForm ? (
          <LoginForm setIsLoginForm={setIsLoginForm} />
        ) : (
          <SignUpForm setIsLoginForm={setIsLoginForm} />
        )}
        <Text content="Or With" size="15px" weight={500} align="center" m="5px 0 0 0" />
        <Button
          content="Google"
          backgroundColor="#FFFFFF"
          color="#000000"
          border="solid 1px lightgrey"
          borderRadius="8px"
          height="40px"
          width="100%"
          fontSize="18px"
          fontWeight="600"
          type="submit"
          icon="google"
          margin="10px 0 0 0"
        />
      </div>
    </div>
  );
};

export default Login;
