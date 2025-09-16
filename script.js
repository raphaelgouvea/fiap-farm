// FIAP Farm - Sistema de Gestão Agrícola
// FarmTech Solutions - JavaScript Interativo

// Dados simulados para demonstração
let dadosSimulados = {
    plantio: [
        {
            id: 1,
            fazenda: "Fazenda Arcanjo Miguel",
            cultura: "Laranja",
            area_hectares: 2.5,
            tipo_area: "retangulo",
            dimensoes: { largura: 100, altura: 250 },
            data_criacao: "15/01/2024 10:30:00"
        },
        {
            id: 2,
            fazenda: "Fazenda Barra Grande",
            cultura: "Cana-de-Açúcar",
            area_hectares: 1.8,
            tipo_area: "quadrado",
            dimensoes: { lado: 134.16 },
            data_criacao: "15/01/2024 11:15:00"
        }
    ],
    insumos: [
        {
            id: 1,
            fazenda: "Fazenda Arcanjo Miguel",
            tipo_insumo: "corretivo",
            produto: "Calcário",
            quantidade: 5.0,
            custo: 600.00,
            data_criacao: "15/01/2024 14:20:00"
        },
        {
            id: 2,
            fazenda: "Fazenda Barra Grande",
            tipo_insumo: "fertilizante",
            produto: "Fósforo (P2O5)",
            quantidade: 207.0,
            custo: 931.50,
            data_criacao: "15/01/2024 15:45:00"
        }
    ]
};

// Configurações de insumos
const insumosConfig = {
    corretivo: {
        calcario: { nome: "Calcário", unidade: "t/ha", dosagem: { minima: 1.5, media: 2.0, maxima: 3.0 }, preco: 120.0 },
        gesso: { nome: "Gesso Agrícola", unidade: "t/ha", dosagem: { minima: 1.0, media: 1.5, maxima: 2.0 }, preco: 180.0 }
    },
    fertilizante: {
        fosforo: { nome: "Fósforo (P2O5)", unidade: "kg/ha", dosagem: { minima: 80, media: 115, maxima: 150 }, preco: 4.50 },
        potassio: { nome: "Potássio (K2O)", unidade: "kg/ha", dosagem: { minima: 150, media: 200, maxima: 250 }, preco: 3.20 }
    },
    defensivo: {
        inseticida: { nome: "Inseticida", unidade: "L/ha", dosagem: { minima: 1.5, media: 2.0, maxima: 2.5 }, aplicacoes: { minima: 4, media: 6, maxima: 8 }, preco: 85.0 },
        fungicida: { nome: "Fungicida", unidade: "L/ha", dosagem: { minima: 1.0, media: 1.5, maxima: 2.0 }, aplicacoes: { minima: 3, media: 5, maxima: 7 }, preco: 95.0 }
    }
};

// Informações das fazendas
const fazendas = {
    arcanjo: {
        nome: "Fazenda Arcanjo Miguel",
        localizacao: "São Miguel Arcanjo, SP",
        cultura: "Laranja",
        coordenadas: "-23.8775, -47.9969",
        area_total: 150.5,
        status: "ativa",
        detalhes: {
            ciclo: "Perene",
            colheita: "Maio a Setembro",
            irrigacao: "Necessária",
            ph_ideal: "6.0 - 7.0",
            temperatura_ideal: "18°C - 30°C",
            precipitacao: "1200-1500mm/ano"
        }
    },
    barra: {
        nome: "Fazenda Barra Grande",
        localizacao: "Itirapuã, SP",
        cultura: "Cana-de-Açúcar",
        coordenadas: "-23.7234, -47.8456",
        area_total: 280.3,
        status: "ativa",
        detalhes: {
            ciclo: "12-18 meses",
            colheita: "Abril a Novembro",
            irrigacao: "Opcional",
            ph_ideal: "5.5 - 6.5",
            temperatura_ideal: "20°C - 35°C",
            precipitacao: "1000-1500mm/ano"
        }
    }
};

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFarmCards();
    updateInsumoOptions();
    showMessage('Sistema FIAP Farm carregado com sucesso!', 'success');
});

// Gerenciamento de Abas
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Gerenciamento de Cards de Fazenda
function initializeFarmCards() {
    const farmCards = document.querySelectorAll('.farm-card');
    
    farmCards.forEach(card => {
        card.addEventListener('click', () => {
            const farmId = card.getAttribute('data-farm');
            selectFarm(farmId);
            
            // Update visual selection
            farmCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });
}

// Seleção de Fazenda
function selectFarm(farmId) {
    const fazenda = fazendas[farmId];
    if (!fazenda) return;
    
    const detailsContent = document.querySelector('.farm-details-content');
    detailsContent.innerHTML = `
        <div class="farm-details">
            <h4>${fazenda.nome}</h4>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>📍 Localização:</strong> ${fazenda.localizacao}
                </div>
                <div class="detail-item">
                    <strong>🌱 Cultura:</strong> ${fazenda.cultura}
                </div>
                <div class="detail-item">
                    <strong>📏 Área Total:</strong> ${fazenda.area_total} hectares
                </div>
                <div class="detail-item">
                    <strong>🗺️ Coordenadas:</strong> ${fazenda.coordenadas}
                </div>
                <div class="detail-item">
                    <strong>🔄 Ciclo:</strong> ${fazenda.detalhes.ciclo}
                </div>
                <div class="detail-item">
                    <strong>🌾 Colheita:</strong> ${fazenda.detalhes.colheita}
                </div>
                <div class="detail-item">
                    <strong>💧 Irrigação:</strong> ${fazenda.detalhes.irrigacao}
                </div>
                <div class="detail-item">
                    <strong>⚗️ pH Ideal:</strong> ${fazenda.detalhes.ph_ideal}
                </div>
                <div class="detail-item">
                    <strong>🌡️ Temperatura:</strong> ${fazenda.detalhes.temperatura_ideal}
                </div>
                <div class="detail-item">
                    <strong>🌧️ Precipitação:</strong> ${fazenda.detalhes.precipitacao}
                </div>
            </div>
        </div>
    `;
}

// Cálculo de Área
function toggleAreaInputs() {
    const areaType = document.getElementById('area-type').value;
    const alturaGroup = document.getElementById('altura-group');
    const ladoLabel = document.querySelector('label[for="lado"]');
    const ladoInput = document.getElementById('lado');
    
    if (areaType === 'retangulo') {
        alturaGroup.style.display = 'block';
        ladoLabel.textContent = 'Largura (metros):';
        ladoInput.placeholder = 'Digite a largura em metros';
    } else {
        alturaGroup.style.display = 'none';
        ladoLabel.textContent = 'Lado (metros):';
        ladoInput.placeholder = 'Digite o lado em metros';
    }
}

function calcularArea() {
    const areaType = document.getElementById('area-type').value;
    const lado = parseFloat(document.getElementById('lado').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultDiv = document.getElementById('area-result');
    
    if (!lado || lado <= 0) {
        showMessage('Por favor, insira um valor válido para o lado/largura.', 'error');
        return;
    }
    
    let area_m2, perimetro;
    let dimensoes = {};
    
    if (areaType === 'quadrado') {
        area_m2 = lado * lado;
        perimetro = 4 * lado;
        dimensoes = { lado: lado };
    } else {
        if (!altura || altura <= 0) {
            showMessage('Por favor, insira um valor válido para a altura.', 'error');
            return;
        }
        area_m2 = lado * altura;
        perimetro = 2 * (lado + altura);
        dimensoes = { largura: lado, altura: altura };
    }
    
    const area_hectares = area_m2 / 10000;
    
    resultDiv.innerHTML = `
        <div class="calculation-result">
            <h4>✅ Resultado do Cálculo</h4>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Tipo:</strong> ${areaType === 'quadrado' ? 'Quadrado' : 'Retângulo'}
                </div>
                ${areaType === 'quadrado' ? 
                    `<div class="result-item"><strong>Lado:</strong> ${lado.toFixed(2)} metros</div>` :
                    `<div class="result-item"><strong>Largura:</strong> ${lado.toFixed(2)} metros</div>
                     <div class="result-item"><strong>Altura:</strong> ${altura.toFixed(2)} metros</div>`
                }
                <div class="result-item highlight">
                    <strong>Área:</strong> ${area_m2.toFixed(2)} m² (${area_hectares.toFixed(4)} hectares)
                </div>
                <div class="result-item">
                    <strong>Perímetro:</strong> ${perimetro.toFixed(2)} metros
                </div>
            </div>
            <button class="btn-success" onclick="salvarCalculoArea('${areaType}', ${JSON.stringify(dimensoes)}, ${area_hectares})">
                💾 Salvar Cálculo
            </button>
        </div>
    `;
}

function salvarCalculoArea(tipo, dimensoes, area) {
    const novoRegistro = {
        id: dadosSimulados.plantio.length + 1,
        fazenda: "Fazenda Selecionada",
        cultura: "A definir",
        area_hectares: area,
        tipo_area: tipo,
        dimensoes: dimensoes,
        data_criacao: new Date().toLocaleString('pt-BR')
    };
    
    dadosSimulados.plantio.push(novoRegistro);
    showMessage('Cálculo de área salvo com sucesso!', 'success');
}

// Gerenciamento de Insumos
function updateInsumoOptions() {
    const tipoSelect = document.getElementById('insumo-type');
    const produtoSelect = document.getElementById('insumo-produto');
    
    if (!tipoSelect || !produtoSelect) return;
    
    const tipo = tipoSelect.value;
    const produtos = insumosConfig[tipo];
    
    produtoSelect.innerHTML = '';
    
    for (const [key, produto] of Object.entries(produtos)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = produto.nome;
        produtoSelect.appendChild(option);
    }
}

function calcularInsumo() {
    const tipo = document.getElementById('insumo-type').value;
    const produto = document.getElementById('insumo-produto').value;
    const area = parseFloat(document.getElementById('area-plantio').value);
    const intensidade = document.getElementById('intensidade').value;
    const resultDiv = document.getElementById('insumo-result');
    
    if (!area || area <= 0) {
        showMessage('Por favor, insira uma área válida.', 'error');
        return;
    }
    
    const config = insumosConfig[tipo][produto];
    const dosagem = config.dosagem[intensidade];
    const quantidade = dosagem * area;
    const custo = quantidade * config.preco;
    
    let aplicacoesInfo = '';
    if (config.aplicacoes) {
        const numAplicacoes = config.aplicacoes[intensidade];
        const quantidadePorAplicacao = quantidade / numAplicacoes;
        aplicacoesInfo = `
            <div class="result-item">
                <strong>Aplicações:</strong> ${numAplicacoes} vezes
            </div>
            <div class="result-item">
                <strong>Por Aplicação:</strong> ${quantidadePorAplicacao.toFixed(2)} ${config.unidade}
            </div>
        `;
    }
    
    resultDiv.innerHTML = `
        <div class="calculation-result">
            <h4>✅ Cálculo de ${config.nome}</h4>
            <div class="result-grid">
                <div class="result-item">
                    <strong>Tipo:</strong> ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </div>
                <div class="result-item">
                    <strong>Produto:</strong> ${config.nome}
                </div>
                <div class="result-item">
                    <strong>Área:</strong> ${area.toFixed(2)} hectares
                </div>
                <div class="result-item">
                    <strong>Intensidade:</strong> ${intensidade.charAt(0).toUpperCase() + intensidade.slice(1)}
                </div>
                <div class="result-item">
                    <strong>Dosagem/ha:</strong> ${dosagem.toFixed(2)} ${config.unidade}
                </div>
                <div class="result-item highlight">
                    <strong>Quantidade Total:</strong> ${quantidade.toFixed(2)} ${config.unidade}
                </div>
                ${aplicacoesInfo}
                <div class="result-item highlight">
                    <strong>Custo Total:</strong> R$ ${custo.toFixed(2)}
                </div>
                <div class="result-item">
                    <strong>Preço Unitário:</strong> R$ ${config.preco.toFixed(2)}
                </div>
            </div>
            <button class="btn-success" onclick="salvarCalculoInsumo('${tipo}', '${config.nome}', ${quantidade}, ${custo})">
                💾 Salvar Cálculo
            </button>
        </div>
    `;
}

function salvarCalculoInsumo(tipo, produto, quantidade, custo) {
    const novoRegistro = {
        id: dadosSimulados.insumos.length + 1,
        fazenda: "Fazenda Selecionada",
        tipo_insumo: tipo,
        produto: produto,
        quantidade: quantidade,
        custo: custo,
        data_criacao: new Date().toLocaleString('pt-BR')
    };
    
    dadosSimulados.insumos.push(novoRegistro);
    showMessage('Cálculo de insumo salvo com sucesso!', 'success');
}

// Operações CRUD
function showCreateForm() {
    const content = document.getElementById('crud-content');
    content.innerHTML = `
        <div class="crud-form">
            <h4>➕ Criar Novo Registro</h4>
            <div class="form-group">
                <label for="crud-type">Tipo de Registro:</label>
                <select id="crud-type" onchange="updateCreateForm()">
                    <option value="plantio">Plantio</option>
                    <option value="insumo">Insumo</option>
                </select>
            </div>
            <div id="create-form-fields"></div>
            <button class="btn-success" onclick="createRecord()">Criar Registro</button>
        </div>
    `;
    updateCreateForm();
}

function updateCreateForm() {
    const type = document.getElementById('crud-type').value;
    const fieldsDiv = document.getElementById('create-form-fields');
    
    if (type === 'plantio') {
        fieldsDiv.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="create-fazenda">Fazenda:</label>
                    <select id="create-fazenda">
                        <option value="Fazenda Arcanjo Miguel">Fazenda Arcanjo Miguel</option>
                        <option value="Fazenda Barra Grande">Fazenda Barra Grande</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="create-cultura">Cultura:</label>
                    <select id="create-cultura">
                        <option value="Laranja">Laranja</option>
                        <option value="Cana-de-Açúcar">Cana-de-Açúcar</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="create-area">Área (hectares):</label>
                    <input type="number" id="create-area" step="0.01" placeholder="Ex: 2.5">
                </div>
                <div class="form-group">
                    <label for="create-tipo-area">Tipo de Área:</label>
                    <select id="create-tipo-area">
                        <option value="quadrado">Quadrado</option>
                        <option value="retangulo">Retângulo</option>
                    </select>
                </div>
            </div>
        `;
    } else {
        fieldsDiv.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label for="create-fazenda-insumo">Fazenda:</label>
                    <select id="create-fazenda-insumo">
                        <option value="Fazenda Arcanjo Miguel">Fazenda Arcanjo Miguel</option>
                        <option value="Fazenda Barra Grande">Fazenda Barra Grande</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="create-tipo-insumo">Tipo de Insumo:</label>
                    <select id="create-tipo-insumo">
                        <option value="corretivo">Corretivo</option>
                        <option value="fertilizante">Fertilizante</option>
                        <option value="defensivo">Defensivo</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="create-produto">Produto:</label>
                    <input type="text" id="create-produto" placeholder="Ex: Calcário">
                </div>
                <div class="form-group">
                    <label for="create-quantidade">Quantidade:</label>
                    <input type="number" id="create-quantidade" step="0.01" placeholder="Ex: 5.0">
                </div>
            </div>
            <div class="form-group">
                <label for="create-custo">Custo (R$):</label>
                <input type="number" id="create-custo" step="0.01" placeholder="Ex: 600.00">
            </div>
        `;
    }
}

function createRecord() {
    const type = document.getElementById('crud-type').value;
    
    if (type === 'plantio') {
        const fazenda = document.getElementById('create-fazenda').value;
        const cultura = document.getElementById('create-cultura').value;
        const area = parseFloat(document.getElementById('create-area').value);
        const tipoArea = document.getElementById('create-tipo-area').value;
        
        if (!area || area <= 0) {
            showMessage('Por favor, insira uma área válida.', 'error');
            return;
        }
        
        const novoRegistro = {
            id: dadosSimulados.plantio.length + 1,
            fazenda: fazenda,
            cultura: cultura,
            area_hectares: area,
            tipo_area: tipoArea,
            dimensoes: {},
            data_criacao: new Date().toLocaleString('pt-BR')
        };
        
        dadosSimulados.plantio.push(novoRegistro);
        showMessage('Registro de plantio criado com sucesso!', 'success');
    } else {
        const fazenda = document.getElementById('create-fazenda-insumo').value;
        const tipoInsumo = document.getElementById('create-tipo-insumo').value;
        const produto = document.getElementById('create-produto').value;
        const quantidade = parseFloat(document.getElementById('create-quantidade').value);
        const custo = parseFloat(document.getElementById('create-custo').value);
        
        if (!produto || !quantidade || !custo || quantidade <= 0 || custo <= 0) {
            showMessage('Por favor, preencha todos os campos com valores válidos.', 'error');
            return;
        }
        
        const novoRegistro = {
            id: dadosSimulados.insumos.length + 1,
            fazenda: fazenda,
            tipo_insumo: tipoInsumo,
            produto: produto,
            quantidade: quantidade,
            custo: custo,
            data_criacao: new Date().toLocaleString('pt-BR')
        };
        
        dadosSimulados.insumos.push(novoRegistro);
        showMessage('Registro de insumo criado com sucesso!', 'success');
    }
    
    showReadData();
}

function showReadData() {
    const content = document.getElementById('crud-content');
    
    const plantioTable = dadosSimulados.plantio.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.fazenda}</td>
            <td>${item.cultura}</td>
            <td>${item.area_hectares.toFixed(2)} ha</td>
            <td>${item.tipo_area}</td>
            <td>${item.data_criacao}</td>
            <td>
                <button class="btn-warning" onclick="editRecord('plantio', ${item.id})">✏️</button>
                <button class="btn-danger" onclick="deleteRecord('plantio', ${item.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    const insumosTable = dadosSimulados.insumos.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.fazenda}</td>
            <td>${item.tipo_insumo}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade.toFixed(2)}</td>
            <td>R$ ${item.custo.toFixed(2)}</td>
            <td>${item.data_criacao}</td>
            <td>
                <button class="btn-warning" onclick="editRecord('insumo', ${item.id})">✏️</button>
                <button class="btn-danger" onclick="deleteRecord('insumo', ${item.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    content.innerHTML = `
        <div class="data-tables">
            <h4>📊 Dados de Plantio</h4>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fazenda</th>
                            <th>Cultura</th>
                            <th>Área</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${plantioTable || '<tr><td colspan="7">Nenhum registro encontrado</td></tr>'}
                    </tbody>
                </table>
            </div>
            
            <h4>🧪 Dados de Insumos</h4>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fazenda</th>
                            <th>Tipo</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Custo</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${insumosTable || '<tr><td colspan="8">Nenhum registro encontrado</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function showUpdateForm() {
    const content = document.getElementById('crud-content');
    content.innerHTML = `
        <div class="crud-form">
            <h4>✏️ Atualizar Registro</h4>
            <p>Primeiro, visualize os dados para ver os IDs disponíveis, depois selecione um registro para editar.</p>
            <button class="btn-info" onclick="showReadData()">Ver Dados Primeiro</button>
        </div>
    `;
}

function editRecord(type, id) {
    const content = document.getElementById('crud-content');
    const data = type === 'plantio' ? dadosSimulados.plantio : dadosSimulados.insumos;
    const record = data.find(item => item.id === id);
    
    if (!record) {
        showMessage('Registro não encontrado.', 'error');
        return;
    }
    
    if (type === 'plantio') {
        content.innerHTML = `
            <div class="crud-form">
                <h4>✏️ Editar Registro de Plantio #${id}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-fazenda">Fazenda:</label>
                        <select id="edit-fazenda">
                            <option value="Fazenda Arcanjo Miguel" ${record.fazenda === 'Fazenda Arcanjo Miguel' ? 'selected' : ''}>Fazenda Arcanjo Miguel</option>
                            <option value="Fazenda Barra Grande" ${record.fazenda === 'Fazenda Barra Grande' ? 'selected' : ''}>Fazenda Barra Grande</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit-cultura">Cultura:</label>
                        <select id="edit-cultura">
                            <option value="Laranja" ${record.cultura === 'Laranja' ? 'selected' : ''}>Laranja</option>
                            <option value="Cana-de-Açúcar" ${record.cultura === 'Cana-de-Açúcar' ? 'selected' : ''}>Cana-de-Açúcar</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-area">Área (hectares):</label>
                        <input type="number" id="edit-area" step="0.01" value="${record.area_hectares}">
                    </div>
                    <div class="form-group">
                        <label for="edit-tipo-area">Tipo de Área:</label>
                        <select id="edit-tipo-area">
                            <option value="quadrado" ${record.tipo_area === 'quadrado' ? 'selected' : ''}>Quadrado</option>
                            <option value="retangulo" ${record.tipo_area === 'retangulo' ? 'selected' : ''}>Retângulo</option>
                        </select>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn-success" onclick="updateRecord('plantio', ${id})">💾 Salvar Alterações</button>
                    <button class="btn-info" onclick="showReadData()">❌ Cancelar</button>
                </div>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="crud-form">
                <h4>✏️ Editar Registro de Insumo #${id}</h4>
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-fazenda-insumo">Fazenda:</label>
                        <select id="edit-fazenda-insumo">
                            <option value="Fazenda Arcanjo Miguel" ${record.fazenda === 'Fazenda Arcanjo Miguel' ? 'selected' : ''}>Fazenda Arcanjo Miguel</option>
                            <option value="Fazenda Barra Grande" ${record.fazenda === 'Fazenda Barra Grande' ? 'selected' : ''}>Fazenda Barra Grande</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit-tipo-insumo">Tipo de Insumo:</label>
                        <select id="edit-tipo-insumo">
                            <option value="corretivo" ${record.tipo_insumo === 'corretivo' ? 'selected' : ''}>Corretivo</option>
                            <option value="fertilizante" ${record.tipo_insumo === 'fertilizante' ? 'selected' : ''}>Fertilizante</option>
                            <option value="defensivo" ${record.tipo_insumo === 'defensivo' ? 'selected' : ''}>Defensivo</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-produto">Produto:</label>
                        <input type="text" id="edit-produto" value="${record.produto}">
                    </div>
                    <div class="form-group">
                        <label for="edit-quantidade">Quantidade:</label>
                        <input type="number" id="edit-quantidade" step="0.01" value="${record.quantidade}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="edit-custo">Custo (R$):</label>
                    <input type="number" id="edit-custo" step="0.01" value="${record.custo}">
                </div>
                <div class="form-actions">
                    <button class="btn-success" onclick="updateRecord('insumo', ${id})">💾 Salvar Alterações</button>
                    <button class="btn-info" onclick="showReadData()">❌ Cancelar</button>
                </div>
            </div>
        `;
    }
}

function updateRecord(type, id) {
    const data = type === 'plantio' ? dadosSimulados.plantio : dadosSimulados.insumos;
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        showMessage('Registro não encontrado.', 'error');
        return;
    }
    
    if (type === 'plantio') {
        const fazenda = document.getElementById('edit-fazenda').value;
        const cultura = document.getElementById('edit-cultura').value;
        const area = parseFloat(document.getElementById('edit-area').value);
        const tipoArea = document.getElementById('edit-tipo-area').value;
        
        if (!area || area <= 0) {
            showMessage('Por favor, insira uma área válida.', 'error');
            return;
        }
        
        data[index] = {
            ...data[index],
            fazenda: fazenda,
            cultura: cultura,
            area_hectares: area,
            tipo_area: tipoArea,
            data_atualizacao: new Date().toLocaleString('pt-BR')
        };
    } else {
        const fazenda = document.getElementById('edit-fazenda-insumo').value;
        const tipoInsumo = document.getElementById('edit-tipo-insumo').value;
        const produto = document.getElementById('edit-produto').value;
        const quantidade = parseFloat(document.getElementById('edit-quantidade').value);
        const custo = parseFloat(document.getElementById('edit-custo').value);
        
        if (!produto || !quantidade || !custo || quantidade <= 0 || custo <= 0) {
            showMessage('Por favor, preencha todos os campos com valores válidos.', 'error');
            return;
        }
        
        data[index] = {
            ...data[index],
            fazenda: fazenda,
            tipo_insumo: tipoInsumo,
            produto: produto,
            quantidade: quantidade,
            custo: custo,
            data_atualizacao: new Date().toLocaleString('pt-BR')
        };
    }
    
    showMessage(`Registro ${type} #${id} atualizado com sucesso!`, 'success');
    showReadData();
}

function showDeleteForm() {
    const content = document.getElementById('crud-content');
    content.innerHTML = `
        <div class="crud-form">
            <h4>🗑️ Deletar Registro</h4>
            <p>Primeiro, visualize os dados para ver os IDs disponíveis, depois clique no botão de deletar (🗑️) ao lado do registro que deseja remover.</p>
            <button class="btn-info" onclick="showReadData()">Ver Dados</button>
        </div>
    `;
}

function deleteRecord(type, id) {
    if (!confirm(`Tem certeza que deseja deletar este registro ${type} #${id}?`)) {
        return;
    }
    
    const data = type === 'plantio' ? dadosSimulados.plantio : dadosSimulados.insumos;
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) {
        showMessage('Registro não encontrado.', 'error');
        return;
    }
    
    data.splice(index, 1);
    showMessage(`Registro ${type} #${id} deletado com sucesso!`, 'success');
    showReadData();
}

// Sistema de Relatórios
function generateReport(tipo) {
    const reportDisplay = document.getElementById('report-display');
    
    if (tipo === 'plantio') {
        const dados = dadosSimulados.plantio;
        const totalRegistros = dados.length;
        const areaTotal = dados.reduce((sum, item) => sum + item.area_hectares, 0);
        const areaMedia = totalRegistros > 0 ? areaTotal / totalRegistros : 0;
        
        // Agrupamento por cultura
        const culturas = {};
        dados.forEach(item => {
            if (!culturas[item.cultura]) {
                culturas[item.cultura] = { registros: 0, area: 0 };
            }
            culturas[item.cultura].registros++;
            culturas[item.cultura].area += item.area_hectares;
        });
        
        let culturasHtml = '';
        for (const [cultura, info] of Object.entries(culturas)) {
            const percentual = areaTotal > 0 ? (info.area / areaTotal * 100) : 0;
            culturasHtml += `
                <div class="cultura-item">
                    <strong>${cultura}:</strong> ${info.registros} registros, ${info.area.toFixed(2)} ha (${percentual.toFixed(1)}%)
                </div>
            `;
        }
        
        reportDisplay.innerHTML = `
            <div class="report-content">
                <h4>📊 Relatório de Plantio</h4>
                <div class="report-stats">
                    <div class="stat-item">
                        <strong>Total de Registros:</strong> ${totalRegistros}
                    </div>
                    <div class="stat-item">
                        <strong>Área Total:</strong> ${areaTotal.toFixed(4)} hectares
                    </div>
                    <div class="stat-item">
                        <strong>Área Média:</strong> ${areaMedia.toFixed(4)} hectares
                    </div>
                </div>
                <h5>Distribuição por Cultura:</h5>
                <div class="culturas-list">
                    ${culturasHtml || '<p>Nenhuma cultura encontrada</p>'}
                </div>
                <button class="btn-success" onclick="exportReport('plantio')">📄 Exportar Relatório</button>
            </div>
        `;
    } else if (tipo === 'insumos') {
        const dados = dadosSimulados.insumos;
        const totalRegistros = dados.length;
        const custoTotal = dados.reduce((sum, item) => sum + item.custo, 0);
        const custoMedio = totalRegistros > 0 ? custoTotal / totalRegistros : 0;
        
        // Agrupamento por tipo
        const tipos = {};
        dados.forEach(item => {
            if (!tipos[item.tipo_insumo]) {
                tipos[item.tipo_insumo] = { registros: 0, custo: 0, quantidade: 0 };
            }
            tipos[item.tipo_insumo].registros++;
            tipos[item.tipo_insumo].custo += item.custo;
            tipos[item.tipo_insumo].quantidade += item.quantidade;
        });
        
        let tiposHtml = '';
        for (const [tipo, info] of Object.entries(tipos)) {
            const percentual = custoTotal > 0 ? (info.custo / custoTotal * 100) : 0;
            tiposHtml += `
                <div class="tipo-item">
                    <strong>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}:</strong> 
                    ${info.registros} registros, R$ ${info.custo.toFixed(2)} (${percentual.toFixed(1)}%)
                </div>
            `;
        }
        
        reportDisplay.innerHTML = `
            <div class="report-content">
                <h4>🧪 Relatório de Insumos</h4>
                <div class="report-stats">
                    <div class="stat-item">
                        <strong>Total de Registros:</strong> ${totalRegistros}
                    </div>
                    <div class="stat-item">
                        <strong>Custo Total:</strong> R$ ${custoTotal.toFixed(2)}
                    </div>
                    <div class="stat-item">
                        <strong>Custo Médio:</strong> R$ ${custoMedio.toFixed(2)}
                    </div>
                </div>
                <h5>Distribuição por Tipo:</h5>
                <div class="tipos-list">
                    ${tiposHtml || '<p>Nenhum insumo encontrado</p>'}
                </div>
                <button class="btn-success" onclick="exportReport('insumos')">📄 Exportar Relatório</button>
            </div>
        `;
    } else if (tipo === 'geral') {
        const plantio = dadosSimulados.plantio;
        const insumos = dadosSimulados.insumos;
        
        const totalPlantio = plantio.length;
        const totalInsumos = insumos.length;
        const areaTotal = plantio.reduce((sum, item) => sum + item.area_hectares, 0);
        const custoTotal = insumos.reduce((sum, item) => sum + item.custo, 0);
        
        const custoPorHectare = areaTotal > 0 ? custoTotal / areaTotal : 0;
        const areaMedia = totalPlantio > 0 ? areaTotal / totalPlantio : 0;
        
        reportDisplay.innerHTML = `
            <div class="report-content">
                <h4>📈 Relatório Geral</h4>
                <div class="report-stats">
                    <div class="stat-item">
                        <strong>Registros de Plantio:</strong> ${totalPlantio}
                    </div>
                    <div class="stat-item">
                        <strong>Registros de Insumos:</strong> ${totalInsumos}
                    </div>
                    <div class="stat-item">
                        <strong>Área Total:</strong> ${areaTotal.toFixed(4)} hectares
                    </div>
                    <div class="stat-item">
                        <strong>Custo Total:</strong> R$ ${custoTotal.toFixed(2)}
                    </div>
                    <div class="stat-item highlight">
                        <strong>Custo por Hectare:</strong> R$ ${custoPorHectare.toFixed(2)}
                    </div>
                    <div class="stat-item">
                        <strong>Área Média por Plantio:</strong> ${areaMedia.toFixed(4)} hectares
                    </div>
                </div>
                <div class="analysis-section">
                    <h5>📊 Análises:</h5>
                    <div class="analysis-item">
                        💰 <strong>Eficiência de Custo:</strong> 
                        ${custoPorHectare < 500 ? 'Excelente' : custoPorHectare < 1000 ? 'Boa' : 'Pode melhorar'}
                    </div>
                    <div class="analysis-item">
                        📏 <strong>Tamanho Médio dos Plantios:</strong> 
                        ${areaMedia < 1 ? 'Pequeno' : areaMedia < 3 ? 'Médio' : 'Grande'}
                    </div>
                    <div class="analysis-item">
                        📈 <strong>Diversificação:</strong> 
                        ${new Set(plantio.map(p => p.cultura)).size} cultura(s) diferentes
                    </div>
                </div>
                <button class="btn-success" onclick="exportReport('geral')">📄 Exportar Relatório</button>
            </div>
        `;
    }
}

function exportReport(tipo) {
    const dados = {
        plantio: dadosSimulados.plantio,
        insumos: dadosSimulados.insumos,
        data_exportacao: new Date().toLocaleString('pt-BR'),
        tipo_relatorio: tipo
    };
    
    const dataStr = JSON.stringify(dados, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `fiap_farm_relatorio_${tipo}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showMessage(`Relatório ${tipo} exportado com sucesso!`, 'success');
}

// Função para copiar código
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Código copiado para a área de transferência!', 'success');
    }).catch(() => {
        showMessage('Erro ao copiar código. Tente selecionar manualmente.', 'error');
    });
}

// Funcionalidades da Aba 4 - Vetores
function processVectors() {
    const inputs = document.querySelectorAll('.vector-input');
    const vectors = {
        producao: [],
        custos: [],
        areas: [],
        temperaturas: []
    };
    
    // Coleta os dados dos inputs
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            const type = input.dataset.type;
            if (vectors[type]) {
                vectors[type].push(value);
            }
        }
    });
    
    // Exibe os resultados
    const resultsContainer = document.getElementById('vector-results');
    resultsContainer.innerHTML = '';
    resultsContainer.classList.add('has-content');
    
    Object.keys(vectors).forEach(key => {
        if (vectors[key].length > 0) {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="result-title">
                    <span class="data-type-indicator ${key}"></span>
                    ${key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div class="result-value">
                    Vetor: [${vectors[key].join(', ')}]<br>
                    Tamanho: ${vectors[key].length} elementos<br>
                    Soma: ${vectors[key].reduce((a, b) => a + b, 0).toFixed(2)}
                </div>
            `;
            resultsContainer.appendChild(resultItem);
        }
    });
    
    if (resultsContainer.innerHTML === '') {
        resultsContainer.innerHTML = 'Nenhum dado válido inserido.';
        resultsContainer.classList.remove('has-content');
    }
}

// Funcionalidades da Aba 6 - Loops e Decisões
function processLoops() {
    const startValue = parseInt(document.getElementById('loop-start').value) || 1;
    const endValue = parseInt(document.getElementById('loop-end').value) || 10;
    const stepValue = parseInt(document.getElementById('loop-step').value) || 1;
    
    const resultsContainer = document.getElementById('loop-results');
    resultsContainer.innerHTML = '';
    resultsContainer.classList.add('has-content');
    
    let sequence = [];
    let evenNumbers = [];
    let oddNumbers = [];
    let sum = 0;
    
    // Loop com decisões
    for (let i = startValue; i <= endValue; i += stepValue) {
        sequence.push(i);
        sum += i;
        
        if (i % 2 === 0) {
            evenNumbers.push(i);
        } else {
            oddNumbers.push(i);
        }
    }
    
    // Exibe os resultados
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
        <div class="result-title">Resultados do Loop (${startValue} até ${endValue}, passo ${stepValue})</div>
        <div class="result-value">
            <strong>Sequência:</strong> [${sequence.join(', ')}]<br>
            <strong>Números Pares:</strong> [${evenNumbers.join(', ')}]<br>
            <strong>Números Ímpares:</strong> [${oddNumbers.join(', ')}]<br>
            <strong>Soma Total:</strong> ${sum}<br>
            <strong>Quantidade de Elementos:</strong> ${sequence.length}
        </div>
    `;
    resultsContainer.appendChild(resultItem);
}

// Funcionalidades da Aba 7 - Estatísticas
function processStats() {
    const inputs = document.querySelectorAll('.stats-input');
    const values = [];
    
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
            values.push(value);
        }
    });
    
    const resultsContainer = document.getElementById('stats-results');
    
    if (values.length === 0) {
        resultsContainer.innerHTML = 'Nenhum valor válido inserido.';
        resultsContainer.classList.remove('has-content');
        return;
    }
    
    // Cálculos estatísticos (equivalentes ao R)
    const n = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    
    // Desvio padrão
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Outros cálculos
    const sortedValues = [...values].sort((a, b) => a - b);
    const min = sortedValues[0];
    const max = sortedValues[sortedValues.length - 1];
    const median = n % 2 === 0 
        ? (sortedValues[n/2 - 1] + sortedValues[n/2]) / 2 
        : sortedValues[Math.floor(n/2)];
    
    // Coeficiente de variação
    const coefVariacao = mean !== 0 ? (stdDev / mean) * 100 : 0;
    
    resultsContainer.innerHTML = '';
    resultsContainer.classList.add('has-content');
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
        <div class="result-title">📊 Estatísticas Descritivas (Equivalente R)</div>
        <div class="result-value">
            <strong>Dados analisados:</strong> [${values.join(', ')}]<br>
            <strong>Quantidade de observações (n):</strong> ${n}<br>
            <strong>Média:</strong> ${mean.toFixed(4)}<br>
            <strong>Desvio Padrão:</strong> ${stdDev.toFixed(4)}<br>
            <strong>Variância:</strong> ${variance.toFixed(4)}<br>
            <strong>Mediana:</strong> ${median.toFixed(4)}<br>
            <strong>Valor Mínimo:</strong> ${min}<br>
            <strong>Valor Máximo:</strong> ${max}<br>
            <strong>Amplitude:</strong> ${max - min}<br>
            <strong>Coeficiente de Variação:</strong> ${coefVariacao.toFixed(2)}%<br>
            <br>
            <em>✅ Cálculos realizados com algoritmos equivalentes ao R</em>
        </div>
    `;
    resultsContainer.appendChild(resultItem);
    
    showMessage('Análise estatística concluída com sucesso!', 'success');
}

// Funcionalidades da Aba 8 - Meteorologia
function processWeather() {
    const city = document.getElementById('weather-city').value;
    const resultsContainer = document.getElementById('weather-results');
    
    if (!city) {
        resultsContainer.innerHTML = 'Por favor, selecione uma cidade.';
        resultsContainer.classList.remove('has-content');
        return;
    }
    
    // Simulação de dados meteorológicos (em uma implementação real, seria uma chamada à API)
    const weatherData = {
        'sao-paulo': {
            cidade: 'São Paulo',
            temperatura: 23.5,
            umidade: 65,
            pressao: 1013.2,
            vento: 12.3,
            condicao: 'Parcialmente nublado'
        },
        'rio-janeiro': {
            cidade: 'Rio de Janeiro',
            temperatura: 28.2,
            umidade: 72,
            pressao: 1015.8,
            vento: 8.7,
            condicao: 'Ensolarado'
        },
        'brasilia': {
            cidade: 'Brasília',
            temperatura: 25.1,
            umidade: 45,
            pressao: 1012.5,
            vento: 15.2,
            condicao: 'Céu limpo'
        },
        'salvador': {
            cidade: 'Salvador',
            temperatura: 29.8,
            umidade: 78,
            pressao: 1016.3,
            vento: 18.5,
            condicao: 'Parcialmente nublado'
        },
        'belo-horizonte': {
            cidade: 'Belo Horizonte',
            temperatura: 22.7,
            umidade: 58,
            pressao: 1014.1,
            vento: 9.8,
            condicao: 'Nublado'
        }
    };
    
    const data = weatherData[city];
    
    resultsContainer.innerHTML = '';
    resultsContainer.classList.add('has-content');
    
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
        <div class="result-title">🌤️ Dados Meteorológicos - ${data.cidade} (Simulação R)</div>
        <div class="result-value">
            <strong>🌡️ Temperatura:</strong> ${data.temperatura}°C<br>
            <strong>💧 Umidade Relativa:</strong> ${data.umidade}%<br>
            <strong>📊 Pressão Atmosférica:</strong> ${data.pressao} hPa<br>
            <strong>💨 Velocidade do Vento:</strong> ${data.vento} km/h<br>
            <strong>☁️ Condição Geral:</strong> ${data.condicao}<br>
            <br>
            <strong>🌱 Análise Agrícola:</strong><br>
            ${getAnaliseAgricola(data)}<br>
            <br>
            <em>✅ Dados processados com algoritmos equivalentes ao R.<br>
            Em produção, conectaria com API meteorológica real via R.</em>
        </div>
    `;
    resultsContainer.appendChild(resultItem);
    
    showMessage('Dados meteorológicos obtidos com sucesso!', 'success');
}

// Função auxiliar para análise agrícola
function getAnaliseAgricola(data) {
    let analise = [];
    
    if (data.temperatura < 15) {
        analise.push('⚠️ Temperatura baixa - Risco para culturas sensíveis ao frio');
    } else if (data.temperatura > 35) {
        analise.push('⚠️ Temperatura alta - Necessário irrigação adicional');
    } else {
        analise.push('✅ Temperatura adequada para a maioria das culturas');
    }
    
    if (data.umidade < 40) {
        analise.push('⚠️ Umidade baixa - Considerar irrigação');
    } else if (data.umidade > 80) {
        analise.push('⚠️ Umidade alta - Monitorar fungos e pragas');
    } else {
        analise.push('✅ Umidade adequada');
    }
    
    if (data.vento > 25) {
        analise.push('⚠️ Vento forte - Risco para culturas altas');
    } else {
        analise.push('✅ Velocidade do vento normal');
    }
    
    return analise.join('<br>');
}

// Sistema de mensagens
function showMessage(message, type = 'info') {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    messageDiv.innerHTML = `${icon} ${message}`;
    
    // Adiciona no topo do container
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Adicionar estilos para tabelas e elementos adicionais
const additionalStyles = `
<style>
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.data-table th,
.data-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
}

.data-table th {
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
}

.data-table tr:hover {
    background: #f8f9fa;
}

.table-container {
    overflow-x: auto;
    margin: 20px 0;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
}

.result-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.result-item {
    padding: 10px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 3px solid #4CAF50;
}

.result-item.highlight {
    background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
    font-weight: 600;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.detail-item {
    padding: 10px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 3px solid #4CAF50;
}

.report-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin: 20px 0;
}

.stat-item {
    padding: 15px;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 10px;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.stat-item:hover {
    border-color: #4CAF50;
    transform: translateY(-2px);
}

.stat-item.highlight {
    background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
    border-color: #4CAF50;
}

.culturas-list,
.tipos-list {
    margin: 15px 0;
}

.cultura-item,
.tipo-item {
    padding: 10px 15px;
    margin: 8px 0;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 3px solid #4CAF50;
}

.analysis-section {
    margin: 25px 0;
    padding: 20px;
    background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
    border-radius: 15px;
    border: 2px solid #2196F3;
}

.analysis-item {
    margin: 10px 0;
    padding: 10px;
    background: white;
    border-radius: 8px;
    border-left: 3px solid #2196F3;
}

@media (max-width: 768px) {
    .data-table {
        font-size: 0.8rem;
    }
    
    .data-table th,
    .data-table td {
        padding: 8px 10px;
    }
    
    .result-grid,
    .details-grid,
    .report-stats {
        grid-template-columns: 1fr;
    }
    
    .form-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .form-actions button {
        width: 100%;
        max-width: 300px;
    }
}
</style>
`;

// Adicionar estilos adicionais ao head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Função para demonstração inicial
function demonstracao() {
    console.log('🌱 FIAP Farm - Sistema carregado com sucesso!');
    console.log('📊 Dados simulados disponíveis:');
    console.log('- Plantio:', dadosSimulados.plantio.length, 'registros');
    console.log('- Insumos:', dadosSimulados.insumos.length, 'registros');
    console.log('🚀 Interface interativa pronta para uso!');
}

// Executar demonstração
setTimeout(demonstracao, 1000);