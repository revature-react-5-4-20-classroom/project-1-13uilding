import React from 'react';
import { User } from '../models/User';
import { Row, Col, Button, Badge } from 'reactstrap';
import jaguar from '../images/jaguar.jpg';
import { Image } from 'react-bootstrap';
import { AdminUserFormComponent } from '../components/AdminUserFormComponent';
import { UserFormComponent } from '../components/UserFormComponent';
import { UserInfoComponent } from '../components/UserInfoComponent';
import { pathToUpperCamel } from '../utilities';
import { SubmitReimbursement } from './SubmitReimbursement';
import { ViewReimbursement } from './ViewReimbursement';
// This is the employee homepage which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role

interface IEmployeeProps {
  currentUser: User | null;
  location: {pathname: string};
  updateUser: (user: User) => void;
  page: string;
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
      <div className="myPage" id={this.props.page}>
        {(this.props.currentUser === null) ? <h1>Log in to see employee information.</h1> : (
          <>
            <h1>{`${pathToUpperCamel(this.props.currentUser.firstname)} ${pathToUpperCamel(this.props.currentUser.lastname)}'s Page`}</h1>
            <Row>
              <Col className="text-center" md="3">
                <Image src={jaguar} thumbnail roundedCircle/>
                <Button onClick={(e) => console.log(e.target)} color="primary">Change Image</Button>
              </Col>
              <Col md="8">
                <UserInfoComponent user={this.props.currentUser}/>
              </Col>
{/* - LATER: An Employee receives an email when one of their reimbursement requests is resolved (optional) */}
            </Row>
            <Row>
              <Col>
              <hr/>
                <h3>Update Personal Information</h3>
                  <UserFormComponent updateUser={this.props.updateUser} currentUser={this.props.currentUser}></UserFormComponent>
              </Col>
            </Row>
            {this.props.page === 'employeePage' ? '' : 
              <>
                <Row>
                  <Col>
                    <hr/>
                    <h3>Submit A Personal Reimbursement</h3>
                    <SubmitReimbursement 
                      currentUser={this.props.currentUser}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr/>
                    <h3>View Personal Reimbursements</h3>
                    <ViewReimbursement 
                      currentUser={this.props.currentUser}
                    />
                  </Col>
                </Row>
              </>
            }
          </>
        )}
      </div>
    )
  }
}