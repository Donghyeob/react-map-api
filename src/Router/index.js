import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Pages';

const MainRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Home />} />
        </Switch>
      </Router>
    </>
  )
}

export default MainRouter;