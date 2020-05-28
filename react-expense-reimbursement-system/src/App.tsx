import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// My files
import { NavComponent } from './components/NavComponent';
import { Login } from './pages/Login';
import { Employee } from './pages/Employee';
import { Manager } from './pages/Manager';
import { User } from './models/User';

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
    }
  }

  updateUser = (user: User) => {
    this.setState({
      loggedInUser: user,
    })
  }
  
  render() {
    return (
      <Container>
        <Router>
          <NavComponent></NavComponent>
          <Switch>
            <Route path="/login" render={(props) => <Login updateUser={this.updateUser} {...props}/> }/>
            <Route path="/employee" render={(props) => <Employee {...props}/> }/>
            <Route path="/manager" render={(props) => <Manager {...props}/> }/>
          </Switch>

        </Router>
      </Container>
    )
  }
}