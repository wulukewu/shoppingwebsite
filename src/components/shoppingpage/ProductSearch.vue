<template>
    <div class="container">
        <transition name="fade">
            <div v-if="changetosearch" key="title" @click="change()" class="title-container">
                <h2 class="title">商品列表🔎</h2>
            </div>

            <div v-else key="input" class="input-container">
                <input type="text" 
                placeholder="搜尋商品..." 
                class="search-input" 
                @keyup.enter="searchproduct"
                v-model="findgood"
                />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    emits: ['search-product'],
    data() {
        return {
            changetosearch: true,
            findgood:null
        };
    },
    methods: {
        change() {
            this.changetosearch = !this.changetosearch;
        },
        searchproduct(){
            console.log(this.findgood);
            this.$emit('search-product',this.findgood);
        }
    }
};
</script>

<style scoped>
/* 過渡動畫 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* 主要容器 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 標題樣式 */
.title-container {
    cursor: pointer;
    padding: 10px 20px;
}

.title-container:hover {
    transform: scale(1.05);
}

.title {
    font-size: 1.5em;
    font-weight: bold;
    color: #6f6f6f;
    margin: 0;
}

/* 輸入框樣式 */
.input-container {
    width: 100%;
    max-width: 300px;
}

.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid rgb(245, 217, 180);
    border-radius: 6px;
    outline: none;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: rgb(219, 182, 129);
}
</style>
