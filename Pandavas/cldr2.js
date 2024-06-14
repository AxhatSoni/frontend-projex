const calendarTable = document.querySelector('.calendar-table');
const addActivityButton = document.querySelector('#add-activity-button');

addActivityButton.addEventListener('click', () => {
  const dateInput = document.querySelector('#date-input');
  const noteInput = document.querySelector('#note-input');

  const date = dateInput.value;
  const note = noteInput.value;

  if (!date || !note) {
    alert('Please enter both date and note.');
    return;
  }

  const dateCell = document.querySelector(`td[data-date="${date}"]`);
  if (!dateCell) {
    alert('Invalid date.');
    return;
  }

  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.textContent = note;
  noteElement.style.display = 'none';

  const noteBadgeElement = document.createElement('div');
  noteBadgeElement.classList.add('note-badge');
  noteBadgeElement.textContent = '•';

  dateCell.appendChild(noteElement);
  dateCell.appendChild(noteBadgeElement);

  dateInput.value = '';
  noteInput.value = '';
});

calendarTable.addEventListener('click', (event) => {
  if (event.target.classList.contains('note-badge')) {
    const noteElement = event.target.previousElementSibling;
    noteElement.style.display = noteElement.style.display === 'none' ? 'block' : 'none';
  }
});