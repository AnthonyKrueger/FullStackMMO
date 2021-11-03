import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {GiAxeSword} from "react-icons/gi"

export default function Header() {
    return(
        <div className="header">
            <GiAxeSword />
            <div>
            <Stack spacing={2} direction="row" className="buttonStack">
                <Button variant="contained">Register</Button>
                <Button variant="outlined">Login</Button>
            </Stack>

            </div>
        </div>
    )
}