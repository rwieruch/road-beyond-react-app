import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import ReadlingListPage from '../ReadingList';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';

const HN_URL = 'http://hn.algolia.com/api/v1/search?tags=front_page';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: null,
      storiesLoading: false,
      storiesError: null,
    };
  }

  componentDidMount() {
    this.setState({ storiesLoading: true });

    axios(HN_URL)
      .then(result => this.setState({
        stories: result.data.hits,
        storiesLoading: false
      }))
      .catch(error => this.setState({
        storiesError: error,
        storiesLoading: false,
      }));
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />

          <hr/>

          <Route
            exact path={routes.FRONTPAGE}
            component={() => <FrontPage { ...this.state } />}
          />

          <Route
            path={routes.READING_LIST}
            component={ReadlingListPage}
          />

          <Route
            exact path={routes.SIGN_UP}
            component={SignUpPage}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={SignInPage}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={AccountPage}
          />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);