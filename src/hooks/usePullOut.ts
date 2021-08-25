import { useContext, useState } from "react";
import PullOutManagerContext from "../contexts/PullOutManagerContext";
import { Origin } from "../types";

export type UsePullOutHook = {
  getId: () => string;
  getSectionIds: () => string[];
  getOrigin: () => Origin;
  open: () => void;
  openSections: (...args: (string | number)[]) => void;
  close: () => void;
  closeSections: (...sectionIds: string[]) => void;
  register: (...sections: (string|boolean)[]) => void;
  unregister: (...sections: string[]) => void;
};

const usePullOut: (pullOutId: string) => UsePullOutHook = (pullOutId) => {
  const {
    getPullOut,
    open: managerOpen,
    close: managerClose,
    register: managerRegister,
    unregister: managerUnregister
  } = useContext(PullOutManagerContext);

  const [id] = useState<string>(pullOutId);

  /**
   * @description Get Pullout id
   */
  const getId = () => id;

  /**
   * @description Get section ids for pullout
   */
  const getSectionIds = () => Object.keys(getPullOut(id));

  /**
   * @description Get the origin of the pullout
   */
  const getOrigin = () => getPullOut(id).origin;

  /**
   * @description Open all sections of pullout at default widths
   */
  const open = () => managerOpen(id);

  /**
   * @description Open specified sections for pullout
   * @param args Sections to open (and optional width percentages for them)
   * @example <caption>Open all sections at default widths</caption>
   * openSections();
   * @example <caption>Open sections 'po-1_s-1' and 'po-1_s-3' of this pullout at default widths</caption>
   * openSections('po-1_s-1','po-1_s-3');
   * @example <caption>Open section 'po-1_2-1' at 30% width and section 'po-1_s-2' at default width and section 'po-1_s-3' at 10% width</caption>
   * openSections('po-1_s-1', 30, 'po-1_s-2', 'po-1_s-3', 10);
   */
  const openSections = (...args: (string | number)[]) =>
    managerOpen(id, ...args);

  /**
   * @description Close pullout (all it's sections)
   */
  const close = () => managerClose(id);

  /**
   * @description Close specified sections in this pullout
   * @param sectionIds Section ids to close
   * @example <caption>Close all sections in this pullout</caption>
   * closeSections();
   * @example <caption>Close sections 'po-1_s-1' and 'po-1_s-3' of this pullout</caption>
   * closeSections('po-1_s-1','po-1_s-3');
   * or
   * closeSections(...['po-1_s-1','po-1_s-3']);
   */
  const closeSections = (...sectionIds: string[]) =>
    managerClose(id, ...sectionIds);

  /**
   * @description Register pullout with manager
   * @param pullOutId Id of the pull out to register with the manager
   * @param sections Sections ids to register to pullout (and optional open state)
   * @example <caption>Register just this pullout</caption>
   * register();
   * @example <caption>Register sections with this pullout</caption>
   * register('po-1_s-1',true,'po-1_s-2');
   */
  const register = (...sections: (string|boolean)[]) => managerRegister(id, ...sections);

  /**
   * 
   * @param sections Sections to unregister from the pullout
   * @example <caption>Unregister the pullout</caption>
   * unregister();
   * @example <caption>Unregister sections in the pullout</caption>
   * unregister('po-1_s-2','po-1_s-3');
   */
  const unregister = (...sections: string[]) => managerUnregister(id, ...sections);

  return {
    getId,
    getSectionIds,
    getOrigin,
    open,
    openSections,
    close,
    closeSections,
    register,
    unregister
  };
};

export default usePullOut;
