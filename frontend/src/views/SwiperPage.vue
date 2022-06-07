<template>
  <base-page title="Kam na drink">
    <swiper :navigation="true" class="page-swiper">
      <swiper-slide>
        <ion-content
          ><home-page>
            <capacitor-google-map
              id="map"
              v-show="showMap"
            ></capacitor-google-map> </home-page
        ></ion-content>
      </swiper-slide>
      <swiper-slide>
        <ion-content> <profile-page> </profile-page></ion-content>
      </swiper-slide>
    </swiper>
  </base-page>
</template>
<script lang="ts">
import { Navigation } from "swiper";
import HomePage from "./HomePage.vue";
import ProfilePage from "./ProfilePage.vue";
import BasePage from "../components/BasePage.vue";
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import useMap from "../composables/useMap";
import useAxios from "../composables/useAxios";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import { Geolocation, Position } from "@capacitor/geolocation";
import { IonContent } from "@ionic/vue";
// Import Swiper styles
import "swiper/css";

export default defineComponent({
  name: "SwiperPage",

  components: {
    ProfilePage: ProfilePage,
    HomePage,
    BasePage,
    Swiper,
    SwiperSlide,
    IonContent,
  },
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
    const coordinates: Position | undefined =
      await Geolocation.getCurrentPosition();
    this.mapInstance = await useMap().createMap({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    });

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
          title: location.title,
          snippet: location.title,
        });
      });
    this.mapInstance?.addMarkers(markers);
    this.mapInstance?.setOnMarkerClickListener((data) => {
      console.log("map data");
      console.log(data);
    });
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
