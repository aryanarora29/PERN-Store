import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import authService from "services/auth.service";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setError("");
      setIsLoading(true);
      const userData = await authService.login(email, password);
      // setUserState(userData);
      // setRedirectToReferrer(true);
      // Handle successful login actions here
      console.log("Login successful", userData);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" name="email" {...register("email", { required: true })} />
        {errors?.email && <span>Email required</span>}
        
        <input type="password" name="password" {...register("password", { required: true })} />
        {errors?.password && <span>Password required</span>}
        
        {error && <span>{error}</span>}
        
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
      
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
