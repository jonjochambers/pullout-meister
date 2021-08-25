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
  getOrigin: () => "left",
  openSection: () => void {},
  closeSection: () => void {},
  register: () => void {},
  unregister: () => void {}
});

export const PullOutSectionProvider: FC<{ sectionId: string }> = ({
  sectionId,
  children
}) => {
  const {
    getId,
    getOrigin,
    openSection,
    closeSection,
    register,
    unregister
  } = usePullOutSection(sectionId);
  return (
    <PullOutSectionContext.Provider
      value={{
        isOpen: false,
        getId,
        getOrigin,
        openSection,
        closeSection,
        register,
        unregister
      }}
    >
      {children}
    </PullOutSectionContext.Provider>
  );
};

export default PullOutSectionContext;
