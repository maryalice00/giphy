// Alert to ensure JS is loaded
alert("JavaScript loaded!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");


function addGif(res) {
    console.log("addGif response:", res);
    
    if (res && Array.isArray(res)) {
        let numResults = res.length;
        if (numResults) {
            let randomIdx = Math.floor(Math.random() * numResults);
            let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4"});
            let $newGif = $("<img>", { src: res[randomIdx].images.original.url, class: "w-100"});
            $newCol.append($newGif);
            $gifArea.append($newCol);
        }
    } else {
        console.error("Unexpected API response format");
    }
}

// Event listener for form submission with API call
$("form").on("submit", async function(evt) {
    evt.preventDefault();
    let searchTerm = $searchInput.val();
    $searchInput.val("");
    try {
        const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
                q: searchTerm,
                api_key: "vQeS9ovdJi80ZA1N4ggFBKkkX5poOxOT"
            }
        });
        console.log("Full API Response:", response);
        addGif(response.data.data);    
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
        alert("Failed to fetch GIF. Please check the console for detailed error.");
    }
});

// Event listener for the "Remove Images" button
$("#remove").on("click", function() {
    $gifArea.empty();
});

