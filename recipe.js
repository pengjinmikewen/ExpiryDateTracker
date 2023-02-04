
let btnShow = document.querySelector("#button");
let result = document.querySelector("h1");

btnShow.addEventListener("click", () => {
    let checkboxValues = document.querySelectorAll('input[type="checkbox"]:checked');
    let searchString = "";
    for (let i = 0; i < checkboxValues.length; i++) {
        searchString += checkboxValues[i].defaultValue + " ";
    }

    result.innerText = searchString;
    console.log("button pressed");
    console.log(searchString);
    sendApiRequest(searchString);

})


async function sendApiRequest(searchString) {
    let app_id = "c109b0c8";
    let app_key = "e4e730dc5cd38898e783c34ffa532179";
    let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&q=${searchString}`);
    console.log(response);
    let data = await response.json();
    console.log(data);
    useApiData(data);
}

function useApiData(data) {
    
    let tagsAndContent = "";
    for (let i = 0; i < data.hits.length; i++) {
        tagsAndContent += `
        <div class="card" style="width: 18rem;">
            <img src="${data.hits[i].recipe.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.hits[i].recipe.label}</h5>
                <p class="card-text">Meal type: ${data.hits[i].recipe.mealType} <br>Time: ${data.hits[i].recipe.totalTime} minutes <br> Source: ${data.hits[i].recipe.source}</p>
                <a href="${data.hits[i].recipe.url}" class="btn btn-primary">Visit Recipe</a>
            </div>
        </div>
        `;
    }
    document.querySelector("#content").innerHTML = tagsAndContent;
    
   /*
    console.log(data.hits.length)
    document.querySelector("#content").innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${data.hits[0].recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.hits[0].recipe.label}</h5>
            <p class="card-text">Meal type: ${data.hits[0].recipe.mealType} <br>Time: ${data.hits[0].recipe.totalTime} minutes <br> Source: ${data.hits[0].recipe.source}</p>
            <a href="${data.hits[0].recipe.url}" class="btn btn-primary">Visit Recipe</a>
        </div>
    </div>
    `;
    */
}

