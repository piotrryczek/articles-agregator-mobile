import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import { BottomSheetProvider } from 'lib/contexts/bottom-sheet';
import { AppDrawer } from 'navigators/app-drawer';

import { store, persistor } from 'state/store';
import linking from 'lib/linking';

// const SettingsStack = createStackNavigator();

// dl6OQB3lQFmRw5030QyQc3:APA91bEmXqKRbIa7SO_fhCNIp37GHpmB5Y_L__qkzoJxRU0JCKelGrFxuezAjb-FLRVqOZOdnMJ1RnlHF7uGAuVbyTcyMhKnFNEJyqMNBMVZ9RWfAzd9vEAfnPfQxign6sLm1FHoaquX

function App() {
  // const fetchToken = async () => {
  //   const token = await messaging().getToken();

  //   // console.log(token);
  // };

  // useEffect(() => {
  //   fetchToken();
  //   listenMessages();
  // }, []);

  // const listenMessages = async () => {
  //   messaging().onMessage((message) => {
  //     const { notification } = message;
  //     const { body, title } = notification;

  //     console.log(message);
  //   });
  // };

  // useEffect(() => {
  //   listenMessages();
  // }, []);

  return (
    <Root>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <BottomSheetProvider>
              <NavigationContainer linking={linking}>
                <AppDrawer />
              </NavigationContainer>
            </BottomSheetProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </Root>
  );
}

export default App;
