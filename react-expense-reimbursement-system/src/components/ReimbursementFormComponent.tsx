import React from 'react';
import { User } from '../models/User';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { updateEmployee, submitReimbursement } from '../api/ExpenseReimbursementClient';
import { Reimbursement } from '../models/Reimbursement';
import moment from 'moment';
import { SubmitReimbursement } from '../pages/SubmitReimbursement';

interface IReimbursementFormProps {
  currentUser: User;
}

interface IReimbursementFormState {
  // username: string;
  [k: string]: any;
  amount: string;
  description: string;
  type: string;
  isError: boolean;
  errorMessage: string;
}

export class ReimbursementFormComponent extends React.Component <IReimbursementFormProps, IReimbursementFormState> {
  constructor(props: IReimbursementFormProps) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      type: '',
      isError: false,
      errorMessage: '',
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

  attemptSubmit = async (e: any) => {
    e.preventDefault();
    if (!(this.state.amount && this.state.description && this.state.type)) {
      // All fields need to be added
      return;
    }
    try {
      const author = this.props.currentUser.userid;
      let today: any = moment();
      let datesubmitted = today.format('MMMM D HH:mm:ss YYYY ');
      datesubmitted += /[A-Z]{3}/.exec(today);
      const { amount, description, type } = this.state;
      const reimbursement = new Reimbursement(1, author, parseInt(amount), datesubmitted, null, description, null, 1, parseInt(type));
      console.log("Reimbursement before we make a call");
      console.log(reimbursement);
      const submittedReimbursement: Reimbursement = await submitReimbursement(reimbursement);
      console.log(submittedReimbursement);
      //TODO Make a message it was submitted
      // this.props.addedReimbursement()
      // Clear fields
      this.setState({
        amount: '',
        description: '',
        type: '',
      })
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,})
    }
  }

  render() {
    return (
    <>
      <Form onSubmit={this.attemptSubmit}>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input onChange={this.setInputStates} value={this.state.amount} type="number" name="amount" id="amount" placeholder="amount of reimbursement" />
        </FormGroup>
        {/* TODO: Make a call to get the database */}
        <FormGroup>
          <Label for="type">Type</Label>
          <Input type="select" name="type" id="type" multiple onChange={this.setInputStates}>
            <option value={2}>Food</option>
            <option value={1}>Travel</option>
            <option value={4}>Lodging</option>
            <option value={3}>Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
            <Input onChange={this.setInputStates} value={this.state.description} type="textarea" name="description" id="description" placeholder="description" />
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