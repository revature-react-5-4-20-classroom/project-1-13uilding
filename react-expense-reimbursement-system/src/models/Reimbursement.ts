// The Reimbursement model is used to represent a single reimbursement that an employee would submit

export class Reimbursement {
  [k: string]: any;
  reimbursementid: number; // primary key
	author: number;  // foreign key -> User; not null
	amount: number;  // not null
  datesubmitted: string; // not null
  dateresolved: string | null; // not null
  description: string; // not null
  resolver: number | null; // foreign key -> User
  status: number; // foreign ey -> ReimbursementStatus, not null
  type: number; // foreign key -> ReimbursementType
  constructor(  reimbursementid: number, author: number, amount: number, datesubmitted: string, dateresolved: string | null, description: string, resolver: number | null, status: number, type: number) {
    this.reimbursementid = reimbursementid; 
    this.author = author; 
    this.amount = amount; 
    this.datesubmitted = datesubmitted; 
    this.dateresolved = dateresolved; 
    this.description = description; 
    this.resolver = resolver; 
    this.status = status; 
    this.type = type; 
  }
}