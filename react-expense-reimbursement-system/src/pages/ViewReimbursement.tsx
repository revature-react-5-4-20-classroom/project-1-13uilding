import React from 'react';
import { ReimbursementCardComponent } from '../components/ReimbursementCardComponent';
import { Reimbursement } from '../models/Reimbursement';
import { User } from '../models/User';
import { Button, Row, Col } from 'reactstrap';
import { getReimbursements, getFinanceManagers } from '../api/ExpenseReimbursementClient';
// This is the admin homepage only accessable to admin

interface IViewReimbursementProps {
  // Add null later
  currentUser: User | null;
}
interface IViewReimbursementState {
  pending: boolean;
  reimbursements: Array<Reimbursement>;
  errorMessage: string;
  isError: boolean;
  resolvers: Array<string>
}

export class ViewReimbursement extends React.Component <IViewReimbursementProps, IViewReimbursementState> {
  constructor(props: IViewReimbursementProps) {
    super(props);
    this.state = {
      pending: true,
      resolvers: [],
      reimbursements: [],
      errorMessage: '',
      isError: false,
    }
  }

  async componentDidMount() {
    //! Handle this better later
    if (this.props.currentUser === null) {
      return;
    }
    try {
      const reimbursements: Array<Reimbursement> = await getReimbursements(this.props.currentUser.userid);
      const resolvers = await getFinanceManagers();
      this.setState({reimbursements, resolvers})
    } catch (error) {
      this.setState({
        errorMessage: error.message, 
        isError: true 
      })
    }
  }

  
  render() {
    const pendingReimbursements = this.state.reimbursements.filter(reimbursement => reimbursement.status === 1);
    const resolvedReimbursements = this.state.reimbursements.filter(reimbursement => reimbursement.status !== 1);
    const displayReimbursements = this.state.pending ? pendingReimbursements : resolvedReimbursements;
    return (
      <div className="myPage" id="viewReimbursementPage">
        <Row>
          <Col>
            <h1>{`${this.state.pending ? "Pending" : "Resolved"}`}</h1>
          </Col>
          <Col xs={2}>
            <Button 
              color={`${this.state.pending ? "primary" : "secondary"}`}
              onClick={() => this.setState({pending: !this.state.pending})}
            >
              {`${this.state.pending ? "Resolved" : "Pending"}`}
            </Button>          
          </Col>
        </Row>

        {/* {this.state.reimbursements.filter(reimbursement => reimbursement.status === 1)} */}
        <Row>
          {displayReimbursements
            .sort((user1, user2) => {
              if (user1.userid > user2.userid) return 1;
              if (user1.userid < user2.userid) return -1;
              return 0;
            }).map((reimbursement: Reimbursement) => {
            return (<Col key={reimbursement.reimbursementid} md={6} className="reimbursementCardColumn">
              <ReimbursementCardComponent 
                role={'cannot'} 
                reimbursement={reimbursement}
                resolverName={reimbursement.resolver === null ? "unknown" : this.state.resolvers[reimbursement.resolver]}
              ></ReimbursementCardComponent>
            </Col>)
          })}
        </Row>
      </div>
    )
  }
}

// This is the view reimbursement page which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role