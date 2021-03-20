import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text as NativeBaseText, Icon } from 'native-base';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Loading } from 'components/loading';
import api from 'lib/api';
import { loginReader, handleError } from 'state/actions';
import { showToast } from 'lib/helpers';
import { screenStyles, formStyles } from 'styles';
import { ToastType } from 'types';
import { FormSection, FormSpace, FormWrapper } from 'components/form';
import { Separator } from 'components/content';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookRegister = async () => {
    try {
      const facebookResponse = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      const { isCancelled, grantedPermissions } = facebookResponse;

      if (
        isCancelled ||
        !grantedPermissions ||
        !grantedPermissions.includes('email') ||
        !grantedPermissions.includes('public_profile')
      ) {
        throw new Error('Lack of facebook data or cancelled');
      }

      const accessTokenResponse = await AccessToken.getCurrentAccessToken();

      if (!accessTokenResponse) {
        throw new Error('Lack of accessTokenResponse');
      }

      const { accessToken } = accessTokenResponse;

      if (!accessToken) {
        throw new Error('Lack of accessToken');
      }

      // Start loading
      setIsLoading(true);

      const { data } = await api.authByFacebook(accessToken.toString());

      const {
        token,
        followedRegions,
        toReadArticles: savedArticles,
        hasAccess,
      } = data;

      dispatch(
        loginReader({
          jwtToken: token,
          followedRegions,
          savedArticles,
          hasAccess,
        }),
      );
      setIsLoading(false);
      navigation.navigate('ArticlesStack');
      showToast(ToastType.SUCCESS, 'Konto zostało założone.');
    } catch (error) {
      setIsLoading(false);
      LoginManager.logOut();
      dispatch(handleError(error, 'Niepoprawne logowanie', false));
    }
  };

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <FormWrapper>
        <FormSection first>
          <Button
            style={formStyles.facebookButton}
            full
            rounded
            onPress={handleFacebookRegister}
            iconLeft>
            <Icon type="FontAwesome" name="facebook-official" />
            <NativeBaseText>Załóż konto za pomocą FB</NativeBaseText>
          </Button>
          <FormSpace />
          <Button
            style={formStyles.secondaryButton}
            full
            rounded
            onPress={() => navigation.navigate('RegisterByEmail')}>
            <NativeBaseText>Załóż konto za pomocą email</NativeBaseText>
          </Button>
        </FormSection>
        <Separator />
        <FormSection last>
          <Button
            info
            full
            rounded
            style={formStyles.button}
            onPress={() => navigation.navigate('LoginStack')}>
            <NativeBaseText>Masz już konto? Zaloguj się</NativeBaseText>
          </Button>
        </FormSection>
      </FormWrapper>
    </ScrollView>
  );
};
