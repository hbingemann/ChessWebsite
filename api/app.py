from flask import Flask, request, jsonify
from stockfish import Stockfish
import time
import json
import requests
import chessdotcom


app = Flask(__name__)

stockfish_location = ".\stockfish\stockfish_14.1_win_x64_avx2\stockfish_14.1_win_x64_avx2.exe"
stockfish = Stockfish(stockfish_location, depth=15)


@app.route("/getpgn", methods=["POST"])
def getpgn():
    posted_info = request.json
    platform = posted_info["from"]
    user = posted_info["user"]

    pgn = None

    if platform == "chessdotcom":
        months = chessdotcom.get_player_game_archives(user).archives
        recent_games = requests.get(months[-1]).json()
        recent_games = recent_games["games"]
        last_game = recent_games[-1]
        pgn = last_game["pgn"]

    return json.dumps({
        "pgn": pgn
    })


@app.route("/topmoves", methods=["POST"])
def eval():
    posted_info = request.json
    position = posted_info["position"]
    moves = int(posted_info["moves"])

    stockfish.set_fen_position(position)
    move_choices = stockfish.get_top_moves(moves)

    return json.dumps(move_choices)


if __name__ == "__main__":
    app.run(debug=True)

