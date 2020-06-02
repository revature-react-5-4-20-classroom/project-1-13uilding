import React from 'react';
import { User } from '../models/User';
import { Row, Col } from 'reactstrap';
import { pathToUpperCamel } from '../utilities';

interface IUserInfoComponentProps {
  user: User;
}

export class UserInfoComponent extends React.Component <IUserInfoComponentProps, any> {
  constructor(props: IUserInfoComponentProps) {
    super(props);
  }
  
  render() {
    let { userid, username, password, firstname, lastname, email, role } = this.props.user;

    return (
      <div className="user-info-wrapper">
        <Row className="user-info-row-1">
          <Col>
            User Id
          </Col>
          <Col>
            {userid}
          </Col>
        </Row>
        <Row className="user-info-row-2">
          <Col>
            Username
          </Col>
          <Col>
            {pathToUpperCamel(username)}
          </Col>
        </Row>
        <Row className="user-info-row-1">
          <Col>
            First Name
          </Col>
          <Col>
            {pathToUpperCamel(firstname)}
          </Col>
        </Row>
        <Row className="user-info-row-2">
          <Col>
            Last Name
          </Col>
          <Col>
            {pathToUpperCamel(lastname)}
          </Col>
        </Row>
        <Row className="user-info-row-1">
          <Col>
            Email
          </Col>
          <Col>
            {pathToUpperCamel(email)}
          </Col>
        </Row>
        <Row className="user-info-row-2">
          <Col>
            Role
          </Col>
          <Col>
            {pathToUpperCamel(role.role)}
          </Col>
        </Row>
      </div>
    )
  }
}