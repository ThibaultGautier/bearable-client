const express = require('express')
const request = require('request-promise')
const exphbs = require('express-handlebars')
const path = require("path")
const app = express();
var bodyParser = require('body-parser')
var id;
var cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, '/views')));

app.get('/bars', (req, res) => {
    request.get('http://localhost:3000/bars', { json: true })
        .then((response) => {
            if (response.length) {
                res.render('bars', {
                    content: response,
                    published: true
                })
            }
        })
})

//GET BEERS
app.get('/beers', (req, res) => {
    request.get('http://localhost:3000/beers', { json: true })
        .then((response) => {
            if (response.length) {
                res.render('beers', {
                    content: response,
                    published: true
                })
            }
        })
})



//Voir les brasseries
app.get('/breweries', (req, res) => {
    request.get('http://localhost:3000/breweries', { json: true })
        .then((response) => {
            if (response.length) {
                res.render('breweries', {
                    content: response,
                    published: true
                })
            }
        })
})

//Formulaire d'ajout de brasserie
app.get('/breweriesAdd', (req, res)=>{
    res.render('addBreweries')
})

//Modifier brasserie
app.get('/breweriesPut/:id', (req, res)=>{
    id = req.params.id
    console.log("ID : " + id)
    res.render('ModifyBreweries', {
        content: req.params.id, 
        published: true
    })
})

app.post('/ModifyBreweries', (req, res)=>{
    console.log("REQ BODY : " + req.body.name)
    request.put(`http://localhost:3000/breweries/edit/${id}`, {json:true})
        .then((response)=>{
            console.log("RESPONSE : " + response.name)
            console.log("RESPONSE : " + response.brand)
            res.render('breweries', {
                content: response,
                published: true
            })
        })
})

// SUPPRIMER BRASSERIE
app.get('/delete/:id', (req, res)=>{
    request.delete('http://localhost:3000/breweries/delete/'+req.params.id, {json: true})
        .then((response)=>{
            JSON.stringify(response)
            res.send("Brasserie Supprimée")
        })
})




app.get('/', (req, res) => {
    res.render('login')
})

// app.post('/login', (req, res) => {
//     console.log(req.body.password)
//     request.post('http://localhost:3000/login', {json: true})
//             .then((response)=>{
//                 console.log(response)
//                 res.render('islogged', {
//                     content: response,
//                     published: true
//                 })
//             })
// })

app.post('/login', (req, res) => {
    console.log(req.body.pseudo)
    console.log(req.body.password)
    
    var options = {
        method: 'POST',
        uri: 'http://localhost:3000/login',
        body: {
            pseudo: req.body.pseudo,
            password: req.body.password
        },
        json: true
    }

    request(options).then((response)=>{
        res.send("zepjfzepofpzoef")
    })
})

app.listen(1337)