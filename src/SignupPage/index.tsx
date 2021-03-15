import { RouteComponentProps, navigate } from "@reach/router";
import React, { FunctionComponent } from "react";
import { signup, _doAuthentication } from "../auth/utils";

const onClickSignup = () => {
  const firstName = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  const lastName = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  signup(firstName, lastName, email, username, password);
  navigate("/");
};

const SignupPage: FunctionComponent<RouteComponentProps> = () => (
  <fieldset>
    <legend>Signup</legend>
    <label>
      First Name:
      <br />
      <input type="text" id="firstName" required={true} />
    </label>
    <br />
    <label>
      Last Name:
      <br />
      <input type="text" id="lastName" required={true} />
    </label>
    <br />
    <label>
      Email:
      <br />
      <input type="email" id="email" required={true} />
    </label>
    <br />
    <label>
      Username:
      <br />
      <input type="text" id="username" required={true} />
    </label>
    <br />
    <label>
      Password:
      <br />
      <input id="password" type="password" required={true} />
    </label>
    <br />
    <input
      type="submit"
      name="submitSignup"
      value="Submit"
      onClick={() => onClickSignup()}
    />
  </fieldset>
);

export default SignupPage;
