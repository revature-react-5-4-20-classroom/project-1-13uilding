import React from 'react';
import { Navbar, NavItem, Col } from 'reactstrap';
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
      <Navbar color="faded" light className="nav-bar-background">
          <Col md="6" >
            <NavItem>
              <NavLink to="/home" className="main-nav" activeClassName="main-nav-active">ERS Home</NavLink>
            </NavItem>
          </Col>
          <Col md="2" xs="3">
            <NavItem>
              <NavLink to="/employee" className="main-nav" activeClassName="main-nav-active">Employee</NavLink>
            </NavItem>
          </Col>
          <Col md="2" xs="3">
            <NavItem>
              <NavLink to="/manager" className="main-nav" activeClassName="main-nav-active">Manager</NavLink>
            </NavItem>
          </Col>
          <Col md="2" xs="3">

            <NavItem>
              <NavLink to="/login" className="main-nav" activeClassName="main-nav-active">Login</NavLink>
            </NavItem>
          </Col>
      </Navbar>
    )
  }
}