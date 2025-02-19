import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-clients/usersAPIservice"; // the * imports all the functions in the usersAPIservice file as apiClient.
import { RegisterFormData } from "./registerFormData.types";
import { useNavigate } from "react-router-dom";

  const RegisterForm = () => {
    const navigate = useNavigate();
    const {showToast} = useAppContext();
  
    const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>();
  
    // useMutation() is a hook from 'react-query' that we can use to send a request to the server. It takes a function as an argument that will be called when the request is made. The function will receive the form data as an argument. We can use this function to send the form data to the server.
    // is is called a mutation function because it is used to mutate/change the data on the server.
    const mutation = useMutation<unknown, Error, RegisterFormData>({
      mutationFn: (data: RegisterFormData) => apiClient.register(data),
      onSuccess: () => {
        showToast({message: "Account created successfully", type: "success"});
        navigate("/");
      },
      onError: (error: Error) => {
        showToast({message: error.message, type: "error"});
      }
    });
  
    // handleSumit() is a function from 'react-hook-form' that we can use to handle the form submission. It takes a callback function as an argument that will be called when the form is submitted. The callback function will receive the form data as an argument. We can use this function to send the form data to the server.
    const onSumbit = handleSubmit((data: RegisterFormData) => {
      mutation.mutate(data);  
    });
  
    return (
      <form className="flex flex-col gap-5" onSubmit={onSumbit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-slate-700 text-sm font-bold flex-1">
            First Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", { required: "This field is required" })}
            ></input>
            {errors.firstName && (
              <span className="text-red-500 font-bold">{errors.firstName.message}</span>
            )}
          </label>
          <label className="text-slate-700 text-sm font-bold flex-1">
            Last Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", { required: "This field is required" })}
            ></input>
            {errors.lastName && (
              <span className="text-red-500 font-bold">{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className="text-slate-700 text-sm font-bold flex-1">
          Email
          <input
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
              <span className="text-red-500 font-bold">{errors.password.message}</span>
            )}
        </label>
        <label className="text-slate-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("confirmPassword", {
              // validate(value-'the password vlaue in the input above') comes from 'reatc-hook-form' and this is how we validate the confirm password field
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  // watch() is a function from 'react-hook-form' that we can use to watch the value of another input field
                  return val === watch("password")
                    ? true
                    : "Passwords do not match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
              <span className="text-red-500 font-bold">{errors.confirmPassword.message}</span>
            )}
        </label>
        <div className="flex flex-col md:flex-row gap-5">
          <label className="text-slate-700 text-sm font-bold">
            Phone Number
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("phoneNumber", {
                validate: (val) => {
                  if (!val.trim()) {
                    return "This field is required";
                  }
                  if (val.length !== 10) {
                    return "Phone number must be 10 digits";
                  }
                  return true;
                },
              })}
            ></input>
            {errors.phoneNumber && (
              <span className="text-red-500 font-bold">{errors.phoneNumber.message}</span>
            )}
          </label>
        </div>
        <span>
          <button type="submit" className="submit-register-form-btn">
            Create Account
          </button>
        </span>
      </form>
    );
  };
  
  export default RegisterForm;