// Welcome page auto transition
window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.querySelector('.welcome-screen');
  const app = document.querySelector('.app');

  setTimeout(() => {
    welcome.classList.add('fade-out');
    setTimeout(() => {
      welcome.style.display = 'none';
      app.style.display = 'flex';
    }, 1000);
  }, 3500); // 3.5 seconds display before transition
});

// Sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  sidebarOverlay.classList.toggle('show');
});

// Close sidebar when clicking outside (overlay)
sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebarOverlay.classList.remove('show');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('show');
  }
});


// Upload menu toggle
const uploadToggle = document.getElementById('uploadToggle');
const uploadMenu = document.getElementById('uploadMenu');
uploadToggle.addEventListener('click', () => {
  uploadMenu.classList.toggle('show');
});

// Send button
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');
const textarea = document.getElementById('userInput');

sendBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (text) {
    appendMessage('user', text);
    textarea.value = '';
    setTimeout(() => {
      appendMessage('bot', 'Processing your query...');
    }, 600);
  }
});

// Enter to send
textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Append chat message
function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// File Upload listeners
document.getElementById('pdfUpload').addEventListener('change', (e) => {
  appendMessage('user', `📄 Uploaded PDF: ${e.target.files[0]?.name}`);
});

document.getElementById('jsonUpload').addEventListener('change', (e) => {
  appendMessage('user', `🗂️ Uploaded JSON: ${e.target.files[0]?.name}`);
});

document.getElementById('emailUpload').addEventListener('change', (e) => {
  appendMessage('user', `✉️ Uploaded Email: ${e.target.files[0]?.name}`);
});
