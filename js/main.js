if(!localStorage.getItem('deckID')){
  fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => localStorage.setItem('deckID',data.deck_id))
    .catch(err => console.log(`Error ${err}`))
  console.log(`deckID ${localStorage.getItem('deckID')}`)
  }

document.querySelector('button').addEventListener('click',drawCards)

function drawCards(){
  fetch(`https://www.deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      let p1Card = data.cards[0]
      let p2Card = data.cards[1]
      document.querySelector('#player1').src=p1Card.image
      document.querySelector('#player2').src=p2Card.image
      
      p1Val = cvtVal(p1Card.value)
      p2Val = cvtVal(p2Card.value)

      console.log(p1Val)
      console.log(p2Val)

      if(p1Val > p2Val){
        document.querySelector('h3').innerHTML = 'Player 1 Wins'
      }else if(p1Val < p2Val){
        document.querySelector('h3').innerHTML = 'Player 2 Wins'
      }else{
        document.querySelector('h3').innerHTML = 'WAR'
      }
    })
    .catch(err => console.log(`Erroe ${err}`))
}

function cvtVal(val){
  switch(val){
    case 'ACE':
      return 14
    case 'KING':
      return 13
    case 'QUEEN':
      return 12
    case 'JACK':
      return 11
    default:
      return Number(val)
  }
}