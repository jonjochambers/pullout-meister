import { createContext, FC } from "react";
import usePullOutManager, {
  UsePullOutManagerHook
} from "../hooks/usePullOutManager";
import { PullOutState } from "../hooks";

/**
 * @description PullOutManager context type definition
 * Defines the state object for the pullout system
 * Methods are inherited from the hook
 */
type PullOutManagerContextType = UsePullOutManagerHook & {};

/**
 * @description PullOutManagerContext creation
 * Created with an empty dummy object
 */
const PullOutManagerContext = createContext<PullOutManagerContextType>({
  state: {},
  getPullOutIds: () => [],
  getPullOut: () => ({} as PullOutState),
  open: () => void {},
  close: () => void {},
  closeAll: () => void {},
  register: () => void {},
  unregister: () => void {}
});

/**
 * @description PullOutManagerProvider
 * Context provider component providing the context with the hook methods
 * so you don't have to ;P
 */
export const PullOutManagerProvider: FC = ({ children }) => {
  const pullOutManager = usePullOutManager();
  return (
    <PullOutManagerContext.Provider value={{ ...pullOutManager }}>
      {children}
    </PullOutManagerContext.Provider>
  );
};

export default PullOutManagerContext;
