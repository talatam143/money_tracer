import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";

const initialFormState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState(initialFormState);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormChange = (e) => {
    setLoginForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
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
      />
      <InputField
        type="password"
        name="password"
        placeholder="Enter your password"
        label="Password"
        icon="password"
        value={loginForm.password}
        onChange={handleFormChange}
      />

      <div className="loginform-options-container">
        <div>
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
        height="45px"
        fontSize="18px"
        fontWeight="600"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
