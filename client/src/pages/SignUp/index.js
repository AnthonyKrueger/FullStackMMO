import { Button, Card, TextField, Typography } from "@mui/material"
import { GiAxeSword } from "react-icons/gi"

export default function SignUp() {
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
                    />
                    <TextField
                    fullWidth
                        required
                        id="usernameInput"
                        label="Username"
                        variant="outlined"
                    />
                    <TextField
                    fullWidth
                        required
                        id="passwordInput"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                    <TextField
                    fullWidth
                        required
                        id="confirmPasswordInput"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                    />
                    <div>
                        <Button variant="contained">Register</Button>
                    </div>
            </Card>
        </div>
    )
}