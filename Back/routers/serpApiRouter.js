import express from 'express'
import axios from 'axios'

// const axios = require('axios');

const router = express.Router()

router.post("/serpapi", (req, res) => {
    let { engine, authorParam, authorInfo } = req.body; // engine =google_scholar_profiles or google_scholar_author authorParams= author_id or mauthors authorInfo =authorId or authorName
    
    // axios.get(`https://serpapi.com/search.json?engine=google_scholar_author&author_id=LSsXyncAAAAJ&api_key=3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06`)
    axios.get(`https://serpapi.com/search.json?engine=${engine}&${authorParam}=${authorInfo}&api_key=${process.env.API_KEY}`)
        .then(function (response) {
            
            console.log(response);
            // console.log( req.body);
            // console.log( process.env.API_KEY);
            res.send(response.data);
        })
        .catch(function (error) {            
            res.send(error.response.data);
        });
});


// Create author
// router.post('/', async (req, res) => {
//     try {
//         const text = "INSERT INTO authors (author_id, author_name, author_affilations, author_email, author_website, author_thumbnail) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *"

//         const values = [req.body.author_id,req.body.author_name,req.body.author_affilations, req.body.author_email, req.body.author_website, req.body.author_thumbnail]

//         const { rows } = await postgresClient.query(text, values)

//         return res.status(201).json({ createdUser: rows[0] })
//     } catch (error) {
//         console.log('Error occured', error.message)
//         return res.status(400).json({ message: error. message })
//     }
// })

// // Authenticate user
// router.post('/login', async (req, res) => {
//     try {
//         const text = "SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)"

//         const values = [req.body.email, req.body.password]

//         const { rows } = await postgresClient.query(text, values)
//         if(!rows.length)
//             return res.status(404).json({ message: 'User not found.' })

//         return res.status(200).json({ message: 'Authentication successful.' })
//     } catch (error) {
//         console.log('Error occured', error.message)
//         return res.status(400).json({ message: error.message })        
//     }
// })

// // Update user
// router.put('/update/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params

//         const text = "UPDATE users SET email = $1, fullname = $2 WHERE id = $3 RETURNING *"

//         const values = [req.body.email, req.body.fullname, userId]

//         const { rows } = await postgresClient.query(text, values)
//         if(!rows.length)
//             return res.status(404).json({ message: 'User not found.' })

//         return res.status(200).json({ updatedUser: rows[0] })
//     } catch (error) {
//         console.log('Error occured', error.message)
//         return res.status(400).json({ message: error.message })   
//     }
// })

// // Delete user
// router.delete('/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params

//         const text = "DELETE FROM users WHERE id = $1 RETURNING *"

//         const values = [userId]

//         const { rows } = await postgresClient.query(text, values)
//         if(!rows.length)
//             return res.status(404).json({ message: 'User not found.' })

//         return res.status(200).json({ deletedUser: rows[0] })
//     } catch (error) {
//         console.log('Error occured', error.message)
//         return res.status(400).json({ message: error.message })   
//     }
// })

// // Get users
// router.get('/', async (req, res) => {
//     try {
//         const text = "SELECT * FROM authors ORDER BY author_id ASC"

//         const { rows } = await postgresClient.query(text)

//         return res.status(200).json(rows)
//     } catch (error) {
//         console.log('Error occured', error.message)
//         return res.status(400).json({ message: error.message })   
//     }
// })


export default router