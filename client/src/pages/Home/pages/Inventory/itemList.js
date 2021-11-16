import { Box, Grid, Typography } from "@mui/material";
import ItemCard from "./itemCard";
import { useDispatch } from "react-redux";

import { SET_USER_DATA } from '../../../../utils/actions';

export default function ItemList({items}) {

    const dispatch = useDispatch()

    function sellDispatch(user) {
        dispatch({type: SET_USER_DATA, user: user});
    } 

    return(
        <Box>
        {items.length ? 
        <Grid container spacing={2}>
            {items.map(item => {
                return(
                    <ItemCard item={item} key={item.id} dispatch={sellDispatch} />
                )
            })}  
        </Grid> :
            <Typography variant="h4" sx={{textAlign: "center", padding: 5}}>You have no Items!</Typography>
            }
        </Box>
    )
}