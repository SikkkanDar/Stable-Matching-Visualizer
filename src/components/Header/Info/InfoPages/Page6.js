import React from "react";
import gif from "../../../../assets/mode_stm_algoviz.gif";
import {
  PageContainer,
  Heading,
  PageNumber,
  InfoContent,
} from "./PagesElements";

const Page6 = () => {
  return (
    <PageContainer>
      <Heading sz="45px">Visualizing and more</Heading>
      <InfoContent>
        To begin the visualisation, press the <strong>play button</strong>. The
        application seamlessly starts the animation on demand and the user can
        watch in ease, as the containers automatically adjust to accommodate the
        entities that need to be displayed. <strong>Skip</strong> if you want to
        see their <strong>best stable pairing</strong> right away.
      </InfoContent>
      <InfoContent style={{ marginTop: "15px" }}>
        There are two modes to choose from: <strong>light</strong> and{" "}
        <strong>dark</strong>. The user can easily switch between these modes
        before beginning the visualisation.
      </InfoContent>
      <PageNumber>6/9</PageNumber>
      <img
        src={gif}
        style={{ width: "250px", height: "80px", marginTop: "15px" }}
        alt="Switching mode snapshot"
      />
    </PageContainer>
  );
};

export default Page6;
