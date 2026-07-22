const quizContainer = document.getElementById('quiz-container');
const p1 = document.getElementById('pergunta-1');
const p2 = document.getElementById('pergunta-2');
const sitePrincipal = document.getElementById('site-principal');
const contadorDias = document.getElementById('contador-dias');

const btnNao1 = document.getElementById('btn-nao-1');
const btnNao2 = document.getElementById('btn-nao-2');
const btnSim1 = document.getElementById('btn-sim-1');
const btnSim2 = document.getElementById('btn-sim-2');

const musica = document.getElementById('musica-fundo');
const somAcerto = document.getElementById('som-acerto');
const somErro = document.getElementById('som-erro');

const dataInicio = new Date('2025-05-25T00:00:00'); 

function atualizarContador() {
    const hoje = new Date();
    const diffTempo = hoje - dataInicio;
    const diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
    contadorDias.innerText = Math.max(0, diffDias);
}
atualizarContador();

function gerarFloresFundo() {
    const container = document.getElementById('flores-container');
    const tiposFlores = ['🌸', '🌺', '🌼', '🌹', '🌷'];
    
    setInterval(() => {
        const flor = document.createElement('div');
        flor.classList.add('flor-bg');
        flor.innerHTML = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];
        flor.style.left = Math.random() * 100 + 'vw';
        const tamanho = Math.random() * 20 + 15;
        flor.style.fontSize = `${tamanho}px`;
        flor.style.animationDuration = (Math.random() * 5 + 4) + 's';
        flor.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(flor);
        setTimeout(() => { flor.remove(); }, 9000);
    }, 600); 
}
gerarFloresFundo();

function fugir(botao) {
    try {
        somErro.currentTime = 0;
        somErro.play().catch(e => {});
    } catch(e) {}
    
    if (botao.parentNode !== document.body) {
        document.body.appendChild(botao);
    }
    
    const maxLargura = window.innerWidth - botao.offsetWidth - 20;
    const maxAltura = window.innerHeight - botao.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxLargura));
    const randomY = Math.max(10, Math.floor(Math.random() * maxAltura));
    
    botao.style.position = 'fixed';
    botao.style.left = `${randomX}px`;
    botao.style.top = `${randomY}px`;
    botao.style.zIndex = '9999';
}

btnNao1.addEventListener('click', (e) => { e.preventDefault(); fugir(btnNao1); });
btnNao2.addEventListener('click', (e) => { e.preventDefault(); fugir(btnNao2); });

btnSim1.addEventListener('click', () => {
    try { somAcerto.play().catch(e => {}); } catch(e) {}
    if (btnNao1.parentNode === document.body) btnNao1.remove();
    btnNao1.style.display = 'none';
    
    p1.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        p1.style.display = 'none';
        p2.style.display = 'block';
        p2.classList.remove('hidden');
        setTimeout(() => {
            p2.classList.remove('opacity-0', 'scale-95');
            p2.classList.add('opacity-100', 'scale-100');
        }, 50);
    }, 300);
});

btnSim2.addEventListener('click', () => {
    try { 
        somAcerto.play().catch(e => {});
        musica.play().catch(e => {}); 
    } catch(e) {}
    
    quizContainer.classList.add('opacity-0');
    document.getElementById('flores-container').style.opacity = '0';
    
    if (btnNao1.parentNode === document.body) btnNao1.remove();
    if (btnNao2.parentNode === document.body) btnNao2.remove();

    setTimeout(() => {
        quizContainer.style.display = 'none';
        sitePrincipal.style.display = 'flex';
        setTimeout(() => {
            sitePrincipal.classList.remove('opacity-0');
            sitePrincipal.classList.add('opacity-100');
            iniciarCoracoes();
            iniciarConexaoAPI();
        }, 50);
    }, 700);
});

function iniciarCoracoes() {
    const container = document.getElementById('coracoes-container');
    const tiposCoracoes = ['❤️', '💖', '💘', '💕', '💓', '✨'];
    
    setInterval(() => {
        const coracao = document.createElement('div');
        coracao.classList.add('coracao');
        coracao.innerHTML = tiposCoracoes[Math.floor(Math.random() * tiposCoracoes.length)];
        coracao.style.left = Math.random() * 100 + 'vw';
        const tamanho = Math.random() * 24 + 20;
        coracao.style.fontSize = `${tamanho}px`;
        coracao.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(coracao);
        setTimeout(() => { coracao.remove(); }, 6000);
    }, 250);
}

function mudarPagina(idPagina) {
    document.getElementById('pagina-home').classList.add('hidden');
    document.getElementById('pagina-conexao').classList.add('hidden');
    document.getElementById('pagina-playlist').classList.add('hidden');
    document.getElementById('pagina-capsula').classList.add('hidden');
    document.getElementById('pagina-saude').classList.add('hidden');
    
    document.getElementById('tab-home').className = "px-4 py-2 rounded-full font-semibold transition-all bg-white/60 text-red-700 hover:bg-white text-sm md:text-base";
    document.getElementById('tab-conexao').className = "px-4 py-2 rounded-full font-semibold transition-all bg-white/60 text-red-700 hover:bg-white text-sm md:text-base";
    document.getElementById('tab-playlist').className = "px-4 py-2 rounded-full font-semibold transition-all bg-white/60 text-red-700 hover:bg-white text-sm md:text-base";
    document.getElementById('tab-capsula').className = "px-4 py-2 rounded-full font-semibold transition-all bg-white/60 text-red-700 hover:bg-white text-sm md:text-base";
    document.getElementById('tab-saude').className = "px-4 py-2 rounded-full font-semibold transition-all bg-white/60 text-red-700 hover:bg-white text-sm md:text-base";
    
    document.getElementById(idPagina).classList.remove('hidden');
    if(idPagina === 'pagina-home') {
        document.getElementById('tab-home').className = "px-4 py-2 rounded-full font-semibold transition-all bg-red-500 text-white shadow-md text-sm md:text-base";
    } else if(idPagina === 'pagina-conexao') {
        document.getElementById('tab-conexao').className = "px-4 py-2 rounded-full font-semibold transition-all bg-red-500 text-white shadow-md text-sm md:text-base";
    } else if(idPagina === 'pagina-playlist') {
        document.getElementById('tab-playlist').className = "px-4 py-2 rounded-full font-semibold transition-all bg-red-500 text-white shadow-md text-sm md:text-base";
    } else if(idPagina === 'pagina-capsula') {
        document.getElementById('tab-capsula').className = "px-4 py-2 rounded-full font-semibold transition-all bg-red-500 text-white shadow-md text-sm md:text-base";
    } else {
        document.getElementById('tab-saude').className = "px-4 py-2 rounded-full font-semibold transition-all bg-red-500 text-white shadow-md text-sm md:text-base";
    }
}

const bancoRemedios = [
    { nome: "Paracetamol / Dipirona", sintoma: "Dor de cabeça, febre e dores no corpo leve", dica: "Bom para baixar febre e aliviar dores musculares." },
    { nome: "Ibuprofeno", sintoma: "Inflamação, cólicas, dor de dente e inflamação articular", sintomaBusca: "inflamação cólica dor de dente", dica: "Evitar estômago vazio se possível." },
    { nome: "Loratadina / Desloratadina", sintoma: "Alergia, espirros, rinite e coceira", sintomaBusca: "alergia espirro rinite coceira", dica: "Antialérgico que geralmente não dá muita sonolência." },
    { nome: "Omeprazol / Pantoprazol", sintoma: "Azia, refluxo e queimação no estômago", sintomaBusca: "azia refluxo queimação estômago", dica: "Tomar em jejum para melhor absorção." },
    { nome: "Chá de Camomila com Mel", sintoma: "Ansiedade, insônia, dor de barriga leve e estresse", sintomaBusca: "ansiedade insônia estresse barriga", dica: "Excelente remédio natural para relaxar antes de dormir." },
    { nome: "Soro Fisiológico (Nasal)", sintoma: "Nariz entupido, rinite e poeira no nariz", sintomaBusca: "nariz entupido rinite poeira", dica: "Ajuda a limpar as vias aéreas de forma totalmente segura." }
];

function renderizarRemedios(filtro = "") {
    const container = document.getElementById('lista-remedios');
    container.innerHTML = "";
    const termo = filtro.toLowerCase();

    const filtrados = bancoRemedios.filter(r => 
        r.nome.toLowerCase().includes(termo) || 
        r.sintoma.toLowerCase().includes(termo)
    );

    if(filtrados.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-500 text-center py-4">Nenhum remédio encontrado para este sintoma. Tente outro termo!</p>`;
        return;
    }

    filtrados.forEach(r => {
        const item = document.createElement('div');
        item.className = "bg-white/70 p-3 rounded-2xl border border-red-100 flex flex-col gap-1";
        item.innerHTML = `
            <div class="flex justify-between items-center"><strong class="text-red-800 text-xs">${r.nome}</strong><span class="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">Comum</span></div>
            <p class="text-[11px] text-gray-700"><strong>Para:</strong> ${r.sintoma}</p>
            <p class="text-[10px] text-red-600 italic">💡 Dica: ${r.dica}</p>
        `;
        container.appendChild(item);
    });
}
renderizarRemedios();

function filtrarRemedios() {
    const val = document.getElementById('filtro-remedio').value;
    renderizarRemedios(val);
}

async function enviarMensagemSaude() {
    const input = document.getElementById('input-chat-saude');
    const historico = document.getElementById('chat-saude-historico');
    const texto = input.value.trim();
    if(!texto) return;

    const msgUser = document.createElement('div');
    msgUser.className = "bg-white p-2 rounded-xl text-right text-gray-800";
    msgUser.innerHTML = `<strong>Você:</strong> ${texto}`;
    historico.appendChild(msgUser);
    input.value = "";
    historico.scrollTop = historico.scrollHeight;

    const msgLoading = document.createElement('div');
    msgLoading.className = "bg-red-50 p-2 rounded-xl text-red-700 italic";
    msgLoading.id = "loading-ia";
    msgLoading.innerHTML = "<strong>Assistente Dr. Amor:</strong> Analisando sintomas com carinho...";
    historico.appendChild(msgLoading);
    historico.scrollTop = historico.scrollHeight;

    try {
        const systemPrompt = "Você é um assistente virtual de saúde simpático, amoroso e informativo integrado em um aplicativo de casal. Responda em português de forma concisa (máximo 3 frases), dando dicas caseiras seguras ou remédios comuns de farmácia (como paracetamol, dipirona, chás) baseados no sintoma informado, e lembre sempre de procurar um médico se necessário.";
        const userQuery = `O usuário disse: "${texto}". Responda de forma útil e carinhosa.`;
        
        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const candidato = result.candidates?.[0];
        let respostaTexto = "Cuide-se muito bem! Beba bastante água e descanse, meu amor. Se persistir, consulte um médico.";
        if(candidato && candidato.content?.parts?.[0]?.text) {
            respostaTexto = candidato.content.parts[0].text;
        }

        document.getElementById('loading-ia').remove();

        const msgAi = document.createElement('div');
        msgAi.className = "bg-red-50 p-2 rounded-xl text-red-900";
        msgAi.innerHTML = `<strong>Assistente Dr. Amor:</strong> ${respostaTexto}`;
        historico.appendChild(msgAi);
        historico.scrollTop = historico.scrollHeight;

    } catch(e) {
        document.getElementById('loading-ia').remove();
        const msgAi = document.createElement('div');
        msgAi.className = "bg-red-50 p-2 rounded-xl text-red-900";
        msgAi.innerHTML = `<strong>Assistente Dr. Amor:</strong> Para sintomas leves como esse, repouso, hidratação e um bom chazinho ajudam bastante. Cuide-se! ❤️`;
        historico.appendChild(msgAi);
        historico.scrollTop = historico.scrollHeight;
    }
}

function tocarMusicaPrincipal() {
    if(musica.paused) {
        musica.play().catch(e => {});
    } else {
        musica.pause();
    }
}

const listaRecados = [
    "Lembrete: Você é a pessoa mais incrível, cheirosa e importante de todo o universo para mim. Bom dia, meu amor!",
    "Seu sorriso é a coisa mais linda que meus olhos já viram. Te amo demais!",
    "Contando os segundos para poder te abraçar e não soltar mais.",
    "Obrigado por fazer dos meus dias os mais felizes da minha vida.",
    "Você é meu porto seguro e minha maior inspiração. Te amo!"
];

function mudarRecado() {
    const recadoEl = document.getElementById('recado-dia');
    const aleatorio = listaRecados[Math.floor(Math.random() * listaRecados.length)];
    recadoEl.innerText = `"${aleatorio}"`;
}

function adicionarDesejo() {
    const input = document.getElementById('input-desejo');
    const valor = input.value.trim();
    if(!valor) return;

    const lista = document.getElementById('lista-desejos');
    const li = document.createElement('li');
    li.className = "bg-white/70 p-2.5 rounded-xl flex items-center justify-between border border-red-100";
    li.innerHTML = `<span>✨ ${valor}</span><span class="text-xs text-red-500 font-bold">Novo</span>`;
    lista.prepend(li);
    input.value = '';
}

const perguntasQuiz = [
    { p: "Onde foi o nosso primeiro encontro?", o: ["Cafeteria", "Parque", "Restaurante", "Cinema"], c: 0 },
    { p: "Quem disse 'eu te amo' primeiro?", o: ["Eu", "Você", "Dissemos juntos", "Foi por mensagem"], c: 0 },
    { p: "Qual é a minha comida favorita?", o: ["Pizza", "Hambúrguer", "Massas", "Comida japonesa"], c: 3 },
    { p: "Qual é a cor dos meus olhos?", o: ["Castanhos", "Pretos", "Verdes", "Azuis"], c: 0 },
    { p: "Qual foi o filme que assistimos juntos na primeira vez?", o: ["Comédia Romântica", "Ação", "Terror", "Animação"], c: 0 },
    { p: "Qual é o meu estilo de música favorito?", o: ["Pop", "Rock", "MPB / Sertanejo", "Eletrônica"], c: 2 },
    { p: "Qual é a minha cor favorita?", o: ["Azul", "Vermelho", "Preto", "Rosa / Verde"], c: 3 },
    { p: "O que eu mais gosto de fazer no fim de semana?", o: ["Dormir", "Sair para comer", "Ficar com você", "Jogar / Séries"], c: 2 },
    { p: "Qual mania minha você mais acha fofa?", o: ["Falar dormindo", "Rir das próprias piadas", "Mexer no cabelo", "Fazer careta"], c: 2 },
    { p: "Qual é o meu doce favorito?", o: ["Chocolate", "Sorvete", "Bolo de cenoura", "Pudim"], c: 0 },
    { p: "Qual foi o presente mais marcante que te dei?", o: ["Carta de amor", "Flores", "Ursinho", "Surpresa especial"], c: 0 },
    { p: "Onde seria o nosso destino de viagem dos sonhos?", o: ["Paris", "Praia deserta", "Japão", "Alpes Suíços"], c: 0 },
    { p: "Quem é mais dorminhoco(a)?", o: ["Eu", "Você", "Empate", "Nenhum dos dois"], c: 0 },
    { p: "Quem demora mais para se arrumar?", o: ["Eu", "Você", "Depende do dia", "Sempre saímos rápido"], c: 1 },
    { p: "Qual é o meu sabor de pizza favorito?", o: ["Calabresa", "Quatro queijos", "Frango com catupiry", "Margherita"], c: 2 },
    { p: "Qual o apelido carinhoso que mais usamos?", o: ["Amor / Vida", "Bebê", "Mo(u)", "Meu bem"], c: 0 },
    { p: "Onde nós gostaríamos de morar no futuro?", o: ["Casa no campo", "Apartamento na cidade", "Casa na praia", "Em outro país"], c: 0 },
    { p: "Qual a nossa bebida favorita para acompanhar um papo?", o: ["Café", "Vinho / Cerveja", "Suco natural", "Chá"], c: 0 },
    { p: "Quem costuma pedir desculpas primeiro após uma discussão?", o: ["Eu", "Você", "Resolvemos juntos", "Ficamos de bem rápido"], c: 2 },
    { p: "Qual é o dia mais especial do nosso relacionamento?", o: ["O dia que nos conhecemos", "O dia do primeiro beijo", "O dia do pedido de namoro", "Todos os dias"], c: 3 },
    { p: "Qual é a minha estação do ano favorita?", o: ["Verão", "Inverno", "Primavera", "Outuno"], c: 1 },
    { p: "Qual é o meu passatempo secreto?", o: ["Ver memes", "Cozinhar", "Assistir vídeos", "Ouvir música no talo"], c: 0 },
    { p: "O que eu costumo pedir na cafeteria?", o: ["Cappuccino", "Café com leite", "Chocolate quente", "Água com gás"], c: 0 },
    { p: "Qual o tamanho da saudade que sinto de você quando estamos longe?", o: ["Enorme", "Gigante", "Infinita", "Tudo isso e muito mais"], c: 2 },
    { p: "Como prefiro comemorar meu aniversário?", o: ["Festa grande", "Viagem a dois", "Jantar romântico", "Em casa assistindo filme"], c: 2 },
    { p: "Qual é a parte do meu corpo que você mais gosta?", o: ["Olhos", "Sorriso", "Mãos", "Cabelo"], c: 1 },
    { p: "O que te fez se apaixonar por mim?", o: ["Meu jeito", "Meu sorriso", "Minha inteligência", "Tudo em conjunto"], c: 3 },
    { p: "Qual foi a sensação do nosso primeiro beijo?", o: ["Inesquecível", "Borboletas no estômago", "Magia pura", "Todas as anteriores"], c: 3 },
    { p: "Se pudéssemos parar o tempo em um momento, qual seria?", o: ["Nosso abraço mais apertado", "Nossa primeira viagem", "Um dia qualquer juntos", "Todos os momentos"], c: 3 },
    { p: "Quanto tempo eu quero passar ao seu lado?", o: ["Para sempre", "Até ficar velhinhos", "Por toda a eternidade", "Todas as opções"], c: 3 }
];

let quizIndiceAtual = 0;
let quizAcertos = 0;

function carregarQuiz() {
    const progresso = document.getElementById('quiz-progresso');
    const texto = document.getElementById('quiz-pergunta-texto');
    const opcoesDiv = document.getElementById('quiz-opcoes');
    const corpo = document.getElementById('quiz-card-corpo');
    const final = document.getElementById('quiz-resultado-final');

    if(quizIndiceAtual >= perguntasQuiz.length) {
        corpo.classList.add('hidden');
        final.classList.remove('hidden');
        document.getElementById('quiz-pontuacao-final').innerText = `Você acertou ${quizAcertos} de 30 perguntas! Te amo muito ❤️`;
        progresso.innerText = "Quiz Concluído!";
        return;
    }

    progresso.innerText = `Pergunta ${quizIndiceAtual + 1} de 30`;
    const q = perguntasQuiz[quizIndiceAtual];
    texto.innerText = q.p;
    opcoesDiv.innerHTML = '';

    q.o.forEach((opcao, idx) => {
        const btn = document.createElement('button');
        btn.className = "bg-white/90 hover:bg-red-500 hover:text-white text-red-900 text-xs font-semibold p-2 rounded-xl border border-red-200 transition shadow-sm text-center";
        btn.innerText = opcao;
        btn.onclick = () => responderQuiz(idx === q.c);
        opcoesDiv.appendChild(btn);
    });
}

function responderQuiz(correto) {
    if(correto) quizAcertos++;
    quizIndiceAtual++;
    carregarQuiz();
}

function reiniciarQuiz() {
    quizIndiceAtual = 0;
    quizAcertos = 0;
    document.getElementById('quiz-card-corpo').classList.remove('hidden');
    document.getElementById('quiz-resultado-final').classList.add('hidden');
    carregarQuiz();
}

setTimeout(() => { carregarQuiz(); }, 500);

function iniciarConexaoAPI() {
    calcularDistanciaSimulada();
    carregarClima();
}

function calcularDistanciaSimulada() {
    const display = document.getElementById('distancia-display');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                display.innerText = "Calculando km...";
                setTimeout(() => {
                    display.innerText = "Aprox. 0.8 km ❤️";
                }, 1000);
            },
            (error) => {
                display.innerText = "Conectados pelo coração 💖";
            }
        );
    } else {
        display.innerText = "Sempre perto em pensamento 💫";
    }
}

async function carregarClima() {
    const climaInfo = document.getElementById('clima-info');
    climaInfo.innerText = "Consultando satélite meteorológico...";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                    const data = await res.json();
                    const temp = data.current_weather.temperature;
                    climaInfo.innerHTML = `Temperatura atual: <span class="text-red-600 font-extrabold">${temp}°C</span> ☀️`;
                } catch (e) {
                    climaInfo.innerText = "Clima agradável para pensar em você 🌡️";
                }
            },
            () => {
                climaInfo.innerText = "Céu limpo e cheio de amor ☀️";
            }
        );
    } else {
        climaInfo.innerText = "Clima perfeito para namorar ⛅";
    }
}