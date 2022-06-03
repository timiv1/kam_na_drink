<template>
  <base-page title="Kam na drink">
    <swiper :navigation="true" class="page-swiper">
      <swiper-slide
        ><home-page>
          <capacitor-google-map
            id="map"
            v-show="showMap"
          ></capacitor-google-map>
          <h4>{{ getCloseByBars }}</h4>
          <h4>{{ getBars.result }}</h4>
        </home-page>
      </swiper-slide>
      <swiper-slide><profile-page> </profile-page> </swiper-slide>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import useMap from "../composables/useMap";
import useAxios from "../composables/useAxios";

import { GoogleMap, Marker } from "@capacitor/google-maps";
import { Geolocation, Position } from "@capacitor/geolocation";
// Import Swiper styles
import "swiper/css";

export default defineComponent({
  name: "SwiperPage",

  components: { ProfilePage: ProfilePage, HomePage, BasePage, Swiper, SwiperSlide },
  setup() {
    const getCloseByBars = useAxios();
    const getBars = useAxios();

    return {
      modules: [Navigation],
      useAxios,
      useMap,
      getCloseByBars,
      getBars,
      GoogleMap,
    };
  },

  // ionic hook when view is ready
  async ionViewDidEnter() {
    // create map with
    this.mapInstance = await useMap().createMap({
      lat: 46.40589298093361,
      lng: 14.152709680733068,
    });
    const coordinates: Position | undefined =
      await Geolocation.getCurrentPosition();
    // console.log(
    //   useAxios().serverClient.get(
    //     `location/${coordinates.coords.latitude}/${coordinates.coords.longitude}`
    //   )
    // );
    await this.getCloseByBars.get(
      `location/${coordinates.coords.latitude}/${coordinates.coords.longitude}`
    );
    // Change objects to be compatable with type Marker
    let markers: Array<Marker> = [];
    console.log("result");
    console.log(this.getCloseByBars.result.value);
    if (this.getCloseByBars.result)
      this.getCloseByBars.result.value?.forEach((location: any) => {
        markers.push({
          coordinate: {
            lat: location.lat,
            lng: location.long,
          },
        });
      });
    this.mapInstance?.addMarkers(markers);
  },
  data() {
    return { mapInstance: undefined as GoogleMap | undefined };
  },
  computed: {
    // TODO on android all backgrounds need to be transperent to show map on a page but than map is also shown in every page.
    // To fix this hide map when on different route or setup backgrounds to be not transparent on other pages.

    // TODO check if you can swipe on mobile when map is rendered
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
