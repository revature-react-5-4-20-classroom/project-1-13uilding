import { User } from "../models/User";

export function pathToUpperCamel(path: string): string {
  let result: string = path;
  return result.split('-').map((word: string) => stringToTitleCase(word)).join(' ');
}

export function pathToShortName(path: string): string {
  let result: string = path.split('-')[0];
  return stringToTitleCase(result);
}

const stringToTitleCase = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export function isNotAdmin(user: User | null): boolean {
  if (user !== null) {
    if (user.role.role === 'finance-manager' || user.role.role === 'admin') {
      return false;
    }
  }
  return true;
}

export function getRoleString(roleid: number): string {
  // These roles correspond to my DB
  const roles = ['', '', '', '', '', 'finance-manager', 'manager', 'sales', 'admin', 'secretary'];
  return roles[roleid];
}