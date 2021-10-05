import React from "react";
import {
  PageContainer,
  Heading,
  PageNumber,
  FunctionList,
} from "./PagesElements";

const Page8 = () => {
  return (
    <PageContainer>
      <Heading sz="38px" style={{ lineHeight: "1.5" }}>
        Functions of the Control Bar
      </Heading>
      <ul>
        <FunctionList>
          The entities can be <strong>randomized</strong> by clicking the
          randomize icon.
        </FunctionList>
        <FunctionList>
          There is a <strong>default configuration</strong> when the visualizer
          starts, one can revert back to that with the reset to default.
        </FunctionList>
        <FunctionList>
          The user may <strong>download</strong> the configuration the
          visualizer currently has.
        </FunctionList>
        <FunctionList>
          The user may <strong>load</strong> the configuration that they saved
          from the visualizer and is stored at their device.
        </FunctionList>
        <FunctionList>
          The user may <strong>pause</strong> at any time the visualization is
          running.
        </FunctionList>
        <FunctionList>
          There is also an option to simply{" "}
          <strong>skip all the visualization</strong> and get to the results
          right away.
        </FunctionList>
        <FunctionList>
          The user may <strong>stop</strong> the visualization at any time and
          it will go back to their <strong>latest configuration</strong>.
        </FunctionList>
        <FunctionList>
          When the <strong>visualization is finished</strong>, the{" "}
          <strong>results can be interacted</strong>. User can check the pairs
          simply by <strong>clicking on any entity</strong>.
        </FunctionList>
      </ul>
      <PageNumber>8/9</PageNumber>
    </PageContainer>
  );
};

export default Page8;
