import React from 'react';
// This is the admin homepage only accessable to admin

export class ViewReimbursement extends React.Component <any, any> {
  render() {
    return (
      <h1>ViewReimbursement</h1>
    )
  }
}

// This is the view reimbursement page which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role