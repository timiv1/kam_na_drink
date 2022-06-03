<template>
  <ion-grid fixed>
    <ion-row>
      <h1>Profile</h1>
    </ion-row>
    <ion-row>
      izpiši
      {{ userBars }}
      <ion-col>
        <!-- {{ borovnicke }} -->
        <!-- tukaj pride profil Ime + nek avatar najljubši lokal/pijača (+urejanje) -->
        <!-- <ion-list v-if="userBars.result != null">
          <ion-item :key="item" v-for="item in userBars.result">
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-list> -->
        <ion-list v-if="show">
          <ion-item :key="item.id" v-for="item in mojArray">
            <ion-label>{{ item.bar_id }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
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
    IonList,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      testArray: {} as any,
      mojArray: [] as any,
      show: false,
    };
  },
  setup() {
    let userBars = useAxios();
    const userId = 1; //set userId here
    return { userBars, userId };
  },
  async mounted() {
    console.log("Created ProfilePage");
    await this.userBars.get(`users/${this.userId}/userbars`);
    console.log(`this is type of result ${this.userBars.result}`);

    this.mojArray = this.userBars.result.value;
    this.show = true;
    // this.mojArray = this.userBars.result.value;
  },
});
</script>
