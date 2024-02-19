import React, { useEffect, useState } from "react";

import LoginForm from "./login_form";
import SignUpForm from "./signup_form";
import "./login_styles.css";
import BrandLogo from "../../assets/brand_logo";
import Text from "../elements/text";
import Button from "../elements/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </div>
  );
};

export default Login;
