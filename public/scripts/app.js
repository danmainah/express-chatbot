const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');
const ideasList = document.getElementById('ideas-list');
const sendBtn = document.getElementById('send-btn');
const resetBtn = document.getElementById('reset-btn');
const saveBtn = document.getElementById('save-btn');
const continueBtn = document.getElementById('continue-btn');

// Function to append a message to the chat window
const appendMessage = (message, isBot = false) => {
  const p = document.createElement('p');
  p.className = isBot ? 'text-blue-500' : 'text-green-500';
  p.textContent = message;
  chatWindow.appendChild(p);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Handle sending chat messages
sendBtn.addEventListener('click', async () => {
  const message = chatInput.value;
  if (!message.trim()) return;

  appendMessage(message);
  chatInput.value = '';

  // Send message to backend chatbot
  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, action: 'initial' }),
  });
  
  const data = await response.json();
  appendMessage(data.response, true);
});

// Handle save button click
saveBtn.addEventListener('click', async () => {
    const messages = chatWindow.children;
    const idea = messages[messages.length - 2].textContent;
    if (!idea.trim()) return; // Prevent saving empty ideas
  
    const response = await fetch('/chat', { // Correct endpoint for saving ideas
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, action: 'save' }),
    });
  
    const data = await response.json();
    
    if (data.success) {
      updateIdeasList(data.ideas);
      chatInput.value = ''; // Clear input field after saving
    }
  });

// Reset conversation and ideas
resetBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/reset-chat', { // Correct endpoint for resetting chat
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        updateIdeasList(data.ideas); // Update UI with cleared ideas list
        chatWindow.innerHTML = ''; // Clear the chat window
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
});

// Function to update the ideas list in the UI
const updateIdeasList = (ideas) => {
  ideasList.innerHTML = '';
  ideas.forEach((idea) => {
    const li = document.createElement('li');
    li.textContent = idea.content;
    ideasList.appendChild(li);
  });
};

continueBtn.addEventListener('click', async () => {
  const message = chatWindow.lastElementChild.textContent; // Get the text from the chat input field
  if (!message.trim()) return; // Prevent sending empty messages

  chatWindow.lastElementChild.remove(); // Remove the last message from the chat window
  appendMessage(message);
  // Send the message to the backend chatbot
  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, action: 'continue' }),
  });

  const data = await response.json();

  // Append the chatbot's response to the chat window
  if (data.botResponse) {
    appendMessage(data.botResponse, true);
  } else {
    console.error('No bot response received');
  }
});