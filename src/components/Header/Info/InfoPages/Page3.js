import React from "react";
import gif from "../../../../assets/Gale-Shapley.gif";
import { PageContainer, H6, PageNumber, PageLink } from "./PagesElements";

const Page3 = () => {
  return (
    <PageContainer>
      <H6 style={{ fontWeight: "600" }}>
        Animation showing an example of the{" "}
        <PageLink
          href="https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm"
          target="_blank"
        >
          Gale – Shapley algorithm
        </PageLink>
        :
      </H6>
      <PageNumber>3/9</PageNumber>
      <img
        src={gif}
        style={{ width: "470px", height: "370px", marginTop: "10px" }}
        alt="Gale-Shapley Snapshot"
      />
    </PageContainer>
  );
};

export default Page3;
