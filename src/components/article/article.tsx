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
import {
  gridStyles,
  articleStyles,
  BIG_SPACE,
  ACTIVE_OPACITY,
  SPACE,
} from 'styles';
import { ArticlePopupMenu } from 'components/article-popup-menu';
import dateFormat from 'lib/date-format';
import { Patronite } from 'components/patronite';
import { HtmlParser } from 'components/html-parser';

export const Article = (props) => {
  const { article } = props;

  const navigation = useNavigation();

  if (!article) return null; // Remember! It is also secured from ArticleScreen

  const {
    _id: id,
    region: { title: regionTitle, _id: regionId },
    photoUrl,
    title,
    publishedBy,
    createdAt,
    author,
    content,
  } = article;

  const {
    _id: publisherId,
    name: publisherName,
    logoUrl: publisherLogoUrl,
    patroniteUrl,
  } = publishedBy;

  const goToPublisher = () => {
    navigation.navigate('Publisher', { publisherId, publisherName });
  };

  const goTeRegion = () => {
    navigation.navigate('Region', { regionId, regionTitle });
  };

  return (
    <View style={articleStyles.article}>
      {/* Header: Publisher Logo & Name */}
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={goToPublisher}>
        <View style={{ ...gridStyles.container, ...articleStyles.header }}>
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
            <Text style={[articleStyles.publisherTitle, styles.publisherTitle]}>
              {publisherName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Thumbnail */}
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
      <View style={gridStyles.container}>
        {/* Region & Date */}
        <View style={articleStyles.regionAndDate}>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={goTeRegion}>
            <Text style={articleStyles.region}>{regionTitle}</Text>
          </TouchableOpacity>
          <Text style={articleStyles.regionAndDateSeparator}>|</Text>
          <Text style={articleStyles.date}>{dateFormat(createdAt)}</Text>
        </View>

        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={articleStyles.title}>{title}</Text>
        </View>
        {/* Content */}
        <View style={styles.articleContent}>
          <HtmlParser html={content} />
        </View>
        {/* Author */}
        {!!author && (
          <View style={articleStyles.authorWrapper}>
            <Text style={articleStyles.author}>Napisany przez: {author}</Text>
          </View>
        )}
        <ImageBackground
          source={{
            uri: `${config.apiUrl}/uploads/${publisherLogoUrl}`,
          }}
          resizeMode="contain"
          style={styles.publisherBottomLogo}
        />
        {!!patroniteUrl && <Patronite url={patroniteUrl} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginBottom: 20,
  },
  publisherBottomLogo: {
    width: '100%',
    height: 50,
    marginBottom: SPACE,
  },
  publisherLogoWrapper: {
    width: 56,
    height: 56,
    marginRight: 10,
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
  thumbnail: {
    height: 180,
  },
  articleContent: {
    marginBottom: BIG_SPACE,
    flex: 1,
  },
});
