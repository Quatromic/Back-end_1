const app = require('express')()
const PORT = 8500,fs = require('fs')

app.use(require('express').static('./Front-end/styles'))
app.use(require('express').static('./Front-end/Images'))
app.use((request,response,next) => {
    console.log(`${request.method}: ${request.url}`)
    next()
})

app.get('/' || '/index.html',(request,response) => {
    let htmlPage = fs.readFileSync('./Front-end/Content/Pages/index.html',{encoding:'utf-8'})
    response.status(200).send(htmlPage)
})
app.get('/about.html',(request,response) => {
    let aboutPage = fs.readFileSync('./Front-end/Content/Pages/about.html',{encoding:'utf-8'})
    response.status(200).send(aboutPage)
})

//Error Page
app.use('*',(request,response,next) => {
    let ErrorPage = fs.readFileSync('./Front-end/Content/Pages/Error.html',{encoding:'utf-8'})
    response.send(ErrorPage)
    next()
})

app.listen(PORT,() => {
    console.log("Server is up and running")
})