<template>
  <ion-grid class="full-hight">
    <ion-row>
      <!-- Animated Searchbar -->
      <ion-searchbar autocomplete="on" @ionInput="showResults"></ion-searchbar>
    </ion-row>
    <ion-row>
      <ion-col size="6"><h3>Close by bars</h3></ion-col>
      <ion-col size="12">
        <slot></slot>
      </ion-col>
      <ion-col size="12">
        <ion-button
          @click="naZdravje(1)"
          expand="block"
          fill="clear"
          shape="round"
        >
          nazdravi
        </ion-button></ion-col
      >
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol, IonButton, IonSearchbar } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonSearchbar,
  },

  methods: {
    showResults(event: any) {
      console.log(event);
    },
    ...mapActions("auth", ["naZdravje"]),
  },
});
</script>
<style>
.full-hight {
  height: 100%;
}
</style>
