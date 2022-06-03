<template>
  <ion-grid fixed>
    <ion-row>
      <h1>Profile</h1>
    </ion-row>
    <ion-row>
      <ion-col>

      </ion-col>
      <ion-col>
        <h2>Favorites</h2>
        <h3>Drinks:</h3>
        <ion-list v-if="!getUserDrinks.loading.value">
          <ion-item button @click="openDrinkModal(item.drink_id, item.id)" :key="item.id"
            v-for="item in getUserDrinks.result.value">
            <ion-label>{{ capitalize(item.drinks.name) }}</ion-label>
          </ion-item>
        </ion-list>
        <h3>Bars:</h3>
        <ion-list v-if="!getUserBars.loading.value">
          <ion-item :key="item.id" v-for="item in getUserBars.result.value">
            <ion-label>{{ item.bars.name }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import useAxios from "../composables/useAxios";
import { capitalize } from "../composables/capitalize";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
export default defineComponent({
  name: "ProfilePage",
  computed: {
    ...mapState("auth", { borovnicke: "borovnicke" }),
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      show: false,
      dialog: false,
    };
  },
  setup() {
    let getUserBars = useAxios();
    let getUserDrinks = useAxios();
    const userId = 1; //set userId here
    return { getUserBars, getUserDrinks, userId };
  },
  mounted() {
    console.log("Created ProfilePage");
    this.getUserDrinks.get(`users/${this.userId}/userdrinks`);
    this.getUserBars.get(`users/${this.userId}/userbars`);
  },
  methods: {
    capitalize,
    openDrinkModal: (drink_id: string, id: string) => {
      console.log(id + " " + drink_id);
    },
  },
});
</script>
