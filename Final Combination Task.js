api = 'https://fakestoreapi.com/products';

let cart = [];
let allProducts = [];
let cartCount =document.querySelector(".cartCount");
const categoryFilter = document.querySelector("#categoryFilter");
const container = document.querySelector('#products-container');


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


        

        // For Checking Duplicate cart 
        btn1.addEventListener('click', () => {

            
            const alreadyInCart = cart.some(item => item.id === product.id);

                if (!alreadyInCart) {
                            cart.push(product);
                            alert("Product added Successfully");
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

    //   button.addEventListener('click', () => {

    //   const existingProduct = cart.find(item => item.id === product.id);

    //   if (existingProduct) {
    //     existingProduct.quantity += 1;   // Increase quantity
    //   } else {
    //     cart.push({ ...product, quantity: 1 });  // Add new product
    //   }

    //   updateCartCount();
    // });



    function handleSearch(event)
    {

        const searchQuery = event.target.value.toLowerCase(); 
        const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery));
  
        displayProducts(filteredProducts); 
    }

    // Add an event listener to the search input
    document.getElementById('search-input').addEventListener('input', handleSearch);



    // Filter products based on selected Category

    categoryFilter.addEventListener('change',function() {
     
    let selectedCategory = this.value;

    if (selectedCategory === 'all') 
        {
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

    
} 

