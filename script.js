// Select elements
const studyForm = document.getElementById('study-form');
const sessionList = document.getElementById('session-list');

// Array to store sessions
let sessions = [];

// Load sessions from local storage if available
window.onload = function() {
    const storedSessions = localStorage.getItem('sessions');
    if (storedSessions) {
        sessions = JSON.parse(storedSessions);
        sessions.forEach(session => addSessionToDOM(session));
    }
}

// Event listener for form submission
studyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const subject = document.getElementById('subject').value;
    const topic = document.getElementById('topic').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    const session = {
        subject,
        topic,
        date,
        time,
        completed: false
    };
    
    sessions.push(session);
    addSessionToDOM(session);
    saveToLocalStorage();
    
    studyForm.reset();
});

// Function to add session to the DOM
function addSessionToDOM(session) {
    const li = document.createElement('li');
    li.className = 'session-item';

    const sessionInfo = document.createElement('span');
    sessionInfo.textContent = `${session.subject}: ${session.topic} on ${session.date} at ${session.time}`;
    
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = function() {
        session.completed = !session.completed;
        li.classList.toggle('completed');
        saveToLocalStorage();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        sessionList.removeChild(li);
        sessions = sessions.filter(s => s !== session);
        saveToLocalStorage();
    };
    
    li.appendChild(sessionInfo);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    
    if (session.completed) {
        li.classList.add('completed');
    }
    
    sessionList.appendChild(li);
}

// Save sessions to local storage
function saveToLocalStorage() {
    localStorage.setItem('sessions', JSON.stringify(sessions));
}
