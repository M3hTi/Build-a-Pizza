const sizeElement = document.getElementById("size");
const crustElement = document.getElementById("crust");

const addToCart = document.querySelector(".add-to-cart");



const panel = document.querySelector(".cart-panel");


const cart = {
    price: 0,
    items: [],
    addItem : function(foodItem){
        this.items.push(foodItem);
        //NOTE: Calculate price immediately when item is added
        this.calculatePrice();
    },
    calculatePrice: function(){
        this.price = 0;
        this.items.forEach(item => {
            const topping = item.toppings.length > 0 ? item.toppings.length * 1.5 : 0;
            this.price += topping;
        });
        return this.price;
    },
    getPrice: function(){
        return this.price.toLocaleString("en-US", {style: "currency", currency: "USD"});
    }
}

function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.toppings = [];
}
Pizza.prototype.addTopping = function(topping){
    this.toppings.push(topping);
}       

function Topping(name, side) {
    this.name = name;
    this.side = side;
}


function getSelectedSide (toppingName){
    const radioInputs = document.querySelectorAll(`input[name="${toppingName}"]`);

    for(let i = 0; i < radioInputs.length; i++){
        if(radioInputs[i].checked){
            switch (i) {
                case 0:
                    return "full"
                case 1:
                    return "right"
                case 2:
                    return "left"
                case 3:
                    return "none"
            }
        }
    }
    return "none";
}





addToCart.addEventListener("click", function(){
    const pizza = new Pizza(sizeElement.value, crustElement.value);
    console.log(pizza);

    const rows = document.querySelectorAll(".topping-row");
    rows.forEach(row => {
        const toppingName = row.querySelector(".topping-label").textContent;
        const toppingSide = getSelectedSide(toppingName);

        if(toppingSide !== "none"){
            const topping = new Topping(toppingName, toppingSide);
            pizza.addTopping(topping);
        }
    });
    console.log(pizza);
    cart.addItem(pizza);
    console.log(cart);
    panel.innerHTML = "";
    cart.items.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `Pizza : ${item.size}" ${item.crust} ${item.toppings.map(topping => topping.name + " " + "(" + topping.side + ")").join(", ")}`;
        panel.appendChild(cartItem);
    });
    const total = document.querySelector(".price");
    total.textContent = cart.getPrice();
})

