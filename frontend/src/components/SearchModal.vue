<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ "Search" }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="10">
          <ion-searchbar
            v-model="searchValue"
            ref="searchbar"
            id="searchbar"
            autocomplete="on"
            @ionChange="search"
            autofocus="true"
        /></ion-col>
        <ion-col size="2"
          ><ion-button>
            <ion-icon :icon="wineOutline" color="red"></ion-icon> </ion-button
        ></ion-col>
      </ion-row>
    </ion-grid>
    <ion-list>
      <ion-item :key="item.id" v-for="item in filteredDrinks">
        <ion-label>{{ item.name }}</ion-label>
      </ion-item>
    </ion-list>
    <br />
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";
import useAxios from "@/composables/useAxios";
import { ref, onMounted, nextTick } from "vue";
import { wineOutline } from "ionicons/icons";

export default defineComponent({
  name: "DrinkModal",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup() {
    const getDrinks = useAxios();
    // const isOpenRef = ref<boolean>(false);
    const data = { content: "New Content" };
    const searchbar = ref<any>(null);
    onMounted(() => {
      nextTick(() => {
        console.log("PRIKAZAN SEARCH MODAL NEXT TICK");
        console.log(searchbar.value);
        const searchbarElement = searchbar.value.$el;
        console.log(searchbarElement.childNodes[0]);
        // searchbar.value.$el.firstChild.firstChild.focus();
      });
    });
    return { getDrinks, data, searchbar, wineOutline };
  },
  created() {
    this.getDrinks.get("drinks");
  },
  data() {
    return { searchValue: "" as any };
  },
  computed: {
    filteredDrinks(): any {
      if (!this.getDrinks.loading.value) {
        const filter = this.searchValue;
        const filteredDrinks = this.getDrinks.result.value.filter(
          (drink: any) => {
            return drink.name.includes(filter);
          }
        );
        return filteredDrinks;
      } else return [];
    },
  },
  //   mounted() {
  //     console.log("PRIKAZAN SEARCH MODAL");
  //     // if (document) document.getElementById("searchbar").focus();
  //     // this.$nextTick(() => {
  //     //   this.searchbar.value.$el.focus();
  //     // });
  //     this.$nextTick(() => {
  //       console.log("PRIKAZAN SEARCH MODAL NEXT TICK");

  //       const editButtonRef = this.$refs.searchbar as any;
  //       editButtonRef.focus();
  //     });
  //     console.log(this.searchbar.value);
  //   },
  methods: {
    search(event: any) {
      console.log(event?.target.value);
    },
  },
});
</script>
