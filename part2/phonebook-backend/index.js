const express = require('express')
const app = express()
const morgan = require('morgan')

// parse json request bodies
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// parse json request bodies
app.use(express.json())

app.use(morgan('tiny'))

// get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get persons:id
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// delete person:id
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // filters through person array and creates a new one without
    // the given id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// generate id
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

// does name exist
const findName = (name) => {
    let found = false
    const personFound = persons.find(person => person.name === name)

    if (personFound) {
        found = true
    }

    return found
}

// create person
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (findName(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } 

    const person = {
        id: generateId(),
        name: body.name,
        numer: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

// get info
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${date}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})