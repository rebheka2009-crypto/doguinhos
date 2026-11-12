const racas = document.getElementById("racas");
const quantidade = document.getElementById("quantidade");
const galeria = document.getElementById("galeria");
const mensagem = document.getElementById("mensagem")

// Carregar todas as racas 

async function carregarRacas() {
    try {
        const resposta = await fetch(
            "https://dog.ceo/api/breeds/list/all"
        );

        if (!resposta.ok) throw new Error("Erro na API");

        const dados = await resposta.json();

        for (let raca in dados.message) {
            const opcao = document.createElement("option");
            opcao.value = raca;
            opcao.textContent = raca;
            racas.appendChild(opcao);
        }
    }
    catch (erro) {
        mensagem.textContent = "Erro ao carregar raças."
    }
}

// Exibir as imagens recebidas 

function mostrarImagens(imagens) {
    galeria.innerHTML = "";

    imagens.forEach(function (url) {
        const imagem = document.createElement("img");
        imagem.src = url;
        imagem.alt = "Fotografia da raça escolhida"
        galeria.appendChild(imagem);
    });
}


// Buscar imagens API 
async function buscarImagens(url) {
    mensagem.textContent = "Carregando...";
    galeria.innerHTML = "";

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro ao buscar as imagens.")

        const dados = await resposta.json();

        mostrarImagens(dados.message);
        mensagem.textContent = "";
    } catch (erro) {
        mensagem.textContent = "Erro ao buscar imagens."
    }
}


// Mostrar cachorros aleatórios 
document.getElementById("aleatorios").addEventListener("click", function () {
    const numero = Number(quantidade.value);

    if (!Number.isInteger(numero) || numero < 1 || numero > 10) {
        mensagem.textContent = "Escolha um número de 1 a 10";
        return;
    }

    buscarImagens(
        `https://dog.ceo/api/breeds/image/random/${numero}`
    );
})

// Mostrar 3 Cachorros da raca selecionada 
document.getElementById("porRaca").addEventListener("click", function() {
    const raca = racas.value;

    if(raca === ""){
        mensagem.textContent = "Selecione uma raça";
        return
    }

    buscarImagens(
        `https://dog.ceo/api/breed/${raca}/images/random/3`
    )
});

// Carrega as raças ao abrir a página 

carregarRacas();
