declare module "*.svg" {
  const content: string;
  export default content; // 'default'로 export
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export {ReactComponent};
}

declare module "*.png" {
  const value : string;
  export default value;
}