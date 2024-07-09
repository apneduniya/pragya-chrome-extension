


const API_URL = 'http:/localhost:8000';
const state = new State(); // Initialize the state object.


async function sendMsgToContent(message) {
    /**
     * This function is used to send a message to the content script.
     * @param {object} message - The message to be sent.
     */

    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
    // Optional: do something with response
}

async function getSavedState(key) {
    /**
     * This function is used to get the saved state from the state object.
     * @param {string} key - The key of the state object.
     */

    let stateValue = null;
    await new Promise(resolve => {
        state.getSavedState(key, function (value) {
            stateValue = value;
            resolve();
        });
    });

    return stateValue;
}


async function postAPI(slug, data) {
    /**
     * This function is used to make an API request to the agent API.
     * @param {string} slug - The slug of the API endpoint like `/get-data`.
     * @param {object} data - The data to be sent in the request.
     */

    const payload = JSON.stringify(data);
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: payload
    };
    try {
        const fetchResponse = await fetch(`${API_URL}${slug}`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        if (e instanceof TypeError) {
            console.log("Adblocker or your browser is blocking the API request. Please disable it and try again.");
            return null;
        }

        console.log(`Error at ${slug}: ${e}`);
        console.log(`Payload: ${payload}`);
        return null;
    }

}
