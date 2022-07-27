document.addEventListener('DOMContentLoaded', () => { // o evento DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado, sem aguardar pelo CSS, imagens, e subframes para encerrar o carregamento. 
    
    // cria um array com 12 objetos 'carta' (1 imagem p/ cada 2 cartas)
    const cardArray = [ 
        {
            name: 'elis1',
            img: 'img/img1.png'
        },
        {
            name: 'elis1',
            img: 'img/img1.png'
        },
        {
            name: 'elis2',
            img: 'img/img2.png'
        },
        {
            name: 'elis2',
            img: 'img/img2.png'
        },
        {
            name: 'elis3',
            img: 'img/img3.png'
        },
        {
            name: 'elis3',
            img: 'img/img3.png'
        },
        {
            name: 'elis4',
            img: 'img/img4.png'
        },
        {
            name: 'elis4',
            img: 'img/img4.png'
        },
        {
            name: 'elis5',
            img: 'img/img5.png'
        },
        {
            name: 'elis5',
            img: 'img/img5.png'
        },
        {
            name: 'elis6',
            img: 'img/img6.png'
        },
        {
            name: 'elis6',
            img: 'img/img6.png'
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

    function welcomemsg() {
        const spacewelcomemsg = document.createElement('div');
        spacewelcomemsg.classList.add('spacewelcomemsg');

        const welcomemsg = document.createElement('h4');
        welcomemsg.classList.add('welcomemsg');
        welcomemsg.textContent = "Bebezona's Memory Game";
        grid.appendChild(spacewelcomemsg);
        spacewelcomemsg.appendChild(welcomemsg); 
        
        const welcomemsg2 = document.createElement('h6');
        welcomemsg2.classList.add('welcomemsg2');
        welcomemsg2.textContent = "O Jogo Da Memória da Elis";
        spacewelcomemsg.appendChild(welcomemsg2);
    }
    welcomemsg();

    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
        grid.replaceChildren();
        createBoard(); // chama a função que cria o tabuleiro do jogo (gostaria de criar um botão 'iniciar jogo')
    })

    // cria o "tabuleiro" do jogo: para cada um dos 12 objetos no array de cartas, será criada uma imagem e setado um endereço para ela (img/img7.jpeg). Também será setado um atributo personalizado chamado 'id' com o valor de 0 a 11 (já que são 12 objetos no total). Por fim, adiciona um evento de click e chama a função flipCard para cada objeto. O 'grid.appendChild(card)' é responsável por adicionar a img criada ao espaço reservado no html, o qual acessamos através da variável 'const grid'
    function createBoard() {
        for (i in cardArray) { //length: 12
            const card = document.createElement('img');
            card.setAttribute('src', 'img/img_jogar.png');
            card.setAttribute('style', 'box-shadow: 1px 1px 5px black')
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    // vira a carta
    function flipCard() {
        let cardId = this.getAttribute('data-id'); // acessa o id de cada um dos objetos do array de cartas
        cardsChosen.push(cardArray[cardId].name); // salva o nome do objeto escolhido (carta clicada) na lista de escolhidas
        cardsChosenId.push(cardId); // salva o id do objeto escolhido na lista de 'id das cartas escolhidas'
        this.setAttribute('src', cardArray[cardId].img) // seta, na carta que foi clicada, o endereço da imagem que estiver associada ao id 
        if (cardsChosen.length === 2) { // quando a lista de cartas escolhidas contiver dois objetos vai: 
            setTimeout(checkForMatch, 500); // chamar a função que checa a combinação
        }
    }

    // checa as combinações
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Você encontrou um par!');
            cards[optionOneId].setAttribute('src', 'img/flor1.png');
            cards[optionTwoId].setAttribute('src', 'img/flor1.png');
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].setAttribute('src', 'img/img_jogar.png');
            cards[optionTwoId].setAttribute('src', 'img/img_jogar.png');
            alert('Tente de novo!');
        }
        // a cada rodada, independentemente se acertou ou não a combinação, vai:
        cardsChosen = []; // esvaziar a lista que armazenava as duas cartas escolhidas
        cardsChosenId = []; // esvaziar a lista com os nº. de id das duas cartas escolhidas
        resultDisplay.textContent = cardsWon.length; // atualiza o número de acertos
        if (cardsWon.length === cardArray.length/2) { // quando alcançar 6 pontos vai:
            resultDisplay.textContent = 'Parabéns! Você venceu!' // exibir mensagem de 'parabéns'
        }
    }
})