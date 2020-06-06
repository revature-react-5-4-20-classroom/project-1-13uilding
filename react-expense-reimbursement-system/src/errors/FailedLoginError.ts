
export class FailedLoginError extends Error {
  username: string | undefined;

  constructor(message?:string, username?:string) {
    super(message);
    this.username = username;
  }
}

export class FailedUserUpdateError extends Error {
  username: string | undefined;

  constructor(message?:string, username?:string) {
    super(message);
    this.username = username;
  }
}

export class FailedSubmitReimbursementError extends Error {
  constructor(message?: string) {
    super(message);
  }
}