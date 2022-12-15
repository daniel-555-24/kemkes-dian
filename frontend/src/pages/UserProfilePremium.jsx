import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles, styled } from '@material-ui/core/styles';

// import { Table } from 'react-bootstrap';
import kemkes from '../images/logo_kemenkes baru.png';
import './user.css';
import { Col, Container, Row } from 'react-bootstrap';
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
    backgroundColor: '#d4dc08',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  body: {
    fontSize: 16,
  },
  totalAttraction: {
    fontSize: 16,
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
  const [userScreenName, setUserScreenName] = React.useState('');
  const [following, setFollowing] = React.useState('');
  const [follower, setFollower] = React.useState('');
  const [profileImage, setProfileImage] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [joinDate, setJoinDate] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getProfileUser();
  }, []);

  async function getProfileUser() {
    let bodyParam = {};
    let count = {};
    bodyParam['user_screenname'] = window.location.href.split('?')[1];
    await axios
      .post(url_profile + '/get-profile-new-premium', bodyParam)
      .then((res) => {
        setDataProfile(res.data.value);
        setUserScreenName(res.data.value[0]._source.user_screenname);
        setFollowing(res.data.value[0]._source.user_friends_count);
        setFollower(res.data.value[0]._source.user_followers_count);
        setProfileImage(res.data.value[0]._source.user_profileimage);
        setLocation(res.data.value[0]._source.fixed_location);
        setJoinDate(res.data.value[0]._source.user_joindate);
      })
      .catch((err) => console.log(err));
    setLoading(false)
  }

  function getDateFormat(value) {
    let year = value.slice(0, 4);
    let month = value.slice(5, 7);
    let day = value.slice(8, 10);
    let result = day + '/' + month + '/' + year;
    return result;
  }

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
        <Container style={{ marginTop: 100 }}>
          <h5 onClick={() => history.push('/')}>
            <i class='fas fa-chevron-left' />
            <span style={{ marginLeft: 15 }}>Back</span>
          </h5>
          <Row xs='auto' style={{ marginTop: 25 }}>
            <Col xs={2}>
              <img
                src={profileImage}
                style={{ borderRadius: '50%', width: '150px' }}
              />
            </Col>
            <Col xs={5} style={{ padding: 'auto' }}>
              <Row xs='auto'>
                <h1 style={{ fontWeight: 'bold' }}>
                  {window.location.href.split('?')[1]}
                </h1>
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
            <Col xs={5}>
    
                <></>

            </Col>
          </Row>
        </Container>
        <Grid container justify='center' style={{ marginTop: 50 }}>
          <h5 style={{ fontWeight: 'bold' }}>User Personal Tweet</h5>
        </Grid>
        <Grid container justify='center'>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>
                    Tweet
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
                          className={classes.body}
                        >
                          {row._source.body}
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
