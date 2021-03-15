<template>
  <div>
    <section>
      <nav>
        <Basket v-bind:itemsSelected = "itemsSelected"></Basket>
      </nav>
      <div>
        <ul>
            <li v-for="item in itemsList" v-bind:key="item.name">
                <h2>{{item.name}}</h2>
                <img v-bind:src="item.imageURL" v-show="true">
                <quantityCounter v-bind:item="item" v-on:counter="onCounter"></quantityCounter>            
            </li>
        </ul>
      </div>
    </section> 
   </div> 
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
  components: { QuantityCounter, Basket },
  data(){
    return{
      itemsSelected:[],
      itemsList: [],
    }
  },
  methods : {
    onCounter: function (item, count) {
      var added = false;
      var i = this.itemsSelected.length;
      while(i--) {
        var curr_name = this.itemsSelected[i][0];
        if (curr_name == item.name) {
          added = true;
          break;
        }
      }
      if (!added) {
        if(count != 0) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      } else {
        if (count==0) {
          this.itemsSelected.splice(i,1);
        } else {
          this.itemsSelected[i].splice(1,1,count);
        }
      }
    },
    
    fetchItems:function(){
      console.log("fetching")
      database.collection('menu').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            this.itemsList.push(item)
            })      
          })    
    },
    
  },

  created() {
    this.fetchItems();
    console.log("created hook");
  },
}
</script>

<style scoped>
header{
    background:rgb(122, 63, 100);
    padding:10px;
    border-style: solid;
    border-color:black;
    border-width: 2px;
}
h1{
    color:rgb(19, 170, 216);
    text-align: center;
    font-size: 48px;
    background-color: antiquewhite;
}
h2{
  text-align: center
}

ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    width: calc(100% * (1/1.3));
    align-self: center;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}
img{
  width:150px;
  height: 150px;
}

nav {
  float:right;
  font-size: 20px;
  text-align: left;
  width: 250px;
}
</style>