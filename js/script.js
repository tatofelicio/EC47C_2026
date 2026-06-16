document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            dataNascimento: document.getElementById("data-nascimento").value,
            usuario: document.getElementById("usuario").value,
            senha: senha,
            perfil: document.getElementById("perfil").value
        };

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some(
            user => user.usuario === dados.usuario || user.email === dados.email
        );

        if (existe) {
            alert("Usuário ou e-mail já cadastrado.");
            return;
        }

        usuarios.push(dados);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");

        form.reset();
    });
});