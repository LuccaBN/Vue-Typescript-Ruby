import { createVuetify } from "vuetify";
import "vuetify/styles";

export default createVuetify({
  theme: {
    defaultTheme: "sagatTheme",
    themes: {
      sagatTheme: {
        dark: false,
        colors: {
          primary: "#112B40",     // azul escuro SAGAT
          secondary: "#DFE2E6",   // cinza claro
          accent: "#B62C2C",      // vermelho (SAIR)
          background: "#F3F4F6",  // fundo geral
          surface: "#FFFFFF",     // cards
          info: "#1E5B8A",        // azul intermediário
        },
      },
    },
  },
});
