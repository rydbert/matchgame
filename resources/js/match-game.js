var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cards = [];
  for (i=1; i<9; i++) {
    cards.push(1)
    cards.push(1)
  }
  var randomCards = []
  while (cards.length > 0) {
    var randomIndex = Math.floor(Math.random() * cards.length);
    randomCards.push(cards.splice(randomIndex,1))
  }
  return randomCards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25,85%,65%)',
    'hsl(55,85%,65%)',
    'hsl(90,85%,65%)',
    'hsl(160,85%,65%)',
    'hsl(220,85%,65%)',
    'hsl(265,85%,65%)',
    'hsl(310,85%,65%)',
    'hsl(360,85%,65%)'];

  $game.empty();
  $game.data('flippedCards', []);

  for (i=0; i<cardValues.length; i++) {
    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data({
      'value' : cardValues[i],
      'color' : colors[cardValues[i]-1],
      'flipped' : false
    });

    $card.click(function() {
      MatchGame.flipCard($(this), $game);
    });
    $game.append($card);
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('flipped', true);


/*  $game.data('flippedCards').push($card)
Still not sure flippedCards needs to be declared but okay.
*/
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      /* Apparently the code never gets inside this if */
      /* Changed colors to see if inside */
      $('.card').css('background-color', 'red');
      flippedCards[0].css({
        'background-color' : 'rgb(153,153,153)',
        'color' : 'rgb(204,204,204)'
      });
      flippedCards[1].css({
        'background-color' : 'rgb(153,153,153)',
        'color' : 'rgb(204,204,204)'
      });
    }

    else {
      window.setTimeout(function() {
        flippedCards[0].css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
        flippedCards[1].css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
      }, 350);
    }
    $game.data('flippedCards', [])
  }
};
