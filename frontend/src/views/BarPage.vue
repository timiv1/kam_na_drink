<template>
  <ion-grid fixed>
    <ion-row>
      <ion-col>
        <h2>Details about the bar</h2>
        <ion-list v-if="show">
        <ion-list-header>
          <ion-label>NAME</ion-label>
          <ion-label>STREET</ion-label>
          <ion-label>CITY</ion-label>
          <ion-label>COUNTRY</ion-label>
        </ion-list-header>
          <ion-item>
            <ion-label>{{ getBars.result.value.name }}</ion-label>
            <ion-label>{{ getBars.result.value.location.street }}</ion-label>
            <ion-label>{{ getBars.result.value.location.city }}</ion-label>
            <ion-label>{{ getBars.result.value.location.country }}</ion-label>
          </ion-item>
        </ion-list>
        </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <h2>Contacts info</h2>
        <ion-list v-if="show">
        <ion-list-header>
          <ion-label>TELEPHONE</ion-label>
          <ion-label>EMAIL</ion-label>
        </ion-list-header>
          <ion-item>
            <ion-label>{{ getBars.result.value.contact.phone}}</ion-label>
            <ion-label>{{ getBars.result.value.contact.email}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
      <h2>Timetable</h2>
      <ion-list v-if="getBars.result.value">
      <ion-list-header>
        <ion-label>DAY</ion-label>
        <ion-label>FROM</ion-label>
        <ion-label>TO</ion-label>
      </ion-list-header>
        <ion-item :key="work_times_bars.id" v-for="work_times_bars in getBars.result.value.work_times_bars">
          <ion-label>{{ work_times_bars.workTime.day }}</ion-label>
          <ion-label>{{ work_times_bars.workTime.from }}</ion-label>
          <ion-label>{{ work_times_bars.workTime.to }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-col>
  </ion-row>
  <ion-row>
      <ion-col>
      <h2>Menu</h2>
      <ion-list v-if="getBars.result.value">
      <ion-list-header>
        <ion-label>NAME</ion-label>
        <ion-label>VOLUME</ion-label>
        <ion-label>PRICE</ion-label>
        <ion-label>ALCOHOL</ion-label>
      </ion-list-header>
        <ion-item :key="drinks.id" v-for="drinks in getBars.result.value.menu[0].drinks">
          <ion-label>{{ drinks.drink.name }}</ion-label> 
          <ion-label>{{ drinks.drink.volume }}l </ion-label>  
          <ion-label>{{ drinks.price }}€</ion-label>  
          <ion-label>{{ drinks.drink.alcohol }}%</ion-label>                  
        </ion-item>
      </ion-list>
    </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import useAxios from "../composables/useAxios";
export default defineComponent({
  name: "BarPage",
  computed: {
    ...mapState("auth", { borovnicke: "borovnicke" }),
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel
  },
  data() {
    return {
      bars: [] as any,
      show: false,
      dialog: false,
    };
  },
  setup() {
    let getBars = useAxios();
    const barId = 1;
    return { getBars, barId };
  },
  async mounted() {
    await this.getBars.get(`bars/${this.barId}`)
    this.bars = this.getBars.result.value;
    this.show = true;
  },
  methods: {
  }
});
</script>