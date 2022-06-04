<template>
  <ion-grid class="full-hight">
    <ion-row>
      <!-- Animated Searchbar -->
      <ion-searchbar autocomplete="on" @ionChange="showResults"></ion-searchbar>
    </ion-row>
    <ion-row>
      <ion-col size="12">
        <ion-item :key="item.id" v-for="item in getDrinks.result.value">
          <ion-label>{{item.name}}</ion-label>
        </ion-item>
      </ion-col>
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
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSearchbar,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import useAxios from "@/composables/useAxios";

export default defineComponent({
  name: "HomePage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonSearchbar,
    IonItem,
    IonLabel,
  },
  setup() {
    const getDrinks = useAxios();
    return { getDrinks };
  },
  methods: {
    showResults(event: any) {
      console.log(event.target.value);
    },
    ...mapActions("auth", ["naZdravje"]),
  },
  created() {
    this.getDrinks.get("drinks");
  },
});
</script>
<style>
.full-hight {
  height: 100%;
}
</style>
