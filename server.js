import express from 'express'
import { scrapeImages } from './src/scrape.js'

const app = express()

app.get('/', (req, res) => res.status(200).json({
    message: 'server is on',
    instructions: 'visit /scrape/:username enter the username of the person, make sure they are not private'
}))

app.get('/scrape/:username', async (req, res) => {
    const username = req.params.username
    const data = await scrapeImages(username)
    res.status(200).json({ data })
    console.log('data sent')
})

const PORT = process.env.PORT || 4000


app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Listening on Port: ${PORT}`)
})

