
import { database } from '../firebase';
import { ref, push, get, child } from 'firebase/database';

export default {
    namespaced: true,
    state: {
        cartlist: [],
        orders: [],
        items: [
            { id: 1, name: '高壓蒸氣鍋', price: 100, qty: 1, img: 'product1.jpg' },
            { id: 2, name: '染色玻片', price: 10, qty: 1, img: 'product2.jpg' },
            { id: 3, name: '鴨心', price: 300, qty: 1, img: 'product3.jpg' },
            { id: 4, name: '軟骨玻片', price: 400, qty: 1, img: 'product4.jpg' },
            { id: 5, name: '神經玻片', price: 500, qty: 1, img: 'product5.jpg' },
            { id: 6, name: '豬肺', price: 600, qty: 1, img: 'product6.jpg' },
            { id: 7, name: '雞腳', price: 700, qty: 1, img: 'product7.jpg' },
            { id: 8, name: '雞翅', price: 800, qty: 1, img: 'product8.jpg' },
            { id: 9, name: '雞', price: 800, qty: 1, img: 'product9.jpg' },
            { id: 10, name: '張開翅膀的雞', price: 800, qty: 1, img: '29161_0.jpg' },
            { id: 11, name: '商品12', price: 800, qty: 1, img: '' },
            { id: 12, name: '商品13', price: 800, qty: 1, img: '' },
            { id: 13, name: '商品14', price: 800, qty: 1, img: '' },
            { id: 14, name: '商品15', price: 800, qty: 1, img: '' },
            { id: 15, name: '商品16', price: 800, qty: 1, img: '' },
            { id: 16, name: '商品17', price: 800, qty: 1, img: '' },
            { id: 17, name: '商品18', price: 800, qty: 1, img: '' },
            { id: 18, name: '商品19', price: 800, qty: 1, img: '' },
            { id: 19, name: '商品20', price: 800, qty: 1, img: '' },
            { id: 20, name: '商品21', price: 800, qty: 1, img: '' }
        ]
    },

    mutations: {
        addtocart(state, product) {
            const cartitem = state.cartlist.find(item => item.id === product.id);
            if (!cartitem) {
                state.cartlist.push({
                    ...product
                });
            } else {
                cartitem.qty += product.qty;
            }
        },

        qtyplus(state, product) {
            const cartitem = state.cartlist.find(item => item.id === product.id);
            if (cartitem) {
                cartitem.qty++; // 增加數量
            }
        },
        qtyminus(state, product) {
            const cartitem = state.cartlist.find(item => item.id === product.id);
            if (cartitem) {
                if (cartitem.qty > 1) {
                    cartitem.qty--;
                } else {
                    state.cartlist = state.cartlist.filter(
                        item => item.id !== product.id
                    );
                }
            }
        },
        removeitem(state, product) {
            state.cartlist = state.cartlist.filter(item => item.id !== product.id);
        },
        clearCart(state) {
            state.cartlist = [];
        },
        setOrders(state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        removeFromCart(context, product) {
            context.commit('removeitem', product);
        },
        async checkout(context) {
            try {
                const userId = context.rootState.auth.userId;
                if (!userId) {
                    throw new Error('使用者未登入');
                }

                const dbRef = ref(database);
                const orderListRef = child(dbRef, `orderlist/${userId}`);
                const newOrderRef = push(orderListRef);
                await push(newOrderRef, {
                    items: context.state.cartlist,
                    timestamp: new Date().toISOString()
                });

                context.commit('clearCart');
            } catch (error) {
                console.error('結帳失敗:', error);
            }
        },

        async fetchOrders({ commit, rootState }) {
            try {
                const userId = rootState.auth.userId;
                if (!userId) throw new Error('使用者未登入');

                const dbRef = ref(database);
                const orderListRef = child(dbRef, `orderlist/${userId}`);
                const snapshot = await get(orderListRef);

                if (!snapshot.exists()) {
                    throw new Error('無法取得訂單資料');
                }

                const responseData = snapshot.val();

                const orders = [];

                if (responseData) {
                    for (const orderId in responseData) {
                        const order = responseData[orderId];

                        // 檢查是否存在 items 且 items 陣列中有內容
                        if (order.items && order.items.length > 0) {
                            const firstItem = order.items[0]; // 獲取第一個商品物件

                            // 提取第一個商品的 name 和 id
                            const firstItemName = firstItem.name;
                            const firstItemId = firstItem.id;

                            console.log('First item name:', firstItemName);
                            console.log('First item id:', firstItemId);

                            orders.push({
                                id: orderId,
                                items: order.items,
                                timestamp: order.timestamp,
                                firstItemName: firstItemName, // 保存第一項商品的 name
                                firstItemId: firstItemId // 保存第一項商品的 id
                            });
                        }
                    }
                }

                commit('setOrders', orders); // 更新到 Vuex store
            } catch (error) {
                console.error('載入訂單失敗:', error.message);
                commit('setOrders', []); // 若發生錯誤，清空訂單
            }
        }
    },
    getters: {
        cartlist(state) {
            return state.cartlist;
        },
        carttotal(state) {
            return state.cartlist.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            );
        },
        cartqty(state) {
            return state.cartlist.reduce((acc, item) => acc + item.qty, 0);
        },
        cartlistlength(state) {
            if (state.cartlist.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
};