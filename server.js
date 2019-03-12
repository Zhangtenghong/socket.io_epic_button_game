const express=require('express');
const app=express();
let count=0;

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.get('/', function(req,res){
  res.render('index');
})

const server=app.listen(8000, ()=>{
  console.log('Server is running');
})
const io=require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('countclick',function(data){
    console.log(data.message)
    count+=1;
    console.log(count);
    io.emit('sendcount', {number:count});
  })
  socket.on('reset',function(data){
    console.log(data.message)
    count=0;
    console.log(count);
    io.emit('resetcount', {number:count});
  })
})
