<template>
  <base-page title="Home">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="6"><h3>Close by bars</h3></ion-col>
        <ion-col size="12">
          <capacitor-google-map id="map"></capacitor-google-map>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-page>
</template>
<script lang="ts">
import { GoogleMap } from "@capacitor/google-maps";

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
  async ionViewDidEnter() {
    await this.setupMap();
  },
  methods: {
    async setupMap() {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        const createMapArgs = {
          element: mapElement,
          id: "my-map",
          apiKey: process.env.VUE_APP_GOOGLE_MAPS_KEY,
          config: {
            center: {
              // The initial position to be rendered by the map
              lat: 46.40589298093361,
              lng: 14.152709680733068,
            },
            zoom: 8, // The initial zoom level to be rendered by the map
          },
          forceCreate: true,
        };
        const theMap = await GoogleMap.create(createMapArgs);
        return { theMap };
      }
    },
  },
});
</script>
<style>
capacitor-google-map {
  display: inline-block;
  width: 100%;
  height: 400px;
}
</style>
