// classe
class Contato {
    constructor(id, nome, email){
        id=parseInt(id)
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
    
    editarContato(id) {
        funcHTML.configurarBotoes("editar")
        const contatoSelecionado=this.obterContato(id)
        const index=this.contatos.indexOf(contatoSelecionado)
        funcHTML.preencherForm(contatoSelecionado)  
    },
    
    salvarContato() {     
        const id=funcHTML.id.value
        const nome= funcHTML.nome.value
        const email= funcHTML.email.value

        const contatoAtualizado= new Contato(id, nome, email)
        
        const contatoSelecionado=this.obterContato(id)
        const index=this.contatos.indexOf(contatoSelecionado)

        this.contatos.splice(index, 1, contatoAtualizado)
        funcStorage.set(this.contatos)

        funcHTML.limparForm()
        funcHTML.configurarBotoes("adicionar")

        //reestrura a página
        iniciar()


    },
    
    excluirContato(id) {
        // id = id do elemento clicado

        // busca todo o elemento na lista pelo id
        const contatoSelecionado=this.obterContato(id)

        // pega a posição do elemento, buscando o elemento na lista
        index=this.contatos.indexOf(contatoSelecionado)

        // na posição index, elimina apenas 1 elemento
        this.contatos.splice(index, 1)

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
    },

    apagarTudo(){
        funcStorage.set([])        
        this.contatos=funcStorage.get()
        iniciar()
    }
}

const funcHTML = {
    id: document.querySelector('input#id'),
    nome: document.querySelector('input#name'),
    email: document.querySelector('input#email'),
    table: document.querySelector('table.pure-table tbody'),
    submit: document.querySelector('button#submit'),
    cancel: document.querySelector('button#cancel'),

    limparTabela() {
        this.table.innerHTML=''
    },
    
    limparForm() {
        this.id.value=''
        this.nome.value=''
        this.email.value=''
    },

    configurarBotoes(estagio){
        if (estagio==="adicionar"){
            this.submit.innerHTML='Adicionar'
            this.cancel.innerHTML='Limpar'
        }
        else if (estagio==="editar"){
            this.submit.innerHTML='Salvar'
            this.cancel.innerHTML='Cancelar'
        }
    },

    adicionarElementos(){
        const contatos = funcStorage.get()

        //apagar todas as informações
        this.limparTabela()    
        
        // se tiver algum contato
        if (contatos.length > 0) {
            //preencher a tabela
            contatos.forEach(contato => {
                const linha = document.createElement('tr')
                linha.innerHTML=`
                    <td>${contato.id}</td>
                    <td>${contato.nome}</td>
                    <td>${contato.email}</td>
                    <td>
                        <a href="#" class="comando-contato editar" onclick="funcContato.editarContato(${contato.id})">&#128393;</a>
                        <a href="#" class="comando-contato excluir" onclick="funcContato.excluirContato(${contato.id})">&#128465;</a>
                    </td>
                `
                this.table.appendChild(linha)
            });
        }
        else{
            const linha = document.createElement('tr')
            linha.innerHTML=`
              <td colspan="4">Não existem dados registrados!</td>
            `
            this.table.appendChild(linha)
        }
    },

    preencherForm(contato){
        this.id.value=contato.id
        this.nome.value=contato.nome
        this.email.value=contato.email
    },

    botaoSubmit(){
        if (this.id.value===''){
            funcContato.adicionarContato()
            this.limparForm()
        }
        else{
            funcContato.salvarContato()
        }
    },

    botaoCancelar(){
        if (this.id.value===''){
            this.limparForm()
        }
        else{            
            this.limparForm()
            this.configurarBotoes('adicionar')
        }
    }
}

function iniciar(){
    funcHTML.adicionarElementos()
}

iniciar()

