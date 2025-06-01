<template>
  <v-container>
    <v-card class="mx-auto mt-12" max-width="600">
      <!-- Botão superior com tipo de conta -->
      <v-card-actions class="d-flex justify-start">
        <v-btn color="primary" variant="elevated" class="text-white rounded-pill" @click="alternarConta">
          Alternar Conta ({{ contaAtual?.account_type || "---" }})
        </v-btn>
      </v-card-actions>

      <v-card-title class="text-h6">Painel da Conta</v-card-title>

      <v-card-text v-if="userInfo && contaAtual">
        <p><strong>Nome do Titular:</strong> {{ userInfo.name }}</p>
        <p>
          <strong>Número da Conta:</strong>
          {{ contaAtual.account_number }}-{{ contaAtual.account_digit }}
        </p>
        <p><strong>Tipo:</strong> {{ contaAtual.account_type }}</p>
        <p>
          <strong>Saldo Disponível:</strong>
          {{
            contaAtual.amount != null
              ? formatarValor(contaAtual.amount)
              : "R$ 0,00"
          }}
        </p>
      </v-card-text>

      <!-- Últimas Transações -->
      <v-card-title class="text-h6 mt-6">Últimas Transações</v-card-title>

      <v-card-text v-if="Array.isArray(transacoes) && transacoes.length">
        <v-list dense>
          <v-list-item v-for="transacao in transacoes" :key="transacao.id">
            <v-list-item-content>
              <v-list-item-title>
                <template v-if="transacao.from_user_bank_account.account_number === contaAtual?.account_number">
                  Enviada para: {{ transacao.to_bank_account.holder_name }} -
                  {{ transacao.to_bank_account.account_number }}-{{ transacao.to_bank_account.account_digit }}
                </template>
                <template v-else>
                  Recebida de: {{ transacao.from_user_bank_account.holder_name }} -
                  {{ transacao.from_user_bank_account.account_number }}-{{ transacao.from_user_bank_account.account_digit }}
                </template>
              </v-list-item-title>
              <v-list-item-subtitle>
                Valor: {{ formatarValor(transacao.amount_to_transfer) }} • Tipo: {{ transacao.transfer_type_text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- Botão "Ver todos" -->
        <v-btn color="primary" variant="elevated" class="text-white rounded-pill mt-2" @click="irParaExtrato">
          VER TODOS
        </v-btn>
      </v-card-text>

      <v-card-text v-else-if="Array.isArray(transacoes) && !transacoes.length">
        Nenhuma transação encontrada.
      </v-card-text>

      <v-card-text v-else>
        Carregando transações...
      </v-card-text>

      <!-- Botões inferiores -->
      <v-card-actions class="d-flex justify-end mt-2">
        <v-btn color="primary" variant="elevated" class="text-white rounded-pill" @click="irParaTransferencia">
          TRANSFERIR
        </v-btn>
        <v-btn color="accent" variant="elevated" class="text-white rounded-pill" @click="logout">
          SAIR
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

interface UserInfo {
  name: string;
}

interface ContaInfo {
  id: number;
  bank_name: string;
  account_number: string;
  account_digit: string;
  amount: number;
  account_type: string;
}

interface Transacao {
  id: number;
  was_success: boolean;
  transfer_type_text: string;
  amount_to_transfer: number;
  created_at: string;
  to_bank_account: {
    holder_name: string;
    account_number: string;
    account_digit: string;
  };
  from_user_bank_account: {
    holder_name: string;
    account_number: string;
    account_digit: string;
  };
}

const router = useRouter();

const userInfo = ref<UserInfo | null>(null);
const contas = ref<ContaInfo[]>([]);
const contaIndex = ref(0);

const contaAtual = computed(() => contas.value[contaIndex.value] || null);
const transacoes = ref<Transacao[] | null>(null);

const obterUsuarioEContas = async () => {
  try {
    const resUser = await api.get("/users/infos");
    userInfo.value = resUser.data.user;

    const resContas = await api.get("/users/bank_accounts/my");
    contas.value = resContas.data.user_bank_accounts;
  } catch (err) {
    console.error("Erro ao carregar dados do usuário", err);
  }
};

const obterUltimasTransacoes = async () => {
  try {
    const res = await api.get("/users/bank_account_transfers/statements?per_page=3&page=1");
    transacoes.value = res.data.bank_account_transfers || [];
  } catch (err) {
    console.error("Erro ao buscar transações", err);
    transacoes.value = [];
  }
};

const alternarConta = () => {
  if (contas.value.length > 1) {
    contaIndex.value = (contaIndex.value + 1) % contas.value.length;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const irParaTransferencia = () => {
  router.push("/transferencia");
};

const irParaExtrato = () => {
  router.push("/extrato");
};

const formatarValor = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

onMounted(async () => {
  await obterUsuarioEContas();
  await obterUltimasTransacoes();
});
</script>
