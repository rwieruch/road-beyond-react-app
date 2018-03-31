import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loader, List } from 'semantic-ui-react';

import withAuthorization from '../Session/withAuthorization';
import StoryItem from '../StoryItem';
import Comments from '../Comments';
import * as routes from '../../constants/routes';

const ReadingListPage = ({
  readings,
  readingsLoading,
}) => {
  if (readingsLoading) {
    return <Loader active inline="centered" />;
  }

  if (!readings) {
    return <p>Uuups, you don't have any saved readings yet.</p>;
  }

  return (
    <Switch>
      <Route
        exact path={routes.READING_LIST}
        component={() =>
          <ReadingList
            readings={readings}
          />
        }
      />

      <Route
        path={`${routes.READING_LIST}/:id`}
        component={(props) =>
          <ReadingItem
            readings={readings}
            { ...props }
          />
        }
      />
    </Switch>
  );
}

const ReadingItem = ({
  readings,
  match,
}) => {
  const story = readings[match.params.id];

  return (
    <div>
      <StoryItem
        story={story}
        isReadingsPage={true}
      />
      <Comments story={story} />
    </div>
  );
}

const ReadingList = ({ readings }) =>
  <List divided relaxed>
    {Object.keys(readings).map(key =>
      <StoryItem
        key={key}
        story={readings[key]}
        isReadingsPage={true}
      />
    )}
  </List>

export default withAuthorization(true)(ReadingListPage);