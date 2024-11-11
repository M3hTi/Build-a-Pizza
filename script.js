const sizeElement = document.getElementById("size");
const crustElement = document.getElementById("crust");

const addToCart = document.querySelector(".add-to-cart");


const cart = {
    items: [],
    addItem : function(foodItem){
        this.items.push(foodItem);
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
    cart.items.forEach(item => {
        const panel = document.querySelector(".cart-panel");
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `Pizza : ${item.size}" ${item.crust} ${item.toppings.map(topping => topping.name + " " + "(" + topping.side + ")").join(", ")}`;
        panel.appendChild(cartItem);
    });
})

