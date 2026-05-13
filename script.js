// Esta é a nossa lista que começa vazia
let listaDeNumeros = [];

function adicionarNumero() {
    const input = document.getElementById('inputNumero');
    const valor = parseFloat(input.value);

    // Verifica se o usuário realmente digitou um número
    if (!isNaN(valor)) {
        listaDeNumeros.push(valor); // Adiciona o número na lista
        
        // Atualiza o texto na tela para o usuário ver o que já digitou
        document.getElementById('listaNumeros').innerText = "Números: [" + listaDeNumeros.join(', ') + "]";
        
        input.value = ''; // Limpa o campo para o próximo número
        input.focus();    // Deixa o cursor pronto para digitar de novo
    } else {
        alert("Por favor, digite um número válido.");
    }
}

// ==========================================
// FUNÇÕES AUXILIARES DE CÁLCULO
// ==========================================

function obterMedia() {
    let soma = 0;
    for (let i = 0; i < listaDeNumeros.length; i++) {
        soma += listaDeNumeros[i];
    }
    return soma / listaDeNumeros.length;
}

function obterVarianciaAmostral() {
    let media = obterMedia();
    let somaDiferencasQuadradas = 0;
    
    // Soma os quadrados das diferenças em relação à média
    for (let i = 0; i < listaDeNumeros.length; i++) {
        somaDiferencasQuadradas += Math.pow(listaDeNumeros[i] - media, 2);
    }
    
    // Como é variância amostral, dividimos por (n - 1)
    return somaDiferencasQuadradas / (listaDeNumeros.length - 1);
}

function obterDesvioPadrao() {
    // O desvio padrão é apenas a raiz quadrada da variância
    return Math.sqrt(obterVarianciaAmostral());
}


// ==========================================
// FUNÇÕES LIGADAS AOS BOTÕES DO HTML
// ==========================================

function calcularMedia() {
    if (listaDeNumeros.length === 0) {
        alert("Adicione pelo menos um número antes de calcular.");
        return;
    }

    let media = obterMedia();
    document.getElementById('resultado').innerText = "Média: " + media.toFixed(2);
}

function calcularMediana() {
    if (listaDeNumeros.length === 0) {
        alert("Adicione pelo menos um número antes de calcular.");
        return;
    }

    // Faz uma cópia da lista e ordena os números em ordem crescente
    let ordenados = [...listaDeNumeros].sort((a, b) => a - b);
    let tamanho = ordenados.length;
    let meio = Math.floor(tamanho / 2);
    let mediana;

    if (tamanho % 2 !== 0) {
        // Se a quantidade de números for ímpar, pega o valor central
        mediana = ordenados[meio];
    } else {
        // Se for par, faz a média dos dois valores centrais
        mediana = (ordenados[meio - 1] + ordenados[meio]) / 2;
    }

    document.getElementById('resultado').innerText = "Mediana: " + mediana.toFixed(2);
}

function calcularVariancia() {
    if (listaDeNumeros.length < 2) {
        alert("Adicione pelo menos dois números para calcular a variância amostral.");
        return;
    }

    let variancia = obterVarianciaAmostral();
    document.getElementById('resultado').innerText = "Variância Amostral: " + variancia.toFixed(2);
}

function calcularDesvio() {
    if (listaDeNumeros.length < 2) {
        alert("Adicione pelo menos dois números para calcular o desvio padrão.");
        return;
    }

    let desvio = obterDesvioPadrao();
    document.getElementById('resultado').innerText = "Desvio Padrão: " + desvio.toFixed(2);
}

function calcularCoeficienteVariacao() {
    if (listaDeNumeros.length < 2) {
        alert("Adicione pelo menos dois números para calcular o coeficiente de variação.");
        return;
    }

    let media = obterMedia();
    
    // Verifica se a média é zero para evitar divisão por zero
    if (media === 0) {
        alert("A média é zero. O coeficiente de variação não pode ser calculado.");
        return;
    }

    let desvio = obterDesvioPadrao();
    
    // O coeficiente de variação é (Desvio Padrão / Média) * 100
    let cv = (desvio / media) * 100;
    document.getElementById('resultado').innerText = "Coef. de Variação: " + cv.toFixed(2) + "%";
}

function limpar() {
    listaDeNumeros = [];
    document.getElementById('listaNumeros').innerText = "Números: []";
    document.getElementById('resultado').innerText = "Média: -";
}