export function pathToUpperCamel(path: string): string {
  let result: string = path;
  return result.split('-').map((word: string) => stringToTitleCase(word)).join(' ');
}

export function pathToShortName(path: string): string {
  let result: string = path.split('/')[1].split('-')[0];
  return stringToTitleCase(result);
}

const stringToTitleCase = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);