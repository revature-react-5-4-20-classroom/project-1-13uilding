import React from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody, Row } from 'reactstrap';
import { User } from '../models/User';
import { login } from '../api/ExpenseReimbursementClient';
import robin from '../images/robin.jpg';
import { Image } from 'react-bootstrap';
import { Redirect } from 'react-router';

interface ILoginComponentProps {
  updateUser: (user: User | null) => void;
  currentUser: User | null;
  location: {pathname: string};
  history: {push: any};
}

interface ILoginComponentState {
  username: string;
  password: string;
  isError: boolean;
  errorMessage: string;
}

export class Login extends React.Component <ILoginComponentProps, ILoginComponentState> {
  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMessage: '',
    }
  }

  setUsername = (username: any) => {
    this.setState({ username: username.currentTarget.value })
  }
  setPassword = (password: any) => {
    this.setState({ password: password.currentTarget.value })
  }

  clearError = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    })
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
  
  attemptLogin = async (e: any) => {
    e.preventDefault();
    try {
      const loggedInUser: User = await login(this.state.username, this.state.password); 
      this.props.updateUser(loggedInUser);
      this.setState({
        username: '',
        password: ''
      })
      this.props.history.push(this.pushSwitch(this.props.currentUser ? this.props.currentUser.role.role : "/home"))
    } catch (error) {
      this.setState({ 
        password: '', 
        errorMessage: error.message, 
        isError: true 
      })
    }

  }

  componentDidMount() {
    if (this.props.currentUser !== null) {
      this.props.updateUser(null);
    }
  }

  //! Removed functionality
  // componentDidMount() {
  //   if (this.props.location.pathname === "logout") {
  //     this.props.updateUser(null);
  //   }
  // }
  render() {
    return (
      <div className="myPage" id="loginPage">
        <h1>Login</h1>
        <Row>
          <Col xs="2">
            <Image src={robin} thumbnail roundedCircle/>
          </Col>
          <Col xs="8">
            <h3>
              {this.props.currentUser ? 'Logged in as ' + this.props.currentUser.username : "Login"}
            </h3>
          </Col>
        </Row>
        <Form onSubmit={this.attemptLogin}>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={6}>
              {/* onChange lets input change state, value lets Input display state */}
              <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username" placeholder="your username" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={6}>
              <Input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password" required />
            </Col>
          </FormGroup>
          <Button color="primary">Submit</Button>
        </Form>
        <Toast isOpen={this.state.isError}>
          <ToastHeader icon="danger" toggle={this.clearError}>
            Error!
          </ToastHeader>
          <ToastBody>
            {this.state.errorMessage}
          </ToastBody>
        </Toast>
      </div>
    )
  }
}