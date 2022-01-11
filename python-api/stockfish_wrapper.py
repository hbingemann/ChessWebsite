from stockfish import Stockfish
import re


class StockfishWrapper(Stockfish):
    def __init__(self, *args, **kwargs):
        super(StockfishWrapper, self).__init__(*args, **kwargs)
        self.current_fen = ""
        self.all_output = ""

    def set_fen_position(self, fen_position, *args, **kwargs):
        self.current_fen = fen_position
        super().set_fen_position(fen_position, *args, **kwargs)

    # want to:
    # - get feedback using communicate
    # - implement a function to get feedback

    def parse_top_move(self, text):
        top_move = {}
        multiplier = 1 if "w" in self.current_fen else -1

        lines = list(reversed(re.split(" |\n", text)))
        print(*lines, sep="\n")

        top_move["Move"] = lines[lines.index("bestmove") - 1]
        for i, line in enumerate(lines):
            if line == "mate":
                top_move["Mate"] = lines[i - 1] * multiplier
                break
            elif line == "cp":
                top_move["Centipawn"] = lines[i - 1] * multiplier
                break

        return top_move

    def get_top_move(self):
        self._put(f"go time 100")
        while True:
            if "bestmove" in self.get_output():
                print(self.get_output())
                print(self.depth)
                break
        return self.parse_top_move(self.get_output())

    def get_current_evaluation(self):
        # get the output
        out = self.get_output()
        return out

    def get_output(self):
        return self._stockfish.communicate()[0]
