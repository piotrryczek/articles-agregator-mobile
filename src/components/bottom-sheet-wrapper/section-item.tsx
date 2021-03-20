import React from 'react';

import { Region } from './region';
import { ArticlesGroup } from './articles-group';

export const SectionItem = (props) => {
  const { item } = props;
  const { type } = item;

  switch (type) {
    case 'region':
      return <Region region={item} />;
    case 'app':
      return <ArticlesGroup group={item} />;
    default:
      return null;
  }
};
