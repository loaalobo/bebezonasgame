document.addEventListener('DOMContentLoaded', () => { // o evento DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado, sem aguardar pelo CSS, imagens, e subframes para encerrar o carregamento. 
    
    // cria um array com 12 objetos 'carta' (1 imagem p/ cada 2 cartas)
    const cardArray = [ 
        {
            name: 'elis1',
            img: 'img/cartas/img_1.jpeg',
        },
        {
            name: 'elis1',
            img: 'img/cartas/img_1.jpeg',
        },
        {
            name: 'elis2',
            img: 'img/cartas/img_2.jpeg',
        },
        {
            name: 'elis2',
            img: 'img/cartas/img_2.jpeg',
        },
        {
            name: 'elis3',
            img: 'img/cartas/img_3.jpeg',
        },
        {
            name: 'elis3',
            img: 'img/cartas/img_3.jpeg',
        },
        {
            name: 'elis4',
            img: 'img/cartas/img_4.jpeg',
        },
        {
            name: 'elis4',
            img: 'img/cartas/img_4.jpeg',
        },
        {
            name: 'elis5',
            img: 'img/cartas/img_5.jpeg',
        },
        {
            name: 'elis5',
            img: 'img/cartas/img_5.jpeg',
        },
        {
            name: 'elis6',
            img: 'img/cartas/img_6.jpeg',
        },
        {
            name: 'elis6',
            img: 'img/cartas/img_6.jpeg',
        },
    ];

    // ordena os objetos (12 cartas) dentro do array de forma aleatória
    cardArray.sort(() => 0.5 - Math.random());

    // acessa os espaços que já criei no html tanto para o jogo em si quanto para a exibição do resultado
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#score');

    let cardsChosen = []; // cria uma lista para armazenar as 2 cartas escolhidas por rodada
    let cardsChosenId = []; // cria uma lista para armazenar os ids das 2 cartas escolhidas por rodada
    let cardsWon = []; // cria uma lista com as cartas que já deram match (combinadas corretamente)
    let rounds = 0; // cria um contador para o número de rodadas   

    function welcomemsg() {
        const spacewelcomemsg = document.createElement('div');
        spacewelcomemsg.classList.add('spacewelcomemsg');
        grid.appendChild(spacewelcomemsg);

        const welcomemsg1 = document.createElement('p');
        welcomemsg1.classList.add('welcomemsg1');
        welcomemsg1.textContent = "Bem-vinda";
        spacewelcomemsg.appendChild(welcomemsg1);

        const welcomemsg2 = document.createElement('p');
        welcomemsg2.classList.add('welcomemsg2');
        welcomemsg2.textContent = "ao seu";
        spacewelcomemsg.appendChild(welcomemsg2);

        const welcomemsg3 = document.createElement('p');
        welcomemsg3.classList.add('welcomemsg3');
        welcomemsg3.textContent = "Jogo da Memória";
        spacewelcomemsg.appendChild(welcomemsg3);
    }
    welcomemsg();

    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
        grid.replaceChildren();
        createBoard(); // chama a função que cria o tabuleiro do jogo 
    })

    // cria o "tabuleiro" do jogo: para cada um dos 12 objetos no array de cartas, será criada uma imagem e setado um endereço para ela (img/img7.jpeg). Também será setado um atributo personalizado chamado 'id' com o valor de 0 a 11 (já que são 12 objetos no total). Por fim, adiciona um evento de click e chama a função flipCard para cada objeto. O 'grid.appendChild(card)' é responsável por adicionar a img criada ao espaço reservado no html, o qual acessamos através da variável 'const grid'
    function createBoard() {
        for (i in cardArray) { //length: 12
            const card = document.createElement('img');
            card.setAttribute('src', 'img/tema/img_jogar_frozen.png');
            card.setAttribute('style', 'box-shadow: 1px 1px 5px black')
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function clearMsg() {
        document.getElementById('msg_alertas').innerHTML=" ";
    }

    function showMsg(msg) {
        clearMsg();
        let e_msg = document.createElement('p');
        let t_msg = document.createTextNode(msg);
        e_msg.classList.add('showMsg');
        e_msg.appendChild(t_msg);   

        let a_msg = document.getElementById('msg_alertas');
        a_msg.appendChild(e_msg)
    }


    // vira a carta
    function flipCard() {
        clearMsg();
        let cardId = this.getAttribute('data-id'); // acessa o id de cada um dos objetos do array de cartas
        //caso uma carta já tenha sido escolhida, pede ao usuário que escolha uma diferente
        if (cardsChosen.length === 1) {
            if (cardsChosenId[0] === cardId) {
                return showMsg('Escolha outra carta!')
            }   
            let grid = document.getElementById('grid') 
            grid.classList.add('unclick')
        }
        cardsChosen.push(cardArray[cardId].name); // salva o nome do objeto escolhido (carta clicada) na lista de escolhidas
        cardsChosenId.push(cardId); // salva o id do objeto escolhido na lista de 'id das cartas escolhidas'

        // Nesse ponto, PRECISO SALVAR AS CARTAS NÃO ESCOLHIDAS EM UMA VARIÁVEL (unchosenCards) PARA DESABILITAR O CLICK NELAS ATÉ QUE O MATCH SEJA VERIFICADO. APÓS O RESULTADO SER MOSTRADO NA TELA (SE ACERTOU OU NÃO), HABILITO O CLICK NOVAMENTE.

        this.setAttribute('src', cardArray[cardId].img) // seta, na carta que foi clicada, o endereço da imagem que estiver associada ao id 

        if (cardsChosen.length === 2) { // quando a lista de cartas escolhidas contiver dois objetos vai: 
            setTimeout(checkForMatch, 2000); // chamar a função que checa a combinação 
        } 
    }

    // checa as combinações
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            clearMsg();
            showMsg('Você acertou!');
            cards[optionOneId].setAttribute('src', 'img/tema/img_acertou.jpg');
            cards[optionTwoId].setAttribute('src', 'img/tema/img_acertou.jpg');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'img/tema/img_jogar_frozen.png');
            cards[optionTwoId].setAttribute('src', 'img/tema/img_jogar_frozen.png');
            clearMsg();
            showMsg('Tente outra vez!')
        }

        // a cada rodada, independentemente se acertou ou não a combinação, vai:
        cardsChosen = []; // esvaziar a lista que armazenava as duas cartas escolhidas
        cardsChosenId = []; // esvaziar a lista com os nº. de id das duas cartas escolhidas
        
        if (cardsWon.length == 1) {
            rounds += 1;
            resultDisplay.textContent = "Tentativa nº " + rounds + " = " + cardsWon.length + " ponto"; // atualiza o número de rodadas e de acertos
        } else {
            rounds += 1;
            resultDisplay.textContent = "Tentativa nº " + rounds + " = " + cardsWon.length + " pontos"; // atualiza o número de rodadas e de acertos
        }
        
        if (cardsWon.length === cardArray.length/2) { // quando alcançar 6 pontos vai:
            msgFinal();
        }
        
        grid.classList.remove('unclick')
    }

    function msgFinal() {
        clearMsg();
        resultDisplay.setAttribute('style', 'font-size: 1em; color: white; background: #6D98CB; padding: 0.2em; border: 1px solid black; text-shadow: 2px 2px 3px black; transition-duration: 0.2s;') 
        resultDisplay.textContent = 'Parabéns! Você venceu!' // exibir mensagem de 'parabéns'
        setTimeout(renomearBotao, 4000);
    }

    function renomearBotao() {
        const btn = document.getElementById('btn');
        btn.textContent = 'Novo Jogo';
        btn.setAttribute('style', 'font-size: 0.8em')
        btn.addEventListener('click', deletarMsgFinal());
    }

    function deletarMsgFinal() {
        const msgFinal = document.querySelector('.score');
        if (msgFinal.parentNode) {
            msgFinal.parentNode.removeChild(msgFinal);
        }
    }
})