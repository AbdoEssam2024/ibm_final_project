let searchResults = document.querySelector(".search-results");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let resetButton = document.getElementById("reset-button");
let countries = [];
let temples = [];
let beaches = [];
// let result = `<div class="result">
//                     <img src="images/bg_main.webp" alt="">
//                     <div class="result-info">
//                         <h2>Paris</h2>
//                         <p>France</p>
//                         <button>Visit</button>
//                     </div>
//                 </div>`;

document.addEventListener("DOMContentLoaded", () => {
    fetch("./travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
            countries = data.countries;
            temples = data.temples;
            beaches = data.beaches;

            console.log(countries);
            console.log(temples);
            console.log(beaches);
        });
});

searchButton.addEventListener("click", () => {
    let searchValue = searchInput.value;
    if (searchValue != "" && (searchValue.toLowerCase().includes("beach") || searchValue.toLowerCase().includes("beaches"))) {
        searchResults.style.display = "block";
        searchResults.innerHTML = "";
        beaches.forEach((beach) => {
            searchResults.innerHTML += `<div class="result">
                    <img src="${beach.imageUrl}" alt="">
                    <div class="result-info">
                        <h2>${beach.name}</h2>
                        <p>${beach.description}</p>
                        <button>Visit</button>
                    </div>
                </div>`;
        })
    }
    else if (searchValue != "" && (searchValue.toLowerCase().includes("temple") || searchValue.toLowerCase().includes("temples"))) {
        searchResults.style.display = "block";
        searchResults.innerHTML = "";
        temples.forEach((temple) => {
            searchResults.innerHTML += `<div class="result">
                    <img src="${temple.imageUrl}" alt="">
                    <div class="result-info">
                        <h2>${temple.name}</h2>
                        <p>${temple.description}</p>
                        <button>Visit</button>
                    </div>
                </div>`;
        })
    }
    else if (searchValue != "") {
        searchResults.style.display = "block";
        searchResults.innerHTML = "";
        if (searchValue.toLowerCase().includes('country') || searchValue.toLowerCase().includes('countries')) {
            countries.forEach((country) => country.cities.forEach((city) => {

                searchResults.innerHTML += `<div class="result">
                    <img src="${city.imageUrl}" alt="">
                    <div class="result-info">
                        <h2>${city.name}</h2>
                        <p>${city.description}</p>
                        <button>Visit</button>
                    </div>
                </div>`;

            }))
        } else {
            countries.forEach((country) => {
                country.cities.forEach((city) => {
                    if (city.name.toLowerCase().includes(searchValue.toLowerCase())) {
                        searchResults.innerHTML += `<div class="result">
                    <img src="${city.imageUrl}" alt="">
                    <div class="result-info">
                        <h2>${city.name}</h2>
                        <p>${city.description}</p>
                        <button>Visit</button>
                    </div>
                </div>`;
                    }
                })
            })
        }
    }
});

resetButton.addEventListener("click", () => {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    searchInput.value = "";
});
