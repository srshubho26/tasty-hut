const loadData = async (callback, loaderId, containerId, url="search.php?s=") => {
    document.getElementById(loaderId).classList.remove("hidden");
    document.getElementById(containerId).classList.add("hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`);
    const data = await response.json();
    callback(data.meals);
}

const displayMeals = data => {
    let formatedData = "";
    data && data.forEach(el=>{
        formatedData += `<div class="border rounded-lg md:flex max-w-sm sm:max-w-full mx-auto">
                <img class="md:w-1/2 rounded-lg md:rounded-none md:rounded-l-lg" src="${el.strMealThumb}">

                <div class="md:w-1/2 p-3 lg:px-6 flex flex-col justify-center items-start">
                    <h4 class="text-title text-lg lg:text-2xl font-bold">${el.strMeal}</h4>
                    <p class="text-desc text-lg py-2 lg:py-4">${el.strInstructions.substr(0, 80)}...</p>
                    <button data-id="${el.idMeal}" class="text-color-btn font-semibold text-lg">View Details</button>
                </div>
            </div>`
    });

    if(!formatedData){
        formatedData = `<div class="text-center col-span-full">
        <img class="max-w-60 w-full mx-auto" src="./img/sad.svg">
        <h3 class="text-3xl font-bold text-color-btn">No Data Found!</h3>
        </div>`;
    }

    document.getElementById("dishes").innerHTML = formatedData;
    document.getElementById("dish-loader").classList.add("hidden");
    document.getElementById("dishes").classList.remove("hidden");
}

const displaySingle = data => {
    const prop = data[0];
    document.getElementById("single-thumb").src = prop.strMealThumb;
    document.getElementById("cat").textContent = prop.strCategory;
    document.getElementById("area").textContent = prop.strArea;
    document.getElementById("instruction").textContent = prop.strInstructions;
    document.getElementById("youtube").textContent = prop.strYoutube;
    document.getElementById("single-dish-title").textContent = prop.strMeal;

    document.getElementById("single-data-loader").classList.add("hidden");
    document.getElementById("single-data").classList.remove("hidden");
}

loadData(displayMeals, "dish-loader", "dishes");

document.getElementById("dishes").addEventListener("click", e=>{
    const target = e.target;
    if(target.tagName!=="BUTTON")return;
    document.getElementById("my_modal_3").showModal();
    loadData(displaySingle, "single-data-loader", "single-data", `lookup.php?i=${target.getAttribute("data-id")}`)
});

document.getElementById("search-form").addEventListener("submit", e=>{
    e.preventDefault();
    const srchTxt = document.getElementById("search-text").value;
    if(!srchTxt)return;
    loadData(displayMeals, "dish-loader", "dishes", `search.php?s=${srchTxt}`);
    window.location.href = "#dish-title";
})