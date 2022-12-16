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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import DateMomentsUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Chip from '@mui/material/Chip';
import { Card, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import LineTwitter from '../component/line/LineChartTwitter';
import kemkes from '../images/logo_kemenkes baru.png';
import germas from '../images/germass.png';
import gizi from '../images/gizi.png';
import chart from '../images/chart.png';
import axios from 'axios';
import { url_twitter_dian} from '../helper/ServiceUrlAPI';
import geojson from '../geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import PieSentimen from '../component/pie/PieSentimen';
import PieGender from '../component/pie/PieGender';
import WordCloudTwitter from '../component/word/WordCloudTwitter';
import TableHeader from '../component/table/TableHeader';
import TableNetral from '../component/table/TableNetral';
import TablePositif from '../component/table/TablePositif';
import TableNegatif from '../component/table/TableNegatif';
import BarSummary from '../component/bar/BarSummary';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Rank from '@material-ui/icons/Equalizer';
import CloseIcon from '@material-ui/icons/Cancel';
import ReactLoading from 'react-loading';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
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
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [
        valueFropdownTopik === '' ? width * 0.6 : width * 0.8,
        valueFropdownTopik === '' ? height * 1 : height * 0.9,
      ],
    ],
    geojson
  );
  const path = geoPath().projection(projection);

  React.useEffect(() => {
    getSourceOfIndex(valueIssue, valueFropdownDaerah, valueFropdownSentiment);
    getTablePositive(valueIssue, valueFropdownDaerah);
    getTableNegative(valueIssue, valueFropdownDaerah);
    getTableNeutral(valueIssue, valueFropdownDaerah);
    countLineTwitter();
    getLocationOfMap(valueFropdownDaerah);
    getDataSummary(valueFropdownDaerah);
    getLastDateCrawling();
    getSentimentCount(valueIssue, valueFropdownDaerah);
    getGenderCount(valueIssue, valueFropdownDaerah);
  }, []);

  {
    /* Code Region */
  }

  const regionCode = [
    { value: '0', label: 'Undefined' },
    { value: '', label: 'Undefined' },
    { value: 'ID-', label: 'Undefined' },
    { value: 'ID-AC', label: 'Aceh' },
    { value: 'ID-SU', label: 'Sumatera Utara' },
    { value: 'ID-SB', label: 'Sumatera Barat' },
    { value: 'ID-SS', label: 'Sumatera Selatan' },
    { value: 'ID-RI', label: 'Riau' },
    { value: 'ID-JA', label: 'Jambi' },
    { value: 'ID-BB', label: 'Kepulauan Bangka Belitung' },
    { value: 'ID-BE', label: 'Bengkulu' },
    { value: 'ID-LA', label: 'Lampung' },
    { value: 'ID-JK', label: 'DKI Jakarta' },
    { value: 'ID-BT', label: 'Banten' },
    { value: 'ID-JB', label: 'Jawa Barat' },
    { value: 'ID-JT', label: 'Jawa Tengah' },
    { value: 'ID-YO', label: 'DI Yogyakarta' },
    { value: 'ID-JI', label: 'Jawa Timur' },
    { value: 'ID-BA', label: 'Bali' },
    { value: 'ID-NB', label: 'Nusa Tenggara Barat' },
    { value: 'ID-NT', label: 'Nusa Tenggara Timur' },
    { value: 'ID-KB', label: 'Kalimantan Barat' },
    { value: 'ID-KT', label: 'Kalimantan Tengah' },
    { value: 'ID-KS', label: 'Kalimantan Selatan' },
    { value: 'ID-KI', label: 'Kalimantan Timur' },
    { value: 'ID-KU', label: 'Kalimantan Utara' },
    { value: 'ID-GO', label: 'Gorontalo' },
    { value: 'ID-ST', label: 'Sulawesi Tengah' },
    { value: 'ID-SR', label: 'Sulawesi Barat' },
    { value: 'ID-SN', label: 'Sulawesi Selatan' },
    { value: 'ID-SG', label: 'Sulawesi Tenggara' },
    { value: 'ID-MA', label: 'Maluku' },
    { value: 'ID-MU', label: 'Maluku Utara' },
    { value: 'ID-PB', label: 'Papua Barat' },
    { value: 'ID-PA', label: 'Papua' },
    { value: 'ID-SA', label: 'Sulawesi Utara' },
    { value: 'ID-KR', label: 'Kepulauan Riau' },
  ];

  {
    /* API : Keyword */
  }

  async function getSourceOfIndex(issue, daerah, sentiment) {
    setValueDropdownTopik(issue);
    setValueDropdownDaerah(daerah);
    let bodyParam = {};
    bodyParam['sentiment'] = sentiment ? sentiment : null;
    bodyParam['region_code'] = daerah ? daerah : null;
    bodyParam['issue'] = issue ? issue : null;
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    axios
      .post(url_twitter_dian + '/get-data-twitter-filter-new', bodyParam)
      .then((res) => {
        setListData(res.data.value);
        setKeyword(res.data.value[2]._source.query);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }

  {
    /* API : Pie Sentiment */
  }

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


  {/* API : Pie Gender */}

  async function getGenderCount(issue, region_code) {
    let bodyParam = {};
    bodyParam['issue'] = issue ? issue : null;
    bodyParam['region_code'] = region_code ? region_code : null;
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    await axios
      .post(url_twitter_dian + '/get-count-gender', bodyParam)
      .then((res) => {
        if (res.data.value !== null) {
          setCountGender(res.data.value);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  {
    /* API : Location Map */
  }

  async function getLocationOfMap(daerah, sentiment, issue) {
      setLoading(true);
      let bodyParam = {};
      if (sentiment === '') {
        sentiment = null;
      }
      if (issue === '') {
        issue = null;
      }
      bodyParam['sentiment'] = sentiment ? sentiment : null;
      bodyParam['region_code'] = daerah ? daerah : null;
      bodyParam['issue'] = issue ? issue : null;
      bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
      await axios
        .post(url_twitter_dian + '/get-location', bodyParam)
        .then((res) => {
          if (res.data.value !== null) {
            setValueOfMap(res.data.value);
            // getUndefined(res.data.value)
          }
        })
        .catch((err) => console.log(err, '<<<<???'));
      setLoading(false);
  }

  async function countLineTwitter() {
    let sentimentNegatif = [];
    let sentimentPositif = [];
    let sentimentNetral = [];
    let tanggal = [];

    for (var i = 7; i > 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() + 1 - i);
      tanggal.push(d.getDate());
    }

    axios
      .post(url_twitter_dian + '/line-neutral')
      .then((res) => {
        if (res.data.value.length > 0) {
          for (var j = 0; j < 7; j++) {
            sentimentNetral.push(res.data.value[j].doc_count);
          }
        }
      })
      .catch((err) => console.log(err));

    axios
      .post(url_twitter_dian + '/line-positive')
      .then((res) => {
        if (res.data.value.length > 0) {
          for (var j = 0; j < 7; j++) {
            sentimentPositif.push(res.data.value[j].doc_count);
          }
        }
      })
      .catch((err) => console.log(err));

    axios
      .post(url_twitter_dian + '/line-negative')
      .then((res) => {
        if (res.data.value.length > 0) {
          for (var j = 0; j < 7; j++) {
            sentimentNegatif.push(res.data.value[j].doc_count);
          }
        }
      })
      .catch((err) => console.log(err));

    setnegatifArr(sentimentNegatif);
    setpositifArr(sentimentPositif);
    setnetralArr(sentimentNetral);
    settanggal(tanggal);
  }

  {
    /* API : Summary  */
  }

  async function getDataSummary(daerah) {
    let bodyParam = {};
    let obj = {};
    let issueDetail = [];
    let negatifArray = [];
    let positifArray = [];
    let netralArray = [];
    let issue = [];
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    bodyParam['region_code'] = daerah !== '' ? daerah : '';
    await axios
      .post(url_twitter_dian + '/get-summary-issue', bodyParam)
      .then((res) => {
        if (res.data.value.length > 0) {
          for (let i = 0; i < res.data.value.length; i++) {
            obj[res.data.value[i].key] = {
              total: res.data.value[i].doc_count,
              sentimen: res.data.value[i].insight_sentiment.buckets,
            };
          }
          setLoading(true);
        }
      })
      .catch((err) => console.log(err));
    for (let key in obj) {
      issueDetail.push({
        key: key,
        total: obj[key].total,
        positif: 0,
        netral: 0,
        negatif: 0,
      });
      obj[key].sentimen.forEach((item) => {
        if (item.key === 'Positive') {
          issueDetail[issueDetail.length - 1].positif = item.doc_count;
        } else if (item.key === 'Negative') {
          issueDetail[issueDetail.length - 1].negatif = item.doc_count;
        } else if (item.key === 'Neutral') {
          issueDetail[issueDetail.length - 1].netral = item.doc_count;
        }
      });
    }

    for (let key in issueDetail) {
      issue.push(issueDetail[key].key);
      negatifArray.push(issueDetail[key].negatif);
      positifArray.push(issueDetail[key].positif);
      netralArray.push(issueDetail[key].netral);
    }

    setIssueSummary(issue);
    setnegatifSummary(negatifArray);
    setpositifSummary(positifArray);
    setnetralSummary(netralArray);
    setLoading(false);
  }

  {
    /* API : Last Data Update  */
  }

  async function getLastDateCrawling() {
    await axios
      .get(url_twitter_dian + '/get-lastdate')
      .then((res) => {
        if (res.data.value !== null) {
          setLastDate(res.data.value.crawlingdate);
        }
      })
      .catch((err) => console.log(err));
  }

  {
    /* API : Table Positive,Negative,Neutral  */
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

  function getTableNeutral(topik, daerah) {
    setValueDropdownTopik(topik);
    let bodyParam = {};
    bodyParam['issue'] = topik !== '' ? topik : '';
    bodyParam['region_code'] = daerah !== '' ? daerah : '';
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    axios
      .post(url_twitter_dian + '/get-table-neutral', bodyParam)
      .then((res) => {
        setListTableNeutral(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  function getTableNegative(topik, daerah) {
    setValueDropdownTopik(topik);
    let bodyParam = {};
    bodyParam['issue'] = topik !== '' ? topik : '';
    bodyParam['region_code'] = daerah !== '' ? daerah : '';
    bodyParam['start_date'] =
      moment(startDate)._d.toISOString().split('T')[0] + 'T00:00:00.000Z';
    bodyParam['end_date'] =
      moment(endDate)._d.toISOString().split('T')[0] + 'T23:59:59.999Z';
    axios
      .post(url_twitter_dian + '/get-table-negative', bodyParam)
      .then((res) => {
        setListTableNegative(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  {
    /* Function : Time Format */
  }

  function getDateFormat(value) {
    let year = value.slice(0, 4);
    // console.log(year,"tahun")
    let month = value.slice(5, 7);
    // console.log(month,"bulan")
    let day = value.slice(8, 10);
    // console.log(day,"hari")
    let jam = value.slice(11, 16);
    // console.log(jam,"jam")

    let result = day + '/' + month + '/' + year + ' | ' + jam;
    return result;
  }

  {
    /* Render : Map */
  }

  const renderMap = () => {
    return geojson.features.map((d) => {
      for (let i = 0; i < listValueOfMap.length; i++) {
        if (listValueOfMap[i].key.match(d.properties.iso_3166_2)) {
          if (listValueOfMap[i].doc_count > 100) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill='#00B9AE'
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#00B9AE')
                    .append('title')
                    .text(
                      'Nama Daerah : ' +
                        d.properties.name +
                        '\n' +
                        'Tweet Total    : ' +
                        listValueOfMap[i].doc_count +
                        '\n'
                    );
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // setRegion(d.properties.iso_3166_2);
                  // handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr(
                    'fill','#00B9AE'
                  );
                }}
              />
            );
          }
          if (
            listValueOfMap[i].doc_count > 50 &&
            listValueOfMap[i].doc_count < 99
          ) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill={'#80DCD9'}
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#80DCD9')
                    .append('title')
                    .text(
                      'Nama Daerah : ' +
                        d.properties.name +
                        '\n' +
                        'Tweet Total    : ' +
                        listValueOfMap[i].doc_count
                    );
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // setRegion(d.properties.iso_3166_2);
                  // handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr('fill','#80DCD9');
                }}
              />
            );
          }
          if (
            listValueOfMap[i].doc_count > 0 &&
            listValueOfMap[i].doc_count < 49
          ) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill={'#d4f5f9'}
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill','#d4f5f9')
                    .append('title')
                    .text(
                      'Nama Daerah : ' +
                        d.properties.name +
                        '\n' +
                        'Tweet Total    : ' +
                        listValueOfMap[i].doc_count
                    );
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // setRegion(d.properties.iso_3166_2);
                  // handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr(
                    'fill','#d4f5f9'
                  );
                }}
              />
            );
          }
        }
      }
      return (
        <path
          key={d.properties.Name}
          d={path(d)}
          fill='#C2C2C2'
          stroke='#0e1724'
          strokeWidth='1'
          strokeOpacity='0.5'
          onClick={(e) => {
            e.preventDefault();
            // setRegion(d.properties.iso_3166_2);
            // handleChangeDaerahmap(d.properties.iso_3166_2);
          }}
          onMouseEnter={(e) => {
            select(e.target)
              .attr('fill', '#C2C2C2')
              .append('title')
              .text(
                'Nama Daerah : ' +
                  d.properties.name +
                  '\n' +
                  'Tweet Total    : ' +
                  listValueOfMap.doc_count
              );
          }}
          onMouseOut={(e) => {
            select(e.target).attr('fill', '#C2C2C2');
          }}
        />
      );
    });
  };

  {
    /* Render : Word */
  }

  const renderWord = () => {
    let array = [];
    let arrayText = [];
    let arrayValue = [];
    let dataGabunganTextValue = [];
    let result = [];
    let valueArray = [];
    let sentiment = valueFropdownSentiment;
    let topik = valueFropdownTopik;

    
    // let valueWord = valueWord;

    listData.map((value) => {
      for (var i = 0; i < value._source.insight.keywords.length; i++) {
        array.push(value._source.insight.keywords[i]);
      }
    });

    let b = array.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      {}
    );

    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        arrayText.push(key);
        arrayValue.push(b[key]);
      }
    }

    for (var i = 0; i < arrayText.length; i++) {
      var objectData = {};

      objectData['text'] = arrayText[i];
      objectData['value'] = arrayValue[i];
      dataGabunganTextValue.push(objectData);
    }

    if (dataGabunganTextValue.length > 0) {
      let ab = dataGabunganTextValue.sort(
        (a, b) => parseFloat(b.value) - parseFloat(a.value)
      );

      // top 10
      for (var i = 0; i <= 20; i++) {
        var objTop10 = {};
        objTop10['text'] = ab[i].text;
        objTop10['value'] = ab[i].value;
        result.push(objTop10);
      }
    }

    // INI TOTAL DATA
    let a = Object.keys(result).map((key) =>  result[key].value);
    // console.log(a.reduce((a, b) => a + b, 0),"INI SUM");

    return (
      <WordCloudTwitter
        sumData={a.reduce((a, b) => a + b, 0)}
        data={result}
        valueWord={20}
        sentiment={sentiment}
      />
    );
  };

  {
    /* Render : Table Positive,Negative,Neutral */
  }

  const renderDataTableNetral = () => {
    return listTableNeutral.map((value, index) => {
      return (
        <TableNetral
          key={index}
          username={value._source.user_screenname}
          tweet={value._source.body}
          location={value._source.fixed_location}
          retweet={value._source.total_attraction}
        />
      );
    });
  };

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

  const renderDataTableNegatif = () => {
    return listTableNegative.map((value, index) => {
      return (
        <TableNegatif
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
    /* HandlerOnChange : Premium Switcher */
  }

  const handleToogle = (event) => {
    setChecked(event.target.checked);
  };

  {
    /* HandlerOnChange : Rank TAB */
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  {
    /* HandlerOnChange : Topik */
  }

  const handleChange = (e) => {
    setValueIssue(e.target.value);
    getSourceOfIndex(
      e.target.value,
      valueFropdownDaerah,
      valueFropdownSentiment
    );
    // getTableDesc(e.target.value, valueFropdownDaerah);
    getTablePositive(e.target.value, valueFropdownDaerah);
    getTableNegative(e.target.value, valueFropdownDaerah);
    getTableNeutral(e.target.value, valueFropdownDaerah);
    getSentimentCount(e.target.value, valueFropdownDaerah);
    getGenderCount(e.target.value, valueFropdownDaerah);
    getLocationOfMap(
      valueFropdownDaerah,
      valueFropdownSentiment,
      e.target.value
    );
  };

  {
    /* HandlerOnChange : Daerah */
  }

  const handleChangeDaerah = (e) => {
    setRegion(e.target.value);
    setValueDropdownDaerah(e.target.value);
    getSourceOfIndex(valueIssue, e.target.value, valueFropdownSentiment);
    getTablePositive(valueIssue, e.target.value);
    getTableNeutral(valueIssue, e.target.value);
    getTableNegative(valueIssue, e.target.value);
    getLocationOfMap(e.target.value);
    getDataSummary(e.target.value);
    getSentimentCount(valueIssue, e.target.value);
    getGenderCount(valueIssue, e.target.value);
  };

  {
    /* HandlerOnChange : Total Word */
  }

  const handleChangeValueWord = (e) => {
    setValueWord(e.target.value);
  };

  {
    /* HandlerOnChange : Dropdown Sentiment on container 1 */
  }

  const handleChangeSentiment = (e) => {
    setValueDropdownSentiment(e.target.value);
    getSourceOfIndex(valueFropdownTopik, valueFropdownDaerah, e.target.value);
    getLocationOfMap(valueFropdownDaerah, e.target.value, valueFropdownTopik);
  };

  {
    /* HandlerOnChange : Click Map */
  }

  const handleChangeDaerahmap = (e) => {
    setValueDropdownDaerah(e);
    getSourceOfIndex(valueIssue, e, valueFropdownSentiment);
    getTablePositive(valueIssue, e);
    getTableNeutral(valueIssue, e);
    getTableNegative(valueIssue, e);
    getLocationOfMap(e, valueFropdownSentiment, valueFropdownTopik);
    getDataSummary(e);
    getSentimentCount(valueIssue, e);
    getGenderCount(valueIssue, e);
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
    Swal.fire({
      icon: 'error',
      title: 'Error not configuration yet',
      text: 'This feature still in progress',
    });
  };

  {
    /* CONDITIONAL */
  }

  if (valueFropdownMedia === 'news') history.push('/news');

  if (checked === true) history.push('/premium');

  if (loading) {
    return (
      <ReactLoading
        type={'cubes'}
        color={'blue'}
        height={10}
        width={20}
        style={{ margin: 'auto', width: '10%', marginTop: '200px' }}
      />
    );
  }

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
         <h3>Form Permintaan Topik</h3>
         <hr style={{opacity:'1'}}/>
         <TextField fullWidth label="email" id="email" />
         <br /><br />
         <TextField fullWidth label="topik" id="topik" />
         <br /><br />
         <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="Keyword"
            style={{ width: '100%' }}
          />
         <br /><br />
         <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="Tujuan"
            style={{ width: '100%' }}
          />
         <br /><br />
        </Grid>
        <Grid item sm={1} style={{marginRight:'auto'}}>
              <Button
                onClick={backHandler}
                variant='contained'
                style={{backgroundColor:'#00B9AE'}}
              >
                Ajukan
              </Button>
            </Grid>
      </Grid>
    </div>
      </Box>
    </Box>
  );
}