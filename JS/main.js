//SELECCIONAR ELEMENTOS
const productElements = document.querySelector(".products");
const cartElements = document.querySelector(".cart-items");
const subTotal = document.querySelector(".cart-total");


//MOSTRAR PRODUCTOS EN HTML
function showProducts(){                            
    products.forEach( (product) =>{
        productElements.innerHTML += `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                        ${product.description}
                        </p>
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/addIcon.png" alt="Agregar al carrito">
                    </div>
                </div>
            </div>`
    })                     
}

showProducts() //LLAMO A LA FUNCIÓN MOSTRAR PRODUCTOS


//CARRITO
let cart = JSON.parse(localStorage.getItem("CART")) || [];
cartUpdate();


//AGREGAR AL CARRITO
function addToCart(id){
    //ver si el item ya existe en el array cart, para evitar que se repita
    if(cart.some((item) => item.id === id)){ 
        modifyUnits('add', id);      //al añadir al carrito un producto ya existente en el cart, se suma
    }else{
        const item = products.find((product) => product.id === id)

        cart.push({
            ...item,                        //guardo las propiedades del producto
            cantUnidades: 1,                //nueva propiedad para añadir o quitar copias del producto en carrito
        });

        console.log(cart)
    }
    
    //ACTUALIZO CARRITO
    cartUpdate();
}

//FUNCION ACTUALIZAR CARRITO
function cartUpdate(){
    showItems(); //muestra los items del carrito
    showTotal(); //calcula y muestra el total del carrito


    //guardar en el localStorage
    localStorage.setItem('CART', JSON.stringify(cart));
}

//FUNCION CALCULAR Y MOSTRAR TOTAL
function showTotal(){
    let total= 0;
    let totalItems = 0;

    cart.forEach((item) =>{
        total += item.price * item.cantUnidades;
        totalItems += item.cantUnidades;
    });
    //total con metodo toFixed para setear la cantidad de numeros a 2 despues de la coma
    subTotal.innerHTML = `
    Total (${totalItems} items): $${total.toFixed(2)}  
    `
   
}


//MOSTRAR ITEMS DEL CARRITO
function showItems(){
    cartElements.innerHTML = ""; //limpiar carrito antes de añadir productos para que no duplique los elementos
    cart.forEach((item) => {
        
        cartElements.innerHTML += `
        <div class="cart-item">
                <div class="item-info" onclick="deleteItem(${item.id})">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${item.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick="modifyUnits('substract', ${item.id})">-</div>
                    <div class="number">${item.cantUnidades}</div>
                    <div class="btn plus" onclick="modifyUnits('add', ${item.id})">+</div>           
                </div>
               
        </div>`
    })
}

//ELIMINAR PRODUCTO
function deleteItem(id){
    cart = cart.filter((item) => item.id !== id)
    cartUpdate();
}


//MODIFICAR CANTIDAD DE UNIDADES
function modifyUnits(operator, id){
    cart = cart.map((item) =>{
        let cantUnidades = item.cantUnidades;

            
        if(item.id === id){
            if(operator === 'substract' && cantUnidades > 1){  //se pueden quietar items únicamente hasta que quede 1
                cantUnidades--;
            }else if(operator === 'add'){
                cantUnidades++;
            }
        }
        return{
            ...item,
            cantUnidades,
        }
    })

    cartUpdate();

}

//COMPRAR PRODUCTOS 
function buyProducts(){
    localStorage.clear();
    subTotal.innerHTML = 
    cartElements.innerHTML = ' '

    
}