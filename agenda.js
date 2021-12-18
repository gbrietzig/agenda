// classe contato
class Contato {
    constructor(id, name, email){
        this.id=id
        this.name=name
        this.email=email
    }
}

// salvar no navegador
const STORAGE = {
    //buscar
    get(){
        return JSON.parse(localStorage.getItem("agenda:contatos")) || []
    },
    //salvar
    set(contatos){
        localStorage.setItem("agenda:contatos", JSON.stringify(contatos))
    }
}

const CONTATO = {
    contatos: STORAGE.get(),
    criarContato(){
        const contato = new Contato(UTILS.createId(this.contatos), FORMS.name.value, FORMS.email.value)
        CONTATO.contatos.push(contato)
        STORAGE.set(CONTATO.contatos)
    }
}

const UTILS = {
    createId(contatos) {
        lengthContatos=contatos.length
        if (lengthContatos == 0){
            return 1
        }
        else {
            lastContact=contatos[lengthContatos-1]
            return lastContact.id+1
        }
    }    
}

const FORMS = {
    name: document.querySelector('input#name'),
    email: document.querySelector('input#email')
}

const TABLE = {
    tbody: document.querySelector('tbody'),

    clearTable(){
        TABLE.tbody.innerHTML=``
    },

    navigateContacts(){
        const contatos = CONTATO.contatos
        contatos.forEach(contato => {
            TABLE.addContact(contato)            
        });
    },

    addContact(contato){
        const tr = document.createElement('tr')
        tr.innerHTML=`
            <td>${contato.id}</td>
            <td>${contato.name}</td>
            <td>${contato.email}</td>
        `
        TABLE.tbody.appendChild(tr)
    }
}

const APP = {
    init(){
        const contatos = CONTATO.contatos
        lengthContatos=contatos.length
        if (lengthContatos>0){
            TABLE.clearTable()
            TABLE.navigateContacts()
        }
    }
}

APP.init()