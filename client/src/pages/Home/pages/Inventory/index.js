import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

import ItemList from "./itemList"
import { Card, CircularProgress, Typography } from "@mui/material";

export default function Inventory({loading}) {

    const itemState = useSelector(state => {
        return state.useritems;
    });

    return (
        <Box>
            <Card sx={{ paddingY: 1, marginBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                <Typography variant="h3" sx={{ textAlign: "center" }}>Inventory</Typography>
            </Card>
            {loading ?
                <Box>
                    <Card sx={{ height: "50vh", marginBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                        <CircularProgress size={200} />
                    </Card>
                </Box>
                :
                <Card sx={{ paddingX: { xs: 1, lg: 5 }, paddingY: 2 }}>
                    {itemState !== undefined ?
                        <ItemList items={itemState} />
                        : null}
                </Card>
            }
        </Box>
    )
}