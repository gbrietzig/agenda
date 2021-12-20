// classe
class Contato {
    constructor(id, nome, email){
        this.id=id
        this.nome=nome
        this.email=email
    }
}

const funcStorage = {
    //buscar
    get(){
        return JSON.parse(localStorage.getItem("agenda:contatos")) || []
    },
    //salvar
    set(contatos){
        localStorage.setItem("agenda:contatos", JSON.stringify(contatos))
    }
}

const funcContato = {
    contatos: funcStorage.get(),

    adicionarContato() {       
        const id=this.criarId()
        const nome= funcHTML.nome.value
        const email= funcHTML.email.value
    
        const novoContato= new Contato(id, nome, email)
    
        this.contatos.push(novoContato)
        funcStorage.set(this.contatos)

        //reestrura a página
        iniciar()
    },
    
    editarContato() {
    
    },
    
    excluirContato(id) {
        // id = id do elemento clicado

        // busca todo o elemento na lista pelo id
        const contatoSelecionado=this.obterContato(id)

        // pega a posição do elemento, buscando o elemento na lista
        index=this.contatos.indexOf(contatoSelecionado)
        console.log(index)
        // na posição index, elimina apenas 1 elemento
        this.contatos.splice(index, 1)

        console.log(this.contatos)

        // atualiza a lista no storage
        funcStorage.set(this.contatos)

        //reestrura a página
        iniciar()
    
    },

    criarId() {
        const lengthContatos = this.contatos.length
        if (lengthContatos==0){
            return 1
        }
        else{

            index=lengthContatos-1
            ultimoContato=this.contatos[index]
            idUltimoContato=ultimoContato.id
            novoId=idUltimoContato+1

            return novoId
        }
    },
    
    obterContato(id) {
        return this.contatos.find(contato => contato.id == id)
    }
}

const funcHTML = {
    nome: document.querySelector('input#name'),
    email: document.querySelector('input#email'),
    table: document.querySelector('table.pure-table tbody'),

    limparTabela() {
        this.table.innerHTML=''
    },

    adicionarElementos(){
        const contatos = funcStorage.get()

        // se tiver algum contato
        if (contatos.length > 0) {
            //apagar todas as informações
            this.limparTabela()
            //preencher a tabela
            contatos.forEach(contato => {
                const tr = document.createElement('tr')
                tr.innerHTML=`
                    <td>${contato.id}</td>
                    <td>${contato.nome}</td>
                    <td>${contato.email}</td>
                    <td><a href="#">Editar</a> // <a href="#" onclick="funcContato.excluirContato(${contato.id})">Excluir</a></td>
                `
                this.table.appendChild(tr)
            });
        }
    }
}

function teste(){
    funcContato.adicionarContato()
}

function iniciar(){
    funcHTML.adicionarElementos()
}

iniciar()
