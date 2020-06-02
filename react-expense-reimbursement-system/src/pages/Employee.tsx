import React from 'react';
import { User } from '../models/User';
import { Row, Col, Button } from 'reactstrap';
import dog from '../images/dog.jpg';
import jaguar from '../images/jaguar.jpg';
import { Image } from 'react-bootstrap';
import { UserFormComponent } from '../components/UserFormComponent';
// This is the employee homepage which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role

interface IEmployeeProps {
  currentUser: User | null;
  location: {pathname: string};
  updateUser: (user: User) => void;
}
interface IEmployeeState {
  test: string;
}

export class Employee extends React.Component <IEmployeeProps, IEmployeeState> {
  constructor(props: IEmployeeProps) {
    super(props);
    this.state = {
      test: '',
    }
  }



  render() {
    return (
      <div className="myPage" id="employeePage">
        {(this.props.currentUser === null) ? <h1>Log in to see employee information.</h1> : (
          <>
            <h1>Employee</h1>
            <Row>
              <Col className="text-center" md="3">
                <Image src={jaguar} thumbnail roundedCircle/>
                <Button onClick={(e) => console.log(e.target)}>Change Image</Button>
              </Col>
              <Col md="8">
- EMPLOYEE PAGE: An Employee can view their information
              </Col>
- LATER: An Employee receives an email when one of their reimbursement requests is resolved (optional)
            </Row>
            <Row>
              <Col>
- EMPLOYEE PAGE: An Employee can update their information
                <UserFormComponent updateUser={this.props.updateUser} currentUser={this.props.currentUser}></UserFormComponent>
              </Col>
            </Row>
            </>
        )}
      </div>
    )
  }
}