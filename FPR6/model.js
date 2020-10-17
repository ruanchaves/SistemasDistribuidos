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