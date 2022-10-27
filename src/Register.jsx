import {
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import React, { useState } from "react";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const poolData = {
    UserPoolId: "ap-south-1_MGgtbWenz",
    ClientId: "539192hn5esf9nbe9m4fgshf4h",
  };
  const userPool = new CognitoUserPool(poolData);

  const handleSubmit = (e) => {
    e.preventDefault()
    const attributeList = [];

    const dataEmail = {
      Name: "email",
      Value: values.email,
    };
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(values.username, values.password, attributeList, null, (
        err,
        result
    ) => {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
            type="text"
            value={values?.email}
            name="name"
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            onChange={(e) => {
              setValues({ ...values, username: e.target.value });
            }}
            type="text"
            value={values?.username}
            name="username"
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            onChange={(e) => {
              setValues({ ...values, password: e.target.value });
            }}
            type="password"
            value={values?.password}
            name="password"
          />
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Register;
