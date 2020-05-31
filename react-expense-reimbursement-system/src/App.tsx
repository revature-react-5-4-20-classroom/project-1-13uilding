import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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

  updateUser = (user: User | null) => {
    this.setState({
      loggedInUser: user,
    })
  }
  
  render() {
    return (
      <Container>
        <Router>
          <NavComponent currentUser={this.state.loggedInUser} />
          <div id="div-body">
            <Switch>
              <Route path="/login" render={(props) => 
                <Login 
                  currentUser={this.state.loggedInUser ? this.state.loggedInUser : null} 
                  updateUser={this.updateUser} 
                  {...props}
                />}
              />
              <Route path="/employee" render={(props) => 
                <Employee 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Route path="/manager" render={(props) => 
                <Manager 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Route path="/logout" render={(props) => {
                {this.updateUser(null)}
                return (
                <Redirect 
                  to="/login"
                  {...props}
                />)}}
              />
            </Switch>
          </div>
        </Router>
      </Container>
    )
  }
}