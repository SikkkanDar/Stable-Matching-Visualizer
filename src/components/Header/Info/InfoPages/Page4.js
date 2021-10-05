import React from "react";
import gif from "../../../../assets/toggle_stm_algoviz.gif";
import {
  PageContainer,
  Heading,
  PageNumber,
  InfoContent,
} from "./PagesElements";

const Page4 = () => {
  return (
    <PageContainer>
      <Heading sz="35px">How do I put it to use ?</Heading>
      <InfoContent>
        You can edit the list of both the sets and can also see their preference order by
        clicking on their{" "}
        <strong>
          <i>Arrow icon</i>
        </strong>
        .
      </InfoContent>
      <PageNumber>4/9</PageNumber>
      <img
        src={gif}
        style={{ width: "300px", height: "295px" }}
        alt="Toggle preferences snapshot"
      />
    </PageContainer>
  );
};

export default Page4;
