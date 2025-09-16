#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
FIAP Farm - Simulador de Funcionalidades R
FarmTech Solutions

Este arquivo simula as funcionalidades R quando o R não está instalado no sistema.
Implementa as mesmas análises estatísticas e meteorológicas em Python.
"""

import json
import statistics
import math
from datetime import datetime
import os

class RSimulator:
    """Simulador das funcionalidades R em Python"""
    
    def __init__(self):
        self.dados_exemplo = {
            'producao': [1200, 1350, 1180, 1420, 1290, 1380, 1150, 1340],
            'custos': [45000, 52000, 43000, 58000, 49000, 55000, 41000, 53000],
            'areas': [12.5, 15.2, 11.8, 16.7, 13.9, 15.8, 10.9, 14.6],
            'temperaturas': [23.5, 25.2, 22.8, 26.1, 24.3, 25.7, 21.9, 24.8]
        }
    
    def calcular_estatisticas(self, dados):
        """Calcula estatísticas descritivas (equivalente ao R)"""
        if not dados or len(dados) == 0:
            return None
        
        n = len(dados)
        media = statistics.mean(dados)
        desvio_padrao = statistics.stdev(dados) if n > 1 else 0
        variancia = statistics.variance(dados) if n > 1 else 0
        mediana = statistics.median(dados)
        minimo = min(dados)
        maximo = max(dados)
        
        return {
            'n': n,
            'media': round(media, 4),
            'desvio_padrao': round(desvio_padrao, 4),
            'variancia': round(variancia, 4),
            'mediana': round(mediana, 4),
            'minimo': minimo,
            'maximo': maximo,
            'amplitude': maximo - minimo,
            'coef_variacao': round((desvio_padrao / media) * 100, 2) if media != 0 else 0
        }
    
    def gerar_relatorio_estatistico(self, tipo_dados=None):
        """Gera relatório estatístico completo"""
        print("\n" + "="*60)
        print("         FIAP FARM - RELATÓRIO ESTATÍSTICO")
        print("              FarmTech Solutions")
        print("="*60)
        print(f"Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        print("="*60)
        
        if tipo_dados:
            # Usar dados específicos fornecidos
            dados_para_analise = {tipo_dados: self.dados_exemplo.get(tipo_dados, [])}
        else:
            # Usar todos os dados de exemplo
            dados_para_analise = self.dados_exemplo
        
        for categoria, valores in dados_para_analise.items():
            if not valores:
                continue
                
            print(f"\n📊 ANÁLISE: {categoria.upper()}")
            print("-" * 40)
            
            stats = self.calcular_estatisticas(valores)
            if stats:
                print(f"Dados analisados: {valores}")
                print(f"Quantidade de observações (n): {stats['n']}")
                print(f"Média: {stats['media']}")
                print(f"Desvio Padrão: {stats['desvio_padrao']}")
                print(f"Variância: {stats['variancia']}")
                print(f"Mediana: {stats['mediana']}")
                print(f"Valor Mínimo: {stats['minimo']}")
                print(f"Valor Máximo: {stats['maximo']}")
                print(f"Amplitude: {stats['amplitude']}")
                print(f"Coeficiente de Variação: {stats['coef_variacao']}%")
        
        print("\n" + "="*60)
        print("Relatório gerado com sucesso!")
        print("Nota: Este relatório foi gerado pelo simulador Python")
        print("equivalente às funcionalidades R.")
        print("="*60)
    
    def obter_dados_meteorologicos(self, cidade="São Paulo"):
        """Simula obtenção de dados meteorológicos (equivalente ao R)"""
        # Dados simulados para demonstração
        dados_simulados = {
            "São Paulo": {
                "temperatura": 23.5,
                "umidade": 65,
                "pressao": 1013.2,
                "vento": 12.3,
                "condicao": "Parcialmente nublado",
                "visibilidade": 10,
                "uv_index": 6
            },
            "Rio de Janeiro": {
                "temperatura": 28.2,
                "umidade": 72,
                "pressao": 1015.8,
                "vento": 8.7,
                "condicao": "Ensolarado",
                "visibilidade": 15,
                "uv_index": 8
            },
            "Brasília": {
                "temperatura": 25.1,
                "umidade": 45,
                "pressao": 1012.5,
                "vento": 15.2,
                "condicao": "Céu limpo",
                "visibilidade": 20,
                "uv_index": 9
            }
        }
        
        return dados_simulados.get(cidade, dados_simulados["São Paulo"])
    
    def gerar_relatorio_meteorologico(self, cidade="São Paulo"):
        """Gera relatório meteorológico"""
        print("\n" + "="*60)
        print("         FIAP FARM - RELATÓRIO METEOROLÓGICO")
        print("              FarmTech Solutions")
        print("="*60)
        print(f"Data/Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        print(f"Localização: {cidade}")
        print("="*60)
        
        dados = self.obter_dados_meteorologicos(cidade)
        
        print(f"\n🌤️  CONDIÇÕES METEOROLÓGICAS ATUAIS")
        print("-" * 40)
        print(f"Temperatura: {dados['temperatura']}°C")
        print(f"Umidade Relativa: {dados['umidade']}%")
        print(f"Pressão Atmosférica: {dados['pressao']} hPa")
        print(f"Velocidade do Vento: {dados['vento']} km/h")
        print(f"Condição Geral: {dados['condicao']}")
        print(f"Visibilidade: {dados['visibilidade']} km")
        print(f"Índice UV: {dados['uv_index']}")
        
        # Análise para agricultura
        print(f"\n🌱 ANÁLISE PARA AGRICULTURA")
        print("-" * 40)
        
        if dados['temperatura'] < 15:
            print("⚠️  Temperatura baixa - Risco para culturas sensíveis ao frio")
        elif dados['temperatura'] > 35:
            print("⚠️  Temperatura alta - Necessário irrigação adicional")
        else:
            print("✅ Temperatura adequada para a maioria das culturas")
        
        if dados['umidade'] < 40:
            print("⚠️  Umidade baixa - Considerar irrigação")
        elif dados['umidade'] > 80:
            print("⚠️  Umidade alta - Monitorar fungos e pragas")
        else:
            print("✅ Umidade adequada")
        
        if dados['vento'] > 25:
            print("⚠️  Vento forte - Risco para culturas altas")
        else:
            print("✅ Velocidade do vento normal")
        
        print("\n" + "="*60)
        print("Relatório meteorológico gerado com sucesso!")
        print("Nota: Dados simulados para demonstração.")
        print("Em produção, conectaria com API meteorológica real.")
        print("="*60)

def main():
    """Função principal - Menu interativo"""
    simulator = RSimulator()
    
    while True:
        print("\n" + "="*50)
        print("    FIAP FARM - SIMULADOR R (Python)")
        print("         FarmTech Solutions")
        print("="*50)
        print("1. Análise Estatística Completa")
        print("2. Análise de Produção")
        print("3. Análise de Custos")
        print("4. Análise de Áreas")
        print("5. Análise de Temperaturas")
        print("6. Relatório Meteorológico - São Paulo")
        print("7. Relatório Meteorológico - Rio de Janeiro")
        print("8. Relatório Meteorológico - Brasília")
        print("9. Sair")
        print("="*50)
        
        try:
            opcao = input("Escolha uma opção (1-9): ").strip()
            
            if opcao == "1":
                simulator.gerar_relatorio_estatistico()
            elif opcao == "2":
                simulator.gerar_relatorio_estatistico("producao")
            elif opcao == "3":
                simulator.gerar_relatorio_estatistico("custos")
            elif opcao == "4":
                simulator.gerar_relatorio_estatistico("areas")
            elif opcao == "5":
                simulator.gerar_relatorio_estatistico("temperaturas")
            elif opcao == "6":
                simulator.gerar_relatorio_meteorologico("São Paulo")
            elif opcao == "7":
                simulator.gerar_relatorio_meteorologico("Rio de Janeiro")
            elif opcao == "8":
                simulator.gerar_relatorio_meteorologico("Brasília")
            elif opcao == "9":
                print("\n👋 Obrigado por usar o FIAP Farm!")
                print("Sistema encerrado com sucesso.")
                break
            else:
                print("\n❌ Opção inválida! Escolha entre 1-9.")
                
        except KeyboardInterrupt:
            print("\n\n👋 Sistema encerrado pelo usuário.")
            break
        except Exception as e:
            print(f"\n❌ Erro: {e}")
            print("Tente novamente.")

if __name__ == "__main__":
    main()