type Tuple<T extends []> = Array<T>;

export const toTuple = <T, U extends Tuple<any>>(
  callbackFn: <U>(
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  ...args: T[]
): U => {
  return (args.reduceRight(callbackFn, ([] as unknown) as U) as unknown) as U;
};

/**
 * @description Reduce arguments to tuples of section id and width
 * @param args Section definitions to open at default width or specific width
 * @example <caption>Build tuple for 3 sections at default width</caption>
 * sectionsAndWidthsToTuples('po-1_s-1','po-1_s-2','po-1_s-3'); // [['po-1_s-1'],['po-1_s-2'],['po-1_s-3']]
 * @example <caption>Build tuple for 3 sections at 20% width</caption>
 * sectionsAndWidthsToTuples('po-1_s-1',20,'po-1_s-2',20,'po-1_s-3',20); // [['po-1_s-1',20],['po-1_s-2',20],['po-1_s-3',20]]
 * @example <caption>Builds tuple for more complex combination</caption>
 * sectionsAndWidthsToTuples('po-1_s-1',40,'po-1_s-2','po-1_s-3',10); // [['po-1_s-1',40],['po-1_s-2'],['po-1_s-3',10]]
 */
export const sectionsAndWidthsToTuples = (...args: (string | number)[]) => {
  return toTuple<string | number, [string, number | undefined][]>(
    // @ts-ignore
    (
      previousValue: [string, number | undefined][],
      currentValue: string | number,
      currentIndex: number,
      array: (string | number)[]
    ) => {
      if (typeof currentValue === "number") return previousValue;
      else if (typeof array[currentIndex + 1] === "string")
        return [[currentValue], ...previousValue];
      else if (
        typeof (typeof currentValue === "number" && array[currentIndex + 1]) ===
        "number"
      )
        return previousValue;
      return [[currentValue, array[currentIndex + 1]], ...previousValue];
    },
    ...args
  );
};

/**
 * @description Reduce arguments to tuples of section id (and width if provided)
 * @param args Section definitions with id and open state
 * @example <caption>Build tuple for 3 sections</caption>
 * sectionsAndOpenToTuples('po-1_s-1','po-1_s-2','po-1_s-3'); // [['po-1_s-1'],['po-1_s-2'],['po-1_s-3']]
 * @example <caption>Build tuple for 3 sections and open</caption>
 * sectionsAndOpenToTuples('po-1_s-1',true,'po-1_s-2',true,'po-1_s-3',true); // [['po-1_s-1',true],['po-1_s-2',true],['po-1_s-3',true]]
 * @example <caption>Builds tuple for more complex combination</caption>
 * sectionsAndOpenToTuples('po-1_s-1',true,'po-1_s-2','po-1_s-3',true); // [['po-1_s-1',true],['po-1_s-2'],['po-1_s-3',true]]
 */
export const sectionsAndOpenToTuples = (...args: (string | boolean)[]) => {
  return toTuple<string | boolean, [string, boolean | undefined][]>(
    // @ts-ignore
    (
      previousValue: [string, boolean | undefined][],
      currentValue: string | boolean,
      currentIndex: number,
      array: (string | boolean)[]
    ) => {
      if (typeof currentValue === "boolean") return previousValue;
      else if (typeof array[currentIndex + 1] === "string")
        return [[currentValue], ...previousValue];
      else if (
        typeof (
          typeof currentValue === "boolean" && array[currentIndex + 1]
        ) === "boolean"
      )
        return previousValue;
      return [[currentValue, array[currentIndex + 1]], ...previousValue];
    },
    ...args
  );
};
