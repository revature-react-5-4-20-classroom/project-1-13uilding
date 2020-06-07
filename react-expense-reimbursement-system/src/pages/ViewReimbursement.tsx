import React from 'react';
import { ReimbursementCardComponent } from '../components/ReimbursementCardComponent';
import { Reimbursement } from '../models/Reimbursement';
import { User } from '../models/User';
import { Button } from 'reactstrap';
import { getReimbursement } from '../api/ExpenseReimbursementClient';
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
}

export class ViewReimbursement extends React.Component <IViewReimbursementProps, IViewReimbursementState> {
  constructor(props: IViewReimbursementProps) {
    super(props);
    this.state = {
      pending: true,
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
      const reimbursements: Array<Reimbursement> = await getReimbursement(this.props.currentUser.userid);
      this.setState({reimbursements})
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
        <Button 
          color={`${this.state.pending ? "secondary" : "primary"}`}
          onClick={() => this.setState({pending: !this.state.pending})}
        >
          {`${this.state.pending ? "Pending" : "Resolved"}`}
        </Button>
        {/* {this.state.reimbursements.filter(reimbursement => reimbursement.status === 1)} */}
        {displayReimbursements.map((reimbursement: Reimbursement) => {
          return <ReimbursementCardComponent reimbursement={reimbursement}></ReimbursementCardComponent>
        })}
        <h1>ViewReimbursement 
        - An Employee can view their pending reimbursement requests
        - An Employee can view their resolved reimbursement requests</h1>
      </div>
    )
  }
}

// This is the view reimbursement page which is accessible to everyone who is logged in
// I believe I want to store this page in a burger for the admin and financial manager role