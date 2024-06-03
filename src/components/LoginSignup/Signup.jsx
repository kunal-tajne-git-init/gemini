import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { assets } from "../../assets/assets";
import Button from "./Button";
import { Clear } from "@mui/icons-material";
import Login from "./Login";
import { Box, Modal } from "@mui/material";
import { login } from "../../store/authSlice";
import { setUserDetails } from "../../store/userDetailsSlice";

const Signup = ({ setSignup, setLogin, loginDialogue }) => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };

  const create = async (data) => {
    setError("");

    try {
      const registerUser = await authService.createAccount(data);

      if (registerUser) {
        const currUserData = await authService.getCurrentUser();

        if (currUserData) {
          dispatch(login(currUserData));
          const email = currUserData.email;
          const name = currUserData.name;
          dispatch(
            setUserDetails({
              email,
              name,
              hasProfile: false,
              fileId: "665cfb3f00312139e5ee",
            }),
          );

          localStorage.setItem(
            email + "userDetails",
            JSON.stringify(currUserData),
          );
        }

        // console.log(currUserData);

        navigate("/");
      }
    } catch (error) {
      setError(error.message || "An error occurred"); // Convert the error object to a string
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-700 p-10 text-white">
        <Clear
          className="-mt-12 ml-[310px] cursor-pointer"
          onClick={() => setSignup(false)}
        />
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={assets.gemini_icon} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/80">
          Already have an account?&nbsp;
          <button
            onClick={() => {
              setLogin(true);
              setIsModalOpen(true);
            }}
            className="text-orange-500 underline"
          >
            Sign In
          </button>
          {loginDialogue && (
            <Modal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="border-none outline-none"
            >
              <Box className="z-50 border-none outline-none" sx={style}>
                <Login setLogin={setLogin} />
              </Box>
            </Modal>
          )}
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
