import { Card, LinearProgress, Typography } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite'
import CoinIcon from '@mui/icons-material/MonetizationOn'
import StrengthIcon from '@mui/icons-material/FitnessCenter'
import EnduranceIcon from '@mui/icons-material/Shield'
import SpeedIcon from '@mui/icons-material/DirectionsRun'
import { red, yellow, green, blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';

export default function Dashboard({ loading }) {

  const state = useSelector(state => {
    return state;
  });

  return (
    <div>
    {loading ? <p>Loading...</p> :
    
    <div>
      <Card sx={{
        padding: 2,
        margin: 1
      }}>
          <div>
            <Typography variant="h4">Welcome back, {state?.username}</Typography>
            <Typography variant="h6">Level {state?.level}</Typography>
            <Typography>Experience: {state?.experience}</Typography>
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
            <div>
              <Typography variant="h6"><StrengthIcon sx={{ color: yellow[700], pt: 1 }} /> Strength: {state?.strength}</Typography>
            </div>
            <div>
              <Typography variant="h6"><EnduranceIcon sx={{ color: green[700], pt: 1 }} /> Endurance: {state?.endurance}</Typography>
            </div>
            <div>
              <Typography variant="h6"><SpeedIcon sx={{ color: blue[700], pt: 1 }} /> Speed: {state?.speed}</Typography>
            </div>
          </div>
      </Card>
    </div>
    }
    </div>
  )
}