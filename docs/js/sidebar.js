const menuButton = document.getElementById("menu-button")
const sidebar = document.getElementById("sidebar")

function changeSidebar() {
    sidebar.classList.toggle("active")
    menuButton.classList.toggle("active")
}

function createSidebar() {
    const sidebarItems = [
        {
            title: "Home",
            page: "index.html"
        },
        {
            title: "ASMR",
            page: "asmr.html"
        },
        {
            title: "Gallery",
            page: "gallery.html"
        }
    ]

    sidebarItems.forEach(element => {
        const linkButton = document.createElement('a')
        linkButton.textContent = element.title
        linkButton.href = element.page
        sidebar.appendChild(linkButton)
    });
}

createSidebar()
menuButton.addEventListener("click", changeSidebar);