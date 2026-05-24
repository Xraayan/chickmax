// Shared JavaScript for Chickmax website

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
            header.classList.remove('shadow-sm');
        } else {
            header.classList.add('shadow-sm');
            header.classList.remove('shadow-md');
        }
    });
}

// Add to cart interaction
function initAddToCartButtons() {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.querySelector('[data-icon="add_shopping_cart"]')) {
                const originalIcon = this.innerHTML;
                this.innerHTML = '<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1;">check_circle</span>';
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 2000);
            }
        });
    });
}

// Initialize all common functionality
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScrollEffect();
    initAddToCartButtons();
});

// Cart management (basic implementation)
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('chickmax_cart')) || [];
    }

    addItem(item) {
        const existing = this.items.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += item.quantity || 1;
        } else {
            this.items.push({ ...item, quantity: item.quantity || 1 });
        }
        this.save();
    }

    removeItem(itemId) {
        this.items = this.items.filter(i => i.id !== itemId);
        this.save();
    }

    save() {
        localStorage.setItem('chickmax_cart', JSON.stringify(this.items));
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Initialize cart
const cart = new Cart();
