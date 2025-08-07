// Welcome page auto transition
window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.querySelector('.welcome-screen');
  const app = document.querySelector('.app');

  setTimeout(() => {
    welcome.classList.add('fade-out');
    setTimeout(() => {
      welcome.style.display = 'none';
      app.style.display = 'flex';
    }, 1000); // Fade duration
  }, 3500); // Show welcome for 3.5s
});

// Sidebar toggle logic
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

sidebarToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  sidebarOverlay.classList.toggle('active');
  document.body.classList.toggle('sidebar-open');
});

sidebarOverlay?.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebarOverlay.classList.remove('active');
  document.body.classList.remove('sidebar-open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    uploadMenu?.classList.remove('show');
  }
});

// Upload menu toggle
const uploadToggle = document.getElementById('uploadToggle');
const uploadMenu = document.getElementById('uploadMenu');

uploadToggle?.addEventListener('click', () => {
  uploadMenu.classList.toggle('show');
});

// Close upload menu when clicking outside
document.addEventListener('click', (e) => {
  if (!uploadToggle.contains(e.target) && !uploadMenu.contains(e.target)) {
    uploadMenu.classList.remove('show');
  }
});

// Send button & chat logic
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');
const textarea = document.getElementById('userInput');

sendBtn?.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (text) {
    appendMessage('user', text);
    textarea.value = '';
    setTimeout(() => {
      appendMessage('bot', 'Processing your query...');
    }, 600);
  }
});

textarea?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Append chat messages
function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// File upload display
document.getElementById('pdfUpload')?.addEventListener('change', (e) => {
  appendMessage('user', `📄 Uploaded PDF: ${e.target.files[0]?.name}`);
});

document.getElementById('jsonUpload')?.addEventListener('change', (e) => {
  appendMessage('user', `🗂️ Uploaded JSON: ${e.target.files[0]?.name}`);
});

document.getElementById('emailUpload')?.addEventListener('change', (e) => {
  appendMessage('user', `✉️ Uploaded Email: ${e.target.files[0]?.name}`);
});


const voiceBtn = document.getElementById('voiceBtn');

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  voiceBtn.addEventListener('click', () => {
    voiceBtn.innerHTML = 'Listening...';
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value += transcript + " ";
  };
   recognition.onend = () => {
    voiceBtn.innerHTML = `<i class="fas fa-microphone"></i>`;
  };


  recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);
    voiceBtn.innerHTML = 'Error';
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Voice input not supported";
  voiceBtn.innerHTML = 'Voice input not supported';
}
document.getElementById('downloadBtn').addEventListener('click', () => {
  const chatBubbles = document.querySelectorAll('.chat-bubble');
  let chatText = '';

  chatBubbles.forEach(bubble => {
    const sender = bubble.classList.contains('user') ? 'You' : 'Bot';
    chatText += `${sender}: ${bubble.textContent.trim()}\n`;
  });

  const blob = new Blob([chatText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'chat_history.txt';
  link.click();
});


// Make sure this code runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const newChatBtn = document.getElementById("new-chat-btn");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");

  if (newChatBtn && chatBox && userInput) {
    newChatBtn.addEventListener("click", () => {
      // Clear the chat area completely
      chatBox.innerHTML = "";

      // Clear the user input box
      userInput.value = "";

      // Optional: Add a system message to indicate a new chat
      const systemMsg = document.createElement("div");
      systemMsg.classList.add("system-message");
      systemMsg.innerText = "🆕 New chat started.";
      chatBox.appendChild(systemMsg);
    });
  }
});

 // NEW CHAT FUNCTIONALITY
// NEW CHAT FUNCTIONALITY










