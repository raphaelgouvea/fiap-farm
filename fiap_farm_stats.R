#!/usr/bin/env Rscript
# -*- coding: utf-8 -*-

# FIAP Farm - Análises Estatísticas
# FarmTech Solutions
# 
# Aplicação em R para calcular dados estatísticos básicos
# como média e desvio padrão dos dados agrícolas

# Carregar bibliotecas necessárias
library(jsonlite)
library(dplyr)
library(ggplot2)

# Função para carregar dados do arquivo JSON gerado pelo Python
carregar_dados <- function(arquivo = "fiap_farm_dados.json") {
  if (!file.exists(arquivo)) {
    cat("Arquivo de dados não encontrado:", arquivo, "\n")
    cat("Execute primeiro o sistema Python para gerar os dados.\n")
    return(NULL)
  }
  
  tryCatch({
    dados <- fromJSON(arquivo)
    return(dados)
  }, error = function(e) {
    cat("Erro ao carregar dados:", e$message, "\n")
    return(NULL)
  })
}

# Função para calcular estatísticas de área de plantio
calcular_stats_plantio <- function(dados_plantio) {
  if (length(dados_plantio) == 0) {
    cat("Nenhum dado de plantio disponível.\n")
    return(NULL)
  }
  
  # Converter para data frame
  df_plantio <- data.frame(
    id = sapply(dados_plantio, function(x) x$id),
    tipo = sapply(dados_plantio, function(x) x$tipo),
    area_m2 = sapply(dados_plantio, function(x) x$area_m2),
    area_ha = sapply(dados_plantio, function(x) x$area_ha)
  )
  
  # Estatísticas gerais
  stats <- list(
    total_registros = nrow(df_plantio),
    area_total_ha = sum(df_plantio$area_ha),
    area_media_ha = mean(df_plantio$area_ha),
    area_mediana_ha = median(df_plantio$area_ha),
    area_desvio_padrao_ha = sd(df_plantio$area_ha),
    area_variancia_ha = var(df_plantio$area_ha),
    area_min_ha = min(df_plantio$area_ha),
    area_max_ha = max(df_plantio$area_ha)
  )
  
  # Estatísticas por tipo
  stats_por_tipo <- df_plantio %>%
    group_by(tipo) %>%
    summarise(
      count = n(),
      area_total_ha = sum(area_ha),
      area_media_ha = mean(area_ha),
      area_desvio_padrao_ha = sd(area_ha),
      area_min_ha = min(area_ha),
      area_max_ha = max(area_ha),
      .groups = 'drop'
    )
  
  return(list(
    dados = df_plantio,
    estatisticas_gerais = stats,
    estatisticas_por_tipo = stats_por_tipo
  ))
}

# Função para calcular estatísticas de insumos
calcular_stats_insumos <- function(dados_insumos) {
  if (length(dados_insumos) == 0) {
    cat("Nenhum dado de insumos disponível.\n")
    return(NULL)
  }
  
  # Extrair hectares de todos os registros
  hectares <- sapply(dados_insumos, function(x) x$hectares)
  
  # Estatísticas de hectares
  stats_hectares <- list(
    total_registros = length(hectares),
    hectares_total = sum(hectares),
    hectares_media = mean(hectares),
    hectares_mediana = median(hectares),
    hectares_desvio_padrao = sd(hectares),
    hectares_variancia = var(hectares),
    hectares_min = min(hectares),
    hectares_max = max(hectares)
  )
  
  # Converter para data frame
  df_insumos <- data.frame(
    id = sapply(dados_insumos, function(x) x$id),
    tipo = sapply(dados_insumos, function(x) x$tipo),
    hectares = hectares,
    quantidade = sapply(dados_insumos, function(x) x$quantidade)
  )
  
  # Estatísticas por tipo de insumo
  stats_por_tipo <- df_insumos %>%
    group_by(tipo) %>%
    summarise(
      count = n(),
      hectares_total = sum(hectares),
      hectares_media = mean(hectares),
      hectares_desvio_padrao = sd(hectares),
      hectares_min = min(hectares),
      hectares_max = max(hectares),
      .groups = 'drop'
    )
  
  # Estatísticas por quantidade (mínima, média, máxima)
  stats_por_quantidade <- df_insumos %>%
    group_by(quantidade) %>%
    summarise(
      count = n(),
      hectares_total = sum(hectares),
      hectares_media = mean(hectares),
      hectares_desvio_padrao = sd(hectares),
      .groups = 'drop'
    )
  
  return(list(
    dados = df_insumos,
    estatisticas_hectares = stats_hectares,
    estatisticas_por_tipo = stats_por_tipo,
    estatisticas_por_quantidade = stats_por_quantidade
  ))
}

# Função para gerar relatório estatístico completo
gerar_relatorio_estatistico <- function(dados) {
  cat("\n", rep("=", 60), "\n")
  cat("           RELATÓRIO ESTATÍSTICO - FIAP FARM\n")
  cat("                FarmTech Solutions\n")
  cat(rep("=", 60), "\n")
  
  # Análise de dados de plantio
  if (!is.null(dados$plantio) && length(dados$plantio) > 0) {
    cat("\n--- ESTATÍSTICAS DE PLANTIO ---\n")
    stats_plantio <- calcular_stats_plantio(dados$plantio)
    
    if (!is.null(stats_plantio)) {
      stats <- stats_plantio$estatisticas_gerais
      
      cat("\nEstatísticas Gerais de Área:\n")
      cat(sprintf("  Total de registros: %d\n", stats$total_registros))
      cat(sprintf("  Área total: %.4f hectares\n", stats$area_total_ha))
      cat(sprintf("  Área média: %.4f hectares\n", stats$area_media_ha))
      cat(sprintf("  Mediana da área: %.4f hectares\n", stats$area_mediana_ha))
      cat(sprintf("  Desvio padrão: %.4f hectares\n", stats$area_desvio_padrao_ha))
      cat(sprintf("  Variância: %.6f\n", stats$area_variancia_ha))
      cat(sprintf("  Área mínima: %.4f hectares\n", stats$area_min_ha))
      cat(sprintf("  Área máxima: %.4f hectares\n", stats$area_max_ha))
      
      # Coeficiente de variação
      cv <- (stats$area_desvio_padrao_ha / stats$area_media_ha) * 100
      cat(sprintf("  Coeficiente de variação: %.2f%%\n", cv))
      
      cat("\nEstatísticas por Tipo de Área:\n")
      for (i in 1:nrow(stats_plantio$estatisticas_por_tipo)) {
        row <- stats_plantio$estatisticas_por_tipo[i, ]
        cat(sprintf("  %s:\n", row$tipo))
        cat(sprintf("    Registros: %d\n", row$count))
        cat(sprintf("    Área total: %.4f ha\n", row$area_total_ha))
        cat(sprintf("    Área média: %.4f ha\n", row$area_media_ha))
        if (!is.na(row$area_desvio_padrao_ha)) {
          cat(sprintf("    Desvio padrão: %.4f ha\n", row$area_desvio_padrao_ha))
        }
        cat(sprintf("    Área mín/máx: %.4f / %.4f ha\n", row$area_min_ha, row$area_max_ha))
      }
    }
  } else {
    cat("\nNenhum dado de plantio disponível para análise.\n")
  }
  
  # Análise de dados de insumos
  if (!is.null(dados$insumos) && length(dados$insumos) > 0) {
    cat("\n--- ESTATÍSTICAS DE INSUMOS ---\n")
    stats_insumos <- calcular_stats_insumos(dados$insumos)
    
    if (!is.null(stats_insumos)) {
      stats <- stats_insumos$estatisticas_hectares
      
      cat("\nEstatísticas Gerais de Hectares:\n")
      cat(sprintf("  Total de registros: %d\n", stats$total_registros))
      cat(sprintf("  Hectares total: %.2f\n", stats$hectares_total))
      cat(sprintf("  Hectares média: %.2f\n", stats$hectares_media))
      cat(sprintf("  Mediana: %.2f hectares\n", stats$hectares_mediana))
      cat(sprintf("  Desvio padrão: %.2f hectares\n", stats$hectares_desvio_padrao))
      cat(sprintf("  Variância: %.4f\n", stats$hectares_variancia))
      cat(sprintf("  Hectares mín/máx: %.2f / %.2f\n", stats$hectares_min, stats$hectares_max))
      
      # Coeficiente de variação
      cv <- (stats$hectares_desvio_padrao / stats$hectares_media) * 100
      cat(sprintf("  Coeficiente de variação: %.2f%%\n", cv))
      
      cat("\nEstatísticas por Tipo de Insumo:\n")
      for (i in 1:nrow(stats_insumos$estatisticas_por_tipo)) {
        row <- stats_insumos$estatisticas_por_tipo[i, ]
        cat(sprintf("  %s:\n", row$tipo))
        cat(sprintf("    Registros: %d\n", row$count))
        cat(sprintf("    Hectares total: %.2f\n", row$hectares_total))
        cat(sprintf("    Hectares média: %.2f\n", row$hectares_media))
        if (!is.na(row$hectares_desvio_padrao)) {
          cat(sprintf("    Desvio padrão: %.2f\n", row$hectares_desvio_padrao))
        }
        cat(sprintf("    Hectares mín/máx: %.2f / %.2f\n", row$hectares_min, row$hectares_max))
      }
      
      cat("\nEstatísticas por Tipo de Quantidade:\n")
      for (i in 1:nrow(stats_insumos$estatisticas_por_quantidade)) {
        row <- stats_insumos$estatisticas_por_quantidade[i, ]
        cat(sprintf("  %s:\n", row$quantidade))
        cat(sprintf("    Registros: %d\n", row$count))
        cat(sprintf("    Hectares total: %.2f\n", row$hectares_total))
        cat(sprintf("    Hectares média: %.2f\n", row$hectares_media))
        if (!is.na(row$hectares_desvio_padrao)) {
          cat(sprintf("    Desvio padrão: %.2f\n", row$hectares_desvio_padrao))
        }
      }
    }
  } else {
    cat("\nNenhum dado de insumos disponível para análise.\n")
  }
  
  cat("\n", rep("=", 60), "\n")
}

# Função para criar gráficos (se dados disponíveis)
criar_graficos <- function(dados) {
  # Verificar se há dados de plantio
  if (!is.null(dados$plantio) && length(dados$plantio) > 0) {
    stats_plantio <- calcular_stats_plantio(dados$plantio)
    
    if (!is.null(stats_plantio) && nrow(stats_plantio$dados) > 1) {
      # Gráfico de distribuição de áreas
      p1 <- ggplot(stats_plantio$dados, aes(x = area_ha)) +
        geom_histogram(bins = 10, fill = "lightblue", color = "black", alpha = 0.7) +
        labs(title = "Distribuição de Áreas de Plantio",
             x = "Área (hectares)",
             y = "Frequência") +
        theme_minimal()
      
      # Gráfico boxplot por tipo
      if (length(unique(stats_plantio$dados$tipo)) > 1) {
        p2 <- ggplot(stats_plantio$dados, aes(x = tipo, y = area_ha, fill = tipo)) +
          geom_boxplot(alpha = 0.7) +
          labs(title = "Distribuição de Áreas por Tipo",
               x = "Tipo de Área",
               y = "Área (hectares)") +
          theme_minimal() +
          theme(legend.position = "none")
        
        # Salvar gráficos
        tryCatch({
          ggsave("fiap_farm_distribuicao_areas.png", p1, width = 10, height = 6)
          ggsave("fiap_farm_areas_por_tipo.png", p2, width = 10, height = 6)
          cat("\nGráficos salvos: fiap_farm_distribuicao_areas.png e fiap_farm_areas_por_tipo.png\n")
        }, error = function(e) {
          cat("Aviso: Não foi possível salvar os gráficos:", e$message, "\n")
        })
      }
    }
  }
}

# Função para análise de correlação (se aplicável)
analisar_correlacoes <- function(dados) {
  if (!is.null(dados$plantio) && length(dados$plantio) > 2) {
    stats_plantio <- calcular_stats_plantio(dados$plantio)
    
    if (!is.null(stats_plantio) && nrow(stats_plantio$dados) > 2) {
      # Análise de correlação entre diferentes métricas
      df <- stats_plantio$dados
      
      # Adicionar variáveis derivadas se possível
      if ("lado" %in% names(df)) {
        correlacao <- cor(df$area_ha, df$lado, use = "complete.obs")
        cat(sprintf("\nCorrelação entre área e lado (quadrados): %.4f\n", correlacao))
      }
      
      # Estatísticas de tendência central
      cat("\n--- ANÁLISE DE TENDÊNCIA CENTRAL ---\n")
      cat(sprintf("Média vs Mediana (área): %.4f vs %.4f\n", 
                  mean(df$area_ha), median(df$area_ha)))
      
      # Verificar assimetria
      if (mean(df$area_ha) > median(df$area_ha)) {
        cat("Distribuição: Assimétrica positiva (cauda à direita)\n")
      } else if (mean(df$area_ha) < median(df$area_ha)) {
        cat("Distribuição: Assimétrica negativa (cauda à esquerda)\n")
      } else {
        cat("Distribuição: Aproximadamente simétrica\n")
      }
    }
  }
}

# Função para salvar relatório em arquivo
salvar_relatorio <- function(dados, arquivo = "relatorio_estatistico.txt") {
  # Redirecionar saída para arquivo
  sink(arquivo)
  gerar_relatorio_estatistico(dados)
  analisar_correlacoes(dados)
  sink()
  
  cat("\nRelatório estatístico salvo em:", arquivo, "\n")
}

# Função principal
main <- function() {
  cat("FIAP Farm - Análises Estatísticas\n")
  cat("FarmTech Solutions\n")
  cat("================================\n")
  
  # Carregar dados
  dados <- carregar_dados()
  
  if (is.null(dados)) {
    cat("\nNão foi possível carregar os dados.\n")
    cat("Certifique-se de que o arquivo 'fiap_farm_dados.json' existe.\n")
    cat("Execute primeiro o sistema Python para gerar os dados.\n")
    return()
  }
  
  # Menu interativo
  repeat {
    cat("\n--- MENU DE ANÁLISES ESTATÍSTICAS ---\n")
    cat("1. Gerar Relatório Estatístico Completo\n")
    cat("2. Análise de Dados de Plantio\n")
    cat("3. Análise de Dados de Insumos\n")
    cat("4. Criar Gráficos\n")
    cat("5. Salvar Relatório em Arquivo\n")
    cat("6. Análise de Correlações\n")
    cat("0. Sair\n")
    
    opcao <- readline("\nEscolha uma opção: ")
    
    if (opcao == "1") {
      gerar_relatorio_estatistico(dados)
    } else if (opcao == "2") {
      if (!is.null(dados$plantio) && length(dados$plantio) > 0) {
        stats <- calcular_stats_plantio(dados$plantio)
        if (!is.null(stats)) {
          cat("\n--- ANÁLISE DETALHADA DE PLANTIO ---\n")
          print(stats$estatisticas_gerais)
          cat("\nEstatísticas por tipo:\n")
          print(stats$estatisticas_por_tipo)
        }
      } else {
        cat("\nNenhum dado de plantio disponível.\n")
      }
    } else if (opcao == "3") {
      if (!is.null(dados$insumos) && length(dados$insumos) > 0) {
        stats <- calcular_stats_insumos(dados$insumos)
        if (!is.null(stats)) {
          cat("\n--- ANÁLISE DETALHADA DE INSUMOS ---\n")
          print(stats$estatisticas_hectares)
          cat("\nEstatísticas por tipo:\n")
          print(stats$estatisticas_por_tipo)
          cat("\nEstatísticas por quantidade:\n")
          print(stats$estatisticas_por_quantidade)
        }
      } else {
        cat("\nNenhum dado de insumos disponível.\n")
      }
    } else if (opcao == "4") {
      criar_graficos(dados)
    } else if (opcao == "5") {
      salvar_relatorio(dados)
    } else if (opcao == "6") {
      analisar_correlacoes(dados)
    } else if (opcao == "0") {
      cat("\nObrigado por usar o sistema de análises estatísticas!\n")
      break
    } else {
      cat("\nOpção inválida! Tente novamente.\n")
    }
  }
}

# Executar se chamado diretamente
if (!interactive()) {
  main()
}

# Função para execução rápida (sem menu)
executar_analise_rapida <- function() {
  dados <- carregar_dados()
  if (!is.null(dados)) {
    gerar_relatorio_estatistico(dados)
    analisar_correlacoes(dados)
    salvar_relatorio(dados)
    criar_graficos(dados)
  }
}

# Mensagem de ajuda
cat("\n=== INSTRUÇÕES DE USO ===\n")
cat("1. Execute o sistema Python primeiro para gerar dados\n")
cat("2. Execute este script R para análises estatísticas\n")
cat("3. Use main() para menu interativo\n")
cat("4. Use executar_analise_rapida() para análise completa automática\n")
cat("========================\n")