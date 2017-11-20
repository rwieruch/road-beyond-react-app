import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

class ReadingListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readings: null
    };
  }

  componentDidMount() {
    const { authUser } = this.context;

    db.onceGetReadings(authUser).then(snapshot =>
      this.setState(() => ({ readings: snapshot.val() }))
    );
  }

  render() {
    const { readings } = this.state;

    return (
      <Switch>
        <Route
          exact path={routes.READING_LIST}
          component={() => <ReadingList readings={readings} />}
        />

        <Route
          path={`${routes.READING_LIST}/:id`}
          component={(props) => <ReadingItem readings={readings} { ...props } />}
        />
      </Switch>
    );
  }
}

ReadingListPage.contextTypes = {
  authUser: PropTypes.object,
};

const ReadingItem = ({ readings, match }) =>
  readings &&
  <a href={readings[match.params.id].url}>
    {readings[match.params.id].title}
  </a>

const ReadingList = ({ readings }) =>
  readings
    ? <div>
      {Object.keys(readings).map(key =>
        <div key={key}>
          <Link to={`${routes.READING_LIST}/${key}`}>
            {readings[key].title}
          </Link>
        </div>
      )}
    </div>
    : <Loader active inline='centered' />

export default withAuthorization(true)(ReadingListPage);