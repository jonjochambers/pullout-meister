import { PullOutSection } from "./PullOutSection";

export type PullOut = {
  id: string;
  sections: PullOutSection[];
  open: () => boolean;
};
