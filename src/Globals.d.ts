declare module '*.module.css' {
  type ClassNames = {
    [className: string]: string;
  };
  const classNames: ClassNames;
  export = classNames;
}

declare module '*.module.scss' {
  type ClassNames = {
    [className: string]: string;
  };
  const classNames: ClassNames;
  export = classNames;
}
