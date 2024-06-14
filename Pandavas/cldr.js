document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.querySelector('.days');
    const monthElement = document.querySelector('.month');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const renderCalendar = (month, year) => {
        daysElement.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysElement.innerHTML += '<div class="empty"></div>';
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysElement.innerHTML += `
                <div class="day">
                    ${i}
                    <div class="badge"></div>
                    <textarea class="note" maxlength="100" placeholder="Add a note (max 100 words)"></textarea>
                </div>
            `;
        }

        monthElement.textContent = `${year}-${month + 1 < 10 ? '0' : ''}${month + 1}`;

        addNoteFunctionality();
    };

    const addNoteFunctionality = () => {
        const dayElements = document.querySelectorAll('.day');

        dayElements.forEach(day => {
            const note = day.querySelector('.note');
            const badge = day.querySelector('.badge');

            day.addEventListener('click', (e) => {
                if (e.target !== note) {
                    note.classList.toggle('visible');
                }
            });

            note.addEventListener('input', () => {
                const words = note.value.split(/\s+/).filter(word => word.length > 0);

                if (words.length > 100) {
                    note.value = words.slice(0, 100).join(' ');
                }

                badge.style.display = words.length > 0 ? 'block' : 'none';
            });
        });
    };

    prevButton.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextButton.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);

    // Close note textarea when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.classList.contains('note')) {
            document.querySelectorAll('.note').forEach(note => {
                note.classList.remove('visible');
            });
        }
    });
});
