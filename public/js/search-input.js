document.querySelector("#search-input").addEventListener("input", filterList);

function filterList() {
    const searchInput = document.querySelector("#search-input");
    const filter = searchInput.value.toLowerCase();
    const listItems = document.querySelectorAll(".listItem");

    listItems.forEach(e => {
        let text = e.textContent;
        if(text.toLowerCase().includes(filter.toLowerCase())) {
            e.style.display = "";
        } else {
            e.style.display = "none";
        }
    })
}