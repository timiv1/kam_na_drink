<template>
  <ion-grid class="full-hight">
    <ion-row>
      <!-- Animated Searchbar -->
      <ion-searchbar
        autocomplete="on"
        @click="openModal"
      >
      </ion-searchbar>
      <ion-modal
        :is-open="isOpenRef"
        css-class="my-custom-class"
        :swipe-to-close="true"
        :presenting-element="$parent?.$refs.ionRouterOutlet"
        @didDismiss="closeModal()"
      >
        <search-modal></search-modal>
      </ion-modal>
    </ion-row>
    <ion-row>
      <ion-col size="6"><h3>Close by bars</h3></ion-col>
      <ion-col size="12">
        <slot></slot>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import SearchModal from '../components/SearchModal.vue'
import { defineComponent } from "vue";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
} from "@ionic/vue";
import { IonModal } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonModal, SearchModal
  },
  data() {
    return {
      isOpenRef: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpenRef = false;
    },
    openModal() {
      this.isOpenRef = true;
    },
  },
});
</script>
<style>
.full-hight {
  height: 100%;
}
</style>
