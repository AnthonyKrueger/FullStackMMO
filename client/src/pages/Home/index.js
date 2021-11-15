import { Redirect } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { SET_USER_DATA } from '../../utils/actions';

import { GET_USER } from "../../utils/queries"

import Auth from "../../utils/auth";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import WalkIcon from '@mui/icons-material/DirectionsRun'
import InventoryIcon from '@mui/icons-material/Backpack'

import {GiAxeSword} from "react-icons/gi"

import Dashboard from './pages/Dashboard';
import Walking from './pages/Walking';
import Inventory from './pages/Inventory';


export default function HomePage() {

  let token = localStorage.getItem('id_token');

  const queryVariable = Auth.getProfile()?.data.id

  const { loading, data } = useQuery(GET_USER, {
    variables: { id: queryVariable },
    fetchPolicy: "cache-and-network"
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: SET_USER_DATA, user: data?.user})
  }, [data, dispatch])

  const theme = useTheme();

  if (!token || Auth.isTokenExpired(token)) {
    return <Redirect to='/splash' />
  };

  const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        <DrawerHeader>
        {mobileOpen ? 
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          : null
        }
        </DrawerHeader>
        <Divider />
        <List>
        <Link to="/">
          <ListItem button key="Home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/walking">
          <ListItem button key="Walk">
            <ListItemIcon>
              <WalkIcon />
            </ListItemIcon>
            <ListItemText primary="Walk" />
          </ListItem>
        </Link>

        <Link to="/inventory">
          <ListItem button key="Inventory">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
        </Link>

        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow: 1}} component="div">
            <GiAxeSword />
            FSMMO
          </Typography>
          <Button color="inherit" onClick={() => Auth.logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ResponsiveDrawer />
      {loading ? <p>Loading...</p> :
      <Main sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <DrawerHeader />
        <Router>
          <Switch>
            <Route exact path='/' component={() => (<Dashboard loading={loading}/>)} />
            <Route path='/walking' component={() => (<Walking loading={loading}/>)} />
            <Route path='/inventory' component={() => (<Inventory/>)} />
          </Switch>
      </Router>
      </Main>
      }
    </Box>
  )
}