import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../Card/Card";
import { ApiContext } from "../../context/Context";
import cardData from "./CardData";
import "./layout.css";
import { logout, login, setAuthState } from "../../store/authSlice";

import {
  AddPhotoAlternateOutlined,
  MicNoneOutlined,
  SendOutlined,
  StopCircle,
  History,
  VerifiedOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import LogoutCard from "../User/LogoutCard";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState, setUserDetails } from "../../store/userDetailsSlice";

// Function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = array.slice();
  // Make a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Layout = () => {
  const randomCards = useMemo(() => {
    const shuffledData = shuffleArray(cardData);
    return shuffledData.slice(0, 4);
  }, []);

  const handleInputChange = (e) => {
    // Auto-resize the textarea.
    //This is very important to automatically increase and decrease the height of the textarea where user are typing
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;

    setInput(e.target.value);
  };

  const [show, setShow] = useState(true);
  const [updateBar, setUpdateBar] = useState(true);
  // const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();

  const logoutBarRef = useRef();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const userName = useSelector((state) => state.userDetails.userName);
  const [currUserName, setCurrUserName] = useState("Explorer!");

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    pauseOutput,
    displayButton,
    setDisplayButton,
    setDisplayLogout,
    displayLogout,
  } = useContext(ApiContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await authService.getCurrentUser();
      const userLocal = localStorage.getItem("user");

      if (userLocal) {
        const userLocalData = JSON.parse(userLocal);
        const { name, email } = userLocalData;
        console.log("Data", name, email);
        dispatch(setAuthState({ isAuthenticated: true, user: userLocalData }));
        dispatch(setInitialState({ name, email }));
      } else if (user) {
        dispatch(login(user));
        const user = await authService.getUserDetails();
        dispatch(setUserDetails(user?.name, user?.email));
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    setCurrUserName(userName);
  }, [isAuthenticated, userName]);

  const handleLogin = async () => {
    const user = await authService.login();
    dispatch(login(user));
  };

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
  };

  return (
    <div className="relative -ml-12 min-h-screen flex-1 overflow-hidden pb-[15vh] md:ml-0">
      <div className="flex items-center justify-between p-6 text-[22px]">
        <p className="text-[#C9CCCE]">Gemini</p>
        <div className="flex cursor-pointer items-center justify-center gap-6">
          <a
            href="https://one.google.com/explore-plan/gemini-advanced"
            className=" hidden items-center  justify-center gap-3 rounded-xl bg-[#333637] px-3 py-2 text-sm text-[#E3E3E3] md:flex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={"h-6 w-6"}
              src={assets.gemini_icon}
              alt="Gemini Icon"
            />
            <p>Try Gemini Advanced</p>
          </a>
          <History
            className="mr-6 h-5 w-5 text-white"
            sx={{ display: { xs: "block", md: "none" } }}
          />
          <div className="relative">
            <img
              className="h-10 w-10 rounded-full"
              src={assets.Professional_User}
              alt="Professional User"
              onClick={() => setDisplayLogout(!displayLogout)}
            />

            {displayLogout && (
              <div className="absolute right-0 top-12 z-50">
                <LogoutCard
                  isAuthenticated={!isAuthenticated}
                  setShow={setShow}
                  show={show}
                  logoutBarRef={logoutBarRef}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {updateBar && (
        <div className="relative flex items-center justify-center gap-1 bg-[#041E49] py-1">
          <VerifiedOutlined
            className=" text-white"
            sx={{ height: 20, width: 20 }}
          />
          <p className="text-center text-[#E3E3E3]">
            Gemini has just been updated.{" "}
            <a
              href="https://gemini.google.com/updates"
              target="_blank"
              className="underline"
            >
              See update
            </a>
          </p>
          <CloseOutlined
            className=" absolute right-3 cursor-pointer text-white"
            onClick={() => setUpdateBar(!updateBar)}
          />
        </div>
      )}

      <div className=" m-auto max-w-[900px]">
        {!showResult ? (
          <>
            {" "}
            <div className="mx-0 p-5 text-2xl text-[#c4c7c5] md:text-[56px]">
              <p className="-mb-4 md:mb-0">
                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, {currUserName}
                </span>
              </p>
              <p className="pt-5 text-[#454746] md:mt-2">
                How can I help you today?
              </p>
            </div>{" "}
            <div className="z-50 mt-20 flex p-5">
              <div className="m-auto">
                {/* Swiper is a library that allows you to create a slider with a lot of customization options. We have used it to create a slider of cards. we can install it by running the command npm install swiper. And then import it in the file where we want to use it. The file import includes the following: import { Swiper, SwiperSlide } from "swiper/react"; import "swiper/css"; */}
                <Swiper spaceBetween={10} slidesPerView={2} speed={500}>
                  {randomCards.map((card, index) => (
                    <SwiperSlide
                      key={index}
                      className="max-w-[200px] text-white"
                    >
                      <Card
                        message={card.message}
                        Icon={card.Icon}
                        onClick={() => {
                          onSent(card.message);
                          setDisplayButton(false);
                          return;
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="result relative max-h-[70vh] justify-center overflow-y-scroll px-5  py-0 text-[#E3E3E3]">
                <div className="flex items-center gap-4 ">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={assets.Professional_User}
                    alt=""
                  />
                  <p>{recentPrompt}</p>
                </div>
                <div className="flex items-end space-x-5">
                  <img
                    className=" absolute top-10 mt-10 h-12 w-12"
                    src={assets.gemini_icon}
                  />
                  {loading ? (
                    <>
                      <div className="loader mt-5 flex w-[750px] flex-col justify-center gap-[10px] pl-10 text-center ">
                        <hr className=" h-5 rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#191A1C] via-[#4577DB] to-[#191A1C]" />
                        <hr className=" h-5 rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#191A1C] via-[#4577DB] to-[#191A1C]" />
                        <hr className=" h-5 rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#191A1C] via-[#4577DB] to-[#191A1C]" />
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p
                        className="mt-2 p-12 text-[17px] font-light leading-7"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      ></p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className=" absolute bottom-0 m-auto max-h-screen w-full max-w-[900px] px-5 py-0">
          <div
            className={` mb-8 flex items-center justify-between gap-5 ${input ? "rounded-xl" : "rounded-full"} bg-[#1E1F20] px-5 py-4 text-[#BDC1C5]`}
          >
            <textarea
              className="flex-1 resize-none overflow-auto border-none bg-transparent text-sm text-[#BDC1C5] outline-none md:text-lg"
              placeholder="Enter a prompt here"
              rows="1"
              value={input}
              onChange={handleInputChange}
              style={{ lineHeight: "1.5", maxHeight: "150px" }}
            />
            <div>
              {displayButton && (
                <>
                  <AddPhotoAlternateOutlined className="mr-4 cursor-pointer text-[#E3E3E3]" />
                  <MicNoneOutlined className="mr-4 cursor-pointer text-[#E3E3E3]" />
                  {input && (
                    <SendOutlined
                      onClick={() => {
                        onSent(input);
                        setDisplayButton(false);
                        return;
                      }}
                      className="cursor-pointer text-[#E3E3E3]"
                    />
                  )}
                </>
              )}

              {!displayButton && (
                <StopCircle
                  onClick={() => {
                    pauseOutput();
                    setDisplayButton(true);
                    return;
                  }}
                  className="cursor-pointer text-[#E3E3E3]"
                />
              )}
            </div>
          </div>
          <p className="absolute bottom-2 left-0 right-0 m-auto text-center text-[6px] text-[#E3E3E3] md:text-[13px]">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
            <a
              href="https://support.google.com/gemini?p=privacy_notice"
              className="underline"
            >
              Your privacy & Gemini Apps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
