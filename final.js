// Task 1 API Integration & Data Handling.


// API Calling using fetch()

api = 'https://fakestoreapi.com/products';

fetch(api)
.then((rawData)=>{

    //console.log(rawData);           //  Print Response in Console Side.
    return rawData.json(); 
})

// Data Conversion - Convert the API response to JSON using .json()

.then((jsdata)=>{

    console.log(jsdata);               // Printing the json() data.



    // Data Preparation : Iterate through the products using .map()


    jsdata.map((c,i,t)=>{
        
        // For Printing Products Id's
        console.log("Product ID:", c.id);
        
        // For Printing Products Title's
        console.log("Product Title :", c.title);

        // For Printing Products Price's
        console.log("Product Price : $", c.price);

        // For Printing Products Description's
        console.log("Product Description : ", c.description);

        // For Printing Products Rating's
        console.log("Product Rating : ", c.rating);

        // For Printing Products Category's
        console.log("Product Category : ", c.category);

        // For Printing Products Image's
        console.log("Product Image : ", c.image);

    })    
});


// Task -2

// Product Card Generation

// 1. Element Creation: Dynamically create HTML elements for each product card using "document.createElement()."


api = 'https://fakestoreapi.com/products';

fetch(api)
.then((rawData)=>{
    console.log(rawData);
    
    return rawData.json();

})

.then((jsData)=>{

    console.log(jsData);
    
    // Creating HTML element dynamically.

    let api = document.querySelector(".api");
    
    jsData.map((c,i,t)=>{

        // Here we are creating dynamically one static div tag "card" tag
        let card = document.createElement("card");


// Task-3

// Basic Product Display- Ensure each displayed card shows the essential product information: title,price,description and image.
        //  Displaying the product card in the web page using .innerHTML method and .appendchild "card" tag.
        card.innerHTML = ` <u><b> Product Title  </b></u> ${c.title}
         <img src = "${c.image}"/>
         <u><b> Description</b></u> <i>${c.description}</i>
         
         <button> <b>Price</b> <b>$</b>${c.price}</button>`;

        api.append(card);
    })


    
})



// Task 4

// Enchance the Visual appeal and information richness of each product card by including:
// Product Image
// Full Title
// Price
// Category
// Rating(display using stars or numerical value)

api = 'https://fakestoreapi.com/products';

fetch(api)
.then((rawData)=>{
    console.log(rawData);
    
    return rawData.json();

})



.then((jsData)=>{

    console.log(jsData);
    
    // Creating HTML element dynamically.

    let api = document.querySelector(".api");
    
    jsData.map((c,i,t)=>{

        // Here we are creating dynamically one static div tag "card" tag
        let card = document.createElement("card");
        
        card.innerHTML = ` <u><b> Product Title  </b></u> ${c.title}
         <img src = "${c.image}"/>        
         <button> <b>Price</b> <b>$</b>${c.price}</button>
         <b> Category </b> ${c.category}
         <b>Rating </b> ${c.rating.rate}`;
         
         
         // Creating new button dynamically.

         const btn1 = document.createElement("button");
         btn1.innerText = "Add to Cart";
         //  btn1.style.border = "none";
         btn1.style.outline = "0px";
         btn1.style.padding = "10px";
         btn1.style.backgroundColor = "#000";
         btn1.style.textAlign = "center";
         btn1.style.width = "80%";
         btn1.style.cursor = "pointer";
        //  btn1.style.height = "20px";
        btn1.style.fontSize = "20px";
        btn1.style.color = "white";
        btn1.style.borderRadius = "30px";
         

        btn1.addEventListener('click',function(){

                alert('Product Added Successfully');
        })


        api.append(card);
        card.append(btn1);
        
    })    
})



// Task 5

//  shopping cart system
//Implementing a persisitent card system.

api = 'https://fakestoreapi.com/products';

let cart = [];
let cartCount =document.querySelector(".cartCount");
const categoryFilter = document.querySelector("#categoryFilter");

fetch(api)
    .then((rawData) => {
        console.log(rawData);

        return rawData.json();

    })

    .then((jsData) => {

        console.log('Fetched Data :', jsData);
        allProducts = jsData;
        displayProducts(jsData);
    })

    .catch(error => {

        console.error('Error fetching Data:', error);

    });

function displayProducts(products) {
    const container = document.querySelector('#products-container');
    container.innerHTML = '';

    if (products.length === 0) {

        container.innerHTML = '<div class="no-products">Product not found</div>';
        return;
    }

    
    
    products.forEach(product =>{

        // Here we are creating dynamically one static div tag "card" tag
        let card = document.createElement("card");
        card.className ='product-card';

        card.innerHTML = ` <u><b> Product Title  </b></u> ${product.title}
         <img src="${product.image}" alt="${product.title}" class="product-image" />       
         <button class = "button-price"> <b>Price</b> <b>$</b> ${product.price} </button>
         <b> Category </b> ${product.category}
         <b>Rating </b> ${product.rating.rate}`;

         const btn1 = document.createElement("button");
         btn1.innerText = "Add to Cart";        
         //  btn1.style.border = "none";
         btn1.style.outline = "0px";
         btn1.style.padding = "10px";
         btn1.style.backgroundColor = "#000";
         btn1.style.textAlign = "center";
         btn1.style.width = "80%";
         btn1.style.cursor = "pointer";
        //  btn1.style.height = "20px";
        btn1.style.fontSize = "20px";
        btn1.style.color = "white";
        btn1.style.borderRadius = "30px";
    
        container.appendChild(card);
        card.append(btn1);

        btn1.addEventListener('click', () => {

            const alreadyInCart = cart.some(item => item.id === product.id);

                if (!alreadyInCart) {
                            cart.push(product);
                            updateCartCount();
                        } 
                        else 
                        {
                            alert("Product already in cart!");
                        }

        });

    });  
    
    // Update Cart Count in Nav bar using ".textContent".
        
    function updateCartCount(){

         cartCount.textContent = `Cart (${cart.length})`;
    }

    // For storing Product we use push() method.

    function storeProduct(jsData){

       cart.push(jsData);
        updateCartCount();
    } 


}



// button.addEventListener('click', () => {

//   const existingProduct = cart.find(item => item.id === product.id);

//   if (existingProduct) {
//     existingProduct.quantity += 1;   // Increase quantity
//   } else {
//     cart.push({ ...product, quantity: 1 });  // Add new product
//   }

//   updateCartCount();
// });



// Task -6

// Search Functionality.

// Implement a real-time search feature:
// • Input Field: Add a text input field: <input type="text" placeholder="Search
// product..." />
//  Behavior (When typing):
// o Filter the displayed products in real time.
// о Show only results that match the search query.
// O The search must be case insensitive.


api = 'https://fakestoreapi.com/products';

let allProducts = [];

fetch(api)
    .then((rawData) => {
        console.log(rawData);

        return rawData.json();

    })

    .then((jsData) => {

        console.log('Fetched Data :', jsData);
        allProducts = jsData;
        displayProducts(jsData);
    })

    .catch(error => {

        console.error('Error fetching Data:', error);

    });

function displayProducts(products) {
    const container = document.querySelector('#products-container');
    container.innerHTML = '';

    if (products.length === 0) {

        container.innerHTML = '<div class="no-products">Product not found</div>';
        return;
    }

    // let api = document.querySelector(".api");
    
    products.forEach(product =>{

        // Here we are creating dynamically one static div tag "card" tag
        let card = document.createElement("card");
        card.className ='product-card';

        card.innerHTML = ` <u><b> Product Title  </b></u> ${product.title}
         <img src="${product.image}" alt="${product.title}" class="product-image" />       
         <button class = "button-price"> <b>Price</b> <b>$</b> ${product.price} </button>
         <b> Category </b> ${product.category}
         <b>Rating </b> ${product.rating.rate}`;

         const btn1 = document.createElement("button");
         btn1.innerText = "Add to Cart";        
         //  btn1.style.border = "none";
         btn1.style.outline = "0px";
         btn1.style.padding = "10px";
         btn1.style.backgroundColor = "#000";
         btn1.style.textAlign = "center";
         btn1.style.width = "80%";
         btn1.style.cursor = "pointer";
        //  btn1.style.height = "20px";
        btn1.style.fontSize = "20px";
        btn1.style.color = "white";
        btn1.style.borderRadius = "30px";
    
        container.appendChild(card);
        card.append(btn1);

    });      
}

function handleSearch(event){

    const searchQuery = event.target.value.toLowerCase(); 
    const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery));
  
    displayProducts(filteredProducts); 
}

// Add an event listener to the search input
document.getElementById('search-input').addEventListener('input', handleSearch);




// Task  7

// Category Filter
// Implementing a filtering mechanism using a dropdown menu:

api = 'https://fakestoreapi.com/products';

let allProducts = [];
const categoryFilter = document.querySelector("#categoryFilter");

fetch(api)
    .then((rawData) => {
        console.log(rawData);

        return rawData.json();

    })

    .then((jsData) => {

        console.log('Fetched Data :', jsData);
        allProducts = jsData;
        displayProducts(jsData);
    })

    .catch(error => {

        console.error('Error fetching Data:', error);

    });

function displayProducts(products) {
    const container = document.querySelector('#products-container');
    container.innerHTML = '';

    if (products.length === 0) {

        container.innerHTML = '<div class="no-products">Product not found</div>';
        return;
    }

    
    
    products.forEach(product =>{

        // Here we are creating dynamically one static div tag "card" tag
        let card = document.createElement("card");
        card.className ='product-card';

        card.innerHTML = ` <u><b> Product Title  </b></u> ${product.title}
         <img src="${product.image}" alt="${product.title}" class="product-image" />       
         <button class = "button-price"> <b>Price</b> <b>$</b> ${product.price} </button>
         <b> Category </b> ${product.category}
         <b>Rating </b> ${product.rating.rate}`;

         const btn1 = document.createElement("button");
         btn1.innerText = "Add to Cart";        
         //  btn1.style.border = "none";
         btn1.style.outline = "0px";
         btn1.style.padding = "10px";
         btn1.style.backgroundColor = "#000";
         btn1.style.textAlign = "center";
         btn1.style.width = "80%";
         btn1.style.cursor = "pointer";
        //  btn1.style.height = "20px";
        btn1.style.fontSize = "20px";
        btn1.style.color = "white";
        btn1.style.borderRadius = "30px";
    
        container.appendChild(card);
        card.append(btn1);

    });      
}

// Filter products based on selected Category

categoryFilter.addEventListener('change',function() {
     
    let selectedCategory = this.value;

    if (selectedCategory === 'all') {
        displayProducts(allProducts);
    } 
    else 
        {
            const filteredProducts = allProducts.filter(product =>
            product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
});

fetchProducts();





