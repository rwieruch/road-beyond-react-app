import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { db } from '../../firebase';

const FrontPage = (props) =>
  <div>
    <h1>FrontPage</h1>
    <p>The FrontPage is open to everyone, even though the user isn't signed in.</p>

    <FrontPageList { ...props } />
  </div>

const FrontPageList = ({
  stories,
  storiesLoading,
  storiesError,
}, {
  authUser,
}) =>
  <div>
    {stories && stories.map(story =>
      <div key={story.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={story.url}>{story.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {story.author}
        </span>
        <span style={{ width: '10%' }}>
          {story.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {story.points}
        </span>
        <span style={{ width: '10%' }}>
          { authUser && <ReadLaterButton story={story} authUser={authUser} /> }
        </span>
      </div>
    )}
  </div>

FrontPageList.contextTypes = {
  authUser: PropTypes.object,
};

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

    if (success) {
      return <span>Success</span>;
    }

    if (error) {
      return <span>Error</span>;
    }

    return (
      <Button
        onClick={() => this.onReadLater(story)}
      >
        Read Later
      </Button>
    );
  }
}

export default FrontPage;
