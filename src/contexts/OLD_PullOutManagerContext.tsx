import React, { FC, useReducer } from "react";

export type PullOutManagerContextState = {
  [pId: string]: {
    [sId: string]: boolean;
  };
};

type PullOutManagerContextType = {
  state: PullOutManagerContextState;
  register: (pullOutId: string, sectionId?: string, open?: boolean) => void;
  unregister: (pullOutId: string, sectionId?: string) => void;
  open: (pullOutId: string, sectionId?: string) => void;
  close: (pullOutId: string, sectionId?: string) => void;
  toggle: (pullOutId: string, sectionId?: string) => void;
};

const defaultState: PullOutManagerContextType = {
  state: {},
  register: (pullOutId: string, sectionId?: string, open?: boolean) => {},
  unregister: (pullOutId: string, sectionId?: string) => {},
  open: (pullOutId: string, sectionId?: string) => {},
  close: (pullOutId: string, sectionId?: string) => {},
  toggle: (pullOutId: string, sectionId?: string) => {}
};

export const PullOutManagerContext = React.createContext<
  PullOutManagerContextType
>(defaultState);

// TODO - Update typescript to properly support template literals
// const actions = ['create','remove','open','close','toggle'] as const;
// type Actions = typeof actions[number];
// const components = ['pullout','section'] as const;
// type Components = typeof components[number];
// type ComponentActions = `${Components}_${Actions}`;
type ComponentActions =
  | "pullout_create"
  | "pullout_remove"
  | "pullout_open"
  | "pullout_close"
  | "pullout_toggle"
  | "section_create"
  | "section_remove"
  | "section_open"
  | "section_close"
  | "section_toggle";

type PullOutManagerReducerAction = {
  action: ComponentActions;
  payload: {
    pullOutId: string;
    sectionId?: string;
    open?: boolean;
  };
};

const PullOutManagerReducer = (
  state: PullOutManagerContextType["state"],
  {
    action,
    payload: { pullOutId, sectionId, open }
  }: PullOutManagerReducerAction
) => {
  console.log(action, { pullOutId, sectionId, open });
  switch (action) {
    case "pullout_create": {
      if (state[pullOutId]) return state;
      return {
        ...state,
        [pullOutId]: {}
      };
    }
    case "pullout_remove": {
      if (!state[pullOutId]) return state;
      const newState = { ...state };
      delete newState[pullOutId];
      return { ...newState };
    }
    case "pullout_open": {
      if (!state[pullOutId]) return state;
      const pullOut = state[pullOutId];
      Object.keys(pullOut).forEach((sectionId) => (pullOut[sectionId] = true));
      return {
        ...state,
        [pullOutId]: { ...pullOut }
      };
    }
    case "pullout_close": {
      if (!state[pullOutId]) return state;
      const pullOut = state[pullOutId];
      Object.keys(pullOut).forEach((sectionId) => (pullOut[sectionId] = false));
      return {
        ...state,
        [pullOutId]: { ...pullOut }
      };
    }
    case "pullout_toggle": {
      if (!state[pullOutId]) return state;
      const pullOut = state[pullOutId];
      Object.keys(pullOut).forEach(
        (sectionId) => (pullOut[sectionId] = !pullOut[sectionId])
      );
      return {
        ...state,
        [pullOutId]: { ...pullOut }
      };
    }
    case "section_create": {
      if (!state[pullOutId] || !sectionId || state[pullOutId][sectionId])
        return state;
      const newState = { ...state };
      newState[pullOutId][sectionId] = open || false;
      return newState;
    }
    case "section_remove": {
      if (!state[pullOutId] || !sectionId || state[pullOutId][sectionId])
        return state;
      const newState = { ...state };
      delete newState[pullOutId][sectionId];
      return newState;
    }
    case "section_open": {
      if (
        !state[pullOutId] ||
        !sectionId ||
        state[pullOutId][sectionId] === true
      )
        return state;
      const newState = { ...state };
      newState[pullOutId][sectionId] = true;
      console.log(newState);
      return newState;
    }
    case "section_close": {
      if (
        !state[pullOutId] ||
        !sectionId ||
        state[pullOutId][sectionId] === false
      )
        return state;
      const newState = { ...state };
      newState[pullOutId][sectionId] = false;
      console.log(newState);
      return newState;
    }
    case "section_toggle": {
      if (
        !state[pullOutId] ||
        !sectionId ||
        state[pullOutId][sectionId] !== undefined
      )
        return state;
      const newState = { ...state };
      newState[pullOutId][sectionId] = !newState[pullOutId][sectionId];
      return newState;
    }
    default:
      return state;
  }
};

const PullOutManager: FC = ({ children }) => {
  const [state, dispatch] = useReducer<typeof PullOutManagerReducer>(
    PullOutManagerReducer,
    {}
  );

  const register = (pullOutId: string, sectionId?: string, open?: boolean) => {
    if (state[pullOutId] && sectionId) {
      return void dispatch({
        action: "section_create",
        payload: { pullOutId, sectionId, open: open || false }
      });
    }
    if (!state[pullOutId]) {
      return void dispatch({
        action: "pullout_create",
        payload: { pullOutId }
      });
    }
    return;
  };

  const unregister = (pullOutId: string, sectionId?: string) => {
    if (state[pullOutId] && sectionId) {
      return void dispatch({
        action: "section_remove",
        payload: { pullOutId, sectionId }
      });
    }
    if (!state[pullOutId]) {
      return void dispatch({
        action: "pullout_create",
        payload: { pullOutId }
      });
    }
    return;
  };

  const open = (pullOutId: string, sectionId?: string) => {
    if (!state[pullOutId]) return;
    if (!sectionId) {
      return void dispatch({ action: "pullout_open", payload: { pullOutId } });
    }
    console.log(`Opening section ${sectionId} from pullout ${pullOutId}`);
    return void dispatch({
      action: "section_open",
      payload: { pullOutId, sectionId }
    });
  };

  const close = (pullOutId: string, sectionId?: string) => {
    if (!state[pullOutId]) return;
    if (!sectionId) {
      return void dispatch({ action: "pullout_close", payload: { pullOutId } });
    }
    console.log(`Closing section ${sectionId} from pullout ${pullOutId}`);
    return void dispatch({
      action: "section_close",
      payload: { pullOutId, sectionId }
    });
  };

  const toggle = (pullOutId: string, sectionId?: string) => {
    if (!state[pullOutId]) return;
    if (!sectionId) {
      return void dispatch({
        action: "pullout_toggle",
        payload: { pullOutId }
      });
    }
    return void dispatch({
      action: "section_toggle",
      payload: { pullOutId, sectionId }
    });
  };

  return (
    <PullOutManagerContext.Provider
      value={{
        state,
        register,
        unregister,
        open,
        close,
        toggle
      }}
    >
      {children}
    </PullOutManagerContext.Provider>
  );
};

export default PullOutManager;
