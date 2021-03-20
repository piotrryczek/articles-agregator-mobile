import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

import config from 'lib/config';
import { Patronite } from 'components/patronite';
import { PageWrapper } from 'components/page';
import { Paragraph } from 'components/content';
import { UrlButton } from 'components/url-button';
import { clearUrl } from 'lib/helpers';

export const Publisher = (props) => {
  const { publisher } = props;

  if (!publisher) return null;

  const {
    patroniteUrl,
    logoUrl,
    description,
    authors,
    facebookUrl,
    twitterUrl,
    www,
  } = publisher;

  return (
    <PageWrapper>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <ImageBackground
          source={{
            uri: `${config.apiUrl}/uploads/${logoUrl}`,
          }}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      {/* Description */}
      <Paragraph>{description}</Paragraph>
      {/* Authors */}
      {!!authors && (authors || []).length && (
        <Paragraph>Autorzy: {authors.join(', ')}</Paragraph>
      )}
      {/* Patronite */}
      {!!patroniteUrl && <Patronite url={patroniteUrl} />}
      {/* URLs */}
      {!!facebookUrl && (
        <UrlButton
          url={facebookUrl}
          label="Facebook"
          icon={
            <Icon
              name="facebook-square"
              size={24}
              color="white"
              type="font-awesome"
            />
          }
          backgroundColor="#3b5998"
        />
      )}
      {!!twitterUrl && (
        <UrlButton
          url={twitterUrl}
          label="Twitter"
          icon={
            <Icon
              name="twitter-square"
              size={26}
              color="white"
              type="font-awesome"
            />
          }
          backgroundColor="#1DA1F2"
        />
      )}
      {!!www && (
        <UrlButton
          url={www}
          label={clearUrl(www)}
          icon={
            <Icon
              name="external-link-alt"
              size={20}
              color="white"
              type="font-awesome-5"
            />
          }
          backgroundColor="#3c3c3c"
        />
      )}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: '90%',
  },
});
