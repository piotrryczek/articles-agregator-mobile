// Simple reducer to be used with useReducer hook. It is just replacing whole state with new properties without affecting previous ones if not passed
export interface BasicReducer<T> {
  (prevState: T, newState: Partial<T>): T;
}

// export const basicReducer = <T>(prevState: T, newState: Partial<T>): T => ({
//   ...prevState,
//   ...newState,
// });

export const basicReducer = (prevState, newState) => ({
  ...prevState,
  ...newState,
});
