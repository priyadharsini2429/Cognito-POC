import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
      });
    
      const poolData = {
        UserPoolId: "ap-south-1_MGgtbWenz",
        ClientId: "539192hn5esf9nbe9m4fgshf4h",
      };
    
      const userPool = new CognitoUserPool(poolData);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const authenticationData = {
            Username: values.username,
            Password: values.password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );
        var userData = {
            Username: values.username,
            Pool: userPool,
          };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log("accessToken", accessToken)
                console.log("result", result)
                cognitoUser.forgetDevice({
                    onSuccess: function (result) {
                         console.log('call result: ' + JSON.stringify(result));
                         cognitoUser.listDevices(10, null, {
                            onSuccess: function (result) {
                                console.log('Devices: ' + result.Devices.map(device => console.log(JSON.stringify(device))));
                                
                             },
                    
                            onFailure: function(err) {
                                alert(err);
                            }
                        });
                     },
            
                     onFailure: function(err) {
                         alert(err);
                     }
                });
                

                
            
                navigate('/');

            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
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
              Password:
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
}

export default Login