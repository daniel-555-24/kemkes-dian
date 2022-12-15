import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { Card, Grid, Paper, TableContainer, Table } from '@material-ui/core';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import kemkes from '../images/logo_kemenkes baru.png';
import searchNotYet from '../images/search_not_yet.png';
import axios from 'axios';
import { url_twitter_premium } from '../helper/ServiceUrlAPI';
import geojson from '../geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PieSentimen from '../component/pie/PieSentimen';
import PieGender from '../component/pie/PieGender';
import WordCloudTwitter from '../component/word/WordCloudTwitter';
import TableHeader from '../component/table/TableHeader';
import TableNetralPremium from '../component/table/TableNetralPremium';
import TablePositifPremium from '../component/table/TablePositifPremium';
import TableNegatifPremium from '../component/table/TableNegatifPremium';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Rank from '@material-ui/icons/Equalizer';
import CloseIcon from '@material-ui/icons/Cancel';
import ReactLoading from 'react-loading';
import Switch from '@mui/material/Switch';
import DateMomentsUtils from '@date-io/moment'; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Swal from 'sweetalert2';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    background: 'white',
  },
  menuButton: {
    marginLeft: 'auto',
  },
  logo: {
    height: 70,
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

export default function TwitterPagePremium(props) {
  const classes = useStyles();
  const history = useHistory();
  const [listData, setListData] = React.useState([]);
  const [listTablePositive, setListTablePositive] = React.useState([]);
  const [listTableNegative, setListTableNegative] = React.useState([]);
  const [listTableNeutral, setListTableNeutral] = React.useState([]);

  const [valueFropdownMedia, setValueDropdownMedia] = React.useState('');
  const [valueFropdownTopik, setValueDropdownTopik] = React.useState('');
  const [valueFropdownDaerah, setValueDropdownDaerah] = React.useState('');
  const [valueFropdownSentiment, setValueDropdownSentiment] =
    React.useState('');

  const [keyWord, setKeyword] = React.useState([]);
  const [valueIssue, setValueIssue] = React.useState('');
  const [checked, setChecked] = React.useState(true);
  const [listValueOfMap, setValueOfMap] = React.useState([]);
  const [lastDate, setLastDate] = React.useState('');
  const [valueWord, setValueWord] = React.useState(5);
  const [countSentiment, setCountSentiment] = React.useState([]);
  const [countGender, setCountGender] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dataReady, setDataReady] = React.useState(false);
  const [region, setRegion] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [payload, setPayload] = React.useState(null);
  const [respData, setRespData] = React.useState('');
  const [isFetched, setIsFetched] = React.useState(false);
  const [dropdown, setDropdown] = React.useState([]);
  const [dropdownDate, setDropdownDate] = React.useState([]);
  const [dropdownDateString, setdropdownDateString] = React.useState([]);
  const open = Boolean(anchorEl);

  const start_date = moment(startDate).format('YYYYMMDDHHmm');
  const end_date = moment(endDate).format('YYYYMMDDHHmm');
  // console.log(query, start_date, end_date, 'payloadbaru');
  const handleToogle = (event) => {
    setChecked(event.target.checked);
    localStorage.setItem('query', '');
    localStorage.setItem('startDate', '');
    localStorage.setItem('endDate', '');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    // const interval = setInterval(() => {
    getDropdown();
    getDropdownFromDate();
    // getDropdownToDate();

    getSourceOfIndex(valueFropdownDaerah, valueFropdownSentiment);
    getTablePositive(valueFropdownDaerah);
    getTableNegative(valueFropdownDaerah);
    getTableNeutral(valueFropdownDaerah);
    getLocationOfMap(valueFropdownDaerah, valueFropdownSentiment);
    getSentimentCount();
    getGenderCount();

    //   console.log('Every 3 seconds');
    // }, 3000);

    // return () => clearInterval(interval);
  }, [
    valueFropdownDaerah,
    valueFropdownSentiment,
    query,
    start_date,
    end_date,
  ]);

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
  ];

  // prem
  async function getSourceOfIndex(daerah, sentiment) {
    let bodyParam = {};
    bodyParam['sentiment'] = sentiment ? sentiment : null;
    bodyParam['region_code'] = daerah ? daerah : null;
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    axios
      .post(url_twitter_premium + '/get-data-twitter-filter-prem', bodyParam)
      .then((res) => {
        setListData(res.data.value);
        setKeyword(res.data.value[2]._source.query);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }

  // prem
  async function getDropdown() {
    let dropdownQuery = [];
    let count = {};
    await axios
      .post(url_twitter_premium + '/get-dropdown-query')
      .then((res) => {
        // console.log(res, 'res');
        for (let i = 0; i < res.data.value.length; i++) {
          dropdownQuery.push(res.data.value[i].key);
        }
        dropdownQuery.forEach((item) => {
          if (count[item]) {
            count[item]++;
          } else {
            count[item] = 1;
          }
        });
        // console.log(dropdownQuery, 'test');
        var dd = Object.keys(count);
        // console.log('test', dd);
        setDropdown(dd);
      })
      .catch((err) => console.log(err));
  }

  async function getDropdownFromDate() {
    let bodyParam = {};
    let dateJoin = [];
    let dateJoinToString = [];
    let countDateJoin = {};
    bodyParam['premium_query'] = localStorage.query;
    await axios
      .post(url_twitter_premium + '/get-dropdown-query-date', bodyParam)
      .then((res) => {
        for (let i = 0; i < res.data.value.length; i++) {
          dateJoin.push([
            res.data.value[i]._source.fromDate,
            res.data.value[i]._source.toDate,
          ]);
        }
        // console.log(dateJoin, 'data join');

        for (let i = 0; i < dateJoin.length; i++) {
          for (let j = 0; j < dateJoin[i].length; j++) {
            if (j === dateJoin[i].length - 1) {
              dateJoinToString.push(
                `${dateJoin[i][0].substring(6, 8)}-${dateJoin[i][0].substring(
                  4,
                  6
                )}-${dateJoin[i][0].substring(0, 4)} | (${dateJoin[
                  i
                ][0].substring(8, 10)}:${dateJoin[i][0].substring(
                  10,
                  12
                )}) to ${dateJoin[i][1].substring(6, 8)}-${dateJoin[
                  i
                ][1].substring(4, 6)}-${dateJoin[i][1].substring(
                  0,
                  4
                )} | (${dateJoin[i][1].substring(8, 10)}:${dateJoin[
                  i
                ][1].substring(10, 12)})`
              );
            }
          }
        }

        dateJoinToString.forEach((item) => {
          if (countDateJoin[item]) {
            countDateJoin[item]++;
          } else {
            countDateJoin[item] = 1;
          }
        });
        // console.log(dateJoinToString, 'data join to string');
        console.log(countDateJoin, 'count data join');
        let printDateJoin = Object.keys(countDateJoin);
        setDropdownDate(printDateJoin);
      })
      .catch((err) => console.log(err));
  }

  // prem
  // async function getDropdownFromDate() {
  //   let bodyParam = {};
  //   let dropdownFromDateQuery = [];
  //   let dropdownToDateQuery = [];
  //   let countFrom = {};
  //   let countTo = {};
  //   bodyParam['premium_query'] = localStorage.query;
  //   await axios
  //     .post(url_twitter_premium + '/get-dropdown-query-date', bodyParam)
  //     .then((res) => {
  //       // console.log(res, 'res');
  //       // console.log(res.data.value, 'res.data.value');
  //       for (let i = 0; i < res.data.value.length; i++) {
  //         dropdownFromDateQuery.push(res.data.value[i]._source.fromDate);
  //         dropdownToDateQuery.push(res.data.value[i]._source.toDate);
  //       }

  //       dropdownFromDateQuery.forEach((item) => {
  //         var str = item;
  //         var year = str.substring(0, 4);
  //         var month = str.substring(4, 6);
  //         var day = str.substring(6, 8);
  //         var hour = str.substring(8, 10);
  //         var minute = str.substring(10, 12);
  //         var date =
  //           day +
  //           '-' +
  //           month +
  //           '-' +
  //           year +
  //           ' ' +
  //           '|' +
  //           ' ' +
  //           '(' +
  //           hour +
  //           ':' +
  //           minute +
  //           ')';
  //         // console.log(date, 'tanggal fd');
  //         // console.log(item, 'ITEM fd');
  //         if (countFrom[date]) {
  //           countFrom[date]++;
  //         } else {
  //           countFrom[date] = 1;
  //         }
  //       });
  //       dropdownToDateQuery.forEach((item) => {
  //         var str = item;
  //         var year = str.substring(0, 4);
  //         var month = str.substring(4, 6);
  //         var day = str.substring(6, 8);
  //         var hour = str.substring(8, 10);
  //         var minute = str.substring(10, 12);
  //         var date =
  //           day +
  //           '-' +
  //           month +
  //           '-' +
  //           year +
  //           ' ' +
  //           '|' +
  //           ' ' +
  //           '(' +
  //           hour +
  //           ':' +
  //           minute +
  //           ')';
  //         // console.log(date, 'tangga td');
  //         // console.log(item, 'ITEM td');
  //         if (countTo[date]) {
  //           countTo[date]++;
  //         } else {
  //           countTo[date] = 1;
  //         }
  //       });
  //       var ddfd = Object.keys(countFrom);
  //       var ddtd = Object.keys(countTo);
  //       // console.log(ddfd, "test")
  //       console.log(ddfd, 'test fd');
  //       console.log(ddtd, 'test td');

  //       console.log(countFrom, 'cf');
  //       console.log(countTo, 'ct');

  //       console.log(dropdownFromDateQuery, 'fd query');
  //       console.log(dropdownToDateQuery, 'td query');

  //       let result = [];

  //       for (var i = 0; i < ddfd.length; i++) {
  //         result[i] = ddfd[i] + ' ' + 'to' + ' ' + ddtd[i];
  //       }

  //       setDropdownDate(result);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // console.log(dropdownDate, 'dropdownDate');

  // async function getDropdownToDate (){
  //   let bodyParam = {};
  //   let dropdownToDateQuery = [];
  //   let count = {};
  //   bodyParam['premium_query'] = localStorage.query;
  //   await axios.post(url_twitter_premium + '/get-dropdown-query-date',bodyParam)
  //   .then((res) => {
  //       console.log(res,"res")
  //       for (let i=0; i< res.data.value.length; i++) {
  //         dropdownToDateQuery.push(res.data.value[i]._source.toDate)
  //       }
  //       dropdownToDateQuery.forEach(item => {
  //           if(count[item]){
  //               count[item]++;
  //           }else{
  //               count[item] = 1
  //           }
  //       })
  //     var ddtd = Object.keys(count)
  //     console.log("TO DATEEEEE",ddtd)
  //     setDropdownToDate(ddtd)
  //   })
  //   .catch(err => console.log(err));
  // };

  // prem
  async function getTablePositive(daerah) {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    bodyParam['region_code'] = daerah !== '' ? daerah : '';
    axios
      .post(url_twitter_premium + '/get-table-positive-prem', bodyParam)
      .then((res) => {
        setListTablePositive(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  // prem
  async function getTableNeutral(daerah) {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    bodyParam['region_code'] = daerah !== '' ? daerah : '';

    axios
      .post(url_twitter_premium + '/get-table-neutral-prem', bodyParam)
      .then((res) => {
        setListTableNeutral(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  // prem
  async function getTableNegative(daerah) {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    bodyParam['region_code'] = daerah !== '' ? daerah : '';

    axios
      .post(url_twitter_premium + '/get-table-negative-prem', bodyParam)
      .then((res) => {
        setListTableNegative(res.data.value);
      })
      .catch((err) => console.log(err));
  }

  function getDateFormat(value) {
    let year = value.slice(0, 4);
    let month = value.slice(5, 7);
    let day = value.slice(8, 10);
    let jam = value.slice(11, 16);
    let result = day + '/' + month + '/' + year + ' | ' + jam;
    return result;
  }

  const handleStartCrawling = (e) => {
    e.preventDefault();
    getSearchPremium();
    setLoading(true);
    localStorage.setItem('query', query);
    localStorage.setItem('startDate', start_date);
    localStorage.setItem('endDate', end_date);
  };

  const resetHandler = (e) => {
    setDataReady(false);
    e.preventDefault();
    setQuery('');
    localStorage.setItem('query', '');
    localStorage.setItem('startDate', '');
    localStorage.setItem('endDate', '');
    localStorage.setItem('stringDate', '');
    setValueDropdownDaerah('');
    setValueDropdownSentiment('');
    setPayload([]);
  };

  const renderMap = () => {
    return geojson.features.map((d) => {
      for (let i = 0; i < listValueOfMap.length; i++) {
        if (listValueOfMap[i].key.match(d.properties.iso_3166_2)) {
          if (listValueOfMap[i].doc_count > 100) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill={
                  valueFropdownSentiment === 'Positive'
                    ? '#46490F'
                    : valueFropdownSentiment === 'Negative'
                    ? '#A52028'
                    : '#132947'
                }
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#000')
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
                  setRegion(d.properties.iso_3166_2);
                  handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr(
                    'fill',
                    valueFropdownSentiment === 'Positive'
                      ? '#46490F'
                      : valueFropdownSentiment === 'Negative'
                      ? '#A52028'
                      : '#132947'
                  );
                }}
              />
            );
          }
          if (
            listValueOfMap[i].doc_count > 30 &&
            listValueOfMap[i].doc_count < 99
          ) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill={
                  valueFropdownSentiment === 'Positive'
                    ? '#F0F3B9'
                    : valueFropdownSentiment === 'Negative'
                    ? '#E1848A'
                    : '#3A7BD5'
                }
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#000')
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
                  setRegion(d.properties.iso_3166_2);
                  handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr(
                    'fill',
                    valueFropdownSentiment === 'Positive'
                      ? '#F0F3B9'
                      : valueFropdownSentiment === 'Negative'
                      ? '#E1848A'
                      : '#3A7BD5'
                  );
                }}
              />
            );
          }
          if (
            listValueOfMap[i].doc_count > 0 &&
            listValueOfMap[i].doc_count < 30
          ) {
            return (
              <path
                key={d.properties.Name}
                d={path(d)}
                fill={
                  valueFropdownSentiment === 'Positive'
                    ? '#F0F3B9'
                    : valueFropdownSentiment === 'Negative'
                    ? '#F6CFD2'
                    : '#BDD3F1'
                }
                stroke='#0e1724'
                strokeWidth='1'
                strokeOpacity='0.5'
                onMouseEnter={(e) => {
                  select(e.target)
                    .attr('fill', '#000')
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
                  setRegion(d.properties.iso_3166_2);
                  handleChangeDaerahmap(d.properties.iso_3166_2);
                }}
                onMouseOut={(e) => {
                  select(e.target).attr(
                    'fill',
                    valueFropdownSentiment === 'Positive'
                      ? '#F0F3B9'
                      : valueFropdownSentiment === 'Negative'
                      ? '#F6CFD2'
                      : '#BDD3F1'
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
            setRegion(d.properties.iso_3166_2);
            handleChangeDaerahmap(d.properties.iso_3166_2);
          }}
          onMouseEnter={(e) => {
            select(e.target)
              .attr('fill', '#000')
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

  // console.log(isFetched, 'isFetched');
  // console.log(dataReady, 'dataReady');

  // prem
  async function getSearchPremium() {
    let bodyParam = {};
    bodyParam['query'] = query ? query : '';
    bodyParam['fromDate'] = start_date ? start_date : '';
    bodyParam['toDate'] = end_date ? end_date : '';
    await axios
      .post('http://192.168.90.31:9000/get_twitter_premium_data', bodyParam)
      .then(function (response) {
        setLoading(true);
        if (response.data === 'Success') {
          // console.log('ini response');
          // console.log(response.data, 'response');
          setTimeout(() => {
            window.location.reload();
            // console.log('Success');
          }, 2000);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data has been fetched',
          });
          // setIsFetched(true);
          // console.log(dataReady);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.data}`,
          });
          setTimeout(() => {
            window.location.reload();
          }, 6000);
          localStorage.setItem('query', '');
          localStorage.setItem('startDate', '');
          localStorage.setItem('endDate', '');
          // setDataReady(false);

          // console.log('gagal');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setLoading(false);
  }

  // prem
  async function deleteDataPremium() {
    let bodyParam = {};
    bodyParam['query'] = localStorage.getItem('query');
    bodyParam['fromDate'] = localStorage.getItem('startDate');
    bodyParam['toDate'] = localStorage.getItem('endDate');
    await axios
      .post('http://192.168.90.31:9000/delete_by_query', bodyParam)
      .then(function (response) {
        setLoading(true);
        if (response.data > 0) {
          setTimeout(() => {
            localStorage.setItem('startDate', '');
            localStorage.setItem('endDate', '');
            window.location.reload();
            // console.log('Success');
          }, 2000);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `${response.data} Data has been deleted`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have to select Historical Date first!',
            // text: `${response.data}`,
          });
          setTimeout(() => {
            window.location.reload();
          }, 4000);
          // localStorage.setItem('query', '');
          // localStorage.setItem('startDate', '');
          // localStorage.setItem('endDate', '');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setLoading(false);
  }

  const handleDeleteData = (e) => {
    e.preventDefault();
    deleteDataPremium();
  };

  // prem
  async function getSentimentCount() {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    await axios
      .post(url_twitter_premium + '/get-count-sentiment-prem', bodyParam)
      .then((res) => {
        // console.log(res.data, 'here');
        if (res.data.value !== null) {
          setCountSentiment(res.data.value);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  // prem
  async function getGenderCount() {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    await axios
      .post(url_twitter_premium + '/get-count-gender-prem', bodyParam)
      .then((res) => {
        if (res.data.value !== null) {
          setCountGender(res.data.value);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  // prem
  async function getLocationOfMap(daerah, sentiment) {
    let bodyParam = {};
    bodyParam['premium_query'] = localStorage.query;
    bodyParam['fromDate'] = localStorage.startDate;
    bodyParam['toDate'] = localStorage.endDate;
    bodyParam['sentiment'] = sentiment ? sentiment : null;
    bodyParam['region_code'] = daerah ? daerah : null;
    await axios
      .post(url_twitter_premium + '/get-location-prem', bodyParam)
      .then((res) => {
        if (res.data.value !== null) {
          setValueOfMap(res.data.value);
        }
      })
      .catch((err) => console.log(err, '<<<<???'));
    setLoading(false);
  }

  const renderWord = () => {
    let array = [];
    let arrayText = [];
    let arrayValue = [];
    let dataGabunganTextValue = [];
    let result = [];
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
      for (var i = 0; i <= valueWord; i++) {
        var objTop10 = {};
        objTop10['text'] = ab[i].text;
        objTop10['value'] = ab[i].value;
        result.push(objTop10);
      }
    }

    return (
      <WordCloudTwitter
        data={result}
        valueWord={valueWord}
        sentiment={sentiment}
      />
    );
  };

  const renderDataTableNetral = () => {
    return listTableNeutral.map((value, index) => {
      return (
        <TableNetralPremium
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
        <TablePositifPremium
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
        <TableNegatifPremium
          key={index}
          username={value._source.user_screenname}
          tweet={value._source.body}
          location={value._source.fixed_location}
          retweet={value._source.total_attraction}
        />
      );
    });
  };

  const handleChangeDropdown = (e) => {
    localStorage.setItem('query', e.target.value);
    localStorage.setItem('endDate', '');
    localStorage.setItem('startDate', '');
    window.location.reload();
  };

  const handleChangeDropdownDate = (e) => {
    if (e.target.value === '') {
      localStorage.setItem('stringDate', '');
      localStorage.setItem('startDate', '');
      localStorage.setItem('endDate', '');
      window.location.reload();
    } else {
      let datePick = Array(e.target.value);
      let newDate = datePick[0].split(' to ');
      let dateString = [];
      newDate.map((i) => {
        let newItem = i.split(' | ');
        let dateStr = newItem[0].split('-');
        let timeStr = newItem[1]
          .split('(')[1]
          .split(')')[0]
          .split(':')
          .join('');
        let newFormat = `${dateStr[2]}${dateStr[1]}${dateStr[0]}${timeStr}`;
        return dateString.push(newFormat);
      });

      localStorage.setItem('startDate', dateString[0]);
      localStorage.setItem('endDate', dateString[1]);
      localStorage.setItem('stringDate', e.target.value);
      window.location.reload();
    }
  };

  const handleChangeValueWord = (e) => {
    setValueWord(e.target.value);
  };

  const handleChangeSentiment = (e) => {
    setValueDropdownSentiment(e.target.value);
    getSourceOfIndex(valueFropdownDaerah, e.target.value);
    getLocationOfMap(e.target.value);
  };

  const handleChangeDaerahmap = (e) => {
    setValueDropdownDaerah(e);
    getSourceOfIndex(e, valueFropdownSentiment);
    getTablePositive(e);
    getTableNeutral(e);
    getTableNegative(e);
    getLocationOfMap(e, valueFropdownSentiment);
    getSentimentCount(e);
    getGenderCount(e);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    // localStorage.removeItem('token');
    localStorage.clear();
    // localStorage.setItem('query', '');
    // localStorage.setItem('startDate', '');
    // localStorage.setItem('endDate', '');
    props.history.push('/login');
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'You are loged out',
    });
  };

  if (valueFropdownMedia === 'news') history.push('/news');

  if (checked === false) history.push('/');

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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position='absolute'
        style={{ backgroundColor: '#fafafa', padding: '15px' }}
        elevation={0}
        title={<img src={kemkes} alt='logo' />}
      >
        <Toolbar>
          <Grid container spacing={4}>
            <Grid item sm={1}>
              <img src={kemkes} alt='logo' className={classes.logo} />
            </Grid>
            <Grid item sm={8}>
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
                    "Keyword Search"
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
                    title='Guide Twitter Premium'
                    label=' i '
                    component='a'
                    color='warning'
                    href='/kemkes#/guide-twitter-prm'
                    target='_blank'
                    variant='outlined'
                    clickable
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={1}>
              <div></div>
            </Grid>
            <Grid item sm={1}>
              <p
                style={{
                  color: '#fafafa',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                }}
              >
                Premium
              </p>
              <div>
                <p
                  style={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    marginLeft: '-75px',
                    marginTop: '15%',
                  }}
                >
                  Premium{' '}
                  <Switch
                    checked={checked}
                    onChange={handleToogle}
                    defaultChecked
                  />
                </p>
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
      </AppBar>

      {/* Set-Bar */}
      <Grid
        container
        style={{ marginTop: 120, paddingLeft: 62, paddingRight: 62 }}
        spacing={5}
      >
        {/* Twitter / News Option */}
        <Grid item sm={2} style={{ padding: 10 }}>
          <Form.Select
            value={valueFropdownMedia}
            onChange={(e) => setValueDropdownMedia(e.target.value)}
            size='md'
          >
            <option>Twitter</option>
            <option value='news'>News</option>
          </Form.Select>
        </Grid>

        {/* Input Search */}
        <Grid item sm={2} style={{ padding: 10 }}>
          <Form.Control
            type='textField'
            placeholder={
              localStorage.query === '' ? 'Search..' : localStorage.query
            }
            // value={localStorage.query}
            onChange={(e) => {
              setQuery(e.target.value);
              // localStorage.setItem('query', e.target.value);
            }}
          />
        </Grid>

        {/* Start-Date */}
        <Grid item sm={1} style={{ padding: 10, marginTop: '-10px' }}>
          <MuiPickersUtilsProvider utils={DateMomentsUtils}>
            <DateTimePicker
              autoOk
              ampm={false}
              disableFuture
              startDate={startDate}
              value={startDate}
              onChange={(startDate) => {
                setStartDate(startDate);
                localStorage.setItem('startDate', startDate);
              }}
              onAccept={(startDate) => {
                setStartDate(startDate);
                localStorage.setItem('startDate', startDate);
              }}
              // maxDate= {new Date(Date.now() + 12096e5)}
              maxDate={new Date()}
              minDate={new Date() - 24912e5}
              label='Start Date'
            />
          </MuiPickersUtilsProvider>
        </Grid>

        {/* End-Date */}
        <Grid
          item
          sm={1}
          style={{ padding: 10, marginTop: '-10px', marginLeft: '20px' }}
        >
          <MuiPickersUtilsProvider utils={DateMomentsUtils}>
            {/* <DateTimePicker value={startDate} onChange={setStartDate} /> */}
            <DateTimePicker
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
        </Grid>

        {/* Button Reset */}
        <Grid item sm={0.5} style={{ padding: 10 }}>
          <Button
            onClick={(e) => {
              setStartDate();
              setEndDate();
              resetHandler(e);
            }}
            variant='text'
            style={{ marginLeft: '45px', marginTop: '3px' }}
          >
            X
          </Button>
        </Grid>

        {/* Button Search */}
        <Grid item sm={0.5} style={{ padding: 10 }}>
          <Button onClick={handleStartCrawling} variant='contained'>
            <SearchIcon />
          </Button>
        </Grid>

        {/* Keyword Information */}
        <Grid item sm={2} style={{ padding: 10 }}>
          {valueFropdownTopik !== '' ? (
            <Form.Control
              type='text'
              placeholder={'Keyword : ' + keyWord}
              readOnly
            />
          ) : (
            <Form.Control type='text' placeholder='Keyword : All' readOnly />
          )}
        </Grid>

        {/* Last Updated Information */}
        <Grid item sm={2} style={{ padding: 10 }}>
          <Form.Select
            size='md'
            onChange={handleChangeDropdown}
            value={localStorage.getItem('query')}
          >
            <option value=''>Historical Search</option>
            {dropdown.map((data) => {
              return <option value={data}>{data}</option>;
            })}
          </Form.Select>
        </Grid>
        <Grid item sm={0.5} style={{ padding: 10 }}>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={handleDeleteData}
            // onClick={(e) => handleDeleteDropdown(option)}
          >
            <DeleteIcon
              style={{
                fontSize: '40px',
                marginLeft: '-20px',
                marginTop: '-12px',
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {/* INI PENTING */}
      <div>
        {localStorage.getItem('query') === null ||
        localStorage.getItem('query') === '' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <img
              src={searchNotYet}
              alt='DataNotFound'
              style={{
                marginTop: 20,
                paddingLeft: 48,
                paddingRight: 48,
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </div>
        ) : (
          <div>
            {/* Line 1  */}

            <Grid
              container
              justify='center'
              style={{ marginTop: 20, paddingLeft: 48, paddingRight: 48 }}
              spacing={3}
            >
              {/* Map Indonesia Tweet Activity & Work Cloud */}
              <Grid item sm={12}>
                <Card className={classes.rootCard}>
                  <Grid container spacing={5}>
                    <Grid item xs={3} md={4} style={{ marginTop: '20px' }}>
                      <span
                        style={{
                          marginLeft: '10px',
                          fontWeight: 'bold',
                          fontSize: '20px',
                          margin: 20,
                          fontFamily: 'Poppins',
                        }}
                      >
                        Tweet Activity {'&'} Word Cloud
                      </span>
                    </Grid>
                    <Grid item xs={1} md={4} style={{ marginTop: '20px' }}>
                      {region === '' ? (
                        <div>
                          <Button
                            id='fade-button'
                            onClick={handleClick}
                            style={{
                              border: '2px solid #F5F5F5',
                              borderRadius: '100px / 90px',
                              height: '38px',
                            }}
                          >
                            <div style={{ color: '#D2DC2E' }}>
                              <Rank
                                color={
                                  valueFropdownSentiment === 'Positive'
                                    ? 'red[500]'
                                    : valueFropdownSentiment === 'Negative'
                                    ? 'secondary'
                                    : 'primary'
                                }
                                style={{ fontSize: 30 }}
                              />
                            </div>
                          </Button>
                          <Menu
                            style={{
                              left: '-170px',
                              marginTop: '20px',
                              borderRadius: '30px',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                          >
                            {listValueOfMap.length < 6 ? (
                              <div style={{ width: '220px', padding: '10px' }}>
                                <span
                                  style={{ font: 'Poppins', fontSize: '17px' }}
                                >
                                  Sentiment Rank
                                </span>
                                <CloseIcon
                                  style={{ marginLeft: '40px' }}
                                  onClick={handleClose}
                                ></CloseIcon>
                                <br /> <br />
                                {listValueOfMap.map((x) => (
                                  <tr key={x}>
                                    <Grid
                                      container
                                      justify='center'
                                      spacing={2}
                                    >
                                      <Grid item sm={9}>
                                        <td>
                                          {
                                            regionCode.filter(
                                              (st) => st.value === x.key
                                            )[0].label
                                          }
                                        </td>
                                      </Grid>
                                      <br />
                                      <br />
                                      <br />
                                      <Grid item sm={3}>
                                        <td>
                                          <span
                                            style={{
                                              marginLeft: '25px',
                                              fontSize: '17px',
                                              padding: '5px',
                                              color:
                                                valueFropdownSentiment ===
                                                'Positive'
                                                  ? 'black'
                                                  : valueFropdownSentiment ===
                                                    'Negative'
                                                  ? 'black'
                                                  : 'white',
                                              border: '1px solid black',
                                              borderRadius: '20px',
                                              backgroundColor:
                                                valueFropdownSentiment ===
                                                'Positive'
                                                  ? '#F0F4AC'
                                                  : valueFropdownSentiment ===
                                                    'Negative'
                                                  ? '#F6CFD2'
                                                  : '#3A6EA5',
                                            }}
                                          >
                                            {x.doc_count ? x.doc_count : 0}{' '}
                                          </span>
                                        </td>
                                      </Grid>
                                    </Grid>
                                  </tr>
                                ))}
                              </div>
                            ) : (
                              <div style={{ width: '300px', padding: '10px' }}>
                                <span
                                  style={{ font: 'Poppins', fontSize: '17px' }}
                                >
                                  Sentiment Rank
                                </span>
                                <CloseIcon
                                  style={{ marginLeft: '120px' }}
                                  onClick={handleClose}
                                ></CloseIcon>
                                <br /> <br />
                                <Grid container justify='center' spacing={2}>
                                  <Grid item sm={7}>
                                    <td>
                                      <span style={{ fontSize: '17px' }}>
                                        1.{' '}
                                        {
                                          regionCode.filter(
                                            (st) =>
                                              st.value === listValueOfMap[0].key
                                          )[0].label
                                        }
                                      </span>
                                    </td>
                                  </Grid>
                                  <br />
                                  <br />
                                  <Grid item sm={5}>
                                    <td>
                                      {' '}
                                      <span
                                        style={{
                                          marginLeft: '20px',
                                          fontSize: '17px',
                                          padding: '5px',
                                          color:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? 'black'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? 'black'
                                              : 'white',
                                          border: '1px solid black',
                                          borderRadius: '20px',
                                          backgroundColor:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? '#F0F4AC'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? '#F6CFD2'
                                              : '#3A6EA5',
                                        }}
                                      >
                                        {listValueOfMap[0].doc_count
                                          ? listValueOfMap[0].doc_count
                                          : 0}{' '}
                                      </span>
                                    </td>
                                  </Grid>
                                  <Grid item sm={7}>
                                    <td>
                                      <span style={{ fontSize: '17px' }}>
                                        2.{' '}
                                        {
                                          regionCode.filter(
                                            (st) =>
                                              st.value === listValueOfMap[1].key
                                          )[0].label
                                        }
                                      </span>
                                    </td>
                                  </Grid>
                                  <br />
                                  <br />
                                  <Grid item sm={5}>
                                    <td>
                                      {' '}
                                      <span
                                        style={{
                                          marginLeft: '20px',
                                          fontSize: '17px',
                                          padding: '5px',
                                          color:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? 'black'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? 'black'
                                              : 'white',
                                          border: '1px solid black',
                                          borderRadius: '20px',
                                          backgroundColor:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? '#F0F4AC'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? '#F6CFD2'
                                              : '#3A6EA5',
                                        }}
                                      >
                                        {listValueOfMap[1].doc_count
                                          ? listValueOfMap[1].doc_count
                                          : 0}{' '}
                                      </span>
                                    </td>
                                  </Grid>
                                  <Grid item sm={7}>
                                    <td>
                                      <span style={{ fontSize: '17px' }}>
                                        3.{' '}
                                        {
                                          regionCode.filter(
                                            (st) =>
                                              st.value === listValueOfMap[2].key
                                          )[0].label
                                        }
                                      </span>
                                    </td>
                                  </Grid>
                                  <br />
                                  <br />
                                  <Grid item sm={5}>
                                    <td>
                                      {' '}
                                      <span
                                        style={{
                                          marginLeft: '20px',
                                          fontSize: '17px',
                                          padding: '5px',
                                          color:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? 'black'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? 'black'
                                              : 'white',
                                          border: '1px solid black',
                                          borderRadius: '20px',
                                          backgroundColor:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? '#F0F4AC'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? '#F6CFD2'
                                              : '#3A6EA5',
                                        }}
                                      >
                                        {listValueOfMap[2].doc_count
                                          ? listValueOfMap[2].doc_count
                                          : 0}{' '}
                                      </span>
                                    </td>
                                  </Grid>
                                  <Grid item sm={7}>
                                    <td>
                                      <span style={{ fontSize: '17px' }}>
                                        4.{' '}
                                        {
                                          regionCode.filter(
                                            (st) =>
                                              st.value === listValueOfMap[3].key
                                          )[0].label
                                        }
                                      </span>
                                    </td>
                                  </Grid>
                                  <br />
                                  <br />
                                  <Grid item sm={5}>
                                    <td>
                                      {' '}
                                      <span
                                        style={{
                                          marginLeft: '20px',
                                          fontSize: '17px',
                                          padding: '5px',
                                          color:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? 'black'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? 'black'
                                              : 'white',
                                          border: '1px solid black',
                                          borderRadius: '20px',
                                          backgroundColor:
                                            valueFropdownSentiment ===
                                            'Positive'
                                              ? '#F0F4AC'
                                              : valueFropdownSentiment ===
                                                'Negative'
                                              ? '#F6CFD2'
                                              : '#3A6EA5',
                                        }}
                                      >
                                        {listValueOfMap[3].doc_count
                                          ? listValueOfMap[3].doc_count
                                          : 0}{' '}
                                      </span>
                                    </td>
                                  </Grid>
                                </Grid>
                              </div>
                            )}
                          </Menu>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                    <Grid item xs={2} md={4} style={{ marginTop: '20px' }}>
                      {
                        <Form.Control
                          type='text'
                          style={{
                            width: '150px',
                            marginLeft: '20px',
                            position: 'absolute',
                          }}
                          placeholder={
                            'Total Tweet: ' +
                            ((countSentiment[0]
                              ? countSentiment[0].doc_count
                              : 0) +
                              (countSentiment[1]
                                ? countSentiment[1].doc_count
                                : 0) +
                              (countSentiment[2]
                                ? countSentiment[2].doc_count
                                : 0) +
                              (countSentiment[3]
                                ? countSentiment[3].doc_count
                                : 0))
                          }
                          readOnly
                        />
                      }
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      md={4}
                      value={valueFropdownSentiment}
                      onChange={handleChangeSentiment}
                      style={{ marginTop: '20px' }}
                    >
                      <Form.Select
                        defaultValue={valueFropdownSentiment}
                        style={{
                          width: '150px',
                          position: 'absolute',
                        }}
                      >
                        <option value=''>Semua Tweet</option>
                        <option value='Positive'>Positif</option>
                        <option value='Negative'>Negatif</option>
                      </Form.Select>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      md={4}
                      style={{ marginTop: '20px', marginLeft: '-20px' }}
                    >
                      <Grid
                        style={{
                          fontWeight: 'bold',
                          // marginLeft: '-80px',
                          width: '160px',
                          position: 'absolute',
                        }}
                      >
                        <Form.Select size='md' onChange={handleChangeValueWord}>
                          <option value='5'>Key Word : 5</option>
                          <option value='10'>Key Word : 10</option>
                          <option value='20'>Key word {'>'} 15</option>
                        </Form.Select>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      md={4}
                      style={{ marginTop: '20px', marginLeft: '-20px' }}
                    >
                      <Grid
                        style={{
                          fontWeight: 'bold',
                          // marginLeft: '-80px',
                          width: '260px',
                          position: 'absolute',
                        }}
                      >
                        <Form.Select
                          size='md'
                          style={{ width: '380px' }}
                          onChange={handleChangeDropdownDate}
                          value={localStorage.getItem('stringDate')}
                        >
                          <option value=''>Historical Date</option>
                          {dropdownDate.map((data) => {
                            return <option value={data}>{data}</option>;
                          })}
                        </Form.Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ marginTop: '-50px' }}>
                    <Grid item xs={6}>
                      <div
                        style={{
                          height: '330px',
                          paddingBottom: 5,
                          marginTop: '20px',
                        }}
                      >
                        <svg
                          width='1000px'
                          height='100%'
                          style={{ marginLeft: '20px' }}
                        >
                          <g className='geojson-layer'>{renderMap()}</g>
                        </svg>
                      </div>
                      <Row style={{ marginLeft: '20px' }}>
                        <Col xs={3} style={{ marginTop: '-20px' }}>
                          <i
                            className={classes.legendBox}
                            style={{
                              background:
                                valueFropdownSentiment === 'Positive'
                                  ? '#46490F'
                                  : valueFropdownSentiment === 'Negative'
                                  ? '#A52028'
                                  : '#132947',
                            }}
                          />
                          <span
                            style={{ marginLeft: '25px', fontSize: '16px' }}
                          >
                            Ramai : &gt; 100
                          </span>
                        </Col>
                        <Col xs={3} style={{ marginTop: '-20px' }}>
                          <i
                            className={classes.legendBox}
                            style={{
                              background:
                                valueFropdownSentiment === 'Positive'
                                  ? '#D2DC2E'
                                  : valueFropdownSentiment === 'Negative'
                                  ? '#E1848A'
                                  : '#3A7BD5',
                            }}
                          />
                          <span
                            style={{ marginLeft: '25px', fontSize: '16px' }}
                          >
                            Cukup : &lt; 50
                          </span>
                          <br />
                        </Col>
                        <Col xs={3} style={{ marginTop: '-20px' }}>
                          <i
                            className={classes.legendBox}
                            style={{
                              background:
                                valueFropdownSentiment === 'Positive'
                                  ? '#F0F3B9'
                                  : valueFropdownSentiment === 'Negative'
                                  ? '#F6CFD2'
                                  : '#BDD3F1',
                            }}
                          />
                          <span
                            style={{ marginLeft: '25px', fontSize: '16px' }}
                          >
                            sepi : &lt; 25
                          </span>
                          <br />
                        </Col>
                        <Col
                          xs={3}
                          style={{ marginTop: '-20px', marginLef: '' }}
                        >
                          <i
                            className={classes.legendBox}
                            style={{
                              background: '#D3D2DC',
                              marginLeft: '-15px',
                            }}
                          />
                          <span style={{ marginLeft: '5px', fontSize: '16px' }}>
                            undefined :{' '}
                            {listValueOfMap.length
                              ? listValueOfMap[0].doc_count
                              : 0}{' '}
                          </span>
                        </Col>
                      </Row>
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: '20px' }}>
                      {renderWord()}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            {/* Line 2 */}

            <Grid
              container
              justify='center'
              spacing={2}
              style={{ marginTop: 50, paddingLeft: 48, paddingRight: 48 }}
            >
              {/* Sentimen */}
              <Grid item sm={6}>
                <Card className={classes.rootCard}>
                  <PieSentimen
                    positif={
                      countSentiment[2] ? countSentiment[2].doc_count : 0
                    }
                    negatif={
                      countSentiment[1] ? countSentiment[1].doc_count : 0
                    }
                    netral={
                      (countSentiment[0] ? countSentiment[0].doc_count : 0) +
                      (countSentiment[3] ? countSentiment[3].doc_count : 0)
                    }
                  />

                  <Col
                    xs={2}
                    style={{
                      marginLeft: '55%',
                      width: '25%',
                      marginTop: '-230px',
                    }}
                  >
                    <div>
                      <i
                        className={classes.legendBox}
                        style={{
                          background: 'rgb(210, 220, 46)',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: 'rgb(210, 220, 46)',
                        }}
                      >
                        Positive
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countSentiment[2]
                            ? countSentiment[2].doc_count
                            : 0) /
                            ((countSentiment[2]
                              ? countSentiment[2].doc_count
                              : 0) +
                              (countSentiment[1]
                                ? countSentiment[1].doc_count
                                : 0) +
                              (countSentiment[0]
                                ? countSentiment[0].doc_count
                                : 0 + countSentiment[3]
                                ? countSentiment[3].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br />
                      <br />
                      <i
                        className={classes.legendBox}
                        style={{
                          background: 'rgb(190, 7, 18)',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: 'rgb(190, 7, 18)',
                        }}
                      >
                        Negative
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countSentiment[1]
                            ? countSentiment[1].doc_count
                            : 0) /
                            ((countSentiment[2]
                              ? countSentiment[2].doc_count
                              : 0) +
                              (countSentiment[1]
                                ? countSentiment[1].doc_count
                                : 0) +
                              (countSentiment[0]
                                ? countSentiment[0].doc_count
                                : 0 + countSentiment[3]
                                ? countSentiment[3].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br />
                      <br />
                      <i
                        className={classes.legendBox}
                        style={{
                          background: 'rgb(177, 175, 205)',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: 'rgb(177, 175, 205)',
                        }}
                      >
                        Neutral
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countSentiment[0]
                            ? countSentiment[0].doc_count
                            : 0 + countSentiment[3]
                            ? countSentiment[3].doc_count
                            : 0) /
                            ((countSentiment[2]
                              ? countSentiment[2].doc_count
                              : 0) +
                              (countSentiment[1]
                                ? countSentiment[1].doc_count
                                : 0) +
                              (countSentiment[0]
                                ? countSentiment[0].doc_count
                                : 0 + countSentiment[3]
                                ? countSentiment[3].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br /> <br />
                    </div>
                  </Col>
                </Card>
              </Grid>

              {/* Gender */}
              <Grid item sm={6}>
                <Card className={classes.rootCard}>
                  <PieGender
                    laki={countGender[2] ? countGender[2].doc_count : 0}
                    perempuan={countGender[1] ? countGender[1].doc_count : 0}
                    unknown={countGender[0] ? countGender[0].doc_count : 0}
                  />
                  <Col
                    xs={2}
                    style={{
                      marginLeft: '55%',
                      width: '25%',
                      marginTop: '-230px',
                    }}
                  >
                    <div>
                      <i
                        className={classes.legendBox}
                        style={{
                          background: '#3190FF',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: '#3190FF',
                        }}
                      >
                        Laki-laki
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countGender[2] ? countGender[2].doc_count : 0) /
                            ((countGender[2] ? countGender[2].doc_count : 0) +
                              (countGender[1] ? countGender[1].doc_count : 0) +
                              (countGender[0]
                                ? countGender[0].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br /> <br />
                      <i
                        className={classes.legendBox}
                        style={{
                          background: '#EB47B3',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: '#EB47B3',
                        }}
                      >
                        Perempuan
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countGender[1] ? countGender[1].doc_count : 0) /
                            ((countGender[2] ? countGender[2].doc_count : 0) +
                              (countGender[1] ? countGender[1].doc_count : 0) +
                              (countGender[0]
                                ? countGender[0].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br /> <br />
                      <i
                        className={classes.legendBox}
                        style={{
                          background: '#B1AFCD',
                        }}
                      />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '17px',
                          color: '#B1AFCD',
                        }}
                      >
                        Undefined
                      </span>
                      <br />
                      <span
                        style={{
                          marginLeft: '25px',
                          fontSize: '22px',
                          color: 'black',
                        }}
                      >
                        {(
                          ((countGender[0] ? countGender[0].doc_count : 0) /
                            ((countGender[2] ? countGender[2].doc_count : 0) +
                              (countGender[1] ? countGender[1].doc_count : 0) +
                              (countGender[0]
                                ? countGender[0].doc_count
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      <br /> <br />
                    </div>
                  </Col>
                </Card>
              </Grid>
            </Grid>

            {/* Line 3  */}

            <Grid
              container
              justify='center'
              spacing={5}
              style={{ marginTop: 50, paddingLeft: 48, paddingRight: 48 }}
            >
              {/* Sentimen Positif */}
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
                      <Table
                        sx={{ width: '100%' }}
                        aria-label='customized table'
                      >
                        <TableHeader />
                        {renderDataTablePositif()}
                      </Table>
                    </TableContainer>
                  </Paper>
                </Card>
              </Grid>

              {/* Sentimen Netral */}
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
                      <Table
                        sx={{ width: '100%' }}
                        aria-label='customized table'
                      >
                        <TableHeader />
                        {renderDataTableNetral()}
                      </Table>
                    </TableContainer>
                  </Paper>
                </Card>
              </Grid>

              {/* Sentimen Negatif */}
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
                      <Table
                        sx={{ width: '100%' }}
                        aria-label='customized table'
                      >
                        <TableHeader />
                        {renderDataTableNegatif()}
                      </Table>
                    </TableContainer>
                  </Paper>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
