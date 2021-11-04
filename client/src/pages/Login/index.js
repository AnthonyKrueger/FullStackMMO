import { Button, Card, TextField, Typography } from "@mui/material"
import { GiAxeSword } from "react-icons/gi"

export default function LoginPage() {
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
                    />
                    <TextField
                    fullWidth
                        required
                        id="passwordInput"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                    <div>
                        <Button variant="contained">Login</Button>
                    </div>
            </Card>
        </div>
    )
}