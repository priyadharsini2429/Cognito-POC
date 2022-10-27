import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import React, { useState } from "react";

const ConfirmUser = () => {
  const [values, setValues] = useState({
    username: "",
    code: "",
  });

  const poolData = {
    UserPoolId: "ap-south-1_MGgtbWenz",
    ClientId: "539192hn5esf9nbe9m4fgshf4h",
  };

  const userPool = new CognitoUserPool(poolData);

  const handleSubmit = (e) => {
    e.preventDefault();
    var userData = {
      Username: values.username,
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(values.code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("Confirmation result: " + result);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
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
          Validation Code:
          <input
            onChange={(e) => {
              setValues({ ...values, code: e.target.value });
            }}
            type="text"
            value={values?.code}
            name="code"
          />
        </label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ConfirmUser;
