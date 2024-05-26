const html = document.querySelector("html");
const focusButton = document.querySelector(".app__card-button--foco");
const shortButton = document.querySelector(".app__card-button--curto");
const longButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseButton = document.querySelector("#start-pause");
const conteudoStartPauseBt = document.querySelector("#start-pause span");
const iconStartPauseBt = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio("sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoDecorrido = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

function playSom(caminho) {
    const som = new Audio(caminho);
    som.play();
}

focusButton.addEventListener("click", () => {
    tempoDecorrido = 1500;
    zerar();
    alteraContexto("foco");
    focusButton.classList.add("active");
});

shortButton.addEventListener("click", () => {
    tempoDecorrido = 300;
    zerar();
    alteraContexto("descanso-curto");
    shortButton.classList.add("active");
});

longButton.addEventListener('click', () => {
    tempoDecorrido = 900;
    zerar();
    alteraContexto("descanso-longo");
    longButton.classList.add("active");
});


function alteraContexto(contexto) {
    mostrarTempoNaTela();
    botoes.forEach(function (contexto) {
        contexto.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong"> Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorrido === 0) {
        zerar();
        playSom("sons/beep.mp3");
        return
    }
    tempoDecorrido -= 1;
    mostrarTempoNaTela();
}

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        playSom("sons/pause.mp3");
        return
    }
    conteudoStartPauseBt.textContent = "Pausar";
    iconStartPauseBt.setAttribute("src", "imagens/pause.png");
    playSom("sons/play.wav");
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    conteudoStartPauseBt.textContent = "Começar";
    iconStartPauseBt.setAttribute("src", "imagens/play_arrow.png");
    clearInterval(intervaloId);
    intervaloId = null;
}

startPauseButton.addEventListener("click", iniciarOuPausar);

function mostrarTempoNaTela() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempoNaTela();