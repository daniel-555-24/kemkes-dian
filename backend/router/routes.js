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


router.get('/index', (req,res) => {
    let query = {
        index : 'fixed_run1'
    }

    elasticClient.search(query)
    .then(resp => {
        return res.status(200).json({ value : resp.hits.hits})
    })

    .catch(err => {
        console.log(err)
        return res.status(500).json({ msg : 'error', err})
    })
})

router.get('/twitter', (req,res) => {
    let query = {
        index : 'fixed_run1',
        from : 0,
        size : 100,
        body: {
            query : {
                match : {"issue" : "vaksin"}
            },
            sort: {"user_postdate": {"order": "desc"}}
         }
    }

    elasticClient.search(query)
    .then(resp => {
        return res.status(200).json({ value : resp.hits.hits})
    })

    .catch(err => {
        console.log(err)
        return res.status(500).json({ msg : 'error', err})
    })
})

router.get('/news', (req,res) => {
    let query = {
        index : 'fixed_run2'
    }

    elasticClient.search(query)
    .then(resp => {
        return res.status(200).json({ value : resp.hits.hits})
    })

    .catch(err => {
        console.log(err)
        return res.status(500).json({ msg : 'error', err})
    })
})


router.get('/profile/:id', (req,res) => {
    let query = {
        index : 'fixed_run1',
        id : req.params.id
    }

    elasticClient.get(query)
    .then(resp => {
        if(!resp){
            return res.status(404).json({value : resp})
        }
        return res.status(200).json({ value : resp})
    })

    .catch(err => {
        console.log(err)
        return res.status(500).json({ msg : 'error', err})
    })
})

router.post('/get-per-issue', (req,res) => {
    let source = {
        index : "fixed_run1",
        // "_source": "issue",
        body: {
            query : {
                match : req.body
            }
         }
        
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

router.post('/get-per-issue-multiple', (req,res) => {
    let source = {
        index : "fixed_run3",
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
