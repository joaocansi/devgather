import { SVGProps } from "react";

import { authClient } from "../shared/lib/auth-client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Session = typeof authClient.$Infer.Session;

export type Community = {
  name: string;
  description: string;
  image: string;
  owner: {
    name: string;
    image: string;
  };
  tags: string[];
};
