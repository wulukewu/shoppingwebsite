<template>
<div class="cart-container">
    <!-- 購物車按鈕 -->
    <div class="cart-button" @click="toggleCart" :class="{ 'cart-open': isvisible }">
      <button>🛒</button>
      <span v-if="cartQtytotal > 0" class="cart-badge">{{ cartQtytotal }}</span>
    </div>
    
    <!-- 購物車側邊欄 -->
    <div class="cart" :class="{ 'cart-open': isvisible }">
      <div class="cart-title">
        <button @click="toggleCart">》</button>
        <p>購物車</p>
      </div>

      <!-- 啊哈 -->
      <div class="cart-empty" v-if="!carthaveproduct">
        <p><strong>空空如也，趕快去購物吧！</strong></p>
        <p class="emptyni">我才能有錢賺...吧?</p>
      </div>

      <!-- 購物車內容 -->
      <div class="cart-content" v-if="carthaveproduct">
        <ul>
          <li v-for="item in cartlist" :key="item.id" class="cart-item">
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-price">價格：{{ item.price }} 元</p>
              <div class="item-qty">
                <button @click="qtyminus(item)">−</button>
                <p>{{ item.qty }}</p>
                <button @click="qtyplus(item)">+</button>
              </div>
            </div>
            <hr />
          </li>
        </ul>
        <div class="cart-summary">
          <p>總價：{{ cartPricetotal }} 元</p>
          <p>總數量：{{ cartQtytotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
    computed:{
        cartQtytotal(){
            return this.$store.getters['productlist/cartqty'] || 0;
        },
        cartPricetotal(){
            return this.$store.getters['productlist/carttotal'] || 0;
        },
        carthaveproduct(){
            return this.$store.getters['productlist/cartlistlength'];
        },
        cartlist(){
            return this.$store.getters['productlist/cartlist'];
        }
    },
    methods:{
        toggleCart(){
            this.isvisible = !this.isvisible;
        },
        qtyminus(item){
            this.$store.commit('productlist/qtyminus', item);
        },
        qtyplus(item){
            this.$store.commit('productlist/qtyplus', item);
        }
    },
    data(){
        return{
            isvisible:false
        };
    }
};
</script>

<style scoped>
.cart-container {
    position: fixed;
    right: 0;
    z-index: 800;
    top: 80px;
    
}

/* 購物車按鈕 */
.cart-button {
    position: fixed;
    top: 100px;
    right: 20px;
    background: #333;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease-in-out;
}
.cart-button button {
    background: none;
    border: none;
    font-size: 20px;
    color: white;
}

.cart-button:hover {
    transform: scale(1.1);
}

.cart-badge {
    position: absolute;
    top: 5px;
    right: 3px;
    background: red;
    color: white;
    font-size: 12px;
    padding: 3px 7px;
    border-radius: 50%;
}

/* 購物車側邊欄 */
.cart {
    position: fixed;
    top: 80px;
    right: -350px;
    width: 320px;
    height: 90vh;
    background: #444;
    color: white;
    transition: right 0.3s ease-in-out;
    box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}

/* 購物車展開 */
.cart-open {
    right: 0;
}

/* 標題 */
.cart-title {
    display: flex;
    align-items: center;
    background: #333;
    padding: 15px;
    font-weight: bold;
    border-bottom: 2px solid #f39c12;
}
.cart-title p {
    font-size: 1.2em;
    margin-left: 10px;
    color: white;
}
.cart-title button {
    color:white;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

/* 空購物車提示 */
.cart-empty {
    text-align: center;
    padding: 20px;
    font-size: 1.4em;
    color: #f39c12;
}
.emptyni {
    font-size: 0.8em;
    color: #636362;
}


/* 購物車內容 */
.cart-content {
    flex: 1;
    overflow-y: auto;
    background: #555;
}

/* 購物車商品 */
.cart-item {
    display: flex;
    flex-direction: column;
    background: #666;
    padding: 10px;
    margin: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-name {
    font-weight: bold;
    font-size: 1.1em;
}

.item-price {
    color: #f1c40f;
    font-size: 0.9em;
}

.item-qty {
    display: flex;
    align-items: center;
}

.item-qty button {
    background: #f39c12;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 5px;
}

.item-qty button:hover {
    background: #e67e22;
}

/* 購物車結算 */
.cart-summary {
    background: #333;
    padding: 15px;
    font-size: 1.1em;
    border-top: 2px solid #f39c12;
    position:sticky;
    bottom: 0;
    width: 100%;
    margin: 0;
}
</style>