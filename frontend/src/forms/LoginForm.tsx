import { useForm } from "react-hook-form";
import { LoginFormData } from "./loginFormData.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-clients/usersAPIservice"; // the * imports all the functions in the usersAPIservice file as apiClient.
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  

  const mutation = useMutation<unknown, Error, LoginFormData>({
    mutationFn: (data: LoginFormData) => apiClient.login(data),
    onSuccess: async() => {
    await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      showToast({ message: "Login successful", type: "success" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  // handleSumit() is a function from 'react-hook-form' that we can use to handle the form submission. It takes a callback function as an argument that will be called when the form is submitted. The callback function will receive the form data as an argument. We can use this function to send the form data to the server.
  const onSumbit = handleSubmit((data: LoginFormData) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSumbit}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="text-slate-700 text-sm font-bold flex-1">
        Email
        <input
          placeholder="Enter Email Address"
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500 font-bold">{errors.email.message}</span>
        )}
      </label>
      <label className="text-slate-700 text-sm font-bold flex-1">
        Password
        <input
          placeholder="Enter Password"
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 font-bold">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
      <span className="text-sm">
        Not Registered? <Link to='/register' className="underline">Create an account here</Link>
      </span>
        <button type="submit" className="submit-login-form-btn">
          Login
        </button>
      </span>
    </form>
  );
};

export default LoginForm;
