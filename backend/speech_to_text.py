from flask import Flask, request, jsonify
import os
import re
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

    prompt1 = "Can you evaluate the provided elevator pitch recording? Use these 5 criteria: tone and clarity, confidence and persuasiveness, engagement and hook, personal branding, invites further conversation. Format of your response should be: An evaluation for each criteria with 30-50 words each and a score out of 20 for each (but only displayed as a percent, i.e. 17/20 is displayed as: Rating: 85% with the rating being below the criteria evaluation), an overall evaluation of 10-30 words, then the final sentence should display the sum of the five scores out of 20 each: Overall Rating: -- %"

    textEval = model.generate_content([myfile, prompt1])

    print(textEval.text)

    last_line = (textEval.text).splitlines()[-1]

    digits = re.findall(r'\d+', last_line)
    overallRating = int(''.join(digits)) if digits else 0
    # THIS ^ IS THE NUMBER FOR THE OVERALL RATING LIKE 95, 97, ETC.

    print(overallRating)



    # Return the evaluations
    return jsonify({
        "message": "File uploaded successfully",
        "filePath": file_path,
        "textEvaluation": textEval.text,
        "rating": overallRating
    })

if __name__ == '__main__':
    app.run(debug=True)
