import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import VeGauge from 'v-charts/lib/gauge.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'

Vue.component(VeLine.name, VeLine)
Vue.component(VeGauge.name, VeGauge)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)
