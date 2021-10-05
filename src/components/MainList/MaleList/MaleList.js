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

const MaleList = ({
  male,
  handleFemalePreferences,
  handleFemaleArr,
  handleDeleteMaleList,
  handleAddMaleItem,
  flagBtn,
  SMPVizActive,
  SMPVizDone,
  highlightMaleIndex,
  bgColor,
  showAnimationCol,
  resetMaleArray,
  informer,
  darkMode,
}) => {
  let obj = male.map((elem) => {
    return { ...elem, toggle: false, color: "" };
  });

  const [maleArr, setMaleArr] = useState(obj);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragItemNode = useRef();

  useEffect(() => {
    if (highlightMaleIndex !== -1) {
      // window.scrollTo(0, myRef.current[highlightMaleIndex].offsetTop);
      let maleEntity = document.getElementsByClassName(
        `male-${highlightMaleIndex}`
      );
      maleEntity[0].parentNode.parentNode.parentNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    if (Object.keys(bgColor).length !== 0) {
      let ar = JSON.parse(JSON.stringify(maleArr));
      ar[bgColor.index].color = bgColor.color;
      setMaleArr(ar);
    }
  }, [highlightMaleIndex, bgColor]);

  // It's not updating to obj while re-rendering wrt parent component, So I returned a new array from handleDeleteMaleList fn !!
  // Now, Fixed !!
  useEffect(() => {
    if (flagBtn) {
      maleArr.forEach((item, ind) => {
        obj[ind].toggle = item.toggle;
      });
    }
    setMaleArr(obj);
  }, [male]);
  useEffect(() => {
    if (resetMaleArray || SMPVizActive) {
      let ar = JSON.parse(JSON.stringify(maleArr));
      ar.map((elem) => {
        elem.color = "";
        elem.toggle = false;
      });
      setMaleArr(ar);
    }
  }, [resetMaleArray, SMPVizActive]);

  const toggle = (ind) => {
    if (SMPVizActive) return;
    let ar = [...maleArr];
    let temp = ar[ind].toggle;
    ar[ind].toggle = !temp;
    setMaleArr(ar);
  };

  const handleNameChange = (event) => {
    // Wrong Approach: Everytime new element gets created
    // setMaleArr([...maleArr, ([event.target.name] = event.target.value)]);
    // Right Approach
    let ind = event.target.id;
    // Make a shallow copy of the array
    let ar = [...maleArr];
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
    handleFemalePreferences(ind, event.target.value);
    setMaleArr(ar);
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
      // console.log("Swapping..");
      setMaleArr((maleArr) => {
        // let newMaleArr = JSON.parse(JSON.stringify(maleArr));
        // Make a shallow copy of the array
        // A shallow copy means the first level is copied, deeper levels are referenced.
        // For deep copy: JSON.parse(JSON.stringify(maleArr))
        let newMaleArr = [...maleArr];
        newMaleArr[targetItem.index].preferences.splice(
          targetItem.ind,
          0,
          newMaleArr[dragItem.current.index].preferences.splice(
            dragItem.current.ind,
            1
          )[0]
        );
        dragItem.current = targetItem;
        // let tempArr = [...maleArr];
        // tempArr.forEach((val) => {
        //   delete val.toggle;
        // });
        handleFemaleArr(newMaleArr);
        return newMaleArr;
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

  //  let temp = [...maleArr];
  //  let tempIndex = maleArr[ind].index;
  //  maleArr.splice(ind, 1);
  //  let newMaleArr = handleDeleteMaleList(maleArr, tempIndex);
  //  setMaleArr(newMaleArr);

  const handleDeleteItem = (ind) => {
    // let temp = [...maleArr];
    if (SMPVizActive) return;
    if (maleArr.length - 1 < minimumEntityCount) {
      informer.queueMessage(
        "warning",
        `Number of male entities cannot go below minimum ${minimumEntityCount}.`,
        1500
      );
      return;
    }
    let tempIndex = maleArr[ind].index;
    maleArr.splice(ind, 1);
    handleDeleteMaleList(maleArr, tempIndex, ind);
    // setMaleArr(temp);
  };

  const addMaleItem = () => {
    if (SMPVizActive) {
      if (SMPVizDone)
        informer.queueMessage(
          "warning",
          "Use stop button to edit configuration.",
          1500
        );
      return;
    }
    if (maleArr.length + 1 > maximumEntityCount) {
      informer.queueMessage(
        "warning",
        `Maximum number of entities (${maximumEntityCount}) has been reached.`,
        1500
      );
      return;
    }
    handleAddMaleItem();
  };

  const showAnimation = (ind) => {
    if (!SMPVizActive) return;
    showAnimationCol("male", ind);
  };
  return (
    <LeftContainer id="male">
      <Scrollbars style={{ width: 480, height: 615 }} autoHide>
        {maleArr.map((elem, index) => {
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
                className={"male-" + index}
                highlight={highlightMaleIndex === index ? true : false}
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
                    id={index}
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
          onClick={addMaleItem}
          play={SMPVizActive}
          pointer={SMPVizActive && !SMPVizDone}
          darkMode={darkMode}
        />
      </Scrollbars>
    </LeftContainer>
  );
};

export default MaleList;
