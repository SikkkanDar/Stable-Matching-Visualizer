import React, { useState, useEffect } from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import Info from "./Info/Info";

import {
  HeaderContainer,
  NavContainer,
  IconContainer,
  ToggleContainer,
  Title,
  Dummy,
  StyledFaInfoCircle,
  StyledFaGithub,
  StyledRiRestartFill,
  StyledImShuffle,
  StyledFaPlay,
  StyledFaPause,
  StyledBsSkipForwardFill,
  StyledFaStop,
  StyledFaSave,
  StyledFaFileUpload,
} from "./HeaderElements";

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
        color: "#ececec",
        backgroundColor: "#404040",
        fontFamily: '"Baloo Chettan 2",cursive',
        maxWidth: "200px",
      },
    },
  },
});

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    color: "#4a4a4a",
    padding: 1,
    "&$checked": {
      transform: "translateX(26px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#4a4a4a",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#4a4a4a",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `0px solid white`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Header = ({
  pause,
  SMPVizActive,
  SMPVizDone,
  handleChangeBgColor,
  handleRandomConfig,
  handleReset,
  handleSaveFile,
  handleInputFile,
  handlePlay,
  handlePause,
  handleSkip,
  handleStop,
  handleDarkMode,
}) => {
  const [state, setState] = useState(true);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let f = SMPVizActive;
    setActive(f);
  }, [SMPVizActive]);

  const handleChange = () => {
    if (active) return;
    handleChangeBgColor(!state);
    handleDarkMode(!state);
    setState(!state);
  };
  const handleUploadFile = (event) => {
    handleInputFile(event, true);
  };
  const handleOpen = (flag) => {
    setOpen(flag);
  };
  return (
    <HeaderContainer>
      <NavContainer>
        {!active ? (
          <>
            <StyledFaInfoCircle
              active={active}
              state={state}
              onClick={() => handleOpen(true)}
            />
            <Info open={open} handleOpen={handleOpen} />
            <a
              href="https://github.com/SikkkanDar/Stable-Matching-Visualizer"
              target="_blank"
              rel="noreferrer"
            >
              <StyledFaGithub active={active} state={state} />
            </a>
          </>
        ) : (
          <>
            <StyledFaInfoCircle active={active} state={state} />
            <StyledFaGithub active={active} state={state} />
          </>
        )}
      </NavContainer>
      <IconContainer state={state}>
        <StyledRiRestartFill
          onClick={() => {
            if (active) return;
            handleReset(true);
          }}
          active={!active}
          state={state}
        />
        <StyledImShuffle
          onClick={() => {
            if (active) return;
            handleRandomConfig(true);
          }}
          active={!active}
          state={state}
        />
        <StyledFaPlay onClick={() => handlePlay(true)} state={state} />
        <StyledBsSkipForwardFill
          onClick={() => {
            if (!active || SMPVizDone) return;
            handleSkip(true);
          }}
          active={active && !SMPVizDone}
          state={state}
        />
        <StyledFaPause
          onClick={() => {
            if (!active) return;
            handlePause(true);
          }}
          active={active}
          state={state}
          isPaused={pause && !SMPVizDone}
        />
        <StyledFaStop
          onClick={() => {
            if (!active) return;
            handleStop(true);
          }}
          active={active}
          state={state}
        />
        <StyledFaSave
          onClick={() => {
            if (active) return;
            handleSaveFile(true);
          }}
          active={!active}
          state={state}
        />
        <label for="upload-file">
          <StyledFaFileUpload active={!active} state={state} />
        </label>
        {!active && (
          <input
            id="upload-file"
            type="file"
            accept="application/json"
            onChange={handleUploadFile}
          />
        )}
      </IconContainer>
      <ToggleContainer>
        {active ? (
          <MuiThemeProvider theme={theme}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title={`Use stop button to switch to ${
                state ? "light" : "dark"
              } mode !`}
              placement="left"
              arrow
            >
              <Dummy active={active}>
                <StyledSwitch checked={state} onChange={handleChange} />
              </Dummy>
            </Tooltip>
          </MuiThemeProvider>
        ) : (
          <Dummy active={active}>
            <StyledSwitch checked={state} onChange={handleChange} />
          </Dummy>
        )}
        <Title state={state} active={active} onClick={handleChange}>
          {state ? "Switch to light" : "Switch to dark"}
        </Title>
      </ToggleContainer>
    </HeaderContainer>
  );
};

export default Header;
