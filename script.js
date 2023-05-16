// Function to send user input to the ChatGPT API and get a response
async function getChatGPTResponse(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-...6wN0', // Replace with your actual API key
    },
    body: JSON.stringify({
      'messages': [{'role': 'system', 'content': 'You are a user'}, {'role': 'user', 'content': userMessage}],
    }),
  });

  const { choices } = await response.json();
  const botReply = choices[0].message.content;

  return botReply;
}

// Function to handle user input and generate a response
async function handleUserInput() {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput !== '') {
    addMessageToLog(userInput, 'user');
    document.getElementById('user-input').value = ''; // Clear input field

    const botResponse = await getChatGPTResponse(userInput);

    addMessageToLog(botResponse, 'bot');
  }
}

// Event listener for the send button
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', handleUserInput);

// Event listener for the Enter key
const userInput = document.getElementById('user-input');
userInput.addEventListener('keydown', async function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    await handleUserInput();
  }
});

// Function to add a message to the chat log
function addMessageToLog(message, sender) {
  const chatLog = document.getElementById('chat-log');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
}
