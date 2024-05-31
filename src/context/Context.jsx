import { createContext, useState, useRef, useEffect } from "react";
import geminiRun from "../config/gemini";

export const ApiContext = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState(() => {
    const loadPrevPrompts = localStorage.getItem("prevStoredPrompts");
    return loadPrevPrompts ? JSON.parse(loadPrevPrompts) : [];
  });
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayButton, setDisplayButton] = useState(true);
  const [resultData, setResultData] = useState("");
  const stopRef = useRef(stop);

  useEffect(() => {
    localStorage.setItem("prevStoredPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const delayPara = (index, nextWord, totalLength) => {
    setTimeout(() => {
      if (stopRef && stopRef.current) return;
      setResultData((prev) => prev + nextWord);

      //this condition is written here to set back the end response button back to normal buttons after the response is finished or else it will still stay the send response button and will not go back to normal buttons like gallery and mic buttons.

      //And why have we written this condition here and not somehwere else because this is the place where we are updating the response data and we want to set the button back to normal after the response is finished. and this is giving the typing effect because we are using the setTimeout function to delay the response and show the typing effect. If we write below the for loop which is calling this the condition gets updated before the response is finished and the button is set back to normal before the response is finished. and we dont want the stop button to disappear before the response is finished. hence we call it here before the last word that is length - 1. If current index is equal to the total length - 1 that means the response is finished as it will be the last word in the array. So we set the buttons back to the original buttons.

      if (index == totalLength - 1) {
        setDisplayButton("true");
      }
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const pauseOutput = () => {
    stopRef.current = true; // Update the ref value
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    stopRef.current = false; // Reset the ref value
    setPrevPrompts((prevPromts) => {
      const filteredPrompts = prevPromts.filter(
        (existingPrompt) => existingPrompt === prompt,
      );

      if (filteredPrompts.length === 0) {
        return [...prevPromts, prompt];
      }

      return prevPromts;
    });

    try {
      const response = await geminiRun(prompt);
      setRecentPrompt(prompt);

      let responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br></br>");
      let newResonse3 = newResponse2.replace("##", "");
      let finalResponse = newResonse3.split(" ");

      for (let i = 0; i < finalResponse.length; i++) {
        if (stopRef && stopRef.current) break;
        const nextWord = finalResponse[i];
        delayPara(i, nextWord + " ", finalResponse.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
    pauseOutput,
    newChat,
    displayButton,
    setDisplayButton,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ContextProvider;
