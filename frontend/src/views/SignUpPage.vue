<template>
  <base-page title="Kam na drink">
    <form @submit.prevent="handleSignup">
      <ion-card>
        <ion-item>
          <h3>Please Sign Up!</h3>
        </ion-item>
        <ion-item>
          <ion-label position="floating">E-mail</ion-label>
          <ion-input v-model="form.email" id="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            type="password"
            v-model="form.password"
            id="password"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input
            v-model="form.first_name"
            id="first_name"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input
            v-model="form.last_name"
            id="last_name"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-button type="submit" shape="round">
            Sign Up
            <ion-icon slot="end" :icon="personAdd"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          <p>Already have an Account?</p>
        </ion-item>
        <ion-item>
          <ion-button type="button" shape="round" router-link="/signin">
            Sign In
            <ion-icon slot="end" :icon="logIn"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card>
    </form>
  </base-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BasePage from "../components/BasePage.vue";
import { logIn, personAdd } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";
import {
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  alertController,
  IonIcon,
} from "@ionic/vue";
import useAxios from "@/composables/useAxios";

export default defineComponent({
  name: "SignUp",
  components: {
    BasePage,
    IonCard,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonIcon,
  },
  setup() {
    const registrate = useAxios();
    return {
      logIn,
      personAdd,
      registrate,
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    handleSignup() {
      if (this.form.email != "" && this.form.password) {
        const payload = this.form;
        this.registrate
          .post("auth/register", payload)
          .then(async () => {
            const alert = await alertController.create({
              header: "Success",
              subHeader: "Signup Success",
              message: "Your username signup successfully.",
              buttons: ["OK"],
              cssClass: "custom-alert-class",
            });
            this.form.email = "";
            this.form.first_name = "";
            this.form.last_name = "";
            this.form.password = "";

            await alert.present();
            this.$router.push(`/login`);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    },
  },
});
</script>
