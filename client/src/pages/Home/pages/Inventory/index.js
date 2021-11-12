import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import { SET_USER_DATA } from '../../../../utils/actions';

import { GET_USER } from "../../../../utils/queries"

import Auth from "../../../../utils/auth";

import ItemCard from "./itemCard";

export default function Inventory() {

    const queryVariable = Auth.getProfile()?.data.id

    const { data } = useQuery(GET_USER, {
        variables: { id: queryVariable },
        fetchPolicy: "cache-and-network"
    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: SET_USER_DATA, user: data?.user })
    }, [data, dispatch])

    const itemState = useSelector(state => {
        return state.useritems;
    });

    return (
        <Box sx={{ paddingX: {sm: 0, lg:10} }}>
            <Grid container spacing={2}>
                {itemState !== undefined ?
                    itemState.map(item => {
                        return (
                            <ItemCard item={item} />
                        )
                    })
                    : null}
            </Grid>
        </Box>
    )
}