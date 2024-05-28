import { useEffect, useState } from "react";
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

const Sidebar = () => {
  const [active, setActive] = useState(false);

  const containerControls = useAnimationControls();

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
      <PrivacyTipOutlined />,
      <EventNoteOutlined />,
      <AnnouncementOutlined />,
      <QuizOutlined />,
      <InfoOutlined />,
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
      <ExtensionOutlined />,
      <InsertLinkOutlined />,
      <DarkModeOutlined />,
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

  return (
    <motion.nav
      variants={containerVariants}
      initial="close"
      animate={containerControls}
    >
      <div className="z-10 flex min-h-screen flex-col justify-between bg-[#1E1F20] p-5 text-white">
        <div>
          <Menu
            className="m-2 mb-[50px] w-5 cursor-pointer"
            src={assets.menu_icon}
            onClick={() => setActive(!active)}
          />
          <motion.div
            className="flex cursor-pointer items-center justify-center gap-1 rounded-[50px] bg-[#1A1A1C] p-2"
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
                  <div className="pr-15 ] flex cursor-pointer items-center rounded-3xl px-2 hover:bg-[#272A2C]">
                    <ChatBubbleOutline
                      className="m-2 "
                      style={{ fontSize: 16 }}
                    />
                    <p>What is react Js...</p>
                  </div>
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
                className="relative"
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
