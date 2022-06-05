<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ "Search" }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding nontransparent">
    <ion-grid fixed>
      <ion-row>
        <ion-col size="6"
          ><ion-button :color="drinkBtnColor" @click="setSerachMode('drink')">
            <span style="margin-right: 4px">Search by</span>
            <ion-icon :icon="wineOutline"></ion-icon> </ion-button
        ></ion-col>
        <ion-col size="6"
          ><ion-button :color="barBtnColor" @click="setSerachMode('bar')">
            <span style="margin-right: 4px">Search by</span>
            <ion-icon :icon="homeOutline"></ion-icon> </ion-button
        ></ion-col>
      </ion-row>
      <ion-row>
        <ion-col size="12">
          <ion-searchbar
            v-model="searchValue"
            ref="searchbar"
            id="searchbar"
            autocomplete="on"
            :placeholder="searchPlaceholder"
            @ionChange="search"
            autofocus="true"
        /></ion-col>
      </ion-row>
    </ion-grid>
    <!-- search-bars-by-drink drink items -->
    <ion-list v-if="showFilteredDrinks">
      <ion-item
        button
        :key="item.id"
        v-for="item in filteredDrinks"
        @click="displayBarsWithDrink(item)"
      >
        <ion-label>{{ `${item.name} ${item.volume}L` }}</ion-label>
      </ion-item>
    </ion-list>
    <!-- result display for bars with drinks -->
    <ion-list v-else-if="showBarsWithDrinks">
      <ion-item
        button
        :key="item.id"
        v-for="item in getBarsWithDrink.result.value"
        @click="goToBarPage(item.menu.bar_id)"
      >
        <ion-label>{{ `${item.menu.bars.name} ${item.price}€` }}</ion-label>
      </ion-item>
    </ion-list>
    <!-- bars search items -->
    <ion-list v-else-if="showFilteredBars">
      <ion-item
        button
        :key="item.id"
        v-for="item in filteredBars"
        @click="goToBarPage(item.id)"
      >
        <ion-label>{{ `${item.name}` }}</ion-label>
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
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import useAxios from "@/composables/useAxios";
import { ref, onMounted, nextTick } from "vue";
import { wineOutline, homeOutline } from "ionicons/icons";

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
    const getBarsWithDrink = useAxios();
    const getBars = useAxios();

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
    return {
      getDrinks,
      getBarsWithDrink,
      getBars,
      data,
      searchbar,
      wineOutline,
      homeOutline,
    };
  },
  created() {
    this.getDrinks.get("drinks");
    this.getBars.get("bars");
  },
  data() {
    return { searchValue: "" as any, searchMode: "drink" as string };
  },
  computed: {
    filteredDrinks(): any {
      //TODO filter with all lower-case on all lower-case
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
    filteredBars(): any {
      //TODO filter with all lower-case on all lower-case
      if (!this.getBars.loading.value) {
        const filter = this.searchValue;
        const filteredBar = this.getBars.result.value.filter((bar: any) => {
          return bar.name.includes(filter);
        });
        return filteredBar;
      } else return [];
    },
    showFilteredDrinks(): any {
      //TODO when focus on search display drinks again check if ''
      if (!this.showBarsWithDrinks && !this.showFilteredBars) return true;
      else return false;
    },
    showBarsWithDrinks(): any {
      if (
        this.searchMode == "drink" &&
        this.getBarsWithDrink.result.value != null
      )
        return true;
      else return false;
    },
    showFilteredBars(): any {
      if (
        this.searchMode == "bar" &&
        this.filteredBars != null &&
        this.filteredBars.length > 0
      )
        return true;
      else return false;
    },
    drinkBtnColor(): string {
      return this.searchMode == "drink" ? "medium" : "light";
    },
    barBtnColor(): string {
      return this.searchMode == "bar" ? "medium" : "light";
    },
    searchPlaceholder(): string {
      if (this.searchMode == "drink") {
        return "search bars by drink";
      } else if (this.searchMode == "bar") {
        return "search bars";
      }
      return "search";
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
    setSerachMode(mode: string) {
      if (mode == "drink") {
        this.searchMode = "drink";
      } else if (mode == "bar") {
        this.searchMode = "bar";
      } else {
        console.log(`un supported mode ${mode}`);
      }
    },
    search(event: any) {
      console.log(event?.target.value);
    },
    displayBarsWithDrink(item: any) {
      this.searchValue = `${item.name} ${item.volume}L`;
      this.getBarsWithDrink.get(`menus/menudrinks/drink/${item.id}`);
    },
    goToBarPage(id: string | number) {
      this.$router.push(`/bar/${id}`);
      modalController.dismiss();
    },
  },
});
</script>
