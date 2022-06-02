<template>
  <base-page title="Kam na drink">
    <swiper :navigation="true" class="page-swiper">
      <swiper-slide><profile-page> </profile-page> </swiper-slide>
      <swiper-slide
        ><home-page>
          <capacitor-google-map
            id="map"
            v-show="showMap"
          ></capacitor-google-map>
        </home-page>
      </swiper-slide>
    </swiper>
  </base-page>
</template>
<script lang="ts">
import { Navigation } from "swiper";
import HomePage from "./HomePage.vue";
import ProfilePage from "./ProfilePage.vue";
import { mapState } from "vuex";
import BasePage from "../components/BasePage.vue";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import useMap from "../composables/useMap";
import { GoogleMap } from "@capacitor/google-maps";

// Import Swiper styles
import "swiper/css";

export default defineComponent({
  name: "SwiperPage",

  components: { ProfilePage, HomePage, BasePage, Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Navigation],
      useMap,
      GoogleMap,
    };
  },

  // ionic hook when view is ready
  async ionViewDidEnter() {
    // create map with
    await useMap().createMap({
      lat: 46.40589298093361,
      lng: 14.152709680733068,
    });
  },
  data() {
    return { mapInstance: null };
  },
  computed: {
    // TODO on android all backgrounds need to be transperent to show map on a page but than map is also shown in every page.
    // To fix this hide map when on different route or setup backgrounds to be not transparent on other pages.

    showMap() {
      return true;
    },
    ...mapState("auth", { borovnicke: "borovnicke" }),
  },
});
</script>
<style>
.page-swiper {
  height: 100%;
}
capacitor-google-map {
  display: inline-block;
  width: 100%;
  height: 400px;
}
</style>
