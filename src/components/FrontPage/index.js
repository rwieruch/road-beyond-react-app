import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, List, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

import { db } from '../../firebase';

const StoryContent = styled.div`
  margin: 10px;
  display: flex;
`;

const StoryContentItem = styled.div`
  margin: 0 10px;
`;

const FrontPage = ({
  stories,
  storiesLoading,
  storiesError,
}, {
  authUser,
}) =>
  stories &&
  <List divided relaxed>
    {stories.map(story =>
      <List.Item key={story.objectID}>
        <List.Content>
          <List.Header as='h4'>
            <a href={story.url}>{story.title}</a> by {story.author}
          </List.Header>

          <List.Description as='div'>
            <StoryContent>
              <StoryContentItem>
                <Label>
                  Comments
                  <Label.Detail>{story.num_comments}</Label.Detail>
                </Label>
              </StoryContentItem>

              <StoryContentItem>
                <Label>
                  Votes
                  <Label.Detail>{story.points}</Label.Detail>
                </Label>
              </StoryContentItem>

              <ReadLaterButton
                story={story}
                authUser={authUser}
              />
            </StoryContent>
          </List.Description>
        </List.Content>
      </List.Item>
    )}
  </List>

class ReadLaterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
    };

    this.onReadLater = this.onReadLater.bind(this);
  }

  onReadLater(story) {
    const { authUser } = this.props;

    db.doCreateReading(authUser, story)
      .then(() => {
        this.setState(() => ({ success: true }));
      })
      .catch(() => {
        this.setState(() => ({ error: true }));
      });
  }

  render() {
    const { story } = this.props;
    const { success, error } = this.state;
    const { authUser } = this.context;

    if (!authUser) {
      return null;
    }

    if (success) {
      return <span><Icon name="check" /> Saved</span>;
    }

    if (error) {
      return <span><Icon name="bug" /> Uuups</span>;
    }

    return (
      <Button
        size="mini"
        primary={true}
        onClick={() => this.onReadLater(story)}
      >
        <Icon name="bookmark" /> Read Later
      </Button>
    );
  }
}

ReadLaterButton.contextTypes = {
  authUser: PropTypes.object,
};

export default FrontPage;
