import React from "react";
import img from "../../../../assets/tutorial.png";
import { PageContainer, H3, H6, Content, PageNumber } from "./PagesElements";

const Page1 = () => {
  return (
    <PageContainer>
      <H3>Welcome to Stable Matching Algorithm Visualizer!</H3>
      <H6>
        This short tutorial will walk you through all the features of this
        application.
      </H6>
      <Content>
        If you want to dive right in, press the{" "}
        <strong>Skip Tutorial</strong> button below. Otherwise, press{" "}
        <strong>Next</strong> !
      </Content>
      <PageNumber>1/9</PageNumber>
      <img src={img} style={{ width: "35%" }} alt="Algo_Image" />
    </PageContainer>
  );
};

export default Page1;
