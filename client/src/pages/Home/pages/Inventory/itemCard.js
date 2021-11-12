import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react"

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
        <Grid item lg={2} md={3} xs={4}>
        <Card>
            <CardHeader
                title={item.item.name}
                subheader={`Level ${item.item.level} ${item.item.type}`}
            />
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item.item.stat}</Typography>
                <MenuIcon
                sx={{"&:hover": {
                    cursor: "pointer"
                }}}
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                />
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
            </CardContent>
        </Card>
    </Grid>
    )
}