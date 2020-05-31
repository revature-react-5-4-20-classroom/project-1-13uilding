import React from 'react';
// This is the employee homepage which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role

export class Employee extends React.Component <any, any> {
  render() {
    return (
      <div className="myPage" id="employeePage">
        <h1>Employee</h1>
      </div>
    )
  }
}