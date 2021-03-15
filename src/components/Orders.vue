<template>
    <div>
    <section>
      <div>
          <ul>
            <li v-for="order in orders" v-bind:key="order.name">
                <h4 v-for="item in order[1]" v-bind:key="item.name">{{item[0]}}: {{item[1]}} </h4> 
                <!--{{order}}-->
                <button type = "button" v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
                <button type = "button" v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
            </li>
        </ul>
      </div>
     
    </section> 
   </div>
</template>

<script>
import database from '../firebase.js'
export default {
    data(){
        return {
            orders: [],
        }
    },

    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot)=>{
            querySnapShot.forEach(doc=>{
                this.orders.push([doc.id,doc.data()])
                })      
            }) 
        },

        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id")
            console.log(doc_id)
            database.collection("orders").doc(doc_id).delete().
            then(()=>{location.reload()});
        },

        route: function(event) {
           let doc_id = event.target.getAttribute("id")
           this.$router.push({name: 'modify' , params: {id:doc_id}})
        }
    },

    created() {
        this.fetchItems()
    }
}
</script>


<style scoped>
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }

    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }

    button {
        width: 65px;
        height: 30px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
    }
</style>