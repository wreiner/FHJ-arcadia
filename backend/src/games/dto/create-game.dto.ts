import { Matches } from 'class-validator';

export class CreateGameDto {
  @Matches('^[a-zA-Z0-9]+$', '', {
    message:
      'Only alphanumerical characters and numbers are allowed for game name',
  })
  name: string;
  active: boolean;
  number_of_players: number;
}
