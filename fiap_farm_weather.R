#!/usr/bin/env Rscript
# -*- coding: utf-8 -*-

# FIAP Farm - Integração com API Meteorológica
# FarmTech Solutions
# 
# Aplicação em R para conectar-se a uma API meteorológica pública,
# coletar dados climáticos e exibir informações via texto simples no terminal

# Carregar bibliotecas necessárias
library(httr)
library(jsonlite)
library(dplyr)

# Configurações das fazendas
FAZENDAS <- list(
  "Barra Grande" = list(
    nome = "Fazenda Barra Grande",
    cidade = "Itirapuã",
    estado = "SP",
    cultura = "Cana-de-Açúcar",
    lat = -23.1,  # Coordenadas aproximadas
    lon = -46.8
  ),
  "Arcanjo Miguel" = list(
    nome = "Fazenda Arcanjo Miguel",
    cidade = "São Miguel Arcanjo",
    estado = "SP",
    cultura = "Laranja",
    lat = -23.9,  # Coordenadas aproximadas
    lon = -47.9
  )
)

# Função para obter dados meteorológicos usando OpenWeatherMap API (gratuita)
# Nota: Para uso em produção, registre-se em https://openweathermap.org/api
obter_dados_openweather <- function(lat, lon, api_key = "demo") {
  # URL da API OpenWeatherMap (versão gratuita)
  url <- sprintf("https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s&units=metric&lang=pt",
                 lat, lon, api_key)
  
  tryCatch({
    # Fazer requisição HTTP
    response <- GET(url)
    
    # Verificar se a requisição foi bem-sucedida
    if (status_code(response) == 200) {
      # Parsear JSON
      dados <- fromJSON(content(response, "text", encoding = "UTF-8"))
      return(dados)
    } else if (status_code(response) == 401) {
      cat("Erro: API key inválida. Use uma chave válida do OpenWeatherMap.\n")
      return(NULL)
    } else {
      cat("Erro na requisição:", status_code(response), "\n")
      return(NULL)
    }
  }, error = function(e) {
    cat("Erro ao conectar com a API:", e$message, "\n")
    return(NULL)
  })
}

# Função alternativa usando API pública sem chave (simulação)
obter_dados_simulados <- function(fazenda_info) {
  # Simular dados meteorológicos realistas para as regiões
  set.seed(as.numeric(Sys.time()))
  
  # Dados base por cultura
  if (fazenda_info$cultura == "Cana-de-Açúcar") {
    temp_base <- 25
    umidade_base <- 70
  } else {  # Laranja
    temp_base <- 22
    umidade_base <- 65
  }
  
  # Adicionar variação aleatória
  temperatura <- round(temp_base + rnorm(1, 0, 3), 1)
  umidade <- round(umidade_base + rnorm(1, 0, 10), 0)
  pressao <- round(1013 + rnorm(1, 0, 15), 1)
  vento_vel <- round(abs(rnorm(1, 8, 3)), 1)
  vento_dir <- sample(0:359, 1)
  
  # Condições climáticas possíveis
  condicoes <- c("Ensolarado", "Parcialmente nublado", "Nublado", "Chuvisco", "Chuva leve")
  condicao <- sample(condicoes, 1, prob = c(0.3, 0.25, 0.2, 0.15, 0.1))
  
  # Simular estrutura similar à API real
  dados_simulados <- list(
    name = fazenda_info$cidade,
    main = list(
      temp = temperatura,
      feels_like = temperatura + rnorm(1, 0, 2),
      humidity = umidade,
      pressure = pressao,
      temp_min = temperatura - abs(rnorm(1, 2, 1)),
      temp_max = temperatura + abs(rnorm(1, 2, 1))
    ),
    weather = list(
      list(
        main = condicao,
        description = tolower(condicao)
      )
    ),
    wind = list(
      speed = vento_vel,
      deg = vento_dir
    ),
    clouds = list(
      all = sample(0:100, 1)
    ),
    visibility = sample(5000:10000, 1),
    dt = as.numeric(Sys.time()),
    sys = list(
      country = "BR",
      sunrise = as.numeric(Sys.time()) - 6*3600,
      sunset = as.numeric(Sys.time()) + 12*3600
    )
  )
  
  return(dados_simulados)
}

# Função para processar e formatar dados meteorológicos
processar_dados_meteorologicos <- function(dados_brutos, fazenda_info) {
  if (is.null(dados_brutos)) {
    return(NULL)
  }
  
  # Extrair informações principais
  dados_processados <- list(
    fazenda = fazenda_info$nome,
    cidade = fazenda_info$cidade,
    cultura = fazenda_info$cultura,
    timestamp = Sys.time(),
    temperatura_atual = dados_brutos$main$temp,
    sensacao_termica = dados_brutos$main$feels_like,
    temperatura_min = dados_brutos$main$temp_min,
    temperatura_max = dados_brutos$main$temp_max,
    umidade = dados_brutos$main$humidity,
    pressao = dados_brutos$main$pressure,
    condicao = dados_brutos$weather[[1]]$main,
    descricao = dados_brutos$weather[[1]]$description,
    vento_velocidade = dados_brutos$wind$speed,
    vento_direcao = dados_brutos$wind$deg,
    nuvens = dados_brutos$clouds$all,
    visibilidade = dados_brutos$visibility
  )
  
  return(dados_processados)
}

# Função para exibir dados meteorológicos formatados
exibir_dados_meteorologicos <- function(dados) {
  if (is.null(dados)) {
    cat("Dados meteorológicos não disponíveis.\n")
    return()
  }
  
  cat("\n", rep("=", 60), "\n")
  cat("           DADOS METEOROLÓGICOS - FIAP FARM\n")
  cat("                FarmTech Solutions\n")
  cat(rep("=", 60), "\n")
  
  cat(sprintf("Fazenda: %s\n", dados$fazenda))
  cat(sprintf("Localização: %s, SP\n", dados$cidade))
  cat(sprintf("Cultura: %s\n", dados$cultura))
  cat(sprintf("Atualizado em: %s\n", format(dados$timestamp, "%d/%m/%Y %H:%M:%S")))
  
  cat("\n--- CONDIÇÕES ATUAIS ---\n")
  cat(sprintf("Condição: %s\n", dados$condicao))
  cat(sprintf("Descrição: %s\n", dados$descricao))
  
  cat("\n--- TEMPERATURA ---\n")
  cat(sprintf("Atual: %.1f°C\n", dados$temperatura_atual))
  cat(sprintf("Sensação térmica: %.1f°C\n", dados$sensacao_termica))
  cat(sprintf("Mínima: %.1f°C\n", dados$temperatura_min))
  cat(sprintf("Máxima: %.1f°C\n", dados$temperatura_max))
  
  cat("\n--- UMIDADE E PRESSÃO ---\n")
  cat(sprintf("Umidade relativa: %d%%\n", dados$umidade))
  cat(sprintf("Pressão atmosférica: %.1f hPa\n", dados$pressao))
  
  cat("\n--- VENTO ---\n")
  cat(sprintf("Velocidade: %.1f m/s (%.1f km/h)\n", dados$vento_velocidade, dados$vento_velocidade * 3.6))
  
  # Converter direção do vento
  direcao_texto <- converter_direcao_vento(dados$vento_direcao)
  cat(sprintf("Direção: %d° (%s)\n", dados$vento_direcao, direcao_texto))
  
  cat("\n--- OUTRAS INFORMAÇÕES ---\n")
  cat(sprintf("Nebulosidade: %d%%\n", dados$nuvens))
  if (!is.null(dados$visibilidade)) {
    cat(sprintf("Visibilidade: %.1f km\n", dados$visibilidade / 1000))
  }
  
  cat("\n", rep("=", 60), "\n")
}

# Função para converter direção do vento em graus para texto
converter_direcao_vento <- function(graus) {
  if (is.null(graus) || is.na(graus)) {
    return("N/A")
  }
  
  direcoes <- c("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW")
  
  indice <- round(graus / 22.5) %% 16 + 1
  return(direcoes[indice])
}

# Função para análise agroclimática
analisar_condicoes_agricolas <- function(dados) {
  if (is.null(dados)) {
    return()
  }
  
  cat("\n--- ANÁLISE AGROCLIMÁTICA ---\n")
  
  # Análise por cultura
  if (dados$cultura == "Cana-de-Açúcar") {
    cat("Cultura: Cana-de-Açúcar\n")
    
    # Temperatura ideal: 20-30°C
    if (dados$temperatura_atual >= 20 && dados$temperatura_atual <= 30) {
      cat("✓ Temperatura: IDEAL para cana-de-açúcar\n")
    } else if (dados$temperatura_atual < 20) {
      cat("⚠ Temperatura: BAIXA para cana-de-açúcar\n")
    } else {
      cat("⚠ Temperatura: ALTA para cana-de-açúcar\n")
    }
    
    # Umidade ideal: 60-80%
    if (dados$umidade >= 60 && dados$umidade <= 80) {
      cat("✓ Umidade: IDEAL para cana-de-açúcar\n")
    } else if (dados$umidade < 60) {
      cat("⚠ Umidade: BAIXA - considere irrigação\n")
    } else {
      cat("⚠ Umidade: ALTA - atenção a doenças fúngicas\n")
    }
    
  } else if (dados$cultura == "Laranja") {
    cat("Cultura: Laranja\n")
    
    # Temperatura ideal: 15-25°C
    if (dados$temperatura_atual >= 15 && dados$temperatura_atual <= 25) {
      cat("✓ Temperatura: IDEAL para laranja\n")
    } else if (dados$temperatura_atual < 15) {
      cat("⚠ Temperatura: BAIXA para laranja\n")
    } else {
      cat("⚠ Temperatura: ALTA para laranja\n")
    }
    
    # Umidade ideal: 50-70%
    if (dados$umidade >= 50 && dados$umidade <= 70) {
      cat("✓ Umidade: IDEAL para laranja\n")
    } else if (dados$umidade < 50) {
      cat("⚠ Umidade: BAIXA - considere irrigação\n")
    } else {
      cat("⚠ Umidade: ALTA - atenção a doenças\n")
    }
  }
  
  # Análise de vento
  vento_kmh <- dados$vento_velocidade * 3.6
  if (vento_kmh < 10) {
    cat("✓ Vento: CALMO - bom para aplicação de defensivos\n")
  } else if (vento_kmh <= 20) {
    cat("⚠ Vento: MODERADO - cuidado com aplicações\n")
  } else {
    cat("⚠ Vento: FORTE - evite aplicações de defensivos\n")
  }
  
  # Recomendações gerais
  cat("\n--- RECOMENDAÇÕES ---\n")
  
  if (dados$condicao %in% c("Rain", "Drizzle", "Chuva leve", "Chuvisco")) {
    cat("• Evite aplicação de defensivos e fertilizantes\n")
    cat("• Monitore drenagem dos campos\n")
  }
  
  if (dados$umidade > 80) {
    cat("• Monitore pragas e doenças fúngicas\n")
    cat("• Considere aplicação preventiva de fungicidas\n")
  }
  
  if (dados$temperatura_atual > 30) {
    cat("• Monitore estresse hídrico das plantas\n")
    cat("• Considere irrigação adicional\n")
  }
  
  if (vento_kmh > 20) {
    cat("• Adie aplicações de defensivos\n")
    cat("• Verifique estruturas de suporte das plantas\n")
  }
}

# Função para salvar dados em arquivo
salvar_dados_meteorologicos <- function(dados, arquivo = "dados_meteorologicos.txt") {
  if (is.null(dados)) {
    return()
  }
  
  # Criar string com dados formatados
  conteudo <- sprintf(
    "DADOS METEOROLÓGICOS - %s\n" %+%
    "Fazenda: %s\n" %+%
    "Cidade: %s\n" %+%
    "Cultura: %s\n" %+%
    "Data/Hora: %s\n" %+%
    "Temperatura: %.1f°C (Sensação: %.1f°C)\n" %+%
    "Umidade: %d%%\n" %+%
    "Pressão: %.1f hPa\n" %+%
    "Vento: %.1f m/s (%d°)\n" %+%
    "Condição: %s\n" %+%
    "Nebulosidade: %d%%\n" %+%
    "\n",
    format(Sys.time(), "%Y-%m-%d %H:%M:%S"),
    dados$fazenda,
    dados$cidade,
    dados$cultura,
    format(dados$timestamp, "%d/%m/%Y %H:%M:%S"),
    dados$temperatura_atual,
    dados$sensacao_termica,
    dados$umidade,
    dados$pressao,
    dados$vento_velocidade,
    dados$vento_direcao,
    dados$condicao,
    dados$nuvens
  )
  
  # Definir operador de concatenação
  `%+%` <- function(a, b) paste0(a, b)
  
  # Recriar conteúdo com operador definido
  conteudo <- paste0(
    "DADOS METEOROLÓGICOS - ", format(Sys.time(), "%Y-%m-%d %H:%M:%S"), "\n",
    "Fazenda: ", dados$fazenda, "\n",
    "Cidade: ", dados$cidade, "\n",
    "Cultura: ", dados$cultura, "\n",
    "Data/Hora: ", format(dados$timestamp, "%d/%m/%Y %H:%M:%S"), "\n",
    "Temperatura: ", sprintf("%.1f", dados$temperatura_atual), "°C (Sensação: ", sprintf("%.1f", dados$sensacao_termica), "°C)\n",
    "Umidade: ", dados$umidade, "%\n",
    "Pressão: ", sprintf("%.1f", dados$pressao), " hPa\n",
    "Vento: ", sprintf("%.1f", dados$vento_velocidade), " m/s (", dados$vento_direcao, "°)\n",
    "Condição: ", dados$condicao, "\n",
    "Nebulosidade: ", dados$nuvens, "%\n",
    "\n"
  )
  
  tryCatch({
    # Anexar ao arquivo existente
    write(conteudo, file = arquivo, append = TRUE)
    cat("Dados salvos em:", arquivo, "\n")
  }, error = function(e) {
    cat("Erro ao salvar dados:", e$message, "\n")
  })
}

# Função para coletar dados de todas as fazendas
coletar_dados_todas_fazendas <- function(usar_api_real = FALSE, api_key = "demo") {
  cat("\nColetando dados meteorológicos de todas as fazendas...\n")
  
  dados_todas_fazendas <- list()
  
  for (nome_fazenda in names(FAZENDAS)) {
    fazenda_info <- FAZENDAS[[nome_fazenda]]
    cat(sprintf("\nProcessando: %s...\n", fazenda_info$nome))
    
    if (usar_api_real && api_key != "demo") {
      # Usar API real
      dados_brutos <- obter_dados_openweather(fazenda_info$lat, fazenda_info$lon, api_key)
    } else {
      # Usar dados simulados
      cat("(Usando dados simulados)\n")
      dados_brutos <- obter_dados_simulados(fazenda_info)
    }
    
    if (!is.null(dados_brutos)) {
      dados_processados <- processar_dados_meteorologicos(dados_brutos, fazenda_info)
      dados_todas_fazendas[[nome_fazenda]] <- dados_processados
      
      # Exibir dados
      exibir_dados_meteorologicos(dados_processados)
      analisar_condicoes_agricolas(dados_processados)
      
      # Salvar dados
      salvar_dados_meteorologicos(dados_processados)
      
      cat("\nPressione Enter para continuar...")
      readline()
    } else {
      cat("Falha ao obter dados para", fazenda_info$nome, "\n")
    }
  }
  
  return(dados_todas_fazendas)
}

# Função para comparar condições entre fazendas
comparar_fazendas <- function(dados_fazendas) {
  if (length(dados_fazendas) < 2) {
    cat("Dados insuficientes para comparação.\n")
    return()
  }
  
  cat("\n", rep("=", 60), "\n")
  cat("           COMPARAÇÃO ENTRE FAZENDAS\n")
  cat(rep("=", 60), "\n")
  
  # Criar tabela comparativa
  cat(sprintf("%-20s %-15s %-10s %-10s %-10s\n", "Fazenda", "Cultura", "Temp(°C)", "Umid(%)", "Condição"))
  cat(rep("-", 60), "\n")
  
  for (nome in names(dados_fazendas)) {
    dados <- dados_fazendas[[nome]]
    cat(sprintf("%-20s %-15s %-10.1f %-10d %-10s\n",
                substr(dados$fazenda, 1, 20),
                substr(dados$cultura, 1, 15),
                dados$temperatura_atual,
                dados$umidade,
                substr(dados$condicao, 1, 10)))
  }
  
  cat(rep("-", 60), "\n")
  
  # Análise comparativa
  temperaturas <- sapply(dados_fazendas, function(x) x$temperatura_atual)
  umidades <- sapply(dados_fazendas, function(x) x$umidade)
  
  cat("\n--- ANÁLISE COMPARATIVA ---\n")
  cat(sprintf("Temperatura média: %.1f°C\n", mean(temperaturas)))
  cat(sprintf("Umidade média: %.1f%%\n", mean(umidades)))
  
  # Fazenda com melhor condição
  melhor_temp <- names(dados_fazendas)[which.min(abs(temperaturas - 22.5))]  # Temperatura ideal média
  cat(sprintf("Melhor temperatura: %s (%.1f°C)\n", melhor_temp, temperaturas[melhor_temp]))
  
  melhor_umidade <- names(dados_fazendas)[which.min(abs(umidades - 65))]  # Umidade ideal média
  cat(sprintf("Melhor umidade: %s (%d%%)\n", melhor_umidade, umidades[melhor_umidade]))
}

# Função principal com menu
main <- function() {
  cat("\nFIAP Farm - Sistema Meteorológico\n")
  cat("FarmTech Solutions\n")
  cat("================================\n")
  
  repeat {
    cat("\n--- MENU METEOROLÓGICO ---\n")
    cat("1. Consultar dados de uma fazenda\n")
    cat("2. Consultar dados de todas as fazendas\n")
    cat("3. Comparar condições entre fazendas\n")
    cat("4. Configurar API key (OpenWeatherMap)\n")
    cat("5. Histórico de dados salvos\n")
    cat("0. Sair\n")
    
    opcao <- readline("\nEscolha uma opção: ")
    
    if (opcao == "1") {
      # Listar fazendas
      cat("\nFazendas disponíveis:\n")
      for (i in seq_along(FAZENDAS)) {
        fazenda <- FAZENDAS[[i]]
        cat(sprintf("%d. %s (%s)\n", i, fazenda$nome, fazenda$cultura))
      }
      
      escolha <- readline("\nEscolha uma fazenda (número): ")
      escolha_num <- as.numeric(escolha)
      
      if (!is.na(escolha_num) && escolha_num >= 1 && escolha_num <= length(FAZENDAS)) {
        fazenda_info <- FAZENDAS[[escolha_num]]
        
        # Obter dados (simulados por padrão)
        dados_brutos <- obter_dados_simulados(fazenda_info)
        dados_processados <- processar_dados_meteorologicos(dados_brutos, fazenda_info)
        
        if (!is.null(dados_processados)) {
          exibir_dados_meteorologicos(dados_processados)
          analisar_condicoes_agricolas(dados_processados)
          salvar_dados_meteorologicos(dados_processados)
        }
      } else {
        cat("Opção inválida!\n")
      }
      
    } else if (opcao == "2") {
      dados_todas <- coletar_dados_todas_fazendas()
      
    } else if (opcao == "3") {
      dados_todas <- coletar_dados_todas_fazendas()
      comparar_fazendas(dados_todas)
      
    } else if (opcao == "4") {
      cat("\nPara usar a API real do OpenWeatherMap:\n")
      cat("1. Registre-se em: https://openweathermap.org/api\n")
      cat("2. Obtenha sua API key gratuita\n")
      cat("3. Modifique a variável api_key no código\n")
      cat("\nAtualmente usando dados simulados.\n")
      
    } else if (opcao == "5") {
      if (file.exists("dados_meteorologicos.txt")) {
        cat("\n--- HISTÓRICO DE DADOS ---\n")
        historico <- readLines("dados_meteorologicos.txt")
        cat(paste(tail(historico, 50), collapse = "\n"))  # Últimas 50 linhas
      } else {
        cat("\nNenhum histórico encontrado.\n")
      }
      
    } else if (opcao == "0") {
      cat("\nObrigado por usar o sistema meteorológico FIAP Farm!\n")
      break
      
    } else {
      cat("\nOpção inválida! Tente novamente.\n")
    }
  }
}

# Função para execução rápida (demonstração)
executar_demo <- function() {
  cat("\n=== DEMONSTRAÇÃO DO SISTEMA METEOROLÓGICO ===\n")
  
  # Coletar dados de todas as fazendas
  dados_todas <- list()
  
  for (nome_fazenda in names(FAZENDAS)) {
    fazenda_info <- FAZENDAS[[nome_fazenda]]
    dados_brutos <- obter_dados_simulados(fazenda_info)
    dados_processados <- processar_dados_meteorologicos(dados_brutos, fazenda_info)
    
    if (!is.null(dados_processados)) {
      dados_todas[[nome_fazenda]] <- dados_processados
      exibir_dados_meteorologicos(dados_processados)
      analisar_condicoes_agricolas(dados_processados)
    }
  }
  
  # Comparar fazendas
  if (length(dados_todas) > 1) {
    comparar_fazendas(dados_todas)
  }
  
  cat("\n=== FIM DA DEMONSTRAÇÃO ===\n")
}

# Executar se chamado diretamente
if (!interactive()) {
  main()
}

# Mensagem de ajuda
cat("\n=== INSTRUÇÕES DE USO ===\n")
cat("1. Use main() para menu interativo completo\n")
cat("2. Use executar_demo() para demonstração rápida\n")
cat("3. Para API real, configure sua chave do OpenWeatherMap\n")
cat("4. Dados são salvos automaticamente em 'dados_meteorologicos.txt'\n")
cat("========================\n")