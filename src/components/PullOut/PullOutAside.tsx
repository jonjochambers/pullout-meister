import React, { FC } from "react";
import styled from "styled-components";
import { Origin } from "../../types";

interface PullOutAsideProps {
  pullOutId: string;
  open: boolean;
  origin: Origin;
}

// es-lint ignore-next-line
const StyledPullOutAside = styled.div<
  Pick<PullOutAsideProps, "open" | "origin">
>`
  width: ${({ open, origin }) =>
    open && ["left", "right"].includes(origin) ? "min-content" : "0%"};
  height: ${({ open, origin }) =>
    open && ["top", "bottom"].includes(origin) ? "min-content" : "0%"};
  flex: 12 12 100%;
`;

const PullOutAside: FC<PullOutAsideProps> = ({
  pullOutId,
  open,
  origin,
  children
}) => {
  return (
    <StyledPullOutAside {...{ open, origin }}>
      {open && children}
    </StyledPullOutAside>
  );
};

export default PullOutAside;
