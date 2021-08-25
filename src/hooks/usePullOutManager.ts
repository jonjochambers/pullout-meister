import { useReducer } from "react";
import { Origin } from "../types";

type PullOutSectionState = {
  open: boolean,
  width?: number
}

type PullOutState = { origin: Origin } & {
  [sectionId: string]: PullOutSectionState;
}

export type PullOutManagerState = {
  [pullOutId: string]: PullOutState;
}

export type UsePullOutManagerHook = {
  state: PullOutManagerState;
  getPullOutIds: () => string[];
  getPullOut: (pullOutId: string) => PullOutState;
  open: (pullOutId: string, ...sections: (string | number)[]) => void;
  close: (pullOutId: string, ...sections: string[]) => void;
  closeAll: () => void;
  register: (pullOutId: string, ...sections: (string | boolean)[]) => void;
  unregister: (pullOutId: string, ...sections: string[]) => void;
};

export type PullOutManagerReducerPayload = {
  pullOutId: string;
  sections: {
    open?: boolean;
    width?: number;
  }[]
};

const actions = ['register', 'unregister', 'open', 'close', 'toggle'] as const;
type Actions = typeof actions[number];
const components = ['pullout', 'section'] as const;
type Components = typeof components[number];
type ComponentActionTypes = `${Components}_${Actions}`;

export type PullOutManagerReducerAction = {
  type: ComponentActionTypes,
  payload: PullOutManagerReducerPayload
}

const PullOutManagerReducer = (state: PullOutManagerState, { type, payload }: PullOutManagerReducerAction) => {
  switch (type) {
    case 'pullout_register':
    case 'pullout_unregister':
    case 'pullout_open':
    case 'pullout_close':
    case 'pullout_toggle':
    case 'section_register':
    case 'section_unregister':
    case 'section_open':
    case 'section_close':
    case 'section_toggle':
    default:
      return state;
  }
}

/**
 * Pull out manager hooks
 */
const usePullOutManager: () => UsePullOutManagerHook = () => {
  const [state, dispatch] = useReducer<typeof PullOutManagerReducer>(PullOutManagerReducer, {})

  /**
   * @description Get all pull out ids available
   * @example <caption>Get all available pullout ids in a string array</caption>
   * getPullOutIds(); // ['po-1','po-2']
   */
  const getPullOutIds = () => Object.keys(state);

  /**
   * @description Get a pull out record from the manager state
   * @param pullOutId Pullout id to retrieve
   * @example <caption>Get pullout with id 'po-1' from store</caption>
   * getPullOut('po-1');
   * @example <caption>Will throw an error if no pullout with id is found</caption>
   * getPullOut('no-po'); // Error: No pullout with id 'no-po' found.
   */
  const getPullOut = (pullOutId: string) => {
    const output = state[pullOutId];
    if (!output) throw new Error(`No pullout with id '${pullOutId}' found`);
    return output;
  };

  /**
   * @description Open pullout (option to specify multiple sections and their widths)
   * @param pullOutId Pullout id to open
   * @param sections Optional section ids and specified width, if no width is provided default section with is used
   * @example <caption>Open pullout with all it's sections at default width</caption>
   * open('po-1');
   * @example <caption>Open pullout with a specified section at default width</caption>
   * open('po-1','po-1_s-1');
   * @example <caption>Open pullout with section 1 at 40% width and section 2 at default width and section 3 at 10% width</caption>
   * open('po-1','po-1_s-1', 40, 'po-1_s-2', 'po-1_s-3', 10);
   */
  const open = (pullOutId: string, ...sections: (string | number)[]) => {

  };

  /**
   * @description Close pullout (option to specify sections to close in that pullout)
   * @param pullOutId Pullout id to close
   * @param sections Optional section ids to close specifically
   * @example <caption>Close pullout (all of it's sections)</caption>
   * close('po-1');
   * @example <caption>Close section with id of pullout</caption>
   * close('po-1','po-1_s-2');
   */
  const close = (pullOutId: string, ...sections: string[]) => { };

  /**
   * @description Close all pullouts
   */
  const closeAll = () => { };

  /**
   * 
   * @param pullOutId PullOut id to register
   * @param sections Sections to register and whether they should be open
   * @example <caption>Register a pullout<caption>
   * register('po-1');
   * @example <caption>Register a section with a pullout</caption>
   * register('po-1','po-1_s-1');
   * @example <caption>Register sections with one defaulting to open</caption>
   * register('po-1','po-1_s-1', true, 'po-1_s-2');
   */
  const register = (pullOutId: string, ...sections: (string | boolean)[]) => {

  };

  /**
   * @description Unregister pullouts and sections from the manager state.
   * if sections are provided only the sections are unregistered. If a pullout
   * is needing to be unregistered, don't provide any section ids and they will
   * be automatically unregistered with the pullout
   * @param pullOutId Pullout id to deregister
   * @param sections Specify sections to deregister
   * @example <caption>Unregister a pullout and all its sections</caption>
   * unregister('po-1');
   * @example <caption>Unregister a section</caption>
   * unregister('po-1','po-1_s-1');
   * @example <caption>Unregister multiple sections</caption>
   * unregister('po-1','po-1_s-1','po-1_s-2');
   */
  const unregister = (pullOutId: string, ...sections: string[]) => {

  };

  return {
    state,
    getPullOutIds,
    getPullOut,
    open,
    close,
    closeAll,
    register,
    unregister
  };
};

export default usePullOutManager;
