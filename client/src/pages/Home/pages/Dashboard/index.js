import { Card, LinearProgress, Typography } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite'
import CoinIcon from '@mui/icons-material/MonetizationOn'
import StrengthIcon from '@mui/icons-material/FitnessCenter'
import EnduranceIcon from '@mui/icons-material/Shield'
import SpeedIcon from '@mui/icons-material/DirectionsRun'
import { red, yellow, green, blue } from '@mui/material/colors';

export default function Dashboard(data) {

  data = data.data;

    return (
        <div>
    <Card sx={{
          padding: 2,
          margin: 1
        }}>
          {data ?
            <div>
              <Typography variant="h4">Welcome back, {data.user.username}</Typography>
              <Typography variant="h6">Level {data.user.level}</Typography>
              <Typography>Experience: {data.user.experience}</Typography>
            </div>
            : null}
        </Card>
        <Card sx={{
          padding: 2,
          margin: 1
        }}>
          {data ?
            <div className="dashboardStats">
              <div>
                <Typography variant="h6"><HeartIcon sx={{ color: red[500], pt: 1 }} /> Health: {data.user.health}/{data.user.maxhealth}</Typography>
                <LinearProgress variant="determinate" value={(data.user.health / data.user.maxhealth) * 100} />
              </div>
              <div>
                <Typography variant="h6"><CoinIcon sx={{ color: yellow[500], pt: 1 }} /> Gold: {data.user.gold}</Typography>
              </div>
              <div>
                <Typography variant="h6"><StrengthIcon sx={{ color: yellow[700], pt: 1 }} /> Strength: {data.user.strength}</Typography>
              </div>
              <div>
                <Typography variant="h6"><EnduranceIcon sx={{ color: green[700], pt: 1 }} /> Endurance: {data.user.endurance}</Typography>
              </div>
              <div>
                <Typography variant="h6"><SpeedIcon sx={{ color: blue[700], pt: 1 }} /> Speed: {data.user.speed}</Typography>
              </div>
            </div>
            : null}
        </Card>
        </div>
    )
}