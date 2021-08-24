import { useContext, useState } from "react";
import PullOutContext from "../contexts/PullOutContext";

export type UsePullOutSectionHook = {
  getId: () => string;
  openSection: (width?: number) => void;
  closeSection: () => void;
};

const usePullOutSection: (sectionId: string) => UsePullOutSectionHook = (
  sectionId
) => {
  const { openSections, closeSections } = useContext(PullOutContext);
  const [id] = useState<string>(sectionId);
  const getId = () => id;
  const openSection = (width?: number) =>
    openSections(
      id,
      ...[width || ""].filter((x: string | number) => typeof x === "number")
    );
  const closeSection = () => closeSections([id]);
  return {
    getId,
    openSection,
    closeSection
  };
};

export default usePullOutSection;
