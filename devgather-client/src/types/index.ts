import { SVGProps } from "react";

import { authClient } from "../lib/auth-client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Session = typeof authClient.$Infer.Session;
