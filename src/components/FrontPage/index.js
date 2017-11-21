import React from 'react';
import { Loader } from 'semantic-ui-react';

import StoryList from '../StoryList';

const FrontPage = ({
  readings,
  stories,
  storiesLoading,
  storiesError,
}) => {
  if (storiesError) {
    return <p>Uuups, something went wrong.</p>;
  }

  if (storiesLoading) {
    return <Loader active inline="centered" />;
  }

  if (!stories) {
    return <p>Uuups, there are no more front page stories for you.</p>;
  }

  const readableStories = readings
    ? stories.filter(story => !readings[story.objectID])
    : stories;

  if (!readableStories.length) {
    return <p>Uuups, there are no more front page stories for you.</p>;
  }

  return <StoryList
    stories={readableStories}
    isFrontPage={true}
  />
}

export default FrontPage;
