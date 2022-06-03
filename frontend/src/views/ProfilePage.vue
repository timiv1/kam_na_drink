<template>
  <ion-grid fixed>
    <ion-row>
      <h1>Profile</h1>
    </ion-row>
    <ion-row>
      <ion-col>
        <!-- {{ borovnicke }} -->
        <!-- tukaj pride profil Ime + nek avatar najljubši lokal/pijača (+urejanje) -->
        <ion-list v-if="userBars.result != null" >
          <ion-item :key="item" v-for="item in userBars.result.value">
            <ion-label>{{item}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
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
    let userBars = useAxios();
    const userId = 1; //set userId here
    return { userBars, userId };
  },
  async created() {
    console.log("Created ProfilePage")
    await this.userBars.get(`users/${this.userId}/userbars`)
  },
});
</script>
