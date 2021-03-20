import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  Item,
  Input,
  Label,
  Text as NativeBaseText,
  Icon,
} from 'native-base';

import { Loading } from 'components/loading';
import { screenStyles, formStyles } from 'styles';
import { basicReducer } from 'lib/basic-reducer';
import api from 'lib/api';
import { loginPublisher, handleError } from 'state/actions';
import { showToast } from 'lib/helpers';
import { ToastType } from 'types';
import { FormSection, FormWrapper, ItemWrapper } from 'components/form';

export const LoginPublisherScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useReducer(basicReducer, {
    email: '',
    password: '',
    code: '',
  });

  const handleTextChange = (fieldName: string) => (value: string) => {
    setFormValues({
      [fieldName]: value,
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { email, password, code } = formValues;

      const { data } = await api.publisherLogin(email, password, code);
      const { token, articlesReported, publisherId } = data;

      dispatch(loginPublisher(token, articlesReported, publisherId));
      setIsLoading(false);
      navigation.navigate('ArticlesStack');
      showToast(ToastType.SUCCESS, 'Udane logowanie.');
    } catch (error) {
      setIsLoading(false);
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
        <FormSection first last>
          <ItemWrapper>
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
          <ItemWrapper>
            <Item floatingLabel>
              <Label>Kod 2FA</Label>
              <Input secureTextEntry onChangeText={handleTextChange('code')} />
            </Item>
          </ItemWrapper>
          <ItemWrapper button>
            <Button
              primary
              full
              rounded
              style={formStyles.button}
              onPress={handleLogin}>
              <NativeBaseText>Zaloguj</NativeBaseText>
            </Button>
          </ItemWrapper>
        </FormSection>
      </FormWrapper>
    </ScrollView>
  );
};
