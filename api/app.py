from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/api")
def index():
    return jsonify("none")

@app.route("/move", methods=["POST"])
def move():
    json = request.json
    print(json)
    return jsonify("none")


if __name__ == "__main__":
    app.run(debug=True)
