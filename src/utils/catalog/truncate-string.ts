const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export default truncateString;
