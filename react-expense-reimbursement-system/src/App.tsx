import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// My files
import { Login } from './pages/Login';
import { Employee } from './pages/Employee';
import { Manager } from './pages/Manager';

export class App extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <Router>

          <Switch>
            <Route path="/login" render={(props) => <Login {...props}/> }/>
            <Route path="/employee" render={(props) => <Employee {...props}/> }/>
            <Route path="/manager" render={(props) => <Manager {...props}/> }/>
          </Switch>

        </Router>
      </Container>
    )
  }
}