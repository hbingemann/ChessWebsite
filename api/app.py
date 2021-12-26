from flask import Flask, request
from node_ids import get_id, add_id, find_gamenode
from jsonify_extra import get_json_chess
import chess.pgn

app = Flask(__name__)


# globals
game_tree = chess.pgn.Game.from_board(chess.Board()) # represents the loaded pgn / moves made
    # assume 'game_tree' will never be 'None'
current_move = game_tree # represents what move we are on in 'game_tree'
    # assume 'current_move' will never be 'None'

# you aren't supposed to use globals but since there will only be one
# request at a time (only one user) it should be ok
# I should implement a database if I ever plan on storing information
# though

# when current move is set
# - just set 'current_move' to that move

# when a new move is made:
# - check if we are at the end of a variation or mainline
#   - if so then add the move to the current variation 'add_variation()'
# - otherwise check if that move is the move after current move in 'game_tree'
#   - if it is then set current move to the next move
# - otherwise
#   - create a new variation with the move 'add_variation()'

# when user wants to go back a move
# - if parent is not 'None' set current move to the parent of current move

# when user wants to go forward a move
# - if next doesn't return 'None' then set current move to next


# make a load pgn route here

# when user wants to go forward a move
@app.route("/moveForward", methods=["POST"])
def move_forward():
    global current_move

    # set the current move to the next move
    if current_move.next() is not None:
        current_move = current_move.next()

    return get_json_return() 

# when user wants to go back a move
@app.route("/moveBack", methods=["POST"])
def move_back():
    global current_move

    # set the current move to its parent
    if current_move.parent is not None:
        current_move = current_move.parent

    return get_json_return()


# when a move is clicked (changes the current move)
@app.route("/currentMove", methods=["POST"])
def current_move_():

    global current_move

    json = request.json
    move_id = json["current_move"]

    # find the current move by id and set it
    new_current = find_gamenode(move_id, game_tree)
    if new_current is None:
        raise Exception("Couldn't find the new 'currrent move' that was set")
    else:
        current_move = new_current

    return get_json_return()


# when a move is made on the board
@app.route("/move", methods=["POST"])
def move():
    global current_move

    # get json data
    json = request.json
    js_move = json["move"]
    move = current_move.board().parse_san(js_move["san"])  # dklsjaflkkdhashfkdsahfkdsfs kldf skld jflkds flkds f
    
    # if the move after current move was just made
    if current_move.next() is not None and move == current_move.next().move:
        # set current move to the next move
        # and add no new moves to the game tree
        current_move = current_move.next
    else:
        # just add the move to the next moves list
        new_node = current_move.add_variation(move)
        # give the node an id
        comment_with_id = add_id(new_node)
        new_node.comment = comment_with_id
        # update the current move
        current_move = new_node
    
    # return the game
    return get_json_return()

def get_json_return():
    return get_json_chess(game_tree, get_id(current_move))


if __name__ == "__main__":
    app.run(debug=True)
