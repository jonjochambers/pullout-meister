import React, { FC, useContext, useEffect } from "react";
import styled from "styled-components";
import { PullOutManagerContext } from "../../contexts/PullOutManagerContext";
import { Origin } from "./PullOut";

export interface PullOutSectionProps {
  pullOutId: string;
  sectionId: string;
  open: boolean;
  origin: Origin;
  width?: number;
  height?: number;
}

const PullOutDrawer = styled.div<
  Omit<PullOutSectionProps, "pullOutId" | "sectionId">
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
  pullOutId,
  sectionId,
  origin,
  open,
  width,
  height,
  children
}) => {
  const { register } = useContext(PullOutManagerContext);

  useEffect(() => {
    register(pullOutId, sectionId, open);
  }, []);

  return (
    <PullOutDrawer origin={origin} open={open} width={width} height={height}>
      {children}
    </PullOutDrawer>
  );
};

export default PullOutSection;
