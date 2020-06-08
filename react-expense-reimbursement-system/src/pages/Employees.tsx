import React from 'react';
import { User } from '../models/User';
import { getUsers } from '../api/ExpenseReimbursementClient';
import { Row, Col } from 'reactstrap';
import { UserInfoComponent } from '../components/UserInfoComponent';
// This is the admin homepage only accessable to admin


interface IEmployeesProps {
  // Add null later
  currentUser: User | null;
}
interface IEmployeesState {
  users: Array<User>;
  errorMessage: string;
  isError: boolean;
}

export class Employees extends React.Component <IEmployeesProps, IEmployeesState> {
  constructor(props: IEmployeesProps) {
    super(props);
    this.state = ({
      users: [],
      errorMessage: '',
      isError: false,
    })
  }

  async componentDidMount() {
    //! Handle this better later
    if (this.props.currentUser === null) {
      return;
    }
    try {
      const users: Array<User> = await getUsers();
      this.setState({users})
    } catch (error) {
      this.setState({
        errorMessage: error.message, 
        isError: true 
      })
    }
  }

  render() {
    return (
      <div className="myPage" id="employeesPage">
        <Row>
          <Col>
            <h1>Employees</h1>
          </Col>
        </Row>
        <Row>
          {/* We sort the users by user id. */}
          {this.state.users
            .sort((user1, user2) => {
              if (user1.userid > user2.userid) return 1;
              if (user1.userid < user2.userid) return -1;
              return 0;
            }).map((user: User, index) => {
              return (
                <Col key={user.userid} md={6}>
                  <UserInfoComponent user={user} index={index % 2}></UserInfoComponent>
                </Col>
              )
            })
          }
        </Row>
      </div>
    )
  }
}

// This should be the employees page which is accessible to the admin role