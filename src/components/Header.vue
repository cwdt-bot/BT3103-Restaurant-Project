<template>
   <div>
    <header>
        <h1>{{ msg }}</h1>
        <router-link to="/" exact>Home </router-link>
        <router-link to="/orders" exact>Orders</router-link>
        <router-link to="/dashboard" exact> Dashboard </router-link>
    </header>
    </div>
  
</template>

<script>
export default {
  
  data(){
    return{
        msg: 'Lion Express'
    }
  }
}
</script>

<style scoped>
header{
    background:rgb(122, 63, 100);
    border-style: solid;
    border-color:black;
    border-width: 2px;
    height: 95px;
    text-align: top;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
}
h1{
    color:ivory
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
</style>