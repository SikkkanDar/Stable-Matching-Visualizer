import React from "react";
import img from "../../../../assets/control_btn_min.png";
import { PageContainer, ControlBar, PageNumber } from "./PagesElements";

const Page7 = () => {
  return (
    <PageContainer>
      <ControlBar>Control Bar</ControlBar>
      <img
        src={img}
        style={{
          width: "620px",
          height: "390px",
          marginBottom: "15px",
          marginTop: "48px",
        }}
        alt="ControlButton_Snapshot"
      />
      <PageNumber>7/9</PageNumber>
    </PageContainer>
  );
};

export default Page7;
