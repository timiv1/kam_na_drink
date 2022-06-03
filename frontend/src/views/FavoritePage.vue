<template>
  <ion-grid fixed>
    <ion-row>
      <ion-col>
        <h2>Drinks:</h2>
        <ion-list v-if="show">
          <ion-item button @click="openDrinkModal(item.drink_id, item.id)" :key="item.id" v-for="item in userDrinks">
            <ion-label>{{ capitalize(item.drinks.name) }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <h2>Bars:</h2>
        <ion-list v-if="show">
          <ion-item :key="item.id" v-for="item in userBars">
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
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import useAxios from "../composables/useAxios";
import { capitalize } from "../shared/capitalize";
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
    IonLabel
  },
  data() {
    return {
      userBars: [] as any,
      userDrinks: [] as any,
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
  async mounted() {
    console.log("Created ProfilePage");
    await this.getUserDrinks.get(`users/${this.userId}/userdrinks`)
    await this.getUserBars.get(`users/${this.userId}/userbars`);

    this.userBars = this.getUserBars.result.value;
    this.userDrinks = this.getUserDrinks.result.value;
    this.show = true;
  },
  methods: {
    capitalize,
    openDrinkModal: (drink_id: string, id: string) => {
      console.log(id+ " " + drink_id)
    }
  }
});
</script>
