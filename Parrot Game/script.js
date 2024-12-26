
const parrots = [
    'unicornparrot.gif',
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif'
  ];
  
  
  let cardCount = 0;
  let cards = [];
  let flippedCards = [];
  let moves = 0;
  
  
  function getCardCount() {
    let valid = false;
  
    while (!valid) {
      const input = prompt('Com quantas cartas você quer jogar? (Escolha um número par entre 4 e 14)');
      cardCount = parseInt(input);
  
      if (cardCount >= 4 && cardCount <= 14 && cardCount % 2 === 0) {
        valid = true;
      } else {
        alert('Por favor, insira um número par entre 4 e 14.');
      }
    }
  }
  
  
  function generateCards() {
    const selectedParrots = parrots.slice(0, cardCount / 2);
    const pairedParrots = [...selectedParrots, ...selectedParrots];
    cards = pairedParrots.sort(() => Math.random() - 0.5);
  }
  
  
  function renderCards() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
  
    cards.forEach((parrot) => {
      gameBoard.innerHTML += `
        <div class="card" data-parrot="${parrot}" onclick="flipCard(this)">
          <div class="card-inner">
            <div class="card-front">
              <img src="./imagens/back.png" alt="Verso da Carta">
            </div>
            <div class="card-back">
              <img src="./imagens/${parrot}" alt="Frente da Carta">
            </div>
          </div>
        </div>
      `;
    });
  }
  
 
  function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;
  
    card.classList.add('flipped');
    flippedCards.push(card);
    moves++;
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  
  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
  
    if (firstCard.dataset.parrot === secondCard.dataset.parrot) {
      flippedCards = [];
      checkWin();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  
  function checkWin() {
    const allFlipped = document.querySelectorAll('.card.flipped');
  
    if (allFlipped.length === cardCount) {
      alert(`Você ganhou em ${moves} jogadas!`);
    }
  }
  
  
  function startGame() {
    getCardCount();
    generateCards();
    renderCards();
  }
  
  startGame();


