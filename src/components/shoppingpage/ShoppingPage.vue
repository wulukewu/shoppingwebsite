<template>
  <!-- <button @click="temp">send get</button> -->
    <product-search class="plist" @search-product="searchproduct"/>
    <div class="cartli">
      <shopping-cart />
      <section class="body">
        <product-list
          v-for="item in filtereditems"
          :key="item.id"
          :itid="item.id"
          :itname="item.name"
          :itprice="item.price"
          :itimage="item.img ?`/images/${item.img}`:`/images/default.jpg`"
        ></product-list>
      </section>
      
    </div>
  </template>
  
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ShoppingCart from'./ShoppingCart.vue';
import ProductSearch from './ProductSearch.vue';
import ProductList from './ProductList.vue';
 

export default {
  setup() {
    const store = useStore();
    const searchQuery = ref("");
    const items = computed(() => store.state.productlist.items);

    const filtereditems = computed(() => {
      if (!searchQuery.value){
        return items.value;
      } else {
        return items.value.filter(item => item.name.includes(searchQuery.value));
      }
    });

    const searchproduct = (findgood) => {
      searchQuery.value = findgood;
    };

    return {
      items,
      searchQuery,
      filtereditems,
      searchproduct
    };
  },

    components: {
    ProductList: ProductList,
    ProductSearch: ProductSearch,
    ShoppingCart: ShoppingCart 
  },


  methods: {

    

    
  }
};


  //   temp(){
  //     fetch('https://web-cli-14b8e-default-rtdb.asia-southeast1.firebasedatabase.app/productlist.json', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify()
  //       .then((res) => {
  //         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  //         return res.json();
  //       })
  //       .then((data) => console.log("Server response:", data))
  //       .catch((error) => console.error("Fetch error:", error));
  //   }
  // },
  // created(){
  //   this.$store.dispatch('productlist/getProducts').then(() => {
      
  //   });
  // }
  // data() {
  //   return {
  //     items: [
  //       {id: 1, name: '高壓蒸氣鍋', price: 100, qty: 1, img: "product1.jpg",display:true},
  //       {id: 2, name: '劉氏染色', price: 10, qty: 1, img: "product2.jpg",display:true},
  //       {id: 3, name: '鴨心', price: 300, qty: 1, img: "product3.jpg",display:true},
  //       {id: 4, name: '軟骨玻片', price: 400, qty: 1, img: "product4.jpg",display:true},
  //       {id: 5, name: '神經玻片', price: 500, qty: 1, img: "product5.jpg",display:true},
  //       {id: 6, name: '豬肺', price: 600, qty: 1, img: "product6.jpg",display:true},
  //       {id: 7, name: '雞腳', price: 700, qty: 1, img: "product7.jpg",display:true},
  //       {id: 8, name: '雞翅', price: 800, qty: 1, img: "product8.jpg",display:true},
  //       {id: 9, name: '雞', price: 800, qty: 1, img: "product9.jpg",display:true},
  //       {id: 10, name: '商品11', price: 800, qty: 1, img: "",display:true},
  //       {id: 11, name: '商品12', price: 800, qty: 1, img: "",display:true},
  //       {id: 12, name: '商品13', price: 800, qty: 1, img: "",display:true},
  //       {id: 13, name: '商品14', price: 800, qty: 1, img: "",display:true},
  //       {id: 14, name: '商品15', price: 800, qty: 1, img: "",display:true},
  //       {id: 15, name: '商品16', price: 800, qty: 1, img: "",display:true},
  //       {id: 16, name: '商品17', price: 800, qty: 1, img: "",display:true},
  //     ]
  //   };
  // }

</script>

  
  
  
  <style>
  *{
    padding: 0;
    margin: 0;
  }
  .plist{
    text-align: center;
    background-color: whitesmoke;
    font-weight: bold;
    font-size:1.2em;
    padding: 10px;
  }
  .body{
    background-color:whitesmoke ;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
    padding: 10px;
    margin: 10px;
  }
  </style>
  