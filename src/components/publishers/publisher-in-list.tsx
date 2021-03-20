import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { articleStyles } from 'styles';
import config from 'lib/config';

export const PublisherInList = (props) => {
  const { publisher } = props;

  const navigation = useNavigation();

  const { _id: publisherId, name, logoUrl } = publisher;

  const goTo = () => {
    navigation.navigate('Publisher', { publisherId });
  };

  return (
    // <TouchableOpacity onPress={goTo} activeOpacity={ACTIVE_OPACITY}>
    <View style={[articleStyles.header, styles.header]}>
      <View style={styles.publisherLogoWrapper}>
        <ImageBackground
          source={{
            uri: `${config.apiUrl}/uploads/${logoUrl}`,
          }}
          resizeMode="contain"
          style={styles.publisherLogo}
        />
      </View>
      <View style={styles.publisherTitleWrapper}>
        <Text
          style={{
            ...articleStyles.publisherTitle,
            ...styles.publisherTitle,
          }}>
          {name}
        </Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  publisherLogoWrapper: {
    width: 56,
    height: 56,
    marginRight: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    elevation: 5,
    overflow: 'hidden',
  },
  publisherLogo: {
    width: 44,
    height: 44,
    borderRadius: 1000,
  },
  publisherTitleWrapper: {
    flex: 1,
  },
  publisherTitle: {
    fontSize: 24,
  },
});
