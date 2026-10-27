const formulario = document.querySelector("#formulario");

const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const nota1 = document.querySelector("#nota1");
const nota2 = document.querySelector("#nota2");
const nota3 = document.querySelector("#nota3");

const botaoLimpar = document.querySelector("#limpar");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    resultado.textContent = "";
    resultado.className = "";

    const nomeAluno = nome.value.trim();
    const idadeAluno = Number(idade.value);

    if (nomeAluno === "") {
        mostrarErro("Digite o nome completo do aluno.");
        return;
    }

    if (idade.value.trim() === "" ||
        !Number.isInteger(idadeAluno) ||
        idadeAluno <= 0) {
        mostrarErro("Digite uma idade inteira maior que zero.");
        return;
    }

    if (nota1.value.trim() === "" ||
        nota2.value.trim() === "" ||
        nota3.value.trim() === "") {
        mostrarErro("Preencha as três notas.");
        return;
    }

    const primeiraNota = Number(nota1.value);
    const segundaNota = Number(nota2.value);
    const terceiraNota = Number(nota3.value);

    const notas = [primeiraNota, segundaNota, terceiraNota];

    for (let i = 0; i < notas.length; i++) {
        if (!Number.isFinite(notas[i]) ||
            notas[i] < 0 || notas[i] > 10) {
            mostrarErro("Todas as notas devem estar entre 0 e 10.");
            return;
        }
    }

    const media = (primeiraNota + segundaNota + terceiraNota) / 3;

    let situacao = "";
    let classe = "";

    if (media >= 7) {
        situacao = "Aprovado";
        classe = "aprovado";
    } else if (media >= 5) {
        situacao = "Recuperação";
        classe = "recuperacao";
    } else {
        situacao = "Reprovado";
        classe = "reprovado";
    }

    const maiorNota = Math.max(...notas);
    const menorNota = Math.min(...notas);
    const somaNotas = primeiraNota + segundaNota + terceiraNota;
    const pontosFaltantes = Math.max(0, 21 - somaNotas);

    let mensagem = "";

    if (situacao === "Aprovado") {
        mensagem = "Parabéns, " + nomeAluno + "! Você foi aprovado.";
    } else if (situacao === "Recuperação") {
        mensagem = nomeAluno + ", você está de recuperação.";
    } else {
        mensagem = nomeAluno + ", você foi reprovado.";
    }

    let pontos = "";

    if (pontosFaltantes > 0) {
        pontos = "Faltaram " + pontosFaltantes.toFixed(2) +
            " pontos para alcançar a soma 21.";
    } else {
        pontos = "Você alcançou a soma necessária de 21 pontos.";
    }

    resultado.className = classe;

    const titulo = document.createElement("h2");
    titulo.textContent = "Resultado do aluno";

    const dados = document.createElement("p");
    dados.textContent =
        "Nome: " + nomeAluno +
        " | Idade: " + idadeAluno +
        " anos";

    const notasTexto = document.createElement("p");
    notasTexto.textContent =
        "Notas: " + primeiraNota + ", " +
        segundaNota + ", " + terceiraNota;

    const mediaTexto = document.createElement("p");
    mediaTexto.textContent = "Média final: " + media.toFixed(2);

    const situacaoTexto = document.createElement("p");
    situacaoTexto.textContent = "Situação: " + situacao;

    const mensagemTexto = document.createElement("p");
    mensagemTexto.textContent = mensagem;

    const maiorMenorTexto = document.createElement("p");
    maiorMenorTexto.textContent =
        "Maior nota: " + maiorNota +
        " | Menor nota: " + menorNota;

    const pontosTexto = document.createElement("p");
    pontosTexto.textContent = pontos;

    resultado.append(
        titulo,
        dados,
        notasTexto,
        mediaTexto,
        situacaoTexto,
        mensagemTexto,
        maiorMenorTexto,
        pontosTexto
    );
});

function mostrarErro(mensagem) {
    resultado.textContent = mensagem;
    resultado.className = "erro";
}

botaoLimpar.addEventListener("click", function() {
    resultado.textContent = "";
    resultado.className = "";
});