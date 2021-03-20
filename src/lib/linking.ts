import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const config = {
  screens: {
    ConfirmEmail: {
      path: '/confirmEmail/:verificationCode',
    },
    ArticlesStack: {
      screens: {
        Article: {
          path: '/articles/:articleId',
        },
      },
    },
  },
};

const linking = {
  prefixes: ['http://www.artagr.app'],
  config,
  // getInitialURL: async () => {
  //   // Check if app was opened from a deep link
  //   const url = await Linking.getInitialURL();

  //   if (url != null) {
  //     return url;
  //   }

  //   // Check if there is an initial firebase notification
  //   const message = await messaging().getInitialNotification();

  //   // Get deep link from data
  //   // if this is undefined, the app will open the default/home page
  //   return message?.data?.link;
  // },
};

export default linking;
