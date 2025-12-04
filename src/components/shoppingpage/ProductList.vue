<template>
    <section>
            <div class="list">
                <img :src="itimage" :alt="itname" />
                <div class="product-info">
                    <h3>{{ itname }}</h3>
                    <p>價格：{{ itprice }} 元</p>
                    <div class="product-actions">
                        <input type="number" min="1" v-model="itqty"/>
                        <button @click="addtocart">加入購物車</button>
                    </div>
                </div>
            </div>
    </section>
    
  </template>

<script>

export default{
    data(){
        return{
            itqty:1
        };
    },
    props:{
        itid:{
            type:Number,
            required:true,
        },
        itname:{
            type:String,
            required: true,
        },
        itprice:{
            type:Number,
            required:true
        },
        itimage:{
            type:String,
            required:false,
            default:''
        },
    },
    watch:{
        itqty(newvalue){
            if (newvalue<1){
                alert("商品數量不能小於1!");
                this.itqty=1;
            }
        }
    },
    methods:{
        addtocart(){
            const temp={id:this.itid ,name:this.itname ,price:this.itprice ,qty: this.itqty};
            this.$store.commit('productlist/addtocart', temp);
            this.itqty=1;
        }
    }

}
</script>

<style scoped>

/* section{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    padding: 0;
    margin: 10px;
    margin-top: 0;
    list-style-type: none;
} */

.list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
}
.list:hover{
    transform: translateY(-10px);
}
  
img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
  }

.product-info {
    padding: 15px;
}
h3{
    font-size: 1.5em;
    font-weight: bold;
    margin: 10px 0;
}
p{
    font-size: 1em;
    color: #777;
    margin-bottom: 15px;
}
.product-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
input {
    width: 60px;
    padding: 5px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    background-color: rgb(245, 217, 180);
    color: #6f6f6f;
    border: none;
    padding: 8px 16px;
    font-size: 1em;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    transform: scale(0.95);
}
button:hover{
    background-color: rgb(181, 170, 155);
}
</style>