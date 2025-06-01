<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="900">
      <v-card-title class="text-h6">Extrato Completo</v-card-title>

      <!-- Filtros -->
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              label="Data Inicial"
              type="date"
              v-model="filtros.start_date"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Data Final"
              type="date"
              v-model="filtros.end_date"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              label="Tipo"
              :items="tipos"
              item-value="valor"
              item-title="label"
              v-model="filtros.transfer_type"
              clearable
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Valor Mínimo"
              type="number"
              v-model.number="filtros.min_value"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Valor Máximo"
              type="number"
              v-model.number="filtros.max_value"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Lista de Transações -->
      <v-card-text v-if="transacoes.length">
        <v-list dense>
          <v-list-item
            v-for="transacao in transacoes"
            :key="transacao.id"
            class="mb-2"
          >
            <v-list-item-content>
              <v-list-item-title>
                <template
                  v-if="
                    transacao.from_user_bank_account?.account_number ===
                    numeroContaAtual
                  "
                >
                  Enviada para: {{ transacao.to_bank_account?.holder_name }}
                </template>
                <template v-else>
                  Recebida de: {{
                    transacao.from_user_bank_account?.holder_name
                  }}
                </template>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formatarData(transacao.created_at) }} •
                {{ formatarValor(transacao.amount_to_transfer) }} •
                {{ transacao.transfer_type_text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-text v-else>
        Nenhuma transação encontrada com os filtros aplicados.
      </v-card-text>

      <!-- Paginação -->
      <v-card-actions class="justify-space-between">
        <v-btn
          :disabled="paginaAtual === 1"
          @click="paginaAnterior"
          color="primary"
          variant="elevated"
          class="text-white rounded-pill"
        >
          Anterior
        </v-btn>
        <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        <v-btn
          :disabled="paginaAtual >= totalPaginas"
          @click="proximaPagina"
          color="primary"
          variant="elevated"
          class="text-white rounded-pill"
        >
          Próxima
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn
          color="primary"
          variant="elevated"
          class="text-white rounded-pill"
          @click="voltar"
        >
          Voltar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

const router = useRouter();

interface Transacao {
  id: number;
  transfer_type_text: string;
  amount_to_transfer: number;
  created_at: string;
  to_bank_account: { holder_name: string; account_number: string };
  from_user_bank_account: { holder_name: string; account_number: string };
}

const transacoes = ref<Transacao[]>([]);
const paginaAtual = ref(1);
const totalPaginas = ref(1);
const itensPorPagina = 5;
const numeroContaAtual = ref("");

const filtros = ref({
  start_date: "",
  end_date: "",
  transfer_type: "",
  min_value: null as number | null,
  max_value: null as number | null,
});

const tipos = [
  { label: "Enviadas", valor: "sent" },
  { label: "Recebidas", valor: "received" },
];

const buscarNumeroConta = async () => {
  try {
    const res = await api.get("/users/bank_accounts/my");
    numeroContaAtual.value =
      res.data.user_bank_accounts?.[0]?.account_number ?? "";
  } catch (err) {
    console.error("Erro ao obter conta do usuário", err);
  }
};

const buscarTransacoes = async () => {
  try {
    const params = new URLSearchParams();
    if (filtros.value.start_date)
      params.append("start_date", filtros.value.start_date);
    if (filtros.value.end_date)
      params.append("end_date", filtros.value.end_date);
    if (filtros.value.transfer_type)
      params.append("transfer_type", filtros.value.transfer_type);
    if (filtros.value.min_value != null)
      params.append("min_value", filtros.value.min_value.toString());
    if (filtros.value.max_value != null)
      params.append("max_value", filtros.value.max_value.toString());

    params.append("page", paginaAtual.value.toString());
    params.append("per_page", itensPorPagina.toString());

    const res = await api.get(
      `/users/bank_account_transfers/statements?${params.toString()}`
    );
    transacoes.value = res.data.bank_account_transfers || [];
    totalPaginas.value = res.data.total_pages || 1;
  } catch (err) {
    console.error("Erro ao buscar transações", err);
    transacoes.value = [];
  }
};

watch(filtros, () => {
  paginaAtual.value = 1;
  buscarTransacoes();
}, { deep: true });

watch(paginaAtual, () => {
  buscarTransacoes();
});

const paginaAnterior = () => {
  if (paginaAtual.value > 1) paginaAtual.value--;
};

const proximaPagina = () => {
  if (paginaAtual.value < totalPaginas.value) paginaAtual.value++;
};

const voltar = () => {
  router.push("/dashboard");
};

const formatarValor = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

const formatarData = (data: string) => {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
};

onMounted(async () => {
  await buscarNumeroConta();
  await buscarTransacoes();
});
</script>
