import { RouteComponentProps } from "@reach/router";
import React, { FunctionComponent } from "react";
import { login } from "../auth/utils";
import "../styles.scss";

const LoginPage: FunctionComponent<RouteComponentProps> = () => {
  return (
    <fieldset>
      <legend>LOGIN</legend>
      <label>
        Email:
        <br />
        <input type="text" id="email" required={true} />
      </label>
      <br />
      <label>
        Password:
        <br />
        <input type="password" id="password" required={true} />
      </label>
      <br />
      <input
        type="submit"
        name="Login"
        value="Login"
        onClick={() => {
          const email = (document.getElementById("email") as HTMLInputElement)
            .value;
          const password = (document.getElementById(
            "password"
          ) as HTMLInputElement).value;
          email && password ? login(email, password) : null;
        }}
      />
    </fieldset>
  );
};

export default LoginPage;
