import React, { useState, useEffect } from "react";
import MaleList from "./MaleList/MaleList";
import FemaleList from "./FemaleList/FemaleList";
import AnimationCol from "./AnimationCol/AnimationCol";
import { defaultArrangement } from "../helper/arrangement";
import {
  addMaleIndices,
  addFemaleIndices,
  removeColorAndToggle,
  removeMaleIndex,
  removeFemaleIndex,
  addMaleItem,
  addFemaleItem,
  randomConfigClick,
  isValidConfig,
  userSaveFile,
  validateJSONConfig,
  nameIndexMapper,
} from "../helper/helperFns";
import { SMPAlgo } from "../helper/algorithm";
import Scheduler from "../helper/scheduler";
import Informer from "../helper/informer";

let newMaleArray = addMaleIndices(
  defaultArrangement.male,
  defaultArrangement.female
);

let newFemaleArray = addFemaleIndices(
  defaultArrangement.male,
  defaultArrangement.female
);

let animationQueue;
let stableMarriageNameIndex;
let stableMarriageAlgorithm;
let stableMarriageProcessQueue;
// let informer = new Informer();

const MainList = ({
  shuffle,
  reset,
  saveFile,
  uploadFile,
  play,
  pause,
  skip,
  stop,
  SMPVizActive,
  SMPVizDone,
  darkMode,
  handleRandomConfig,
  handleReset,
  handleSaveFile,
  handleInputFile,
  handlePlay,
  handleVizActive,
  handleVizDone,
  handlePause,
  handleSkip,
  handleStop,
}) => {
  const [maleArray, setMaleArray] = useState(
    JSON.parse(JSON.stringify(newMaleArray))
  );
  const [femaleArray, setFemaleArray] = useState(
    JSON.parse(JSON.stringify(newFemaleArray))
  );
  const [resetMaleArray, setResetMaleArray] = useState(false);
  const [resetFemaleArray, setResetFemaleArray] = useState(false);

  const [entityMale, setEntityMale] = useState({});
  const [entityFemale, setEntityFemale] = useState({});
  const [flagBtn, setFlagBtn] = useState(true);
  const [highlightMaleIndex, setHighlightMaleIndex] = useState(-1);
  const [highlightFemaleIndex, setHighlightFemaleIndex] = useState(-1);
  const [toggleOpacity, setToggleOpacity] = useState(false);
  const [showFemaleEntity, setShowFemaleEntity] = useState(false);
  const [expandMalePreference, setExpandMalePreference] = useState(false);
  const [expandFemalePreference, setExpandFemalePreference] = useState(false);
  const [scrollMaleIndex, setScrollMaleIndex] = useState(false);
  const [scrollFemaleIndex, setScrollFemaleIndex] = useState(false);
  const [highlightMalePrefIndex, setHighlightMalePrefIndex] = useState(-1);
  const [highlightFemalePrefIndex, setHighlightFemalePrefIndex] = useState(-1);
  const [bgColor, setBgColor] = useState("");
  const [bgLeftColor, setBgLeftColor] = useState({});
  const [bgRightColor, setBgRightColor] = useState({});
  const [engageIndex, setEngageIndex] = useState(-1);
  const [showAnimationColor, setShowAnimationColor] = useState(false);
  const [informer, setInformer] = useState(new Informer());

  const showAnimationCol = (state, index) => {
    if (!stableMarriageAlgorithm || !SMPVizDone) return;
    animationQueue.clear();
    animationQueue.add(function () {
      setToggleOpacity(false);
      setExpandMalePreference(false);
      setExpandFemalePreference(false);
      setEntityMale({});
      setEntityFemale({});
      setHighlightMaleIndex(-1);
      setHighlightFemaleIndex(-1);
      setShowFemaleEntity(false);
      setScrollMaleIndex(false);
      setScrollFemaleIndex(false);
      setBgColor("");
      setBgLeftColor({});
      setBgRightColor({});
      setHighlightMalePrefIndex(-1);
      setHighlightFemalePrefIndex(-1);
      setEngageIndex(-1);
      setShowAnimationColor(false);
    }, 250);
    if (state === "male" && index !== undefined) {
      let entity = stableMarriageAlgorithm.male[index];
      if (entity.partner !== null) {
        let male = entity;
        let female = entity.partner;
        animationQueue.add(function () {
          setEntityMale(male);
          setEntityFemale(female);
          setBgColor(
            darkMode
              ? "linear-gradient(45deg,black,#b9ffc7) !important"
              : "linear-gradient(45deg,#00a460,#b0ffc0) !important"
          );
          setShowAnimationColor(true);
        }, 250);
        animationQueue.add(function () {
          setToggleOpacity(true);
        }, 250);
        animationQueue.add(function () {
          setExpandMalePreference(true);
        }, 250);
        animationQueue.add(function () {
          setScrollMaleIndex(true);
        }, 250);
        animationQueue.add(function () {
          let femaleIndex = male.preferencesName.indexOf(female.name);
          setHighlightMalePrefIndex(femaleIndex);
        }, 500);
        animationQueue.add(function () {
          setShowFemaleEntity(true);
        }, 250);
        animationQueue.add(function () {
          setExpandFemalePreference(true);
        }, 250);
        animationQueue.add(function () {
          setScrollFemaleIndex(true);
        }, 250);
        animationQueue.add(function () {
          let maleIndex = female.preferencesName.indexOf(male.name);
          setHighlightFemalePrefIndex(maleIndex);
        }, 500);
        animationQueue.add(function () {
          setExpandMalePreference(false);
        }, 250);
        animationQueue.add(function () {
          setExpandFemalePreference(false);
        }, 250);
      } else {
        informer.queueMessage(
          "warning",
          `${entity.name} has no partner. 😢`,
          2000
        );
      }
    } else if (state === "female" && index !== undefined) {
      let entity = stableMarriageAlgorithm.female[index];
      if (entity.partner !== null) {
        let male = entity.partner;
        let female = entity;
        animationQueue.add(function () {
          setEntityMale(male);
          setEntityFemale(female);
          setBgColor(
            darkMode
              ? "linear-gradient(45deg,black,#b9ffc7) !important"
              : "linear-gradient(45deg,#00a460,#b0ffc0) !important"
          );
          setShowAnimationColor(true);
        }, 250);
        animationQueue.add(function () {
          setToggleOpacity(true);
        }, 250);
        animationQueue.add(function () {
          setExpandMalePreference(true);
        }, 250);
        animationQueue.add(function () {
          setScrollMaleIndex(true);
        }, 250);
        animationQueue.add(function () {
          let femaleIndex = male.preferencesName.indexOf(female.name);
          setHighlightMalePrefIndex(femaleIndex);
        }, 500);
        animationQueue.add(function () {
          setShowFemaleEntity(true);
        }, 250);
        animationQueue.add(function () {
          setExpandFemalePreference(true);
        }, 250);
        animationQueue.add(function () {
          setScrollFemaleIndex(true);
        }, 250);
        animationQueue.add(function () {
          let maleIndex = female.preferencesName.indexOf(male.name);
          setHighlightFemalePrefIndex(maleIndex);
        }, 500);
        animationQueue.add(function () {
          setExpandMalePreference(false);
        }, 250);
        animationQueue.add(function () {
          setExpandFemalePreference(false);
        }, 250);
      } else {
        informer.queueMessage(
          "warning",
          `${entity.name} has no partner. 😢`,
          1500
        );
      }
    }
  };

  const showResult = () => {
    if (!stableMarriageAlgorithm) return;
    handleVizActive(true);
    handleVizDone(true);
    // Animation stops and containers are again uninteractive.
    animationQueue.clear();
    setToggleOpacity(false);
    setBgLeftColor({});
    setBgRightColor({});

    setTimeout(function () {
      for (let entity of stableMarriageAlgorithm.male) {
        let curMaleIndex = stableMarriageNameIndex[entity.name];
        if (entity.partner !== null) {
          setBgLeftColor({
            index: curMaleIndex,
            color: darkMode
              ? "linear-gradient(45deg,black,#b9ffc7) !important"
              : "linear-gradient(45deg,#00a460,#b0ffc0) !important",
          });
        } else {
          setBgLeftColor({
            index: curMaleIndex,
            color: darkMode
              ? "linear-gradient(45deg,black,#ff4747) !important"
              : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important",
          });
        }
      }
      for (let entity of stableMarriageAlgorithm.female) {
        let curFemaleIndex = stableMarriageNameIndex[entity.name];
        if (entity.partner !== null) {
          setBgRightColor({
            index: curFemaleIndex,
            color: darkMode
              ? "linear-gradient(45deg,black,#b9ffc7) !important"
              : "linear-gradient(45deg,#00a460,#b0ffc0) !important",
          });
        } else {
          setBgRightColor({
            index: curFemaleIndex,
            color: darkMode
              ? "linear-gradient(45deg,black,#ff4747) !important"
              : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important",
          });
        }
      }
    }, 0);
  };

  const animationStep = () => {
    let { process, content } = stableMarriageProcessQueue.shift();
    let { male, female, dumped } = content;
    let curMaleIndex = stableMarriageNameIndex[male.name];
    let curFemaleIndex = stableMarriageNameIndex[female.name];
    // If the process is in between
    if (process !== "done" && process !== "start") {
      animationQueue.add(function () {
        setToggleOpacity(true);
      }, 250);
      animationQueue.add(function () {
        setExpandMalePreference(true);
      }, 250);
      animationQueue.add(function () {
        setScrollMaleIndex(true);
      }, 250);
      let selectIndex = male.preferencesName.indexOf(female.name);
      if (selectIndex !== undefined) {
        animationQueue.add(function () {
          setHighlightMalePrefIndex(selectIndex);
        }, 500);
      }
    }

    // 1st Step
    if (process === "start") {
      animationQueue.add(function () {
        setHighlightMaleIndex(curMaleIndex);
      }, 250);
      animationQueue.add(function () {
        setEntityMale(male);
        setEntityFemale(female);
      }, 250);
    }

    // Engage Process
    else if (process === "engage") {
      animationQueue.add(function () {
        setHighlightFemaleIndex(curFemaleIndex);
      }, 250);
      animationQueue.add(function () {
        setShowFemaleEntity(true);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(true);
      }, 250);
      animationQueue.add(function () {
        setScrollFemaleIndex(true);
      }, 250);
      let selectIndex = female.preferencesName.indexOf(male.name);
      if (selectIndex !== undefined) {
        animationQueue.add(function () {
          setHighlightFemalePrefIndex(selectIndex);
        }, 500);
      }
      animationQueue.add(function () {
        setExpandMalePreference(false);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(false);
      }, 250);
      animationQueue.add(function () {
        setBgColor(
          darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important"
        );
      }, 500);
      animationQueue.add(function () {
        setBgLeftColor({
          index: curMaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important",
        });
        setBgRightColor({
          index: curFemaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important",
        });
        informer.queueMessage(
          "warning",
          `${male.name} is engaged with ${female.name}.`,
          2000
        );
      }, 500);
    }

    // Break Process
    else if (process === "break") {
      animationQueue.add(function () {
        let oldPartnerIndex = female.preferencesName.indexOf(dumped.name);
        setEngageIndex(oldPartnerIndex);
      }, 250);
      animationQueue.add(function () {
        setShowFemaleEntity(true);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(true);
      }, 250);
      animationQueue.add(function () {
        setScrollFemaleIndex(true);
      }, 250);
      animationQueue.add(function () {
        let maleIndex = female.preferencesName.indexOf(male.name);
        setHighlightFemalePrefIndex(maleIndex);
        informer.queueMessage(
          "warning",
          `${female.name} breaks up with current partner ${dumped.name} and engages with ${male.name} 🤝.`,
          2000
        );
      }, 500);
      animationQueue.add(function () {
        setExpandMalePreference(false);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(false);
      }, 250);
      animationQueue.add(function () {
        let dumpedMaleIndex = stableMarriageNameIndex[dumped.name];
        setBgColor(
          darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important"
        );
        setBgLeftColor({
          index: curMaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important",
        });
        setBgLeftColor({
          index: dumpedMaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff4747) !important"
            : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important",
        });
      }, 500);
    }

    // Reject Process
    else if (process === "reject") {
      // This is the animation for reject.
      // Reject means the female stays with their current partner, opposite of break.
      animationQueue.add(function () {
        let partnerIndex = female.preferencesName.indexOf(female.partner.name);
        setEngageIndex(partnerIndex);
      }, 250);
      animationQueue.add(function () {
        setShowFemaleEntity(true);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(true);
      }, 250);
      animationQueue.add(function () {
        setScrollFemaleIndex(true);
      }, 250);
      animationQueue.add(function () {
        let maleIndex = female.preferencesName.indexOf(male.name);
        setHighlightFemalePrefIndex(maleIndex);
      }, 250);
      animationQueue.add(function () {
        setExpandMalePreference(false);
      }, 250);
      animationQueue.add(function () {
        setExpandFemalePreference(false);
      }, 250);

      animationQueue.add(function () {
        setBgColor(
          darkMode
            ? "linear-gradient(45deg,black,#ff4747) !important"
            : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important"
        );
        informer.queueMessage(
          "warning",
          `${female.name} stays with current partner ${female.partner.name} and rejects ${male.name} 💔.`,
          2000
        );
      }, 250);
      animationQueue.add(function () {
        setBgLeftColor({
          index: curMaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff4747) !important"
            : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important",
        });
        setBgRightColor({
          index: curFemaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff4747) !important"
            : "linear-gradient(45deg,#e62a2a,#ffb6b6) !important",
        });
      }, 250);

      animationQueue.add(function () {
        setBgRightColor({
          index: curFemaleIndex,
          color: darkMode
            ? "linear-gradient(45deg,black,#ff8535) !important"
            : "linear-gradient(45deg, #f79f00, #ffd174) !important",
        });
      }, 500);
    }

    // Last step process
    else if (process === "done") {
      // Animation for when the process is done. Removes the elements.
      animationQueue.add(function () {
        setToggleOpacity(false);
      }, 250);
      animationQueue.add(function () {
        setEntityMale({});
        setEntityFemale({});
        setShowFemaleEntity(false);
        setScrollMaleIndex(false);
        setScrollFemaleIndex(false);
        setBgColor("");
        setBgLeftColor({});
        setBgRightColor({});
        setHighlightMalePrefIndex(-1);
        setHighlightFemalePrefIndex(-1);
        setEngageIndex(-1);
      }, 250);
    }
    if (stableMarriageProcessQueue.length === 0) {
      animationQueue.add(function () {
        showResult();
        informer.queueMessage(
          "valid",
          "Tap an entity to show its partner.",
          2500
        );
      }, 100);
    } else {
      animationQueue.add(function () {
        animationStep();
      }, 250);
    }
  };

  useEffect(() => {
    if (shuffle) {
      let { randomFinalMaleArr, randomFinalFemaleArr } = randomConfigClick();
      setFlagBtn(false);
      setMaleArray(randomFinalMaleArr);
      setFemaleArray(randomFinalFemaleArr);
      handleRandomConfig(false);
      // To avoid undefined behaviour of toggle property in respective gender array!
      setTimeout(() => {
        setFlagBtn(true);
      }, 500);
      informer.queueMessage(
        "valid",
        "Configuration has been randomized.",
        1500
      );
    }
    if (reset) {
      setFlagBtn(false);
      setMaleArray(JSON.parse(JSON.stringify(newMaleArray)));
      setFemaleArray(JSON.parse(JSON.stringify(newFemaleArray)));
      handleReset(false);
      setTimeout(() => {
        setFlagBtn(true);
      }, 500);
      informer.queueMessage(
        "valid",
        "Configuration has been reset to default.",
        1500
      );
    }
  }, [shuffle, reset]);

  useEffect(() => {
    if (saveFile) {
      if (isValidConfig(maleArray, femaleArray)) {
        userSaveFile(
          JSON.stringify({ male: maleArray, female: femaleArray }, null, 5),
          "configuration.json",
          "application/json"
        );
        informer.queueMessage(
          "valid",
          "The configuration file is being saved at your device as configuration.json"
        );
      } else {
        informer.queueMessage(
          "error",
          "Configuration is invalid. Please use unique names for all entities."
        );
      }
      handleSaveFile(false);
    }
    if (uploadFile.state && uploadFile.event) {
      let file = uploadFile.event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.addEventListener("load", function (readerEvent) {
        try {
          let config = JSON.parse(readerEvent.target.result);
          // This would throw an error if anything is wrong and prevent further lines in the same block from being executed;
          validateJSONConfig(config);
          setFlagBtn(false);
          setMaleArray([...config.male]);
          setFemaleArray([...config.female]);
          informer.queueMessage("valid", "Configuration loaded successfully.");
          setTimeout(() => {
            handleInputFile("", false);
            setFlagBtn(true);
          }, 500);
        } catch (error) {
          // Shows an error in the UI.
          informer.queueMessage("error", error.message);
        } finally {
          // Make sure to reset the value of this file input to reload the same file, if given the same file.
          uploadFile.event.target.value = "";
        }
      });
    }
  }, [saveFile, uploadFile]);

  useEffect(() => {
    if (play) {
      if (!SMPVizActive && !SMPVizDone) {
        let config = {
          male: maleArray,
          female: femaleArray,
        };
        if (!isValidConfig(maleArray, femaleArray)) {
          informer.queueMessage(
            "error",
            "Configuration is invalid. Please use unique names for all entities."
          );
          // To enable the play control btn again
          handlePlay(false);
          return;
        }
        animationQueue = new Scheduler();
        stableMarriageNameIndex = nameIndexMapper(config);
        stableMarriageAlgorithm = new SMPAlgo(config, stableMarriageNameIndex);
        stableMarriageProcessQueue = [];

        while (!stableMarriageAlgorithm.isDone()) {
          stableMarriageAlgorithm.algoIterate();
          stableMarriageProcessQueue.push(
            ...stableMarriageAlgorithm.capture.getCurrent()
          );
        }
        // Make sure the animationQueue is not disabled.
        animationQueue.disable = false;

        informer.queueMessage("valid", "Visualization starts 🚀");
        handleVizActive(true);
        setTimeout(() => {
          animationStep();
        }, 1200);
      } else if (
        pause &&
        SMPVizActive &&
        animationQueue &&
        animationQueue.disable
      ) {
        handlePause(false);
        animationQueue.continue();
        informer.queueMessage("valid", "Visualization continuing.");
        // Third conditional is for when the visualization is done, and the user can only use stop to reset everything.
      } else {
        informer.queueMessage(
          "warning",
          "Use stop button to reset the visualization."
        );
        if (SMPVizDone) handlePlay(false);
      }
    }
  }, [play]);

  useEffect(() => {
    if (pause) {
      if (
        (animationQueue && animationQueue.disable) ||
        !SMPVizActive ||
        SMPVizDone
      ) {
        return;
      }
      animationQueue.pause();
      informer.queueMessage("valid", "Visualization paused.");
      handlePlay(false);
    }
  }, [pause]);

  useEffect(() => {
    if (skip) {
      if (!SMPVizActive || SMPVizDone) return;
      showResult();
      informer.queueMessage(
        "valid",
        "Tap an entity to show its partner.",
        3000
      );
      handleSkip(false);
      handlePlay(false);
      handlePause(false);
    }
  }, [skip]);

  useEffect(() => {
    if (stop) {
      animationQueue.clear();

      // Reset the necessary variables.
      stableMarriageAlgorithm = null;
      stableMarriageNameIndex = null;
      stableMarriageProcessQueue = [];
      handleVizActive(false);
      handleVizDone(false);
      handlePlay(false);
      handleSkip(false);
      handlePause(false);
      setHighlightMaleIndex(-1);
      setHighlightFemaleIndex(-1);

      // Animate the removal of the entities.
      let timeoutQueue = new Scheduler();
      timeoutQueue.add(function () {
        setToggleOpacity(false);
        setExpandMalePreference(false);
        setExpandFemalePreference(false);
        setEntityMale({});
        setEntityFemale({});
        setShowFemaleEntity(false);
        setScrollMaleIndex(false);
        setScrollFemaleIndex(false);
        setBgColor("");
        setBgLeftColor({});
        setBgRightColor({});
        setHighlightMalePrefIndex(-1);
        setHighlightFemalePrefIndex(-1);
        setEngageIndex(-1);
        setShowAnimationColor(false);
      }, 100);

      // Repopulate the DOM.
      setResetMaleArray(true);
      setResetFemaleArray(true);
      timeoutQueue.add(function () {
        setResetMaleArray(false);
        setResetFemaleArray(false);
        handleStop(false);
      }, 2000);
    }
  }, [stop]);

  const handleMaleArr = (arr) => {
    let tempMlArr = addMaleIndices(maleArray, arr);
    let tempFlArr = removeColorAndToggle(arr);
    setMaleArray(tempMlArr);
    setFemaleArray(tempFlArr);
  };

  const handleFemaleArr = (arr) => {
    let tempFlArr = addFemaleIndices(arr, femaleArray);
    let tempMlArr = removeColorAndToggle(arr);
    setMaleArray(tempMlArr);
    setFemaleArray(tempFlArr);
  };

  const handleMalePreferences = (ind, val) => {
    let tempMale = [...maleArray];
    let tempFemale = [...femaleArray];
    let newInd = parseInt(ind);
    femaleArray[newInd].index.forEach((id, i) => {
      tempMale[i].preferences[id] = val;
    });
    // femaleArray[newInd].name = val;
    tempFemale[newInd].name = val;
    setMaleArray(tempMale);
    setFemaleArray(tempFemale);
  };
  const handleFemalePreferences = (ind, val) => {
    let tempFemale = [...femaleArray];
    let tempMale = [...maleArray];
    let newInd = parseInt(ind);
    maleArray[newInd].index.forEach((id, i) => {
      tempFemale[i].preferences[id] = val;
    });
    // maleArray[newInd].name = val;
    tempMale[newInd].name = val;
    setMaleArray(tempMale);
    setFemaleArray(tempFemale);
  };

  // Bug -> Forgot to update index array of opposite gender & index array of same gender whose preference was lower than current!
  const handleDeleteMaleList = (maleArr, indexArr, idx) => {
    let { tempMale, tempFemale } = removeMaleIndex(
      maleArr,
      femaleArray,
      indexArr,
      idx
    );
    // let tempArr = addMaleIndices(maleArr, tempFemale);
    let tempArr = removeColorAndToggle(tempMale);
    setFemaleArray(tempFemale);
    setMaleArray(tempArr);
  };

  const handleDeleteFemaleList = (femaleArr, indexArr, idx) => {
    let { tempMale, tempFemale } = removeFemaleIndex(
      maleArray,
      femaleArr,
      indexArr,
      idx
    );
    // let tempArr = addFemaleIndices(tempMale, femaleArr);
    let tempArr = removeColorAndToggle(tempFemale);
    setMaleArray(tempMale);
    setFemaleArray(tempArr);
  };

  const handleAddMaleItem = () => {
    let { newMaleArr, newFemaleArr } = addMaleItem(maleArray, femaleArray);
    setMaleArray(newMaleArr);
    setFemaleArray(newFemaleArr);
  };

  const handleAddFemaleItem = () => {
    let { newMaleArr, newFemaleArr } = addFemaleItem(maleArray, femaleArray);
    setMaleArray(newMaleArr);
    setFemaleArray(newFemaleArr);
  };

  return (
    <>
      <MaleList
        male={maleArray}
        handleFemalePreferences={handleFemalePreferences}
        handleFemaleArr={handleFemaleArr}
        handleDeleteMaleList={handleDeleteMaleList}
        handleAddMaleItem={handleAddMaleItem}
        flagBtn={flagBtn}
        SMPVizActive={SMPVizActive}
        SMPVizDone={SMPVizDone}
        highlightMaleIndex={highlightMaleIndex}
        bgColor={bgLeftColor}
        showAnimationCol={showAnimationCol}
        resetMaleArray={resetMaleArray}
        informer={informer}
        darkMode={darkMode}
      />
      <AnimationCol
        male={entityMale}
        female={entityFemale}
        showFemaleEntity={showFemaleEntity}
        toggleOpacity={toggleOpacity}
        expandMalePreference={expandMalePreference}
        expandFemalePreference={expandFemalePreference}
        scrollMaleIndex={scrollMaleIndex}
        scrollFemaleIndex={scrollFemaleIndex}
        highlightMalePrefIndex={highlightMalePrefIndex}
        highlightFemalePrefIndex={highlightFemalePrefIndex}
        bgColor={bgColor}
        engageIndex={engageIndex}
        showAnimationColor={showAnimationColor}
        SMPVizActive={SMPVizActive}
        darkMode={darkMode}
      />
      <FemaleList
        female={femaleArray}
        handleMalePreferences={handleMalePreferences}
        handleMaleArr={handleMaleArr}
        handleDeleteFemaleList={handleDeleteFemaleList}
        handleAddFemaleItem={handleAddFemaleItem}
        flagBtn={flagBtn}
        SMPVizActive={SMPVizActive}
        SMPVizDone={SMPVizDone}
        highlightFemaleIndex={highlightFemaleIndex}
        bgColor={bgRightColor}
        showAnimationCol={showAnimationCol}
        resetFemaleArray={resetFemaleArray}
        informer={informer}
        darkMode={darkMode}
      />
    </>
  );
};

export default MainList;
