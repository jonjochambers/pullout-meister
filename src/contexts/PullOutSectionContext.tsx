import { createContext, FC } from "react";
import usePullOutSection, {
  UsePullOutSectionHook
} from "../hooks/usePullOutSection";

type PullOutSectionContextType = UsePullOutSectionHook & {
  isOpen: boolean;
};

const PullOutSectionContext = createContext<PullOutSectionContextType>({
  isOpen: false,
  getId: () => "",
  openSection: () => void {},
  closeSection: () => void {}
});

export const PullOutSectionProvider: FC<{ sectionId: string }> = ({
  sectionId,
  children
}) => {
  const { getId, openSection, closeSection } = usePullOutSection(sectionId);
  return (
    <PullOutSectionContext.Provider
      value={{ isOpen: false, getId, openSection, closeSection }}
    >
      {children}
    </PullOutSectionContext.Provider>
  );
};

export default PullOutSectionContext;
