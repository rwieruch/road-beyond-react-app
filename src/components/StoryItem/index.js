import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, List, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import * as routes from '../../constants/routes';
import { db } from '../../firebase';

const StoryRow = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: baseline;
`;

const StoryContentItem = styled.div`
  margin-right: 10px;
`;

const StoryItem = ({
  story,
  isFrontPage,
  isReadingsPage,
}, {
  authUser,
}) =>
  <List.Item>
    <List.Content>

      <List.Description as="div">
        <List.Header as="h4">
          <a href={story.url}>
            {story.title}
          </a>
        </List.Header>

        <StoryRow>
          <StoryContentItem>
            <Label>
              Comments
              <Label.Detail>
                <Link to={`${routes.READING_LIST}/${story.objectID}`}>
                  {story.num_comments}
                </Link>
              </Label.Detail>
            </Label>
          </StoryContentItem>

          <StoryContentItem>
            <Label>
              Votes
              <Label.Detail>
                {story.points}
              </Label.Detail>
            </Label>
          </StoryContentItem>

          {isFrontPage && <ReadLaterButton
            story={story}
            authUser={authUser}
          />}

          {isReadingsPage && <DismissButton
            story={story}
            authUser={authUser}
          />}
        </StoryRow>
      </List.Description>
    </List.Content>
  </List.Item>

StoryItem.contextTypes = {
  authUser: PropTypes.object,
};

class ReadLaterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readLaterSuccess: null,
      readLaterError: null,
    };

    this.onReadLater = this.onReadLater.bind(this);
  }

  onReadLater(story, authUser) {
    db.doCreateReading(authUser, story)
      .then(() => {
        this.setState(() => ({ readLaterSuccess: true }));
      })
      .catch(() => {
        this.setState(() => ({ readLaterError: true }));
      });
  }

  render() {
    const { story, authUser } = this.props;
    const { readLaterSuccess, readLaterError } = this.state;

    if (!authUser) {
      return null;
    }

    if (readLaterSuccess) {
      return <span><Icon name="check" /> Saved</span>;
    }

    if (readLaterError) {
      return <span><Icon name="bug" /> Uuups</span>;
    }

    return (
      <Button
        size="mini"
        primary={true}
        onClick={() => this.onReadLater(story , authUser)}
      >
        <Icon name="bookmark" /> Read Later
      </Button>
    );
  }
}

const DismissButton = ({
  story,
  authUser,
}) => {
  if (!authUser) {
    return null;
  }

  return (
    <Button
      size="mini"
      primary={true}
      onClick={() => db.doRemoveReading(authUser, story)}
    >
      <Icon name="bookmark" /> Dismiss
    </Button>
  );
}

export default StoryItem;