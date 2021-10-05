import React from "react";
import {
  PageContainer,
  Heading,
  Description,
  PageNumber,
  Def,
  PageLink,
} from "./PagesElements";

const Page2 = () => {
  return (
    <PageContainer>
      <Heading sz="40px">What is stm_algoviz ?</Heading>
      <Description>
        <PageLink
          href="https://github.com/Eric761/stable-matching-algo-viz"
          target="_blank"
        >
          stm_algoviz
        </PageLink>{" "}
        is a real-time{" "}
        <PageLink
          href="https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm"
          target="_blank"
        >
          Stable Marriage Algorithm
        </PageLink>{" "}
        Visualizer. This application uses the classic version made by{" "}
        <strong>David Gale</strong> and <strong>Lloyd Shapley</strong>. The
        visualizer allows you to see how the algorithm works step by step.
      </Description>
      <Def col="#004769">
        In its most basic form, the <strong>Stable Matching Problem</strong>{" "}
        takes as input an equal number of two types of participants (for
        example, n men and n women, or n medical students and n internships) and
        an ordering for each participant indicating their preference for whom to
        be matched to among the participants of the other type.
      </Def>
      <Def col="#880000">
        A matching is <strong>stable</strong> when there is no match (A, B)
        where both participants prefer someone else to their current partner.
      </Def>
      <PageNumber>2/9</PageNumber>
    </PageContainer>
  );
};

export default Page2;
