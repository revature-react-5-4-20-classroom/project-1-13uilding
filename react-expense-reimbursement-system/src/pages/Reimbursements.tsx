import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Row, Col, Button, ButtonGroup } from 'reactstrap';
import { ReimbursementCardComponent } from '../components/ReimbursementCardComponent';
import { getReimbursements } from '../api/ExpenseReimbursementClient';
// This is the admin homepage only accessable to admin

interface IReimbursementsProps {
  // Add null later
  currentUser: User | null;
}
interface IReimbursementsState {
  clickedButtonsArr: number[];
  pendingReimbursements: Array<Reimbursement>;
  approvedReimbursements: Array<Reimbursement>;
  deniedReimbursements: Array<Reimbursement>;
  displayReimbursements: Array<Reimbursement>;
  errorMessage: string;
  isError: boolean;
}


export class Reimbursements extends React.Component <IReimbursementsProps, IReimbursementsState> {
  constructor(props: IReimbursementsProps) {
    super(props);
    this.state = {
      clickedButtonsArr: [],
      pendingReimbursements: [],
      approvedReimbursements: [],
      deniedReimbursements: [],
      displayReimbursements: [],
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
      const pendingReimbursements: Array<Reimbursement> = await getReimbursements(0, 1);
      const approvedReimbursements: Array<Reimbursement> = await getReimbursements(0, 2);
      const deniedReimbursements: Array<Reimbursement> = await getReimbursements(0, 3);
      this.setState({ pendingReimbursements, approvedReimbursements, deniedReimbursements })
    } catch (error) {
      this.setState({
        errorMessage: error.message, 
        isError: true 
      })
    }
  }

  onCheckboxBtnClick(selected: number) {
    const clickedButtonsArr = this.state.clickedButtonsArr;
    const index = clickedButtonsArr.indexOf(selected);
    if (index < 0) {
      clickedButtonsArr.push(selected);
    } else {
      clickedButtonsArr.splice(index, 1);
    }
    this.setState({
      clickedButtonsArr, 
      displayReimbursements: this.createDisplayArray(),
    });
  }

  determineHeader(): string {
    let result = '';
    if (this.state.clickedButtonsArr.length === 0) return ' None'; 
    if (this.state.clickedButtonsArr.includes(1)) result += ' Pending'; 
    if (this.state.clickedButtonsArr.includes(2)) {
      if (result) {
        result += ' &';
      }
      result += ' Approved';
    }
    if (this.state.clickedButtonsArr.includes(4)) {
      if (result) {
        result += ' &';
      }
      result += ' Denied';
    }
    return result;
  }

  createDisplayArray(): Reimbursement[] {
    let result: Reimbursement[] = [];
    if (this.state.clickedButtonsArr.includes(1)) result = [...result, ...this.state.pendingReimbursements];
    if (this.state.clickedButtonsArr.includes(2)) result = [...result, ...this.state.approvedReimbursements];
    if (this.state.clickedButtonsArr.includes(4)) result = [...result, ...this.state.deniedReimbursements];
    console.log(result);
    return result;
  }

  
  render() {
    return (
      <div className="myPage" id="viewReimbursementPage">

        <h1>{`Displaying:`}</h1>
        <h3>{this.determineHeader()}</h3>


        <ButtonGroup>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.clickedButtonsArr.includes(1)}>Pending</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.clickedButtonsArr.includes(2)}>Approved</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(4)} active={this.state.clickedButtonsArr.includes(4)}>Denied</Button>
        </ButtonGroup>     



        {/* {this.state.reimbursements.filter(reimbursement => reimbursement.status === 1)} */}
        <Row>
          {this.state.displayReimbursements
            .sort((user1, user2) => {
              if (user1.userid > user2.userid) return 1;
              if (user1.userid < user2.userid) return -1;
              return 0;
            }).map((reimbursement: Reimbursement) => {
            return (<Col key={reimbursement.reimbursementid} md={6} className="reimbursementCardColumn">
              <ReimbursementCardComponent reimbursement={reimbursement}></ReimbursementCardComponent>
            </Col>)
          })}
        </Row>
      </div>
    )
  }
}
// This is the reimbursements page accessible to the financial manager