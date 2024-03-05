import { Link } from "@mui/material";
import React, { ReactNode } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => <RouterLink ref={ref} to="/" {...props} role={undefined} />
);

interface Props {
  children: ReactNode | String;
  to: string;
  variant?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  underline?: "always" | "hover" | "none";
}
function MaterialRouterLink({
  children,
  to,
  variant = "body2",
  underline= "always",
}: Props) {
  return (
    <Link
      variant={variant}
      component={RouterLink}
      to={to}
      underline={underline}
    >
      {children}
    </Link>
  );
}

export default MaterialRouterLink;
