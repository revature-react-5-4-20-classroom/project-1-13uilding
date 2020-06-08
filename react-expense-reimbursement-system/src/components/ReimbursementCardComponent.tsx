import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import moment from 'moment';
import { Reimbursement } from '../models/Reimbursement';


interface ReimbursementCardComponentProps {
  reimbursement: Reimbursement;
  role: string;
  resolverName: string;
  onClick?: (e: any) => void;
}

// pending: boolean;
//   amount: number;
//   datesubmitted: string;
//   dateresolved:
export class ReimbursementCardComponent extends React.Component<ReimbursementCardComponentProps> {
  render() {
    const { reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type} = this.props.reimbursement
    const typeArray = ['', 'Travel', 'Food', 'Other', 'Lodging'];
    return (
      <div>
        <Card body outline className={`reimbursementCardOutline ${status === 1 ? 'pending' : status === 2 ? 'approved' : 'denied'}`}>
          <CardTitle 
            style={
              {fontWeight: 'bold',
              borderBottom: '1px solid black'
            }}
          >
            {status === 1 ? 'Pending' : status === 2 ? 'Approved' : 'Denied'}
          </CardTitle>
          <Row>
            <Col>
              Author
            </Col>
            <Col>
              {author}
            </Col>
          </Row>
          <Row>
            <Col>
              Amount
            </Col>
            <Col>
              {amount}
            </Col>
          </Row>
          <Row>
            <Col>
              Type
            </Col>
            <Col>
              {typeArray[type]}
            </Col>
          </Row>
          <Row>
            <Col>
              Description
            </Col>
            <Col>
              {description}
            </Col>
          </Row>
          <Row>
            <Col>
              Date Submitted
            </Col>
            <Col>
              {moment(datesubmitted).format('MM/DD/YYYY')}
            </Col>
          </Row>
          {status !== 1 ? 
            <Row>
              <Col>
                Date Resolved
              </Col>
              <Col>
                {moment(dateresolved).format('MM/DD/YYYY')}
              </Col>
            </Row>
            : <></>
          }
          {status !== 1 ? 
            <Row>
              <Col>
                Resolver
              </Col>
              <Col>
                {this.props.resolverName}
              </Col>
            </Row>
            : <></>
          }
          {this.props.role === 'finance-manager' ? 
            <Row>
              <Col>
                Reimbursement Id
              </Col>
              <Col>
                {reimbursementid}
              </Col>
            </Row>
            : <></>
          }
          {this.props.role === 'finance-manager' ? 
            <Row>
              <Col>
                <Button color="primary" size="sm" name={reimbursementid.toString()} value={2} onClick={this.props.onClick}>Approve</Button>
              </Col>
              <Col>
                <Button color="danger" size="sm" name={reimbursementid.toString()} value={3} onClick={this.props.onClick}>Deny</Button>
              </Col>
            </Row>
            : <></>
          }
        </Card>

      </div>
    );
  }
};

// reimbursementid: number; // primary key
// author: number;  // foreign key -> User; not null
// amount: number;  // not null
// datesubmitted: string; // not null
// dateresolved: string | null; // not null
// description: string; // not null
// resolver: number | null; // foreign key -> User
// status: number; // foreign ey -> ReimbursementStatus, not null
// type: number; // foreign key -> ReimbursementType