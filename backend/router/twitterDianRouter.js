const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const { query } = require('express');
const bodyParser = require('body-parser').json();
const elasticClient = elastic.Client({
  host: 'http://192.168.90.31:9200',
});

router.post('/get-count-sentiment', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let { issue, region_code, start_date, end_date } = req.body;
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
        ],
      },
    },
  };

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  start_date && end_date
    ? options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: start_date,
            lte: end_date,
            format: 'strict_date_optional_time',
          },
        },
      })
    : options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: date + 'T00:00:00.000Z',
            lte: date + 'T23:59:59.999Z',
            format: 'strict_date_optional_time',
          },
        },
      });

  let query = {
    index: 'twitter_dian',
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

router.post('/get-count-gender', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let { issue, region_code, start_date, end_date } = req.body;
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
        ],
      },
    },
  };

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  start_date && end_date
    ? options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: start_date,
            lte: end_date,
            format: 'strict_date_optional_time',
          },
        },
      })
    : options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: date + 'T00:00:00.000Z',
            lte: date + 'T23:59:59.999Z',
            format: 'strict_date_optional_time',
          },
        },
      });

  let query = {
    index: 'twitter_dian',
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

router.post('/get-summary-issue', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let { issue, region_code, start_date, end_date } = req.body;
  let options = {
    aggs: {
      name_issue: {
        terms: {
          field: 'issue.keyword',
          order: {
            _count: 'desc',
          },
          size: 10,
        },
        aggs: {
          insight_sentiment: {
            terms: {
              field: 'insight.sentiment.keyword',
              order: {
                _count: 'asc',
              },
              size: 3,
            },
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
        ],
      },
    },
  };

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  start_date && end_date
    ? options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: start_date,
            lte: end_date,
            format: 'strict_date_optional_time',
          },
        },
      })
    : options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: date + 'T00:00:00.000Z',
            lte: date + 'T23:59:59.999Z',
          },
        },
      });

  let query = {
    index: 'twitter_dian',
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp });
      }
      return res
        .status(200)
        .json({ value: resp.aggregations.name_issue.buckets });
    })

    .catch((err) => {
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-location', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let { issue, region_code, start_date, end_date } = req.body;
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
            match_all: {},
          },
        ],
      },
    },
  };

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  start_date && end_date
    ? options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: start_date,
            lte: end_date,
            format: 'strict_date_optional_time',
          },
        },
      })
    : options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: date + 'T00:00:00.000Z',
            lte: date + 'T23:59:59.999Z',
            format: 'strict_date_optional_time',
          },
        },
      });

  let query = {
    index: 'twitter_dian',
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

router.post('/get-data-twitter-filter-new', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let { region_code, sentiment, issue, start_date, end_date } = req.body;
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
        ],
      },
    },
  };

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
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

  start_date && end_date
    ? options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: start_date,
            lte: end_date,
            format: 'strict_date_optional_time',
          },
        },
      })
    : options.query.bool.filter.push({
        range: {
          crawlingdate: {
            gte: date + 'T00:00:00.000Z',
            lte: date + 'T23:59:59.999Z',
            format: 'strict_date_optional_time',
          },
        },
      });

  let source = {
    index: 'twitter_dian',
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

router.post('/line-negative', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let oneWeek = new Date(Date.now() - 518400000);
  let oneWeekBefore = oneWeek.toISOString().split('T')[0];
  let query = {
    index: 'twitter_dian',
    body: {
      aggs: {
        total: {
          date_histogram: {
            field: 'crawlingdate',
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
                'insight.sentiment': 'Negative',
              },
            },
            {
              range: {
                crawlingdate: {
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

router.post('/line-positive', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let oneWeek = new Date(Date.now() - 518400000);
  let oneWeekBefore = oneWeek.toISOString().split('T')[0];
  let query = {
    index: 'twitter_dian',
    body: {
      aggs: {
        total: {
          date_histogram: {
            field: 'crawlingdate',
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
                'insight.sentiment': 'Positive',
              },
            },
            {
              range: {
                crawlingdate: {
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
    index: 'twitter_dian',
    body: {
      aggs: {
        total: {
          date_histogram: {
            field: 'crawlingdate',
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
                'insight.sentiment': 'neutral',
              },
            },
            {
              range: {
                crawlingdate: {
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

router.post('/get-table-neutral', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let { region_code, issue, start_date, end_date } = req.body;
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

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  let query = {
    index: 'twitter_dian',
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

router.post('/get-table-positive', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let onemonth = new Date(Date.now() - 2073600000);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let onemonthbefore = onemonth.toISOString().split('T')[0];
  let { region_code, issue, start_date, end_date } = req.body;
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
              'insight.sentiment': 'Positive',
            },
          },
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

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  let query = {
    index: 'twitter_dian',
    size: 1000,
    body: options,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      // console.log(JSON.stringify(resp, null, 2));
      return res.status(200).json({ value: resp.hits.hits });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-table-negative', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let { region_code, issue, start_date, end_date } = req.body;
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
              'insight.sentiment': 'Negative',
            },
          },
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

  if (issue) {
    options.query.bool.filter.push({
      match_phrase: {
        issue: issue,
      },
    });
  }

  if (region_code) {
    options.query.bool.filter.push({
      match_phrase: {
        region_code: region_code,
      },
    });
  }

  let query = {
    index: 'twitter_dian',
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

router.get('/get-lastdate', (req, res) => {
  let query = {
    index: 'twitter_dian',
    _source: 'crawlingdate',
    // from : 0,
    size: 1,
    body: {
      // query : {
      //     bool: {
      //         must: [

      //         {
      //             range : {user_postdate :{"gte" : "now-1d/d" , "lt" : "now/d"}}
      //         },
      //         {
      //             match : {issue : "vaksin"}
      //         }
      //         ]
      //     }

      // },
      sort: { crawlingdate: { order: 'desc' } },
    },
  };

  elasticClient
    .search(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp.hits.hits });
      }
      return res.status(200).json({ value: resp.hits.hits[0]._source });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

module.exports = router;
