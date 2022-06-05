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
import BasePage from "../components/BasePage.vue";
import { mapActions } from "vuex";
import { useRouter } from "vue-router";
import { logIn, personAdd } from "ionicons/icons";
import {
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonIcon,
} from "@ionic/vue";
import useAxios from "@/composables/useAxios";
export default defineComponent({
  name: "SignIn",
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
    const router = useRouter();
    const loginUser = useAxios();
    const registerUser = useAxios();
    return { router, loginUser, registerUser, logIn, personAdd };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    async handleLogin() {
      if (this.form.email != "" && this.form.password) {
        const payload = this.form;
        await this.loginUser.post("auth/login", payload);
        this.login(this.loginUser.result.value);
      }
    },
    ...mapActions("auth", ["login"]),
  },
});
</script>
