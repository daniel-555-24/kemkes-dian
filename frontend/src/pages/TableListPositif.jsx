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
import moment from 'moment';
import TableHeader from '../component/table/TableHeader';
import { makeStyles } from '@material-ui/core/styles';
import DateMomentsUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Card, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import kemkes from '../images/logo_kemenkes baru.png';
import germas from '../images/germass.png';
import gizi from '../images/gizi.png';
import chart from '../images/chart.png';
import axios from 'axios';
import { url_twitter_dian} from '../helper/ServiceUrlAPI';
import TablePositif from '../component/table/TablePositif';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

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
    // height:'600px',
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
    // height: 250,
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
  const [valueFropdownSentiment, setValueDropdownSentiment] =
    React.useState('');
  const [keyWord, setKeyword] = React.useState([]);
  const [valueIssue, setValueIssue] = React.useState('');
  const [negatifArr, setnegatifArr] = React.useState([]);
  const [positifArr, setpositifArr] = React.useState([]);
  const [netralArr, setnetralArr] = React.useState([]);
  const [issueSummary, setIssueSummary] = React.useState([]);
  const [negatifSummary, setnegatifSummary] = React.useState([]);
  const [positifSummary, setpositifSummary] = React.useState([]);
  const [netralSummary, setnetralSummary] = React.useState([]);
  const [tanggal, settanggal] = React.useState([]);
  const [listValueOfMap, setValueOfMap] = React.useState([]);
  const [lastDate, setLastDate] = React.useState('');
  const [valueWord, setValueWord] = React.useState(5);
  const [countSentiment, setCountSentiment] = React.useState([]);
  const [countGender, setCountGender] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [region, setRegion] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const open = Boolean(anchorEl);
  const width = 1050;
  const height = 345;

  React.useEffect(() => {
    getTablePositive(valueIssue, valueFropdownDaerah);
    getSentimentCount(valueIssue, valueFropdownDaerah);
  }, []);

  async function getSentimentCount(issue, region_code) {
    let bodyParam = {};
    let sentiment= [];
    bodyParam['issue'] = issue ? issue : null;
    bodyParam['region_code'] = region_code ? region_code : null;
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    await axios
      .post(url_twitter_dian + '/get-count-sentiment', bodyParam)
      .then((res) => {
        
        if (res.data.value !== null) {
          setCountSentiment(res.data.value);
          for (let key in res.data) {
            sentiment.push({
              Positive: 0,
              Negative: 0,
              Neutral: 0,
            });
            res.data[key].forEach((item) => {
              if (item.key === 'Positive') {
                sentiment[sentiment.length - 1].Positive = item.doc_count;
              } else if (item.key === 'Negative') {
                sentiment[sentiment.length - 1].Negative = item.doc_count;
              } else if (item.key === 'Neutral') {
                sentiment[sentiment.length - 1].Neutral = item.doc_count;
              }
            });
          }
          let result = Object.keys(sentiment[0]).map((key) => (sentiment[0][key]));
          setCountSentiment(result)
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function getTablePositive(topik, daerah) {
    setValueDropdownTopik(topik);
    let bodyParam = {};
    bodyParam['issue'] = topik !== '' ? topik : '';
    bodyParam['region_code'] = daerah !== '' ? daerah : '';
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    axios
      .post(url_twitter_dian + '/get-table-positive', bodyParam)
      .then((res) => {
        setListTablePositive(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  const renderDataTablePositif = () => {
    return listTablePositive.map((value, index) => {
      return (
        <TablePositif
          key={index}
          username={value._source.user_screenname}
          tweet={value._source.body}
          location={value._source.fixed_location}
          retweet={value._source.total_attraction}
        />
      );
    });
  };

  {
    /* Function : Time Format */
  }

  const handleChangeDaerahmap = (e) => {
    getTablePositive(valueIssue, e);
    getSentimentCount(valueIssue, e);
  };

  {
    /* HandlerOnChange : LogOut */
  }

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
    props.history.push('/');
  };

  {
    /* CONDITIONAL */
  }

  if (valueFropdownMedia === 'news') history.push('/news');

  if (checked === true) history.push('/premium');

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

      {/* APP : MAIN-CONTENT */}

      <Grid container justify='center' style={{ marginTop: 40, paddingLeft: 48, paddingRight: 48 }} spacing={3}>
        <Grid item sm={12} style={{marginTop:'100px'}}>
          <Card className={classes.rootCard}>
          <Grid  container  style={{ marginTop: 10, justifyContent:'center' }}  spacing={12} >
        <b item sm={2} style={{fontSize:'22px', paddingTop:14 }}>
         <p style={{}}>Pilih Tanggal</p>
        </b>
        <Grid item sm={7} style={{ padding: 10 }}>
          {/* Start-Date */}
          <MuiPickersUtilsProvider utils={DateMomentsUtils}>
            <DatePicker
              autoOk
              ampm={false}
              disableFuture
              startDate={startDate}
              value={startDate}
              onChange={(startDate) => {
                setStartDate(startDate);
              }}
              onAccept={(startDate) => {
                setStartDate(startDate);
              }}
              // maxDate= {new Date(Date.now() + 12096e5)}
              maxDate={new Date()}
              minDate={new Date() - 12096e5}
              label='Start Date'
            />
          </MuiPickersUtilsProvider>

        {/* End-Date */}
          <MuiPickersUtilsProvider utils={DateMomentsUtils}>
            {/* <DateTimePicker value={startDate} onChange={setStartDate} /> */}
            <DatePicker
              autoOk
              ampm={false}
              disableFuture
              startDate={endDate}
              value={endDate}
              onChange={(endDate) => {
                setEndDate(endDate);
                localStorage.setItem('endDate', endDate);
              }}
              onAccept={(endDate) => {
                setEndDate(endDate);
                localStorage.setItem('endDate', endDate);
              }}
              minDate={startDate}
              label='End Date'
            />
          </MuiPickersUtilsProvider>

          <Button
            onClick={(e) => {
              setStartDate();
              setEndDate();
            }}
            variant='text'
          >
            X
          </Button>

          <Button
            onClick={(e) => {
              handleChangeDaerahmap(valueFropdownDaerah);
            }}
            style={{background:'#007871'}}
            variant='contained'
          >
            Set Filter
          </Button>
        </Grid>
        <Grid item sm={2} style={{ padding: 10 , textAlign:'center'}}>
              <img src={chart} style={{marginLeft:'60%'}} alt='logo' className={classes.logoChart} />
              <br />
        </Grid>
        <Grid item sm={1.5} style={{ padding: 10 , textAlign:'center'}}>
            <b style={{fontSize:'20px'}}>{
                ((countSentiment[0] ? countSentiment[0] :0) +
                  (countSentiment[1] ? countSentiment[1]: 0) +
                  (countSentiment[2] ? countSentiment[2] : 0))
              }</b>
              <br />
              Total Tweet
        </Grid>
        
      </Grid>
          </Card>
        </Grid>


      </Grid>

      {/* Line 3  */}

      <Grid
        container
        justify='center'
        spacing={5}
        style={{ marginTop: 20, paddingLeft: 48, paddingRight: 48 }}
      >

        <Grid
          item
          md={12}
        >
         <h3>Daftar Sentiment Positive</h3>
          <Card className={classes.rootNegatif}>
            <Paper className={classes.paperTable}>
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label='customized table'>
                  <TableHeader />
                  {renderDataTablePositif()}
                </Table>
              </TableContainer>
            </Paper>
          </Card>
        </Grid>
        <Grid item sm={1}>
              <Button
                onClick={backHandler}
                variant='contained'
                style={{backgroundColor:'#00B9AE' ,marginLeft:'830%'}}
              >
                Kembali
              </Button>
            </Grid>
      </Grid>
    </div>
      </Box>
    </Box>
  );
}