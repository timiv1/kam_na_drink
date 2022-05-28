<template>
  <base-page title="Home">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="6"><h3>Close by bars</h3></ion-col>
        <ion-col size="12">
          <capacitor-google-map
            id="map"
            v-show="showMap"
          ></capacitor-google-map>
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
  </base-page>
</template>
<script lang="ts">
import { mapActions } from "vuex";
import router from "../router/index";
import { GoogleMap } from "@capacitor/google-maps";

import BasePage from "../components/BasePage.vue";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    BasePage,
    IonButton,
  },
  async ionViewDidEnter() {
    console.log(router.currentRoute.value.path);
    await this.setupMap();
  },
  computed: {
    // TODO on android all backgrounds need to be transperent to show map on a page but than map is also shown in every page.
    // To fix this hide map when on different route or setup backgrounds to be not transparent on other pages.
    showMap() {
      // return router.currentRoute.value.path == "/home";
      return false;
    },
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
    ...mapActions("auth", ["naZdravje"]),
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
