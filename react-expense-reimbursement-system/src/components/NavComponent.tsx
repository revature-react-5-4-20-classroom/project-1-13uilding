import React from 'react';
import { Navbar, NavItem, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { User } from '../models/User';
import { pathToUpperCamel, pathToShortName } from '../utilities';

interface INavComponentProps {
  currentUser: User | null;
}

const employeeNavLinks = [
  "home",
  "employee", // View info, update info
  "employee/submit-reimbursement", // Upload image and submit
  "employee/view-reimbursement", // view pending, view resolved
  "logout",
];
const managerNavLinks = [
  "home",
  "manager", // Manager homepage
  "reimbursements", // Approve/deny pending reimbursements, view reimbursments
  "logout",
]
const adminNavLinks = [
  "home",
  "admin",
  "employees", // view employees, change employees, 
  "logout",
]
const guestLinks = [
  "home",
  "login",
]

export class NavComponent extends React.Component <INavComponentProps, any> {
  constructor(props: INavComponentProps) {
    super(props);
  }
  render() {
    const user = this.props.currentUser;
    var navLinks: string[] = [];
    if (user !== null) {
      switch (user.role.role) {
        case "finance-manager":
          navLinks = managerNavLinks;
          break;
        case "admin":
          navLinks = adminNavLinks;
          break;
        default:
          navLinks = employeeNavLinks;
          break;
      }
    } else {
      navLinks = guestLinks;
    }

    return (
      <Navbar color="faded" light className="nav-bar-background">
        {navLinks.map((link: string, index: number) => {
          return (
          <Col 
            key={index}
            md={link === "home" ? "4" : "2"} 
            xs={link === "home" ? "" : "3"}
          >
            <NavItem>
              <NavLink 
                to={`/${link}`} 
                className={"main-nav"}
                activeClassName={"main-nav-active"}
              >
                {link.includes("-reim") ? pathToShortName(link) : pathToUpperCamel(link)}
              </NavLink>
            </NavItem>
          </Col>
          )
        })}
          {/* <Col md="6" >
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
          </Col> */}
      </Navbar>
    )
  }
}