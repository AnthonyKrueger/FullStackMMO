import { Card, CircularProgress, LinearProgress, Typography } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite'
import CoinIcon from '@mui/icons-material/MonetizationOn'
import StrengthIcon from '@mui/icons-material/FitnessCenter'
import EnduranceIcon from '@mui/icons-material/Shield'
import SpeedIcon from '@mui/icons-material/DirectionsRun'
import LevelUpIcon from '@mui/icons-material/ArrowUpward'
import AddIcon from '@mui/icons-material/AddCircle'
import { red, yellow, green, blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

import { useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../../../../utils/actions';

import { useMutation } from '@apollo/client';

import { LEVEL_SKILL } from '../../../../utils/mutations';

export default function Dashboard({ loading }) {

  const state = useSelector(state => {
    return state;
  });

  const dispatch = useDispatch()

  const token = localStorage.getItem("id_token")

  const [levelSkill] = useMutation(LEVEL_SKILL)

  async function skillUp(skill) {
    const { data } = await levelSkill({
      variables: {
        token: token,
        skill: skill
      }
    })
    if(data) {
      dispatch({type: SET_USER_DATA, user: data.levelSkill})
    }
  }

  function SkillAddButton({skill}) {
    return (
          <AddIcon sx={{marginTop: 0.6, marginLeft: 1, color: green[400], "&:hover": {
              cursor: "pointer"
          }}} onClick={() => skillUp(skill)} />
    )
  }

  return (
    <div>

      {loading ? 
        <Box>
      <Card sx={{height: "50vh", marginBottom: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center" }}>
        <CircularProgress size={200}/>
      </Card>
      </Box>
       :
        <Box>
          <Card sx={{
            padding: 2,
            margin: 1
          }}>
            <div>
              <Typography variant="h4">Welcome back, <strong>{state?.username}</strong></Typography>
              <Typography variant="h6">Level {state?.level}</Typography>
              <Typography>Experience: {state?.experience} / {state?.nextLevel}</Typography>
            </div>
          </Card>
          <Card sx={{
            padding: 2,
            margin: 1
          }}>
            <div className="dashboardStats">
              <div>
                <Typography variant="h6"><HeartIcon sx={{ color: red[500], pt: 1 }} /> Health: {state?.health}/{state?.maxhealth}</Typography>
                <LinearProgress variant="determinate" value={(state?.health / state?.maxhealth) * 100} />
              </div>
              <div>
                <Typography variant="h6"><CoinIcon sx={{ color: yellow[500], pt: 1 }} /> Gold: {state?.gold}</Typography>
              </div>
            </div>

          </Card>
          <Card sx={{
            padding: 2,
            margin: 1
          }}>
            <div className="dashboardStats">
              <div>
                <Typography variant="h6"><LevelUpIcon sx={{ color: yellow[700], pt: 1 }} /> LP: {state?.levelPoints}</Typography>
              </div>
              <Box sx={{display: "flex", textAlign: "center"}}>
                <Typography variant="h6"><StrengthIcon sx={{ color: yellow[700], pt: 1 }} /> Strength: {state?.strength}</Typography>
                {state?.levelPoints ? <SkillAddButton skill="strength" /> : null }
              </Box>
              <Box sx={{display: "flex", textAlign: "center"}}>
                <Typography variant="h6"><EnduranceIcon sx={{ color: green[700], pt: 1 }} /> Endurance: {state?.endurance}</Typography>
                {state?.levelPoints ? <SkillAddButton skill="endurance" /> : null }
              </Box>
              <Box sx={{display: "flex", textAlign: "center"}}>
                <Typography variant="h6"><SpeedIcon sx={{ color: blue[700], pt: 1 }} /> Speed: {state?.speed}</Typography>
                {state?.levelPoints ? <SkillAddButton skill="speed" /> : null }
              </Box>
            </div>

          </Card>
        </Box>
      }
    </div>
  )
}