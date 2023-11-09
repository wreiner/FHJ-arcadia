class TicTacToe {
    constructor() {
        // Initialize the object upon import
        this.someProperty = 'Some initial property';
    }

    import_state(game_state) {
        this.game_state = game_state;
    }

    update_state(player_move) {
        // validate move
        if (player_move != "valid") {
            throw IllegalMoveException;
        }

        // Add your game move logic here
        return (new_state);
    }
}

export default new TicTacToe();
