document.body.style.backgroundColor="black";
var divc = document.createElement("div");
divc.className="container";

var divrow = document.createElement("div");
divrow.className="row";

var divnamelist= document.createElement("div");


var h1 =document.createElement("h1");
h1.innerHTML=`THE MEALS DB `;
h1.style.color="aqua";
h1.style.textAlign="center";
h1.style.marginTop="30px";
h1.style.marginBottom="25px";

var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","mealsname");
input.style.width="275px";
input.style.margin="10px";
input.style.marginBottom="20px";
input.setAttribute("placeholder","Meals Name (optional) eg.Arrabiata");


var span=document.createElement("span");
span.innerHTML="OR";
span.style.color="green";
var span1=document.createElement("span");
span1.innerHTML="OR";
span1.style.color="green";

var lb=document.createElement("br");
var button=document.createElement("button");
button.setAttribute("type","button");
button.classList.add("btn","btn-secondary");
button.style.textAlign="center";
button.style.margin="10px";
button.style.marginBottom="10px";
button.style.width="10%";
button.innerHTML="Search";
button.addEventListener("click",foo);

// dropdown creation for type
var label = document.createElement("label");
label.setAttribute("for", "btype");
label.innerHTML = "Meals Category : ";
label.style.marginLeft="10px";
label.style.marginBottom="20px";
label.style.color="blue";

var selectvalue = document.createElement("select");
selectvalue.setAttribute("id", "btype");
selectvalue.setAttribute("name", "btype");
selectvalue.setAttribute("class","btn btn-danger dropdown-toggle");


//fuction to create option in dropdown list
function createoptionvalue(value1) {
    var opt = document.createElement("option");
    opt.value = value1;
    opt.text = value1;
    return opt;
}

var option = createoptionvalue("NA");
var option1 = createoptionvalue("Beef");
var option2 = createoptionvalue("Breakfast");
var option3 = createoptionvalue("Chicken");
var option4 = createoptionvalue("Dessert");
var option5 = createoptionvalue("Goat");
var option6 = createoptionvalue("Lamb");
var option7 = createoptionvalue("Miscellaneous");
var option8 = createoptionvalue("Pasta");
var option9 = createoptionvalue("Pork");
var option10 = createoptionvalue("Seafood");
var option11 = createoptionvalue("Side");
var option12= createoptionvalue("Starter");
var option13= createoptionvalue("Vegan");
var option14 = createoptionvalue("Vegetarian");


selectvalue.append(option,option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14);

label.append(selectvalue);
//dropdown created


// to search with city name
var input2=document.createElement("input");
input2.setAttribute("type","text");
input2.setAttribute("id","mealId");
input2.style.width="275px";
input2.style.margin="10px";
input2.setAttribute("placeholder","Search By id (optional) eg.52772");

var input3=document.createElement("input");
input3.setAttribute("type","text");
input3.setAttribute("id","namelist");
input3.style.width="275px";
input3.style.margin="10px";
input3.setAttribute("placeholder","first letter in mealsname");

// Another button creation for mealsname list
var button1=document.createElement("button");
button1.setAttribute("type","button1");
button1.classList.add("btn","btn-secondary");
button1.style.textAlign="center";
button1.style.margin="10px";
button1.style.marginBottom="10px";
button1.style.width="10%";
button1.innerHTML="GetList";
button1.addEventListener("click",nameli);

var span2=document.createElement("span");
span2.innerHTML="List all meals by first letter-->";
span2.style.color="yellow";
span2.style.margin="20px";

var lb1=document.createElement("br");
divc.append(input,span,input2, span1,label,button,lb,span2,input3, button1);

divc.append(divnamelist,divrow);
document.body.append(h1,divc);



//function to fetch detail of meals and show in card view
async function foo(){
    try{
        var name  =document.getElementById("mealsname").value;
    var mealId  =document.getElementById("mealId").value;
    var typevalue =document.getElementById("btype").value;
 console.log(name);
    var val =null;
    divrow.innerHTML ="";
    divnamelist.innerHTML="";
    if(name!=null& name !=""){
        val =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        let res1 = await val.json();
        mealrecep(res1);
       }else if(mealId!=null& mealId !=""){
     val =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
     let res1 = await val.json();
     mealrecep(res1);
    }else if(typevalue!="NA"){
       
        getList(typevalue);
    }else{
        divrow.innerHTML=`<span style="color:white; text-align:center">Please Enter Valid Meal Name</span><br><br>`;
    }
    }catch{
        divrow.innerHTML=`<span style="color:white; text-align:center">Please Enter Valid Meal Name</span><br><br>`;
        divrow.innerHTML+=`<span style="color:white; text-align:center">404 Page Not found try again</span><br><br>`;
      
    }
}

//function to get mealsname list
async function nameli(){
    try{
         var keyword  =document.getElementById("namelist").value;
        divrow.innerHTML ="";
        divnamelist.innerHTML="";
        console.log(keyword);
    var val =null;
    if(keyword!=null& keyword !=""){
        val =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${keyword}`);
        let res1 = await val.json();
        mealrecep(res1);
        
       }else {
        divnamelist.innerHTML=`<span style="color:white;">Please Enter valid key word eg:"pizza","burger",etc...</span><br><br>`;
       }

    }catch{
        divrow.innerHTML=`<span style="color:white;">404 Page Not found try again</span><br><br>`;
      
    }
}
//By-Default Showing some list 
Stratinglist();
async function Stratinglist(){
    try{
        
       var val =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let res1 = await val.json();
        console.log(res1);
        createLabel(res1);
    }catch{
        divrow.innerHTML=`<span>404 Page Not found try again</span><br><br>`;
      
    }
}

//
function createLabel(data) {
    divrow.innerHTML +=`<h1 style="text-align:center;margin:10px;color:white">List all Meal categories </h1>`;
       const categories = data.categories;
        for (let i = 0; i < categories.length; i++) {
        console.log(categories[i]);
       divrow.innerHTML +=`
       <div class="card" style="width: 25rem; padding:auto; margin:4px;">
  <img src="${categories[i].strCategoryThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${categories[i].strCategory}</h3>
    <p class="card-text">${categories[i].strCategoryDescription}</p>
     <button class="btn btn-primary" onclick="getList('${categories[i].strCategory}')">Get List of Meals</button>
  </div>
</div>`;
        document.body.append(divc);
    }
}

async function getList(data) {
    val =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`);
    let res1 = await val.json();
    console.log(res1);
    divrow.innerHTML = '';
    const categories = res1.meals;

    for (let i = 0; i < categories.length; i++) {
        console.log(categories[i]);
       divrow.innerHTML +=`
       <div class="card" style="width: 25rem; padding:auto; margin:4px;">
  <img src="${categories[i].strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${categories[i].strMeal}</h3>
    <p class="card-text">${categories[i].idMeal}</p>
    <button class="btn btn-primary" onclick="getMealByid('${categories[i].idMeal}')">Get Recepies</button>
  </div>
</div>`;
        document.body.append(divc);
    }
}

async function getMealByid(data) {
    val =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`);
    let res1 = await val.json();
    console.log(res1);
    divrow.innerHTML = '';
    const ingredients = [];
    const categories = res1.meals[0];
    console.log(categories);
        
        // Loop through strIngredient properties and add non-empty values to the ingredients array
        for (let j = 1; j <= 20; j++) {
            const ingredient = categories[`strIngredient${j}`];
            const measure = categories[`strMeasure${j}`];
            
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
    divrow.innerHTML += `
           <div class="card" style="width: 25rem; padding:auto; margin:4px;">
               <img src="${categories.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h2 class="card-title">${categories.strMeal}</h2>
                   <h5 class="card-title">Category : ${categories.strCategory}</h5>
                   <p class="card-text">Origin: ${categories.strArea}</p>
                   <p class="card-text">Source :${categories.strSource}</p>
                     <div>
                       <h5>Ingredients:</h5>
                       <ul>
                           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                       </ul>
                   </div>
                   <a href="${categories.strYoutube}" target="_blank" style="color:black"><b>Watch Video</b></a>
                 
               </div>
           </div>`;;
        document.body.append(divc);
    
}


function mealrecep(data) {
    divrow.innerHTML +=`<h1 style="text-align:center;margin:10px;color:white">List all Meal categories </h1>`;
    console.log(data);
    const categories = data.meals;
    for (let i = 0; i < categories.length; i++) {
        console.log(categories[i]);
        const ingredients = [];
        
        // Loop through strIngredient properties and add non-empty values to the ingredients array
        for (let j = 1; j <= 20; j++) {
            const ingredient = categories[i][`strIngredient${j}`];
            const measure = categories[i][`strMeasure${j}`];
            
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
    
        divrow.innerHTML += `
           <div class="card" style="width: 25rem; padding:auto; margin:4px;">
               <img src="${categories[i].strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                   <h2 class="card-title">${categories[i].strMeal}</h2>
                   <h5 class="card-title">Category : ${categories[i].strCategory}</h5>
                   <p class="card-text">Origin: ${categories[i].strArea}</p>
                   <p class="card-text">Source :${categories[i].strSource}</p>
                     <div>
                       <h5>Ingredients:</h5>
                       <ul>
                           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                       </ul>
                   </div>
                   <a href="${categories[i].strYoutube}" target="_blank" style="color:black"><b>Watch Video</b></a>
                 
               </div>
           </div>`;
    
        document.body.append(divc);
    }
}