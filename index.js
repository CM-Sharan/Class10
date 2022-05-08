const PORT = 8000
import express , {response} from 'express'
import axios from 'axios'
import * as cheerio from 'cheerio';


const app = express()

const articles = []

app.get('/', (req,res) => {
    res.json('Welcome to my Climate Change News API')})
app.get('/news', () => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) =>{
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("climate")', html).each(function (){
           const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
        res .json(articles)
    }).catch((err) => console.log(err))
})    

app.listen(PORT, () => console.log(`Server running on PORT ${PORT} `))
