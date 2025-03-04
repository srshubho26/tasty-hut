const loadData = async (callback, loaderId, containerId, url="search.php?s=", isCat) => {
    document.getElementById(loaderId).classList.remove("hidden");
    document.getElementById(containerId).classList.add("hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`);
    const data = await response.json();
    callback(isCat ? data.categories : data.meals);
}

const displayMeals = data => {
    let formatedData = "";
    data && data.forEach(el=>{
        const desc = el.strInstructions;
        formatedData += `<div class="border rounded-lg md:flex max-w-sm sm:max-w-full mx-auto">
                <img class="md:w-1/2 rounded-lg md:rounded-none md:rounded-l-lg" src="${el.strMealThumb}">

                <div class="md:w-1/2 p-3 lg:px-6 flex flex-col justify-center items-start">
                    <h4 class="text-title text-lg lg:text-2xl font-bold">${el.strMeal}</h4>
                    ${desc ? `<p class="text-desc text-lg pt-2 lg:pt-4">${desc.substr(0, 80)}...</p>` : ""}
                    <button data-id="${el.idMeal}" class="mt-2 lg:mt-4 px-4 py-2 rounded bg-color-btn font-semibold text-lg">View Details</button>
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
    const yt = prop.strYoutube;
    document.getElementById("youtube").innerHTML = yt ? `<a target="_blank" class="px-2 py-1 rounded-md bg-color-btn" href="${yt}">Click here to watch on youtube.</a>` : "N/A";
    document.getElementById("single-dish-title").textContent = prop.strMeal;

    document.getElementById("single-data-loader").classList.add("hidden");
    document.getElementById("single-data").classList.remove("hidden");
}

const displayCat = data => {
    document.getElementById("cat-loader").classList.add("hidden");
    document.getElementById("cat-container").classList.remove("hidden");

    let = dropdownItems = "";
    data && data.forEach(el=>{
        dropdownItems += `<div data-cat="${el.strCategory}" class="border border-desc rounded-md p-2 bg-color-btn cursor-pointer cat">
            <img data-cat="${el.strCategory}" class="p-1 border border-title rounded-full mb-2 w-20 h-20 mx-auto object-cover" src="${el.strCategoryThumb}">
            <span data-cat="${el.strCategory}">${el.strCategory}</span>
        </div>`
    });

    if(!dropdownItems)dropdownItems = "<p>No category available!</p>";

    document.getElementById("cat-elements").innerHTML = dropdownItems;
}

const loadCatAfterDish = async()=>{
    await loadData(displayMeals, "dish-loader", "dishes");
    loadData(displayCat, "cat-loader", "cat-container", "categories.php", true);
}

loadCatAfterDish();

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
});

document.getElementById("cat-elements").addEventListener("click", e=>{
    let target = e.target;
    const catId = target.getAttribute("data-cat");
    if(!catId || target.classList.contains("bg-stone-300"))return;
    loadData(displayMeals, "dish-loader", "dishes", `filter.php?c=${catId}`);
    if(!target.classList.contains("cat"))target = target.parentNode;
    const currActive = document.querySelector(".cat.bg-stone-300");
    if(currActive){
        currActive.classList.remove("bg-stone-300");
        currActive.classList.add("bg-color-btn");
    }
    target.classList.add("bg-stone-300");
    target.classList.remove("bg-color-btn");

    document.getElementById("cat-elements").blur();
});



let str = 'almans rahsmassssssssn shuvo';
let count = 0;
console.log(str.slice(str.indexOf('s'), str.lastIndexOf('s')+1))
let i=5;
for( i in str){
    console.log(i)
}


console.log(str.split('s').length-1)