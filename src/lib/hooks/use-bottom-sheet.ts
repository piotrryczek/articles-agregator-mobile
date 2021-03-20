import { useContext } from 'react';

import { BottomSheetContext } from 'lib/contexts/bottom-sheet';

export default () => {
  const { bottomSheetRef, setBottomSheetRef } = useContext(BottomSheetContext);

  return {
    bottomSheetRef,
    setBottomSheetRef,
  };
};
