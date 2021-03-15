import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#3eb8cd"],
                data: [0,0,0,0,0,0]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Number of Orders'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },

  created() {
    this.fetchLabels()
    this.fetchItems()
  },

  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            var curr
            for (curr in doc.data()) {
              var d = doc.data()[curr]
              var i = this.datacollection.labels.indexOf(d[0])
              this.datacollection.datasets[0].data[i] += d[1]
            }
        })
        this.renderChart(this.datacollection, this.options)
      })
    },

    fetchLabels: function () {
      database.collection('menu').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            this.datacollection.labels.push(doc.data().name)
        })
      })
    }
  },
}