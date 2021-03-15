<template>
    <div>
        <button type = "button" v-on:click="increment">+</button> {{count}}
        <button type = "button" v-on:click="decrement">-</button>
    </div>
</template>

<script>

export default {
    name: "QuantityCounter",
    data() {
        return {
            count: 0,
        }
    },
    props: {
        item : {
            type: Object
        }
    },
    methods: {
        increment: function() {
            if (this.count >= 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.count++;
            }
            this.$emit('counter', this.item, this.count);
            
        },

        decrement: function() {
            this.count == 0 ? this.count : this.count--;
            this.$emit('counter', this.item, this.count);
        }

    },

}
</script>

<style scoped>
    button{
        font-family: 'Avenir',
        Helvetica, Arial, sans-serif;
        text-align: center;
        background-color: #ce4567a8;
        height:30px;
        width:30px;
        border-radius: 5px;
        padding: 5px;
    }

    div{
        font-size: 25px;
    }
</style>
