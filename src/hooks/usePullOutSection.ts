import { useContext, useState } from "react";
import PullOutContext from "../contexts/PullOutContext";
import { Origin } from "../types";

export type UsePullOutSectionHook = {
  getId: () => string;
  getOrigin: () => Origin;
  openSection: (width?: number) => void;
  closeSection: () => void;
  register: (isOpen?: boolean) => void;
  unregister: () => void;
};

const usePullOutSection: (sectionId: string) => UsePullOutSectionHook = (
  sectionId
) => {
  const { openSections, closeSections, register: pullOutRegister, unregister: pullOutUnregister, getOrigin } = useContext(PullOutContext);
  const [id] = useState<string>(sectionId);
  const getId = () => id;
  const openSection = (width?: number) =>
    openSections(
      id,
      ...[width || ""].filter((x: string | number) => typeof x === "number")
    );
  const closeSection = () => closeSections(id);
  const register = (isOpen: boolean = false) => pullOutRegister(id, isOpen);
  const unregister = () => pullOutUnregister(id);
  return {
    getId,
    getOrigin,
    openSection,
    closeSection,
    register,
    unregister
  };
};

export default usePullOutSection;
