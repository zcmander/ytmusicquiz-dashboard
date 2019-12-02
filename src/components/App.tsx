import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <div className="container-fluid h-100">
      <Router>
        <Switch>
          <Route exact path="/dashboard/:dashboard_id" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
