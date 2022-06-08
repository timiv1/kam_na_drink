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
        <ion-label>{{
          item.volume === null
            ? item.name + " "
            : item.name + " " + checkNullAddSign(item.volume, " L")
        }}</ion-label>
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
import { checkNullAddSign } from "../composables/checkNullAddSign";
import { ref, onMounted, nextTick } from "vue";
import { wineOutline, homeOutline } from "ionicons/icons";

export default defineComponent({
  name: "SearchModal",
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

    return {
      getDrinks,
      getBarsWithDrink,
      getBars,
      data,
      checkNullAddSign,
      wineOutline,
      homeOutline,
    };
  },
  created() {
    this.getDrinks.get("drinks");
    this.getBars.get("bars");
  },
  data() {
    return {
      searchReset: true,
      searchValue: "" as any,
      searchMode: "drink" as string,
    };
  },
  computed: {
    filteredDrinks(): any {
      if (!this.getDrinks.loading.value) {
        const filter = this.searchValue.toLowerCase();
        const filteredDrinks = this.getDrinks.result.value.filter(
          (drink: any) => {
            return drink.name.toLowerCase().includes(filter);
          }
        );
        return filteredDrinks;
      } else return [];
    },
    filteredBars(): any {
      if (!this.getBars.loading.value) {
        const filter = this.searchValue.toLowerCase();
        const filteredBar = this.getBars.result.value.filter((bar: any) => {
          return bar.name.toLowerCase().includes(filter);
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
        this.getBarsWithDrink.result.value != null &&
        this.searchReset == false
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
  methods: {
    setSerachMode(mode: string) {
      if (mode == "drink") {
        this.searchMode = "drink";
        this.searchValue = "";
      } else if (mode == "bar") {
        this.searchMode = "bar";
        this.searchValue = "";
      } else {
        console.log(`un supported mode ${mode}`);
      }
    },
    search(event: any) {
      console.log(event?.target.value);
    },

    displayBarsWithDrink(item: any) {
      this.searchReset = false;
      if (item.volume === null) {
        this.searchValue = item.name;
      } else {
        this.searchValue =
          item.name + " " + checkNullAddSign(item.volume, " L");
      }
      this.getBarsWithDrink.get(`menus/menudrinks/drink/${item.id}`);
    },

    goToBarPage(id: string | number) {
      this.$router.push(`/bar/${id}`);
      modalController.dismiss();
    },
  },
  watch: {
    searchValue(value) {
      if (value == "") this.searchReset = true;
    },
  },
});
</script>
