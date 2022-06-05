<template>
  <ion-content>
    <ion-grid fixed>
      <ion-row>
        <h1>Profile</h1>
      </ion-row>
      <ion-row>
        <ion-img
          style="width: 100px"
          src="assets\image\user-account-icon.png"
        />
      </ion-row>
      <br />
      <ion-row>
        <ion-col>
          <ion-list>
            <ion-item>
              <ion-label v-if="getUser.result.value"
                >First Name: {{ getUser.result.value.first_name }}</ion-label
              >
            </ion-item>
            <ion-item>
              <ion-label v-if="getUser.result.value"
                >Last Name: {{ getUser.result.value.last_name }}</ion-label
              >
            </ion-item>
            <ion-item>
              <ion-label v-if="getUser.result.value"
                >Email: {{ getUser.result.value.email }}</ion-label
              >
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-accordion-group>
            <ion-accordion value="drinks">
              <ion-item slot="header">
                <ion-label>Favorite Drinks</ion-label>
              </ion-item>
              <ion-list slot="content" inset="true" v-if="getUser.result.value">
                <ion-item
                  button
                  :key="drinks.id"
                  v-for="drinks in getUser.result.value.drinks"
                >
                  <div
                    class="ionlabelbuttonfix"
                    @click="openDrinkModal(drinks.drink_id)"
                  >
                    <ion-label>{{ capitalize(drinks.drink.name) }}</ion-label>
                  </div>
                  <ion-button
                    @click="
                      presentAlert(
                        capitalize(drinks.drink.name),
                        drinks.id,
                        post,
                        0
                      )
                    "
                    slot="end"
                    fill="clear"
                  >
                    <ion-icon :icon="close"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-accordion-group>
            <ion-accordion value="bars">
              <ion-item slot="header">
                <ion-label>Favorite Bars</ion-label>
              </ion-item>
              <ion-list slot="content" inset="true" v-if="getUser.result.value">
                <ion-item
                  button
                  :key="bars.id"
                  v-for="bars in getUser.result.value.bars"
                >
                  <div class="ionlabelbuttonfix" @click="goToBar(bars.bar_id)">
                    <ion-label>{{ capitalize(bars.bar.name) }}</ion-label>
                  </div>
                  <ion-button
                    @click="
                      presentAlert(capitalize(bars.bar.name), bars.id, post, 1)
                    "
                    slot="end"
                    fill="clear"
                  >
                    <ion-icon :icon="close"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-accordion>
          </ion-accordion-group>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <br />
  <br />
</template>
<script lang="ts">
import { mapState } from "vuex";
import { defineComponent } from "vue";
import useAxios from "../composables/useAxios";
import { capitalize } from "../composables/capitalize";
import DrinkModal from "@/components/DrinkModal.vue";
import { close, informationCircle } from "ionicons/icons";
import { alertController } from "@ionic/core";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  modalController,
  IonContent,
  IonButton,
  IonIcon,
  IonImg,
  toastController,
} from "@ionic/vue";
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
    IonAccordion,
    IonAccordionGroup,
    IonContent,
    IonButton,
    IonIcon,
    IonImg,
  },
  setup() {
    let getUser = useAxios();
    let getDrink = useAxios();
    let post = useAxios();
    const userId = 1; //set userId here!!!

    const openDrinkModal = async (drink_id: string) => {
      await getDrink.get(`drinks/${drink_id}`);
      let itemName = "";
      if (getDrink.result.value) {
        itemName = getDrink.result.value.name;
        if (getDrink.result.value.volume != null) {
          itemName += ", " + getDrink.result.value.volume + "L";
        }
        if (getDrink.result.value.alcohol != null) {
          itemName += ", " + getDrink.result.value.alcohol + "%";
        }
        if (getDrink.result.value.description != null) {
          itemName += ", " + getDrink.result.value.description;
        }
      }

      const modal = await modalController.create({
        component: DrinkModal,
        componentProps: {
          itemName: itemName,
          drink_id: drink_id,
        },
      });
      return modal.present();
    };

    return {
      getUser,
      getDrink,
      post,
      userId,
      openDrinkModal,
      close,
    };
  },
  async mounted() {
    await this.getUser.get(`users/${this.userId}`);
  },
  methods: {
    capitalize,
    goToBar(barId: string) {
      this.$router.push(`/bar/${barId}`);
    },
    async presentAlert(item: string, id: number, axios: any, x: number) {
      const a = await alertController.create({
        header: "Confirmation",
        cssClass: "my-custom-class",
        message: `Do you want to unfavorite ${item}?`,
        buttons: [
          {
            text: "NO",
          },
          {
            text: "YES",
            handler: async () => {
              if (x == 0) {
                await axios.remove(`users/userdrinks/${id}`);
              } else if (x == 1) {
                await axios.remove(`users/userbars/${id}`);
              }
              await this.getUser.get(`users/${this.userId}`);
              this.openToast(item);
            },
          },
        ],
      });
      return a.present();
    },
    async openToast(item: string) {
      const toast = await toastController.create({
        message: `${item} was unfavorited.`,
        duration: 2000,
      });
      return toast.present();
    },
  },
});
</script>
<style>
.nontransparent {
  background-color: rgb(16, 16, 16);
}

.ionlabelbuttonfix {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
}

.my-custom-class .alert-wrapper {
  background: rgb(16, 16, 16);
}
</style>
