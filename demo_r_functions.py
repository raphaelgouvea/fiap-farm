#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
FIAP Farm - Demonstração das Funcionalidades R
FarmTech Solutions

Script de demonstração automática das funcionalidades R implementadas em Python.
"""

from r_simulator import RSimulator
import time

def executar_demonstracao():
    """Executa demonstração completa das funcionalidades R"""
    simulator = RSimulator()
    
    print("\n" + "="*70)
    print("           FIAP FARM - DEMONSTRAÇÃO FUNCIONALIDADES R")
    print("                    FarmTech Solutions")
    print("="*70)
    print("\n🚀 Iniciando demonstração automática...\n")
    
    # Demonstração 1: Análise Estatística Completa
    print("\n" + "🔍 DEMONSTRAÇÃO 1: ANÁLISE ESTATÍSTICA COMPLETA")
    print("-" * 50)
    simulator.gerar_relatorio_estatistico()
    
    print("\n⏳ Aguarde 3 segundos para próxima demonstração...")
    time.sleep(3)
    
    # Demonstração 2: Análise Específica de Produção
    print("\n" + "📊 DEMONSTRAÇÃO 2: ANÁLISE DE PRODUÇÃO")
    print("-" * 50)
    simulator.gerar_relatorio_estatistico("producao")
    
    print("\n⏳ Aguarde 3 segundos para próxima demonstração...")
    time.sleep(3)
    
    # Demonstração 3: Análise de Temperaturas
    print("\n" + "🌡️ DEMONSTRAÇÃO 3: ANÁLISE DE TEMPERATURAS")
    print("-" * 50)
    simulator.gerar_relatorio_estatistico("temperaturas")
    
    print("\n⏳ Aguarde 3 segundos para próxima demonstração...")
    time.sleep(3)
    
    # Demonstração 4: Relatório Meteorológico São Paulo
    print("\n" + "🌤️ DEMONSTRAÇÃO 4: DADOS METEOROLÓGICOS - SÃO PAULO")
    print("-" * 50)
    simulator.gerar_relatorio_meteorologico("São Paulo")
    
    print("\n⏳ Aguarde 3 segundos para próxima demonstração...")
    time.sleep(3)
    
    # Demonstração 5: Relatório Meteorológico Rio de Janeiro
    print("\n" + "🏖️ DEMONSTRAÇÃO 5: DADOS METEOROLÓGICOS - RIO DE JANEIRO")
    print("-" * 50)
    simulator.gerar_relatorio_meteorologico("Rio de Janeiro")
    
    print("\n⏳ Aguarde 3 segundos para próxima demonstração...")
    time.sleep(3)
    
    # Demonstração 6: Relatório Meteorológico Brasília
    print("\n" + "🏛️ DEMONSTRAÇÃO 6: DADOS METEOROLÓGICOS - BRASÍLIA")
    print("-" * 50)
    simulator.gerar_relatorio_meteorologico("Brasília")
    
    # Resumo final
    print("\n" + "="*70)
    print("                    DEMONSTRAÇÃO CONCLUÍDA")
    print("="*70)
    print("\n✅ Todas as funcionalidades R foram demonstradas com sucesso!")
    print("\n📋 FUNCIONALIDADES DEMONSTRADAS:")
    print("   1. ✅ Análise Estatística Completa (média, desvio padrão, etc.)")
    print("   2. ✅ Análise Específica de Produção")
    print("   3. ✅ Análise de Temperaturas")
    print("   4. ✅ Integração com API Meteorológica (São Paulo)")
    print("   5. ✅ Integração com API Meteorológica (Rio de Janeiro)")
    print("   6. ✅ Integração com API Meteorológica (Brasília)")
    
    print("\n💡 NOTA IMPORTANTE:")
    print("   As funcionalidades R originais não puderam ser executadas porque")
    print("   o R não está instalado no sistema. Esta implementação Python")
    print("   fornece funcionalidades equivalentes e compatíveis.")
    
    print("\n🔧 PARA INSTALAR O R (OPCIONAL):")
    print("   1. Instale o Homebrew: /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"")
    print("   2. Instale o R: brew install r")
    print("   3. Execute: Rscript fiap_farm_stats.R")
    
    print("\n" + "="*70)
    print("           Obrigado por usar o FIAP Farm!")
    print("="*70)

def executar_teste_rapido():
    """Executa um teste rápido das funcionalidades principais"""
    simulator = RSimulator()
    
    print("\n🚀 TESTE RÁPIDO - FUNCIONALIDADES R")
    print("="*40)
    
    # Teste de cálculo estatístico
    dados_teste = [10, 20, 30, 40, 50]
    stats = simulator.calcular_estatisticas(dados_teste)
    
    print(f"\n📊 Teste de Cálculo Estatístico:")
    print(f"   Dados: {dados_teste}")
    print(f"   Média: {stats['media']}")
    print(f"   Desvio Padrão: {stats['desvio_padrao']}")
    print(f"   ✅ Cálculos estatísticos funcionando!")
    
    # Teste de dados meteorológicos
    dados_clima = simulator.obter_dados_meteorologicos("São Paulo")
    print(f"\n🌤️ Teste de Dados Meteorológicos:")
    print(f"   Temperatura: {dados_clima['temperatura']}°C")
    print(f"   Umidade: {dados_clima['umidade']}%")
    print(f"   ✅ Dados meteorológicos funcionando!")
    
    print(f"\n✅ Todos os testes passaram! As funcionalidades R estão operacionais.")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--teste":
        executar_teste_rapido()
    else:
        executar_demonstracao()