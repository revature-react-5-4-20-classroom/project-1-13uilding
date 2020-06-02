export function pathToUpperCamel(path: string): string {
  let result: string | string[] = path;
  return result.split('-').map((word: string) => stringToTitleCase(word)).join(' ');
}

const stringToTitleCase = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);