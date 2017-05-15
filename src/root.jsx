import React from 'react';
import DefaultLayout from './components/default_layout/default-layout.jsx';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './root.scss';
import CSSModules from 'react-css-modules';
//import Login from './components/app/login/login.js';
import Home from './components/app/home/home-page.js';
import Settings from './components/app/settings/settings-page.js';
import Events from './components/app/events/event-page.js';
import SingleEvent from './components/app/single_event/single-event-page.js';
import Favourites from './components/app/favourites/favourites-page.js';
import Categories from './components/app/categories/categories-page.js';

class Root extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={ store }>
        <Router>
          <DefaultLayout>
            <Switch>
              <Route
                exact path="/"
                render={ matchProps => (<Home {...matchProps} />) }
              ></Route>
              <Route
                path="/settings"
                render={ matchProps => (<Settings {...matchProps} />) }
              ></Route>
              <Route
                path="/events/:eventId"
                render={ matchProps => (<SingleEvent {...matchProps} />) }
              ></Route>
              <Route
                path="/events"
                render={ matchProps => (<Events {...matchProps} />) }
              ></Route>
              <Route
                path="/categories"
                render={ matchProps => (<Categories {...matchProps} />) }
              ></Route>
              <Route
                path="/favourites"
                render={ matchProps => (<Favourites {...matchProps} />) }
              />
            </Switch>
          </DefaultLayout>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default CSSModules(Root, styles);