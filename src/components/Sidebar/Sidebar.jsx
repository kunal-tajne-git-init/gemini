import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "../../index.css";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import DropdownRight from "../Dropdown/DropdownRight";

//Icon Imports from Material UI
import {
  History,
  HelpOutline,
  Settings,
  Menu,
  ChatBubbleOutline,
  PrivacyTipOutlined,
  EventNoteOutlined,
  AnnouncementOutlined,
  QuizOutlined,
  InfoOutlined,
  ExtensionOutlined,
  InsertLinkOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { ApiContext } from "../../context/Context";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [active, setActive] = useState(false);
  const { onSent, prevPrompts, newChat, setPrevPrompts } =
    useContext(ApiContext);
  const userEmail = useSelector((state) => state.userDetails.userEmail);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const containerControls = useAnimationControls();

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
  };
  const helpProps = {
    options: ["Privacy Hub", "Updates", "Help", "FAQ", "About Gemini Advanced"],
    urls: [
      "https://support.google.com/gemini?p=privacy_help",
      "https://gemini.google.com/updates",
      "https://support.google.com/gemini/answer/13275745?hl=en",
      "https://gemini.google.com/faq",
      "https://gemini.google.com/advanced",
    ],
    icons: [
      <PrivacyTipOutlined key="privacy" />,
      <EventNoteOutlined key="event" />,
      <AnnouncementOutlined key="announcement" />,
      <QuizOutlined key="quiz" />,
      <InfoOutlined key="info" />,
    ],
  };

  const settingProps = {
    options: ["Extentions", "Your public links", "Dark Theme"],
    urls: [
      "https://gemini.google.com/extensions",
      "https://gemini.google.com/sharing",
      "#",
    ],
    icons: [
      <ExtensionOutlined key="extensions" />,
      <InsertLinkOutlined key="public-links" />,
      <DarkModeOutlined key="dark-theme" />,
    ],
  };

  const containerVariants = {
    close: {
      width: "5rem",
      transition: {
        type: "spring",
        damping: 20, // Increased damping to reduce bounciness
        stiffness: 100, // Lower stiffness to reduce bounciness
      },
    },
    open: {
      width: "16rem",
      transition: {
        type: "spring",
        damping: 15, // Increased damping to reduce bounciness
        stiffness: 80, // Lower stiffness to reduce bounciness
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    if (active) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [active, containerControls]);

  useEffect(() => {
    let storedPrompts;
    if (isAuthenticated && userEmail) {
      storedPrompts = localStorage.getItem(`${userEmail}prevPrompts`);
    } else {
      storedPrompts = localStorage.getItem("prevPrompts");
    }
    if (storedPrompts) {
      setPrevPrompts(JSON.parse(storedPrompts));
    }
  }, [isAuthenticated, userEmail, setPrevPrompts]);

  return (
    <motion.nav
      variants={containerVariants}
      initial="close"
      animate={containerControls}
    >
      <div className="relative flex min-h-screen flex-col justify-between p-5 text-white md:bg-[#1E1F20] ">
        <div>
          <Menu
            className="-ml-2  mb-[50px] mt-3 w-5 cursor-pointer md:ml-2 md:mt-3 "
            src={assets.menu_icon}
            onClick={() => setActive(!active)}
          />
          <motion.div
            className={`mr-10 ${active ? "bg-[#1A1A1C]" : "hidden"} flex cursor-pointer items-center justify-center gap-1 rounded-[50px] p-2 md:mr-0 md:flex md:bg-[#1A1A1C]`}
            layout
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="grey"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <AnimatePresence>
              {active && (
                <motion.p
                  className="ml-2 text-sm text-[grey]"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="NewChatText"
                  onClick={() => newChat()}
                >
                  New Chat
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {active && (
              <>
                <motion.div
                  className="flex flex-col"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="Recent"
                >
                  <p className="mb-[20px] mt-[30px] pl-2">Recent</p>
                  {prevPrompts &&
                    prevPrompts
                      .slice(-10)
                      .reverse()
                      .map((prompt) => {
                        return (
                          <div
                            className="pr-15 ] flex cursor-pointer items-center rounded-3xl px-2 hover:bg-[#272A2C]"
                            key={prompt}
                          >
                            <ChatBubbleOutline
                              className="m-2 "
                              style={{ fontSize: 16 }}
                            />
                            <p onClick={() => loadPrompt(prompt)}>
                              {prompt.slice(0, 18)}...
                            </p>
                          </div>
                        );
                      })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col">
          <AnimatePresence>
            {active ? (
              <>
                <motion.div
                  className=" pr-15 relative flex cursor-pointer items-center gap-2.5 rounded-3xl px-2  hover:bg-[#272A2C]"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="Help"
                >
                  <DropdownRight data={helpProps}>
                    <div className="flex items-center gap-2">
                      <HelpOutline className="m-2" />
                      <p>Help</p>
                      <div className="ml-[100px] h-2 w-2 rounded bg-red-400"></div>
                    </div>
                  </DropdownRight>
                </motion.div>
                <motion.div
                  className="pr-15 flex cursor-pointer items-center gap-2.5 rounded-3xl px-2 hover:bg-[#272A2C]"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="Activity"
                >
                  <History className="m-2" />
                  <p>Activity</p>
                </motion.div>
                <motion.div
                  className="pr-15 flex cursor-pointer items-center gap-2.5 rounded-3xl px-2  hover:bg-[#272A2C]"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="Setting"
                >
                  <DropdownRight data={settingProps}>
                    <div className="flex items-center gap-2">
                      <Settings className="m-2" />
                      <p>Setting</p>
                    </div>
                  </DropdownRight>
                </motion.div>
                {/* <motion.div
                  className="mt-2 flex cursor-pointer flex-col px-2 text-sm"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="Location"
                >
                  <p className="text-[12px]"> • New York, NY, USA</p>
                  <p className="text-[12px] text-[#A8C7FA]">
                    Based on your places (Home) • Update location
                  </p>
                </motion.div> */}
              </>
            ) : (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="Icons"
                className="relative hidden md:block"
              >
                <div className="absolute left-7 my-1 h-2 w-2 rounded bg-red-400"></div>
                <DropdownRight data={helpProps}>
                  <HelpOutline className="m-2" />
                </DropdownRight>

                <History className="m-2" />

                <div className="absolute left-7 my-1 h-2 w-2 rounded bg-red-400"></div>

                <DropdownRight data={settingProps}>
                  <Settings className="m-2" />
                </DropdownRight>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
