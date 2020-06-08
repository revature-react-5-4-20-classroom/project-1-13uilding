import React from 'react';
import { User } from '../models/User';
import { Row, Col } from 'reactstrap';
import { pathToUpperCamel } from '../utilities';

interface IUserInfoComponentProps {
  user: User;
  index: number;
}

export class UserInfoComponent extends React.Component <IUserInfoComponentProps, any> {
  constructor(props: IUserInfoComponentProps) {
    super(props);
  }
  
  render() {
    let { userid, username, password, firstname, lastname, email, role } = this.props.user;
    let colorClass = (this.props.index === 0) ? "user-info-row-0" : "user-info-row-1";
    return (
      <div className={`user-info-wrapper variant-${this.props.index}`}>
        <Row className={colorClass}>
          <Col>
            User Id
          </Col>
          <Col>
            {userid}
          </Col>
        </Row>
        <Row >
          <Col>
            Username
          </Col>
          <Col>
            {username}
          </Col>
        </Row>
        <Row className={colorClass}>
          <Col>
            First Name
          </Col>
          <Col>
            {pathToUpperCamel(firstname)}
          </Col>
        </Row>
        <Row >
          <Col>
            Last Name
          </Col>
          <Col>
            {pathToUpperCamel(lastname)}
          </Col>
        </Row>
        <Row className={colorClass}>
          <Col>
            Email
          </Col>
          <Col>
            {email}
          </Col>
        </Row>
        <Row >
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