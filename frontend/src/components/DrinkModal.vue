<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ name.toUpperCase() }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label>{{ volume }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>{{ alcohol }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>{{ description }}</ion-label>
      </ion-item>
    </ion-list>
    <br />
    <ion-button color="dark" @click="closeModal">Close Modal</ion-button>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DrinkModal",
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButton },
  props: {
    name: { type: String, default: "Name" },
    volume: { type: String, default: "Volume" },
    alcohol: { type: String, default: "Alcohol" },
    description: { type: String, default: "" },
  },
  setup() {
    const closeModal = () => {
      modalController.dismiss();
    };
    return { closeModal };
  },
});
</script>
