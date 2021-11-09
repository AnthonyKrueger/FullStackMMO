import { Button, Card, TextField, Typography } from "@mui/material"
import { GiAxeSword } from "react-icons/gi"

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

export default function LoginPage() {

    const [userFormData, setUserFormData] = useState({email: '', password: ''})

    const [loginUser] = useMutation(LOGIN_USER)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await loginUser({
            variables: {...userFormData}
          });
          if (!data) {
            throw new Error('Something went wrong!');
          }
          Auth.login(data.login.token);
          window.location.assign('/');
        } catch(err) {
          console.error(err);
        }
      
        setUserFormData({
          email: '',
          password: ''
        });
      };


    return (
        <div className="loginPage">
            <div className="icon">
                <GiAxeSword />
            </div>
            <div className="fsmmoText">
                <Typography variant="h4">FullStackMMO</Typography>
            </div>
            <Card className="loginForm">
                    <TextField
                    fullWidth
                        required
                        id="emailInput"
                        label="Email"
                        variant="outlined"
                        value={userFormData.email}
                        onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                    />
                    <TextField
                    fullWidth
                        required
                        id="passwordInput"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={userFormData.password}
                        onChange={(e) => setUserFormData({...userFormData, password: e.target.value})}
                    />
                    <div>
                        <Button variant="contained" onClick={(e) => handleFormSubmit(e)}>Login</Button>
                    </div>
            </Card>
        </div>
    )
}