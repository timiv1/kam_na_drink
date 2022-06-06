<template>
  <base-page title="Kam na drink">
    <form @submit.prevent="handleLogin">
      <ion-card>
        <ion-item>
          <h3>Please Sign In!</h3>
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
          <ion-button type="submit" shape="round">
            Sign In
            <ion-icon slot="end" :icon="logIn"></ion-icon>
          </ion-button>
        </ion-item>
        <ion-item>
          <p>Or</p>
        </ion-item>
        <ion-item>
          <ion-button type="button" shape="round" router-link="/signup">
            Sign Up
            <ion-icon slot="end" :icon="personAdd"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-card>
    </form>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useAxios from "../composables/useAxios";
import BasePage from "../components/BasePage.vue";
import { mapActions } from "vuex";
import { logIn, personAdd } from "ionicons/icons";
import {
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
  alertController,
} from "@ionic/vue";
export default defineComponent({
  name: "LoginPage",
  components: {
    IonCard,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonIcon,
    BasePage,
  },
  setup() {
    const loginUser = useAxios();
    return { loginUser, logIn, personAdd };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      } as any,
    };
  },
  methods: {
    async handleLogin() {
      if (this.form.email != "" && this.form.password != "") {
        const payload = this.form;
        await this.loginUser.post("auth/login", payload);
        console.log(`error handle login: ${this.loginUser.error.value}`);
        if (this.loginUser.error.value != null) {
          const alert = await alertController.create({
            header: "Error",
            subHeader: "Login failed",
            message: "Failed login, please check email and password",
            buttons: ["OK"],
            cssClass: "nontransparent",
          });
          await alert.present();
        } else {
          this.login(this.loginUser.result.value);
        }
      }
      this.$router.push(`/`);
    },
    ...mapActions("auth", ["login"]),
  },
});
</script>
