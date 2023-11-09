import { Logger } from '@nestjs/common';
import { GamesPlugin } from '../plugin.interface';
import { Urlpath } from 'src/plays/entities/urlpath.entity';

export class URNext implements GamesPlugin {
  private game_state: any;

  constructor() {}

  init_state(urlpaths: Urlpath[]): any {
    Logger.log(urlpaths);

    this.game_state = { test: 'lala' };

    return this.game_state;
  }

  import_state(game_state: any): void {
    Logger.log('in URNext - loading state: ' + game_state);

    this.game_state = game_state;
  }

  update_state(urlpath: string, player_move: any): any {
    Logger.log(`in URNext - player ${urlpath} moved: ${player_move.value}`);

    if (!('turns' in this.game_state)) {
      this.game_state.turns = [];
    }

    this.game_state.turns.push(player_move.value);
    Logger.log(this.game_state);

    // here the simulated move was valid
    // implement invalid how you see fit
    return true;
  }

  get_state(): any {
    return this.game_state;
  }
}
