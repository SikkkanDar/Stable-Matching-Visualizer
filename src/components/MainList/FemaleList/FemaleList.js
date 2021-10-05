import React, { useState, useRef, useEffect } from "react";
import {
  LeftContainer,
  StyledPaper,
  List,
  PreferenceList,
  ListItem,
  StyledInput,
  StyledFaChevronCircleRight,
  StyledFaChevronCircleDown,
  StyledRiDeleteBack2Fill,
  StyledMdDragHandle,
  StyledMdAddCircle,
} from "../MainListElements";
import Collapse from "@material-ui/core/Collapse";
import {
  minimumEntityCount,
  maximumEntityCount,
  maximumCharCount,
} from "../../helper/arrangement";
import { Scrollbars } from "react-custom-scrollbars";

const FemaleList = ({
  female,
  handleMalePreferences,
  handleMaleArr,
  handleDeleteFemaleList,
  handleAddFemaleItem,
  flagBtn,
  SMPVizActive,
  SMPVizDone,
  highlightFemaleIndex,
  bgColor,
  showAnimationCol,
  resetFemaleArray,
  informer,
  darkMode,
}) => {
  let obj = female.map((elem) => {
    return { ...elem, toggle: false, color: "" };
  });

  const [femaleArr, setFemaleArr] = useState(obj);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragItemNode = useRef();

  useEffect(() => {
    if (highlightFemaleIndex !== -1) {
      // window.scrollTo(0, myRef.current[highlightFemaleIndex].offsetTop);
      let femaleEntity = document.getElementsByClassName(
        `female-${highlightFemaleIndex}`
      );
      femaleEntity[0].parentNode.parentNode.parentNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    if (Object.keys(bgColor).length !== 0) {
      let ar = [...femaleArr];
      ar[bgColor.index].color = bgColor.color;
      setFemaleArr(ar);
    }
  }, [highlightFemaleIndex, bgColor]);

  // It's not updating to obj while re-rendering wrt parent component, So I returned a new array from handleDeleteFemaleList fn!!
  // Now, Fixed !!
  useEffect(() => {
    if (flagBtn) {
      femaleArr.forEach((item, ind) => {
        obj[ind].toggle = item.toggle;
      });
    }
    setFemaleArr(obj);
  }, [female]);

  useEffect(() => {
    if (resetFemaleArray || SMPVizActive) {
      let ar = JSON.parse(JSON.stringify(femaleArr));
      ar.map((elem) => {
        elem.color = "";
        elem.toggle = false;
      });
      setFemaleArr(ar);
    }
  }, [resetFemaleArray, SMPVizActive]);

  const toggle = (ind) => {
    if (SMPVizActive) return;
    let ar = [...femaleArr];
    let temp = ar[ind].toggle;
    ar[ind].toggle = !temp;
    setFemaleArr(ar);
  };

  const handleNameChange = (event) => {
    let ind = event.target.id;
    ind -= 20; // For creating unique id, adding 20 (id => index + 20)
    // Make a shallow copy of the array
    let ar = [...femaleArr];
    let temp = event.target.value;
    if (temp.length > maximumCharCount) {
      informer.queueMessage(
        "warning",
        `Only ${maximumCharCount} characters are allowed!`,
        2000
      );
      return;
    }
    ar[ind].name = temp;
    handleMalePreferences(ind, event.target.value);
    setFemaleArr(ar);
  };

  const handleDragStart = (e, item) => {
    // console.log("Staring Drag...");
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, targetItem) => {
    // console.log("Entering a drag target", targetItem);
    // 1st condition: Items should be different
    // (inorder to place the item in original position, 1st condition is removed !)
    // 2nd condition: Group should be same
    if (
      // dragItemNode.current !== e.target &&
      dragItem.current.index === targetItem.index
    ) {
      setFemaleArr((femaleArr) => {
        // let newMaleArr = JSON.parse(JSON.stringify(maleArr));
        // Make a shallow copy of the array
        let newFemaleArr = [...femaleArr];
        newFemaleArr[targetItem.index].preferences.splice(
          targetItem.ind,
          0,
          newFemaleArr[dragItem.current.index].preferences.splice(
            dragItem.current.ind,
            1
          )[0]
        );
        dragItem.current = targetItem;
        handleMaleArr(newFemaleArr);
        return newFemaleArr;
      });
    }
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const getStyles = (item) => {
    if (
      dragging &&
      dragItem.current.index === item.index &&
      dragItem.current.ind === item.ind
    ) {
      return true;
    }
    return false;
  };

  const handleDeleteItem = (ind) => {
    // let temp = [...femaleArr];
    if (SMPVizActive) return;
    if (femaleArr.length - 1 < minimumEntityCount) {
      informer.queueMessage(
        "warning",
        `Number of female entities cannot go below minimum ${minimumEntityCount}.`,
        1500
      );
      return;
    }
    let tempIndex = femaleArr[ind].index;
    femaleArr.splice(ind, 1);
    handleDeleteFemaleList(femaleArr, tempIndex, ind);
    // setFemaleArr(femaleArr);
  };

  const addFemaleItem = () => {
    if (SMPVizActive) {
      if (SMPVizDone)
        informer.queueMessage(
          "warning",
          "Use stop button to edit configuration.",
          1500
        );
      return;
    }
    if (femaleArr.length + 1 > maximumEntityCount) {
      informer.queueMessage(
        "warning",
        `Maximum number of entities (${maximumEntityCount}) has been reached.`,
        1500
      );
      return;
    }
    handleAddFemaleItem();
  };

  const showAnimation = (ind) => {
    if (!SMPVizActive) return;
    showAnimationCol("female", ind);
  };

  return (
    <LeftContainer id="female">
      <Scrollbars style={{ width: 480, height: 615 }} autoHide>
        {femaleArr.map((elem, index) => {
          return (
            <Collapse
              in={elem.toggle}
              collapsedHeight="85px"
              timeout="auto"
              style={{
                overflow: "hidden",
                width: "450px",
                borderRadius: "30px",
              }}
            >
              <StyledPaper
                elevation={10}
                key={index}
                // ref={(element) => myRef.current.push(element)}
                className={"female-" + index}
                highlight={highlightFemaleIndex === index ? true : false}
                bgColor={elem.color}
                darkMode={darkMode}
                onClick={() => showAnimation(index)}
              >
                <List
                  flag={elem.toggle}
                  pointer={SMPVizActive && !SMPVizDone}
                  darkMode={darkMode}
                >
                  {!elem.toggle ? (
                    <StyledFaChevronCircleRight
                      onClick={() => toggle(index)}
                      play={SMPVizActive}
                      pointer={SMPVizActive && !SMPVizDone}
                      darkMode={darkMode}
                    />
                  ) : (
                    <StyledFaChevronCircleDown
                      onClick={() => toggle(index)}
                      play={SMPVizActive}
                      darkMode={darkMode}
                    />
                  )}
                  <StyledInput
                    autoComplete="off"
                    placeholder="Enter name"
                    spellCheck="false"
                    value={elem.name}
                    onChange={handleNameChange}
                    id={index + 20}
                    disabled={SMPVizActive}
                    done={SMPVizDone}
                    pointer={SMPVizActive && !SMPVizDone}
                    darkMode={darkMode}
                  />
                  <StyledRiDeleteBack2Fill
                    onClick={() => handleDeleteItem(index)}
                    play={SMPVizActive}
                    pointer={SMPVizActive && !SMPVizDone}
                    darkMode={darkMode}
                  />
                </List>
                {elem.toggle &&
                  elem.preferences.map((pref, ind) => {
                    return (
                      <PreferenceList
                        ind={ind}
                        len={elem.preferences.length}
                        key={ind}
                        draggable
                        onDragStart={(e) => handleDragStart(e, { index, ind })}
                        onDragEnter={
                          dragging
                            ? (e) => {
                                handleDragEnter(e, { index, ind });
                              }
                            : null
                        }
                        styleFlag={getStyles({ index, ind })}
                        darkMode={darkMode}
                      >
                        <StyledMdDragHandle
                          styleFlag={getStyles({ index, ind })}
                          darkMode={darkMode}
                        />
                        <ListItem
                          styleFlag={getStyles({ index, ind })}
                          darkMode={darkMode}
                          disabled={SMPVizActive}
                        >
                          {pref}
                        </ListItem>
                      </PreferenceList>
                    );
                  })}
              </StyledPaper>
            </Collapse>
          );
        })}
        <StyledMdAddCircle
          onClick={addFemaleItem}
          play={SMPVizActive}
          pointer={SMPVizActive && !SMPVizDone}
          darkMode={darkMode}
        />
      </Scrollbars>
    </LeftContainer>
  );
};

export default FemaleList;
