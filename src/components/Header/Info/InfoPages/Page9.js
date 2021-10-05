import React from "react";
import {
  PageContainer,
  Heading,
  PageNumber,
  InfoContent,
  PageLink,
} from "./PagesElements";

const Page9 = () => {
  return (
    <PageContainer>
      <Heading sz="45px">Enjoy !</Heading>
      <InfoContent style={{ fontSize: "28px", marginTop: "15px" }}>
        I hope you enjoy playing around with this visualization
        tool as I had building it!
      </InfoContent>
      <InfoContent style={{ fontSize: "26px", marginTop: "15px" }}>
        You can learn more about the stable matching problem by watching this{" "}
        <PageLink
          href="https://www.youtube.com/watch?v=Qcv1IqHWAzg"
          target="_blank"
        >
          video
        </PageLink>{" "}
        from Numberphile.
      </InfoContent>
      <InfoContent style={{ fontSize: "28px", marginTop: "15px" }}>
        If you want to see the source code for this application, check out my{" "}
        <PageLink
          href="https://github.com/SikkkanDar/Stable-Matching-Visualizer"
          target="_blank"
        >
          github
        </PageLink>
        .
      </InfoContent>
      <PageNumber>9/9</PageNumber>
    </PageContainer>
  );
};

export default Page9;
