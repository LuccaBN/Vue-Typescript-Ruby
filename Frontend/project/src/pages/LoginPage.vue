<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400">
      <v-card-title class="justify-center">Entrar</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required />
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            required
          />

          <!-- Botão Entrar estilizado -->
          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
            class="mt-4 text-white rounded-pill"
            block
          >
            Entrar
          </v-btn>

          <!-- Botão Criar Conta estilizado -->
          <v-btn
            color="primary"
            variant="elevated"
            class="mt-2 text-white rounded-pill"
            block
            @click="router.push('/cadastro')"
          >
            Criar Conta
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const router = useRouter();
const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const response = await api.put("/auth/sign_in", {
      user: {
        email: email.value,
        password: password.value,
      },
    });

    const token = response.data.token;

    // Armazena o token e define nos headers
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    router.push("/dashboard");
  } catch (err: any) {
    alert("Email ou senha inválidos");
    console.error(err);
  }
};
</script>
