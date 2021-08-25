import { createContext, FC } from "react";
import usePullOut, { UsePullOutHook } from "../hooks/usePullOut";
import { Origin } from '../types';

type PullOutContextType = UsePullOutHook & {
  isOpen: boolean;
};

const PullOutContext = createContext<PullOutContextType>({
  isOpen: false,
  getId: () => "",
  getSectionIds: () => [],
  getOrigin: () => 'left',
  open: () => void {},
  openSections: () => void {},
  close: () => void {},
  closeSections: () => void {},
  register: () => void {},
  unregister: () => void {}
});

export const PullOutProvider: FC<{ pullOutId: string }> = ({
  pullOutId,
  children
}) => {
  const {
    getId,
    getSectionIds,
    getOrigin,
    open,
    openSections,
    close,
    closeSections,
    register,
    unregister
  } = usePullOut(pullOutId);
  return (
    <PullOutContext.Provider
      value={{
        isOpen: false,
        getId,
        getSectionIds,
        getOrigin,
        open,
        openSections,
        close,
        closeSections,
        register,
        unregister
      }}
    >
      {children}
    </PullOutContext.Provider>
  );
};

export default PullOutContext;
// import { createContext, FC } from "react";

// type PullOutContextType = {
//   open: (...args: (string | number)[]) => void;
//   close: (ids?: string | string[]) => void;
// } | null;

// export const PullOutContext = createContext<PullOutContextType>(null);

// export const PullOutProvider: FC = ({ children }) => {
//   const open = (...args: (string | number)[]) => {
//     if (args.length) {
//       if (args.length === 1) {
//         return void console.log(`Open ${args} at default width`);
//       }
//       /** @ts-ignore Doesn't like reducing to a different object type for some reason */
//       return void (args.reduceRight(
//         /** @ts-ignore Doesn't like reducing to a different object type for some reason */
//         (
//           prev: [string, number | undefined][],
//           curr: string | number,
//           i: number,
//           arr: (string | number)[]
//         ) => {
//           if (typeof curr === "number") return prev;
//           else if (typeof arr[i + 1] === "string") return [[curr], ...prev];
//           else if (typeof (typeof curr === "number" && arr[i + 1]) === "number")
//             return prev;
//           return [[curr, arr[i + 1]], ...prev];
//         },
//         [] as [string, number | undefined][]
//       ) as [string, number | undefined][]).forEach(([sectionId, width]) => {
//         console.log(
//           `Open ${sectionId} at ${width ? `${width}%` : "default width"}`
//         );
//       });
//     }
//     return void console.log("Open all sections at default width");
//   };
//   const close = (ids?: string | string[]) => {
//     if (!ids) {
//       console.log("Close all sections");
//     } else {
//       if (ids instanceof Array) {
//         ids.forEach((sectionId) => console.log(`Close ${sectionId}`));
//       } else {
//         console.log(`Close ${ids}`);
//       }
//     }
//   };
//   return (
//     <PullOutContext.Provider value={{ open, close }}>
//       {children}
//     </PullOutContext.Provider>
//   );
// };
