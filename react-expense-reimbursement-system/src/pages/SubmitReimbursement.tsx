import React from 'react';
import { ReimbursementFormComponent } from '../components/ReimbursementFormComponent';
import { User } from '../models/User';
// This is the admin homepage only accessable to admin


interface ISubmitReimbursementProps {
  currentUser: User;
  onSubmit?: (e: any) => void;
}

interface ISubmitReimbursementState {
  test: string;
}

export class SubmitReimbursement extends React.Component <ISubmitReimbursementProps, ISubmitReimbursementState> {
  constructor(props: ISubmitReimbursementProps) {
    super(props);
    this.state = {
      test: 'hi'
    }
  }
  render() {
    return (
      <div className="myPage" id="submitReimbursementPage">
        <ReimbursementFormComponent currentUser={this.props.currentUser} onSubmit={this.props.onSubmit}></ReimbursementFormComponent>
      </div>
      // Add alert here and pass down submit reimbursement?
    )
  }
}

// This is the submit reimbursement page which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role