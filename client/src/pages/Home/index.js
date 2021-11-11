import { Redirect } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../../utils/actions';

import { GET_USER } from "../../utils/queries"

import Auth from "../../utils/auth";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';

import Dashboard from './pages/Dashboard';
import Walking from './pages/Walking';
import { Button } from '@mui/material';

export default function HomePage() {

  const state = useSelector(state => {
    return state;
  });

  const [open, setOpen] = React.useState(false);

  const [userData, setUserData] = React.useState(null)

  let token = localStorage.getItem('id_token');

  const queryVariable = Auth.getProfile()?.data.id

  const { loading, data } = useQuery(GET_USER, {
    variables: { id: queryVariable },
    fetchPolicy: "cache-and-network"
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    setUserData(data ? data : null)
  }, [data])

  React.useEffect(() => {
      dispatch({type: SET_USER_DATA, user: data?.user})
  }, [data, dispatch])

  const theme = useTheme();

  if (!token || Auth.isTokenExpired(token)) {
    return <Redirect to='/splash' />
  };

  if (loading) {
    return (
      <div className="loader">
        <h3>Loading...</h3>
      </div>
    )
  }

  const drawerWidth = 240;

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })
  (({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}} component="div">
            FSMMO
          </Typography>
          <Button color="inherit" onClick={() => Auth.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        // variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <Link to="/">
          <ListItem button key="Home" onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/walking">
          <ListItem button key="Walk" onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Walk" />
          </ListItem>
        </Link>

        </List>
      </Drawer>
      {loading ? <p>Loading...</p> :
      <Main open={open}>
        <DrawerHeader />
        <Router>
          <Switch>
            <Route exact path='/' component={() => (<Dashboard userData={state} loading={loading} setData={setUserData}/>)} />
            <Route path='/walking' component={() => (<Walking userData={userData} loading={loading} setData={setUserData}/>)} />
          </Switch>
      </Router>
      </Main>
      }
    </Box>
  )
}