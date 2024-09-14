// Selecting elements from the DOM
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-form input");
const promptResponseDiv = document.getElementById("prompt-response");

let userMessage = null; // Variable to store the user's message
const inputInitHeight = chatInput.scrollHeight;

// API configuration (use your valid API key)
const API_KEY = "AIzaSyD8MDrADL-XF-O1vdlB4f8XJt8cb3RaHpQ";  // Replace with your valid API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// Function to create a chat <li> element
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Function to handle the bot's response for both chat and prompt
const generateResponse = async (chatElement, isPrompt = false) => {
  const messageElement = chatElement ? chatElement.querySelector("p") : null;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [{ text: userMessage }]
      }]
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Set the bot's response for the chatbox
    if (!isPrompt && messageElement) {
      messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    }

    // Set the bot's response for the prompt box
    if (isPrompt) {
      promptResponseDiv.innerHTML = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    }

  } catch (error) {
    if (messageElement) {
      messageElement.classList.add("error");
      messageElement.textContent = "Error: " + error.message;
    }

    if (isPrompt) {
      promptResponseDiv.textContent = "Error: " + error.message;
    }
  } finally {
    // Scroll the chatbox to the latest message if it's not from a prompt
    if (!isPrompt && chatbox) {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  }
};

// Unified function to handle user input
const handleUserInput = (inputMessage, isPrompt = false) => {
  userMessage = inputMessage.trim();
  if (!userMessage) return;

  // For chatbox interaction
  if (!isPrompt) {
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  }

  // For prompt form interaction
  if (isPrompt) {
    promptResponseDiv.textContent = "Thinking...";
    generateResponse(null, true);
  }
};

// Event listener for chat input area (textarea)
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleUserInput(chatInput.value);  // Handle the input from the textarea
    chatInput.value = "";  // Clear the textarea
    chatInput.style.height = `${inputInitHeight}px`;  // Reset height
  }
});

// Event listener for the send button in the chat input area
sendChatBtn.addEventListener("click", () => {
  handleUserInput(chatInput.value);  // Handle the input from the textarea
  chatInput.value = "";  // Clear the textarea
  chatInput.style.height = `${inputInitHeight}px`;  // Reset height
});

// Event listener for prompt form submission
promptForm.addEventListener("submit", (e) => {
  e.preventDefault();  // Prevent form submission (which would reload the page)
  handleUserInput(promptInput.value, true);  // Handle the input from the form
  promptInput.value = "";  // Clear the prompt form input
});

// Close button event
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

// Toggle the chatbot open/close
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Show or hide the scroll-to-top button based on the scroll position
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";  // Show button
  } else {
    scrollTopBtn.style.display = "none";   // Hide button
  }
}

// Scroll to top function
function scrollToTop() {
  document.body.scrollTop = 0;  // For Safari
  document.documentElement.scrollTop = 0;  // For Chrome, Firefox, IE, and Opera
}
// Make the bot image clickable and show a playful message
document.querySelector(".bot-image img").addEventListener("click", () => {
  alert("Hey! I'm Aimen's Bot. How can I assist you today?");
});
