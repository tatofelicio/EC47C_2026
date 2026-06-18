document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuarioDigitado = document.getElementById("usuario").value;
        const senhaDigitada = document.getElementById("senha").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(user =>
            (user.usuario === usuarioDigitado ||
             user.email === usuarioDigitado) &&
            user.senha === senhaDigitada
        );

        if (usuarioEncontrado) {
            alert(`Bem-vindo, ${usuarioEncontrado.nome}!`);

            // Salva usuário logado
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuarioEncontrado)
            );

            // Redireciona para página inicial
            window.location.href = "../index.html";
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });
});