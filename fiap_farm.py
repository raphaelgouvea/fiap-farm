#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FIAP Farm - Sistema de Gestão Agrícola Digital
FarmTech Solutions

Sistema para gestão de culturas de Laranja e Cana-de-Açúcar
com cálculos de área, manejo de insumos e análises.
"""

import math
import json
from typing import List, Dict, Any

class FazendaData:
    """Classe para armazenar dados das fazendas"""
    def __init__(self):
        self.fazendas = {
            "Barra Grande": {
                "localizacao": "Itirapuã (SP)",
                "cultura": "Cana-de-Açúcar",
                "tipo": "cana"
            },
            "Arcanjo Miguel": {
                "localizacao": "São Miguel Arcanjo (SP)",
                "cultura": "Laranja",
                "tipo": "laranja"
            }
        }

class CalculadoraArea:
    """Classe para cálculos de área de plantio"""
    
    @staticmethod
    def calcular_quadrado(lado: float) -> float:
        """Calcula área de um quadrado"""
        return lado ** 2
    
    @staticmethod
    def calcular_retangulo(largura: float, altura: float) -> float:
        """Calcula área de um retângulo"""
        return largura * altura

class CalculadoraInsumos:
    """Classe para cálculos de manejo de insumos"""
    
    def __init__(self):
        # Dados dos insumos por hectare
        self.corretivos = {
            "calcario": {"min": 1.5, "max": 3.0, "unidade": "toneladas/ha"},
            "gesso": {"min": 1.0, "max": 2.0, "unidade": "toneladas/ha"}
        }
        
        self.fertilizantes = {
            "fosforo": {"min": 80, "max": 150, "unidade": "kg/ha"},
            "potassio": {"min": 150, "max": 250, "unidade": "kg/ha"}
        }
        
        self.defensivos = {
            "pulverizacoes": {"min": 4, "max": 8, "unidade": "aplicações/ano"},
            "calda": {"min": 150, "max": 250, "unidade": "L/ha por aplicação"}
        }
    
    def calcular_corretivos(self, hectares: float, tipo: str, quantidade: str = "media") -> Dict[str, float]:
        """Calcula quantidade de corretivos necessários"""
        resultado = {}
        
        for corretivo, dados in self.corretivos.items():
            if quantidade == "minima":
                valor = dados["min"]
            elif quantidade == "maxima":
                valor = dados["max"]
            else:  # média
                valor = (dados["min"] + dados["max"]) / 2
            
            resultado[corretivo] = valor * hectares
        
        return resultado
    
    def calcular_fertilizantes(self, hectares: float, quantidade: str = "media") -> Dict[str, float]:
        """Calcula quantidade de fertilizantes necessários"""
        resultado = {}
        
        for fertilizante, dados in self.fertilizantes.items():
            if quantidade == "minima":
                valor = dados["min"]
            elif quantidade == "maxima":
                valor = dados["max"]
            else:  # média
                valor = (dados["min"] + dados["max"]) / 2
            
            resultado[fertilizante] = valor * hectares
        
        return resultado
    
    def calcular_defensivos(self, hectares: float, quantidade: str = "media") -> Dict[str, float]:
        """Calcula quantidade de defensivos necessários"""
        resultado = {}
        
        if quantidade == "minima":
            pulv = self.defensivos["pulverizacoes"]["min"]
            calda = self.defensivos["calda"]["min"]
        elif quantidade == "maxima":
            pulv = self.defensivos["pulverizacoes"]["max"]
            calda = self.defensivos["calda"]["max"]
        else:  # média
            pulv = (self.defensivos["pulverizacoes"]["min"] + self.defensivos["pulverizacoes"]["max"]) / 2
            calda = (self.defensivos["calda"]["min"] + self.defensivos["calda"]["max"]) / 2
        
        resultado["pulverizacoes_ano"] = pulv
        resultado["calda_total_litros"] = calda * pulv * hectares
        
        return resultado

class GerenciadorDados:
    """Classe para gerenciar dados em vetores/listas"""
    
    def __init__(self):
        self.dados_plantio: List[Dict[str, Any]] = []
        self.dados_insumos: List[Dict[str, Any]] = []
    
    def adicionar_plantio(self, dados: Dict[str, Any]) -> None:
        """Adiciona dados de plantio ao vetor"""
        dados['id'] = len(self.dados_plantio) + 1
        self.dados_plantio.append(dados)
    
    def adicionar_insumos(self, dados: Dict[str, Any]) -> None:
        """Adiciona dados de insumos ao vetor"""
        dados['id'] = len(self.dados_insumos) + 1
        self.dados_insumos.append(dados)
    
    def atualizar_plantio(self, indice: int, novos_dados: Dict[str, Any]) -> bool:
        """Atualiza dados de plantio em posição específica"""
        if 0 <= indice < len(self.dados_plantio):
            novos_dados['id'] = self.dados_plantio[indice]['id']
            self.dados_plantio[indice] = novos_dados
            return True
        return False
    
    def atualizar_insumos(self, indice: int, novos_dados: Dict[str, Any]) -> bool:
        """Atualiza dados de insumos em posição específica"""
        if 0 <= indice < len(self.dados_insumos):
            novos_dados['id'] = self.dados_insumos[indice]['id']
            self.dados_insumos[indice] = novos_dados
            return True
        return False
    
    def deletar_plantio(self, indice: int) -> bool:
        """Deleta dados de plantio"""
        if 0 <= indice < len(self.dados_plantio):
            del self.dados_plantio[indice]
            return True
        return False
    
    def deletar_insumos(self, indice: int) -> bool:
        """Deleta dados de insumos"""
        if 0 <= indice < len(self.dados_insumos):
            del self.dados_insumos[indice]
            return True
        return False
    
    def listar_plantio(self) -> List[Dict[str, Any]]:
        """Lista todos os dados de plantio"""
        return self.dados_plantio
    
    def listar_insumos(self) -> List[Dict[str, Any]]:
        """Lista todos os dados de insumos"""
        return self.dados_insumos

class FiapFarmSystem:
    """Sistema principal FIAP Farm"""
    
    def __init__(self):
        self.fazenda_data = FazendaData()
        self.calc_area = CalculadoraArea()
        self.calc_insumos = CalculadoraInsumos()
        self.gerenciador = GerenciadorDados()
    
    def exibir_menu_principal(self) -> None:
        """Exibe o menu principal do sistema"""
        print("\n" + "="*50)
        print("    FIAP FARM - SISTEMA DE GESTÃO AGRÍCOLA")
        print("         FarmTech Solutions")
        print("="*50)
        print("1. Gerenciar Culturas")
        print("2. Calcular Área de Plantio")
        print("3. Calcular Manejo de Insumos")
        print("4. Gerenciar Dados (CRUD)")
        print("5. Relatórios")
        print("0. Sair do Programa")
        print("="*50)
    
    def menu_culturas(self) -> None:
        """Menu para gerenciamento de culturas"""
        while True:
            print("\n--- GERENCIAMENTO DE CULTURAS ---")
            print("1. Listar Fazendas")
            print("2. Detalhes da Fazenda")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.listar_fazendas()
            elif opcao == "2":
                self.detalhes_fazenda()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
    
    def listar_fazendas(self) -> None:
        """Lista todas as fazendas cadastradas"""
        print("\n--- FAZENDAS CADASTRADAS ---")
        for nome, dados in self.fazenda_data.fazendas.items():
            print(f"Fazenda: {nome}")
            print(f"  Localização: {dados['localizacao']}")
            print(f"  Cultura: {dados['cultura']}")
            print("-" * 30)
    
    def detalhes_fazenda(self) -> None:
        """Exibe detalhes de uma fazenda específica"""
        print("\nFazendas disponíveis:")
        fazendas = list(self.fazenda_data.fazendas.keys())
        for i, nome in enumerate(fazendas, 1):
            print(f"{i}. {nome}")
        
        try:
            escolha = int(input("\nEscolha uma fazenda (número): ")) - 1
            if 0 <= escolha < len(fazendas):
                nome = fazendas[escolha]
                dados = self.fazenda_data.fazendas[nome]
                print(f"\n--- DETALHES DA FAZENDA {nome.upper()} ---")
                print(f"Localização: {dados['localizacao']}")
                print(f"Cultura Principal: {dados['cultura']}")
                print(f"Tipo de Cultura: {dados['tipo']}")
            else:
                print("Fazenda não encontrada!")
        except ValueError:
            print("Entrada inválida!")
    
    def menu_area(self) -> None:
        """Menu para cálculo de área"""
        while True:
            print("\n--- CÁLCULO DE ÁREA DE PLANTIO ---")
            print("1. Calcular Área Quadrada")
            print("2. Calcular Área Retangular")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.calcular_area_quadrada()
            elif opcao == "2":
                self.calcular_area_retangular()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
    
    def calcular_area_quadrada(self) -> None:
        """Calcula área quadrada"""
        try:
            lado = float(input("\nDigite o lado do quadrado (metros): "))
            if lado <= 0:
                print("O lado deve ser maior que zero!")
                return
            
            area_m2 = self.calc_area.calcular_quadrado(lado)
            area_ha = area_m2 / 10000  # Conversão para hectares
            
            print(f"\n--- RESULTADO ---")
            print(f"Área: {area_m2:.2f} m²")
            print(f"Área: {area_ha:.4f} hectares")
            
            # Salvar dados
            dados = {
                "tipo": "quadrado",
                "lado": lado,
                "area_m2": area_m2,
                "area_ha": area_ha
            }
            self.gerenciador.adicionar_plantio(dados)
            print("Dados salvos com sucesso!")
            
        except ValueError:
            print("Entrada inválida! Digite um número válido.")
    
    def calcular_area_retangular(self) -> None:
        """Calcula área retangular"""
        try:
            largura = float(input("\nDigite a largura do retângulo (metros): "))
            altura = float(input("Digite a altura do retângulo (metros): "))
            
            if largura <= 0 or altura <= 0:
                print("Largura e altura devem ser maiores que zero!")
                return
            
            area_m2 = self.calc_area.calcular_retangulo(largura, altura)
            area_ha = area_m2 / 10000  # Conversão para hectares
            
            print(f"\n--- RESULTADO ---")
            print(f"Área: {area_m2:.2f} m²")
            print(f"Área: {area_ha:.4f} hectares")
            
            # Salvar dados
            dados = {
                "tipo": "retangulo",
                "largura": largura,
                "altura": altura,
                "area_m2": area_m2,
                "area_ha": area_ha
            }
            self.gerenciador.adicionar_plantio(dados)
            print("Dados salvos com sucesso!")
            
        except ValueError:
            print("Entrada inválida! Digite números válidos.")
    
    def menu_insumos(self) -> None:
        """Menu para cálculo de insumos"""
        while True:
            print("\n--- CÁLCULO DE MANEJO DE INSUMOS ---")
            print("1. Calcular Corretivos de Solo")
            print("2. Calcular Fertilizantes")
            print("3. Calcular Defensivos Agrícolas")
            print("4. Calcular Todos os Insumos")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.calcular_corretivos()
            elif opcao == "2":
                self.calcular_fertilizantes()
            elif opcao == "3":
                self.calcular_defensivos()
            elif opcao == "4":
                self.calcular_todos_insumos()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
    
    def obter_hectares_e_quantidade(self) -> tuple:
        """Obtém hectares e tipo de quantidade do usuário"""
        try:
            hectares = float(input("\nDigite a área em hectares: "))
            if hectares <= 0:
                print("A área deve ser maior que zero!")
                return None, None
            
            print("\nTipo de quantidade:")
            print("1. Mínima")
            print("2. Média")
            print("3. Máxima")
            
            tipo_opcao = input("Escolha o tipo (1-3): ")
            tipo_map = {"1": "minima", "2": "media", "3": "maxima"}
            
            if tipo_opcao not in tipo_map:
                print("Opção inválida!")
                return None, None
            
            return hectares, tipo_map[tipo_opcao]
            
        except ValueError:
            print("Entrada inválida! Digite um número válido.")
            return None, None
    
    def calcular_corretivos(self) -> None:
        """Calcula corretivos de solo"""
        hectares, quantidade = self.obter_hectares_e_quantidade()
        if hectares is None:
            return
        
        resultado = self.calc_insumos.calcular_corretivos(hectares, "solo", quantidade)
        
        print(f"\n--- CORRETIVOS DE SOLO ({quantidade.upper()}) ---")
        print(f"Área: {hectares} hectares")
        print(f"Calcário: {resultado['calcario']:.2f} toneladas")
        print(f"Gesso Agrícola: {resultado['gesso']:.2f} toneladas")
        
        # Salvar dados
        dados = {
            "tipo": "corretivos",
            "hectares": hectares,
            "quantidade": quantidade,
            "calcario": resultado['calcario'],
            "gesso": resultado['gesso']
        }
        self.gerenciador.adicionar_insumos(dados)
        print("\nDados salvos com sucesso!")
    
    def calcular_fertilizantes(self) -> None:
        """Calcula fertilizantes"""
        hectares, quantidade = self.obter_hectares_e_quantidade()
        if hectares is None:
            return
        
        resultado = self.calc_insumos.calcular_fertilizantes(hectares, quantidade)
        
        print(f"\n--- FERTILIZANTES ({quantidade.upper()}) ---")
        print(f"Área: {hectares} hectares")
        print(f"Fósforo (P₂O₅): {resultado['fosforo']:.2f} kg")
        print(f"Potássio (K₂O): {resultado['potassio']:.2f} kg")
        
        # Salvar dados
        dados = {
            "tipo": "fertilizantes",
            "hectares": hectares,
            "quantidade": quantidade,
            "fosforo": resultado['fosforo'],
            "potassio": resultado['potassio']
        }
        self.gerenciador.adicionar_insumos(dados)
        print("\nDados salvos com sucesso!")
    
    def calcular_defensivos(self) -> None:
        """Calcula defensivos agrícolas"""
        hectares, quantidade = self.obter_hectares_e_quantidade()
        if hectares is None:
            return
        
        resultado = self.calc_insumos.calcular_defensivos(hectares, quantidade)
        
        print(f"\n--- DEFENSIVOS AGRÍCOLAS ({quantidade.upper()}) ---")
        print(f"Área: {hectares} hectares")
        print(f"Pulverizações por ano: {resultado['pulverizacoes_ano']:.0f}")
        print(f"Total de calda necessária: {resultado['calda_total_litros']:.2f} litros")
        
        # Salvar dados
        dados = {
            "tipo": "defensivos",
            "hectares": hectares,
            "quantidade": quantidade,
            "pulverizacoes": resultado['pulverizacoes_ano'],
            "calda_litros": resultado['calda_total_litros']
        }
        self.gerenciador.adicionar_insumos(dados)
        print("\nDados salvos com sucesso!")
    
    def calcular_todos_insumos(self) -> None:
        """Calcula todos os insumos de uma vez"""
        hectares, quantidade = self.obter_hectares_e_quantidade()
        if hectares is None:
            return
        
        corretivos = self.calc_insumos.calcular_corretivos(hectares, "solo", quantidade)
        fertilizantes = self.calc_insumos.calcular_fertilizantes(hectares, quantidade)
        defensivos = self.calc_insumos.calcular_defensivos(hectares, quantidade)
        
        print(f"\n--- RELATÓRIO COMPLETO DE INSUMOS ({quantidade.upper()}) ---")
        print(f"Área: {hectares} hectares")
        print("\n1. CORRETIVOS DE SOLO:")
        print(f"   Calcário: {corretivos['calcario']:.2f} toneladas")
        print(f"   Gesso Agrícola: {corretivos['gesso']:.2f} toneladas")
        print("\n2. FERTILIZANTES:")
        print(f"   Fósforo (P₂O₅): {fertilizantes['fosforo']:.2f} kg")
        print(f"   Potássio (K₂O): {fertilizantes['potassio']:.2f} kg")
        print("\n3. DEFENSIVOS AGRÍCOLAS:")
        print(f"   Pulverizações por ano: {defensivos['pulverizacoes_ano']:.0f}")
        print(f"   Total de calda: {defensivos['calda_total_litros']:.2f} litros")
        
        # Salvar dados completos
        dados = {
            "tipo": "completo",
            "hectares": hectares,
            "quantidade": quantidade,
            "corretivos": corretivos,
            "fertilizantes": fertilizantes,
            "defensivos": defensivos
        }
        self.gerenciador.adicionar_insumos(dados)
        print("\nDados salvos com sucesso!")
    
    def menu_crud(self) -> None:
        """Menu para operações CRUD"""
        while True:
            print("\n--- GERENCIAMENTO DE DADOS (CRUD) ---")
            print("1. Listar Dados de Plantio")
            print("2. Listar Dados de Insumos")
            print("3. Atualizar Dados de Plantio")
            print("4. Atualizar Dados de Insumos")
            print("5. Deletar Dados de Plantio")
            print("6. Deletar Dados de Insumos")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.listar_dados_plantio()
            elif opcao == "2":
                self.listar_dados_insumos()
            elif opcao == "3":
                self.atualizar_dados_plantio()
            elif opcao == "4":
                self.atualizar_dados_insumos()
            elif opcao == "5":
                self.deletar_dados_plantio()
            elif opcao == "6":
                self.deletar_dados_insumos()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
    
    def listar_dados_plantio(self) -> None:
        """Lista todos os dados de plantio"""
        dados = self.gerenciador.listar_plantio()
        if not dados:
            print("\nNenhum dado de plantio encontrado.")
            return
        
        print("\n--- DADOS DE PLANTIO ---")
        for i, item in enumerate(dados):
            print(f"\nÍndice: {i} | ID: {item['id']}")
            print(f"Tipo: {item['tipo']}")
            if item['tipo'] == 'quadrado':
                print(f"Lado: {item['lado']} m")
            else:
                print(f"Largura: {item['largura']} m")
                print(f"Altura: {item['altura']} m")
            print(f"Área: {item['area_m2']:.2f} m² ({item['area_ha']:.4f} ha)")
            print("-" * 30)
    
    def listar_dados_insumos(self) -> None:
        """Lista todos os dados de insumos"""
        dados = self.gerenciador.listar_insumos()
        if not dados:
            print("\nNenhum dado de insumos encontrado.")
            return
        
        print("\n--- DADOS DE INSUMOS ---")
        for i, item in enumerate(dados):
            print(f"\nÍndice: {i} | ID: {item['id']}")
            print(f"Tipo: {item['tipo']}")
            print(f"Hectares: {item['hectares']}")
            print(f"Quantidade: {item['quantidade']}")
            
            if item['tipo'] == 'corretivos':
                print(f"Calcário: {item['calcario']:.2f} ton")
                print(f"Gesso: {item['gesso']:.2f} ton")
            elif item['tipo'] == 'fertilizantes':
                print(f"Fósforo: {item['fosforo']:.2f} kg")
                print(f"Potássio: {item['potassio']:.2f} kg")
            elif item['tipo'] == 'defensivos':
                print(f"Pulverizações: {item['pulverizacoes']:.0f}")
                print(f"Calda: {item['calda_litros']:.2f} L")
            
            print("-" * 30)
    
    def atualizar_dados_plantio(self) -> None:
        """Atualiza dados de plantio"""
        self.listar_dados_plantio()
        dados = self.gerenciador.listar_plantio()
        
        if not dados:
            return
        
        try:
            indice = int(input("\nDigite o índice do item a atualizar: "))
            if indice < 0 or indice >= len(dados):
                print("Índice inválido!")
                return
            
            item_atual = dados[indice]
            print(f"\nAtualizando item: {item_atual['tipo']}")
            
            if item_atual['tipo'] == 'quadrado':
                lado = float(input(f"Novo lado (atual: {item_atual['lado']}): "))
                area_m2 = self.calc_area.calcular_quadrado(lado)
                area_ha = area_m2 / 10000
                
                novos_dados = {
                    "tipo": "quadrado",
                    "lado": lado,
                    "area_m2": area_m2,
                    "area_ha": area_ha
                }
            else:
                largura = float(input(f"Nova largura (atual: {item_atual['largura']}): "))
                altura = float(input(f"Nova altura (atual: {item_atual['altura']}): "))
                area_m2 = self.calc_area.calcular_retangulo(largura, altura)
                area_ha = area_m2 / 10000
                
                novos_dados = {
                    "tipo": "retangulo",
                    "largura": largura,
                    "altura": altura,
                    "area_m2": area_m2,
                    "area_ha": area_ha
                }
            
            if self.gerenciador.atualizar_plantio(indice, novos_dados):
                print("Dados atualizados com sucesso!")
            else:
                print("Erro ao atualizar dados!")
                
        except (ValueError, IndexError):
            print("Entrada inválida!")
    
    def atualizar_dados_insumos(self) -> None:
        """Atualiza dados de insumos"""
        self.listar_dados_insumos()
        dados = self.gerenciador.listar_insumos()
        
        if not dados:
            return
        
        try:
            indice = int(input("\nDigite o índice do item a atualizar: "))
            if indice < 0 or indice >= len(dados):
                print("Índice inválido!")
                return
            
            item_atual = dados[indice]
            print(f"\nAtualizando item: {item_atual['tipo']}")
            
            hectares = float(input(f"Novos hectares (atual: {item_atual['hectares']}): "))
            
            print("\nTipo de quantidade:")
            print("1. Mínima")
            print("2. Média")
            print("3. Máxima")
            
            tipo_opcao = input("Escolha o tipo (1-3): ")
            tipo_map = {"1": "minima", "2": "media", "3": "maxima"}
            
            if tipo_opcao not in tipo_map:
                print("Opção inválida!")
                return
            
            quantidade = tipo_map[tipo_opcao]
            
            # Recalcular com novos valores
            if item_atual['tipo'] == 'corretivos':
                resultado = self.calc_insumos.calcular_corretivos(hectares, "solo", quantidade)
                novos_dados = {
                    "tipo": "corretivos",
                    "hectares": hectares,
                    "quantidade": quantidade,
                    "calcario": resultado['calcario'],
                    "gesso": resultado['gesso']
                }
            elif item_atual['tipo'] == 'fertilizantes':
                resultado = self.calc_insumos.calcular_fertilizantes(hectares, quantidade)
                novos_dados = {
                    "tipo": "fertilizantes",
                    "hectares": hectares,
                    "quantidade": quantidade,
                    "fosforo": resultado['fosforo'],
                    "potassio": resultado['potassio']
                }
            elif item_atual['tipo'] == 'defensivos':
                resultado = self.calc_insumos.calcular_defensivos(hectares, quantidade)
                novos_dados = {
                    "tipo": "defensivos",
                    "hectares": hectares,
                    "quantidade": quantidade,
                    "pulverizacoes": resultado['pulverizacoes_ano'],
                    "calda_litros": resultado['calda_total_litros']
                }
            
            if self.gerenciador.atualizar_insumos(indice, novos_dados):
                print("Dados atualizados com sucesso!")
            else:
                print("Erro ao atualizar dados!")
                
        except (ValueError, IndexError):
            print("Entrada inválida!")
    
    def deletar_dados_plantio(self) -> None:
        """Deleta dados de plantio"""
        self.listar_dados_plantio()
        dados = self.gerenciador.listar_plantio()
        
        if not dados:
            return
        
        try:
            indice = int(input("\nDigite o índice do item a deletar: "))
            if indice < 0 or indice >= len(dados):
                print("Índice inválido!")
                return
            
            confirmacao = input("Tem certeza que deseja deletar? (s/n): ")
            if confirmacao.lower() == 's':
                if self.gerenciador.deletar_plantio(indice):
                    print("Dados deletados com sucesso!")
                else:
                    print("Erro ao deletar dados!")
            else:
                print("Operação cancelada.")
                
        except (ValueError, IndexError):
            print("Entrada inválida!")
    
    def deletar_dados_insumos(self) -> None:
        """Deleta dados de insumos"""
        self.listar_dados_insumos()
        dados = self.gerenciador.listar_insumos()
        
        if not dados:
            return
        
        try:
            indice = int(input("\nDigite o índice do item a deletar: "))
            if indice < 0 or indice >= len(dados):
                print("Índice inválido!")
                return
            
            confirmacao = input("Tem certeza que deseja deletar? (s/n): ")
            if confirmacao.lower() == 's':
                if self.gerenciador.deletar_insumos(indice):
                    print("Dados deletados com sucesso!")
                else:
                    print("Erro ao deletar dados!")
            else:
                print("Operação cancelada.")
                
        except (ValueError, IndexError):
            print("Entrada inválida!")
    
    def menu_relatorios(self) -> None:
        """Menu de relatórios"""
        while True:
            print("\n--- RELATÓRIOS ---")
            print("1. Resumo Geral")
            print("2. Exportar Dados")
            print("0. Voltar")
            
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.gerar_resumo_geral()
            elif opcao == "2":
                self.exportar_dados()
            elif opcao == "0":
                break
            else:
                print("Opção inválida!")
    
    def gerar_resumo_geral(self) -> None:
        """Gera resumo geral dos dados"""
        plantio = self.gerenciador.listar_plantio()
        insumos = self.gerenciador.listar_insumos()
        
        print("\n" + "="*50)
        print("           RESUMO GERAL - FIAP FARM")
        print("="*50)
        
        # Resumo de plantio
        if plantio:
            total_area_ha = sum(item['area_ha'] for item in plantio)
            print(f"\nDados de Plantio:")
            print(f"  Total de registros: {len(plantio)}")
            print(f"  Área total: {total_area_ha:.4f} hectares")
            
            quadrados = [item for item in plantio if item['tipo'] == 'quadrado']
            retangulos = [item for item in plantio if item['tipo'] == 'retangulo']
            
            if quadrados:
                area_quadrados = sum(item['area_ha'] for item in quadrados)
                print(f"  Áreas quadradas: {len(quadrados)} ({area_quadrados:.4f} ha)")
            
            if retangulos:
                area_retangulos = sum(item['area_ha'] for item in retangulos)
                print(f"  Áreas retangulares: {len(retangulos)} ({area_retangulos:.4f} ha)")
        else:
            print("\nNenhum dado de plantio registrado.")
        
        # Resumo de insumos
        if insumos:
            print(f"\nDados de Insumos:")
            print(f"  Total de registros: {len(insumos)}")
            
            tipos = {}
            for item in insumos:
                tipo = item['tipo']
                if tipo not in tipos:
                    tipos[tipo] = 0
                tipos[tipo] += 1
            
            for tipo, count in tipos.items():
                print(f"  {tipo.capitalize()}: {count} registros")
        else:
            print("\nNenhum dado de insumos registrado.")
        
        print("\n" + "="*50)
    
    def exportar_dados(self) -> None:
        """Exporta dados para arquivo JSON"""
        dados_export = {
            "fazendas": self.fazenda_data.fazendas,
            "plantio": self.gerenciador.listar_plantio(),
            "insumos": self.gerenciador.listar_insumos()
        }
        
        try:
            with open("fiap_farm_dados.json", "w", encoding="utf-8") as arquivo:
                json.dump(dados_export, arquivo, indent=2, ensure_ascii=False)
            print("\nDados exportados com sucesso para 'fiap_farm_dados.json'!")
        except Exception as e:
            print(f"\nErro ao exportar dados: {e}")
    
    def executar(self) -> None:
        """Executa o sistema principal"""
        print("\nBem-vindo ao FIAP Farm!")
        print("Sistema de Gestão Agrícola Digital")
        
        while True:
            self.exibir_menu_principal()
            opcao = input("\nEscolha uma opção: ")
            
            if opcao == "1":
                self.menu_culturas()
            elif opcao == "2":
                self.menu_area()
            elif opcao == "3":
                self.menu_insumos()
            elif opcao == "4":
                self.menu_crud()
            elif opcao == "5":
                self.menu_relatorios()
            elif opcao == "0":
                print("\nObrigado por usar o FIAP Farm!")
                print("Sistema desenvolvido pela FarmTech Solutions")
                break
            else:
                print("\nOpção inválida! Tente novamente.")

def main():
    """Função principal"""
    sistema = FiapFarmSystem()
    sistema.executar()

if __name__ == "__main__":
    main()