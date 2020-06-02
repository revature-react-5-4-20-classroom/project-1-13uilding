import React from 'react';
import { User } from '../models/User';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { updateEmployee } from '../api/ExpenseReimbursementClient';

interface IUserFormComponentProps {
  currentUser: User;
  updateUser: (user: User) => void;
}

interface IUserFormComponentState {
  // username: string;
  [k: string]: any;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  errorMessage: string,
  isError: boolean,
}

export class UserFormComponent extends React.Component <IUserFormComponentProps, IUserFormComponentState> {
  constructor(props: IUserFormComponentProps) {
    super(props);
    this.state = {
      // username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errorMessage: '',
      isError: false,
    }
  }
  attemptUpdate = async (e: any) => {
    e.preventDefault();
    if (!(this.state.firstname || this.state.lastname || this.state.email || this.state.password)) {
      // Add a message that says at least one field needs to be added.
      return;
    }
    try {
      const { userid, username, role} = this.props.currentUser;
      const user = new User(userid, username, this.state.password, this.state.firstname, this.state.lastname, this.state.email, role);
      const updatedUser: User = await updateEmployee(user);
      // console.log(updatedUser);
      if (updatedUser.userid === this.props.currentUser.userid) {
        this.props.updateUser(updatedUser);
      }
      // Clear fields
      this.setState({
        // username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      })
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,})
    }
  }
  setInputStates = (change: any) => {
    let { name, value } = change.currentTarget;
    this.setState({[name]: value})
  }
  clearError = () => {
    this.setState({
      isError: false,
      errorMessage: '',
    })
  }

  render() {
    return (
    <>
      <Form onSubmit={this.attemptUpdate}>
        <FormGroup row>
          <Label for="firstname" md={2}>First Name:</Label>
          <Col md={4}>
            <Input onChange={this.setInputStates} value={this.state.firstname} type="text" name="firstname" id="firstname" placeholder="new first name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lastname" md={2}>Last Name:</Label>
          <Col md={4}>
            <Input onChange={this.setInputStates} value={this.state.lastname} type="text" name="lastname" id="lastname" placeholder="new last name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" md={2}>Email:</Label>
          <Col md={6}>
            <Input onChange={this.setInputStates} value={this.state.email} type="email" name="email" id="email" placeholder="new email" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" md={2}>Password:</Label>
          <Col md={6}>
            <Input onChange={this.setInputStates} value={this.state.password} type="password" name="password" id="password" placeholder="new password" />
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
    </>
  )}
}