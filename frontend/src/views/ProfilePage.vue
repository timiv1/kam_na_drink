<template>
  <ion-grid fixed>
    <ion-row>
      <ion-col size="6">{{ borovnicke }}</ion-col>
      <h1>Profil</h1>
      // tukaj pride profil Ime + nek avatar pod tem najljubši lokal/pijača
      (+urejanje)
      <ion-col size="6"></ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import useAxios from "../composables/useAxios";

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
  setup() {
    let profile = useAxios();
    // await profil.get(`mypath`);
    return { profile };
  },
  created() {
    //call api,
    // e.g.
    // this.profile.get(`path`);
    console.log("PROFIL KREIRAN");
  },
});
</script>
