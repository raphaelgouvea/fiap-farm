# FIAP Farm - Sistema de Gestão Agrícola Digital

**FarmTech Solutions**

Sistema completo de gestão agrícola desenvolvido para a migração para Agricultura Digital, com suporte a culturas de Laranja e Cana-de-Açúcar.

## 📋 Visão Geral

O FIAP Farm é uma solução integrada que combina:
- **Sistema Python**: Gestão completa de dados agrícolas
- **Análises Estatísticas em R**: Cálculos de média, desvio padrão e análises avançadas
- **Integração Meteorológica em R**: Dados climáticos em tempo real

## 🔧 Solução para Aplicações R

### Problema Identificado
As aplicações R (`fiap_farm_stats.R` e `fiap_farm_weather.R`) podem não estar funcionando corretamente devido a dependências ou configurações específicas do ambiente R.

### Soluções Implementadas

#### Opção 1: Execução Direta no R
```r
# Instalar dependências necessárias
install.packages(c("httr", "jsonlite", "dplyr", "ggplot2"))

# Executar os scripts
source("fiap_farm_stats.R")
source("fiap_farm_weather.R")
```

#### Opção 2: Funcionalidades Integradas no Python
Para garantir que todas as funcionalidades estejam disponíveis, as análises estatísticas e meteorológicas foram também implementadas diretamente no sistema Python principal:

- **Análises Estatísticas**: Cálculos de média, desvio padrão, variância integrados no menu principal
- **Dados Meteorológicos**: Simulação de dados climáticos para análise agrícola
- **Compatibilidade Total**: Todas as funcionalidades acessíveis através do `fiap_farm.py`

#### Opção 3: Verificação de Ambiente
```bash
# Verificar instalação do R
R --version

# Verificar pacotes instalados
R -e "installed.packages()[,c('Package', 'Version')]"
```

## 🏢 Fazendas Atendidas

### Fazenda Barra Grande
- **Localização**: Itirapuã (SP)
- **Cultura**: Cana-de-Açúcar
- **Especialidade**: Produção de cana para indústria sucroalcooleira

### Fazenda Arcanjo Miguel
- **Localização**: São Miguel Arcanjo (SP)
- **Cultura**: Laranja
- **Especialidade**: Maior produtor de laranja da região

## 🚀 Funcionalidades

### Sistema Principal (Python)

#### ABA 1 - Gestão de Culturas
- Suporte completo para Laranja e Cana-de-Açúcar
- Dados detalhados das fazendas
- Informações de localização e especialidades

#### ABA 2 - Cálculo de Área de Plantio
- **Formas geométricas suportadas**:
  - Quadrados
  - Retângulos
- Conversão automática entre m² e hectares
- Armazenamento de dados para análises posteriores

#### ABA 3 - Manejo de Insumos

**Corretivos de Solo:**
- Calcário: 1,5 a 3,0 toneladas/ha
- Gesso Agrícola: 1,0 a 2,0 toneladas/ha

**Fertilizantes (produção adulta/ano):**
- Fósforo (P₂O₅): 80–150 kg/ha
- Potássio (K₂O): 150–250 kg/ha

**Defensivos Agrícolas:**
- Inseticidas/Fungicidas: 4 a 8 pulverizações/ano
- Consumo: 150–250 L de calda/ha por aplicação

#### ABA 4 - Armazenamento em Vetores
- Todos os dados organizados em listas/vetores Python
- Estrutura otimizada para análises estatísticas
- Exportação para JSON

#### ABA 5 - Menu CRUD Completo
- **Entrada de dados**: Inserção de novos registros
- **Saída de dados**: Visualização formatada no terminal
- **Atualização**: Modificação de dados em qualquer posição
- **Deleção**: Remoção segura de registros
- **Sair**: Encerramento controlado do programa

#### ABA 6 - Estruturas de Controle
- Loops para navegação em menus
- Estruturas de decisão para validações
- Tratamento de erros e exceções

### Sistema de Análises Estatísticas (R)

#### ABA 7 - Cálculos Estatísticos
- **Estatísticas básicas**:
  - Média
  - Desvio padrão
  - Mediana
  - Variância
  - Valores mínimo e máximo
  - Coeficiente de variação

- **Análises por categoria**:
  - Estatísticas por tipo de área (quadrado/retângulo)
  - Estatísticas por tipo de insumo
  - Comparações entre fazendas

- **Visualizações**:
  - Histogramas de distribuição
  - Boxplots comparativos
  - Gráficos por tipo de cultura

### Sistema Meteorológico (R)

#### ABA 8 - Integração com API Meteorológica
- **Dados coletados**:
  - Temperatura atual, mínima e máxima
  - Umidade relativa
  - Pressão atmosférica
  - Velocidade e direção do vento
  - Condições climáticas
  - Nebulosidade e visibilidade

- **Análises agroclimáticas**:
  - Condições ideais por cultura
  - Recomendações de manejo
  - Alertas para aplicação de defensivos
  - Monitoramento de estresse hídrico

- **Funcionalidades**:
  - Dados em tempo real via API
  - Comparação entre fazendas
  - Histórico de dados meteorológicos
  - Relatórios formatados

## 📁 Estrutura do Projeto

```
Fiap Farm/
├── fiap_farm.py              # Sistema principal Python
├── fiap_farm_stats.R         # Análises estatísticas em R
├── fiap_farm_weather.R       # Sistema meteorológico em R
├── README.md                 # Documentação
├── requirements.txt          # Dependências Python
└── dados_gerados/            # Arquivos de saída
    ├── fiap_farm_dados.json
    ├── relatorio_estatistico.txt
    └── dados_meteorologicos.txt
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

**Python 3.7+**
```bash
# Verificar versão
python --version
```

**R 4.0+**
```bash
# Verificar versão
R --version
```

### Instalação das Dependências

**Python:**
```bash
# Instalar dependências (se necessário)
pip install json
```

**R:**
```r
# Instalar pacotes necessários
install.packages(c("httr", "jsonlite", "dplyr", "ggplot2"))
```

### Configuração da API Meteorológica (Opcional)

1. Registre-se em [OpenWeatherMap](https://openweathermap.org/api)
2. Obtenha sua API key gratuita
3. Substitua `api_key = "demo"` no arquivo `fiap_farm_weather.R`

## 🚀 Como Usar

### 1. Sistema Principal Python

```bash
# Executar o sistema principal
python fiap_farm.py
```

**Fluxo recomendado:**
1. Gerenciar Culturas → Conhecer as fazendas
2. Calcular Área de Plantio → Definir áreas de cultivo
3. Calcular Manejo de Insumos → Planejar aplicações
4. Gerenciar Dados (CRUD) → Manter dados atualizados
5. Relatórios → Exportar dados para análises

### 2. Análises Estatísticas (R)

```r
# Executar análises estatísticas
source("fiap_farm_stats.R")

# Menu interativo
main()

# Ou análise rápida
executar_analise_rapida()
```

### 3. Sistema Meteorológico (R)

```r
# Executar sistema meteorológico
source("fiap_farm_weather.R")

# Menu interativo
main()

# Ou demonstração
executar_demo()
```

## 📊 Exemplos de Uso

### Exemplo 1: Cálculo de Área
```
Entrada:
- Tipo: Retângulo
- Largura: 100 metros
- Altura: 200 metros

Saída:
- Área: 20.000 m² (2,0000 hectares)
```

### Exemplo 2: Cálculo de Insumos
```
Entrada:
- Área: 10 hectares
- Quantidade: Média

Saída:
- Calcário: 22,50 toneladas
- Gesso: 15,00 toneladas
- Fósforo: 1.150 kg
- Potássio: 2.000 kg
```

### Exemplo 3: Análise Estatística
```
Dados de 5 áreas de plantio:
- Área média: 1,2500 hectares
- Desvio padrão: 0,4330 hectares
- Coeficiente de variação: 34,64%
```

## 📈 Relatórios Gerados

### 1. Dados Agrícolas (JSON)
- Estrutura completa dos dados
- Compatível com outras ferramentas
- Backup automático

### 2. Relatório Estatístico (TXT)
- Análises detalhadas
- Comparações por categoria
- Recomendações baseadas em dados

### 3. Dados Meteorológicos (TXT)
- Histórico de condições climáticas
- Análises agroclimáticas
- Recomendações de manejo

### 4. Gráficos (PNG)
- Distribuição de áreas
- Comparações por tipo
- Visualizações estatísticas

## 🔧 Funcionalidades Técnicas

### Estruturas de Dados
- **Listas/Vetores**: Armazenamento eficiente
- **Dicionários**: Organização hierárquica
- **Classes**: Encapsulamento de funcionalidades

### Validações
- Entrada de dados numéricos
- Verificação de limites
- Tratamento de erros

### Persistência
- Exportação JSON
- Relatórios em texto
- Histórico de operações

## 🌱 Recomendações Agrícolas

### Cana-de-Açúcar
- **Temperatura ideal**: 20-30°C
- **Umidade ideal**: 60-80%
- **Época de plantio**: Setembro a novembro
- **Ciclo**: 12-18 meses

### Laranja
- **Temperatura ideal**: 15-25°C
- **Umidade ideal**: 50-70%
- **Época de plantio**: Março a maio
- **Ciclo**: Perene (produção após 3-4 anos)

## 🚨 Alertas e Monitoramento

### Condições Climáticas
- **Vento > 20 km/h**: Evitar aplicações
- **Umidade > 80%**: Monitorar doenças
- **Temperatura > 30°C**: Verificar irrigação
- **Chuva**: Suspender aplicações

### Manejo de Insumos
- **Calcário**: Aplicar a cada 3-4 anos
- **Fertilizantes**: Aplicação anual
- **Defensivos**: Conforme monitoramento

## 🔍 Troubleshooting

### Problemas Comuns

**Erro: Arquivo JSON não encontrado**
- Execute primeiro o sistema Python
- Gere dados através do menu principal

**Erro: API meteorológica**
- Verifique conexão com internet
- Configure API key válida
- Use modo simulado como alternativa

**Erro: Pacotes R não encontrados**
```r
install.packages(c("httr", "jsonlite", "dplyr", "ggplot2"))
```

**Erro: Entrada inválida**
- Use apenas números para valores numéricos
- Verifique formato de data/hora
- Confirme opções do menu

## 📞 Suporte

### Contato
- **Empresa**: FarmTech Solutions
- **Projeto**: FIAP Farm
- **Versão**: 1.0
- **Data**: 2024

### Documentação Adicional
- Comentários detalhados no código
- Exemplos de uso em cada função
- Validações e tratamento de erros

## 🔄 Atualizações Futuras

### Versão 1.1 (Planejada)
- Interface gráfica (GUI)
- Banco de dados SQLite
- Relatórios em PDF
- Mapas de produtividade

### Versão 1.2 (Planejada)
- Aplicativo mobile
- Integração IoT
- Machine Learning para previsões
- Dashboard web

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do programa FIAP.

---

**Desenvolvido com ❤️ pela equipe FarmTech Solutions**

*"Transformando a agricultura através da tecnologia digital"*# fiap-farm
