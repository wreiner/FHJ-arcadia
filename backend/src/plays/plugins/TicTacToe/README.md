# Game Plugin: TicTacToe

## API Reference

This is the API reference specific for the game plugin TicTacToe.

### Create the game in the database

To create the game TicTacToe send the following request to the api:

- Request: DTO `/api/games` (POST):

  ```json
  {
    "name": "TicTacToe",
    "active": true,
    "number_of_players": 2
  }
  ```

- Response: DTO `/api/games` (HTTP/201)

  ```json
  {
    "name": "TicTacToe",
    "active": true,
    "number_of_players": 2,
    "id": 2
  }
  ```

### Start the game

To start the game no special parameters are needed:

- Request: DTO `/api/plays/start_game` (POST):

  ```json
  {
    "game_id": N
  }
  ```

- Response DTO `/api/plays/start_game` (HTTP/200):

  ```json
  {
    "players": {
        "0cb7e5666a37bdb647dce111966a1c51": {
            "symbol":"X",
            "order":0
        },
        "0367981c6da9133dd742347b510e6adc": {
            "symbol":"O",
            "order":1
        }
    },
    "board": [null, null, null, null, null, null, null, null, null],
    "next_player": "0cb7e5666a37bdb647dce111966a1c51"
  }
  ```

### Player Move

For the player to make a move it is enough the send the box the player put their
symbol in:

- Request: DTO `/api/plays/player_move` (POST):

  ```json
  {
    "move": { "box": 3 }
  }
  ```

- Response DTO `/api/plays/player_move` (HTTP/200):

  ```json
  {
    "players": {
        "0cb7e5666a37bdb647dce111966a1c51": {
            "symbol":"X",
            "order":0
        },
        "0367981c6da9133dd742347b510e6adc": {
            "symbol":"O",
            "order":1
        }
    },
    "board": [null, null, null, 'X', null, null, null, null, null],
    "next_player": "0367981c6da9133dd742347b510e6adc"
  }
  ```

#### Player Won

When a player makes a move, the system also checks whether this move ends the
game with a win.

When the game is won an additional field `won` is part of the response which
indicates the player who has won the game:

- Response DTO `/api/plays/player_move` (HTTP/200):

  ```json
  {
    "players": {
       ...
    },
    "board": [..],
    "next_player": "0367981c6da9133dd742347b510e6adc",
    "won": "0cb7e5666a37bdb647dce111966a1c51"
  }
  ```
