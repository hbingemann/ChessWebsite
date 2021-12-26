import uuid

NODE_ID_START = "node_id::"
NODE_ID_END = "::end_id"
 
def get_id(gamenode):
    comment = gamenode.comment
    if comment.find(NODE_ID_START) == -1:
        # didn't find an id
        print(gamenode.comment)
        return None
    start = comment.find(NODE_ID_START) + len(NODE_ID_START)
    comment_sub = comment[start:] # get everything after the start of the id
    end = start + comment_sub.index(NODE_ID_END)
    print()
    return comment[start:end]


# returns an updated comment
def add_id(gamenode):
    # make sure we don't add two ids
    if get_id(gamenode) is None:
        return gamenode.comment + NODE_ID_START + str(uuid.uuid4()) + NODE_ID_END
    return gamenode.comment


def find_gamenode(id, game):
    for node in game.variations():
        if get_id(node) == id:
            return node

    # no gamenode found with the given id 
    return None

