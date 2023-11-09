#!/usr/bin/python

import requests

base_url = 'http://127.0.0.1:3099/plays'
start_url = f'{base_url}/start_game/'

player_one_move_order = [1, 0, 2]
player_two_move_order = [3, 7, 8]

def make_request(http_word, url, body):
    match http_word:
        case "POST":
            print(f"will POST to {url} with payload {body}")
            return requests.post(url, json = body, headers={'Accept': 'application/json'})
        case "PATCH":
            print(f"will PATCH to {url} with payload {body}")
            return requests.patch(url, json = body, headers={'Accept': 'application/json'})

def start_game():
    start_payload = {'game_id': 2}

    return make_request("POST", start_url, start_payload).json()

def make_move(player_key, move):
    move_url = f'{base_url}/player_move/{player_key}'
    move_payload = {'move': {'box': move}}

    return make_request("PATCH", move_url, move_payload).json()

def main():
    counter = 0
    player_one_move = 0
    player_two_move = 0
    next_player_key = ""
    while True:
        move = -1
        if counter == 0:
            next_player_key = start_game()['next_player']

        if counter % 2:
            move = player_one_move_order[player_one_move]
            player_one_move += 1
        else:
            move = player_two_move_order[player_two_move]
            player_two_move += 1

        erg = make_move(next_player_key, move)
        print(erg)
        if erg.get("won") is not None:
            print("Game ends")
            return

        next_player_key = erg.get('next_player')
        counter += 1

main()
