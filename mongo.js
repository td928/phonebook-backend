const mongoose = require('mongoose')

const url = 
    `mongodb+srv://fullstack:${password}@cluster0-bck0g.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)


if ( process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

if ( process.argv.length === 5) {

    const person = new Person({
        name : name,
        number: number,
        id: Math.floor(Math.random() * 1000)
    })

    person.save().then(res => {
        console.log(`add ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
    })
}

if ( process.argv.length === 3) {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person =>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}



 