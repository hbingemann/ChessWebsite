from stockfish import Stockfish
import chess

class StockfishWrapper(Stockfish):
    def __init__(self, path) -> None:
        super().__init__(path)

    def go_infinite(self):
        self._put("go infinite")

    def stop(self):
        self._put("stop")

    def get_most_recent_eval(self):
        out, err = self._stockfish.communicate()
        recent = out.split("info")[-1]
        return {
            "depth": int(get_item("depth", recent)),
            "eval": int(get_item("cp", recent)) / 100,
            "bestmove": get_item("bestmove", recent),  # maybe turn this into san
        }
def get_item(name, info):
    start = info.index(name) + len(name) + 1
    parts = info[start:].split(" ")
    print(*parts, sep="--")
    return parts[0]