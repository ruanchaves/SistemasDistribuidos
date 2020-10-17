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