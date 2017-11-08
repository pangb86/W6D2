const View = require("./ttt-view.js");
const Game = require("./game.js");

$( () => {
  const game = new Game();
  const $view = $("figure.ttt");
  const myView = new View(game, $view);
});
