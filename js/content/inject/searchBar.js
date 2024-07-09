

const searchBarHTML = `
<div class="pragya-search-bar-doorhanger-container">
    <div class="pragya-search-bar-overlay">
        <input type="text" class="pragya-search-bar-input" placeholder="Waiting for command...">
    </div>
</div>
`;

const searchBarCSS = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

.pragya-search-bar-doorhanger-container * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}

.pragya-search-bar-doorhanger-container {
    --pragya-search-bar-width: 520px;
    
    padding: 12px;
    margin: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    width: var(--pragya-search-bar-width);
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    z-index:2147483647;
    transition: all 250ms ease-in-out 0s;
    transform: translate(-50%, 2000%);

    background: rgba( 255, 255, 255, 0.68 );
    box-shadow: 0 0px 8px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 40px );
    -webkit-backdrop-filter: blur( 15px );
    border-radius: 18px;
    border: 1px solid rgba( 255, 255, 255, 0.40 );
}

.pragya-search-bar-doorhanger-open {
    transform: translate(-50%, -50%) !important;
}

.pragya-search-bar-overlay {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pragya-search-bar-input {
    height: 100%;
    width: 100%;
    padding: 2px 16px;
    font-size: 16px;
    border: none;
    border-radius: 32px;
    outline: none;
    background: transparent;
    color: #000;
    font-family: 'Quicksand', sans-serif;
}
`;


let isSearchBarOpen = false;


function injectSearchBar() {

    // Adding styles
    const style = document.createElement("style");
    style.innerHTML = searchBarCSS;
    document.head.appendChild(style);

    // Adding HTML
    const searchBar = document.createElement("div");
    searchBar.innerHTML = searchBarHTML;
    document.body.appendChild(searchBar);
}


function openSearchBar() {

    // Add open class
    const searchBar = document.querySelector(".pragya-search-bar-doorhanger-container");
    searchBar.classList.add("pragya-search-bar-doorhanger-open");

    // Focus on input
    const searchBarInput = document.querySelector(".pragya-search-bar-input");
    searchBarInput.focus();

    // Close search bar on Enter
    searchBarInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            closeSearchBar();
        }
    });

    // Add event listener to close search bar on click outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".pragya-search-bar-doorhanger-container")) {
            closeSearchBar();
            isSearchBarOpen = false;
        }
    });
}

function closeSearchBar() {

    // Remove open class
    const searchBar = document.querySelector(".pragya-search-bar-doorhanger-container");
    searchBar.classList.remove("pragya-search-bar-doorhanger-open");
}


injectSearchBar(); // Injecting search bar


// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
    if ((event.key === "q" && event.metaKey) || (event.key === "q" && event.ctrlKey)) { // Cmd + Q or Ctrl + Q
        if (!isSearchBarOpen) {
            openSearchBar();
            isSearchBarOpen = true;
        } else {
            closeSearchBar();
            isSearchBarOpen = false;
        }
    }
    if (event.key === "Escape") { // Esc
        closeSearchBar();
    }
});

