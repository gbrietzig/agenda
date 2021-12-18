class Storage {
    get(){
        return JSON.parse(localStorage.getItem("agenda:contatos")) || []
    }

    set(contatos){
        localStorage.setItem("agenda:contatos", JSON.stringify(contatos))
        
    }
}



