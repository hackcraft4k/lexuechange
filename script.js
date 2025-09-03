document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.querySelector('.close-btn');

    // Function to open the sidebar
    function openNav() {
        sidebar.style.width = '250px';
    }

    // Function to close the sidebar
    function closeNav() {
        sidebar.style.width = '0';
    }

    // Event listeners
    toggleBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
});