export type MatchingObject = {
  [key: string]: string;
};

export interface IMatch {
  match: {
    params: {
      categoryId: string;
    };
    pathname: string;
    pathnameBase: string;
    pattern: object;
    route: object;
  };
}
