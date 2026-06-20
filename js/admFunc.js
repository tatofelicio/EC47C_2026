document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    renderizarLista();

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const senha = document.getElementById("senha").value;
            const confirmarSenha = document.getElementById("confirmar-senha").value;

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem. Tente novamente.");
                return; 
            }

            const dados = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                dataNascimento: document.getElementById("data-nascimento").value,
                usuario: document.getElementById("usuario").value,
                senha: senha,
                perfil: document.getElementById("perfil").value,
                dataEnvio: new Date().toLocaleString('pt-BR')
            };

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            
            const existe = usuarios.some(user => user.usuario === dados.usuario || user.email === dados.email);
            if (existe) {
                alert("Usuário ou e-mail já cadastrado no sistema.");
                return;
            }

            usuarios.push(dados);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            renderizarLista();
            form.reset();
            alert("Usuário cadastrado com sucesso!");
        });
    }
});

function renderizarLista() {
    const listaUsuarios = document.getElementById("listaUsuarios");
    if (!listaUsuarios) return;

    listaUsuarios.innerHTML = ""; 
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.forEach((usuario, index) => {
        const li = document.createElement("li");
        
        const dataExibicao = usuario.dataEnvio ? usuario.dataEnvio : "Data não registrada";

        li.innerHTML = `
            <strong>Data:</strong> ${dataExibicao} | 
            <strong>Nome:</strong> ${usuario.nome} | 
            <strong>E-mail:</strong> ${usuario.email}
            <button onclick="excluirItem(${index})" style="margin-left: 15px; background-color: #f0ad4e; padding: 5px 10px; font-size: 0.8em; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
        `;
        
        listaUsuarios.appendChild(li);
    });
}

function excluirItem(index) {
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário do sistema?");
    
    if (confirmacao) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        renderizarLista();
    }
}

function excluirTodos() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    if (usuarios.length === 0) {
        alert("A lista já está vazia!");
        return;
    }

    const confirmacao = confirm("Atenção: Deseja realmente excluir TODOS os usuários do sistema? Eles não poderão mais fazer login.");
    
    if (confirmacao) {

        localStorage.removeItem("usuarios");
        renderizarLista();
    }
}
function renderizarLista(termoBusca = "", campoBusca = "nome") {
    const listaUsuarios = document.getElementById("listaUsuarios");
    listaUsuarios.innerHTML = "";

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
        listaUsuarios.innerHTML = "<li>Nenhum usuário cadastrado no sistema.</li>";
        return;
    }

    let encontrouAlguem = false;

    usuarios.forEach((usuario, originalIndex) => {

        const valorDoCampo = (usuario[campoBusca] || "").toLowerCase();
        const busca = termoBusca.toLowerCase();


        if (valorDoCampo.includes(busca)) {
            encontrouAlguem = true;
            const dataExibicao = usuario.dataEnvio ? usuario.dataEnvio : "Data não registrada";

            const li = document.createElement("li");
 
            li.innerHTML = `
                <strong>Data:</strong> ${dataExibicao} | 
                <strong>Nome:</strong> ${usuario.nome} | 
                <strong>E-mail:</strong> ${usuario.email} | 
                <strong>Perfil:</strong> ${usuario.perfil}
                <button onclick="excluirItem(${originalIndex})" style="margin-left: 15px; background-color: #f0ad4e; padding: 5px 10px; font-size: 0.8em; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
            `;
            
            listaUsuarios.appendChild(li);
        }
    });

    if (!encontrouAlguem) {
        listaUsuarios.innerHTML = "<li>Nenhum usuário encontrado para este critério.</li>";
    }
}


function pesquisarUsuario() {
    const termo = document.getElementById("inputPesquisa").value;
    const campo = document.getElementById("campoPesquisa").value; 
    renderizarLista(termo, campo);
}


function limparPesquisa() {
    document.getElementById("inputPesquisa").value = "";
    document.getElementById("campoPesquisa").value = "nome"; 
    renderizarLista(); 
}

function togglePesquisa() {
    const container = document.getElementById("containerPesquisa");
    

    if (container.style.display === "none") {
        container.style.display = "flex";
    } else {
        container.style.display = "none";
        limparPesquisa(); 
    }
}