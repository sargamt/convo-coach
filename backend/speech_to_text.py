import speech_recognition as sr

# Initialize the recognizer
r = sr.Recognizer()

def record_text():
    # Loop in case of errors
    while(1):
        try:
            # Use the mic as a source for input
            with sr.Microphone() as source2:
                # Prepare recognizer to recieve input
                r.adjust_for_ambient_noise(source2, duration=0.2)

                # Listens for the user's input
                audio2 = r.listen(source2)

                # Using google to recognize audio
                MyText = r.recognize_google_cloud(audio2)

                return MyText
            
        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))

        except sr.UnknownValueError:
            print("Unknown Error Occurred")

    return

def output_text(text):
    # Access output.txt file from this directory and makes one if it does not exist
    # "a" is for append so it does not overwrite the text every time
    f = open("output.txt", "a")
    f.write(text)
    f.write("\n")
    f.close
    return

while(1):
    text = record_text()
    output_text(text)

    print("Wrote text")