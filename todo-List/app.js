'use strict';

// JSON será utilizado p/ integrar com o LocalStorage
// Ao imputar os dados e pressionar enter, vai add +1 no BD = update na tela.
// Função para alocar dados do JSON no localStorage
// Em getBanco => (??) - Se for vazio, não existir ou nulo, passa para o proximo...
const getBanco = () => JSON.parse (localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));


// Função para criar uma label + indice:
const criarItem = (text, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
            <input type="checkbox" ${status} data-indice=${indice}>
            <div>${text}</div>
            <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)
}
 
// Função para deletar labels:
const limparTarefas = () => {
    // Elemento pai (todoList), cria var para receber todoList
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

// Função para atualizar a tela:
 const atualizarTela = () => {
     limparTarefas()
     const banco = getBanco ();
     banco.forEach((item,indice )=> criarItem (item.tarefa, item.status, indice))  
 }


 // Função para inserir:
const inserirItem = (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla==='Enter'){
        const banco = getBanco();
        //inserir item no array
        banco.push ({'tarefa': texto, 'status': ''})
        setBanco(banco);
        atualizarTela();
        //remover o que foi escrito (label)
        evento.target.value = '';
    }
}

// Remover um item do banco:
const removerItem = (indice) =>{
    const banco = getBanco()
    //splice - para modificar um array 
    banco.splice(indice,1)
    setBanco(banco)
    atualizarTela()
   
}
const atualizarItem = (indice) => {
    const banco = getBanco()
    banco [indice].status = banco [indice].status === '' ? 'checked' : '';
    setBanco(banco)
    atualizarTela()
}
const clickItem = (evento) => {
    const elemento = evento.target;
    //deletar o item:
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

//Função para inserir uma nova tarefa
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

 atualizarTela()