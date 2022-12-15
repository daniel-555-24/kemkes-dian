const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const bodyParser = require('body-parser').json();
const elasticClient = elastic.Client({
    host : 'http://192.168.90.31:9200'
});


// router.use((req,res,next) => {

//     elasticClient.index({
//         index : 'fixed_run1',
//         body : {
//             url : req.url,
//             method : req.method
//         }
//     })
//     .then(res => {
//         console.log('fixed_run1 indexed')
//         console.log(res)
//     })

//     .catch(err => {
//         console.log(err)
//     })
//     next();
// })


// router.get('/get-data-news', (req,res) => {
//     let query = {
//         index : 'fixed_news',
//         // "_source": "source",
//         from : 0,
//         size : 100,
//         body : {
//                 sort: {"postingdate": {"order": "desc"}}
            
//       }
//     }

//     elasticClient.search(query)
//     .then(resp => {
//         return res.status(200).json({ value : resp.hits.hits})
//     })

//     .catch(err => {
//         console.log(err)
//         return res.status(500).json({ msg : 'error', err})
//     })
// });

router.post('/get-data-news', (req,res) => {
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    let options = {
        "query": {
            "bool": {
              "must": [],
              "filter": [
                {
                  "match_all": {}
                },
                {
                  "range": {
                    "postingdate": {
                        gte: date + 'T00:00:00.000Z',
                        lte: date + 'T23:59:59.999Z',
                      "format": "strict_date_optional_time"
                    }
                  }
                }
              ],
              "should": [],
              "must_not": []
            }
          }
    }
      let source = {
        index: 'fixed_news',
        from: 0,
        size: 1000,
        body: options,
      };

    elasticClient
      .search(source)
      .then((resp) => {
        if (!resp) {
          return res.status(404).json({ value: resp });
        }
        return res.status(200).json({ value: resp.hits.hits });
      })
      .catch((err) => {
        return res.status(500).json({ msg: 'error', err });
      });
  });

router.post('/line-positive', (req, res) => {
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    let oneWeek = new Date(Date.now() - 518400000);
    let oneWeekBefore = oneWeek.toISOString().split('T')[0];
    let query = {
      index: 'fixed_news',
      body: {
        aggs: {
          total: {
            date_histogram: {
              field: 'postingdate',
              calendar_interval: '1d',
              time_zone: 'UTC',
              min_doc_count: 1,
            },
          },
        },
        size: 0,
        stored_fields: ['*'],
        _source: {
          includes: [
            'insight',
            'source'
          ],
        },
        query: {
          bool: {
            must: [],
            filter: [
              {
                match_all: {},
              },
              {
                match_phrase: {
                  'insight.sentiment': 'Positive',
                },
              },
              {
                range: {
                  postingdate: {
                    gte: oneWeekBefore + 'T00:00:00.000Z',
                    lte: date + 'T23:59:59.999Z',
                    format: 'strict_date_optional_time',
                  },
                },
              },
            ],
            should: [],
            must_not: [],
          },
        },
      },
    };
  
    elasticClient
      .search(query)
      .then((resp) => {
        if (!resp) {
          return res.status(404).json({ value: resp });
        }
        return res.status(200).json({ value: resp.aggregations.total.buckets });
      })
  
      .catch((err) => {
        return res.status(500).json({ msg: 'error', err });
      });
  });
  
router.post('/line-neutral', (req, res) => {
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    let oneWeek = new Date(Date.now() - 518400000);
    let oneWeekBefore = oneWeek.toISOString().split('T')[0];
    let query = {
      index: 'fixed_news',
      body: {
        aggs: {
          total: {
            date_histogram: {
              field: 'postingdate',
              calendar_interval: '1d',
              time_zone: 'UTC',
              min_doc_count: 1,
            },
          },
        },
        size: 0,
        stored_fields: ['*'],
        _source: {
          includes: [
            'insight',
            'source'
          ],
        },
        query: {
          bool: {
            must: [],
            filter: [
              {
                match_all: {},
              },
              {
                match_phrase: {
                  'insight.sentiment': 'Neutral',
                },
              },
              {
                range: {
                    postingdate: {
                    gte: oneWeekBefore + 'T00:00:00.000Z',
                    lte: date + 'T23:59:59.999Z',
                    format: 'strict_date_optional_time',
                  },
                },
              },
            ],
            should: [],
            must_not: [],
          },
        },
      },
    };
  
    elasticClient
      .search(query)
      .then((resp) => {
        if (!resp) {
          return res.status(404).json({ value: resp });
        }
        return res.status(200).json({ value: resp.aggregations.total.buckets });
      })
  
      .catch((err) => {
        return res.status(500).json({ msg: 'error', err });
      });
  });

router.post('/line-negative', (req, res) => {
    let today = new Date();
    let date = today.toISOString().split('T')[0];
    let oneWeek = new Date(Date.now() - 518400000);
    let oneWeekBefore = oneWeek.toISOString().split('T')[0];
    let query = {
      index: 'fixed_news',
      body: {
        aggs: {
          total: {
            date_histogram: {
              field: 'postingdate',
              calendar_interval: '1d',
              time_zone: 'UTC',
              min_doc_count: 1,
            },
          },
        },
        size: 0,
        stored_fields: ['*'],
        _source: {
          includes: [
            'insight',
            'source'
          ],
        },
        query: {
          bool: {
            must: [],
            filter: [
              {
                match_all: {},
              },
              {
                match_phrase: {
                  'insight.sentiment': 'Negative',
                },
              },
              {
                range: {
                    postingdate: {
                    gte: oneWeekBefore + 'T00:00:00.000Z',
                    lte: date + 'T23:59:59.999Z',
                    format: 'strict_date_optional_time',
                  },
                },
              },
            ],
            should: [],
            must_not: [],
          },
        },
      },
    };
  
    elasticClient
      .search(query)
      .then((resp) => {
        if (!resp) {
          return res.status(404).json({ value: resp });
        }
        return res.status(200).json({ value: resp.aggregations.total.buckets });
      })
  
      .catch((err) => {
        return res.status(500).json({ msg: 'error', err });
      });
  });



router.post('/get-per-issue-multiple', (req,res) => {
    
    let source = {
        index : "fixed_run2",
        // "_source": "issue",
        from : 0,
        size : 50,
        body: {
            query : {
                bool: {
                    must: [
                      {
                        match: {
                          issue: req.body.issue,
                        }
                      },
                    //   {
                    //     match: {
                    //         fixed_location: req.body.fixed_location,
                    //     }
                    //   }
                    ]
                  }
            },
            sort: {"user_postdate": {"order": "desc"}}
         },
     
        
    }
    elasticClient.search(source)
    .then(resp => {
        if(!resp){
            return res.status(404).json({value : resp})
        }
        return res.status(200).json({ value : resp.hits.hits})
    })

    .catch(err => {
        console.log(err)
        return res.status(500).json({ msg : 'error', err})
    })
})



module.exports = router;