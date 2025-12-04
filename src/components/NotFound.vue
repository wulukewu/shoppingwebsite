<template>
    <div class="notfound">
        <h1>404 Not Found!</h1>
        <p>您所訪問的頁面不存在</p>
        <!-- <P>YEAH!就像你對我們一無所知</P> -->
        <router-link to="/">回首頁</router-link>
    </div>
</template>
<style scoped>
    .notfound{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: antiquewhite;
        height: 90vh;
    }
    h1{
        font-size: 3em;
        font-weight: bold;
        color: #f39c12;
        opacity: 0.8;
        margin: 30px;
    }
    p{
        font-size: 1.2em;
        color: #444;
    }
    a{
        text-decoration: none;
        border: 2px solid transparent; 
        padding: 5px 10px; 
        transition: border-color 0.3s ease;
        color:#444;
    }
    a:hover{
        cursor: pointer;
        border-color:#f39c12 ;
    }
</style>