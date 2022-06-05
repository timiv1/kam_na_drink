<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        {{ itemName.toUpperCase() }}
      </ion-title>
      <ion-button slot="end" @click="closeModal" fill="clear">
        <ion-icon :icon="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding nontransparent">
    <ion-list v-if="getMenuDrinks.result.value">
      <ion-item button @click="goToBar(item.menu.bar_id)" :key="item.id"
        v-for="item in getMenuDrinks.result.value.slice(0, 5)">
        <ion-label>
          <h2>{{ item.menu.bars.name }}</h2>
          <p>{{ item.price }}€</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <br>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  modalController,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import useAxios from "../composables/useAxios";
import { capitalize } from "../composables/capitalize";
import { close } from 'ionicons/icons';

export default defineComponent({
  name: "DrinkModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
  },
  props: {
    itemName: { type: String, default: '' },
    drink_id: Number,
  },


  setup() {
    let getMenuDrinks = useAxios();

    const closeModal = () => {
      modalController.dismiss();
    };
    return {
      closeModal,
      getMenuDrinks,
      close,
    };
  },
  async mounted() {
    await this.getMenuDrinks.get(`menus/menudrinks/drink/${this.drink_id}`);
  },
  methods: {
    capitalize,
    goToBar(barId: string) {
      this.$router.push(`/bar/${barId}`);
      this.closeModal();
    },
  }

});
</script>
