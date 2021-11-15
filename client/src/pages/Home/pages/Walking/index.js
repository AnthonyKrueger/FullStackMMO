import { useMutation } from "@apollo/client";
import { Button, Card, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TAKE_STEP } from "../../../../utils/mutations";
import { TAKE_STEP_ACTION } from "../../../../utils/actions";
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";

export default function Walking({loading}) {

    const state = useSelector(state => {
        return state;
      });

    const [countDown, setCountDown] = useState(100)

    const [buttonState, setButtonState] = useState(false)

    const [expText, setExpText] = useState(0)

    const [levelText, setLevelText] = useState("")

    const [goldText, setGoldText] = useState(0)

    const [itemText, setItemText] = useState("")

    const dispatch = useDispatch();

    const [takeStep] = useMutation(TAKE_STEP)

    const token = localStorage.getItem("id_token")

    useEffect(() => {
        let myInterval = setInterval(() => {
            if(countDown < 100) {
                setCountDown(countDown + 2.88)
            }
            else {
                setButtonState(false)
                clearInterval(myInterval)
            }
        }, 100)
        return () => {
            clearInterval(myInterval)
        }
    }, [countDown])

    async function stepClick() {
        console.log(state)
        const { data } = await takeStep({
            variables: {token: token}
        })

        if(data.takeStep.item) {
            setItemText(data.takeStep.item)
        }
        else {
            setItemText("")
        }
        
        if(data.takeStep.gold !== state.gold) {
            setGoldText(`${data.takeStep.gold - state.gold}`)
        }
        else {
            setGoldText(null)
        }

        if((data.takeStep.experience - state.experience) < 0) {
            setLevelText(`${data.takeStep.level}`)
            setExpText(`${data.takeStep.experience - state.experience + state.nextLevel}`)
        }
        else if (data.takeStep.experience - state.experience !== 0) {
            setLevelText("")
            setExpText(`${data.takeStep.experience - state.experience}`)
        }
        else {
            setLevelText("")
            setExpText(null)
        }

        if(data.takeStep.message !== "You Must Wait to Take A Step!") {
            setCountDown(0);
            setButtonState(true);
        }
        dispatch({type: TAKE_STEP_ACTION, gold: data.takeStep.gold, nextLevel: data.takeStep.nextLevel, experience: data.takeStep.experience, level: data.takeStep.level, levelPoints: data.takeStep.levelPoints, stepMessage: data.takeStep.message})
    }

    function StepCounter({steps}) {
        return(
            <Typography variant="p">Total Steps: {steps}</Typography>
        )
    }

    return (
        <div>
            {loading ? <p>Loading...</p> : 
            <Box>
            <Card sx={{ paddingY: 1, marginBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center"}}>
                <Box sx={{ paddingBottom: 1 }}>
                    <Typography variant="h3">Walking</Typography>
                </Box>
                <Box>
                    <StepCounter steps={state?.steps} />
                </Box>
            </Card>
            <Card sx={{ padding: 2, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
                <Box sx={{ height: 200, width: {xs: "90%", sm: "90%", md: "70%", lg: "50%"}, backgroundColor: "#c2c2c2", borderRadius: 3 }}>
                    <Typography sx={{paddingY: 5}}>{state?.stepMessage}</Typography>
                    {levelText ? 
                    <Typography sx={{fontWeight: "bold"}}>You reached level {levelText}!</Typography> 
                    : null}
                    {expText ? 
                    <Typography>+{expText} <span className="expText">XP</span></Typography> 
                    : null}
                    {goldText ? 
                    <div>
                    <Typography>+{goldText} <span className="goldText">Gold</span></Typography> 
                    </div>
                    : null}
                    {itemText ? 
                    <Typography>You found a <strong>{itemText}</strong></Typography> 
                    : null}
                </Box>
                <Box>
                    <Button variant="contained" disabled={buttonState} onClick={() => stepClick()} sx={{paddingX: 5, marginBottom: 1, paddingY: 2, marginTop: 4}}>Take A Step</Button>
                    <LinearProgress variant="determinate" value={countDown} />
                </Box>
            </Card>
            </Box>
            }
        </div>
    )
}