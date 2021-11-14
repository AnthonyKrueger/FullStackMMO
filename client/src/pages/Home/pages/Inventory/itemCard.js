import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react"
import CoinIcon from '@mui/icons-material/MonetizationOn'

import {GiBroadsword} from "react-icons/gi"
import { Box } from "@mui/system";

export default function ItemCard({item}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card>
            <CardHeader
                title={item.name}
                subheader={`Level ${item.level} ${item.type}`}
                action={
                    <MenuIcon
                sx={{"&:hover": {
                    cursor: "pointer"
                }}}
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
                }
            />
            <CardContent>
            <Box sx={{display: "flex", justifyContent: "center", fontSize:{xs: 70, sm: 70, md: 70}, paddingBottom: 5}}>
                <GiBroadsword />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item.stat}</Typography>
                <Typography>{item.value}<CoinIcon sx={{color: "yellow", fontSize: 17}} /></Typography>
                <Typography>x{item.quantity}</Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
                >
                    <MenuItem onClick={handleClose}>Equip</MenuItem>
                    <MenuItem onClick={handleClose}>Sell</MenuItem>
                    <MenuItem onClick={handleClose}>Trash</MenuItem>
                    <MenuItem onClick={handleClose}>Gift</MenuItem>
                </Menu>
            </Box>
            </CardContent>
        </Card>
    </Grid>
    )
}