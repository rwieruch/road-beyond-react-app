import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Navigation from '../Navigation';
import FrontPage from '../FrontPage';
import ReadingsPage from '../Readings';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import { firebase, db } from '../../firebase';
import * as routes from '../../constants/routes';

import './index.css';

const HN_URL = 'http://hn.algolia.com/api/v1/search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: null,
      storiesLoading: false,
      storiesError: null,

      readingsInit: null,
      readings: null,
      readingsLoading: null,
    };

    this.onFetchStories = this.onFetchStories.bind(this);
    this.onFetchReadings = this.onFetchReadings.bind(this);
  }

  componentDidMount() {
    this.onFetchStories();

    firebase.auth.onAuthStateChanged(authUser => {
      if (!this.state.readingsInit && authUser) {
        this.onFetchReadings(authUser);

        this.setState({ readingsInit: true });
      }
    });
  }

  onFetchStories() {
    this.setState({ storiesLoading: true })

    axios(`${HN_URL}?tags=front_page`)
      .then(result => this.setState((prevState) => ({
        stories: result.data.hits,
        storiesLoading: false,
      })))
      .catch(error => this.setState({
        storiesError: error,
        storiesLoading: false,
      }));
  }

  onFetchReadings(authUser) {
    this.setState(() => ({ readingsLoading: true }));

    db.onGetReadings(authUser, (snapshot) =>
      this.setState(() => ({
        readings: snapshot.val(),
        readingsLoading: false,
      }))
    );
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Navigation />

          <hr/>

          <Route
            exact path={routes.FRONTPAGE}
            component={() =>
              <FrontPage
                { ...this.state }
              />
            }
          />

          <Route
            path={routes.READING_LIST}
            component={() =>
              <ReadingsPage
                { ...this.state }
              />
            }
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