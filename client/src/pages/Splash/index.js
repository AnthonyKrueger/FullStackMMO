import { Container, Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { GiAxeSword } from "react-icons/gi"
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Splash() {
    return (
        <div>
            <Header />
            <div className="splashPage">
                <div className="icon">
                    <GiAxeSword />
                </div>
                <div>
                    <Typography variant="h1">
                        FullStackMMO
                    </Typography>
                </div>
                <Container>
                    <Typography variant="p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra vel turpis nunc eget. Commodo quis imperdiet massa tincidunt nunc pulvinar. Et malesuada fames ac turpis egestas sed tempus. Justo eget magna fermentum iaculis. Eget nunc scelerisque viverra mauris in aliquam sem fringilla. Accumsan sit amet nulla facilisi morbi tempus. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Vitae purus faucibus ornare suspendisse. Luctus venenatis lectus magna fringilla urna. Suscipit adipiscing bibendum est ultricies integer quis. Ultricies mi eget mauris pharetra et ultrices neque ornare. Porta lorem mollis aliquam ut porttitor.
                    </Typography>
                </Container>
                <div className="splashButtons">
                <Link to="/signup">
                    <Button variant="contained" size="large">Create an Account</Button>
                </Link>
                    <div className="loginText">
                        <Typography variant="p">Already have an account? <Link to="/login">LOGIN</Link></Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}