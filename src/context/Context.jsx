import { createContext, useState, useRef } from "react";
import geminiRun from "../config/gemini";

export const ApiContext = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState();
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayButton, setDisplayButton] = useState(true);
  const [resultData, setResultData] = useState("");
  const stopRef = useRef(stop);
  const [displayLogout, setDisplayLogout] = useState(false);

  const delayPara = (index, nextWord, totalLength) => {
    setTimeout(() => {
      if (stopRef && stopRef.current) return;
      setResultData((prev) => prev + nextWord);
      if (index == totalLength - 1) {
        setDisplayButton(true);
      }
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const pauseOutput = () => {
    stopRef.current = true;
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    stopRef.current = false;
    setPrevPrompts((prevPrompts) => {
      const filteredPrompts = prevPrompts.filter(
        (existingPrompt) => existingPrompt === prompt,
      );
      if (filteredPrompts.length === 0) {
        return [...prevPrompts, prompt];
      }
      return prevPrompts;
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
    displayLogout,
    setDisplayLogout,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ContextProvider;
