FROM ruby:3.1

# Instala dependências do sistema e Node.js para o Rails
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libsqlite3-dev \
  nodejs

# Cria diretório da aplicação
WORKDIR /app

# Copia o código
COPY . .

# Instala as gems
RUN bundle install

# Expondo a porta padrão do Rails
EXPOSE 3000

# Remove PID antigo e inicia o servidor
CMD ["bash", "-c", "rm -f tmp/pids/server.pid && rails server -b 0.0.0.0"]
