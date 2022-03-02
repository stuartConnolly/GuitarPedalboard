const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
  

  res.set({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  })


});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



