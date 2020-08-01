import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button class="btn btn-secondary my-2 my-sm-0" onClick={() => logout()}>Log Out</button>;
};

export default LogoutButton;