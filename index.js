const express = require('express')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const firebaseConfig = {
    //code
};

firebase.initializeApp(firebaseConfig)

app.post('/addData', (req, res)=>{
    let data = req.body
    firebase.firestore().collection('data').add(data).then((doc)=>{
        res.json({
            success:true,
            msg:"Data add with id = "+doc.id,
            data:data,
        });
    }).catch(e=>{
        res.json({
            success: false,
            error: e
        })
    })
})

app.get('/getAllData', (req,res)=>{
    let data = []
    firebase.firestore().collection('data').get().then((docs)=>{
        docs.forEach(doc=>{
            let obj = doc.data()
            obj['id']= doc.id
            data.push(obj)
        })
        res.json({
            count: data.length,
            data:data,
            msg: 'success'
        });
    }).catch(e=>{
        console.log(e)
        res.json(e)
    })
})

app.get('/getData/:id', (req,res)=>{
    let id = req.params.id
    firebase.firestore().collection('data').doc(id).get().then((doc)=>{
        let obj = doc.data()
        res.json({
            data:obj,
            msg: 'success'
        });
    }).catch(e=>{
        console.log(e)
        res.json(e)
    })
})

app.put('/editData/:id', (req,res)=>{
    let id = req.params.id
    let UpdatedData = req.body
    firebase.firestore().collection('data').doc(id).update(UpdatedData).then(()=>{
        res.json({
            data:UpdatedData,
            msg: 'success'
        });
    }).catch(e=>{
        console.log(e)
        res.json(e)
    })
})

app.delete('/removeData/:id', (req,res)=>{
    let id = req.params.id
    firebase.firestore().collection('data').doc(id).delete().then(()=>{
        res.json({
            data:{},
            msg: 'success'
        });
    }).catch(e=>{
        console.log(e)
        res.json(e)
    })
})

app.listen(process.env.PORT || 8080, () => {
    console.log('App listening on port 8080!');
});
