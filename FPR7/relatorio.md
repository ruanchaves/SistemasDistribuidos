* **Modelo: um objeto ou classe que tenha atributos e métodos de uma entidade, com pelo menos 2 atributos e 2 métodos** *(object.js)*

```javascript
let RecipeObject = {
    nome: "Beringela Empanada",
    ingredientes: [
        {
            nome: "Melancia",
            quantidade: 1,
            unidade: null
        },
        {
            nome: "Beringela",
            quantidade: 0.5,
            unidade: "kg"
        },
        {
            nome: "Sal",
            quantidade: 1,
            unidade: "colher"
        }
    ],
    adicionarIngrediente(ingrediente) {
        this.ingredientes.push(ingrediente);
    },
    removerIngrediente(indice) {
        this.ingredientes.splice(indice, 1);
    },
    modificarNome(novo_nome) {
        this.nome(novo_nome);
    }
}

// Falta a farinha de rosca para empanar a berinjela
RecipeObject.adicionarIngrediente({
    nome: "Farinha de rosca",
    quantidade: 1,
    unidade: "xícara"
})

// Não precisamos de melancia na receita da berinjela
RecipeObject.removerIngrediente(0);

console.log(RecipeObject);

module.exports = RecipeObject
```

* **Interface: a interface REST para o seu modelo, com pelo menos 2 rotas** *(routes.js)*

```javascript
const express = require('express');
const router = express.Router();

const Model = require('model')

router.get('/', (req,res) => {
    Model.find()
    .then( result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);        
    })
    .catch( err => next(err) );
});

router.post('/',(req,res) => {
    Model.create(req.body)
    .then( result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);        
    })
    .catch( err => next(err) );
});

module.exports = router;
```


* **Schema: criar o schema para gravar o seu objeto no banco de dados (Mongodb)** *(model.js)*

```javascript
var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema;
    
var IngredientesSchema = Schema({
    nome             : { type: String,   required: true },
    quantidade       : { type: Number,   required: false },
    unidade          : { type: String,   required: false}
});

var ReceitaSchema = Schema({
        nome                : { type: String, required: true },
        ingredientes        : [IngredientesSchema]
});

module.exports = ReceitaSchema;
```

* **Documentação: a documentação OpenAPI do seu modelo, com interface interativa via Swagger**

```yaml
swagger: "2.0"
info:
  version: "0.0.1"
  title: Receitas
host: localhost:10010
basePath: /app-docs
schemes:
  - http
  - https
consumes:
  - application/json
produces:
  - application/json
paths:
  /:
    x-swagger-router-controller: receita
    get:
      description: Retorna todas as receitas cadastradas no banco de dados.
      operationId: obter_receita
      responses:
        "200":
          description: Success
          schema:
            # a pointer to a definition
            $ref: "#/definitions/Receita"
        default:
          description: Error
          schema:
            $ref: "#/definitions/ErrorResponse"
    post:
      description: Adicionar uma nova receita ao banco de dados.
      operationId: postar_receita
      parameters:
        - name: nome
          in: query
          description: O nome da receita.
          required: true
          type: string
      responses:
        "200":
          description: Success
          schema:
            # a pointer to a definition
            $ref: "#/definitions/Receita"
        # responses may fall through to errors
        default:
          description: Error
          schema:
            $ref: "#/definitions/ErrorResponse"
  /swagger:
    x-swagger-pipe: swagger_raw
definitions:
  Receita:
    required:
      - nome
    properties:
      nome:
        type: string
      ingredientes:
        type: object
  ErrorResponse:
    required:
      - message
    properties:
      message:
        type: string
```
