import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const poolData = {
    UserPoolId: "ap-south-1_MGgtbWenz",
    ClientId: "539192hn5esf9nbe9m4fgshf4h",
  };
  const userPool = new CognitoUserPool(poolData);

  useEffect(() => {
    const user = userPool.getCurrentUser();
    user?.getSession((err, session) => {
      if (err) {
        setIsAuthenticated(false);
      } else {
        if (session.isValid()) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    const user = userPool.getCurrentUser();
    const userData = {
        Username: user.username,
        Pool: userPool,
      };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgetDevice({
        onSuccess: function (result) {
             console.log('call result: ' + JSON.stringify(result));
         },

         onFailure: function(err) {
             alert(err);
         }
    });
    user.signOut()
    navigate('/login');
  }

  const handleClick = () => {
    const user = userPool.getCurrentUser();
    user.getSession((err, session)=> {
        if(err) return;

        let axiosConfig = {
            headers: {
                'Authorization': session.getIdToken().getJwtToken(),
            }
          };
    
        axios.post('https://zlqa2ld418.execute-api.ap-south-1.amazonaws.com/dev/', {
            "address": "Test Institute Address",
            "area": "Test Institute Area",
            "branches": [
              {
                "address": "Test Branch Address 1",
                "area": "Test Branch Area 1",
                "batches": [
                  {
                    "course_ids": [
                      "TestCourseId1",
                      "TestCourseId2",
                      "TestCourseId3"
                    ],
                    "end_date": "2023-12-28",
                    "end_time": "24:00",
                    "id": "branchId1",
                    "name": "Neet Branch",
                    "start_date": "2020-02-13",
                    "start_time": "00:00",
                    "status": "active",
                    "student_limit": 100
                  },
                  {
                    "course_ids": [
                      "TestCourseId1",
                      "TestCourseId4"
                    ],
                    "end_date": "2023-11-04",
                    "end_time": "24:00",
                    "id": "branchId2",
                    "name": "JEE Branch",
                    "start_date": "2021-06-24",
                    "start_time": "00:00",
                    "status": "active",
                    "student_limit": 150
                  }
                ],
                "city": "Test Branch City 1",
                "contact_no": "0123456789",
                "course_ids": [
                  "TestCourseId1",
                  "TestCourseId2",
                  "TestCourseId3",
                  "TestCourseId4"
                ],
                "email": "testbranch1@mail.com",
                "expiry_date": "2024-01-08",
                "id": "testbranchId1",
                "logo": "branch/001.png",
                "name": "Test Branch 1",
                "nonteacher_limit": 400,
                "pincode": "123456",
                "question_limit": 100000,
                "state": "Test Branch State 1",
                "status": "active",
                "teacher_limit": 300,
                "student_limit": 2000
              },
              {
                "address": "Test Branch Address 2",
                "area": "Test Branch Area 2",
                "batches": [
                  {
                    "course_ids": [
                      "TestCourseId2",
                      "TestCourseId4"
                    ],
                    "end_date": "2023-11-04",
                    "end_time": "24:00",
                    "id": "branchId2",
                    "name": "JEE Branch",
                    "start_date": "2021-06-24",
                    "start_time": "00:00",
                    "status": "active",
                    "student_limit": 150
                  }
                ],
                "city": "Test Branch City 2",
                "contact_no": "1123456789",
                "course_ids": [
                  "TestCourseId2",
                  "TestCourseId3",
                  "TestCourseId4"
                ],
                "email": "testbranch2@mail.com",
                "expiry_date": "2024-01-08",
                "id": "testbranchId2",
                "logo": "branch/002.png",
                "name": "Test Branch 2",
                "nonteacher_limit": 500,
                "pincode": "123457",
                "question_limit": 300000,
                "state": "Test Branch State 2",
                "status": "inactive",
                "teacher_limit": 500,
                "student_limit": 5000
              }
            ],
            "city": "Test Institute City",
            "code": "Ins1",
            "contact_no": "2123456789",
            "country": "Test Country",
            "course_ids": [
              "TestCourseId1",
              "TestCourseId2",
              "TestCourseId3",
              "TestCourseId4",
              "TestCourseId5"
            ],
            "email": "testIns@mail.com",
            "expiry_date": "2024-01-08",
            "logo": "institute/001.png",
            "name": "Test Institute",
            "nonteacher_limit": 4000,
            "pincode": "623456",
            "question_limit": 600000,
            "state": "Test State",
            "status": "active",
            "teacher_limit": 5000,
            "student_limit": 10000
          }, axiosConfig)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    })
  }

  return (
    <div>
      {isAuthenticated
        ? <>
            <p>User Successfully Authenticated! </p>
            <button onClick={handleClick}>Post Institute API call</button>
            <button onClick={handleLogout}>Logout</button>
        </>
        : "Please Login to continue!"}
    </div>
  );
};

export default Home;
