import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles, styled } from '@material-ui/core/styles';

// import { Table } from 'react-bootstrap';
import kemkes from '../images/logo_kemenkes baru.png';
import './user.css';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
} from '@material-ui/core';
import { url_profile } from '../helper/ServiceUrlAPI';
import BarSummaryVertical from '../component/bar/BarSummaryVertical';
import ReactLoading from 'react-loading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //   marginTop: theme.spacing(3),
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: '5px 5px',
    maxWidth: 1100,
    borderRadius: 20,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#35bbb3',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  body: {
    fontSize: 18,
  },
  highlightWordSeparator: {
    fontSize: 18,
  },
  Positive: {
    fontWeight: 'normal',
    color: '#000000',
    fontSize: 18,
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '3px',
    paddingRight: '3px',
    alignSelf: 'center',
    backgroundColor: '#D2DC2E',
  },
  Negative: {
    fontWeight: 'normal',
    color: '#fff',
    fontSize: 18,
    paddingTop: '3px',
    paddingBottom: '3px',
    paddingLeft: '3px',
    paddingRight: '3px',
    alignSelf: 'center',
    backgroundColor: '#BE0712',
  },
  totalAttraction: {
    fontSize: 16,
    textAlign: 'center',
  },
  issue: {
    textAlign: 'center',
  },
  status: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 15,
    padding: '3px 10px',
  },
  tableHeaderSummary: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#35bbb3',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  toolbar: {
    background: 'white',
  },
  logo: {
    // width : 100,
    height: 70,
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

//   const sample = [
//     { name: "Data Covid", detail: ["a", "b"] }
//   ];

export default function UserProfilePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [dataProfile, setDataProfile] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [userScreenName, setUserScreenName] = React.useState('');
  const [following, setFollowing] = React.useState('');
  const [follower, setFollower] = React.useState('');
  const [profileImage, setProfileImage] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [tagIssue, setTagIssue] = React.useState([]);
  const [joinDate, setJoinDate] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [negatifSummary, setnegatifSummary] = React.useState([]);
  const [positifSummary, setpositifSummary] = React.useState([]);
  const [netralSummary, setnetralSummary] = React.useState([]);
  const [issueSummary, setIssueSummary] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [bodyTweet, setBodyTweet] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getProfileUser();
    getDataSummary();
  }, []);

  async function getProfileUser() {
    let bodyParam = {};
    let issueTag = [];
    let count = {};

    bodyParam['user_screenname'] = window.location.href.split('?')[1];
    bodyParam['issue'] = localStorage.issue;
    await axios
      .post(url_profile + '/get-profile-new', bodyParam)
      .then((res) => {
        for (let i = 0; i < res.data.value.length; i++) {
          issueTag.push(res.data.value[i]._source.issue);
        }

        issueTag.forEach((item) => {
          if (count[item]) {
            count[item]++;
          } else {
            count[item] = 1;
          }
        });

        console.log(issueTag, 'TEST');
        console.log(res.data.value, 'DATA VALUE');
        setBodyTweet(res.data.value);

        //   console.log(count,"testCount")
        var tag = Object.keys(count);
        console.log(tag, 'testCount');
        setTagIssue(tag);
        setDataProfile(res.data.value);
        setUserScreenName(res.data.value[0]._source.user_screenname);
        setFollowing(res.data.value[0]._source.user_friends_count);
        setFollower(res.data.value[0]._source.user_followers_count);
        setProfileImage(res.data.value[0]._source.user_profileimage);
        setLocation(res.data.value[0]._source.fixed_location);
        setJoinDate(res.data.value[0]._source.user_joindate);
      })
      .catch((err) => console.log(err));
  }

  function getDateFormat(value) {
    let year = value.slice(0, 4);
    let month = value.slice(5, 7);
    let day = value.slice(8, 10);
    let result = day + '/' + month + '/' + year;
    return result;
  }

  async function getDataSummary() {
    let obj = {};
    let issueDetail = [];
    let negatifArray = [];
    let positifArray = [];
    let netralArray = [];
    let issue = [];
    let bodyParam = {};
    bodyParam['user_screenname'] = window.location.href.split('?')[1];
    await axios
      .post(url_profile + '/get-summary-issue', bodyParam)
      .then((res) => {
        console.log(res.data, 'new DATA');
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
      console.log(obj[key], 'obj[key]');
      issueDetail.push({
        key: key,
        total: obj[key].total,
        positif: 0,
        netral: 0,
        negatif: 0,
      });
      obj[key].sentimen.forEach((item) => {
        console.log(issueDetail[issueDetail.length - 1], '000000');
        if (item.key === 'Positive') {
          issueDetail[issueDetail.length - 1].positif = item.doc_count;
        } else if (item.key === 'Negative') {
          issueDetail[issueDetail.length - 1].negatif = item.doc_count;
        } else if (item.key === 'Neutral') {
          issueDetail[issueDetail.length - 1].netral = item.doc_count;
        }
      });
    }
    console.log(JSON.stringify(issueDetail, null, 2), 'issueDetail');

    for (let key in issueDetail) {
      issue.push(issueDetail[key].key);
      negatifArray.push(issueDetail[key].negatif);
      positifArray.push(issueDetail[key].positif);
      netralArray.push(issueDetail[key].netral);
    }

    console.log(issue, 'issue arr');
    console.log(negatifArray, 'negatif arr');
    console.log(positifArray, 'positif arr');
    console.log(netralArray, 'netral arr');
    setIssueSummary(issue);
    setnegatifSummary(negatifArray);
    setpositifSummary(positifArray);
    setnetralSummary(netralArray);
    setLoading(false);
  }

  const Highlighted = ({ text = '', highlight = '', className = '' }) => {
    // let words = text ? text : '';
    // let bodyTweet = [];
    // bodyTweet.push(words);
    // console.log(bodyTweet, 'bodyTweet');
    // let highlightWords = highlight ? highlight : '';
    // console.log(words, 'words');
    // console.log(highlightWords, 'highlightWords');
    // return (
    //   <Highlighter
    //     highlightClassName={className}
    //     // highlightStyle={{ color: '#ffc107' }}
    //     searchWords={highlightWords}
    //     // autoEscape={false}
    //     // caseSensitive={true}
    //     textToHighlight={words ? words : ''}
    //   />
    // );

    // return (
    //   <Highlighter
    //     highlightClassName={className}
    //     // highlightStyle={{ color: '#ffc107' }}
    //     searchWords={highlightWords}
    //     autoEscape={true}
    //     textToHighlight={words}
    //   />
    // );
    // let body = text;
    // let highlightText = highlight
    //   ? highlight.replace(/[.*+?^${}() | [\]\\]/g, '\\$&')
    //   : '';

    // highlightText = highlightText.replace(/[.*+?^${}() | [\]\\]/g, '\\$&');
    // let pattern = new RegExp(`${highlightText}`, 'gi');
    // let print = body.replace(
    //   pattern,
    //   `<span className="${className}">${highlightText}</span>`
    // );

    // return print;

    const highlightWord = highlight ? highlight.join(' ').split(/[, .]+/) : [];
    const words = text.split(/[, .]+/);
    console.log(highlightWord, 'highlightWord');
    console.log(words, 'words');
    let result = [];

    const wordsPrint = text.split(' ');
    console.log(wordsPrint, 'wordsPrint');
    // const highlightWordPrint = highlightWord.join(' ').split(' ');
    words.forEach((item, index) => {
      // const words = text.split(/[, .]+/);
      if (highlightWord.includes(item)) {
        result.push(
          <span className={className}>
            {' '}
            {item}
            <span className={classes.highlightWordSeparator}> </span>
          </span>
        );
      } else {
        result.push(
          <span className={classes.highlightWordSeparator}>
            {' '}
            {/* {wordsPrint[index]} */}
            {item}
          </span>
        );
      }
    });
    // result.push(<span className={classes.highlightWordSeparator}>...</span>);
    console.log(result, 'result');
    return result;
  };

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
  const renderDataProfile = () => {
    return (
      <>
        <Container style={{ marginTop: 120, marginLeft: 300 }}>
          <h5
            onClick={(e) => {
              localStorage.setItem('issue', '');
              history.push('/');
              window.location.reload();
            }}
          >
            <i class='fas fa-chevron-left' />
            <span style={{ marginLeft: 15 }}>Back</span>
          </h5>
          <Row xs='auto' style={{ margin: 75 }}>
            <Col xs={2}>
              <img
                src={profileImage}
                style={{ borderRadius: '50%', width: '150px' }}
                alt='profile'
              />
            </Col>
            <Col xs={6} style={{ padding: 'auto' }}>
              <Row xs='auto'>
                <h1 style={{ fontWeight: 'bold' }}>{userScreenName}</h1>
              </Row>
              <Row xs='auto'>
                <Col>
                  <h5 style={{ color: 'grey' }}>@{userScreenName}</h5>
                </Col>
                <Col>
                  <h5 style={{ color: 'grey' }}>
                    <LocationOnIcon />
                    {location !== '0' ? location : ' -'}
                  </h5>
                </Col>
              </Row>
              <Row xs='auto'>
                <h5 style={{ color: 'grey' }}>
                  <i className='far fa-calendar' /> Joined{' '}
                  {getDateFormat(joinDate)}{' '}
                </h5>
              </Row>
              <Row xs='auto'>
                <Col>
                  <h5>
                    <span style={{ fontWeight: 'bold' }}>{following}</span>{' '}
                    <span style={{ color: 'grey' }}>Following</span>
                  </h5>
                </Col>
                <Col>
                  <h5>
                    <span style={{ fontWeight: 'bold' }}>{follower}</span>{' '}
                    <span style={{ color: 'grey' }}>Followers</span>
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col xs={4}>
              <Row xs='auto'>
                <h5 style={{ fontWeight: 'bold' }}>Tagged Issues</h5>
              </Row>
              <Row xs='auto'>
                <Col style={{ marginLeft: '-20px' }}>
                  <Chip
                    clickable
                    onClick={(e) => {
                      localStorage.setItem('issue', '');
                      window.location.reload();
                    }}
                    label='All'
                    style={{
                      borderColor: '#F4F6C4',
                      color: 'black',
                      fontSize: 15,
                      borderRadius: 20,
                      backgroundColor: '#F4F6C4',
                      margin: '10px',
                    }}
                  />
                  {tagIssue.map((data) => {
                    return (
                      <Chip
                        clickable
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.setItem('issue', data);
                          window.location.reload();
                        }}
                        label={data}
                        style={{
                          borderColor: '#F4F6C4',
                          color: 'black',
                          fontSize: 15,
                          borderRadius: 20,
                          backgroundColor: '#F4F6C4',
                          margin: '10px',
                        }}
                      />
                    );
                  })}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Grid container justify='center' style={{ marginTop: 50 }}>
          <h5 style={{ fontWeight: 'bold' }}>User Personal Tweet</h5>
        </Grid>
        <Grid container justify='center'>
          <TableContainer
            xs={12}
            component={Paper}
            className={classes.tableContainer}
          >
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Tweet
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Issue
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Attraction
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell}>
                    Sentiment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProfile
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow>
                      <TableCell>
                        <Typography
                          onClick={() => {
                            window.open(row._source.id, '_blank').focus();
                          }}
                          // className={classes.body}
                        >
                          {row._source.insight.sentiment === 'Positive' ? (
                            <Highlighted
                              text={row._source?.body}
                              highlight={
                                row._source.insight.sentiment_keywords?.Positive
                              }
                              className={classes.Positive}
                            />
                          ) : row._source.insight.sentiment === 'Negative' ? (
                            <Highlighted
                              text={row._source?.body}
                              highlight={
                                row._source.insight.sentiment_keywords?.Negative
                              }
                              className={classes.Negative}
                            />
                          ) : (
                            row._source.body
                          )}
                          {/* {row._source.insight.sentiment === 'Positive' ? (
                            <Highlighted
                              text={row._source.body}
                              highlight={setSentimentKeywordsPositive}
                              className={classes.Positive}
                            />
                          ) : row._source.insight.sentiment === 'Negative' ? (
                            <Highlighted
                              text={row._source.body}
                              highlight={setSentimentKeywordsNegative}
                              className={classes.Negative}
                            />
                          ) : (
                            row._source.body
                          )} */}
                          {/* {row._source.body} */}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.issue}>
                          {row._source.issue}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className={classes.totalAttraction}>
                          {row._source.total_attraction}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          className={classes.status}
                          style={{
                            backgroundColor:
                              (row._source.insight.sentiment === 'Positive' &&
                                '#D2DC2E') ||
                              (row._source.insight.sentiment === 'Negative' &&
                                '#BE0712'),
                          }}
                        >
                          {row._source.insight.sentiment}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component='div'
                  count={dataProfile.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container justify='center' style={{ marginTop: 50 }}>
          <h5 style={{ fontWeight: 'bold' }}>All Tweet Sentiment</h5>
        </Grid>

        <Grid container justify='center'>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderSummary}>
                    Summary
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  <BarSummaryVertical
                    issue={issueSummary}
                    negatif={negatifSummary}
                    positif={positifSummary}
                    netral={netralSummary}
                  />
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container justify='center' style={{ marginTop: 30 }}>
          <Card className={classes.TableContainer}></Card>
        </Grid>
      </>
    );
  };

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <AppBar
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
              <Grid item sm={8}>
                <h2 style={{ color: 'black', marginLeft: '50px' }}>
                  <strong>User Pages</strong>
                </h2>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {renderDataProfile()}
      </React.Fragment>
    </>
  );
}
