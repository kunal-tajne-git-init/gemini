import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Modal } from "@mui/base/Modal";
import { logout } from "../../store/authSlice";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import {
  EditOutlined,
  AddCircleTwoTone,
  LogoutTwoTone,
} from "@mui/icons-material";
import { ApiContext } from "../../context/Context";
import Signup from "../LoginSignup/Signup";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";

const LogoutCard = ({ show, setShow, logoutBarRef, handleLogin }) => {
  const { displayLogout } = useContext(ApiContext);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetUserDetails } = useSelector((state) => state.userDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const userName = useSelector((state) => state.userDetails.userName);
  const userEmail = useSelector((state) => state.userDetails.userEmail);

  const { prevPrompts } = useContext(ApiContext); // Get the context here

  const handleLogout = async () => {
    if (userEmail) {
      localStorage.setItem(
        `${userEmail}prevPrompts`,
        JSON.stringify(prevPrompts),
      );
    } else {
      localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
    }
    dispatch(logout());
    await authService.logout();
    dispatch(resetUserDetails());
    navigate("/");
  };

  console.log("Username: ", userName);
  console.log("UserEmail: ", userEmail);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };

  return (
    <>
      {displayLogout && (
        <div
          className=" flex min-w-[150px] max-w-[500px] flex-col rounded-2xl bg-[#282A2C] pb-4 text-[#E3E3E3] md:min-w-[400px]"
          ref={logoutBarRef}
        >
          <div className="relative mt-5 flex flex-col items-center space-y-3">
            <p className="text-sm">
              {isAuthenticated ? userEmail : "haveagoodday@gmail.com"}
            </p>
            <div className="relative">
              <img
                className="h-20 w-20 rounded-full"
                src={assets.Professional_User}
                alt="Professional User"
              />
              <EditOutlined
                className="absolute left-[52px] top-[60px] cursor-pointer rounded-full bg-black p-1"
                style={{ width: "24px", height: "24px" }}
              />
            </div>

            {!isAuthenticated && (
              <div className="mt-10">
                <button
                  className="rounded-full border bg-green-600 px-5 text-lg"
                  onClick={() => {
                    setSignup(true);
                    handleLogin();
                  }}
                >
                  Signup / Signin
                </button>

                <Modal
                  open={open}
                  onClose={() => setSignup(!signup)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="border-none outline-none"
                >
                  <Box className="z-50 border-none outline-none" sx={style}>
                    {signup && (
                      <Signup
                        setSignup={setSignup}
                        setLogin={setLogin}
                        loginDialogue={login}
                      />
                    )}
                  </Box>
                </Modal>
              </div>
            )}

            <a
              href={"https://myaccount.google.com/personal-info"}
              target="blank"
            />

            <p className="text-xl">
              Hi, {isAuthenticated ? userName : "Explorer!"}
            </p>

            <a
              href={"https://myaccount.google.com/"}
              target="_blank"
              className="rounded-full border px-6 py-[7px] text-[14px] text-[#88A6FF]"
            >
              Manage your Google Account
            </a>

            <Accordion
              allowToggle
              defaultIndex={[0]}
              className="mx-1 rounded-[40px] bg-[#1C1C1C] px-10 py-1 md:mx-0"
            >
              <AccordionItem>
                <p className="text-sm">
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="mt-4 min-w-[200px] pb-4 md:min-w-[250px] "
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide more accounts" : "Show more accounts"}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </p>
                <AccordionPanel pb={4}>
                  <hr
                    className="h-[2px] w-full rounded-full border-[#1C1C1C]"
                    style={{ backgroundColor: "#272A2C", border: "none" }}
                  />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-2 min-w-[250px] "
                  >
                    <div className="mt-2 flex items-center gap-2 pb-1">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={assets.Michael}
                        alt="Professional User"
                      />
                      <div className="flex flex-col justify-center pb-1">
                        <p className="text-[16px]">John Smith</p>
                        <p className="text-[12px]">johnsmith@gmail.com</p>
                      </div>
                    </div>
                  </Box>
                  <hr
                    className="h-[2px] w-full rounded border-[#1C1C1C]"
                    style={{ backgroundColor: "#272A2C", border: "none" }}
                  />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-2 min-w-[250px]"
                  >
                    <div className="mt-2 flex items-center gap-2 pb-1">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={assets.Emily}
                        alt="Professional User"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-[16px]">Emily Johnson</p>
                        <p className="text-[12px]">emilyjohnson@gmail.com</p>
                      </div>
                    </div>
                  </Box>
                  <hr
                    className="h-[2px] w-full rounded border-[#1C1C1C]"
                    style={{ backgroundColor: "#272A2C", border: "none" }}
                  />

                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-2 min-w-[250px]"
                  >
                    <div className="mt-2 flex items-center gap-2 pb-1">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={assets.Sarah}
                        alt="Professional User"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-[16px]">Sarah Brown</p>
                        <p className="text-[12px]">sarahbrown@gmail.com</p>
                      </div>
                    </div>
                  </Box>
                  <hr
                    className="h-[2px] w-full rounded border-[#1C1C1C]"
                    style={{ backgroundColor: "#272A2C", border: "none" }}
                  />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-2 min-w-[250px] "
                  >
                    <div className="flex flex-row items-center gap-5 py-3">
                      <AddCircleTwoTone className=" text-[#88A6FF]" />
                      <p className=" text-[16px]">Add another account</p>
                    </div>
                  </Box>
                  <hr
                    className="h-[2px] w-full rounded border-[#1C1C1C]"
                    style={{ backgroundColor: "#272A2C", border: "none" }}
                  />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-2 min-w-[250px] "
                  >
                    <div
                      className="flex flex-row items-center gap-5 py-3"
                      onClick={handleLogout}
                    >
                      <LogoutTwoTone className=" text-white" />
                      <p className=" text-[16px]">Sign out of all accounts</p>
                    </div>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center gap-2">
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                className="text-[12px]"
              >
                Privacy Policy
              </a>
              <p>•</p>
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                className="text-[12px]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutCard;
