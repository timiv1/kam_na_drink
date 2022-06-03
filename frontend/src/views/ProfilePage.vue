<template>
  <ion-grid fixed>
    <ion-row>
      <h1>Profile</h1>
    </ion-row>
    <ion-row>
      <ion-img style="width:150px" src="assets\images\user-account-icon.png" />
    </ion-row>
    <br>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item>
            <ion-label>First name:</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Last name:</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Email:</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <h3>Favorite Drinks:</h3>
        <ion-list v-if="!getUserDrinks.loading.value">
          <ion-item button @click="openDrinkModal(item.drink_id, item.id)" :key="item.id"
            v-for="item in getUserDrinks.result.value">
            <ion-label>{{ capitalize(item.drink.name) }}</ion-label>
          </ion-item>
        </ion-list>
        <h3>Favorite Bars:</h3>
        <ion-list v-if="!getUserBars.loading.value">
          <ion-item :key="item.id" v-for="item in getUserBars.result.value">
            <ion-label>{{ item.bar.name }}</ion-label>
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
    let getUser = useAxios();
    const userId = 1; //set userId here
    return { getUserBars, getUserDrinks, getUser, userId };
  },
  mounted() {
    console.log("Created ProfilePage");
    this.getUserDrinks.get(`users/${this.userId}/userdrinks`);
    this.getUserBars.get(`users/${this.userId}/userbars`);
    this.getUser.get(`users/${this.userId}`);
    console.log(this.getUser.result.value)
  },
  methods: {
    capitalize,
    openDrinkModal: (drink_id: string, id: string) => {
      console.log(id + " " + drink_id);
    },
  },
});
</script>
