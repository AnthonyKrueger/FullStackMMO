import { Box } from "@mui/system";
import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import { SET_USER_DATA } from '../../../../utils/actions';

import { GET_USER } from "../../../../utils/queries"

import Auth from "../../../../utils/auth";

import ItemList from "./itemList"
import { Card, Typography } from "@mui/material";

export default function Inventory() {

    const queryVariable = Auth.getProfile()?.data.id

    const { data, refetch } = useQuery(GET_USER, {
        variables: { id: queryVariable },
        fetchPolicy: "cache-and-network"
    });

    const dispatch = useDispatch();

    const itemState = useSelector(state => {
        return state.useritems;
    });

    React.useEffect(() => {
        dispatch({ type: SET_USER_DATA, user: data?.user })
    }, [data, dispatch])

    React.useEffect(() => {
        refetch()
    }, [itemState, refetch])


    return (
        <Box>
            <Card sx={{  paddingY: 1, marginBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                <Typography variant="h3" sx={{ textAlign: "center" }}>Inventory</Typography>
            </Card>
            <Card sx={{ paddingX: { xs: 1, lg: 5 }, paddingY: 2}}>
                {itemState !== undefined ?
                    <ItemList items={itemState} />
                    : null}
            </Card>
        </Box>
    )
}