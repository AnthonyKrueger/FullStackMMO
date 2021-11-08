import { useQuery } from '@apollo/client';
import { Card, Typography } from '@mui/material';
import Auth from '../../../../utils/auth';
import { GET_USER } from "../../../../utils/queries"

export default function Dashboard() {

    const { loading, data } = useQuery(GET_USER, {
        variables: { id: Auth.getProfile().data.id },
        fetchPolicy: "cache-and-network"
      });

      if (loading) {
        return (
          <div className="loader">
            <h3>Loading...</h3>
          </div>
        )
      }

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
                <Typography variant="h6">Health: {data.user.health}/{data.user.maxhealth}</Typography>
              </div>
              <div>
                <Typography variant="h6">Gold: {data.user.gold}</Typography>
              </div>
              <div>
                <Typography variant="h6">Strength: {data.user.strength}</Typography>
              </div>
              <div>
                <Typography variant="h6">Endurance: {data.user.endurance}</Typography>
              </div>
              <div>
                <Typography variant="h6">Speed: {data.user.speed}</Typography>
              </div>
            </div>
            : null}
        </Card>
        </div>
    )
}