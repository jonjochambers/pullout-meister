import { FC, useEffect } from "react";
import styled from "styled-components";
import usePullOut from "../../hooks/usePullOut";
import { Origin } from "../../types";
import PullOutAside from "./PullOutAside";
import PullOutSection from "./PullOutSection";

export interface PullOutProps {
  pullOutId: string;
  origin: Origin;
}

export type PullOutType = FC<PullOutProps> & {
  Header: typeof PullOutAside;
  Section: typeof PullOutSection;
  Footer: typeof PullOutAside;
};

const PullOutContainer = styled.div<Pick<PullOutProps, "origin">>``;

const PullOut: PullOutType = ({ pullOutId, origin, children }) => {
  const { register } = usePullOut(pullOutId);
  useEffect(() => {
    register();
  });
  return <PullOutContainer origin={origin}>{children}</PullOutContainer>;
};

PullOut.Header = PullOutAside;
PullOut.Section = PullOutSection;
PullOut.Footer = PullOutAside;

export default PullOut;
