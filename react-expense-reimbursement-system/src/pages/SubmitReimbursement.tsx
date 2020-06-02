import React from 'react';
// This is the admin homepage only accessable to admin

export class SubmitReimbursement extends React.Component <any, any> {
  render() {
    return (
      <h1>SubmitReimbursement - An Employee can submit a reimbursement request - EMPLOYEE PAGE: An Employee can upload an image of his/her receipt as part of the reimbursement request (optional)
      </h1>
    )
  }
}

// This is the submit reimbursement page which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role