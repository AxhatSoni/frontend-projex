document.addEventListener('DOMContentLoaded', () => {
    const username= localStorage.getItem('username');
    const createTeamButton = document.getElementById('create-team-button');
    const teamModal = document.getElementById('team-modal');
    const closeModal = document.querySelector('.close');
    const teamForm = document.getElementById('team-form');
    const teamNameInput = document.getElementById('team-name');
    const teamAlert = document.getElementById('team-alert');
    const welcomeUser = document.getElementById('welcome-user');
    if(username) {
        document.getElementById('username').textContent = username;
    }

    if (username) {
        welcomeUser.textContent = 'Welcome, ${username}';
    }

    createTeamButton.addEventListener('click', () => {
        teamModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        teamModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === teamModal) {
            teamModal.style.display = 'none';
        }
    });

    addMemberButton.addEventListener('click', () => {
        const memberInput = document.createElement('input');
        memberInput.type = 'text';
        memberInput.className = 'team-member';
        memberInput.placeholder = 'Enter member username';
        teamMembersDiv.appendChild(memberInput);
    });


    teamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const teamName = teamNameInput.value;

        try {
            const res = await fetch('/api/team/createOrJoin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamName, username })
            });
            const data = await res.json();
            if (res.ok) {
                teamAlert.textContent = 'Successfully joined/created the team';
                teamAlert.style.color = 'green';
            } else {
                teamAlert.textContent = data.msg;
                teamAlert.style.color = 'red';
            }
        } catch (err) {
            teamAlert.textContent = 'Failed to create/join team. Please try again.';
            teamAlert.style.color = 'red';
        }
    });

    const dismissBtn = document.querySelector('.dismiss-btn');
    const notification = document.querySelector('.notification');
    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dismissBtn.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    dropbtn.addEventListener('click', () => {
        dropdown.classList.toggle('active');
        if (dropdown.classList.contains('active')) {
            dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
        } else {
            dropdownContent.style.maxHeight = '0';
        }
    });

    document.getElementById('discuss-button').addEventListener('click', () => {
        window.location.href = 'discuss.html';
    });
});
