import React from 'react';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Row, Col, Button, ButtonGroup, FormGroup, Label, Input, Form } from 'reactstrap';
import { ReimbursementCardComponent } from '../components/ReimbursementCardComponent';
import { getReimbursements, patchReimbursement, getFinanceManagers } from '../api/ExpenseReimbursementClient';
import moment from 'moment';
// This is the admin homepage only accessable to admin

interface IReimbursementsProps {
  // Add null later
  currentUser: User | null;
}
interface IReimbursementsState {
  [k: string]: any;
  clickedButtonsArr: number[];
  pendingReimbursements: Array<Reimbursement>;
  approvedReimbursements: Array<Reimbursement>;
  deniedReimbursements: Array<Reimbursement>;
  displayReimbursements: Array<Reimbursement>;
  resolvers: Array<string>;
  authorid: number | string;
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
      resolvers: [],
      authorid: '',
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
      const resolvers = await getFinanceManagers();
      this.setState({ pendingReimbursements, approvedReimbursements, deniedReimbursements, resolvers })
    } catch (error) {
      this.setState({
        errorMessage: error.message, 
        isError: true 
      })
    }
  }
  //! Revamp later 
  // componentDidUpdate() {
  //   this.state.clickedButtonsArr.forEach( status => {
  //     this.isStateDifferent(status);
  //   })
  // }

  // async isStateDifferent(status: number) {
  //   if (this.state.clickedButtonsArr.includes(status)) {
  //     const dbReimbursements = await getReimbursements(0, status);
  //     console.log("here is the dbReimbursement")
  //     console.log(dbReimbursements)
  //     console.log("here is pending")
  //     console.log(this.state.pendingReimbursements)
  //     let prevReimbursements: Reimbursement[];
  //     switch (status) {
  //       case 1:
  //         prevReimbursements = this.state.pendingReimbursements;
  //         break;
  //       case 2:
  //         prevReimbursements = this.state.approvedReimbursements;
  //         break;
  //       default:
  //       case 3:
  //         prevReimbursements = this.state.deniedReimbursements;
  //         break;
  //     }
  //     if (prevReimbursements !== dbReimbursements) {
  //       console.log('Should render')
  //       // this.setState({ pendingReimbursements });
  //     };
  //   }
  // }
  //!

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
    if (this.state.clickedButtonsArr.includes(3)) {
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
    if (this.state.clickedButtonsArr.includes(3)) result = [...result, ...this.state.deniedReimbursements];
    if (this.state.authorid !== null) {
      if (this.state.authorid > 0) {
        result = result.filter((reimbursement: Reimbursement) => reimbursement.author == this.state.authorid);
      }
    }
    return result;
  }
  
  attemptPatch = async (e: any) => {
    e.preventDefault();
    let status = e.currentTarget.value;
    let resolver = (this.props.currentUser !== null ? this.props.currentUser.userid : -1);
    let reimbursementid = e.currentTarget.name;
    let today: any = moment();
    let dateresolved = today.format('MMMM D HH:mm:ss YYYY ');
    dateresolved += /[A-Z]{3}/.exec(today);
    try {
      const patchedReimbursement: any = await patchReimbursement({status, resolver, reimbursementid, dateresolved}); 
      console.log(patchReimbursement);
      const pendingReimbursements: Array<Reimbursement> = await getReimbursements(0, 1);
      const approvedReimbursements: Array<Reimbursement> = await getReimbursements(0, 2);
      const deniedReimbursements: Array<Reimbursement> = await getReimbursements(0, 3);
      this.setState({ pendingReimbursements, approvedReimbursements, deniedReimbursements});
      this.setState({ displayReimbursements: this.createDisplayArray() });
    } catch (error) {
      this.setState({ 
        errorMessage: error.message, 
        isError: true 
      })
    }
  }
  
  attemptUpdate = (e:any) => {
    e.preventDefault();
    this.setState({displayReimbursements: this.createDisplayArray()});
  }

  filterReimbursementsByUser = (e: any) => {
    let { name, value } = e.currentTarget;
    this.setState({[name]: value});
  }
  
  render() {
    return (
      <div className="myPage" id="viewReimbursementPage">
        {this.props.currentUser === null ? '' :
        <>
          <h1>{`Displaying:`}</h1>
          <h3>{this.determineHeader()}</h3>
          <Row>
            <Col>
              <Form onSubmit={this.attemptUpdate}>
                <FormGroup>
                  <Label for="authorid">Author Id</Label>
                  <Input onChange={this.filterReimbursementsByUser} value={this.state.authorid} type="number" name="authorid" id="authorid" placeholder="leave 0 or less to view all reimbursements" />
                </FormGroup>
              </Form>
            </Col>
            <Col>
              <ButtonGroup>
                <Button color="primary" size='lg' onClick={() => this.onCheckboxBtnClick(1)} active={this.state.clickedButtonsArr.includes(1)}>Pending</Button>
                <Button color="primary" size='lg' onClick={() => this.onCheckboxBtnClick(2)} active={this.state.clickedButtonsArr.includes(2)}>Approved</Button>
                <Button color="primary" size='lg' onClick={() => this.onCheckboxBtnClick(3)} active={this.state.clickedButtonsArr.includes(4)}>Denied</Button>
              </ButtonGroup>     
            </Col>            
          </Row>



          {/* {this.state.reimbursements.filter(reimbursement => reimbursement.status === 1)} */}
          <Row>
            {this.state.displayReimbursements
              .sort((user1, user2) => {
                if (user1.userid > user2.userid) return 1;
                if (user1.userid < user2.userid) return -1;
                return 0;
              }).map((reimbursement: Reimbursement) => {
              return (<Col key={reimbursement.reimbursementid} md={6} className="reimbursementCardColumn">
                <ReimbursementCardComponent 
                  role={'finance-manager'} 
                  reimbursement={reimbursement}
                  resolverName={reimbursement.resolver === null ? "unknown" : this.state.resolvers[reimbursement.resolver]}
                  onClick={this.attemptPatch}
                ></ReimbursementCardComponent>
              </Col>)
            })}
          </Row>
        </>}
      </div>
    )
  }
}
// This is the reimbursements page accessible to the financial manager