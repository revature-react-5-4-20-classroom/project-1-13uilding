import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// My files
import { NavComponent } from './components/NavComponent';
import { Login } from './pages/Login';
import { Employee } from './pages/Employee';
import { Manager } from './pages/Manager';
import { User } from './models/User';
import { Admin } from './pages/Admin';
import { Landing } from './pages/Landing';
import { SubmitReimbursement } from './pages/SubmitReimbursement';
import { ViewReimbursement } from './pages/ViewReimbursement';
import { login } from './api/ExpenseReimbursementClient';

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

  //! Temporary ======================================================

  attemptLogin = async (username: string, password: string) => {
    try {
      const loggedInUser: User = await login(username, password); 
      this.updateUser(loggedInUser);
      // this.setState(loggedInUser)
      this.pushSwitch(this.props.currentUser ? this.props.currentUser.role.role : "/home");
    } catch (error) {
      this.setState({ 
        errorMessage: error.message, 
        isError: true 
      })
    }

  }

  pushSwitch = (role: string | null): string => {
    let result: string = "/home";
    if (role === null) return result;
    switch (role) {
      case "finance-manager":
        result = "/manager";
        break;
      case "admin":
        result = "/admin";
        break;
      default:
        result = "/employee";
        break;
    }
    return result;
  }

  componentDidMount() {
    this.attemptLogin("longknee", "lassword");
  }

  //! Temporary ===================================================
  
  render() {
    return (
      <Container>
        <Router>
          <NavComponent currentUser={this.state.loggedInUser} />
          <div id="div-body">
            <Switch>

              <Route path="/home" render={(props) => 
                <Landing 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Route path="/login" render={(props) => 
                <Login 
                  currentUser={this.state.loggedInUser ? this.state.loggedInUser : null} 
                  updateUser={this.updateUser} 
                  {...props}
                />}
              />
              {/* admin  */}
              <Route path="/admin" render={(props) => 
                <Admin 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Route path="/admin/employees" render={(props) => 
                <Admin 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Switch>


                {/* Employee  */}
                <Route path="/employee/submit-reimbursement" render={(props) => 
                  <SubmitReimbursement 
                    currentUser={this.state.loggedInUser}
                    {...props}
                  />}
                />
                <Route path="/employee/view-reimbursement" render={(props) => 
                  <ViewReimbursement 
                    currentUser={this.state.loggedInUser}
                    {...props}
                  />}
                />

                <Route path="/employee" render={(props) => 
                  <Employee 
                    currentUser={this.state.loggedInUser}
                    updateUser={this.updateUser} 
                    {...props}
                  />}
                />
              </Switch>
              {/* Manager  */}
              <Route path="/manager" render={(props) => 
                <Manager 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              <Route path="/manager/reimbursements" render={(props) => 
                <Manager 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
              {/* Logout  */}
              {/* Need to refactor https://serverless-stack.com/chapters/redirect-on-login-and-logout.html */}
              <Route path="/logout" render={(props) => {
                return (
                    <Redirect 
                      to="/login"
                      {...props}
                    />)
              }}/>
              
              <Route path="/" render={(props) => 
                <Landing 
                  currentUser={this.state.loggedInUser}
                  {...props}
                />}
              />
            </Switch>
          </div>
        </Router>
      </Container>
    )
  }
}