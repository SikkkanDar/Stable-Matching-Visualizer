import React from "react";
import styled from "styled-components";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customStyle.css";

const Notifier = () => {
  return (
    <NotifierContainer>
      <ToastContainer
        limit={3}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
      />
    </NotifierContainer>
  );
};

const NotifierContainer = styled.div`
  background-color: "transparent";
  grid-column-start: 1;
  grid-column-end: column3-end;
  grid-row-start: 1;
  grid-row-end: 1;
`;

export default Notifier;
