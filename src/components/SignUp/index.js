import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';

import Form from '../Form';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.READING_LIST);
          })
          .catch(error => {
            this.setState(() => ({ error }));
          });

      })
      .catch(error => {
        this.setState(() => ({ error }));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          value={username}
          onChange={event => this.setState({ username: event.target.value })}
          type="text"
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={passwordOne}
          onChange={event => this.setState({ passwordOne: event.target.value })}
          type="password"
          placeholder="Password"
        />
        <Input
          value={passwordTwo}
          onChange={event => this.setState({ passwordTwo: event.target.value })}
          type="password"
          placeholder="Confirm Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to="/signup">Sign Up</Link>
  </p>

export default withRouter(SignUpForm);

export {
  SignUpForm,
  SignUpLink,
};