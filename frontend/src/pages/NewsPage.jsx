import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Card, Grid } from '@material-ui/core';
import kemkes from '../images/logo_kemenkes baru.jpg';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { url_news } from "../helper/ServiceUrlAPI";
import WordCloudCompNews from '../component/word/WordCloudNews';
import LineNews from '../component/line/LineNews';
import TableNews from '../component/table/TableNews';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    toolbar: {
      background : 'white',
    },
    menuButton: {
      marginLeft: 'auto',
    },
    logo : {
      // width : 100,
      height : 100
    },
    rootTableNews: {
      backgroundColor: "#E0E0E0",
      margin: '15px',
      borderRadius : '10px'
    },
    textField: {
      width: '100%',
      marginLeft: '10px',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
  rootCard: {
    // backgroundColor: "#E0E0E0",
    // border: "4px solid #E0E0E0",
    marginRight: 'auto',
    marginLeft : 'auto',
    borderRadius : '20px',
    paddingBottom :  10
  },
  }));


export default function TwitterPage() {
    const classes = useStyles();
    const [listData, setListData] = React.useState([]);
    const history = useHistory();
    const [value, setValue] = React.useState("");
    const [negatifArr, setnegatifArr] = React.useState([]);
    const [positifArr, setpositifArr] = React.useState([]);
    const [netralArr, setnetralArr] = React.useState([]);
    const [tanggal, settanggal] = React.useState([]);

  React.useEffect(()=> {
    getDataOfNews();
    countLineTwitter();
  }, [])


  async function getDataOfNews (){
    await axios.post(url_news + '/get-data-news')
    .then((res) => {
      setListData(res.data.value);
    })
    .catch(err => console.log(err));
  };

  async function countLineTwitter() {
    let sentimentNegatif = [];
    let sentimentPositif = [];
    let sentimentNetral = [];
    let tanggal = [];

    for (var i = 7; i > 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() + 1 - i);
      if (d.getDate() < 10) {
        tanggal.push('0' + d.getDate());
      } else {
        tanggal.push(d.getDate());
      }
    }

    axios
      .post(url_news + '/line-neutral')
      .then((res) => {
        if (res.data.value.length > 0) {
          let newDateNetral = {};
          for (let i = 0; i < tanggal.length; i++) {
            newDateNetral[tanggal[i]] = 0;
          }

          // console.log(res.data.value, 'INI NILAI NETRAL');
          res.data.value.forEach((el) => {
            let newDate = new Date(el.key_as_string);
            let dayFormat = moment(newDate).format('DD');
            // console.log(dayFormat, 'INI DAY FORMAT NETRAL');
            for (let i = 0; i < tanggal.length; i++) {
              if (dayFormat === tanggal[i])
                newDateNetral[tanggal[i]] = el.doc_count;
            }
          });
          // console.log(newDateNetral, 'INI DATE NETRAL');
          for (const key in newDateNetral) {
            sentimentNetral.push(newDateNetral[key]);
          }
        }
      })
      .catch((err) => console.log(err));
    axios
      .post(url_news + '/line-positive')
      .then((res) => {
        if (res.data.value.length > 0) {
          let newDatePositif = {};
          for (let i = 0; i < tanggal.length; i++) {
            newDatePositif[tanggal[i]] = 0;
          }

          // console.log(res.data.value, 'INI NILAI POSITIF');
          res.data.value.forEach((el) => {
            let newDate = new Date(el.key_as_string);
            let dayFormat = moment(newDate).format('DD');
            // console.log(dayFormat, 'INI DAY FORMAT POSITIF');
            for (let i = 0; i < tanggal.length; i++) {
              if (dayFormat === tanggal[i])
                newDatePositif[tanggal[i]] = el.doc_count;
            }
          });
          // console.log(newDatePositif, 'INI DATE POSITIF');
          for (const key in newDatePositif) {
            sentimentPositif.push(newDatePositif[key]);
          }
        }
      })
      .catch((err) => console.log(err));

    axios
      .post(url_news + '/line-negative')
      .then((res) => {
        if (res.data.value.length > 0) {
          let newDateNegatif = {};
          for (let i = 0; i < tanggal.length; i++) {
            newDateNegatif[tanggal[i]] = 0;
          }

          // console.log(res.data.value, 'INI NILAI NEGATIF');
          res.data.value.forEach((el) => {
            let newDate = new Date(el.key_as_string);
            let dayFormat = moment(newDate).format('DD');
            console.log(dayFormat, 'INI DAY FORMAT NEGATIF');
            for (let i = 0; i < tanggal.length; i++) {
              if (dayFormat === tanggal[i])
                newDateNegatif[tanggal[i]] = el.doc_count;
            }
          });
          console.log(newDateNegatif, 'INI DATE NEGATIF');
          for (const key in newDateNegatif) {
            sentimentNegatif.push(newDateNegatif[key]);
          }
        }
      })
      .catch((err) => console.log(err));

    setnegatifArr(sentimentNegatif);
    setpositifArr(sentimentPositif);
    setnetralArr(sentimentNetral);
    settanggal(tanggal);

    console.log(sentimentNegatif, 'sentimentNegatif');
    console.log(sentimentPositif, 'sentimentPositif');
    console.log(sentimentNetral, 'sentimentNetral');
    console.log(tanggal, 'tanggal');
  }



  const renderWordNews = () => {
    let array = [];
    var arrayText = [];
    var arrayValue = []; 
    var dataGabunganTextValue = [];
    let result = [];
     
      listData.map((value) => {
        for(var i = 0; i < value._source.insight.keywords.length; i++){
          array.push(value._source.insight.keywords[i])
        };
      });


      let b = array.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          arrayText.push(key);  
          arrayValue.push(b[key])
        }
      };
         
      for(var i = 0; i < arrayText.length; i++) {
        
        var objectData = {}; 
      
        objectData['text'] = arrayText[i];
        objectData['value'] = arrayValue[i];
        dataGabunganTextValue.push(objectData);  
      };

      if(dataGabunganTextValue.length > 0){
        let ab = dataGabunganTextValue.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

        // top 10
        for(var i=0; i < 11; i++){
          let objTop10 = {};
          objTop10['text'] = ab[i].text;
          objTop10['value'] = ab[i].value;
          result.push(objTop10)
        }
      }

      return (
          <WordCloudCompNews
              data={result}
          />
      )
  };

  


  if(value === "twitter") history.push('/')

    return(
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" title={<img src={kemkes}/>}>
          <Toolbar className={classes.toolbar}>
              <img src={kemkes} alt="logo"  className={classes.logo}/>
              <h4 style={{ color : 'black', marginLeft : '50px'}}><strong>Dashboard Analisis</strong><br/>News</h4>
          </Toolbar>
        </AppBar>

        
  
        <Grid container style={{ marginTop : 120, paddingLeft : 60}}>
            <Grid item sm={2}>
              <Form.Select value={value} onChange={(e)=> setValue(e.target.value)} size="md">
                  <option>News</option>
                  <option value="twitter">Twitter</option>
              </Form.Select>
            </Grid>
        </Grid>

        {/* Line 1  */}

            <Grid container justifyContent="center" spacing={1} style={{ marginTop : 50, paddingLeft : 48, paddingRight : 48}}>
                <Grid item sm={12} className={classes.rootTableNews}>
                    <Card justifyContent="center">
                      <h4 style={{ marginLeft : 50, marginTop : 10, paddingTop : 20}}> News</h4>
                          <TableNews/>                                              
                    </Card>
                </Grid>
            </Grid>
        {/* </Card> */}

        {/* Line 2 */}
  
        <Grid container justifyContent="center" style={{ marginTop : 50,  paddingLeft : 48, paddingRight : 48}} spacing={4}>
          <Grid item sm={6}>
            <Card className={classes.rootCard}>
                {
                  <LineNews
                    date={tanggal}
                    negatif={negatifArr}
                    positif={positifArr}
                    netral={netralArr}
                />
                }
            </Card>
          </Grid>
          <Grid item sm={6}>
           <Card className={classes.rootCard} style={{ height :  365}}>
              {renderWordNews()}
            </Card>
          </Grid>
        </Grid>


        
       
          
      </React.Fragment>
    )
}