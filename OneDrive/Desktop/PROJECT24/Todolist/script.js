document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Selections
    const todoGrid = document.getElementById('todo-grid');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const signInBtn = document.getElementById('sign-in-btn');
    const signInModal = document.getElementById('sign-in-modal');
    const signUpModal = document.getElementById('sign-up-modal');
    const createAccountBtn = document.getElementById('create-account-btn');
    const closeBtns = document.querySelectorAll('.close-btn');
    const allTasksBtn = document.getElementById('all-tasks');
    const pendingTasksBtn = document.getElementById('pending-tasks');
    const inProgressTasksBtn = document.getElementById('in-progress-tasks');
    const doneTasksBtn = document.getElementById('done-tasks');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Add a new task to the grid
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        // Create task element
        const taskBox = document.createElement('div');
        taskBox.classList.add('todo-box', 'pending');
        taskBox.innerHTML = `
            <header>${taskText}</header>
            <textarea class="form-control task-note" placeholder="Add a note..."></textarea>
            <footer class="d-flex justify-content-between align-items-center">
                <div class="status-icons">
                    <button class="btn" data-status="pending"><i class="fas fa-hourglass-start"></i></button>
                    <button class="btn" data-status="in-progress"><i class="fas fa-spinner"></i></button>
                    <button class="btn" data-status="done"><i class="fas fa-check"></i></button>
                </div>
                <button class="btn btn-danger remove-task">Remove</button>
            </footer>
        `;

        todoGrid.appendChild(taskBox);
        taskInput.value = '';

        // Task status change logic
        taskBox.querySelectorAll('.status-icons button').forEach(btn => {
            btn.addEventListener('click', () => {
                taskBox.className = `todo-box ${btn.getAttribute('data-status')}`;
            });
        });

        // Task removal logic
        taskBox.querySelector('.remove-task').addEventListener('click', () => {
            taskBox.remove();
        });
    };

    // Add task using 'Enter' key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Add task using the button
    addTaskBtn.addEventListener('click', addTask);

    // Display Sign-In modal
    signInBtn.addEventListener('click', () => {
        signInModal.classList.remove('hidden');
        signUpModal.classList.add('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Display Sign-Up modal
    createAccountBtn.addEventListener('click', () => {
        signUpModal.classList.remove('hidden');
        signInModal.classList.add('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });

    // Sign-In form submission logic
    document.getElementById('sign-in-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value.trim();
        const password = e.target.querySelector('input[type="password"]').value.trim();

        if (email && password) {
            alert('Signed in successfully!');
            signInModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        } else {
            alert('Please enter both email and password.');
        }
    });

    // Sign-Up form submission logic
    document.getElementById('sign-up-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target.querySelector('input[type="text"]').value.trim();
        const email = e.target.querySelector('input[type="email"]').value.trim();
        const password = e.target.querySelector('input[type="password"]').value.trim();

        if (username && email && password) {
            alert('Account created successfully!');
            signUpModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        } else {
            alert('Please fill out all fields.');
        }
    });
    
    // Task filter button event handlers
    allTasksBtn.addEventListener('click', () => filterTasks('all'));
    pendingTasksBtn.addEventListener('click', () => filterTasks('pending'));
    inProgressTasksBtn.addEventListener('click', () => filterTasks('in-progress'));
    doneTasksBtn.addEventListener('click', () => filterTasks('done'));

    // Filter tasks based on status
    const filterTasks = (status) => {
        todoGrid.querySelectorAll('.todo-box').forEach(task => {
            task.style.display = (status === 'all' || task.classList.contains(status)) ? 'block' : 'none';
        });
    };

    // Toggle the visibility of the nav links when the hamburger is clicked
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close nav menu when a link is clicked (optional for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});
