import express from 'express'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

import postgresClient from '../config/db.js'

// const axios = require('axios');

const router = express.Router()

router.post("/authorIdSearch", async (req, res) => {

    try{
        let { engine, authorParam, authorInfo } = req.body; // engine =google_scholar_profiles or google_scholar_author authorParams= author_id or mauthors authorInfo =authorId or authorName
    
        const text = "select * from authors WHERE author_id = $1";
        const values = [authorInfo];

    const { rows } = await postgresClient.query(text, values);
    if(rows.length === 0){
        console.log("Empty");

         // axios.get(`https://serpapi.com/search.json?engine=google_scholar_author&author_id=LSsXyncAAAAJ&api_key=3123940f5057559598689527ddaa958fec30e00c5b98241487c3c6b55e4ccc06`)
    axios.get(`https://serpapi.com/search.json?engine=${engine}&${authorParam}=${authorInfo}&api_key=${process.env.API_KEY}`)
    .then(async function (response) {
        
        

            console.log(response.data)
        console.log("autohrsB")
        const text = "INSERT INTO authors (author_id, author_name, author_affiliations, author_email, author_website, author_thumbnail) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *";
        const values = [authorInfo,response.data.author.name, response.data.author.affiliations, response.data.author.email, 
            response.data.author.website, response.data.author.thumbnail];
   
       const { rows } = await postgresClient.query(text, values);
       console.log("autohrsA")
       for(let i=0; i <response.data.author.interests.length;i++){
        console.log("ainterests")
        const interestText = "INSERT INTO author_interest (author_interest_id, interest_title, interest_link, interest_serpapi_link,author_id) VALUES ($1, $2, $3,$4,$5) RETURNING *";
        const interestValues = [uuidv4(), response.data.author.interests[i].title, response.data.author.interests[i].link,
            response.data.author.interests[i].serpapi_link, authorInfo];
   
       const { interestRows } = await postgresClient.query(interestText, interestValues);
       }
       

       for(let i=0; i< response.data.articles.length;i++){
        console.log("articles")
        let x = uuidv4()
        if(response.data.articles[i].year == ''){
            const articleText = "INSERT INTO author_articles (author_article_id, article_title, article_link, article_citation_id,article_authors,article_publication, article_year,author_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *";
            const articleValues = [x, response.data.articles[i].title, response.data.articles[i].link, response.data.articles[i].citation_id,
                response.data.articles[i].authors, response.data.articles[i].publication, 0, authorInfo];
       
           const { articleRows } = await postgresClient.query(articleText, articleValues);

        }
        else{const articleText = "INSERT INTO author_articles (author_article_id, article_title, article_link, article_citation_id,article_authors,article_publication, article_year,author_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *";
        const articleValues = [x, response.data.articles[i].title, response.data.articles[i].link, response.data.articles[i].citation_id,
            response.data.articles[i].authors, response.data.articles[i].publication, response.data.articles[i].year, authorInfo];
   
       const { articleRows } = await postgresClient.query(articleText, articleValues);}
        
        

       if(response.data.articles[i].cited_by.value === null){
        console.log("Nulll")
        const articleCitedByText = "INSERT INTO article_cited_by (article_cited_by_id,cited_by_link, author_article_id) VALUES ($1, $2, $3) RETURNING *";
        const articleCitedByValues = [uuidv4(), response.data.articles[i].cited_by.link, x];
   
       const { articleCitedByRows } = await postgresClient.query(articleCitedByText, articleCitedByValues);
       }
       else{
        console.log("doluCitedBy")
        const articleCitedByText = "INSERT INTO article_cited_by (article_cited_by_id, cited_by_value, cited_by_link,cited_by_cites_id, author_article_id,cited_by_serpapi_link) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *";
        const articleCitedByValues = [uuidv4(), response.data.articles[i].cited_by.value, response.data.articles[i].cited_by.link, response.data.articles[i].cited_by.cites_id, x,response.data.articles[i].cited_by.serpapi_link];
   
       const { articleCitedByRows } = await postgresClient.query(articleCitedByText, articleCitedByValues);

       }
      

       }

       for(let i=0; i<response.data.co_authors.length;i++){
        console.log("coooo")
        const coAuthorsText = "INSERT INTO coauthors (coauthors_name, coauthors_link, coauthors_id, coauthors_photo,coauthors_affilations,coauthors_email, author_id) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *";
       const coAuthorsValues = [response.data.co_authors[i].name, response.data.co_authors[i].link,response.data.co_authors[i].author_id,
       response.data.co_authors[i].thumbnail, response.data.co_authors[i].affiliations,response.data.co_authors[i].email, authorInfo];
  
      const { coAuthorsRows } = await postgresClient.query(coAuthorsText, coAuthorsValues);

       }

       //implement read all pages with next that include start=20
       

       
        // console.log()
        // console.log( req.body);
        // console.log( process.env.API_KEY);
        res.send(response.data);
    })
    .catch(function (error) {            
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error. message })
    });
    }else {
        console.log("dolu")
        // get datas from database
    }
   

    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error. message })
    }
    
});

router.post("/authorNameSearch", async (req, res) => {

    try{
        let { engine, authorParam, authorInfo } = req.body; // engine =google_scholar_profiles or google_scholar_author authorParams= author_id or mauthors authorInfo =authorId or authorName
        
        const text = "select * from profiles WHERE name = $1";
        const values = [authorInfo];

        const { rows } = await postgresClient.query(text, values);

        if(rows.length === 0){

            axios.get(`https://serpapi.com/search.json?engine=${engine}&${authorParam}=${authorInfo}&api_key=${process.env.API_KEY}`)
     .then(async function (response) {
             
         console.log(response.data.profiles[0].interests)
         // console.log( req.body);
         // console.log( process.env.API_KEY);

         for(let i=0; i <response.data.profiles.length;i++){
            const profileChtext = "select * from profiles WHERE author_id = $1";
            const profileChvalues = [response.data.profiles[i].author_id];
    
            const { profileChrows } = await postgresClient.query(profileChtext, profileChvalues);

            if(profileChrows === 0){
                console.log("aprofiles")
            const profileText = "INSERT INTO profiles (author_id, name, link, serpapi_link,affiliations, email, cited_by, thumbnail) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *";
            const profileValues = [response.data.profiles[i].author_id, response.data.profiles[i].name, response.data.profiles[i].link, response.data.profiles[i].serpapi_link, response.data.profiles[i].affiliations,
            response.data.profiles[i].email, response.data.profiles[i].cited_by, response.data.profiles[i].thumbnail];
           
            const interestChecktext = "select * from author_interest WHERE author_id = $1";
            const interestCheckvalues = [response.data.profiles[i].author_id];

             const { interestCheckrows } = await postgresClient.query(interestChecktext, interestCheckvalues);

             if(interestCheckrows === 0){
                for(let j=0; j < response.data.profiles[i].interests.length;j ++){

                    const interestText = "INSERT INTO author_interest (author_interest_id, interest_title, interest_link, interest_serpapi_link, author_id) VALUES ($1, $2, $3,$4,$5) RETURNING *";
                const interestValues = [uuidv4(), response.data.profiles[i].interests[j].title, response.data.profiles[i].interests[j].serpapi_link, response.data.profiles[i].interests[j].link,
                response.data.profiles[i].author_id];
    
                const { interestRows } = await postgresClient.query(interestText, interestValues);
    
                }
                
            }
            

             }                                            
           const { profileRows } = await postgresClient.query(profileText, profileValues);
           }
         res.send(response.data);
     })
     .catch(function (error) {            
         console.log('Error occured', error.message)
         return res.status(400).json({ message: error. message })
     });

        }else{
            
        }
        
     
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error. message })
    }
    
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