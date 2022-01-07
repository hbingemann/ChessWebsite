from flask import Flask, request, jsonify
from stockfish import Stockfish
import time
import json


app = Flask(__name__)

stockfish_location = ".\stockfish\stockfish_14.1_win_x64_avx2\stockfish_14.1_win_x64_avx2.exe"
stockfish = Stockfish(stockfish_location, depth=17)


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

