"use strict";
class Cart {
    items;
    coupon;
    constructor(items = [], coupon = { percent: 0 }) {
        this.items = items;
        this.coupon = coupon;
    }
    addItem(item) {
        const existing = this.items.find((i) => i.id === item.id);
        if (existing) {
            return new Cart(this.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i), this.coupon);
        }
        return new Cart([...this.items, item], this.coupon);
    }
    removeItem(id) {
        return new Cart(this.items
            .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter((item) => item.quantity > 0), this.coupon);
    }
    updateQuantity(id, qty) {
        return new Cart(this.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item), this.coupon);
    }
    applyCoupon(percent) {
        return new Cart(this.items, { percent });
    }
    getTotal() {
        const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total * (1 - this.coupon.percent / 100);
    }
}
let cart = new Cart();
const observers = [];
const cartHistory = [];
function addObserver(fn) {
    observers.push(fn);
}
function notifyObservers() {
    observers.forEach((fn) => fn(cart));
}
function setCart(newCart) {
    cartHistory.push(cart);
    cart = newCart;
    localStorage.setItem("cart", JSON.stringify(cart));
    notifyObservers();
}
function undo() {
    if (cartHistory.length === 0) {
        return;
    }
    cart = cartHistory.pop();
    localStorage.setItem("cart", JSON.stringify(cart));
    notifyObservers();
}
const saved = localStorage.getItem("cart");
if (saved) {
    const data = JSON.parse(saved);
    cart = new Cart(data.items, data.coupon);
}
function render(cart) {
    const cartElement = document.getElementById("cart");
    if (!cartElement) {
        return;
    }
    cartElement.innerHTML = `
    <h3>Cart</h3>
    
    ${cart.items
        .map((item) => `<p>${item.name} x ${item.quantity}</p>`)
        .join("")}

    <strong>Total: $${cart.getTotal().toFixed(2)}</strong>
  `;
}
addObserver(render);
notifyObservers();
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const updateButton = document.getElementById("update");
const applyCouponButton = document.getElementById("applyCoupon");
const undoButton = document.getElementById("undo");
addButton?.addEventListener("click", () => {
    setCart(cart.addItem({
        id: 1,
        name: "Apple",
        price: 10,
        quantity: 1,
    }));
});
removeButton?.addEventListener("click", () => {
    setCart(cart.removeItem(1));
});
updateButton?.addEventListener("click", () => {
    const quantityInput = document.getElementById("qty");
    if (!quantityInput) {
        return;
    }
    const qty = Number(quantityInput.value);
    setCart(cart.updateQuantity(1, qty));
});
applyCouponButton?.addEventListener("click", () => {
    const couponInput = document.getElementById("coupon");
    if (!couponInput) {
        return;
    }
    const percent = Number(couponInput.value);
    setCart(cart.applyCoupon(percent));
});
undoButton?.addEventListener("click", undo);
