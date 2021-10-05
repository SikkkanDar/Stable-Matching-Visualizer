import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiRestartFill } from "react-icons/ri";
import { ImShuffle } from "react-icons/im";
import { BsSkipForwardFill } from "react-icons/bs";
import {
  FaInfoCircle,
  FaGithub,
  FaStop,
  FaPlay,
  FaPause,
  FaFileUpload,
  FaSave,
} from "react-icons/fa";

export const HeaderContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: column3-end;
  grid-row-start: 2;
  grid-row-end: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 70px;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      text-decoration: none;
    }
  }
`;

export const StyledFaInfoCircle = styled(FaInfoCircle)`
  color: ${({ state }) => (state ? "#b3b3a9" : "#545454")};
  height: 32px;
  width: 32px;
  margin: 0 20px;
  transition: 0.1s ease-in;
  opacity: ${({ active }) => (active ? "0.3" : "1")};
  cursor: ${({ active }) => (active ? "" : "pointer")};

  &:hover {
    color: ${({ state, active }) =>
      state
        ? active
          ? "#b3b3a9"
          : "#d8d8cd"
        : active
        ? "#545454"
        : "#000000"};
  }
`;

export const StyledFaGithub = styled(FaGithub)`
  color: ${({ state }) => (state ? "#b3b3a9" : "#545454")};
  height: 32px;
  width: 32px;
  margin: 0 20px;
  transition: 0.1s ease-in;
  opacity: ${({ active }) => (active ? "0.3" : "1")};
  cursor: ${({ active }) => (active ? "" : "pointer")};

  &:hover {
    color: ${({ state, active }) =>
      state
        ? active
          ? "#b3b3a9"
          : "#d8d8cd"
        : active
        ? "#545454"
        : "#000000"};
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    text-decoration: none;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 75px;
  border: ${({ state }) => (state ? "3px solid grey" : "3px solid #6f6f6f")};
  border-radius: 28px;
  height: 60px;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-style-true {
    color: #a9bf20;
    height: 25px;
    width: 25px;
    margin: 0 12px;
    cursor: pointer;

    &:hover {
      color: #dcff00;
    }
  }
  .icon-style-false {
    color: #545454;
    height: 25px;
    width: 25px;
    margin: 0 12px;
    cursor: pointer;
    transition: 0.1s ease-in;

    &:hover {
      color: #000000;
    }
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 125px;
`;

export const Title = styled.h3`
  color: ${({ state }) => (state ? "grey" : "#5f5f5f")};
  font-weight: 900;
  margin-left: 10px;
  opacity: ${({ active }) => (active ? "0.2" : "1")};
  cursor: ${({ active }) => (active ? "" : "pointer")};
`;

export const StyledRiRestartFill = styled(RiRestartFill)`
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  height: 30px;
  width: 30px;
  margin: 0 12px;
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const Dummy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ active }) => (active ? "0.3" : "1")};
`;
export const StyledImShuffle = styled(ImShuffle)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const StyledFaPlay = styled(FaPlay)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ state }) => (state ? "#b3b3a9" : "#545454")};
  cursor: pointer;

  &:hover {
    color: ${({ state }) => (state ? "#d8d8cd" : "#000000")};
    transition: 0.1s ease-in;
  }
`;

export const StyledBsSkipForwardFill = styled(BsSkipForwardFill)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const StyledFaPause = styled(FaPause)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  border: ${({ active, state, isPaused }) =>
    active
      ? isPaused
        ? state
          ? "1px solid #bdbdbd"
          : "2px solid #4c4949"
        : ""
      : ""};
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const StyledFaStop = styled(FaStop)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const StyledFaSave = styled(FaSave)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;

export const StyledFaFileUpload = styled(FaFileUpload)`
  height: 25px;
  width: 25px;
  margin: 0 12px;
  color: ${({ active, state }) =>
    active ? (state ? "#b3b3a9" : "#545454") : state ? "#616161" : "#adadad"};
  cursor: ${({ active }) => (active ? "pointer" : "")};

  &:hover {
    color: ${({ active, state }) =>
      active ? (state ? "#d8d8cd" : "#000000") : state ? "#616161" : "#adadad"};
    transition: 0.1s ease-in;
  }
`;
