let atualizando = true;

var tempoLimite = 20; 
var tempoRestante = tempoLimite;
var cronometro; 

var npcs = [{
    x: 530,
    y: 352,
    width: 59,
    height: 100,
    quiz: {
        question: "Onde ocorre a fertilização no sistema reprodutor feminino?",
        options: ["Útero", "Ovários", "Trompas de Falópio", "Vagina"],
        correctAnswer: "Trompas de Falópio"
    }, respondido: false
},

{
    x: 1430,
    y: 502,
    width: 59,
    height: 100,
    quiz: {
        question: "O que acontece durante o processo de ovulação?",
        options: ["Fertilização do óvulo pelo espermatozoide", "Implantação do embrião no útero", "Liberação de um óvulo pelos ovários",  "Menstruação"],
        correctAnswer: "Liberação de um óvulo pelos ovários"
    }, respondido: false
},
{
    x: 1900,
    y: 502,
    width: 59,
    height: 100,
    quiz: {
        question: "Qual o papel da progesterona no ciclo menstrual?",
        options: ["Estimular o desenvolvimento dos órgãos sexuais femininos", "Induzir a ovulação", "Preparar o revestimento do útero para a gravidez", "Inibir a produção de óvulos pelos ovários"],
        correctAnswer: "Preparar o revestimento do útero para a gravidez"
    }, respondido: false
},
{
    x: 2650,
    y: 350,
    width: 59,
    height: 100,
    quiz: {
        question: "Qual é a função dos pequenos lábios no sistema reprodutor feminino?",
        options: [ "Dar saída ao fluxo menstrual", "Manter a lubrificação vaginal","Proteger a vagina contra bactérias", "Apenas envolver a vagina"],
        correctAnswer: "Proteger a vagina contra bactérias"
    }, respondido: false
},

{
    x: 3150,
    y: 150,
    width: 59,
    height: 100,
    quiz: {
        question: "Qual é o órgão responsável por dar saída ao fluxo menstrual, receber o pênis durante a relação sexual e formar o canal do parto?",
        options: ["Ovário", "Útero", "Vagina", "Uretra"],
        correctAnswer: "Vagina"
    }, respondido: false
},
{
    x: 3300,
    y: 502,
    width: 59,
    height: 100,
    quiz: {
        question: "Qual é a principal função dos ovários no sistema reprodutor das mulheres?",
        options: ["Proteger a vagina contra bactérias", "Transportar o óvulo até a cavidade uterina","Produzir hormônios como estrogênio e a produção de óvulos", "Estimular a ovulação"],
        correctAnswer: "Produzir hormônios como estrogênio e a produção de óvulos"
    }, respondido: false
},
{
    x: 3880,
    y: 250,
    width: 59,
    height: 100,
    quiz: {
        question: "O que acontece durante a fase de ovulação no ciclo menstrual feminino?",
        options: ["Liberação de progesterona", "Desprendimento do endométrio", "Chegada do óvulo às trompas para ser fecundado", "Estimulação do desenvolvimento dos órgãos sexuais femininos"],
        correctAnswer: "Chegada do óvulo às Trompas para ser fecundado"
    }, respondido: false
},
{
    x: 4350,
    y: 50,
    width: 59,
    height: 100,
    quiz: {
        question: "Qual é a principal função do colo do útero no sistema reprodutor feminino?",
        options: ["Produzir hormônios como estrogênio", "Chegada do óvulo às trompas para ser fecundado", "Separar os órgãos externos e internos do órgão reprodutor feminino", "Proteger a vagina contra bactérias"],
        correctAnswer: "Separar os órgãos externos e internos do órgão reprodutor feminino"
    }, respondido: false
},
{
    x: 5275,
    y: 502,
    width: 59,
    height: 100,
    quiz: {
        question: "O que são os cílios da tuba uterina e qual é o seu papel no sistema reprodutor feminino?",
        options: ["Produzir hormônios como a progesterona", "Induzir a ovulação", "Garantir que o embrião siga em direção ao útero", "Estimular a produção de óvulos pelos ovários"],
        correctAnswer: "Garantir que o embrião siga em direção ao útero"
    },respondido: false
},

{
    x: 5800,
    y: 502,
    width: 59,
    height: 100,
    quiz: {
        question: "Onde está localizado o clitóris?",
        options: ["Na parte inferior do vestíbulo vulvar",  "Na parte interior da Vagina","Na parte mais superior do vestíbulo vulvar", "Mito"],
        correctAnswer: "Na parte mais superior do vestíbulo vulvar"
    },respondido: false
}
];

var timer = document.getElementById("timer");

function startCronometro() {
    timer.innerText = `Tempo Restante:20s`

    cronometro = setInterval(function() {
        tempoRestante--;

        
        timer.innerText = `Tempo Restante: ${tempoRestante}s`

        if (tempoRestante <= 0) {
            atualizando = true;
            fecharDialogo();
            clearInterval(cronometro);

            player.vidas--;
            tempoRestante = tempoLimite;

            // Verifica se o jogador perdeu o jogo
            if (player.vidas === 0) {
                fimJogo();
            } else {
                mostrarDialogo('Tempo esgotado! Vidas restantes: ' + player.vidas);
                
            }
        }
    }, 1000); 
}


function mostrarDialogo(question, options) {
    // Restaura o tempo limite
    tempoRestante = tempoLimite;

    textoDialogo.innerHTML = question;

    atualizando =  false;
    // Limpa as opções existentes
    opcoes.innerHTML = "";
    
    timer.style.display = "none";

    // Adiciona as novas opções
    if(options){options.forEach(function(option, index) {
        
        timer.style.display = "block"
        var listItem = document.createElement('li');
        listItem.innerHTML = `<button onclick="checarResposta(${index})">${option}</button>`;
        opcoes.appendChild(listItem);
    });
    }
    // Adiciona o botão de fechar
    var botaoFechar = document.getElementById('closeButton');
    botaoFechar.style.display = 'block';

    caixaDialogo.style.display = 'block';

    // Inicia o cronômetro
    
    // Desativa as teclas durante o diálogo
    teclas = {};
}


function fecharDialogo() {

    atualizando = true;
    var botaoFechar = document.getElementById('closeButton');
    botaoFechar.style.display = 'none';
    clearInterval(cronometro);
    caixaDialogo.style.display = 'none';
    // Reativa as teclas após o diálogo
    teclas = {};

    // Verifica se o jogador ganhou ou perdeu o jogo
    if (player.vidas === 0 || player.respostas === 10) {
        fimJogo();
    }
}

function checarResposta(index) {

    clearInterval(cronometro);  
    var interagindo_NPC 
    npcs.forEach(npc => {
        interagindo_NPC = npc
       
    })

    

    if (interagindo_NPC) {
        var respostaSelecionada = interagindo_NPC.quiz.options[index];

        if (respostaSelecionada === interagindo_NPC.quiz.correctAnswer) {
            

            // Incrementa respostas corretas
            player.respostas++;
            
            console.log('Respostas corretas:', player.respostas);

            interagindo_NPC.respondido = true; // Marca o NPC como respondido

            // Verifica se o jogador ganhou o jogo
            if (player.respostas === 10) {
                fimJogo();
            } else {
                mostrarDialogo('Resposta correta!');
            }
        } else {
            // Decrementa vidas
            player.vidas--;

            console.log('Resposta incorreta. Vidas restantes:', player.vidas);

            // Verifica se o jogador perdeu o jogo
            if (player.vidas === 0) {
                fimJogo();
            } else {
                mostrarDialogo('Resposta incorreta! Vidas restantes: ' + player.vidas);
            }
        }
    }
    
}