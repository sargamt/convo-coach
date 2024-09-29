# ConvoCoach
Elevate your pitch, perfect your performance!
A website that gives feedback on YOUR interviewing skills! Simply upload a recording of yourself for one of the following three modes, and receive your displayed assessment.

## Features

- **Behavioral Mode**: Analyze your behavioral interview answers based on tone, clarity, STAR method, relevance, and confidence.
- **Technical Mode**: Get feedback on your technical interview answers based on technical knowledge, problem-solving, considering hypothetical scenarios, adaptability to changing requirements, and design patterns.
- **Elevator Pitch Mode**: Assess your elevator pitch based on tone and clarity, confidence and persuasiveness, engagement and hook, personal branding, and how it invites further conversation.

## Technologies Used

### Frontend
- **HTML5**: Structure and layout of the web application.
- **CSS3**: Styling the interface, including animations and responsiveness.
- **JavaScript**: Handles user interactions, uploads, and file processing.
  - **Fetch API**: To handle file uploads and communicate with the backend.

### Backend
- **Python**: For server-side logic and processing.
  - **Flask Framework**: Handles routing, file uploads, and integrates with the Google Gemini AI API.
  - **Tkinter**: A simple GUI popup for displaying feedback on the server side.
  - **Google Gemini AI API**: Provides intelligent feedback based on audio recordings.

## Installation / Setup
1. Generate Google Gemini API key
2. pip install -q -U google-generativeai
3. export GOOGLE_GEM_API_KEY="your-api-key"
4. pip install flask
5. pip install flask-cors
6. pip install tk

## Acknowledgements
- Google Gemini AI API
- more...
