import { Logger } from '@nestjs/common';
import { GamesPlugin } from '../plugin.interface';
import { Urlpath } from 'src/plays/entities/urlpath.entity';
import { IllegalMoveException } from 'src/plays/exceptions/illegalmove';
import { getNextPlayerUrl } from 'src/utils/helpers';

export class TicTacToe implements GamesPlugin {
  private game_state: any;

  private player_symbols = ['X', 'O'];
  private lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  constructor() {}

  init_state(urlpaths: Urlpath[]): any {
    // the player starting the game always get's X
    this.game_state = {
      players: {
        [urlpaths[0].path]: { symbol: 'X', order: 0 },
        [urlpaths[1].path]: { symbol: 'O', order: 1 },
      },
      board: new Array(9).fill(null),
      next_player: urlpaths[0].path,
    };

    return this.game_state;
  }

  import_state(game_state: any): void {
    Logger.log('in URNext - loading state: ' + game_state);

    this.game_state = game_state;
  }

  update_state(urlpath: string, player_move: any): any {
    Logger.log(`in URNext - player ${urlpath} moved: ${player_move.box}`);

    Logger.debug(`Board: ${this.game_state.board}`);
    Logger.debug(`Box: ${this.game_state.board[player_move.box]}`);

    if ('won' in this.game_state) {
      throw new IllegalMoveException(
        `No more moves possible, game wos won by ${this.game_state.won}`,
      );
    }

    if (this.game_state.next_player !== urlpath) {
      throw new IllegalMoveException('Please wait your turn');
    }

    if (this.game_state.board[player_move.box] !== null) {
      throw new IllegalMoveException('This field was already taken');
    }

    this.game_state.board[player_move.box] =
      this.game_state.players[urlpath].symbol;
    if (this.check_if_won(this.game_state.players[urlpath].symbol)) {
      Logger.log(`Player ${urlpath} has won the game`);
      this.game_state.won = urlpath;
    }

    const nextPlayerUrl = getNextPlayerUrl(urlpath, this.game_state.players);
    Logger.debug(`Next Player: ${nextPlayerUrl} | ${this.game_state.players}`);
    this.game_state.next_player = nextPlayerUrl;

    return true;
  }

  get_state(): any {
    return this.game_state;
  }

  private check_if_won(player_symbol: string): boolean {
    const length = this.lines.length;
    const squares = this.game_state.board;
    for (let i = 0; i < length; i++) {
      const [a, b, c] = this.lines[i];

      if (squares[a] !== player_symbol) {
        continue;
      }

      if (player_symbol === squares[b] && player_symbol === squares[c]) {
        return true;
      }
    }

    return false;
  }
}
