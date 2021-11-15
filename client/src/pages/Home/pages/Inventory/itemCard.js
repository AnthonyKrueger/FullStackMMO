import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react"
import CoinIcon from '@mui/icons-material/MonetizationOn'

import { useMutation } from '@apollo/client';
import { SELL_ITEM } from '../../../../utils/mutations';

import { useDispatch } from "react-redux";
import { SET_USER_DATA } from '../../../../utils/actions';

import {GiBroadsword} from "react-icons/gi"
import { Box } from "@mui/system";

export default function ItemCard({item}) {

    const [sellItem] = useMutation(SELL_ITEM)

    const token = localStorage.getItem("id_token")

    const dispatch = useDispatch()

    const handleSellClick = async(event) => {
        event.preventDefault()
        handleClose()
        const { data } = await sellItem({
            variables: {
                token: token,
                userItemId: item.id,
                quantity: 1
            }
        })
        if (!data) {
            throw new Error('Something went wrong!');
          }
          dispatch({type: SET_USER_DATA, user: data.sellItem})

    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <Grid item xl={2} lg={3} md={4} sm={12} xs={6}>
        <Card sx={{backgroundColor: "#c2c2c2"}}>
            <CardHeader
                title={item.item.name}
                subheader={`Level ${item.item.level} ${item.item.type}`}
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
                <Typography>{item.item.stat}</Typography>
                <Typography>{item.item.value}<CoinIcon sx={{color: "yellow", fontSize: 17}} /></Typography>
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
                    <MenuItem onClick={handleSellClick}>Sell</MenuItem>
                    <MenuItem onClick={handleClose}>Trash</MenuItem>
                    <MenuItem onClick={handleClose}>Gift</MenuItem>
                </Menu>
            </Box>
            </CardContent>
        </Card>
    </Grid>
    )
}