import { useState } from "react";
import { assets } from "../../assets/assets";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { Add, AddCircleTwoTone, LogoutTwoTone } from "@mui/icons-material";

const LogoutCard = () => {
  console.log("LogoutCard");
  return (
    <>
      <div className="flex min-w-[150px] max-w-[500px] flex-col rounded-2xl bg-[#272A2C] pb-4 text-[#E3E3E3] md:min-w-[400px]">
        <div className="mt-5 flex flex-col items-center space-y-5">
          <p className="text-sm">haveagoodday@gmail.com</p>
          <img
            className="h-20 w-20 rounded-full"
            src={assets.Professional_User}
            alt="Professional User"
          />
          <p className="text-xl">Hi, Explorer!</p>
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
            <AccordionItem className="">
              <p1 className="text-sm">
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="mt-4 min-w-[200px] pb-4 md:min-w-[250px] "
                  >
                    Hide more Accounts
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </p1>
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
                  <div className="flex flex-row items-center gap-5 py-3">
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
    </>
  );
};

export default LogoutCard;
