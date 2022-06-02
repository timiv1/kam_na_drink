<template>
    <ion-grid fixed>
      <ion-row>
        <ion-col size="6">{{ borovnicke }}</ion-col>
        <ion-col size="6"></ion-col>
      </ion-row>
    </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";

export default defineComponent({
  name: "ProfilePage",
  computed: {
    ...mapState("auth", { borovnicke: "borovnicke" }),
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    
  },
});
</script>
