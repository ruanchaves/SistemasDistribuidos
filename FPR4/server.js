var express = require('express');
var app = express();
var fs = require("fs").promises;
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

async function getUsername(object){
    let object_keys = Object.keys(object);
    let object_numbers = [];
    object_keys.forEach(element => object_numbers.push(element.match(/\d+/)[0]))
    let toNumbers = arr => arr.map(Number);
    object_numbers = toNumbers(object_numbers);
    max_value = Math.max(...object_numbers) + 1;
    max_value = 'user' + max_value.toString();
    return max_value;
}

app.post('/addUser', async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let new_username = await getUsername(fileJSON);
    fileJSON[new_username] = req.body;
    let json_dump = JSON.stringify(fileJSON, null, 2)
    // 2.1) persistir as modificações no arquivo users.json
    await fs.writeFile(__dirname + "/" + "users.json", json_dump);
    res.sendStatus(200);
 })

 app.get('/id/:id', async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let selected_users = {}
    for(user in fileJSON){
        if (fileJSON[user]['id'] === req.params.id){
            selected_users[user] = fileJSON[user]
        }
    }
    console.log(selected_users);
    res.sendStatus(200);
 });


//  2.2) pelo menos mais uma pesquisa parametrizada, por id ou outra propriedade da pessoa
 app.get('/profession/:profession', async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let selected_users = {}
    for(user in fileJSON){
        if (fileJSON[user]['profession'] === req.params.profession){
            selected_users[user] = fileJSON[user]
        }
    }
    console.log(selected_users);
    res.sendStatus(200);
 });

//  2.3) uma mesma funcionalidade, por exemplo "deletar pessoa", implementada no mesmo caminho, mas com variações de comando, por exemplo:
//  usando GET, com caminho /deleteUser/1
//  usando DELETE, com corpo body JSON: {"user": "1"}
//  usando POST, com corpo body JSON: {"user": "1"} 
 app.delete('/deleteUser', async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let username = 'user' + fileJSON['user'].toString();
    delete fileJSON[username];
    let json_dump = JSON.stringify(fileJSON, null, 2)
    // 2.1) persistir as modificações no arquivo users.json
    await fs.writeFile(__dirname + "/" + "users.json", json_dump);
    res.sendStatus(200);
 })


//  2.3) uma mesma funcionalidade, por exemplo "deletar pessoa", implementada no mesmo caminho, mas com variações de comando, por exemplo:
//  usando GET, com caminho /deleteUser/1
//  usando DELETE, com corpo body JSON: {"user": "1"}
//  usando POST, com corpo body JSON: {"user": "1"} 
 app.get('/deleteUser/:id', async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let username = 'user' + req.params.id.toString();
    delete fileJSON[username];
    let json_dump = JSON.stringify(fileJSON, null, 2)
    // 2.1) persistir as modificações no arquivo users.json
    await fs.writeFile(__dirname + "/" + "users.json", json_dump);
    res.sendStatus(200);
 })

//  2.3) uma mesma funcionalidade, por exemplo "deletar pessoa", implementada no mesmo caminho, mas com variações de comando, por exemplo:
//  usando GET, com caminho /deleteUser/1
//  usando DELETE, com corpo body JSON: {"user": "1"}
//  usando POST, com corpo body JSON: {"user": "1"} 
 app.post('/deleteUser' , async function (req, res) {
    // First read existing users.
    const file = await fs.readFile( __dirname + "/" + "users.json");
    let fileJSON = JSON.parse(file.toString());
    let username = 'user' + fileJSON['user'].toString();
    delete fileJSON[username];
    let json_dump = JSON.stringify(fileJSON, null, 2)
    await fs.writeFile(__dirname + "/" + "users.json", json_dump);
    res.sendStatus(200);
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

