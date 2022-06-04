<template>
  <ion-grid fixed>
    <ion-row>
      <h1>Profile</h1>
    </ion-row>
    <ion-row>
      <ion-img style="width:150px" src="assets\image\user-account-icon.png" />
    </ion-row>
    <br>
    <ion-row>
      <ion-col>
        <ion-list>
          <ion-item>
            <ion-label v-if="getUser.result.value">First Name: {{ getUser.result.value.first_name }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label v-if="getUser.result.value">Last Name: {{ getUser.result.value.last_name }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label v-if="getUser.result.value">Email: {{ getUser.result.value.email }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-accordion-group>
          <ion-accordion value="drinks">
            <ion-item slot="header">
              <ion-label>Favorite Drinks</ion-label>
            </ion-item>
            <ion-list slot="content" inset="true" v-if="getUser.result.value">
              <ion-item button @click="openDrinkModal(drinks.drink_id, drinks.id)" :key="drinks.id"
                v-for="drinks in getUser.result.value.drinks">
                <ion-label>{{ capitalize(drinks.drink.name) }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-accordion-group>
          <ion-accordion value="bars">
            <ion-item slot="header">
              <ion-label>Favorite Bars</ion-label>
            </ion-item>
            <ion-list slot="content" inset="true" v-if="getUser.result.value">
              <ion-item :key="bars.id" v-for="bars in getUser.result.value.bars">
                <ion-label>{{ bars.bar.name }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import useAxios from "../composables/useAxios";
import { capitalize } from "../composables/capitalize";
import DrinkModal from "@/components/DrinkModal.vue";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  modalController,

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
    IonAccordion,
    IonAccordionGroup,
  },
  data() {
    return {
      show: false,
      dialog: false,
    };
  },
  setup() {
    let getUser = useAxios();
    let getDrink = useAxios();
    let array = [] as any
    const userId = 1; //set userId here

    const openDrinkModal = async (drink_id: string, id: string) => {
      // getDrink.get(`drinks/${drink_id}`);
      // var test = getDrink.result.value
      // console.log("getDrink")
      // console.log(test)
      const modal = await modalController.create({
        component: DrinkModal,
        componentProps: {
          name: "test"
        }
      });      
      console.log(id + " " + drink_id);
      return modal.present()
    }

    return {
      getUser,
      getDrink,
      userId,
      openDrinkModal,
      array,
    };
  },
  mounted() {
    this.getUser.get(`users/${this.userId}`);
    console.log("getUser")
    this.array = this.getUser.result
    console.log(this.array)
    this.getDrink.get(`drinks/1`);
    console.log("getDrink")
    console.log(this.getDrink.result)
  },
  methods: {
    capitalize,
  },
});
</script>
