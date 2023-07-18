import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/Routing/Routes';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Notification from './components/Layout/Notification';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
      <Notification />
    </Provider>
  );
};

export default App;
