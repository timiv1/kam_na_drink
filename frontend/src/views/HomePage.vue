<template>
  <base-page title="Home">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="6"></ion-col>
        <ion-col size="6"></ion-col>
      </ion-row>
    </ion-grid>
  </base-page>
</template>
<script lang="ts">
import BasePage from "../components/BasePage.vue";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    BasePage,
  },
});
</script>
