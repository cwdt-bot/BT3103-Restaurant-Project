<template>
    <div>
        <form v-for="dish in order" v-bind:key="dish[0]">
            <label v-bind:for="dish[0]">{{dish[0]}}: {{dish[1]}}</label><br>
            <input type="number" v-bind:id="dish[0]" min=0 v-bind:placeholder='dish[1]' v-model.number=dish[1]><br><br>
        </form>
            <input type="submit" value="Update Order" v-on:click.prevent="updateOrder($event)">

    </div>
    
</template>

<script>
import database from '../firebase.js'
export default {
    data() {
        return {
            doc_id: this.$route.params.id,
            msg: "hello",
            order: {},
        }
    },

    created() {
        this.fetchOrder();
    },

    methods: {
        fetchOrder: function() {
            database.collection('orders').doc(this.doc_id).get().then((doc)=>{
                console.log(doc.data())
                const o = doc.data()
                this.order = o
            })
        },

        updateOrder: function(event) {
            console.log(event)
            var i = {}
            Object.assign(i, this.order)
            console.log(i)
            database.collection('orders').doc(this.doc_id).set(i)
            this.$router.push({path: "/orders"})
        }
    }
}
</script>

<style scoped>

</style>