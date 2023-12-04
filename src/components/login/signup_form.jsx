import React, { useState } from "react";
import InputField from "../elements/input_field";
import Button from "../elements/button";

const initialFormState = {
  name: "",
  email: "",
  mobileNumber: "",
  password: "",
  mpin: "",
};

const SignUpForm = () => {
  const [signupForm, setSignupForm] = useState(initialFormState);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(signupForm);
  };

  const handleFormChange = (e) => {
    setSignupForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
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
      />
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        label="Email"
        icon="email"
        value={signupForm.email}
        onChange={handleFormChange}
      />
      <InputField
        type="number"
        name="mobileNumber"
        placeholder="Enter your mobile number"
        label="Mobile number"
        icon="mobileNumber"
        value={signupForm.mobileNumber}
        onChange={handleFormChange}
      />
      <InputField
        type="password"
        name="password"
        placeholder="Enter your password"
        label="Password"
        icon="password"
        value={signupForm.password}
        onChange={handleFormChange}
      />
      <InputField
        type="number"
        name="mpin"
        placeholder="Enter your MPIN"
        label="MPIN"
        icon="mpin"
        value={signupForm.mpin}
        onChange={handleFormChange}
      />
      <Button
        content="Sign up"
        backgroundColor="#000000"
        color="#FFFFFF"
        border="none"
        borderRadius="8px"
        height="45px"
        fontSize="18px"
        fontWeight="500"
        margin="10px 0 0 0"
        type="submit"
      />
    </form>
  );
};

export default SignUpForm;
