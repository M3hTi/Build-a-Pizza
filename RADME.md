# Pizza Builder JavaScript Documentation

## Table of Contents
1. [HTML References](#html-references)
2. [Object Literal: Cart](#cart-object-literal)
3. [Object Classes](#object-classes)
4. [Event Handlers](#event-handlers)
5. [Helper Functions](#helper-functions)

## HTML References
The JavaScript code connects to these key HTML elements:

```html
<!-- Size dropdown -->
<select id="size">
    <option value="14">14"</option>
    <option value="12">12"</option>
    <option value="16">16"</option>
</select>

<!-- Crust dropdown -->
<select id="crust">
    <option value="pan">pan</option>
    <option value="thin">thin</option>
    <option value="stuffed">stuffed</option>
</select>

<!-- Topping radio buttons structure -->
<div class="topping-row">
    <div class="topping-label">ToppingName</div>
    <input type="radio" class="topping-option" name="ToppingName">
    <!-- ... more radio inputs ... -->
</div>

<!-- Cart and price elements -->
<div class="cart-panel">
    <div class="cart-items"></div>
</div>
<p class="price">0</p>
```

These elements are accessed in JavaScript using:
```javascript
const sizeElement = document.getElementById("size");
const crustElement = document.getElementById("crust");
const addToCart = document.querySelector(".add-to-cart");
const panel = document.querySelector(".cart-panel");
```

## Cart Object Literal
The cart is implemented as an object literal - a single object instance with predefined properties and methods.

```javascript
const cart = {
    price: 0,          // Tracks total price
    items: [],         // Stores Pizza objects
    
    // Adds a new pizza to cart and updates price
    addItem: function(foodItem) {
        this.items.push(foodItem);
        this.calculatePrice();
    },
    
    // Calculates total price of all pizzas
    calculatePrice: function() {
        this.price = 0;
        this.items.forEach(item => {
            // Each topping costs $1.50
            const topping = item.toppings.length > 0 ? item.toppings.length * 1.5 : 0;
            this.price += topping;
        });
        return this.price;
    },
    
    // Returns formatted price string (e.g., "$15.00")
    getPrice: function() {
        return this.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        });
    }
}
```

Why use an object literal here?
- We only need one cart instance
- Groups related data (price, items) with their behaviors (methods)
- Provides a clean interface for cart operations

## Object Classes

### Pizza Class
Creates individual pizza objects with size, crust, and toppings.

```javascript
function Pizza(size, crust) {
    this.size = size;      // Pizza size (12", 14", 16")
    this.crust = crust;    // Crust type (pan, thin, stuffed)
    this.toppings = [];    // Array of Topping objects
}

// Method to add a topping to this pizza
Pizza.prototype.addTopping = function(topping) {
    this.toppings.push(topping);
}
```

### Topping Class
Creates topping objects with name and side placement.

```javascript
function Topping(name, side) {
    this.name = name;  // Topping name (e.g., "Pepperoni")
    this.side = side;  // Side placement (full, right, left, none)
}
```

Why use classes here?
- Multiple instances needed (many pizzas and toppings)
- Consistent structure for each pizza/topping
- Reusable code through prototype methods

## Helper Functions

### getSelectedSide Function
Determines which radio button is selected for a topping.

```javascript
function getSelectedSide(toppingName) {
    // Find all radio buttons for this topping
    const radioInputs = document.querySelectorAll(`input[name="${toppingName}"]`);
    
    // Check which button is selected
    for(let i = 0; i < radioInputs.length; i++) {
        if(radioInputs[i].checked) {
            switch (i) {
                case 0: return "full"
                case 1: return "right"
                case 2: return "left"
                case 3: return "none"
            }
        }
    }
    return "none";  // Default if none selected
}
```

## Event Handlers

### Add to Cart Button
Triggered when user clicks "ADD TO CART":

```javascript
addToCart.addEventListener("click", function() {
    // 1. Create new pizza with selected size/crust
    const pizza = new Pizza(sizeElement.value, crustElement.value);
    
    // 2. Add selected toppings
    const rows = document.querySelectorAll(".topping-row");
    rows.forEach(row => {
        const toppingName = row.querySelector(".topping-label").textContent;
        const toppingSide = getSelectedSide(toppingName);
        
        if(toppingSide !== "none") {
            const topping = new Topping(toppingName, toppingSide);
            pizza.addTopping(topping);
        }
    });
    
    // 3. Add pizza to cart
    cart.addItem(pizza);
    
    // 4. Update display
    panel.innerHTML = "";
    cart.items.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `Pizza : ${item.size}" ${item.crust} ${
            item.toppings.map(topping => 
                topping.name + " " + "(" + topping.side + ")"
            ).join(", ")
        }`;
        panel.appendChild(cartItem);
    });
    
    // 5. Update total price display
    const total = document.querySelector(".price");
    total.textContent = cart.getPrice();
})
```

## Summary
- Cart uses object literal pattern (single instance)
- Pizza and Topping use constructor functions (multiple instances)
- HTML elements are referenced for:
  - User input (size, crust, toppings)
  - Display updates (cart panel, price)
- Event handling ties it all together when "Add to Cart" is clicked