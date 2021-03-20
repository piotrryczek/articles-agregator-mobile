import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import config from 'lib/config';
import { ArticlePopupMenu } from 'components/article-popup-menu';
import { gridStyles, articleStyles, ACTIVE_OPACITY } from 'styles';
import dateFormat from 'lib/date-format';
import { Separator } from 'components/content';
import { SPACE, FONT_FAMILY_TEXT } from 'styles';
import { HtmlParser } from 'components/html-parser';

export const ArticleInList = (props) => {
  const { article } = props;

  const navigation = useNavigation();

  const {
    _id: id,
    region: { title: regionTitle, _id: regionId },
    photoUrl,
    title,
    excerpt,
    publishedBy,
    createdAt,
  } = article;

  const {
    _id: publisherId,
    name: publisherName,
    logoUrl: publisherLogoUrl,
  } = publishedBy;

  const goToArticle = () => {
    navigation.navigate('Article', { articleId: id, regionTitle });
  };

  const goToPublisher = () => {
    navigation.navigate('Publisher', { publisherId, publisherName });
  };

  const goTeRegion = () => {
    navigation.navigate('Region', { regionId, regionTitle });
  };

  return (
    <>
      <View style={articleStyles.article}>
        {/* Header: Publisher Logo & Name */}
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={goToPublisher}>
          <View style={[gridStyles.container, articleStyles.header]}>
            <View style={styles.publisherLogoWrapper}>
              <ImageBackground
                source={{
                  uri: `${config.apiUrl}/uploads/${publisherLogoUrl}`,
                }}
                resizeMode="contain"
                style={styles.publisherLogo}
              />
            </View>
            <View style={styles.publisherTitleWrapper}>
              <Text
                style={[articleStyles.publisherTitle, styles.publisherTitle]}>
                {publisherName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Thumbnail */}
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={goToArticle}>
          <ImageBackground
            source={{
              uri: `${config.apiUrl}/uploads/w768/${photoUrl}`,
            }}
            resizeMode="cover"
            style={[articleStyles.thumbnail, styles.thumbnail]}>
            <View style={articleStyles.popupMenuWrapper}>
              <ArticlePopupMenu articleId={id} publisherId={publisherId} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <View style={gridStyles.container}>
          {/* Region & Date */}
          <View style={articleStyles.regionAndDate}>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={goTeRegion}>
              <Text style={articleStyles.region}>{regionTitle}</Text>
            </TouchableOpacity>
            <Text style={articleStyles.regionAndDateSeparator}>|</Text>
            <Text style={articleStyles.date}>{dateFormat(createdAt)}</Text>
          </View>
          {/* Title & Excerpt */}
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={goToArticle}>
            {/* Title */}
            <View style={styles.titleWrapper}>
              <Text style={articleStyles.title}>{title}</Text>
            </View>
            {/* Excerpt */}
            <HtmlParser html={excerpt} />
          </TouchableOpacity>
        </View>
      </View>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  publisherLogoWrapper: {
    width: 48,
    height: 48,
    marginRight: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    elevation: 5,
    overflow: 'hidden',
  },
  publisherLogo: {
    width: 38,
    height: 38,
    borderRadius: 1000,
  },
  publisherTitleWrapper: {
    flex: 1,
  },
  publisherTitle: {
    fontSize: 20,
  },
  thumbnail: {
    height: 140,
  },
  titleWrapper: {
    marginBottom: SPACE,
  },
  excerptWrapper: {},
  excerpt: {
    fontFamily: FONT_FAMILY_TEXT,
  },
});
