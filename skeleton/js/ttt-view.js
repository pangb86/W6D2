class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    $el.append(this.setupBoard());

    this.bindEvents();
  }
  bindEvents() {
    this.$el.on("click", (event) => {
      this.makeMove($(event.target));
    });
  }

  makeMove($square) {
    $square.removeClass("cell").addClass(`${this.game.currentPlayer}`);
    let position = [$square.data("x"), $square.data("y")];
    $square.text(this.game.currentPlayer);
    this.game.playMove(position);

    if (this.game.isOver()) {
      // cleanup click handlers.
      this.$el.off("click");
      this.$el.addClass("game-over");

      const winner = this.game.winner();
      const $figcaption = $("<figcaption>");

      if (winner) {
        this.$el.addClass(`winner-${winner}`);
        $figcaption.html(`You win, ${winner}!`);
      } else {
        $figcaption.html("It's a draw!");
      }

      this.$el.append($figcaption);
    }

  }

  setupBoard() {
    const $grid = $("<ul class='grid'></ul>");
    this.game.board.grid.forEach(function(array, idx) {
      array.forEach(function(el, index) {
        let currentCell = $("<li class='cell'></li>");
        currentCell.data({
          x: index,
          y: idx
        });
        $grid.append(currentCell);
      });
    });
    return $grid;
  }
}

module.exports = View;
