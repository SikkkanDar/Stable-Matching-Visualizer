import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Container,
  SkipBtn,
  PreviousBtn,
  NextBtn,
  BtnTitle,
} from "./InfoElements";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Page1 from "./InfoPages/Page1";
import Page2 from "./InfoPages/Page2";
import Page3 from "./InfoPages/Page3";
import Page4 from "./InfoPages/Page4";
import Page5 from "./InfoPages/Page5";
import Page6 from "./InfoPages/Page6";
import Page7 from "./InfoPages/Page7";
import Page8 from "./InfoPages/Page8";
import Page9 from "./InfoPages/Page9";

const Helper = ({ pageNumber }) => {
  let component;
  switch (pageNumber) {
    case 1:
      component = <Page1 />;
      break;
    case 2:
      component = <Page2 />;
      break;
    case 3:
      component = <Page3 />;
      break;
    case 4:
      component = <Page4 />;
      break;
    case 5:
      component = <Page5 />;
      break;
    case 6:
      component = <Page6 />;
      break;
    case 7:
      component = <Page7 />;
      break;
    case 8:
      component = <Page8 />;
      break;
    case 9:
      component = <Page9 />;
      break;
    default:
      component = <Page1 />;
  }
  return component;
};

const Info = ({ open, handleOpen }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const handleClose = () => {
    handleOpen(false);
    setPageNumber(1);
  };
  const increasePageNumber = () => {
    if (pageNumber === 9) {
      handleClose();
      return;
    }
    setPageNumber(pageNumber + 1);
  };
  const decreasePageNumber = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  return (
    <div>
      {/* Modal will disappear only on clicking close button (Skip Tutorial) ! */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Container>
          <Helper pageNumber={pageNumber} />
          <SkipBtn
            variant="contained"
            startIcon={<SkipNextIcon />}
            onClick={handleClose}
          >
            <BtnTitle>Skip Tutorial</BtnTitle>
          </SkipBtn>
          {pageNumber > 1 && (
            <PreviousBtn
              variant="contained"
              startIcon={<NavigateBeforeIcon />}
              onClick={decreasePageNumber}
            >
              <BtnTitle>Previous</BtnTitle>
            </PreviousBtn>
          )}
          <NextBtn
            variant="contained"
            startIcon={
              pageNumber === 9 ? <CheckCircleIcon /> : <NavigateNextIcon />
            }
            onClick={increasePageNumber}
            flag={pageNumber === 9}
          >
            <BtnTitle>{pageNumber === 9 ? "Finish" : "Next"}</BtnTitle>
          </NextBtn>
        </Container>
      </Modal>
    </div>
  );
};

export default Info;
