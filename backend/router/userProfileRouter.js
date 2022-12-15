const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const bodyParser = require('body-parser').json();
const elasticClient = elastic.Client({
  host: 'http://192.168.90.31:9200',
});

router.post('/get-profile', (req, res) => {
  let query = {
    index: 'twitter_dian',
    body: req.body.issue
      ? {
          query: {
            bool: {
              must: [
                {
                  match: {
                    user_screenname: req.body.user_screenname,
                  },
                },
                {
                  match: {
                    issue: req.body.issue,
                  },
                },
              ],
            },
          },
        }
      : !req.body.issue
      ? {
          query: {
            match: { user_screenname: req.body.user_screenname },
          },
        }
      : null,
  };

  elasticClient
    .search(query)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp.hits.hits });
      }
      return res.status(200).json({ value: resp.hits.hits });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-profile-new', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let source = {
    index: ['twitter_dian'],
    from: 0,
    size: 5000,
    body: req.body.issue
      ? {
          _source: {
            includes: [
              'user_name',
              'user_joindate',
              'user_friends_count',
              'user_followers_count',
              'user_profileimage',
              'id',
              'user_screenname',
              'issue',
              'region_code',
              'body',
              'fixed_location',
              'total_attraction',
              'insight.sentiment',
              'insight.sentiment_keywords',
              'user_joindate',
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
                    issue: req.body.issue,
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
          sort: { 'issue.keyword': { order: 'asc' } },
        }
      : {
          _source: {
            includes: [
              'user_name',
              'user_joindate',
              'user_friends_count',
              'user_followers_count',
              'user_profileimage',
              'id',
              'user_screenname',
              'issue',
              'region_code',
              'body',
              'fixed_location',
              'total_attraction',
              'insight.sentiment',
              'insight.sentiment_keywords',
              'user_joindate',
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
          sort: { 'issue.keyword': { order: 'asc' } },
        },
  };

  elasticClient
    .search(source)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp.hits.hits });
      }
      return res.status(200).json({ value: resp.hits.hits });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-profile-new-premium', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let source = {
    index: ['twitter_premium'],
    from: 0,
    size: 5000,
    body: {
      _source: {
        includes: [
          'user_name',
          'user_joindate',
          'user_friends_count',
          'user_followers_count',
          'user_profileimage',
          'id',
          'user_screenname',
          'issue',
          'region_code',
          'body',
          'fixed_location',
          'total_attraction',
          'insight.sentiment',
          'user_joindate',
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
      sort: { 'issue.keyword': { order: 'asc' } },
    },
  };
  elasticClient
    .search(source)
    .then((resp) => {
      if (!resp) {
        return res.status(404).json({ value: resp.hits.hits });
      }
      return res.status(200).json({ value: resp.hits.hits });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-profile-sentiment', (req, res) => {
  let query = {
    index: 'twitter_dian',
    _source: 'insight.sentiment',
    body: {
      query: {
        match: { user_screenname: req.body.user_screenname },
      },
    },
  };

  elasticClient
    .search(query)
    .then((resp) => {
      let arrayLocation = [];
      let sentiment = [];
      let value = [];
      let dataGabunganTextValue = [];

      resp.hits.hits.map((val) => {
        arrayLocation.push(val._source.insight.sentiment);
      });

      for (var i = 0; i < arrayLocation.length; i++) {
        arrayLocation[i] = arrayLocation[i].replace(/Ambivalent/g, 'Neutral');
      }
      let b = arrayLocation.reduce(
        (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
        {}
      );

      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          sentiment.push(key);
          value.push(b[key]);
        }
      }

      for (var i = 0; i < sentiment.length; i++) {
        var objectData = {};
        if (sentiment[i] === req.body.sentiment) {
          objectData['sentiment'] = sentiment[i];
          objectData['total'] = value[i];
          dataGabunganTextValue.push(objectData);
        }
      }

      return res.status(200).json({ value: dataGabunganTextValue });
    })

    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'error', err });
    });
});

router.post('/get-summary-issue', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
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
          {
            match_phrase: {
              user_screenname: req.body.user_screenname,
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
  };

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

router.post('/summary-negative', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let query = {
    index: 'twitter_dian',
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
                'insight.sentiment': 'Negative',
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

router.post('/summary-positive', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let query = {
    index: 'twitter_dian',
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
                'insight.sentiment': 'Positive',
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

router.post('/summary-neutral', (req, res) => {
  let today = new Date();
  let date = today.toISOString().split('T')[0];
  let twoweek = new Date(Date.now() - 12096e5);
  let twoweeksbefore = twoweek.toISOString().split('T')[0];
  let query = {
    index: 'twitter_dian',
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

module.exports = router;
