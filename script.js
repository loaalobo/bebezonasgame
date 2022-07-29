document.addEventListener('DOMContentLoaded', () => { // o evento DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado, sem aguardar pelo CSS, imagens, e subframes para encerrar o carregamento. 
    
    // cria um array com 12 objetos 'carta' (1 imagem p/ cada 2 cartas)
    const cardArray = [ 
        {
            name: 'elis1',
            img: 'img/img1.png',
        },
        {
            name: 'elis1',
            img: 'img/img1.png',
        },
        {
            name: 'elis2',
            img: 'img/img2.png',
        },
        {
            name: 'elis2',
            img: 'img/img2.png',
        },
        {
            name: 'elis3',
            img: 'img/img3.png',
        },
        {
            name: 'elis3',
            img: 'img/img3.png',
        },
        {
            name: 'elis4',
            img: 'img/img4.png',
        },
        {
            name: 'elis4',
            img: 'img/img4.png',
        },
        {
            name: 'elis5',
            img: 'img/img5.png',
        },
        {
            name: 'elis5',
            img: 'img/img5.png',
        },
        {
            name: 'elis6',
            img: 'img/img6.png',
        },
        {
            name: 'elis6',
            img: 'img/img6.png',
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
            card.setAttribute('src', 'img/img_jogar_frozen.png');
            card.setAttribute('style', 'box-shadow: 1px 1px 5px black')
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    // vira a carta
    function flipCard() {
        let cardId = this.getAttribute('data-id'); // acessa o id de cada um dos objetos do array de cartas
        //caso uma carta já tenha sido escolhida, impede que ela seja clicada novamente
        if (cardsChosen.length === 1) {
            if (cardsChosenId[0] === cardId) {
                return alert('Escolha uma carta diferente para comparar!');
            } 
            //impede que o usuário vire mais de duas cartas por rodada
            alert('Será que você encontrou o par???')
        }
        cardsChosen.push(cardArray[cardId].name); // salva o nome do objeto escolhido (carta clicada) na lista de escolhidas
        cardsChosenId.push(cardId); // salva o id do objeto escolhido na lista de 'id das cartas escolhidas'
        this.setAttribute('src', cardArray[cardId].img) // seta, na carta que foi clicada, o endereço da imagem que estiver associada ao id 
        if (cardsChosen.length === 2) { // quando a lista de cartas escolhidas contiver dois objetos vai: 
            setTimeout(checkForMatch, 1000); // chamar a função que checa a combinação
        } 
    }
    
    // checa as combinações
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Obaaaa... que legal! Você acertou!');
            cards[optionOneId].setAttribute('src', 'img/img_acertou.jpg');
            cards[optionTwoId].setAttribute('src', 'img/img_acertou.jpg');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'img/img_jogar_frozen.png');
            cards[optionTwoId].setAttribute('src', 'img/img_jogar_frozen.png');
            alert('Ahhhh... que pena! Tente outra vez!');

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
    }

    function msgFinal() {
        resultDisplay.setAttribute('style', 'font-size: 1em; color: white; background: #6D98CB; padding: 0.2em; border: 1px solid black; text-shadow: 2px 2px 3px black; transition-duration: 0.2s;') 
        resultDisplay.textContent = 'Parabéns! Você encontrou todos os pares!' // exibir mensagem de 'parabéns'
        setTimeout(renomearBotao, 4000);
    }

    function renomearBotao() {
        const btn = document.getElementById('btn');
        btn.textContent = 'Nova Partida';
        btn.addEventListener('click', deletarMsgFinal());
    }

    function deletarMsgFinal() {
        const msgFinal = document.querySelector('.score');
        if (msgFinal.parentNode) {
            msgFinal.parentNode.removeChild(msgFinal);
        }
    }
})