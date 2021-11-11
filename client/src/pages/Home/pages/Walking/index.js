import { useMutation } from "@apollo/client";
import { Button, Card, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TAKE_STEP } from "../../../../utils/mutations";
import { SET_USER_DATA } from "../../../../utils/actions";
import React from "react"
import { useSelector, useDispatch } from "react-redux";

export default function Walking({userData, loading, setData}) {

    const state = useSelector(state => {
        return state;
      });

    const dispatch = useDispatch();

    const [takeStep] = useMutation(TAKE_STEP)

    const token = localStorage.getItem("id_token")

    async function stepClick() {
        const { data } = await takeStep({
            variables: {token: token}
        })
        dispatch({type: SET_USER_DATA, user: data.takeStep})
    }

    function StepCounter({steps}) {
        return(
            <Typography variant="p">Total Steps: {steps}</Typography>
        )
    }

    return (
        <div>
            {loading ? <p>Loading...</p> : 
            <Card sx={{ padding: 2, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                <Box sx={{ paddingBottom: 1 }}>
                    <Typography variant="h3">Walking</Typography>
                </Box>
                <Box sx={{ paddingBottom: 5 }}>
                    <StepCounter steps={state?.steps} />
                </Box>
                <Box sx={{ height: 200, width: "90%", backgroundColor: "gray", borderRadius: 3 }}>
                    <p>Walking Here</p>
                </Box>
                <Box>
                    <Button variant="contained" onClick={() => stepClick()} sx={{paddingX: 5, marginBottom: 1, paddingY: 2, marginTop: 4}}>Take A Step</Button>
                    <LinearProgress />
                </Box>
            </Card>
            }
        </div>
    )
}