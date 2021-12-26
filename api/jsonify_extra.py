import json
import chess.pgn
import copy

def get_json_chess(game, current_move):
    game_copy = copy.deepcopy(game)
    dict_to_jsonify = {
        "game": game_copy,
        "current_move": current_move,
    }

    return json.dumps(dict_to_jsonify, cls=GameEncoder)

class GameEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, chess.pgn.GameNode):
            # have to remove parent value so we don't get an infinite loop
            # (parent -> has reference to child -> has reference to parent...)
            dictionary = obj.__dict__
            dictionary.pop("parent")
            return dictionary
        elif isinstance(obj, chess.Move):
            # return a from_square and to_square and promotion piece
            return {
                "from": chess.square_name(obj.from_square),
                "to": chess.square_name(obj.to_square),
                "promotion": None if obj.promotion is None else chess.piece_symbol(obj.promotion),
            }
        elif isinstance(obj, set):
            return list(obj)
        elif isinstance(obj, chess.pgn.Headers):
            return obj.__dict__

        return json.JSONEncoder.default(self, obj)
