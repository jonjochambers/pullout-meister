import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { usePullOutSection } from "../../hooks";
import { Origin } from "../../types";
export interface PullOutSectionProps {
  sectionId: string;
  open?: boolean;
  width?: number;
  height?: number;
}

const PullOutDrawer = styled.div<
  Omit<PullOutSectionProps, "sectionId"> & { origin: Origin }
  >`
  z-index: 3;
  width: ${({ origin, open, width }) =>
    ["left", "right"].includes(origin) ? (open ? width || "auto" : 0) : 100}vw;
  height: ${({ origin, open, height }) =>
    ["top", "bottom"].includes(origin) ? (open ? height || 100 : 0) : 100}vh;

  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: ${({ origin, open }) => {
    switch (origin) {
      case "left":
      case "right":
        return open
          ? "width 0.5s ease-in-out, opacity 0.5s ease-in-out 0.5s"
          : "opacity 0.5s ease-in-out, width 0.5s ease-in-out 0.5s";
      case "top":
      case "bottom":
        return open
          ? "height 0.5s ease-in-out, opacity 0.5s ease-in-out 0.5s"
          : "opacity 0.5s ease-in-out, height 0.5s ease-in-out 0.5s";
    }
  }};
`;

const PullOutSection: FC<PullOutSectionProps> = ({
  sectionId,
  open,
  width,
  height,
  children
}) => {
  const { register, getOrigin } = usePullOutSection(sectionId);

  useEffect(() => {
    register(open);
  });

  return (
    <PullOutDrawer origin={getOrigin()} open={open} width={width} height={height}>
      {children}
    </PullOutDrawer>
  );
};

PullOutSection.defaultProps={
  open: false
};

export default PullOutSection;
