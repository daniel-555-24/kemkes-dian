import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import kemkes from '../images/logo_kemenkes baru.png';
import { Card, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import germas from '../images/germass.png';
import gizi from '../images/gizi.png';
import Swal from 'sweetalert2';
import "@fontsource/roboto";
import '../App.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    background: 'white',
  },
  sidebar: {
    backgroundColor:'#34C7BD',
    color: '#fff',
    width: '335px'
  },
  menuButton: {
    marginLeft: 'auto',
  },
  logo: {
    height: 70,
  },
  logoChart: {
    height: 60,
  },
  rootPositif: {
    border: '4px solid #D2DC2E',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '20px',
  },
  rootNegatif: {
    height:'600px',
    border: '2px solid',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  rootNetral: {
    border: '4px solid #E0E0E0',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '20px',
  },

  rootCard: {
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '20px',
    paddingBottom: 10,
  },
  paperTable: {
    height: 250,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    overflowY: 'auto',
  },
  menuPaper: {
    borderRadius: '30px',
    color: 'black',
  },
  textField: {
    width: '100%',
    marginLeft: '10px',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  square1: {
    width: '15px',
    height: '15px',
    backgroundColor: '#075050',
    margin: '5px',
  },
  square2: {
    width: '15px',
    height: '15px',
    backgroundColor: '#107e78',
    margin: '5px',
  },
  square3: {
    width: '15px',
    height: '15px',
    backgroundColor: '#1CB3AB',
    margin: '5px',
  },
  square4: {
    width: '15px',
    height: '15px',
    backgroundColor: '#C2C2C2',
    margin: '5px',
  },
  legendBox: {
    position: 'absolute',
    margin: '4px',
    width: '15px',
    height: '15px',
    borderRadius: '3px',
  },
  legendBoxMini: {
    position: 'absolute',
    margin: '4px',
    width: '10px',
    height: '10px',
    borderRadius: '3px',
  },
}));

const drawerWidth = 240;
const hr = {
  display: 'block',
  height: '1px',
  border: '0',
  borderTop: '5px solid #000',
  margin: '1em 0',
  padding: '0'
};

function createData(
  number: string,
  namalegkap: string,
  email: string,
  unitkerja: string,
  level: string,
  blokir: string,
  aksi: String,
) {
  return { number, namalegkap, email, unitkerja,level,blokir,aksi };
}

const rows = [
  createData('1','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),
  createData('2','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),
  createData('3','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),
  createData('4','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),
  createData('5','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),
  createData('6','Dian Mulya Sari', 'diansari@Mail.com','Administrator', 'Pusdatin', 'N' , 'edit'),

];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function TwitterPage(props : Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{height:'100px', backgroundColor:'#008E86'}}>
      <img src={gizi} alt='logo' style={{ height: 70}}/>
      <h1 style={{fontSize:'30px',fontWeight:'bolder',marginLeft:'2%',marginTop:'15px'}}>SIS-GI 
      <h2 style={{fontSize:'15px',fontWeight:'normal'}}>Sistem Informasi Sentimen Gizi</h2>
      </h1>
      </Toolbar>
      <Divider />
      <List>
        {[
        <Link to="/" rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link>, 
        <Link to="/pencarian-topik" rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'white' }}>Pencarian Topik Lain</Link>, 
        <Link to="/management-user" rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'white' }}>Management User</Link>, 
        <Link to="/management-modul" rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'white' }}>Management Modul</Link>].map((text, index) => (
          <ListItem key={text} style={{fontSize:'20px'}} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  const history = useHistory();
  const [listData, setListData] = React.useState([]);
  const [listTablePositive, setListTablePositive] = React.useState([]);
  const [listTableNegative, setListTableNegative] = React.useState([]);
  const [listTableNeutral, setListTableNeutral] = React.useState([]);
  const [valueFropdownMedia, setValueDropdownMedia] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [valueFropdownTopik, setValueDropdownTopik] = React.useState('');
  const [valueFropdownDaerah, setValueDropdownDaerah] = React.useState('');
  const [valueFropdownSentiment, setValueDropdownSentiment] = React.useState('');
  const [valueIssue, setValueIssue] = React.useState('');
  const [listValueOfMap, setValueOfMap] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const open = Boolean(anchorEl);
  const width = 1050;
  const height = 345;

  React.useEffect(() => {
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    props.history.push('/login');
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'You are loged out',
    });
  };
  const backHandler = (e) => {
    Swal.fire({
      icon: 'error',
      title: 'Error not configuration yet',
      text: 'This feature still in progress',
    });
  };

  // if (loading) {
  //   return (
  //     <ReactLoading
  //       type={'cubes'}
  //       color={'blue'}
  //       height={10}
  //       width={20}
  //       style={{ margin: 'auto', width: '10%', marginTop: '200px' }}
  //     />
  //   );
  // }

  {
    /* APP DASHBOARD */
  }

//   return (
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{backgroundColor:'white'}}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{height:'100px' ,marginLeft:'120px'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          <img src={kemkes} alt='logo' className={classes.logo} />
          <img src={germas} alt='logo' style={{ height: 70 }}/>
          </Typography>
          <Grid item sm={1}>
              <Button
                onClick={logoutHandler}
                variant='contained'
                style={{backgroundColor:'black' ,marginLeft:'830%'}}
              >
                Logout
              </Button>
            </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width:'335px', flexShrink: { sm: 0 } }}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 335 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 335, color: 'white' , backgroundColor: '#34C7BD' }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        style={{padding:0}}
      >
      <div>

      <Grid
        container
        justify='center'
        spacing={5}
        style={{ marginTop: 120, paddingLeft: 48, paddingRight: 48 }}
      >

        <Grid
          item
          md={12}
        >
         <h3>Management User</h3>
         <hr style={{opacity:'1'}}/>
        </Grid>
        <Grid item sm={12} style={{marginRight:'auto'}}>
              <Button
                onClick={backHandler}
                variant='contained'
                style={{backgroundColor:'#00B9AE', width:'150px'}}
              >
                Tambah User
              </Button>
              <br /><br />
              <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">No</TableCell>
            <TableCell align="right">Nama Lengkap</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Unit Kerja</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Blokir</TableCell>
            <TableCell align="right">Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.namalegkap}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.unitkerja}</TableCell>
              <TableCell align="right">{row.level}</TableCell>
              <TableCell align="right">{row.blokir}</TableCell>
              <TableCell align="right">{row.aksi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
      </Grid>
    </div>
      </Box>
    </Box>
  );
}