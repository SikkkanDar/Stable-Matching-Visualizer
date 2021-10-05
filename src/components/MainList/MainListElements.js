import styled from "styled-components";
import { Paper, Input } from "@material-ui/core";
import { FaChevronCircleDown, FaChevronCircleRight } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdDragHandle, MdAddCircle } from "react-icons/md";

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  #male {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 3;
    grid-row-end: 3;
  }
`;

export const StyledPaper = styled(Paper)`
  border-radius: 30px !important;
  min-height: ${(props) => (props.flag ? "inherit" : "55px")}!important;
  width: 420px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ highlight, bgColor, darkMode }) =>
    darkMode
      ? bgColor !== ""
        ? bgColor
        : highlight
        ? "linear-gradient( 45deg , black, #b1f6ff)"
        : "linear-gradient( 45deg , black, #fffbf1)"
      : bgColor !== ""
      ? bgColor
      : highlight
      ? "linear-gradient(45deg, #54d4fd, #aaeaff) !important"
      : ""};
  box-shadow: 0px 8px 6px -3px rgb(0 0 0 / 20%), 0px 9px 7px 1px rgb(0 0 0 / 5%),
    0px 4px 18px 3px rgb(0 0 0 / 10%) !important;
`;

export const AnimationStyledPaper = styled(Paper)`
  border-radius: 30px !important;
  min-height: ${(props) => (props.flag ? "inherit" : "55px")}!important;
  width: 420px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ styleElementFlag }) => (styleElementFlag ? "1" : "0")};
  background: ${({ highlight, bgColor, engageIndex, toggle, darkMode }) =>
    darkMode
      ? highlight
        ? engageIndex === -1
          ? "linear-gradient( 45deg , black, #b1f6ff)"
          : "linear-gradient(45deg,black,#ff8535) !important"
        : toggle
        ? "linear-gradient( 45deg , black, #fffbf1)"
        : bgColor
      : highlight
      ? engageIndex === -1
        ? "linear-gradient(45deg, #54d4fd, #aaeaff) !important" // blue variant
        : "linear-gradient(45deg, #f79f00, #ffd174) !important" // orange variant
      : toggle
      ? ""
      : bgColor};

  box-shadow: 0px 8px 6px -3px rgb(0 0 0 / 20%), 0px 9px 7px 1px rgb(0 0 0 / 5%),
    0px 4px 18px 3px rgb(0 0 0 / 10%) !important;
`;

export const List = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
  padding: 0 3px;
  border-radius: 30px;
  border-bottom-left-radius: ${({ flag }) => (flag ? "0px" : "")};
  border-bottom-right-radius: ${({ flag }) => (flag ? "0px" : "")};
  padding-top: ${({ flag }) => (flag ? "6px" : "")};
  padding-bottom: ${({ flag }) => (flag ? "5px" : "")};
  background-color: ${({ flag, darkMode }) =>
    flag ? (darkMode ? "" : "lightblue") : ""};
  background: ${({ flag, darkMode }) =>
    flag ? (darkMode ? "linear-gradient( 45deg , black, #c5c5c5)" : "") : ""};
`;

export const AnimationList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
  padding: 0 3px;
  border-radius: 30px;
  border-bottom-left-radius: ${({ flag }) => (flag ? "0px" : "")};
  border-bottom-right-radius: ${({ flag }) => (flag ? "0px" : "")};
  padding-top: ${({ flag }) => (flag ? "6px" : "")};
  padding-bottom: ${({ flag }) => (flag ? "5px" : "")};
  background: ${({ flag, engageIndex, showAnimationColor, darkMode }) =>
    darkMode
      ? flag
        ? showAnimationColor
          ? "linear-gradient(45deg,black,#b9ffc7)"
          : engageIndex === -1
          ? "linear-gradient( 45deg , black, #b1f6ff)"
          : "linear-gradient( 45deg , black, #ff8535)"
        : ""
      : flag
      ? showAnimationColor
        ? "linear-gradient(45deg,#00a460,#b0ffc0)" // green variant
        : engageIndex === -1
        ? "linear-gradient(45deg, #54d4fd, #aaeaff)"
        : "linear-gradient(45deg, #f79f00, #ffd174)"
      : ""};
`;

export const Name = styled.span`
  font-size: 25px;
  font-weight: 550;
  font-family: "Baloo Chettan 2", cursive;
  color: ${({ darkMode }) => (darkMode ? "white" : "#3e3e3e")};
  text-align: left;
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
  text-transform: capitalize;
`;

export const PreferenceList = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: ${({ animation }) => (animation ? "default" : "grab")};
  padding: 8px;
  padding-left: 5px;
  min-height: 53px;
  background-color: ${({ styleFlag, darkMode }) =>
    styleFlag ? (darkMode ? "#302020" : "darkgrey") : ""};
  border-bottom-left-radius: ${({ ind, len }) =>
    ind === len - 1 ? "30px" : ""};
  border-bottom-right-radius: ${({ ind, len }) =>
    ind === len - 1 ? "30px" : ""};
  &:hover {
    background-color: ${({ active, darkMode }) =>
      active ? "" : darkMode ? "#665050" : "lightgrey"};
  }
  background-color: ${({
    highlight,
    engageHighlight,
    showAnimationColor,
    darkMode,
  }) =>
    darkMode
      ? engageHighlight
        ? "#b56a3a"
        : highlight
        ? showAnimationColor
          ? "#64a070"
          : "#665050"
        : ""
      : engageHighlight
      ? "#ffbb40"
      : highlight
      ? showAnimationColor
        ? "#30ffa9"
        : "lightgrey"
      : ""};
`;

export const StyledInput = styled(Input)`
  &:before {
    border-bottom: 0px !important;
  }
  &:after {
    border-bottom: 0px !important;
  }
  input {
    font-size: 25px;
    font-weight: 550;
    font-family: "Baloo Chettan 2", cursive;
    color: ${({ darkMode, disabled, done }) =>
      darkMode
        ? "white"
        : disabled
        ? done
          ? "#3e3e3e"
          : "#505050"
        : "#6f6f6f"};
    text-align: left;
    cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
    text-transform: capitalize;
  }
`;

export const StyledFaChevronCircleRight = styled(FaChevronCircleRight)`
  height: ${({ animation }) => (animation ? "22px" : "25px")};
  width: ${({ animation }) => (animation ? "22px" : "25px")};
  margin: 0 10px;
  margin-right: 22px;
  color: ${({ darkMode }) => (darkMode ? "#b3b3a9" : "#4a4a4a")};
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};

  &:hover {
    color: ${({ darkMode, play }) =>
      darkMode ? (play ? "#b3b3a9" : "#d8d8cd") : play ? "#4a4a4a" : "#000000"};
  }
`;

export const StyledFaChevronCircleDown = styled(FaChevronCircleDown)`
  height: ${({ animation }) => (animation ? "22px" : "25px")};
  width: ${({ animation }) => (animation ? "22px" : "25px")};
  margin: 0 10px;
  margin-right: 22px;
  margin-left: ${({ animation }) => (animation ? "12px" : "10px")};
  color: ${({ darkMode }) => (darkMode ? "#b3b3a9" : "#4a4a4a")};
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};

  &:hover {
    color: ${({ darkMode, play }) =>
      darkMode ? (play ? "#b3b3a9" : "#d8d8cd") : play ? "#4a4a4a" : "#000000"};
  }
`;

export const StyledRiDeleteBack2Fill = styled(RiDeleteBack2Fill)`
  height: 30px;
  width: 30px;
  margin: 0 12px;
  margin-left: 20px;
  color: ${({ darkMode }) => (darkMode ? "#232323" : "#4a4a4a")};
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
  /* opacity: ${({ play }) => (play ? "0" : "1")}; */

  &:hover {
    color: ${({ darkMode, play }) =>
      darkMode ? (play ? "#232323" : "#101010") : play ? "#4a4a4a" : "#000000"};
  }
`;

export const StyledMdDragHandle = styled(MdDragHandle)`
  height: 25px;
  width: 25px;
  margin-left: 8px;
  margin-right: 22px;
  color: ${({ darkMode }) => (darkMode ? "black" : "#4a4a4a")};
  cursor: grab;
  display: ${({ styleFlag }) => (styleFlag ? "none" : "")};

  &:hover {
    color: #000000;
  }
`;

export const ListItem = styled.span`
  font-size: 25px;
  font-weight: 550;
  font-family: "Baloo Chettan 2", cursive;
  color: ${({ darkMode, disabled }) =>
    darkMode ? "white" : disabled ? "#505050" : "#6f6f6f"};
  text-transform: capitalize;
  display: ${({ styleFlag }) => (styleFlag ? "none" : "")};
  margin-left: ${({ animation }) => (animation ? "54px" : "")};
`;

export const StyledMdAddCircle = styled(MdAddCircle)`
  height: 50px;
  width: 50px;
  color: ${({ darkMode }) => (darkMode ? "#b3b3a9" : "#4a4a4a")};
  margin-left: 200px;
  margin-top: 18px;
  cursor: ${({ pointer }) => (pointer ? "default" : "pointer")};
  &:hover {
    color: ${({ darkMode, play }) =>
      darkMode ? (play ? "#b3b3a9" : "#d8d8cd") : play ? "#4a4a4a" : "#000000"};
  }
`;
