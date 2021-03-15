import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
              {
                data: [],
                borderColor: "#3e95cd",
                fill:false,
                label: 'west'
              }, {
                data: [],
                borderColor: "#3eb8cd",
                fill:false,
                label: 'national' 
              }, {
                data: [],
                borderColor: "#8e5ea2",
                fill:false,
                label: 'east'
              }, {
                data: [],
                borderColor: "#3cba9f",
                fill:false,
                label: 'central'
              }, {
                data: [],
                borderColor: "#e8c3b9",
                fill:false,
                label: 'south'
              }, {
                data: [],
                borderColor: "#c45850",
                fill:false,
                label: 'north'
              }
            ],
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
        .then(response => {
            console.log(this.datacollection.datasets)

            //console.log(response.data.items)
            response.data.items.forEach(data => { 
              this.datacollection.labels.push(data.timestamp)
              var psi = data.readings.psi_twenty_four_hourly

              var west = this.datacollection.datasets.findIndex(o => o.label == "west")
              this.datacollection.datasets[west].data.push(psi.west)

              var national = this.datacollection.datasets.findIndex(o => o.label == "national")
              this.datacollection.datasets[national].data.push(psi.national)

              var east = this.datacollection.datasets.findIndex(o => o.label == "east")
              this.datacollection.datasets[east].data.push(psi.east)

              var central = this.datacollection.datasets.findIndex(o => o.label == "central")
              this.datacollection.datasets[central].data.push(psi.central)

              var south = this.datacollection.datasets.findIndex(o => o.label == "south")
              this.datacollection.datasets[south].data.push(psi.south)

              var north = this.datacollection.datasets.findIndex(o => o.label == "north")
              this.datacollection.datasets[north].data.push(psi.north)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}