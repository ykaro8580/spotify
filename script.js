const musica = [
    {
        titulo: "Preciso dizer que te amo",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 1.mp3",
        capa: "assets/capas/capa 1.jpg"
    },
    {
        titulo: "O velho e a Flor",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 2.mp3",
        capa: "assets/capas/capa 2.jpg"
    },

    {
        titulo: "Hotel California",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 3.mp3",
        capa: "assets/capas/capa 3.jpg"
    },

    {
        titulo: "Still Loving You",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 4.mp3",
        capa: "assets/capas/capa 4.jpg"
    },

    {
        titulo: "Cabide",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 5.mp3",
        capa: "assets/capas/capa 5.jpg"
    },

    {
        titulo: "Enter Sandman",
        artista: "Dona Duarte",
        audio: "assets/musicas/musica 6.mp3",
        capa: "assets/capas/capa 6.jpg"
    }

];

const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const capa = document.getElementById("capa");
const vinil = document.querySelector(".vinil");

const botaoPlay = document.getElementById("play");
const botaoAnterior = document.getElementById("anterior");
const botaoProxima = document.getElementById("proximo");


const barraProgresso = document.getElementById("barra-tempo");
const tempoDecorrido = document.getElementById("tempo-atual");
const duracaoMusica = document.getElementById("tempo-total");

const barraVolume = document.getElementById("barra-volume");

const itensPlaylist = document.querySelectorAll(".musica");

const botaoTeste = document.getElementById("btn");

let indice = 0;


alert("Esse projeto foi feito pra demonstrar minha admiração  por você e pelo que você escolhe sempre compartilhar comigo. Espero que goste, foi feito com amor =)");
alert("OBS: Tem poucas musicas pq alguem ai fica me mandando as melhores em visualiação unica, alem de tudo estar sem tratamento de audio, até pq se foi vc q fez, pra mim ja está otimo")


function atualizarPlaylist() {
    itensPlaylist.forEach((item, i) => {
        item.classList.toggle("ativa", i === indice);
    });
}

function carregarMusica() {
    titulo.textContent = musica[indice].titulo;
    artista.textContent = musica[indice].artista;
    capa.src = musica[indice].capa;
    audio.src = musica[indice].audio;

    audio.volume = barraVolume.value / 100;

    atualizarPlaylist();
}
carregarMusica();

itensPlaylist.forEach(item => {
    item.addEventListener("click", () => {
        indice = Number(item.dataset.index);

        carregarMusica();

        audio.play();
        vinil.classList.add("tocando");

        tocando = true;
        botaoPlay.textContent = "⏸";
    });
});

let tocando = false;


botaoPlay.addEventListener("click", () => {

    if (tocando) {

        audio.pause();

        botaoPlay.textContent = "▶";

        vinil.classList.remove("tocando");

        tocando = false;

    } else {

        audio.play();

        botaoPlay.textContent = "⏸";

        vinil.classList.add("tocando");

        tocando = true;

    }

});

botaoProxima.addEventListener("click", () => {
    indice++;
    if (indice >= musica.length) {
        indice = 0;
    }

    carregarMusica();
    audio.play();
    vinil.classList.add("tocando");
    tocando = true;
    botaoPlay.textContent = "⏸";
});

botaoAnterior.addEventListener("click", () => {

    indice--;

    if(indice < 0){
        indice = musica.length - 1;
    }

    carregarMusica();

    audio.play();
    vinil.classList.add("tocando");

    tocando = true;

    botaoPlay.textContent = "⏸";

});

audio.addEventListener("timeupdate", () => {
    barraProgresso.max = audio.duration;
    barraProgresso.value = audio.currentTime;
});

audio.addEventListener("loadedmetadata", () => {
    duracaoMusica.textContent = formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    tempoDecorrido.textContent = formatarTempo(audio.currentTime);
});

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segundosRestantes < 10 ? "0" : ""}${segundosRestantes}`;
}

barraProgresso.addEventListener("input", () => {

    audio.currentTime = barraProgresso.value;

});

audio.volume = barraVolume.value / 100;

barraVolume.addEventListener("input", () => {

    console.log(barraVolume.value);

    audio.volume = barraVolume.value / 100;

});