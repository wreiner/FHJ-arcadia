import { Urlpath } from '../entities/urlpath.entity';

export interface GamesPlugin {
  init_state(urlpaths: Urlpath[]): any;
  import_state(gamestate: any): void;
  update_state(urlpath: string, player_move: any): boolean;
  get_state(): any;
}
