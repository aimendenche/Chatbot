# Chatbot using Flask, HTML, CSS, JavaScript, and Gemini API

## Overview

This project is a simple chatbot application developed using Flask for the backend, with the frontend built using HTML, CSS, and JavaScript. The chatbot interacts with the **Gemini API** to generate responses based on user input. The chatbot simulates conversational AI using a clean, responsive interface.

## Features

- **Interactive Chat**: Real-time interaction with users using JavaScript to handle API requests asynchronously.
- **Gemini API Integration**: Utilizes the Gemini API for generating chatbot responses.
- **Flask Backend**: Manages routing and communication between the frontend and the Gemini API.
- **Responsive Design**: The interface is designed using CSS for smooth interactions on various device sizes.
- **Environment Variables**: Sensitive information such as API keys are stored securely using environment variables.

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **API**: Gemini API

## Installation

### Prerequisites

- Python 3.x
- Flask installed
- Gemini API key

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/aimendenche/Chatbot.git
   cd Chatbot
   ```

2. **Create a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install the Required Packages**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root of your project with the following content:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Run the Application**:
   ```bash
   flask run
   ```
   This starts the application on `http://127.0.0.1:5000/`.

6. **Access the Chatbot**:
   Open your browser and go to `http://127.0.0.1:5000` to start interacting with the chatbot.

## Project Structure

```
├── app.py                     # Main Flask application
├── static/
│   ├── css/
│   │   └── style.css           # CSS for frontend styling
│   ├── js/
│   │   └── script.js          # JavaScript handling chat interactions
├── templates/
│   └── index.html              # HTML frontend template
├── interaction-api.py          # API interaction with Gemini API
├── .env                        # Environment variables (API keys)
└── README.md                   # Project documentation
```

### Key Files

- **`app.py`**: The Flask backend handling requests and serving the frontend.
- **`interaction-api.py`**: Script for connecting to the Gemini API and managing chatbot interactions.
- **`index.html`**: The main HTML file containing the chatbot interface.
- **`style.css`**: Custom CSS for designing the chatbot’s look and feel.
- **`chatbot.js`**: JavaScript handling the client-side logic for the chatbot, including asynchronous API calls.

## Usage

1. Open the web application in your browser.
2. Type your query or message into the chat input field.
3. The chatbot will respond with data processed by the Gemini API.

## API Integration

This project integrates the **Gemini API** to handle the chatbot's responses. Ensure that you have an active Gemini API key and that it is correctly configured in the `.env` file.

## Customization

- **Frontend**: Modify the CSS (`static/css/style.css`) to adjust the appearance of the chatbot interface.
- **Backend**: Modify the Flask routes and the interaction logic with the Gemini API in `interaction-api.py` and `app.py` to change how the chatbot processes requests.

## Troubleshooting

- **API Key Issues**: Ensure your Gemini API key is valid and is correctly set in the `.env` file.
- **CORS Issues**: If API requests fail, you may need to add Cross-Origin Resource Sharing (CORS) headers in your Flask app:
  ```python
  from flask_cors import CORS
  app = Flask(__name__)
  CORS(app)
  ```
