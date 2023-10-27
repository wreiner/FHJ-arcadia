export class URNext {
  constructor() {}

  import_state(gamestate: string): void {
    console.log('loading state: ' + gamestate);
  }

  update_state(player_move: string): string {
    console.log('player moved: ' + player_move);
    return player_move;
  }
}
