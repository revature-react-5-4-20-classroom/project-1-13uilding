import React from 'react';
import { User } from '../models/User';

interface IManagerComponentProps {
  currentUser: User;
}

interface IManagerComponentState {
  test: string;
}

export class Manager extends React.Component <IManagerComponentProps, IManagerComponentState> {
  constructor(props: IManagerComponentProps) {
    super(props);
    this.state = {
      test: 'test',
    }
  }
  render() {
    return (
      <div className="myPage" id="managerPage">
        {/* {(this.props.currentUser ? )} */}
        <h1>Manager</h1>
      </div>
    )
  }
}