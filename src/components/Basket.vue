<template>
  <div>
    Menu:  
    <ul>
        <li v-for="item in itemsSelected" v-bind:key="item.name">

            {{item[0]}} x{{item[1]}}         
            
        </li>
    </ul>
    <button type = "button"  v-on:click="showTotal(); sendOrder()">Add Order</button>
    <p v-show="show"> Subtotal: {{subTotal}} </p>
    <p v-show="show"> Grand total: {{grandTotal}} </p>
  </div>   
</template>


<script>
import database from '../firebase.js'

export default {
    props: {
        itemsSelected : {
            type: Array
        }
    },
    data(){
        return {
            subTotal: 0,
            grandTotal: 0,
            show: false,
        }
    },

    watch : {
        subTotal: function() {
            this.grandTotal = (this.subTotal * 1.07).toFixed(2)
        },

        itemsSelected : function() {
            var i;
            this.subTotal = 0;
            for(i = 0; i < this.itemsSelected.length; i++) {
                console.log(this.itemsSelected[i]);
                this.subTotal += this.itemsSelected[i][2] * this.itemsSelected[i][1] ;
            }
        }
    },

    methods: {
        showTotal: function() {
            this.show = true;
        },

        sendOrder: function() {
            var order = {...this.itemsSelected};
            database.collection('orders').add(
                order   
            ).then(() => {location.reload()});
            console.log(order);    
      }
    }
}
</script>

<style scoped>

    button{
        font-family: 'Avenir',
        Helvetica, Arial, sans-serif;
        text-align: center;
        background-color: #ce4567a8;
        border-radius: 5px;
        padding: 5px;
    }

</style>