import React from 'react';
import { User } from '../models/User';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { updateEmployee } from '../api/ExpenseReimbursementClient';
import { Role } from '../models/Role';
import { getRoleString } from '../utilities';

interface IAdminUserFormComponentProps {
  currentUser: User;
  updateUser: (user: User) => void;
}

interface IAdminUserFormComponentState {
  // username: string;
  [k: string]: any;
  username: string;
  role: Role | null;
  userid: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  errorMessage: string,
  isError: boolean,
}

export class AdminUserFormComponent extends React.Component <IAdminUserFormComponentProps, IAdminUserFormComponentState> {
  constructor(props: IAdminUserFormComponentProps) {
    super(props);
    this.state = {
      // username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errorMessage: '',
      isError: false,
      username: '',
      role: null,
      userid: 0,
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
        username: '',
        role: null,
        userid: 0,
      })
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,})
    }
  }
  setInputStates = (change: any) => {
    let { name, value } = change.currentTarget;
    if (name === "role") {
      value = new Role(value, getRoleString(value))
    }
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
          {/* CHANGE THIS METHINKS */}
          <Label for="password" md={2}>Password:</Label>
          <Col md={6}>
            <Input onChange={this.setInputStates} value={this.state.password} type="password" name="password" id="password" placeholder="new password" />
          </Col>
        </FormGroup>
        {/* Administrative roles form control */}
        <FormGroup row>
          <Label for="username" md={2}>Username:</Label>
          {/* We want to check the username in our db */}
          <Col md={6}>
            <Input onChange={this.setInputStates} value={this.state.username} type="text" name="username" id="username" placeholder="new username" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userid" md={2}>User Id:</Label>
          <Col md={6}>
            <Input onChange={this.setInputStates} value={this.state.userid} type="number" name="userid" id="userid" placeholder="new userid" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="role">Role:</Label>
          <Input type="select" name="role" id="role" multiple onChange={this.setInputStates}>
            <option value={9}>Secretary</option>
            <option value={7}>Sales</option>
            <option value={6}>Manager</option>
            <option value={8}>Admin</option>
            <option value={5}>Finance Manager</option>
          </Input>
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