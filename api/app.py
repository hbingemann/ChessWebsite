from flask import Flask, request, jsonify
from stockfish_wrapper import StockfishWrapper
import time


app = Flask(__name__)

stockfish_location = ".\stockfish\stockfish_14.1_win_x64_avx2\stockfish_14.1_win_x64_avx2.exe"
stockfish = StockfishWrapper(stockfish_location)

@app.route("/stop", methods=["POST"])
def stop():
    pass

@app.route("/eval", methods=["POST"])
def eval():
    json = request.json
    position = json["position"]

    stockfish.set_fen_position(position)
    # stockfish.

    return jsonify({
        "cp",
        "bestmove",
    })

if __name__ == "__main__":
    # # app.run(debug=True)

    stockfish.go_infinite()
    time.sleep(0.3)
    stockfish.stop()
    stockfish.get_most_recent_eval()
    