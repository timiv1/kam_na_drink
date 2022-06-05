<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bar Page</ion-title>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="nontransparent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Bar Page</ion-title>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-grid fixed>
        <ion-row>
          <ion-col>
            <h2>Details about the bar</h2>
            <ion-list v-if="show">
              <ion-list-header>
                <ion-toolbar style="margin-left: -19px">
                  <ion-title size="small">NAME</ion-title>
                </ion-toolbar>
                <ion-toolbar style="margin-left: -38px">
                  <ion-title size="small">STREET</ion-title>
                </ion-toolbar>
              </ion-list-header>
              <ion-item>
                <ion-label>{{ getBars.result.value.name }}</ion-label>
                <ion-label class="ion-text-wrap">{{
                  getBars.result.value.location.street
                }}</ion-label>
              </ion-item>
            </ion-list>
            <ion-list v-if="show">
              <ion-list-header>
                <ion-toolbar style="margin-left: -19px">
                  <ion-title size="small">CITY</ion-title>
                </ion-toolbar>
                <ion-toolbar style="margin-left: -38px">
                  <ion-title size="small">COUNTRY</ion-title>
                </ion-toolbar>
              </ion-list-header>
              <ion-item>
                <ion-label>{{ getBars.result.value.location.city }}</ion-label>
                <ion-label class="ion-text-wrap">{{
                  getBars.result.value.location.country
                }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>Contacts info</h2>
            <ion-list v-if="show">
              <ion-list-header>
                <ion-toolbar style="margin-left: -19px">
                  <ion-title size="small">TELEPHONE</ion-title>
                </ion-toolbar>
                <ion-toolbar style="margin-left: -38px">
                  <ion-title size="small">EMAIL</ion-title>
                </ion-toolbar>
              </ion-list-header>
              <ion-item>
                <ion-label>{{ getBars.result.value.contact.phone }}</ion-label>
                <ion-label>{{ getBars.result.value.contact.email }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h2>Find even more information down below</h2>
            <ion-accordion-group>
              <ion-accordion value="drinks">
                <ion-item slot="header">
                  <ion-label>Timetable</ion-label>
                </ion-item>
                <ion-list
                  slot="content"
                  inset="true"
                  v-if="getBars.result.value"
                >
                  <ion-list-header>
                    <ion-label>DAY</ion-label>
                    <ion-label>FROM</ion-label>
                    <ion-label>TO</ion-label>
                  </ion-list-header>
                  <ion-item
                    button
                    :key="work_times_bars.id"
                    v-for="work_times_bars in getBars.result.value
                      .work_times_bars"
                  >
                    <!-- If today's date matches corresponding timetable's day it changes its color to blue-->
                    <ion-label
                      color="secondary"
                      v-if="
                        work_times_bars.workTime.day ===
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.day }}
                    </ion-label>
                    <ion-label
                      color="secondary"
                      v-if="
                        work_times_bars.workTime.day ===
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.from }}
                    </ion-label>
                    <ion-label
                      color="secondary"
                      v-if="
                        work_times_bars.workTime.day ===
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.to }}
                    </ion-label>
                    <!-- Else it has normal color !-->
                    <ion-label
                      v-if="
                        work_times_bars.workTime.day !=
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.day }}
                    </ion-label>
                    <ion-label
                      v-if="
                        work_times_bars.workTime.day !=
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.from }}
                    </ion-label>
                    <ion-label
                      v-if="
                        work_times_bars.workTime.day !=
                        checkDayNumberWithWeekDay().toString()
                      "
                    >
                      {{ work_times_bars.workTime.to }}
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-accordion>
            </ion-accordion-group>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-accordion-group>
              <ion-accordion value="drinks">
                <ion-item slot="header">
                  <ion-label>Menu</ion-label>
                </ion-item>
                <ion-list
                  slot="content"
                  inset="true"
                  v-if="getBars.result.value"
                >
                  <ion-list-header>
                    <ion-label>NAME</ion-label>
                    <ion-label>VOLUME</ion-label>
                    <ion-label>PRICE</ion-label>
                    <ion-label>ALCOHOL</ion-label>
                  </ion-list-header>
                  <ion-item
                    button
                    :key="drinks.id"
                    v-for="drinks in getBars.result.value.menu[0].drinks"
                  >
                    <ion-label>{{ drinks.drink.name }}</ion-label>
                    <ion-label>{{
                      checkNullAddSign(drinks.drink.volume, " L")
                    }}</ion-label>
                    <ion-label>{{
                      checkNullAddSign(drinks.price, " €")
                    }}</ion-label>
                    <ion-label>{{
                      checkNullAddSign(drinks.drink.alcohol, " %")
                    }}</ion-label>
                  </ion-item>
                </ion-list>
              </ion-accordion>
            </ion-accordion-group>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import { checkNullAddSign } from "../composables/checkNullAddSign";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonBackButton,
  IonToolbar,
  IonContent,
  IonTitle,
  IonHeader,
  IonButtons,
  IonListHeader,
} from "@ionic/vue";
import useAxios from "../composables/useAxios";
export default defineComponent({
  name: "BarPage",
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
    IonPage,
    IonBackButton,
    IonToolbar,
    IonContent,
    IonTitle,
    IonHeader,
    IonButtons,
    IonListHeader,
  },
  data() {
    return {
      bars: [] as any,
      show: false,
      dialog: false,
    };
  },
  setup() {
    let getBars = useAxios();
    var url = window.location.pathname;
    var barId = url.substring(url.lastIndexOf("/") + 1);
    return { getBars, barId, checkNullAddSign };
  },
  async mounted() {
    await this.getBars.get(`bars/${this.barId}`);
    this.bars = this.getBars.result.value;
    this.show = true;
  },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.getDay();
      const dateTime = date;
      return dateTime;
    },
    checkDayNumberWithWeekDay() {
      const dayIndex = new Date().getDay();
      const getDayName = (dayIndex: number) => {
        const days = ["ned", "pon", "tor", "sre", "čet", "pet", "sob"];
        return days[dayIndex];
      };
      const dayName = getDayName(dayIndex);
      return dayName;
    },
  },
});
</script>
