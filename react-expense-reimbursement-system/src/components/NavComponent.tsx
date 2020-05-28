import React from 'react';
import { Navbar, NavbarBrand, NavItem, Nav, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';


export class NavComponent extends React.Component <any, any> {
  //! Not sure if I need this for current page
  // constructor(props: any) {
  //   super(props) {
  //     this.state = {

  //     }
  //   }
  // }
  render() {
    return (
      <Navbar color="faded" light>
          <Col xs="6">
            <NavbarBrand href="/home" className="mr-auto">Expense Reimbursement System</NavbarBrand>
          </Col>
          <Col xs="2">
            <NavItem>
              <NavLink to="/employee">Employee</NavLink>
            </NavItem>
          </Col>
          <Col xs="2">
            <NavItem>
              <NavLink to="/manager">Manager</NavLink>
            </NavItem>
          </Col>
          <Col xs="2">
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
          </Col>
      </Navbar>
    )
  }
}