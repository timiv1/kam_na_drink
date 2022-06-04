<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        {{ itemName.toUpperCase() }}
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-list>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>test</ion-label>
      </ion-item>
    </ion-list>
    <br>
    <ion-button color="dark" @click="closeModal">Close</ion-button>
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
} from "@ionic/vue";
import { defineComponent } from "vue";

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
  },
  props: {
    itemName: { type: String, default: '' },
  },

  setup() {
    const closeModal = () => {
      modalController.dismiss();
    };
    return { closeModal };
  },
});
</script>