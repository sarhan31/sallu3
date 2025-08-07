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

sendBtn?.addEventListener('click', async () => {
  const text = textarea.value.trim();
  if (!text) return;

  appendMessage('user', text);
  textarea.value = '';

  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'chat-bubble bot';
  loadingMsg.textContent = 'Thinking...';
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://backend-8c4t.onrender.com/hackrx/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 9da8aafea3dc4af423a86e812d47c130c9d39985a93d5f6574705dbf192d0209"
      },
      body: JSON.stringify({
        documents: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",  // or dynamic
        questions: [text]
      })
    });

    const data = await response.json();
    chatBox.removeChild(loadingMsg);

    if (response.ok && data.answers?.[0]) {
      appendMessage('bot', `🤖 ${data.answers[0]}`);
    } else {
      appendMessage('bot', `❌ Error: ${data.detail || data.error}`);
    }
  } catch (error) {
    chatBox.removeChild(loadingMsg);
    appendMessage('bot', `❌ Exception: ${error.message}`);
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
  appendMessage('user', `🗂 Uploaded JSON: ${e.target.files[0]?.name}`);
});
document.getElementById('emailUpload')?.addEventListener('change', (e) => {
  appendMessage('user', `✉ Uploaded Email: ${e.target.files[0]?.name}`);
});

// Voice input
const voiceBtn = document.getElementById('voiceBtn');

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  voiceBtn.addEventListener('click', () => {
    voiceBtn.innerHTML = '🎤 Listening...';
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textarea.value += transcript + " ";
  };

  recognition.onend = () => {
    voiceBtn.innerHTML = `<i class="fas fa-microphone"></i>`;
  };

  recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);
    voiceBtn.innerHTML = 'Voice error';
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Voice input not supported";
  voiceBtn.innerHTML = 'Voice input not supported';
}

// Download button logic
document.getElementById('downloadBtn')?.addEventListener('click', () => {
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

// New chat functionality from navbar
document.addEventListener("DOMContentLoaded", () => {
  const newChatBtn = document.getElementById("new-chat-btn");

  if (newChatBtn && chatBox && textarea) {
    newChatBtn.addEventListener("click", () => {
      chatBox.innerHTML = "";
      textarea.value = "";

      const systemMsg = document.createElement("div");
      systemMsg.classList.add("system-message");
      systemMsg.innerText = "🆕 New chat started.";
      chatBox.appendChild(systemMsg);
    });
  }
});
