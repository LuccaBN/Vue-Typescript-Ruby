<template>
  <v-container>
    <v-card class="mx-auto mt-12" max-width="600">
      <v-card-title class="text-h6">Transferência entre Contas</v-card-title>

      <v-card-text v-if="userInfo && contasOrigem.length">
        <p><strong>Nome do Titular:</strong> {{ userInfo.name }}</p>

        <v-select
          v-model="contaSelecionada"
          :items="contasOrigem"
          item-title="label"
          item-value="id"
          label="Conta de origem"
          required
        />

        <v-text-field
          v-model="numeroContaDestino"
          label="Número da Conta de Destino (ex: 714373-8)"
          required
        />
        <v-text-field
          v-model="valor"
          label="Valor (R$)"
          type="number"
          required
        />
        <v-text-field
          v-model="descricao"
          label="Descrição (opcional)"
        />
      </v-card-text>

      <v-card-text v-else>
        Carregando informações...
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <v-btn
          color="primary"
          variant="elevated"
          class="text-white rounded-pill"
          @click="voltar"
        >
          Voltar
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          class="text-white rounded-pill"
          @click="confirmarTransferencia"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

// MODELS
interface Conta {
  id: number;
  account_number: string;
  account_digit: string;
  account_type: string;
  amount: number;
}

interface User {
  name: string;
}

const router = useRouter();

// ESTADO
const userInfo = ref<User | null>(null);
const contasOrigem = ref<Conta[]>([]);
const contaSelecionada = ref<number | null>(null);
const contasDestino = ref<Conta[]>([]);

const numeroContaDestino = ref("");
const valor = ref<number | null>(null);
const descricao = ref("");

// INICIALIZAÇÃO
onMounted(async () => {
  try {
    const userRes = await api.get("/users/infos");
    userInfo.value = userRes.data.user;

    const resMinhas = await api.get("/users/bank_accounts/my");
    contasOrigem.value = resMinhas.data.user_bank_accounts.map((c: Conta) => ({
      ...c,
      label: `Conta ${c.account_type} - ${c.account_number}-${c.account_digit} (R$ ${c.amount.toFixed(2)})`
    }));

    contaSelecionada.value = contasOrigem.value[0]?.id ?? null;

    const resTodas = await api.get("/users/bank_accounts");
    contasDestino.value = resTodas.data.user_bank_accounts;
  } catch (err) {
    console.error("Erro ao carregar dados", err);
  }
});

// TRANSFERÊNCIA
const confirmarTransferencia = async () => {
  if (!numeroContaDestino.value || valor.value == null || !contaSelecionada.value) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const contaDestino = contasDestino.value.find(c =>
    `${c.account_number}-${c.account_digit}` === numeroContaDestino.value
  );

  if (!contaDestino) {
    alert("Conta de destino não encontrada. Verifique o número.");
    return;
  }

  try {
    await api.post("/users/bank_account_transfers", {
      bank_account_transfer: {
        to_user_bank_account_id: contaDestino.id,
        from_user_bank_account_id: contaSelecionada.value,
        transfer_type: 1,
        amount_to_transfer: Number(valor.value)
      },
      make_success: true
    });

    alert("Transferência realizada com sucesso!");
    router.push("/dashboard");
  } catch (err) {
    console.error("Erro ao realizar transferência", err);
    alert("Falha ao realizar a transferência.");
  }
};

// VOLTAR
const voltar = () => {
  router.push("/dashboard");
};
</script>
