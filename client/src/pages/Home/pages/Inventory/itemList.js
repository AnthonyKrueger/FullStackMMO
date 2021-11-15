import { Grid } from "@mui/material";
import ItemCard from "./itemCard";

export default function ItemList({items}) {

    return(
        <Grid container spacing={2}>
            {items.length ? 
            items.map(item => {
                return(
                    <ItemCard item={item} />
                )
            }) : null}

        </Grid>
    )
}