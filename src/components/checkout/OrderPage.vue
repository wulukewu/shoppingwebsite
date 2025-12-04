<template>
    <div class="orders-container">
        <h2>📦 我的訂單</h2>
        <button class="refresh-btn" @click="loadOrders">🔄 重新整理</button>

        <div v-if="isLoading">⌛ 訂單載入中...</div>
        
        <ul v-else-if="orders && orders.length > 0" class="order-list">
            <li v-for="order in orders" :key="order.id" class="order-item">
                <p>📅 訂單時間：{{ formatDate(order.timestamp) }}</p>
                <ul class="order-details">
                    <li v-for="item in order.items" :key="item.id" class="order-product">
                        <strong>{{ item.name }}</strong> - ${{ item.price }} x {{ item.qty }} <!-- 確保使用 qty -->
                    </li>
                </ul>
            </li>
        </ul>

        <p v-else>⚠️ 目前沒有訂單記錄</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        orders() {
            return this.$store.getters['productlist/orders']; // 確保 getter 名稱正確
        }
    },
    methods: {
        async loadOrders() {
            this.isLoading = true;
            await this.$store.dispatch('productlist/fetchOrders');
            this.isLoading = false;
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString(); // 格式化日期
        }
    },
    created() {
        this.loadOrders(); // 頁面創建時自動加載訂單
    }
};
</script>

<style scoped>
.orders-container {
    max-width: 600px;
    margin: 30px auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 80vh;
}

h2 {
    color: #333;
}

.refresh-btn {
    background: #3498db;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    font-size: 14px;
}

.refresh-btn:hover {
    background: #2980b9;
}

.order-list {
    list-style: none;
    padding: 0;
}

.order-item {
    background: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.order-product {
    font-size: 14px;
    color: #555;
}

.order-details {
    list-style: none;
    padding: 0;
}
</style>
