let json_information = [
    {
        "nome": "João",
        "CPF": "041999203",
        "endereço": {
            "cep": "7777777",
            "número": "23",
            "rua": "Rua Argélia",
            "complemento": null,
            "bairro": "Pavuna",
            "cidade": "Rio de Janeiro",
            "estado": "RJ",
            "pais": "Brasil"
        },
        "produtos_solicitados": [
            {
                "nome": "urso de pelucia",
                "codigo": "D59604",
                "entregue": true,
                "entrega": {
                    "enviado_em": {
                        "dia": "23",
                        "mes": "07",
                        "ano": "2019"
                    },
                    "recebido_em": {
                        "dia": "28",
                        "mes": "07",
                        "ano": "2019"
                    }
                }
            },
            {
                "nome": "cubo mágico",
                "codigo": "D940592",
                "entregue": false,
                "entrega": {
                    "enviado_em": null,
                    "recebido_em": null
                }
            },
            {
                "nome": "Playstation 4",
                "codigo": "D9429384",
                "entregue": false,
                "entrega": {
                    "enviado_em": {
                        "dia": "25",
                        "mes": "10",
                        "ano": "2020"
                    },
                    "recebido_em": null
                }
            }            
        ]
    }
]

// Operação de criação
let json_object = Object.create(json_information);

// Operação de alteração
console.log('Campo "json_object[0].nome" no objeto original: ', json_object[0].nome)
json_object[0].nome = "Maria";
json_object[0]['endereço']['cep'] = '0000000';
console.log('Campo "json_object[0].nome" no objeto alterado: ', json_object[0].nome)

// Operação de listar propriedades

// Código da biblioteca 'flatten' https://github.com/hughsk/flat
  function flatten (target, opts) {
    function isBuffer (obj) {
        return obj &&
          obj.constructor &&
          (typeof obj.constructor.isBuffer === 'function') &&
          obj.constructor.isBuffer(obj)
    }
      function keyIdentity (key) {
        return key
      }
    opts = opts || {}
  
    const delimiter = opts.delimiter || '.'
    const maxDepth = opts.maxDepth
    const transformKey = opts.transformKey || keyIdentity
    const output = {}
  
    function step (object, prev, currentDepth) {
      currentDepth = currentDepth || 1
      Object.keys(object).forEach(function (key) {
        const value = object[key]
        const isarray = opts.safe && Array.isArray(value)
        const type = Object.prototype.toString.call(value)
        const isbuffer = isBuffer(value)
        const isobject = (
          type === '[object Object]' ||
          type === '[object Array]'
        )
  
        const newKey = prev
          ? prev + delimiter + transformKey(key)
          : transformKey(key)
  
        if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
          (!opts.maxDepth || currentDepth < maxDepth)) {
          return step(value, newKey, currentDepth + 1)
        }
  
        output[newKey] = value
      })
    }
  
    step(target)
  
    return output
  }

let result = flatten(json_object[0])
result = Object.keys(result)
console.log('Listagem de propriedades do objeto: \n', result)

// Operação de listar valores

result = flatten(json_object[0])
result = Object.values(result)
console.log('Listagem de valores do objeto: \n', result)

// Operação de realizar cópia

// Precisamos fazer um deep copy do JSON:
let copy = JSON.parse(JSON.stringify(json_object[0]));

// Vamos deletar o objeto original:
delete json_object;

// O objeto copiado ainda existe:
console.log('Objeto copiado: \n', JSON.stringify(copy))