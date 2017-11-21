import React from 'react';
import { List } from 'semantic-ui-react';

import StoryItem from '../StoryItem';

const StoryList = ({
  stories,
  isFrontPage,
  isReadingsPage,
}) =>
  <List divided relaxed>
    {stories.map(story =>
      <StoryItem
        key={story.objectID}
        story={story}
        isFrontPage={isFrontPage}
        isReadingsPage={isReadingsPage}
      >
        <StoryHeader story={story} />
      </StoryItem>
    )}
  </List>

const StoryHeader = ({ story }) =>
  <span>
    <a href={story.url}>{story.title}</a>
    {' '}
    by
    {' '}
    {story.author}
  </span>

export default StoryList;