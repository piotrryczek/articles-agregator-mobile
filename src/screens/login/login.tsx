import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Item,
  Input,
  Label,
  Text as NativeBaseText,
  Icon,
} from 'native-base';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Loading } from 'components/loading';
import { basicReducer } from 'lib/basic-reducer';
import api from 'lib/api';
import { loginReader, handleError } from 'state/actions';
import { showToast } from 'lib/helpers';
import { screenStyles, formStyles } from 'styles';
import { ToastType } from 'types';
import {
  FormSection,
  FormSpace,
  FormWrapper,
  ItemWrapper,
} from 'components/form';
import { Separator } from 'components/content';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useReducer(basicReducer, {
    email: '',
    password: '',
  });

  const handleTextChange = (fieldName: string) => (value: string) => {
    setFormValues({
      [fieldName]: value,
    });
  };

  const handleLoginEmail = async () => {
    setIsLoading(true);
    try {
      const { email, password } = formValues;

      const { data } = await api.loginByEmail(email, password);

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
      showToast(ToastType.SUCCESS, 'Udane logowanie.');
    } catch (error) {
      setIsLoading(false);
      dispatch(handleError(error, 'Niepoprawne logowanie', false));
    }
  };

  const handleFacebookLogin = async () => {
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
      showToast(ToastType.SUCCESS, 'Udane logowanie.');
    } catch (error) {
      setIsLoading(false);
      LoginManager.logOut();
      dispatch(handleError(error, 'Niepoprawne logowanie', false));
    }
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(true);
  };

  const handleHidePassword = () => {
    setIsPasswordVisible(false);
  };

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <FormWrapper>
        <FormSection noSpaceTop>
          <Button
            style={formStyles.facebookButton}
            full
            rounded
            onPress={handleFacebookLogin}
            iconLeft>
            <Icon type="FontAwesome" name="facebook-official" />
            <NativeBaseText>Zaloguj za pomocą Facebooka</NativeBaseText>
          </Button>
        </FormSection>
        <Separator />
        <FormSection>
          <ItemWrapper noPaddingTop>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={handleTextChange('email')}
                autoCompleteType="email"
                keyboardType="email-address"
              />
            </Item>
          </ItemWrapper>
          <ItemWrapper>
            <Item floatingLabel>
              <Label>Hasło</Label>
              <Input
                secureTextEntry={!isPasswordVisible}
                onChangeText={handleTextChange('password')}
              />
            </Item>
            <View
              style={[
                formStyles.iconWrapperOverInput,
                isPasswordVisible && formStyles.iconWrapperOverInputHold,
              ]}>
              <TouchableWithoutFeedback
                onPressIn={handleShowPassword}
                onPressOut={handleHidePassword}>
                <Icon
                  name={isPasswordVisible ? 'eye-slash' : 'eye'}
                  style={formStyles.iconOverInput}
                  type="FontAwesome5"
                />
              </TouchableWithoutFeedback>
            </View>
          </ItemWrapper>
          <ItemWrapper button>
            <Button
              primary
              full
              rounded
              style={formStyles.button}
              onPress={handleLoginEmail}>
              <NativeBaseText>Zaloguj</NativeBaseText>
            </Button>
          </ItemWrapper>
        </FormSection>
        <Separator />
        <FormSection>
          <Button
            info
            full
            rounded
            style={formStyles.button}
            onPress={() => navigation.navigate('RegisterStack')}>
            <NativeBaseText>Nie masz konta? Zarejestruj się</NativeBaseText>
          </Button>
          <FormSpace />
          <Button
            info
            full
            rounded
            style={formStyles.button}
            onPress={() => navigation.navigate('LoginPublisher')}>
            <NativeBaseText>Logowanie wydawcy</NativeBaseText>
          </Button>
        </FormSection>
      </FormWrapper>
    </ScrollView>
  );
};
