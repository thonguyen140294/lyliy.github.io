document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
    }
    function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    }

    menuBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);
});
