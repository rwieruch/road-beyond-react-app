import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import Form from '../Form';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInAdditional = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignInPage = ({ history }) =>
  <div>
    <SignInForm history={history} />
    <SignInAdditional>
      <PasswordForgetLink />
      <SignUpLink />
    </SignInAdditional>
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.READING_LIST);
      })
      .catch(error => {
        this.setState(() => ({ error }));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
          type="password"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
