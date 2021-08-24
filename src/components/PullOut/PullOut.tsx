import { FC, useEffect } from "react";
import styled from "styled-components";
import usePullOut from "../../hooks/usePullOut";

const origins = ["left", "right", "top", "bottom"] as const;
export type Origin = typeof origins[number];

export interface PullOutProps {
  pullOutId: string;
  origin: Origin;
}

export type PullOutType = FC<PullOutProps> & {};

const PullOutContainer = styled.div<Pick<PullOutProps, "origin">>``;

const PullOut: PullOutType = ({ pullOutId, origin, children }) => {
  const { register } = usePullOut(pullOutId);
  useEffect(() => {
    register();
  });
  return <PullOutContainer origin={origin}>{children}</PullOutContainer>;
};

export default PullOut;
