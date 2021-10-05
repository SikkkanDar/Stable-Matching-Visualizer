import React, { useState } from "react";
import Header from "./components/Header/Header";
import Notifier from "./components/Notifier/Notifier";
import MainList from "./components/MainList/MainList";

const App = () => {
  const [styleBg, setStyleBg] = useState({
    backgroundColor: "#212121",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "grid",
    gridTemplateColumns: "33% 34% 33%",
    gridTemplateRows: "15px 90px auto",
  });
  const [shuffle, setShuffle] = useState(false);
  const [reset, setReset] = useState(false);
  const [saveFile, setSaveFile] = useState(false);
  const [uploadFile, setUploadFile] = useState({
    state: false,
    event: "",
  });
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
  const [skip, setSkip] = useState(false);
  const [stop, setStop] = useState(false);
  const [SMPVizActive, setSMPVizActive] = useState(false);
  const [SMPVizDone, setSMPVizDone] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleChangeBgColor = (val) => {
    if (val) {
      setStyleBg({
        backgroundColor: "#212121",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        display: "grid",
        gridTemplateColumns: "33% 34% 33%",
        gridTemplateRows: "15px 90px auto",
      });
    } else {
      setStyleBg({
        backgroundColor: "white",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        display: "grid",
        gridTemplateColumns: "33% 34% 33%",
        gridTemplateRows: "15px 90px auto",
      });
    }
  };
  const handleRandomConfig = (state) => {
    setShuffle(state);
  };
  const handleReset = (state) => {
    setReset(state);
  };
  const handleSaveFile = (state) => {
    setSaveFile(state);
  };
  const handleInputFile = (newEvent, newState) => {
    setUploadFile({
      state: newState,
      event: newEvent,
    });
  };
  const handlePlay = (state) => {
    setPlay(state);
  };
  const handleVizActive = (state) => {
    setSMPVizActive(state);
  };
  const handleVizDone = (state) => {
    setSMPVizDone(state);
  };
  const handlePause = (state) => {
    setPause(state);
  };
  const handleSkip = (state) => {
    setSkip(state);
  };
  const handleStop = (state) => {
    setStop(state);
  };
  const handleDarkMode = (state) => {
    setDarkMode(state);
  };

  return (
    <div className="App" style={styleBg}>
      <Notifier />
      <Header
        pause={pause}
        SMPVizActive={SMPVizActive}
        SMPVizDone={SMPVizDone}
        handleChangeBgColor={handleChangeBgColor}
        handleRandomConfig={handleRandomConfig}
        handleReset={handleReset}
        handleSaveFile={handleSaveFile}
        handleInputFile={handleInputFile}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleSkip={handleSkip}
        handleStop={handleStop}
        handleDarkMode={handleDarkMode}
      />
      <MainList
        shuffle={shuffle}
        reset={reset}
        saveFile={saveFile}
        uploadFile={uploadFile}
        play={play}
        pause={pause}
        skip={skip}
        stop={stop}
        SMPVizActive={SMPVizActive}
        SMPVizDone={SMPVizDone}
        darkMode={darkMode}
        handleRandomConfig={handleRandomConfig}
        handleReset={handleReset}
        handleSaveFile={handleSaveFile}
        handleInputFile={handleInputFile}
        handlePlay={handlePlay}
        handleVizActive={handleVizActive}
        handleVizDone={handleVizDone}
        handlePause={handlePause}
        handleSkip={handleSkip}
        handleStop={handleStop}
      />
    </div>
  );
};

export default App;
