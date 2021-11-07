import { Alert, Button, Card, TextField, Typography } from "@mui/material"
import { GiAxeSword } from "react-icons/gi"

import { CREATE_USER } from "../../utils/mutations"
import {useState} from 'react'
import { useMutation } from "@apollo/client";

import Auth from "../../utils/auth"

export default function SignUp() {
    
    const [formData, setFormData] = useState({email: "", username: "", password: "", confirm: ""});
    const [alert, setAlert] = useState({shown: false, text: ""})
    const [createUser] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(formData.password === formData.confirm) {
        try {
          const { data } = await createUser({
            variables: {email: formData.email, username: formData.username, password: formData.password}
          });
    
          if (!data) {
            throw new Error('something went wrong!');
          }
          Auth.login(data.addUser.token);
          window.location.assign('/home');
        } catch (err) {
          setAlert({shown: true, text: err})
        }
    
        setFormData({
          username: '',
          email: '',
          password: '',
          confirm: ''
        });
      }
      else {
        setAlert({shown: true, text: "Password and Confirmation must Match!"})
      }
    }

    return (
        <div className="signupPage">
            <div className="icon">
                <GiAxeSword />
            </div>
            <div className="fsmmoText">
                <Typography variant="h4">FullStackMMO</Typography>
            </div>
            <Card className="signupForm">
                    <TextField
                    fullWidth
                        required
                        id="emailInput"
                        label="Email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <TextField
                    fullWidth
                        required
                        id="usernameInput"
                        label="Username"
                        variant="outlined"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <TextField
                    fullWidth
                        required
                        id="passwordInput"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <TextField
                    fullWidth
                        required
                        id="confirmPasswordInput"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={formData.confirm}
                        onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                    />
                    <div>
                        <Button 
                        variant="contained"
                        onClick={((e) => handleFormSubmit(e))}>
                        Register
                        </Button>
                    </div>
                    {alert.shown ? 
                    <Alert severity="error" onClose={() => setAlert({shown: false, text: ""})}>{alert.text}</Alert>
                    : null}
            </Card>
        </div>
    )
}