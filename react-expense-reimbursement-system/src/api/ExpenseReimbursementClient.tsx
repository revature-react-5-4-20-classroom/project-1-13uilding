import axios from 'axios';
import { User } from '../models/User';
import { Reimbursement } from '../models/Reimbursement';
import { Role } from '../models/Role';
import { FailedLoginError, FailedUserUpdateError, FailedGetReimbursementsError } from '../errors/FailedLoginError';

const ExpenseReimbursementClient = axios.create({
  baseURL: 'http://3.16.109.242:3000',
  withCredentials: true,
});

export async function login(username: string, password: string): Promise<User> {
  try {
    const res = await ExpenseReimbursementClient.post('/login', {username, password});
    const { userid, firstname, lastname, email, role } = res.data;
    return new User(userid, res.data.username, res.data.password, firstname, lastname, email, role);
  } catch (e) {
    console.log(e);
    console.log(e.response);
    if (e.response.status === 401) {
      throw new FailedLoginError('Failed to authenticate', username);
    } else {
      throw e;
    }
  }
}

export async function updateEmployee(user: User): Promise<User> {
  try {
    const res = await ExpenseReimbursementClient.patch('/users', user);
    const { userid, username, password, firstname, lastname, email, role } = res.data;
    return new User(userid, username, password, firstname, lastname, email, role);
  } catch (e) {
    console.log(e);
    console.log(e.response);
    if (e.response.status === 401) {
      throw new FailedUserUpdateError('Failed to update', user.username);
    } else {
      throw e;
    }
  }
}

export async function submitReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
  try {
    const res = await ExpenseReimbursementClient.post('/reimbursements', reimbursement);
    const { reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type } = res.data;
    return new Reimbursement( reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type )
  } catch (e) {
    console.log(e);
    console.log(e.response);
    if (e.response.status === 401) {
      throw new FailedUserUpdateError('Failed to submit reimbursement');
    } else {
      throw e;
    }
  }
}

export async function getReimbursements(authorId: number, status?: number): Promise<Reimbursement[]> {
  try {
    let path = `/reimbursements/status/${status}`;
    if (authorId > 0) path = `/reimbursements/author/${authorId}`;
    console.log(path);
    const res = await ExpenseReimbursementClient.get(path);
    console.log(res.data);
    return res.data.map((reimbursement: Reimbursement) => {
      const { reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type } = reimbursement;
      return new Reimbursement( reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type )
    })
  } catch (e) {
    console.log(e);
    console.log(e.response);
    if (e.response.status === 401) {
      throw new FailedGetReimbursementsError('Failed to get reimbursements');
    } else {
      throw e;
    }
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await ExpenseReimbursementClient.get('/users');
    return res.data.map((user: User) => {
      const { userid, username, password, firstname, lastname, email, role } = user;
      return new User(userid, username, password, firstname, lastname, email, role);
    })
  } catch (e) {
    console.log(e);
    console.log(e.response);
    if (e.response.status === 401) {
      throw new FailedGetReimbursementsError('Failed to get reimbursements');
    } else {
      throw e;
    }    
  }
}