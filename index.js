const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

morgan.token('id', function getId(req) {
    return req.id
})

morgan.token('person', function getPerson(req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :res[content-length] :response-time :person'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    }
]


app.get('/api/persons', (req, res) => {

    //console.log('what is the response anyway?', res)
    //console.log('what is the request anyway?', req)

    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

/*
const generateId = () =>{
    const maxId = notes.length > 0
        ? Math.max(...persons.map(p => p.id ))
        : 0
    return maxId + 1
}
*/

app.post('/api/persons', (req, res) =>{

    const body = req.body

    console.log('what is body now', body)

    const isdup = persons.findIndex(p => p.name === body.name)

    console.log('is there anything ', isdup)

    if (!(body.name) || !(body.number)) {
        return res.status(400).json({
            error:'name or number is missing'
        })
    } if (isdup > -1) {
        return res.status(400).json({
            error:'name must be unique!'
        })
    } 

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }
 
    persons = persons.concat(person)

    console.log('the new persons array', persons)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


app.get('/api/info', (req, res) => {

    // 
    const num_pers = persons.length

    const date = Date.now()

    res.write(`Phonebook has info for ${num_pers} people`)

    res.write(`${date}`)

    res.end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})