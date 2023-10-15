# Arcadia

## User stories

### New game

- User connects to website
- [If multiple games, user is presented with list of game to choose]
- User optionally enters player name/logs in
- User starts game
  - User sees game screen, invite link for other players is easily copyable
    - if no player name is set, a random name will be generated
    - player name, game url stored in local storage/cookie

### Join game through game url

- User connects to website through game url
- User optionally enters player name/logs in
- User enters game
  - User sees game screen, invite link for other players is easily copyable
    - if no player name is set, a random name will be generated
    - player name, game url stored in local storage/cookie

### Join game through website

- User connects to website
- User optionally enters player name/logs in
- User can choose to start new game or join game with game-id
  - User enters game-id
    - User sees game screen, invite link for other players is easily copyable
    - if no player name is set, a random name will be generated
    - player name, game url stored in local storage/cookie

### Player movement

- User sees game screen
  - User makes move
    - move is valiated in the frontend to alert player of illegal move/display helpers
    - move is send to to backend for finale validation and storage/redistribution
  - User waits for other players moves
    - frontend polls api for game state changes
- If game state signals win/loss user is presented with game outcome
  - ? cookie reflects win/loss for game
  - ? game is removed from players cookies

### Return to previous game through website

- User connects to website
- User is shown all games stored in cookie and can choose which game to return to
- User can optionally start a new game

### Return to previous game through game url

- User connects to website through game url
- User sees game screen, invite link for other players is easily copyable

## Implemenation Ideas

### Frontend

- nginx container
- serves react pwa
- per game directory with game logic and assets

### Backend

- backend container
- serves backend app through defined APIs
- imports games dynamically from games-plugin directory

### Backend game-module

- per game directory in games-plugin
  - game logic as module
  - on every update-state a new instance of game module is initialized
    - calls import_state with the current game state
  - calls update_state() method with player-move json blob parameter
    - move is validated
      - move is illegal throw illegal-move exception
    - update game-state
  - returns new-state as json blob or throw illegal-move exception
  - new-state is stored in db
  - new-state is returned to the calling party through API response

#### Example

```
└── games-plugin
    └── TicTacToe
        └── TicTacToe.js
            ~~~
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
```

## APIs

### new-game

- Frontend calls new-game endpoint
  - Parameters: game-name, player-name
  - Returns: game-id (wordlist, uuid?)

#### Functionality

- creates game-id
- stores game-id, game, player-name in db

### join-game

- Frontned calls join-game endpoint
  - Parameters: game-id, player-name
  - Returns: ok/nok/not-found

#### Functionality

- checks if game-id exists
- adds player-name to game-id in db

### update-state

- Frontend calls update-state endpoint
  - Parameters: game-id, player-name, player-move
  - Returns: ok/nok/not-found/illegal-move

#### Functionality

- see backend game module

### poll-state

- Frontend calls poll-state endpoint
  - Parameters: game-id, player-name
  - Returns: game-state/not-found

#### Functionality

- checks if game-id exists
- returns game-state stored in db

