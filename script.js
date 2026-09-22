console.log("SCRIPT DO SIMULADO FOI CARREGADO");

const formulario = document.getElementById("simuladoForm");

const API_URL = "http://localhost:3000";

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();

    const respostas = {};

    for (let i = 1; i <= 35; i++) {
        const selecionada = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        respostas[i] = selecionada ? selecionada.value : null;
    }

    try {
        const resposta = await fetch(`${API_URL}/api/corrigir`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                respostas: respostas
            })
        });

        if (!resposta.ok) {
            throw new Error("Erro no servidor");
        }

        const resultado = await resposta.json();

        let mensagem = document.getElementById("resultado");

        if (!mensagem) {
            mensagem = document.createElement("div");
            mensagem.id = "resultado";
            mensagem.style.textAlign = "center";
            mensagem.style.fontSize = "22px";
            mensagem.style.fontWeight = "bold";
            mensagem.style.margin = "30px 0";
            formulario.appendChild(mensagem);
        }

        let gabaritoHTML = "";

        for (let i = 1; i <= 35; i++) {
            gabaritoHTML += `<div>${i}. ${resultado.gabarito[i]}</div>`;
        }

        mensagem.innerHTML = `
            <div>
                Você acertou ${resultado.acertos} de ${resultado.total} questões
                (${resultado.percentual}% de aproveitamento).
            </div>

            <h2>Gabarito</h2>

            <div class="gabarito-final">
                ${gabaritoHTML}
            </div>
        `;

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível corrigir o simulado.");
    }
});