#  Send the data from client side:
```
-  socket.emit('new-user-joined', name) : it sending the name to server.


```

# Recieved the data in server side:
```
- socket.on('new-user-joined', function (name){
    console.log(name)
})

socket.on is read/catch the name on server.
```