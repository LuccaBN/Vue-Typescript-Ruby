<template>
  <v-container class="d-flex justify-center align-center" fill-height>
    <v-card class="pa-6" width="400">
      <v-card-title class="text-h6">Criar Conta</v-card-title>

      <v-form ref="formRef" v-model="formValido">
        <v-text-field
          v-model="nome"
          label="Nome"
          :rules="[v => !!v || 'Nome é obrigatório']"
        />
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :rules="[v => !!v || 'Email é obrigatório']"
        />
        <v-text-field
          v-model="senha"
          label="Senha"
          type="password"
          :rules="[v => !!v || 'Senha é obrigatória']"
        />
        <v-text-field
          v-model="confirmarSenha"
          label="Confirmar Senha"
          type="password"
          :rules="[v => v === senha || 'Senhas não coincidem']"
        />

        <!-- Botão Cadastrar estilizado -->
        <v-btn
          color="primary"
          variant="elevated"
          class="mt-4 text-white rounded-pill"
          :disabled="!formValido"
          block
          @click="cadastrar"
        >
          Cadastrar
        </v-btn>

        <!-- Botão Voltar estilizado -->
        <v-btn
          color="primary"
          variant="elevated"
          class="mt-2 text-white rounded-pill"
          block
          @click="router.push('/login')"
        >
          Voltar para Login
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const formValido = ref(false)
const formRef = ref()

const router = useRouter()

const cadastrar = async () => {
  if (!formRef.value?.validate()) return

  try {
    await api.post('/auth/sign_up', {
      user: {
        name: nome.value,
        email: email.value,
        password: senha.value
      }
    })

    const resLogin = await api.put('/auth/sign_in', {
      user: {
        email: email.value,
        password: senha.value
      }
    })

    localStorage.setItem('token', resLogin.data.token)
    router.push('/dashboard')
  } catch (err) {
    alert('Erro ao cadastrar ou fazer login.')
    console.error(err)
  }
}
</script>
