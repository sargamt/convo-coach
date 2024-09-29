from flask import Flask, request, jsonify
import os
import google.generativeai as genai

app = Flask(__name__)

# Set up upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Set up API key for the generative AI
genai.configure(api_key=os.environ["GOOGLE_GEM_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    # Ensure the uploaded file is an MP3
    if not file.filename.endswith('.mp3'):
        return jsonify({"message": "Only MP3 files are allowed"}), 400

    # Save the file to the uploads directory
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Upload the audio file to the AI model
    myfile = genai.upload_file(file_path)

    prompt1 = "Can you evaluate how confident he sounds?"
    prompt2 = "Give it a rating on a scale of 0 to 100 percent."

    textEval = model.generate_content([myfile, prompt1])
    ratingEval = model.generate_content([myfile, prompt2])

    print(textEval.text)
    print(ratingEval.text)

    # Return the evaluations
    return jsonify({
        "message": "File uploaded successfully",
        "filePath": file_path,
        "textEvaluation": textEval.text,
        "rating": ratingEval.text
    })

if __name__ == '__main__':
    app.run(debug=True)
