const express = require('express'); //imports express
const app = express(); //initialize express

const PORT = 3000;
//starts the express application
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/', (req, res)=>{
//     res.send('Hello, World!');
// })

app.get('/', (req, res)=>{
    res.send('Welcome');
})

app.get('/hello', (req, res)=>{
    res.send('Hello!');
})

app.get('/world', (req, res)=>{
    res.send('World');
})

app.get('/getHtml', (req, res)=>{
    res.sendFile(__dirname + '/hello.html');
})
