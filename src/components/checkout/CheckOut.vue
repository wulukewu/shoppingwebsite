<template>
    <div class="cart-container">
        <h2>🛒 購物車</h2>

        <div v-if="!cartlistlength" class="empty-cart">
            <p>購物車是空的</p>
            <strong>e04</strong> 快去購物吧！
        </div>

        <div v-else class="cart-items">
            <div class="cart-item" v-for="item in cartlist" :key="item.id">
                <img :src="item.img || defaultImg" alt="商品圖片" class="product-img" />
                <div class="cart-details">
                    <h3>{{ item.name }}</h3>
                    <p>價格: ${{ item.price }}</p>
                    <p>數量: {{ item.qty }}</p>
                    <button class="remove-btn" @click="removeFromCart(item)">❌ 移除</button>
                    <button @click="qtyplus(item)">+</button>
                    <button @click="qtyminus(item)">-</button>
                </div>
            </div>

            <div class="cart-summary">
                <p>🧾 總價: <strong>${{ carttotal }}</strong></p>
                <button class="checkout-btn" @click="showDialog">💳 結帳</button>
            </div>
        </div>

        <dialog ref="checkoutDialog" class="dialog-box">
            <h3>確認結帳</h3>
            <p>您確定要進行結帳嗎？</p>
            <div class="dialog-actions">
                <button @click="confirmCheckout"> 確定</button>
                <button @click="closeDialog"> 取消</button>
            </div>
        </dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultImg: "/images/default2.jpg" 
        };
    },
    computed: {
        cartlist() {
            return this.$store.getters['productlist/cartlist'];
        },
        carttotal() {
            return this.$store.getters['productlist/carttotal'];
        },
        cartlistlength() {
            return this.$store.getters['productlist/cartlistlength'];
        }
    },
    methods: {
        removeFromCart(item) {
            if (confirm(`確定要移除 ${item.name} 嗎？`)) {
                this.$store.dispatch('productlist/removeFromCart', item);
            }
        },
        qtyplus(item){
            this.$store.commit('productlist/qtyplus',item);
        },
        qtyminus(item){
            this.$store.commit('productlist/qtyminus',item);
        },
        showDialog() {
            this.$refs.checkoutDialog.showModal(); 
        },
        closeDialog() {
            this.$refs.checkoutDialog.close(); 
        },
        confirmCheckout() {
            this.$store.dispatch('productlist/checkout'); 
            this.closeDialog(); 
        },
    }
};
</script>

<style scoped>
.cart-container {
    max-width: 600px;
    margin: 50px auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 80vh;
}

h2 {
    color: #333;
    margin-bottom: 15px;
}


.empty-cart {
    font-size: 18px;
    color: #888;
    background: antiquewhite;
    height:60vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

}


.cart-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y:auto;
    max-height: 70vh;
}

.cart-item {
    display: flex;
    align-items: center;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* overflow-y: auto; */

}

.product-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
}

.cart-details {
    flex: 1;
    text-align: left;
}

.cart-details h3 {
    font-size: 18px;
    margin-bottom: 5px;
}

.cart-details p {
    font-size: 14px;
    color: #555;
}


button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.remove-btn {
    background: #e74c3c;
    color: white;
}

.remove-btn:hover {
    background: #c0392b;
}

.checkout-btn {
    background: #27ae60;
    color: white;
    margin-top: 20px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
}

.checkout-btn:hover {
    background: #219150;
}

.cart-summary {
    position: sticky;
    bottom: 0; 
    background: #fff; 
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); 
    z-index: 10;
}

.cart-summary strong {
    color: #27ae60;
}


.dialog-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 90%; 
    max-width: 400px; 
    border: none;
}


::backdrop {
    background: rgba(0, 0, 0, 0.4); 
    backdrop-filter: blur(5px); 
}


.dialog-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
}

.dialog-actions button {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
}

.dialog-actions button:first-child {
    background: #27ae60;
    color: white;
}

.dialog-actions button:last-child {
    background: #e74c3c;
    color: white;
}

.dialog-actions button:hover {
    opacity: 0.8;
}
</style>
