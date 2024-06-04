import { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Modal } from "@mui/base/Modal";
import { logout } from "../../store/authSlice";
import profileStorageService from "../../appwrite/storage.js";
import { Google } from "@mui/icons-material";

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
import FileModal from "./FileModal.jsx";
import {
  setUserDetails,
  resetUserDetails,
  setLocalStorage,
} from "../../store/userDetailsSlice.js";
import conf from "../../conf/conf.js";

const LogoutCard = ({ show, setShow, handleLogin }) => {
  const { displayLogout, fileUrl, setFileUrl, fileId, setFileId } =
    useContext(ApiContext);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [uploadStatus, setUploadStatus] = useState("");
  const [file, setFile] = useState();
  // const [fileId, setFileId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [fileUrl, setFileUrl] = useState();

  const { hasProfile } = useSelector((state) => state.userDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { userName, userEmail, isGoogleLoggedIn } = useSelector(
    (state) => state.userDetails,
  );
  // const userEmail = useSelector((state) => state.userDetails.userEmail);

  const fileInputRef = useRef(); // Ref to the hidden file input

  const handleLogout = async () => {
    dispatch(logout());
    await authService.logout();
    dispatch(resetUserDetails());
    navigate("/");
    // setFileId("665cfb3f00312139e5ee");
  };

  const handleUpload = async () => {
    if (file) {
      // Check if a file is selected
      try {
        setUploadStatus("Uploading..."); // Update the status to "Uploading..."
        const response = await profileStorageService.uploadFile(file); // Call the uploadFile method from storageService
        // // Get the file ID from the response
        // console.log("File ID: ", response?.$id);

        // // Update the user details in the Redux store

        if (response) {
          const currFileId = response?.$id;

          setFileId(currFileId);

          dispatch(
            setUserDetails({
              name: userName,
              email: userEmail,
              fileId: currFileId,
              hasProfile: true,
            }),
          );

          dispatch(
            setLocalStorage({
              name: userName,
              email: userEmail,
              fileId: currFileId,
              hasProfile: true,
            }),
          );

          // Check if the response is valid
          setUploadStatus("Upload successful!"); // Update the status to "Upload successful!"
          setShowModal(false);
        } else {
          setUploadStatus("Upload failed."); // Update the status to "Upload failed."
        }
      } catch (error) {
        setUploadStatus("Upload failed."); // Update the status to "Upload failed." in case of an error
        console.error("Error uploading file:", error); // Log the error
      }
    } else {
      console.log("No file selected"); // Log if no file is selected
      setUploadStatus("No file selected"); // Update the status to "No file selected"
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleGoogleLogin = async () => {
    try {
      const isLoggedIn = authService.googleLogin();

      if (isLoggedIn) {
        dispatch(login());
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setFile(null); // Reset the file state
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      // Check if a file is selected
      const selectedFile = event.target.files[0]; // Get the selected file
      setFile(selectedFile); // Set the file object state
      setShowModal(true); // Show the modal with the selected file preview
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };

  useEffect(() => {
    if (isAuthenticated && hasProfile) {
      // const fetchFile = async () => {
      //   const currLocalStorage = JSON.parse(
      //     localStorage.getItem(userEmail + "userDetails"),
      //   );

      //   const currUserFileId = currLocalStorage.fileId;
      //   // setFileId(currUserFileId);

      //   const response = await profileStorageService.getFiles({
      //     fileId: currUserFileId,
      //   });

      // console.log("Curr User File ID: ", response);

      // const url = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;

      const bucketId = conf.appwriteBucketId;
      const projectId = conf.appwriteProjectId;

      if (bucketId && projectId && fileId) {
        const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
        setFileUrl(url);
      }

      // const url = `https://cloud.appwrite.io/v1/storage/buckets/665a6f08001eafd6e54b/files/665d3c31000cdda489c8/view?project=665a6b2000327e024ac1`;

      //   console.log("File: ", fileId);
      // };

      // fetchFile();
    } else {
      setFileUrl(
        "https://cloud.appwrite.io/v1/storage/buckets/665a6f08001eafd6e54b/files/665cfb3f00312139e5ee/view?project=665a6b2000327e024ac1",
      );
    }
  }, [fileId, isAuthenticated, hasProfile, userEmail]);

  return (
    <>
      {displayLogout && (
        <div className=" flex min-w-[150px] max-w-[500px] flex-col rounded-2xl bg-[#282A2C] pb-4 text-[#E3E3E3] md:min-w-[400px]">
          <div className="relative mt-5 flex flex-col items-center space-y-3">
            <p className="text-sm">
              {isAuthenticated ? userEmail : "haveagoodday@gmail.com"}
            </p>
            <div className="relative">
              <img
                className="h-20 w-20 rounded-full"
                src={fileUrl}
                alt="Professional User"
              />
              {isAuthenticated && (
                <>
                  {isGoogleLoggedIn && (
                    <EditOutlined
                      className="absolute left-[52px] top-[60px] cursor-pointer rounded-full bg-black p-1"
                      style={{ width: "24px", height: "24px" }}
                      onClick={handleClick} // Call handleClick on icon click
                    />
                  )}
                  <input
                    type="file"
                    style={{ display: "none" }} // Hide the file input
                    ref={fileInputRef} // Attach the ref to the hidden file input
                    onChange={handleFileChange} // Call handleFileChange on file selection
                  />
                  <FileModal
                    show={showModal} // Control the modal visibility
                    onClose={handleCloseModal} // Handle modal close action
                    onConfirm={handleUpload} // Handle file upload action
                    file={file} // Pass the selected file to the modal
                  />
                  {uploadStatus && (
                    <p className="mt-2 text-gray-700">{uploadStatus}</p>
                  )}
                </>
              )}
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
                  open
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

            {!isAuthenticated && (
              <div className="flex items-center gap-2 rounded-xl border-4 border-blue-500 bg-white px-5 py-[4px] text-lg font-semibold text-black">
                <Google />
                <button onClick={handleGoogleLogin}>Login with Google</button>
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
