import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { assets } from "../../assets/assets";
import Input from "./Input";
import Button from "./Button";
import { login as authLogin } from "../../store/authSlice";
import { Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../store/userDetailsSlice";

function Login({ setLogin }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          const name = userData?.name;
          const email = userData?.email;

          const userDetails = JSON.parse(
            localStorage.getItem(email + "userDetails"),
          );
          if (userDetails.hasProfile)
            dispatch(
              setUserDetails({
                name,
                email,
                hasProfile: userDetails.hasProfile,
                fileId: userDetails.fileId,
              }),
            );
          else
            dispatch(
              setUserDetails({
                name,
                email,
                hasProfile: false,
                fileId: "665cfb3f00312139e5ee",
              }),
            );
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-white p-10`}
      >
        <Clear
          className="-mt-12 ml-[260px] cursor-pointer"
          onClick={() => setLogin(false)}
        />
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={assets.gemini_icon} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
