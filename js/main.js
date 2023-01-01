const form = document.querySelector('.adicionar');
const lista = document.querySelector('.lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
console.log(itens)
itens.forEach(e => {
    criaElemento(e)
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];

    const existeItem = itens.find(e=> e.nome === nome.value)
    //checa se os campos estao preenchidos
    if(nome.value === "" || quantidade.value === ""){
        window.alert("Preencha todos os campos.")
    } else {
        const itemAtual = {
            "nome": nome.value,
            "quantidade": quantidade.value
        };

        if(existeItem){
           const itemExistente = document.querySelector("[data-id='"+existeItem.id+"']")

           
           //muda numero no html
           itemExistente.innerHTML = parseInt(itemExistente.innerHTML) + parseInt(quantidade.value);
           //atuliza o item no localStorage
           itens[itens.findIndex(e=> e.id === existeItem.id)]['quantidade'] = itemExistente.innerHTML;

        }else{
            itemAtual.id = itens[itens.length - 1]  ? (itens[itens.length-1].id + 1) : 0
            criaElemento(itemAtual);
            //adiciona um novo elemento na lista e depois atualiza o localStorage
            itens.push(itemAtual);
        }
        localStorage.setItem("itens", JSON.stringify(itens));
    
    }
   
    nome.value = '';
    quantidade.value = '';
});

function criaElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item['quantidade'];
    numeroItem.dataset.id = item.id;
    
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item['nome'];
    novoItem.appendChild(botaoDeleta(item.id))
    lista.appendChild(novoItem);
};

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(e => e.id === id), 1)
    console.log(itens)
    localStorage.setItem("itens", JSON.stringify(itens));
    
}