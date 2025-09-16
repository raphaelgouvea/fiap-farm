# Instruções para Execução dos Sistemas R

## FIAP Farm - Sistemas em R
**FarmTech Solutions**

---

## 📋 Pré-requisitos

### 1. Instalação do R
- **Versão mínima**: R 4.0+
- **Download**: https://cran.r-project.org/
- **Verificar instalação**:
  ```bash
  R --version
  ```

### 2. Instalação de Pacotes R

Abra o R ou RStudio e execute:

```r
# Instalar pacotes necessários
install.packages(c("httr", "jsonlite", "dplyr", "ggplot2"))

# Verificar instalação
library(httr)
library(jsonlite)
library(dplyr)
library(ggplot2)
```

---

## 🔧 Sistema de Análises Estatísticas

### Arquivo: `fiap_farm_stats.R`

#### Execução Básica

```r
# Carregar o script
source("fiap_farm_stats.R")

# Executar menu interativo
main()
```

#### Execução Rápida (Automática)

```r
# Análise completa automática
executar_analise_rapida()
```

#### Funções Disponíveis

```r
# Carregar dados do Python
dados <- carregar_dados("fiap_farm_dados.json")

# Calcular estatísticas de plantio
stats_plantio <- calcular_stats_plantio(dados$plantio)

# Calcular estatísticas de insumos
stats_insumos <- calcular_stats_insumos(dados$insumos)

# Gerar relatório completo
gerar_relatorio_estatistico(dados)

# Criar gráficos
criar_graficos(dados)

# Salvar relatório
salvar_relatorio(dados, "meu_relatorio.txt")
```

### Arquivos Gerados
- `relatorio_estatistico.txt` - Relatório completo
- `fiap_farm_distribuicao_areas.png` - Gráfico de distribuição
- `fiap_farm_areas_por_tipo.png` - Gráfico por tipo

---

## 🌤️ Sistema Meteorológico

### Arquivo: `fiap_farm_weather.R`

#### Execução Básica

```r
# Carregar o script
source("fiap_farm_weather.R")

# Executar menu interativo
main()
```

#### Demonstração Rápida

```r
# Demonstração com todas as fazendas
executar_demo()
```

#### Configuração da API Real (Opcional)

1. **Registrar no OpenWeatherMap**:
   - Acesse: https://openweathermap.org/api
   - Crie conta gratuita
   - Obtenha sua API key

2. **Configurar no código**:
   ```r
   # Substituir na função obter_dados_openweather
   api_key <- "SUA_API_KEY_AQUI"
   ```

#### Funções Disponíveis

```r
# Obter dados de uma fazenda específica
fazenda_info <- FAZENDAS[["Barra Grande"]]
dados_brutos <- obter_dados_simulados(fazenda_info)
dados_processados <- processar_dados_meteorologicos(dados_brutos, fazenda_info)

# Exibir dados formatados
exibir_dados_meteorologicos(dados_processados)

# Análise agroclimática
analisar_condicoes_agricolas(dados_processados)

# Coletar dados de todas as fazendas
dados_todas <- coletar_dados_todas_fazendas()

# Comparar fazendas
comparar_fazendas(dados_todas)

# Salvar dados
salvar_dados_meteorologicos(dados_processados)
```

### Arquivos Gerados
- `dados_meteorologicos.txt` - Histórico de dados climáticos

---

## 📊 Fluxo de Trabalho Recomendado

### 1. Preparação dos Dados
```bash
# 1. Executar sistema Python primeiro
python fiap_farm.py

# 2. Gerar alguns dados de plantio e insumos
# 3. Exportar dados (opção 5 → 2 no menu Python)
```

### 2. Análises Estatísticas
```r
# 1. Carregar script R
source("fiap_farm_stats.R")

# 2. Executar análises
main()  # ou executar_analise_rapida()
```

### 3. Dados Meteorológicos
```r
# 1. Carregar script meteorológico
source("fiap_farm_weather.R")

# 2. Consultar dados climáticos
main()  # ou executar_demo()
```

---

## 🔍 Solução de Problemas

### Erro: "Arquivo de dados não encontrado"
**Solução**:
1. Execute primeiro o sistema Python
2. Gere dados através do menu
3. Exporte os dados (menu Python → Relatórios → Exportar)

### Erro: "Pacote não encontrado"
**Solução**:
```r
# Reinstalar pacotes
install.packages(c("httr", "jsonlite", "dplyr", "ggplot2"))
```

### Erro: "Não foi possível conectar com a API"
**Solução**:
1. Verifique conexão com internet
2. Use dados simulados (padrão)
3. Configure API key válida se necessário

### Erro: "Não foi possível salvar gráficos"
**Solução**:
1. Verifique permissões de escrita na pasta
2. Instale dependências gráficas do sistema
3. Use RStudio para melhor suporte gráfico

---

## 📈 Exemplos de Saída

### Relatório Estatístico
```
============================================================
           RELATÓRIO ESTATÍSTICO - FIAP FARM
                FarmTech Solutions
============================================================

--- ESTATÍSTICAS DE PLANTIO ---

Estatísticas Gerais de Área:
  Total de registros: 5
  Área total: 6.2500 hectares
  Área média: 1.2500 hectares
  Mediana da área: 1.0000 hectares
  Desvio padrão: 0.4330 hectares
  Variância: 0.1875
  Área mínima: 0.8000 hectares
  Área máxima: 2.0000 hectares
  Coeficiente de variação: 34.64%
```

### Dados Meteorológicos
```
============================================================
           DADOS METEOROLÓGICOS - FIAP FARM
                FarmTech Solutions
============================================================
Fazenda: Fazenda Barra Grande
Localização: Itirapuã, SP
Cultura: Cana-de-Açúcar
Atualizado em: 15/01/2024 14:30:25

--- CONDIÇÕES ATUAIS ---
Condição: Ensolarado
Descrição: ensolarado

--- TEMPERATURA ---
Atual: 27.5°C
Sensação térmica: 29.2°C
Mínima: 25.1°C
Máxima: 29.8°C

--- ANÁLISE AGROCLIMÁTICA ---
Cultura: Cana-de-Açúcar
✓ Temperatura: IDEAL para cana-de-açúcar
✓ Umidade: IDEAL para cana-de-açúcar
✓ Vento: CALMO - bom para aplicação de defensivos
```

---

## 🎯 Dicas de Uso

### Para Análises Estatísticas
1. **Gere dados variados** no sistema Python antes de analisar
2. **Use diferentes tipos de área** (quadrado/retângulo) para comparações
3. **Experimente diferentes quantidades** de insumos (mínima/média/máxima)
4. **Salve relatórios** para documentação

### Para Dados Meteorológicos
1. **Compare condições** entre as duas fazendas
2. **Monitore regularmente** para histórico
3. **Use análises agroclimáticas** para decisões de manejo
4. **Configure API real** para dados precisos

### Para Desenvolvimento
1. **Modifique coordenadas** das fazendas se necessário
2. **Adicione novas fazendas** na lista FAZENDAS
3. **Customize análises** conforme necessidades específicas
4. **Integre com outros sistemas** usando JSON

---

## 📞 Suporte Técnico

### Recursos Adicionais
- **Documentação R**: https://www.r-project.org/
- **RStudio**: https://www.rstudio.com/
- **OpenWeatherMap API**: https://openweathermap.org/api
- **Pacotes R utilizados**:
  - httr: https://cran.r-project.org/package=httr
  - jsonlite: https://cran.r-project.org/package=jsonlite
  - dplyr: https://cran.r-project.org/package=dplyr
  - ggplot2: https://cran.r-project.org/package=ggplot2

---

**FarmTech Solutions - Transformando a agricultura através da tecnologia**