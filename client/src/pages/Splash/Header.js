import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import {GiAxeSword} from "react-icons/gi"

export default function Header() {
    return(
        <div className="header">
            <GiAxeSword />
            <div>
            <Stack spacing={2} direction="row" className="buttonStack">
            <Link to="/signup">
                <Button variant="contained">Register</Button>
            </Link>
            <Link to="/login">
                <Button variant="outlined">Login</Button>
            </Link>
            </Stack>

            </div>
        </div>
    )
}