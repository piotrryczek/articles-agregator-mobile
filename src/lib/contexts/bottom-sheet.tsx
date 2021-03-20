import React, { createContext, useState, useRef } from 'react';

export const BottomSheetContext = createContext({
  bottomSheetRef: null,
  setBottomSheetRef: null,
});

export const BottomSheetConsumer = BottomSheetContext.Consumer;

export const BottomSheetProvider = (props) => {
  const { children } = props;

  const [bottomSheetRef, setBottomSheetRef] = useState();

  return (
    <BottomSheetContext.Provider value={{ bottomSheetRef, setBottomSheetRef }}>
      {children}
    </BottomSheetContext.Provider>
  );
};
