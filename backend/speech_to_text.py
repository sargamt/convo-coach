import google.generativeai as genai
import os

# set up API key
genai.configure(api_key=os.environ["GOOGLE_GEM_API_KEY"])

# set up Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# upload audio file
myfile = genai.upload_file("New_Recording_12.mp3")
# print(f"{myfile=}")

prompt1 = "Can you evaluate how confident he sounds?"
prompt2 = "Give it a rating on a scale of 0 to 100 percent."

textEval = model.generate_content([myfile, prompt1])
ratingEval = model.generate_content([myfile, prompt2])

print(textEval.text)
print(ratingEval.text)