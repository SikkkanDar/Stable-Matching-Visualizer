import React, { useState, useEffect } from "react";
import {
  AnimationStyledPaper,
  AnimationList,
  Name,
  PreferenceList,
  ListItem,
  StyledFaChevronCircleRight,
  StyledFaChevronCircleDown,
} from "../MainListElements";
import Collapse from "@material-ui/core/Collapse";
import { Scrollbars } from "react-custom-scrollbars";

const AnimationCol = ({
  male,
  female,
  showFemaleEntity,
  toggleOpacity,
  expandMalePreference,
  expandFemalePreference,
  scrollMaleIndex,
  scrollFemaleIndex,
  highlightMalePrefIndex,
  highlightFemalePrefIndex,
  bgColor,
  engageIndex,
  showAnimationColor,
  SMPVizActive,
  darkMode,
}) => {
  const [toggleMale, setToggleMale] = useState(false);
  const [toggleFemale, setToggleFemale] = useState(false);
  const [styleElementFlag, setStyleElementFlag] = useState(false);
  const [malePrefInd, setMalePrefInd] = useState(-1);
  const [femalePrefInd, setFemalePrefInd] = useState(-1);

  useEffect(() => {
    setStyleElementFlag(toggleOpacity);
  }, [toggleOpacity]);
  useEffect(() => {
    let fm = expandMalePreference;
    let ff = expandFemalePreference;
    setToggleMale(fm);
    setToggleFemale(ff);
  }, [expandMalePreference, expandFemalePreference]);
  useEffect(() => {
    if (scrollMaleIndex) {
      let maleEntity = document.getElementsByClassName("entity-male");
      maleEntity[0].parentNode.parentNode.parentNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [scrollMaleIndex]);
  useEffect(() => {
    if (scrollFemaleIndex) {
      let femaleEntity = document.getElementsByClassName("entity-female");
      femaleEntity[0].parentNode.parentNode.parentNode.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [scrollFemaleIndex]);
  useEffect(() => {
    // if (highlightMalePrefIndex !== -1) {
    // }
    // if (highlightFemalePrefIndex !== -1) {
    // }
    // Will move to updated preference index !
    setMalePrefInd(highlightMalePrefIndex);
    setFemalePrefInd(highlightFemalePrefIndex);
  }, [highlightMalePrefIndex, highlightFemalePrefIndex]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Scrollbars style={{ width: 480, height: 635 }} autoHide>
          <Collapse
            in={toggleMale}
            collapsedHeight="85px"
            timeout="auto"
            style={{
              overflow: "hidden",
              width: "450px",
              borderRadius: "30px",
            }}
          >
            <AnimationStyledPaper
              elevation={10}
              styleElementFlag={styleElementFlag}
              highlight={!toggleMale && bgColor === ""}
              className="entity-male"
              bgColor={bgColor}
              engageIndex={-1}
              toggle={toggleMale}
              darkMode={darkMode}
            >
              <AnimationList
                flag={toggleMale}
                engageIndex={-1}
                showAnimationColor={showAnimationColor}
                pointer={SMPVizActive}
                darkMode={darkMode}
              >
                {!toggleMale ? (
                  <StyledFaChevronCircleRight
                    animation={true}
                    pointer={SMPVizActive}
                    play={SMPVizActive}
                    darkMode={darkMode}
                  />
                ) : (
                  <StyledFaChevronCircleDown
                    animation={true}
                    pointer={SMPVizActive}
                    play={SMPVizActive}
                    darkMode={darkMode}
                  />
                )}
                <Name pointer={SMPVizActive} darkMode={darkMode}>
                  {male.name}
                </Name>
              </AnimationList>
              {toggleMale &&
                male &&
                male.preferencesName.map((pref, ind) => {
                  return (
                    <PreferenceList
                      ind={ind}
                      len={male.preferencesName.length}
                      key={ind}
                      animation={true}
                      highlight={malePrefInd === ind ? true : false}
                      engageHighlight={false}
                      showAnimationColor={showAnimationColor}
                      active={SMPVizActive}
                      darkMode={darkMode}
                    >
                      <ListItem
                        animation={true}
                        darkMode={darkMode}
                        disabled={SMPVizActive}
                      >
                        {pref}
                      </ListItem>
                    </PreferenceList>
                  );
                })}
            </AnimationStyledPaper>
          </Collapse>
          {showFemaleEntity && (
            <>
              <Collapse
                in={toggleFemale}
                collapsedHeight="85px"
                timeout="auto"
                style={{
                  overflow: "hidden",
                  width: "450px",
                  borderRadius: "30px",
                }}
              >
                <AnimationStyledPaper
                  elevation={10}
                  styleElementFlag={styleElementFlag}
                  highlight={!toggleFemale && bgColor === ""}
                  className="entity-female"
                  bgColor={bgColor}
                  engageIndex={engageIndex}
                  toggle={toggleFemale}
                  darkMode={darkMode}
                >
                  <AnimationList
                    flag={toggleFemale}
                    engageIndex={engageIndex}
                    showAnimationColor={showAnimationColor}
                    pointer={SMPVizActive}
                    darkMode={darkMode}
                  >
                    {!toggleFemale ? (
                      <StyledFaChevronCircleRight
                        animation={true}
                        pointer={SMPVizActive}
                        play={SMPVizActive}
                        darkMode={darkMode}
                      />
                    ) : (
                      <StyledFaChevronCircleDown
                        animation={true}
                        pointer={SMPVizActive}
                        play={SMPVizActive}
                        darkMode={darkMode}
                      />
                    )}
                    <Name pointer={SMPVizActive} darkMode={darkMode}>
                      {female.name}
                    </Name>
                  </AnimationList>
                  {toggleFemale &&
                    female &&
                    female.preferencesName.map((pref, ind) => {
                      return (
                        <PreferenceList
                          ind={ind}
                          len={female.preferencesName.length}
                          key={ind}
                          animation={true}
                          highlight={femalePrefInd === ind ? true : false}
                          engageHighlight={engageIndex === ind ? true : false}
                          showAnimationColor={showAnimationColor}
                          active={SMPVizActive}
                          darkMode={darkMode}
                        >
                          <ListItem
                            animation={true}
                            darkMode={darkMode}
                            disabled={SMPVizActive}
                          >
                            {pref}
                          </ListItem>
                        </PreferenceList>
                      );
                    })}
                </AnimationStyledPaper>
              </Collapse>
            </>
          )}
        </Scrollbars>
      </div>
    </>
  );
};

export default AnimationCol;
