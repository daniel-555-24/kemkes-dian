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
    height: 80,
  },
  rootPositif: {
    border: '4px solid #D2DC2E',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '20px',
  },
  rootNegatif: {
    border: '4px solid #BE0712',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: '20px',
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
        {['Dashboard', 'Pencarian Topik Lain', 'Management User', 'Management Modul'].map((text, index) => (
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
      <div style={{backgroundColor:'#ECECEC'}}>
       {/* <AppBar
        position='absolute'
        style={{ backgroundColor: '#fafafa', padding: '15px' }}
        elevation={0}
        title={<img src={kemkes} />}
      >
        <Toolbar>
          <Grid container spacing={4}>
            <Grid item sm={1}>
              <img src={kemkes} alt='logo' className={classes.logo} />
            </Grid>
            <Grid item sm={10}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h2 style={{ color: 'black', marginLeft: '50px' }}>
                    <strong>Dashboard Analisis</strong>
                    <br />
                    {valueFropdownTopik !== ''
                      ? valueFropdownTopik
                      : 'Semua Topik'}
                  </h2>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginLeft: '20px',
                    marginTop: -40,
                  }}
                >
                  <Chip
                    title='Guide Twitter Standard'
                    label=' i '
                    component='a'
                    color='warning'
                    href='/kemkes#/guide-twitter-std'
                    target='_blank'
                    variant='outlined'
                    clickable
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={1}>
              <Button
                onClick={logoutHandler}
                variant='contained'
                style={{ marginTop: '35%' }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}

      {/* APP : MAIN-CONTENT */}

      <Grid container justify='center' style={{ marginTop: 40, paddingLeft: 48, paddingRight: 48 }} spacing={3}>
        <Grid item sm={12} style={{marginTop:'100px'}}>
          <Card className={classes.rootCard}>
          <Grid  container  style={{ marginTop: 10, justifyContent:'center' }}  spacing={12} >
        <b item sm={2} style={{fontSize:'22px', paddingTop:14 }}>
         Pilih Topik
         <br/>
         <br/>
         <p style={{marginTop:'20px'}}>Pilih Tanggal</p>
        </b>
        <Grid item sm={7} style={{ padding: 10 }}>
          <Form.Select
            size='md'
            onChange={handleChange}
            defaultValue={valueIssue}
            style={{width:'20%'}}
          >
            <option value=''>Semua topik</option>
            {issueSummary.map((data) => {
              return <option value={data}>{data}</option>;
            })}
          </Form.Select>
          <br/><br/>
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
        <Grid item sm={2} style={{ padding: 10 , textAlign:'center', marginTop:'25px'}}>
              <img src={chart} style={{marginLeft:'60%'}} alt='logo' className={classes.logoChart} />
              <br />
        </Grid>
        <Grid item sm={1.5} style={{ padding: 10 , textAlign:'center', marginTop:'25px'}}>
            <b style={{fontSize:'40px'}}>{
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

      {/* Line 1 */}

      <Grid container justify='center' spacing={2} style={{ marginTop: 50, paddingLeft: 48, paddingRight: 48 }} >
        <Grid item sm={6}>
          <Card className={classes.rootCard} style={{ height: 425 }}>
          <Grid container style={{justifyContent:'center'}}>
              <Grid item xs={6} style={{maxWidth:'80%'}}>
                <div style={{ height: '330px',paddingBottom: 5,marginTop: '20px'}}>
                  <svg width='1000px' height='100%'>
                    <g className='geojson-layer'>{renderMap()}</g>
                  </svg>
                </div>
                <Row style={{ marginLeft: '20px'}}>
                  <Col xs={3}>
                    <i
                      className={classes.legendBox}
                      style={{
                        background:'#00B9AE',
                      }}
                    />
                    <span style={{ marginLeft: '25px', fontSize: '16px' }}>
                      Ramai : &gt; 100
                    </span>
                  </Col>
                  <Col xs={3} >
                    <i
                      className={classes.legendBox}
                      style={{
                        background:'#80DCD9',
                      }}
                    />
                    <span style={{ marginLeft: '20px', fontSize: '16px' }}>
                      Cukup :  50 - 99
                    </span>
                    <br />
                  </Col>
                  <Col xs={3}>
                    <i
                      className={classes.legendBox}
                      style={{
                        background: '#d4f5f9',
                      }}
                    />
                    <span style={{ marginLeft: '25px', fontSize: '16px' }}>
                      sepi : &lt; 50
                    </span>
                    <br />
                  </Col>
                  <Col xs={3}>
                    <i
                      className={classes.legendBox}
                      style={{
                        background: '#D3D2DC',
                        marginLeft: '-15px',
                      }}
                    />
                    <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                      undefined :{' '}
                      {listValueOfMap.length ? listValueOfMap[0].doc_count : 0}{' '}
                    </span>
                  </Col>
                </Row>
              </Grid>
            </Grid>
          </Card>
          <div style={{fontFamily:'Roboto'}}>
            <br />
            <h3>TWEET ACTIVITY</h3>
            Jumlah pengguna twitter yang mempublish tweet terkait topik yang dipilih berdasarkan wilayah di Indonesia.
          </div>
        </Grid>
        
        <Grid item sm={6}>
            <Card className={classes.rootCard} style={{ height: 425 }}>
            <Grid style={{ marginTop: '50px' }}>
                {renderWord()}
              </Grid>
            </Card>
            <div>
            <br />
            <h3>WORD CLOUD</h3>
            Tren kata terkait topik, klik pada kata atau bar untuk melihat daftar tweet.
          </div>
        </Grid>
      </Grid>

      {/* Line 2 */}

      <Grid container justify='center' spacing={3} style={{ marginTop: 50, paddingLeft: 48, paddingRight: 48 }} >
      <Grid item sm={6}>
            <Card className={classes.rootCard} style={{ height: 425 }}>
              {
                <BarSummary
                  issue={issueSummary}
                  negatif={negatifSummary}
                  positif={positifSummary}
                  netral={netralSummary}
                />
              }
            </Card>
            <div>
            <br />
            <h3>Summary keyword</h3>
            Persentase sentimen positif, negatif dan netral pada keyword terkait topik
          </div>
        </Grid>
        <Grid item sm={6}>
          <Card className={classes.rootCard} style={{ height: 425, textAlign:'-webkit-center' }}>
            {/* <h4  style={{ marginLeft : '40px', marginTop : '20px', fontWeight : 'bold'}}>Sentimen</h4> */}
            <PieSentimen
              positif={countSentiment[0] ? countSentiment[0]: 0}
              negatif={countSentiment[1] ? countSentiment[1]: 0}
              netral={countSentiment[2] ? countSentiment[2] : 0}
            />
            <Row>
              <Col style={{ textAlign: 'center' }}>
                <div>
                  <i
                    className={classes.legendBox}
                    style={{
                      background: '#00B9AE',
                    }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '17px',
                      color: 'black',
                    }}
                  > 
                    Positive
                  </span>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i
                    className={classes.legendBox}
                    style={{
                      background: '#D2E634',
                    }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '17px',
                      color: 'black',
                    }}
                  >
                    Negative
                  </span>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i
                    className={classes.legendBox}
                    style={{
                      background: '#FDFED6',
                    }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '17px',
                      color: 'black',
                    }}
                  >
                    Neutral
                  </span>
                </div>
                <div>
                  <i
                    className={classes.legendBox}
                    style={{ background: '#ffffff' }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '22px',
                      color: 'black',
                    }}
                  >
                    {(
                      (countSentiment[0] / (countSentiment[0] + countSentiment[1] + countSentiment[2])) * 100).toFixed(1)} %
                  </span>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i
                    className={classes.legendBox}
                    style={{ background: '#ffffff' }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '22px',
                      color: 'black',
                    }}
                  >
                    {(
                      (countSentiment[1] / (countSentiment[0] + countSentiment[1] + countSentiment[2])) * 100).toFixed(1)} %
                  </span>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i
                    className={classes.legendBox}
                    style={{ background: '#ffffff' }}
                  />
                  <span
                    style={{
                      marginLeft: '25px',
                      fontSize: '22px',
                      color: 'black',
                    }}
                  >
                     {(
                      (countSentiment[2] / (countSentiment[0] + countSentiment[1] + countSentiment[2])) * 100).toFixed(1)} %
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
          <div>
            <br />
            <h3>Persentase Sentimen</h3>
            Persentase sentimen positif, negatif dan netral masyarakat terkait topik.
          </div>
        </Grid>
      </Grid>

      {/* Line 3  */}

      <Grid
        container
        justify='center'
        spacing={5}
        style={{ marginTop: 50, paddingLeft: 48, paddingRight: 48 }}
      >
        <Grid
          item
          md={4}
          style={{
            justifyContent: 'space-between',
            alignContent: 'space-around',
          }}
        >
          <Card className={classes.rootPositif}>
            <p
              style={{
                marginLeft: 15,
                marginTop: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {' '}
              Sentimen Positif
            </p>
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

        <Grid
          item
          md={4}
          style={{
            justifyContent: 'space-between',
            alignContent: 'space-around',
          }}
        >
          <Card className={classes.rootNetral}>
            <p
              style={{
                marginLeft: 15,
                marginTop: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {' '}
              Sentimen Netral
            </p>
            <Paper className={classes.paperTable}>
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label='customized table'>
                  <TableHeader />
                  {renderDataTableNetral()}
                </Table>
              </TableContainer>
            </Paper>
          </Card>
        </Grid>

        <Grid
          item
          md={4}
          style={{
            justifyContent: 'space-between',
            alignContent: 'space-around',
          }}
        >
          <Card className={classes.rootNegatif}>
            <p
              style={{
                marginLeft: 15,
                marginTop: 10,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {' '}
              Sentimen Negatif
            </p>
            <Paper className={classes.paperTable}>
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }} aria-label='customized table'>
                  <TableHeader />
                  {renderDataTableNegatif()}
                </Table>
              </TableContainer>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </div>
      </Box>
    </Box>
  );
}