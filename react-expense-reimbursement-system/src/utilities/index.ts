export function pathToUpperCamel(path: string): string {
  let result: string | string[] = path;
  result.split('-').map((word: string) => stringToTitleCase(word)).join(' ');
  return result;
}

const stringToTitleCase = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);