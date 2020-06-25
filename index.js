require('dotenv').config()

const express = require('express')
const massive = require('massive')
const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

app.get('/api/json', async (req, res) => {
  const db = req.app.get('db')

  // Another way to do it using built in Massive functions
  // const jsonObj = await db.json_table.find(1)
  const jsonObj = await db.get_json_obj(1)

  console.log(jsonObj) // What we get back from db
  
  res.status(200).send(jsonObj)
})

app.post('/api/json', async (req, res) => {
  const db = req.app.get('db')
  const { doc } = req.body
  console.log(doc) // What we get off of req.body. Should be a javascript obj.
  
  // Another way to do it using built in Massive functions. This way does not require the JSON.stringify
  // const jsonObj = await db.json_table.save({ doc })
  const docStringified = JSON.stringify(doc)
  const jsonObj = await db.insert_json_obj(docStringified)

  console.log(jsonObj) // What we get back from db
  
  res.status(200).send(jsonObj)
})

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
  .then((db) => {
    app.set('db', db)
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on port ${SERVER_PORT}`)
    )
  })
  .catch((err) => console.log(err))
