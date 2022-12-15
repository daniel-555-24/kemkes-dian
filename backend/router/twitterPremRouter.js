const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const { query } = require('express');
const bodyParser = require('body-parser').json();
const elasticClient = elastic.Client({
  host: 'http://192.168.90.31:9200',
});

// ! GET COUNT SENTIMENT PREMIUM [OK]
router.post('/get-count-sentiment-prem', (req, res) => {
  let today = new Date();
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    aggs: {
      total: {
        terms: {
          field: 'insight.sentiment.keyword',
          order: {
            _count: 'desc',
          },
        },
      },
    },
    size: 0,
    docvalue_fields: [
      {
        field: 'crawlingdate',
        format: 'date_time',
      },
    ],
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {},
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    body: options,
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

// ! GET COUNT GENDER PREMIUM [OK]
router.post('/get-count-gender-prem', (req, res) => {
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    aggs: {
      total: {
        terms: {
          field: 'user_gender.keyword',
          order: {
            _count: 'desc',
          },
        },
      },
    },
    size: 0,
    docvalue_fields: [
      {
        field: 'crawlingdate',
        format: 'date_time',
      },
    ],
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {},
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    body: options,
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

// ! GET DATA TWITTER FILTER NEW PREMIUM [OK]
router.post('/get-data-twitter-filter-prem', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    sentiment,
  } = req.body;
  let options = {
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
        'query',
      ],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {},
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  if (sentiment) {
    options.query.bool.filter.push({
      match_phrase: {
        'insight.sentiment.keyword': sentiment,
      },
    });
  }

  let source = {
    index: 'twitter_premium',
    from: 0,
    size: 5000,
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

// ! GET TABLE NEUTRAL PREMIUM [OK]
router.post('/get-table-neutral-prem', (req, res) => {
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        filter: [
          {
            match_phrase: {
              'insight.sentiment': 'Neutral',
            },
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
    sort: { total_attraction: { order: 'desc' } },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    size: 1000,
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({ value: resp.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

// ! GET TABLE POSITIVE PREMIUM [OK]
router.post('/get-table-positive-prem', (req, res) => {
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        filter: [
          {
            match_phrase: {
              'insight.sentiment.keyword': 'Positive',
            },
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
    sort: { total_attraction: { order: 'desc' } },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    size: 1000,
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({ value: resp.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

// ! GET TABLE NEGATIVE PREMIUM [OK]
router.post('/get-table-negative-prem', (req, res) => {
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
    fromDate,
    toDate,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        filter: [
          {
            bool: {
              must_not: {
                bool: {
                  should: [
                    {
                      match_phrase: {
                        'region_code.keyword': 'ID-',
                      },
                    },
                  ],
                  minimum_should_match: 1,
                },
              },
            },
          },
          {
            match_phrase: {
              'insight.sentiment.keyword': 'Negative',
            },
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
        must_not: [
          {
            match_phrase: {
              fixed_location: '0',
            },
          },
        ],
      },
    },
    sort: { total_attraction: { order: 'desc' } },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    size: 1000,
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      return res.status(200).json({ value: resp.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

// // ! GET LASTDATE PREMIUM
// router.get('/get-lastdate-prem', (req, res) => {
//   let query = {
//     index: 'twitter_premium',
//     _source: 'crawlingdate',
//     // from : 0,
//     size: 1,
//     body: {
//       // query : {
//       //     bool: {
//       //         must: [

//       //         {
//       //             range : {user_postdate :{"gte" : "now-1d/d" , "lt" : "now/d"}}
//       //         },
//       //         {
//       //             match : {issue : "vaksin"}
//       //         }
//       //         ]
//       //     }

//       // },
//       sort: { crawlingdate: { order: 'desc' } },
//     },
//   };

//   elasticClient
//     .search(query)
//     .then((resp) => {
//       if (!resp) {
//         return res.status(404).json({ value: resp.hits.hits });
//       }
//       return res.status(200).json({ value: resp.hits.hits[0]._source });
//     })

//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ msg: 'error', err });
//     });
// });

// // ! GET SUMMARY ISSUE PREMIUM
// router.post('/summary-issue-prem', (req, res) => {
//   let today = new Date();
//   let date = today.toISOString().split('T')[0];
//   let {
//     region_code,
//     fromDate = '2022-05-20T00:00:00.000Z',
//     toDate = '2022-05-21T00:00:00.000Z',
//   } = req.body;

//   let options = {
//     aggs: {
//       total: {
//         terms: {
//           field: 'issue.keyword',
//           order: {
//             _key: 'asc',
//           },
//         },
//       },
//     },
//     size: 0,
//     docvalue_fields: [
//       {
//         field: 'crawlingdate',
//         format: 'date_time',
//       },
//     ],
//     _source: {
//       includes: [
//         'user_screenname',
//         'issue',
//         'region_code',
//         'body',
//         'fixed_location',
//         'total_attraction',
//         'insight',
//       ],
//     },
//     query: {
//       bool: {
//         must: [],
//         filter: [
//           {
//             match_all: {},
//           },
//           {
//             range: {
//               crawlingdate: {
//                 gte: fromDate,
//                 lte: toDate,
//                 format: 'strict_date_optional_time',
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   if (region_code) {
//     options.query.bool.filter.push({
//       match_phrase: {
//         region_code: region_code,
//       },
//     });
//   }

//   let query = {
//     index: 'twitter_premium',
//     body: options,
//   };

//   elasticClient
//     .search(query)
//     .then((resp) => {
//       if (!resp) {
//         return res.status(404).json({ value: resp });
//       }
//       return res.status(200).json({ value: resp.aggregations.total.buckets });
//     })

//     .catch((err) => {
//       return res.status(500).json({ msg: 'error', err });
//     });
// });

// // ! GET SUMMARY NEGATIVE PREMIUM
// router.post('/summary-negative-prem', (req, res) => {
//   let today = new Date();
//   let date = today.toISOString().split('T')[0];
//   let {
//     region_code,
//     fromDate = '2022-05-20T00:00:00.000Z',
//     toDate = '2022-05-21T00:00:00.000Z',
//   } = req.body;

//   let options = {
//     aggs: {
//       total: {
//         terms: {
//           field: 'issue.keyword',
//           order: {
//             _key: 'asc',
//           },
//         },
//       },
//     },
//     size: 0,
//     docvalue_fields: [
//       {
//         field: 'crawlingdate',
//         format: 'date_time',
//       },
//     ],
//     _source: {
//       includes: [
//         'user_screenname',
//         'issue',
//         'region_code',
//         'body',
//         'fixed_location',
//         'total_attraction',
//         'insight',
//       ],
//     },
//     query: {
//       bool: {
//         must: [],
//         filter: [
//           {
//             match_all: {},
//           },
//           {
//             match_phrase: {
//               'insight.sentiment': 'Negative',
//             },
//           },
//           {
//             range: {
//               crawlingdate: {
//                 gte: fromDate,
//                 lte: toDate,
//                 format: 'strict_date_optional_time',
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   if (region_code) {
//     options.query.bool.filter.push({
//       match_phrase: {
//         region_code: region_code,
//       },
//     });
//   }

//   let query = {
//     index: 'twitter_premium',
//     body: options,
//   };

//   elasticClient
//     .search(query)
//     .then((resp) => {
//       if (!resp) {
//         return res.status(404).json({ value: resp });
//       }
//       return res.status(200).json({ value: resp.aggregations.total.buckets });
//     })

//     .catch((err) => {
//       return res.status(500).json({ msg: 'error', err });
//     });
// });

// // ! GET SUMMARY POSITIVE PREMIUM
// router.post('/summary-positive-prem', (req, res) => {
//   let today = new Date();
//   let date = today.toISOString().split('T')[0];
//   let {
//     region_code,
//     fromDate = '2022-05-20T00:00:00.000Z',
//     toDate = '2022-05-21T00:00:00.000Z',
//   } = req.body;

//   let options = {
//     aggs: {
//       total: {
//         terms: {
//           field: 'issue.keyword',
//           order: {
//             _key: 'asc',
//           },
//         },
//       },
//     },
//     size: 0,
//     docvalue_fields: [
//       {
//         field: 'crawlingdate',
//         format: 'date_time',
//       },
//     ],
//     _source: {
//       includes: [
//         'user_screenname',
//         'issue',
//         'region_code',
//         'body',
//         'fixed_location',
//         'total_attraction',
//         'insight',
//       ],
//     },
//     query: {
//       bool: {
//         must: [],
//         filter: [
//           {
//             match_all: {},
//           },
//           {
//             match_phrase: {
//               'insight.sentiment': 'Positive',
//             },
//           },
//           {
//             range: {
//               crawlingdate: {
//                 gte: fromDate,
//                 lte: toDate,
//                 format: 'strict_date_optional_time',
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   if (region_code) {
//     options.query.bool.filter.push({
//       match_phrase: {
//         region_code: region_code,
//       },
//     });
//   }

//   let query = {
//     index: 'twitter_premium',
//     body: options,
//   };

//   elasticClient
//     .search(query)
//     .then((resp) => {
//       if (!resp) {
//         return res.status(404).json({ value: resp });
//       }
//       return res.status(200).json({ value: resp.aggregations.total.buckets });
//     })

//     .catch((err) => {
//       return res.status(500).json({ msg: 'error', err });
//     });
// });

// // ! GET SUMMARY NEUTRAL PREMIUM
// router.post('/summary-neutral-prem', (req, res) => {
//   let today = new Date();
//   let date = today.toISOString().split('T')[0];
//   let {
//     region_code,
//     fromDate = '2022-05-20T00:00:00.000Z',
//     toDate = '2022-05-21T00:00:00.000Z',
//   } = req.body;

//   let options = {
//     aggs: {
//       total: {
//         terms: {
//           field: 'issue.keyword',
//           order: {
//             _key: 'asc',
//           },
//         },
//       },
//     },
//     size: 0,
//     docvalue_fields: [
//       {
//         field: 'crawlingdate',
//         format: 'date_time',
//       },
//     ],
//     _source: {
//       includes: [
//         'user_screenname',
//         'issue',
//         'region_code',
//         'body',
//         'fixed_location',
//         'total_attraction',
//         'insight',
//       ],
//     },
//     query: {
//       bool: {
//         must: [],
//         filter: [
//           {
//             match_all: {},
//           },
//           {
//             match_phrase: {
//               'insight.sentiment': 'Neutral',
//             },
//           },
//           {
//             range: {
//               crawlingdate: {
//                 gte: fromDate,
//                 lte: toDate,
//                 format: 'strict_date_optional_time',
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   if (region_code) {
//     options.query.bool.filter.push({
//       match_phrase: {
//         region_code: region_code,
//       },
//     });
//   }

//   let query = {
//     index: 'twitter_premium',
//     body: options,
//   };

//   elasticClient
//     .search(query)
//     .then((resp) => {
//       if (!resp) {
//         return res.status(404).json({ value: resp });
//       }
//       return res.status(200).json({ value: resp.aggregations.total.buckets });
//     })

//     .catch((err) => {
//       return res.status(500).json({ msg: 'error', err });
//     });
// });

// ! GET LOCATION PREMIUM
router.post('/get-location-prem', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];

  console.log(req.body.sentiment, '<<<<<??NIKU');
  let {
    premium_query,
    fromDate,
    toDate,
    sentiment,
    region_code,
    // fromDate = '2022-05-20T00:00:00.000Z',
    // toDate = '2022-05-21T00:00:00.000Z',
  } = req.body;
  let options = {
    aggs: {
      value: {
        terms: {
          field: 'region_code.keyword',
          order: {
            _count: 'desc',
          },
          size: 36,
        },
      },
    },
    size: 0,
    docvalue_fields: [
      {
        field: 'crawlingdate',
        format: 'date_time',
      },
      {
        field: 'quoted_postdate',
        format: 'date_time',
      },
      {
        field: 'retweet_postdate',
        format: 'date_time',
      },
      {
        field: 'user_joindate',
        format: 'date_time',
      },
      {
        field: 'user_postdate',
        format: 'date_time',
      },
    ],
    _source: {
      includes: [
        'user_screenname',
        'issue',
        'region_code',
        'body',
        'fixed_location',
        'total_attraction',
        'insight',
      ],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {},
          }
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
  };

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  if (fromDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'fromDate.keyword': fromDate,
      },
    });
  }

  if (toDate) {
    options.query.bool.filter.push({
      match_phrase: {
        'toDate.keyword': toDate,
      },
    });
  }

  if (sentiment) {
    options.query.bool.filter.push({
      match_phrase: {
        'insight.sentiment': sentiment,
      },
    });
  }

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  let query = {
    index: 'twitter_premium',
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp });
      }
      return res.status(200).json({ value: resp.aggregations.value.buckets });
    })

    .catch((err) => {
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/summary-neutral', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let query = {
    index: 'fixed_twitter',
    body: {
      aggs: {
        total: {
          terms: {
            field: 'issue.keyword',
            order: {
              _key: 'asc',
            },
          },
        },
      },
      size: 0,
      docvalue_fields: [
        {
          field: 'crawlingdate',
          format: 'date_time',
        },
      ],
      _source: {
        includes: [
          'user_screenname',
          'issue',
          'region_code',
          'body',
          'fixed_location',
          'total_attraction',
          'insight',
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
                user_screenname: req.body.user_screenname,
              },
            },
            {
              match_phrase: {
                'insight.sentiment': 'Neutral',
              },
            },
            {
              range: {
                crawlingdate: {
                  gte: twoweeksbefore + 'T00:00:00.000Z',
                  lte: date + 'T23:59:59.999Z',
                  format: 'strict_date_optional_time',
                },
              },
            },
          ],
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

router.post('/get-dropdown-query', (req, res) => {
  let query = {
    index: 'twitter_premium',
    body: {
      aggs: {
        premium_query: {
          terms: {
            field: 'premium_query.keyword',
            order: {
              _count: 'desc',
            },
            size: 100,
          },
        },
      },
      size: 0,
      stored_fields: ['*'],
      _source: {
        excludes: [],
      },
      query: {
        bool: {
          filter: [
            {
              match_all: {},
            },
          ],
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
      return res
        .status(200)
        .json({ value: resp.aggregations.premium_query.buckets });
    })

    .catch((err) => {
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-dropdown-query-date', (req, res) => {
  let {
    // premium_query = 'lang:id (covid)',
    premium_query,
  } = req.body;
  let options = {
    _source: {
      includes: ['fromDate', 'toDate'],
    },
    query: {
      bool: {
        must: [],
        filter: [
          {
            match_all: {},
          },
          // {
          //   range: {
          //     crawlingdate: {
          //       gte: fromDate,
          //       lte: toDate,
          //       format: 'strict_date_optional_time',
          //     },
          //   },
          // },
        ],
      },
    },
  };

  if (premium_query) {
    options.query.bool.filter.push({
      match_phrase: {
        'premium_query.keyword': premium_query,
      },
    });
  }

  let source = {
    index: 'twitter_premium',
    from: 0,
    size: 5000,
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

module.exports = router;
