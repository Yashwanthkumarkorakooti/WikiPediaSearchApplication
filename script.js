let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResult(result){
    let { title,link,description } = result ;
    // 1.Creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    
    // 2.Creating Anchor Title Element 
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title ;
    resultTitleEl.href = link ;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    
    // 3.Creating Line Break Element 
    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);
    
    // 4.Creating Anchor URL Element
    let resultUrlEl = document.createElement("a");
    resultUrlEl.classList.add("result-url");
    resultUrlEl.href = link ;
    resultUrlEl.target = "_blank";
    resultUrlEl.textContent = link ;
    resultItemEl.appendChild(resultUrlEl);
    
    // 5.Creating Line Break Element
    let linebreakEl = document.createElement("br");
    resultItemEl.appendChild(linebreakEl);
    
    // 6.Creating Desciption Element 
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
    
    //7.Creating horizontal line element 
    let hrEl = document.createElement("hr");
    resultItemEl.appendChild(hrEl);
}

function displayResults(searchResult){
    spinnerEl.classList.add("d-none");
    
    for (let result of searchResult) {
        createAndAppendSearchResult(result);
  }
   
}

function searchWikipedia(event){
    if (event.key === "Enter") {

    spinnerEl.classList.toggle("d-none");
    searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
          method: "GET"
        };
    
        fetch(url, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (jsonData) {
            let { search_results } = jsonData;
            displayResults(search_results);
          });
    }
}

searchInputEl.addEventListener("keydown",searchWikipedia);