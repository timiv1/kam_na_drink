<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Modal</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    This is a modal
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DrinkModal",
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
});
</script>