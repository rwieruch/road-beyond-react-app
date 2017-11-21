import React, { Component } from 'react';
import { List, Loader } from 'semantic-ui-react';
import axios from 'axios';
import styled from 'styled-components';

const CommentsBlock = styled.div`
  padding-left: 10px;
  border-left: 1px solid #e0e1e2;
`;

const Comment = styled.div`
  padding: 10px 0;
`;

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      story: null,
      storyLoading: false,
      storyError: false,
    }
  }

  componentDidMount() {
    const { objectID } = this.props.story;

    this.setState({ storyLoading: true });

    axios(`http://hn.algolia.com/api/v1/items/${objectID}`)
      .then(result => this.setState({
        story: result.data,
        storyLoading: false
      }))
      .catch(error => this.setState({
        storyError: error,
        storyLoading: false,
      }));
  }

  render() {
    const {
      story,
      storyLoading,
      storyError,
    } = this.state;

    if (storyLoading) {
      return <Loader active inline="centered" />;
    }

    if (storyError) {
      return <p>Uuup, something went wrong.</p>;
    }

    return story && <CommentList comments={story.children} />;
  }
}

const CommentList = ({ comments }) =>
  <List divided relaxed>
    <CommentsBlock>
      {comments.map(comment =>
        <List.Item key={comment.id}>

          <Comment>
            <strong>{comment.author}</strong>
            :{' '}
            <span
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </Comment>

          {comment.children.length
            ? <CommentList comments={comment.children} />
            : null
          }
        </List.Item>
      )}
    </CommentsBlock>
  </List>

export default Comments;