# Chatbot App

This is a simple chatbot app built using Node.js and Express.js. The app allows users to chat with a bot and save their conversation history and ideas.

## Prerequisites

Before running the app locally, make sure you have the following installed:

Node.js (version 12 or higher)
npm (version 6 or higher)

## Getting Started

### Clone the repository:

git clone https://github.com/danmainah/express-chatbot.git

### Install dependencies:
```
cd express-chatbot
npm install
```
### Start the server:
```
npm start
This will start the server on http://localhost:3000.
```
## Usage
Open your web browser and navigate to http://localhost:3000.
Start chatting with the bot by typing a message in the chat window.

The bot will respond with a message based on the input.

You can save your conversation history by clicking the "Save" button in the chat window.

You can click save idea to save idea type or continue to continue with the conversation

## Testing
To test the app locally, you can use a tool like Postman or curl to send requests to the API endpoints. Here are some example requests:

To send a message to the bot:
```
POST http://localhost:3000/api/chat
Content-Type: application/json

{
    "message": "Hello, bot!"
}

```

To get the conversation history:
```
GET http://localhost:3000/api/chat

```
To save the conversation history:
```
POST http://localhost:3000/api/chat/save
```
### Contributing
If you'd like to contribute to this project, please follow these steps:

```
1. Fork the repository

2. Create a new branch

3. Make your changes

4. Test your changes

5. Submit a pull request 
```

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.