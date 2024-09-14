from flask import Flask, render_template, request, send_from_directory
import openai

app = Flask(__name__)
openai.api_key = ""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_input = request.form["user_input"]
    response = openai.ChatCompletion.create(
        model="text-embedding-3-small",
        messages=[
            {"role": "system", "content": "Tu es un assistant amical."},
            {"role": "user", "content": user_input},
        ]
    )
    bot_response = response['choices'][0]['message']['content']
    return bot_response

# Route pour servir les fichiers JavaScript
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

if __name__ == "__main__":
    app.run(debug=True)
