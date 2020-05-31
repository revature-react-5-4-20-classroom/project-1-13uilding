import React from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { User } from '../models/User';
import { login } from '../api/ExpenseReimbursementClient';

interface ILoginComponentProps {
  updateUser: (user: User | null) => void;
  currentUser: User;
  location: {pathname: string};
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
  
  attemptLogin = async (e: any) => {
    e.preventDefault();
    try {
      const loggedInUser: User = await login(this.state.username, this.state.password); 
      this.props.updateUser(loggedInUser);
      this.setState({
        username: '',
        password: ''
      })
    } catch (error) {
      this.setState({ 
        password: '', 
        errorMessage: error.message, 
        isError: true 
      })
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
        <h1>{this.props.currentUser ? `Logged in as ${this.props.currentUser.username}` : "Login"}</h1>
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