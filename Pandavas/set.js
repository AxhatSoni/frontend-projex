document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('font-family').addEventListener('change', (event) => {
        alert(`Font family changed to: ${event.target.value}`);
        document.body.style.fontFamily = event.target.value;
    });

    document.getElementById('font-size').addEventListener('input', (event) => {
        alert(`Font size changed to: ${event.target.value}px`);
        document.body.style.fontSize = `${event.target.value}px`;
    });

    document.getElementById('landing-page').addEventListener('change', (event) => {
        alert(`Landing page set to: ${event.target.value}`);
        // Apply landing page change logic here
    });

    document.getElementById('mode').addEventListener('change', (event) => {
        alert(`Mode changed to: ${event.target.value}`);
        // Apply day/night mode change logic here
    });

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            alert(`Theme changed to: ${theme}`);
            // Apply theme change logic here
        });
    });
});
