import React, { useContext } from "react";
import styled from "styled-components";
import { PullOutManagerContext } from "../../contexts/PullOutManagerContext";

const POMWrapper = styled.div`
  z-index: 10;
`;

const POMButton = styled.button``;

const POM = () => {
  const { open } = useContext(PullOutManagerContext);

  const handleOpenLeft = () => {
    open("test_1", "left_1");
  };

  const handleOpenRight = () => {
    open("test_2", "right_1");
  };

  const handleOpenTop = () => {
    open("test_3", "top_1");
  };

  const handleOpenBottom = () => {
    open("test_4", "bottom_1");
  };

  return (
    <POMWrapper>
      <POMButton onClick={handleOpenLeft}>Open Left</POMButton>
      <POMButton onClick={handleOpenRight}>Open Right</POMButton>
      <POMButton onClick={handleOpenTop}>Open Top</POMButton>
      <POMButton onClick={handleOpenBottom}>Open Bottom</POMButton>
    </POMWrapper>
  );
};

export default POM;
