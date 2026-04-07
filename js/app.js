  // ===== EPSAFE EP + SAFE - VERSÃO COMPLETA =====
        class EpsafeEP {
            constructor() {
                this.usuarioLogado = null;
                this.tipoUsuario = 'colaborador';
                this.paginaAtual = 'home';
                this.menuAberto = false;
                
                 // Lista de estados e cidades (você pode adicionar mais depois)
    this.estadosCidades = {
      'AC': ['Rio Branco'],
      'AL': ['Maceió', 'Arapiraca'],
      'AM': ['Manaus', 'Parintins'],
      'AP': ['Macapá'],
      'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
      'CE': ['Fortaleza', 'Juazeiro do Norte', 'Sobral'],
      'DF': ['Brasília'],
      'ES': ['Vitória', 'Vila Velha'],
      'GO': ['Goiânia', 'Anápolis'],
      'MA': ['São Luís', 'Imperatriz', 'Timon', 'Caxias'],
      'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
      'MS': ['Campo Grande'],
      'MT': ['Cuiabá'],
      'PA': ['Belém', 'Ananindeua'],
      'PB': ['João Pessoa', 'Campina Grande'],
      'PE': ['Recife', 'Olinda'],
      'PI': ['Teresina', 'Parnaíba', 'Picos', 'Floriano'],
      'PR': ['Curitiba', 'Londrina'],
      'RJ': ['Rio de Janeiro', 'Niterói', 'Duque de Caxias'],
      'RN': ['Natal', 'Mossoró'],
      'RO': ['Porto Velho'],
      'RR': ['Boa Vista'],
      'RS': ['Porto Alegre', 'Caxias do Sul'],
      'SC': ['Florianópolis', 'Joinville'],
      'SE': ['Aracaju'],
      'SP': ['São Paulo', 'Campinas', 'Santos'],
      'TO': ['Palmas']
    };
``
                // Dados de demonstração
                this.usuariosDemo = {
                    colaborador: {
                        id: 'demo-colaborador',
                        tipo: 'colaborador',
                        nome: 'João Silva Santos',
                        username: 'joao.silva',
                        email: 'joao.silva@empresa.com',
                        matricula: '2023001',
                        cargo: 'Técnico de Segurança',
                        setor: 'Segurança do Trabalho',
                        avatar: 'JS'
                    },
                    empresa: {
                        id: 'demo-empresa',
                        tipo: 'empresa',
                        nome: 'Construtora Alpha LTDA',
                        username: 'construtora_alpha',
                        email: 'contato@construtoraalpha.com',
                        razao_social: 'Construtora Alpha LTDA',
                        cnpj: '12.345.678/0001-90',
                        avatar: 'CA'
                    },
                    fornecedor: {
                        id: 'demo-fornecedor',
                        tipo: 'fornecedor',
                        nome: 'EPI Segurança Fornecimentos',
                        username: 'epi_seguranca',
                        email: 'vendas@episeguranca.com',
                        razao_social: 'EPI Segurança Fornecimentos LTDA',
                        cnpj: '98.765.432/0001-10',
                        avatar: 'EP'
                    }
                };
                
                // Páginas válidas para cada tipo de usuário
                this.paginasValidas = {
                    colaborador: ['home', 'dashboard','orientacoes', 'registrar-ocorrencia', 'sugerir-melhoria', 'meus-registros', 'consultar-feedback', 'perfil', 'configuracoes', 'ajuda'],
                    empresa: ['home', 'dashboard-empresa', 'ocorrencias-empresa', 'sugestoes-empresa', 'colaboradores', 'fornecedores-empresa', 'relatorios', 'perfil', 'configuracoes', 'ajuda'],
                    fornecedor: ['home', 'dashboard-fornecedor', 'produtos', 'pedidos', 'empresas-parceiras', 'certificacoes', 'perfil', 'configuracoes', 'ajuda']
                };
                
                this.init();
            }
            
            init() {
                this.carregarDados();
                this.inicializarEventos();
                this.verificarLogin();
                this.inicializarCarrossel();
            }
            
            carregarDados() {
                // Carregar dados do localStorage
                this.usuarios = JSON.parse(localStorage.getItem('senac_usuarios')) || {};
                this.empresas = JSON.parse(localStorage.getItem('senac_empresas')) || [];
                this.fornecedores = JSON.parse(localStorage.getItem('senac_fornecedores')) || [];
                this.produtos = JSON.parse(localStorage.getItem('senac_produtos')) || [];
                this.pedidos = JSON.parse(localStorage.getItem('senac_pedidos')) || [];
                this.ocorrencias = JSON.parse(localStorage.getItem('senac_ocorrencias')) || [];
                this.suporte = JSON.parse(localStorage.getItem('senac_suporte')) || [];
                this.sugestoes = JSON.parse(localStorage.getItem('senac_sugestoes')) || [];
                this.certificacoes = JSON.parse(localStorage.getItem('senac_certificacoes')) || [];
                this.checklistSeguranca = JSON.parse(localStorage.getItem('senac_checklist_seguranca')) || {};

                // Se não houver dados, criar dados de demonstração
                if (Object.keys(this.usuarios).length === 0) {
                    this.usuarios = {
                        'demo-colaborador': this.usuariosDemo.colaborador
                    };
                }

                if (this.empresas.length === 0) {
                    this.empresas = [this.usuariosDemo.empresa];
                }

                if (this.fornecedores.length === 0) {
                    this.fornecedores = [this.usuariosDemo.fornecedor];
                }

                // Criar ocorrência(s) demo se não houver nenhuma (apenas para demonstração)
                if (this.ocorrencias.length === 0) {
                    this.ocorrencias = [
                        {
                            id: 'demo-1',
                            tipo: 'Queda de Material',
                            data: '2024-03-15 14:30',
                            local: 'Área 3',
                            descricao: 'Queda de tijolos próximo à área de trabalho. Ninguém ferido.',
                            autorNome: this.usuariosDemo.colaborador.nome,
                            autorTipo: 'colaborador',
                            status: 'Em análise',
                            imagens: []
                        }
                    ];
                }

                // Demo de produtos/pedidos para fornecedores
                if (this.produtos.length === 0) {
                    this.produtos = [
                        { id: 'p1', nome: 'Capacete de Segurança Modelo A', categoria: 'EPI', preco: 120.00, estoque: 50, fornecedor: this.usuariosDemo.fornecedor.nome },
                        { id: 'p2', nome: 'Luvas de Proteção Nitrílica', categoria: 'EPI', preco: 8.50, estoque: 200, fornecedor: this.usuariosDemo.fornecedor.nome },
                        { id: 'p3', nome: 'Colete Refletivo', categoria: 'EPI', preco: 45.00, estoque: 30, fornecedor: this.usuariosDemo.fornecedor.nome }
                    ];
                }

                if (this.pedidos.length === 0) {
                    this.pedidos = [
                        { id: 'o1001', produtoId: 'p1', quantidade: 10, valor: 1200.00, status: 'Em andamento', data: '2024-03-10' },
                        { id: 'o1002', produtoId: 'p2', quantidade: 50, valor: 425.00, status: 'Concluído', data: '2024-02-25' },
                        { id: 'o1003', produtoId: 'p3', quantidade: 5, valor: 225.00, status: 'Pendente', data: '2024-03-18' }
                    ];
                }

                // Demo de certificações para fornecedores
                if (this.certificacoes.length === 0) {
                    this.certificacoes = [
                        { id: 'cert_001', nome: 'ISO 9001:2015', orgao: 'DNV GL', numero: 'CERT-2023-001', dataEmissao: '2023-01-15', dataValidade: '2026-01-15', documento: 'iso_9001_2023.pdf', observacoes: 'Certificado de gestão de qualidade' },
                        { id: 'cert_002', nome: 'ABNT NBR 15579', orgao: 'ABNT', numero: 'CERT-2023-002', dataEmissao: '2023-06-20', dataValidade: '2025-06-20', documento: 'abnt_15579_2023.pdf', observacoes: 'Qualidade de EPIs' },
                        { id: 'cert_003', nome: 'ISO 45001:2018', orgao: 'Lloyd\'s Register', numero: 'CERT-2023-003', dataEmissao: '2023-03-10', dataValidade: '2026-03-10', documento: 'iso_45001_2023.pdf', observacoes: 'Segurança e saúde no trabalho' }
                    ];
                }

                this.salvarDados();
            }
            
            salvarDados() {
                localStorage.setItem('senac_usuarios', JSON.stringify(this.usuarios));
                localStorage.setItem('senac_empresas', JSON.stringify(this.empresas));
                localStorage.setItem('senac_fornecedores', JSON.stringify(this.fornecedores));
                localStorage.setItem('senac_produtos', JSON.stringify(this.produtos || []));
                localStorage.setItem('senac_pedidos', JSON.stringify(this.pedidos || []));
                localStorage.setItem('senac_ocorrencias', JSON.stringify(this.ocorrencias || []));
                localStorage.setItem('senac_sugestoes', JSON.stringify(this.sugestoes || []));
                localStorage.setItem('senac_suporte', JSON.stringify(this.suporte || []));
                localStorage.setItem('senac_certificacoes', JSON.stringify(this.certificacoes || []));
                localStorage.setItem('senac_checklist_seguranca', JSON.stringify(this.checklistSeguranca || {}));
            }

            resetarChecklist() {
                const checkboxes = document.querySelectorAll('.checklist-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Se houver usuário logado, salvar o estado resetado
                if (this.usuarioLogado) {
                    const userKey = `${this.usuarioLogado.tipo}_${this.usuarioLogado.username || this.usuarioLogado.id}`;
                    const checklistData = {};
                    checkboxes.forEach((checkbox, index) => {
                        checklistData[`item_${index + 1}`] = false;
                    });

                    this.checklistSeguranca[userKey] = {
                        data: new Date().toISOString(),
                        itens: checklistData,
                        usuario: {
                            nome: this.usuarioLogado.nome,
                            tipo: this.usuarioLogado.tipo
                        }
                    };
                    this.salvarDados();
                }

                this.mostrarNotificacao('info', 'Checklist resetado com sucesso!');
            }

            salvarChecklist() {
                if (!this.usuarioLogado) {
                    this.mostrarNotificacao('error', 'Você precisa estar logado para salvar o checklist.');
                    return;
                }

                const checklistData = {};
                const checkboxes = document.querySelectorAll('.checklist-checkbox');

                if (checkboxes.length === 0) {
                    this.mostrarNotificacao('error', 'Nenhum item do checklist encontrado.');
                    return;
                }

                checkboxes.forEach((checkbox, index) => {
                    checklistData[`item_${index + 1}`] = checkbox.checked;
                });

                // Salvar por usuário com chave consistente
                const userKey = `${this.usuarioLogado.tipo}_${this.usuarioLogado.username || this.usuarioLogado.id}`;
                this.checklistSeguranca[userKey] = {
                    data: new Date().toISOString(),
                    itens: checklistData,
                    usuario: {
                        nome: this.usuarioLogado.nome,
                        tipo: this.usuarioLogado.tipo
                    }
                };

                this.salvarDados();
                console.log('Checklist salvo para usuário:', userKey, checklistData);
                this.mostrarNotificacao('success', 'Progresso do checklist salvo com sucesso!');
                
                // Atualizar dashboard se estiver na página
                if (document.getElementById('dashboard') && !document.getElementById('dashboard').classList.contains('hidden')) {
                    this.atualizarDashboardColaborador();
                }
            }

            atualizarDashboardColaborador() {
                if (this.tipoUsuario !== 'colaborador' || !this.usuarioLogado) return;

                // Atualizar estatísticas de ocorrências
                const totalOcorrencias = this.ocorrencias.filter(o => o.autorId === this.usuarioLogado.username).length;
                const ocorrenciasCard = document.querySelector('#dashboard .dashboard-card-value');
                if (ocorrenciasCard) {
                    ocorrenciasCard.textContent = totalOcorrencias;
                }

                // Atualizar estatísticas de sugestões
                const totalSugestoes = this.sugestoes.filter(s => s.autorId === this.usuarioLogado.username).length;
                const sugestoesCards = document.querySelectorAll('#dashboard .dashboard-card-value');
                if (sugestoesCards[1]) {
                    sugestoesCards[1].textContent = totalSugestoes;
                }

                // Atualizar progresso do checklist
                const userKey = `${this.usuarioLogado.tipo}_${this.usuarioLogado.username || this.usuarioLogado.id}`;
                const userChecklist = this.checklistSeguranca[userKey];
                let checklistProgress = 0;
                let checkedItems = 0;
                let totalItems = 5; // Número padrão de itens no checklist

                if (userChecklist && userChecklist.itens) {
                    totalItems = Object.keys(userChecklist.itens).length;
                    checkedItems = Object.values(userChecklist.itens).filter(item => item === true).length;
                    checklistProgress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
                }

                // Atualizar elementos do checklist
                const checklistValue = document.getElementById('checklistProgress');
                const checklistBar = document.getElementById('checklistProgressBar');
                
                if (checklistValue) {
                    checklistValue.textContent = `${checklistProgress}%`;
                }
                if (checklistBar) {
                    checklistBar.style.width = `${checklistProgress}%`;
                }

                console.log(`Dashboard atualizado: ${totalOcorrencias} ocorrências, ${totalSugestoes} sugestões, ${checkedItems}/${totalItems} checklist (${checklistProgress}%)`);
            }
            
            inicializarCarrossel() {
                this.carrossel = new CarrosselOrientacoes();
            }
            
            inicializarEventos() {
                // Login
                document.getElementById('loginForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.fazerLogin();
                });
                
                // Toggle de visibilidade de senha
                document.querySelectorAll('.password-toggle-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const passwordInput = btn.closest('.password-wrapper').querySelector('.password-input');
                        const icon = btn.querySelector('i');
                        
                        if (passwordInput.type === 'password') {
                            passwordInput.type = 'text';
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        } else {
                            passwordInput.type = 'password';
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    });
                });
                
                // Logins de demonstração
                document.querySelectorAll('.demo-login').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const tipo = e.currentTarget.dataset.user;
                        this.loginDemo(tipo);
                    });
                });
                
                // Tipo de usuário no login
                document.querySelectorAll('.user-type-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        this.tipoUsuario = e.currentTarget.dataset.type;
                    });
                });
                                // Logout
                document.getElementById('logoutBtn').addEventListener('click', () => {
                    this.fazerLogout();
                });

                // Menu toggle
                document.getElementById('menuToggle').addEventListener('click', () => {
                    this.toggleMenu();
                });

                // Navegação do menu
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const pagina = e.currentTarget.dataset.page;
                        this.navegarPara(pagina);
                        this.toggleMenu(false);
                    });
                });

                // Tabs de feedback
                document.querySelectorAll('.feedback-tab').forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        const tabId = e.currentTarget.dataset.tab;
                        this.abrirTabFeedback(tabId);
                    });
                });

                // Tabs de perfil
                document.querySelectorAll('.profile-tab').forEach(tab => {
                    tab.addEventListener('click', (e) => {
                        const tabId = e.currentTarget.dataset.tab;
                        this.abrirTabPerfil(tabId);
                    });
                });

                // Preencher filtros rápidos de relatório (quando existir)
                const quickRange = document.getElementById('reportQuickRange');
                const reportStart = document.getElementById('reportStartDate');
                const reportEnd = document.getElementById('reportEndDate');
                if (quickRange) {
                    quickRange.addEventListener('change', () => {
                        if (quickRange.value && quickRange.value !== 'custom') {
                            const days = parseInt(quickRange.value, 10) || 30;
                            const end = new Date();
                            const start = new Date();
                            start.setDate(end.getDate() - days + 1);
                            if (reportStart) reportStart.value = start.toISOString().slice(0,10);
                            if (reportEnd) reportEnd.value = end.toISOString().slice(0,10);
                        } else {
                            if (reportStart) reportStart.value = '';
                            if (reportEnd) reportEnd.value = '';
                        }
                    });
                }

                // Formulários
                document.getElementById('ocorrenciaForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.registrarOcorrencia();
                });

                document.getElementById('sugestaoForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.registrarSugestao();
                });

                // Upload de arquivos
                const fileUpload = document.getElementById('fileUpload');
                const fileInput = document.getElementById('fotosOcorrencia');
                
                if (fileUpload && fileInput) {
                    fileUpload.addEventListener('click', () => fileInput.click());
                    fileInput.addEventListener('change', (e) => this.processarArquivos(e));
                }

                // Botões de cancelamento
                document.getElementById('cancelarOcorrencia')?.addEventListener('click', () => {
                    this.navegarPara('dashboard');
                });

                document.getElementById('cancelarSugestao')?.addEventListener('click', () => {
                    this.navegarPara('dashboard');
                });

                // Botões de ação no header
                document.getElementById('notificationsBtn')?.addEventListener('click', () => {
                    this.mostrarNotificacoes();
                });

                document.getElementById('helpBtn')?.addEventListener('click', () => {
                    this.mostrarAjuda();
                });

                // Scroll do header
                window.addEventListener('scroll', () => {
                    const header = document.querySelector('.header');
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });

                // Fechar menu ao clicar fora (em telas pequenas)
                document.addEventListener('click', (e) => {
                    const sidebar = document.getElementById('sidebar');
                    const menuToggle = document.getElementById('menuToggle');
                    
                    if (this.menuAberto && 
                        !sidebar.contains(e.target) && 
                        !menuToggle.contains(e.target) &&
                        window.innerWidth < 768) {
                        this.toggleMenu(false);
                    }
                });

                // Carrossel
                document.getElementById('carouselPrev')?.addEventListener('click', () => {
                    this.carrossel.anterior();
                });

                document.getElementById('carouselNext')?.addEventListener('click', () => {
                    this.carrossel.proximo();
                });

                // Cadastro
                document.getElementById('goToRegister')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.abrirModalCadastro();
                });

                // Fechar modal de cadastro
                document.getElementById('closeRegisterModal')?.addEventListener('click', () => {
                    this.fecharModalCadastro();
                });

                // Fechar modal ao clicar fora
                document.getElementById('registerModal')?.addEventListener('click', (e) => {
                    if (e.target.id === 'registerModal') {
                        this.fecharModalCadastro();
                    }
                });

                // Recuperação de Senha
                document.querySelector('.forgot-password')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.abrirModalRecuperacaoSenha();
                });

                document.getElementById('closeForgotPasswordModal')?.addEventListener('click', () => {
                    this.fecharModalRecuperacaoSenha();
                });

                document.getElementById('cancelarRecuperacao')?.addEventListener('click', () => {
                    this.fecharModalRecuperacaoSenha();
                });

                document.getElementById('forgotPasswordModal')?.addEventListener('click', (e) => {
                    if (e.target.id === 'forgotPasswordModal') {
                        this.fecharModalRecuperacaoSenha();
                    }
                });

                document.getElementById('forgotPasswordForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.processarRecuperacaoSenha();
                });

                document.getElementById('voltarRecuperacao')?.addEventListener('click', () => {
                    const formContainer = document.getElementById('forgotPasswordForm');
                    const confirmacao = document.getElementById('forgotPasswordConfirmacao');
                    if (formContainer) formContainer.style.display = 'block';
                    if (confirmacao) confirmacao.style.display = 'none';
                });

                document.getElementById('redefinirSenhaBtn')?.addEventListener('click', () => {
                    this.redefinirSenha();
                });
            }

            verificarLogin() {
                const usuario = JSON.parse(localStorage.getItem('senac_usuario_logado'));
                if (usuario) {
                    this.usuarioLogado = usuario;
                    this.tipoUsuario = usuario.tipo;
                    this.mostrarInterfacePrincipal();
                } else {
                    this.mostrarTelaLogin();
                }
            }

            fazerLogin() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const remember = document.getElementById('remember').checked;

                if (!username || !password) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                let usuario = null;

                // Verificar em usuários cadastrados (colaboradores)
                if (this.tipoUsuario === 'colaborador' && this.usuarios[username]) {
                    const col = this.usuarios[username];
                    if (col.tipo === 'colaborador' && col.senha === password) {
                        usuario = col;
                    }
                }

                // Verificar em empresas cadastradas
                if (this.tipoUsuario === 'empresa' && !usuario) {
                    const empresa = this.empresas.find(e => (e.username === username || e.email === username) && e.senha === password);
                    if (empresa) {
                        usuario = empresa;
                        this.tipoUsuario = 'empresa';
                    }
                }

                // Verificar em fornecedores cadastrados
                if (this.tipoUsuario === 'fornecedor' && !usuario) {
                    const fornecedor = this.fornecedores.find(f => (f.username === username || f.email === username) && f.senha === password);
                    if (fornecedor) {
                        usuario = fornecedor;
                        this.tipoUsuario = 'fornecedor';
                    }
                }

                // Se não encontrou, tentar com usuários demo
                if (!usuario) {
                    const usuarioDemo = this.usuariosDemo[this.tipoUsuario];
                    if (usuarioDemo && usuarioDemo.username === username && usuarioDemo.senha === password) {
                        usuario = usuarioDemo;
                    }
                    // Fallback: aceitar qualquer login com username/password para demo
                    else if (username && password) {
                        usuario = this.usuariosDemo[this.tipoUsuario] || this.usuariosDemo.colaborador;
                    }
                }

                if (usuario) {
                    this.usuarioLogado = usuario;
                    this.tipoUsuario = usuario.tipo;
                    
                    if (remember) {
                        localStorage.setItem('senac_usuario_logado', JSON.stringify(usuario));
                    }
                    
                    this.mostrarInterfacePrincipal();
                    this.mostrarNotificacao('success', 'Login realizado com sucesso!');
                } else {
                    this.mostrarNotificacao('error', 'Username ou senha inválidos.');
                }
            }

            loginDemo(tipo) {
                this.tipoUsuario = tipo;
                const usuario = this.usuariosDemo[tipo];
                
                if (usuario) {
                    this.usuarioLogado = usuario;
                    localStorage.setItem('senac_usuario_logado', JSON.stringify(usuario));
                    this.mostrarInterfacePrincipal();
                    this.mostrarNotificacao('success', `Bem-vindo(a) como ${usuario.nome}!`);
                }
            }

            fazerLogout() {
                this.usuarioLogado = null;
                localStorage.removeItem('senac_usuario_logado');
                this.mostrarTelaLogin();
                this.mostrarNotificacao('info', 'Logout realizado com sucesso.');
            }

            toggleMenu(abrir = null) {
                const sidebar = document.getElementById('sidebar');
                const mainContent = document.getElementById('mainContent');
                
                if (abrir === null) {
                    this.menuAberto = !this.menuAberto;
                } else {
                    this.menuAberto = abrir;
                }
                
                if (this.menuAberto) {
                    sidebar.classList.add('active');
                    mainContent.classList.add('sidebar-open');
                } else {
                    sidebar.classList.remove('active');
                    mainContent.classList.remove('sidebar-open');
                }
            }

            mostrarTelaLogin() {
                document.getElementById('loginScreen').classList.remove('hidden');
                document.getElementById('appContainer').classList.add('hidden');
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }

            mostrarInterfacePrincipal() {
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('appContainer').classList.remove('hidden');
                this.atualizarInterfaceUsuario();
                this.navegarPara('dashboard');
            }

            atualizarInterfaceUsuario() {
                if (!this.usuarioLogado) return;

                // Atualizar informações do usuário na sidebar
                const userInfo = document.getElementById('userInfo');
                if (userInfo) {
                    userInfo.innerHTML = `
                        <div class="user-avatar">${this.usuarioLogado.avatar || this.usuarioLogado.nome.charAt(0)}</div>
                        <div class="user-details">
                            <div class="user-name">${this.usuarioLogado.nome}</div>
                            <div class="user-role">
                                <span class="user-role-badge ${this.tipoUsuario}">${this.tipoUsuario}</span>
                            </div>
                        </div>
                    `;
                }

                // Mostrar/ocultar menus conforme tipo de usuário
                const menus = document.querySelectorAll('.nav-section');
                menus.forEach(menu => {
                    const tipoMenu = menu.classList[1]?.replace('-menu', '');
                    if (tipoMenu && menu.classList.contains('nav-section')) {
                        if (tipoMenu === this.tipoUsuario) {
                            menu.classList.remove('hidden');
                        } else if (tipoMenu !== 'common') {
                            menu.classList.add('hidden');
                        }
                    }
                });
            }

            navegarPara(pagina) {
                // Verificar se a página é válida para o tipo de usuário
                const paginasPermitidas = this.paginasValidas[this.tipoUsuario] || [];
                if (!paginasPermitidas.includes(pagina)) {
                    pagina = 'home';
                }

                // Esconder todas as páginas
                document.querySelectorAll('.page-content').forEach(page => {
                    page.classList.add('hidden');
                });

                // Mostrar página atual
                const paginaElement = document.getElementById(pagina);
                if (paginaElement) {
                    paginaElement.classList.remove('hidden');
                    this.paginaAtual = pagina;

                    // Atualizar menu ativo
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.page === pagina) {
                            link.classList.add('active');
                        }
                    });

                    // Atualizar título da página se necessário
                    if (pagina === 'home') {
                        document.title = 'Epsafe EP + SAFE | Teresina-PI';
                    } else {
                        const pageTitle = paginaElement.querySelector('.page-title');
                        if (pageTitle) {
                            document.title = `${pageTitle.textContent} | Epsafe EP + SAFE`;
                        }
                    }
                    // Renderizações específicas por página
                    if (pagina === 'dashboard') {
                        this.atualizarDashboardColaborador();
                    }
                    
                    if (pagina === 'meus-registros') {
                        this.renderMeusRegistros();
                    }

                    if (pagina === 'ocorrencias-empresa') {
                        this.renderOcorrenciasEmpresa();
                    }

                    if (pagina === 'sugestoes-empresa') {
                        this.renderSugestoes();
                    }

                    if (pagina === 'colaboradores') {
                        this.renderColaboradoresGestao();
                    }

                    if (pagina === 'empresas') {
                        this.renderEmpresasGestao();
                    }

                    if (pagina === 'dashboard-fornecedor') {
                        this.renderDashboardFornecedor();
                    }

                    if (pagina === 'produtos') {
                        this.renderProdutos();
                    }

                    if (pagina === 'pedidos') {
                        this.renderPedidos();
                    }

                    if (pagina === 'empresas-parceiras') {
                        this.renderEmpresasParceiras();
                    }

                    if (pagina === 'certificacoes') {
                        this.renderCertificacoes();
                    }

                    if (pagina === 'fornecedores') {
                        this.renderFornecedoresGestao();
                    }

                    if (pagina === 'fornecedores-empresa') {
                        this.renderFornecedores();
                    }

                    if (pagina === 'relatorios') {
                        this.renderRelatorios();
                    }

                    if (pagina === 'orientacoes') {
                        this.carregarChecklistUsuario();
                    }
                    if (pagina === 'ajuda') {
                        this.renderAjuda();
                    }

                    if (pagina === 'configuracoes') {
                        this.renderConfiguracoes();
                    }

                    if (pagina === 'perfil') {
                        this.renderPerfil();
                    }
                    
                    
                }
            }

            

            renderConfiguracoes() {
                const container = document.querySelector('#configuracoes .dashboard-card');
                if (!container) return;

                if (this.tipoUsuario === 'empresa') {
                    container.innerHTML = `
                        <h3 style="margin-top:0;color:var(--white);">Configurações da Empresa</h3>
                        <p style="color:var(--gray);">Ajuste preferências específicas da empresa e gerencie integrações.</p>
                        <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div>
                                <label class="form-label">Nome da Empresa</label>
                                <input type="text" class="form-control" id="cfg_razao_social" value="${this.usuarioLogado?.razao_social || (this.empresas[0]?.razao_social||'')}" />
                            </div>
                            <div>
                                <label class="form-label">CNPJ</label>
                                <input type="text" class="form-control" id="cfg_cnpj" value="${this.usuarioLogado?.cnpj || (this.empresas[0]?.cnpj||'')}" />
                            </div>
                            <div>
                                <label class="form-label">E-mail de Contato</label>
                                <input type="email" class="form-control" id="cfg_email" value="${this.usuarioLogado?.email || ''}" />
                            </div>
                            <div>
                                <label class="form-label">Notificações</label>
                                <select class="form-control" id="cfg_notificacoes"><option value="on">Ativas</option><option value="off">Desativadas</option></select>
                            </div>
                        </div>
                        <div style="margin-top:16px;display:flex;gap:12px;justify-content:flex-end;">
                            <button class="btn btn-secondary" id="cfg_cancel">Cancelar</button>
                            <button class="btn btn-primary" id="cfg_save">Salvar</button>
                        </div>
                    `;

                    // Eventos locais
                    document.getElementById('cfg_cancel')?.addEventListener('click', ()=>{ this.navegarPara('dashboard-empresa'); });
                    document.getElementById('cfg_save')?.addEventListener('click', ()=>{
                        const razao = document.getElementById('cfg_razao_social').value;
                        const cnpj = document.getElementById('cfg_cnpj').value;
                        const email = document.getElementById('cfg_email').value;
                        const notif = document.getElementById('cfg_notificacoes').value;
                        // salvar nas empresas demo (simplificado)
                        if (this.usuarioLogado && this.tipoUsuario === 'empresa') {
                            this.usuarioLogado.razao_social = razao;
                            this.usuarioLogado.cnpj = cnpj;
                            this.usuarioLogado.email = email;
                            this.salvarDados();
                            this.mostrarNotificacao('success','Configurações salvas.');
                        }
                    });
                } else {
                    container.innerHTML = `
                        <h3 style="margin-top:0;color:var(--white);">Configurações do Usuário</h3>
                        <p style="color:var(--gray);">Ajuste suas preferências pessoais.</p>
                        <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div>
                                <label class="form-label">Nome</label>
                                <input type="text" class="form-control" id="cfg_nome" value="${this.usuarioLogado?.nome||''}" />
                            </div>
                            <div>
                                <label class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="cfg_email_user" value="${this.usuarioLogado?.email||''}" />
                            </div>
                        </div>
                        <div style="margin-top:16px;display:flex;gap:12px;justify-content:flex-end;">
                            <button class="btn btn-secondary" id="cfg_cancel_user">Cancelar</button>
                            <button class="btn btn-primary" id="cfg_save_user">Salvar</button>
                        </div>
                    `;
                    document.getElementById('cfg_cancel_user')?.addEventListener('click', ()=>{ this.navegarPara('dashboard'); });
                    document.getElementById('cfg_save_user')?.addEventListener('click', ()=>{
                        const nome = document.getElementById('cfg_nome').value;
                        const email = document.getElementById('cfg_email_user').value;
                        if (this.usuarioLogado) { this.usuarioLogado.nome = nome; this.usuarioLogado.email = email; this.salvarDados(); this.atualizarInterfaceUsuario(); this.mostrarNotificacao('success','Preferências salvas.'); }
                    });
                }
            }

            renderAjuda() {
                const container = document.querySelector('#ajuda .dashboard-card');
                if (!container) return;

                // montar painel de ajuda com FAQ, formulário de contato e lista de tickets
                container.innerHTML = `
                    <div style="display:flex;gap:20px;flex-direction:column;">
                        <div>
                            <h3 style="margin:0;color:var(--white);">Central de Ajuda</h3>
                            <p style="color:var(--gray);margin-top:6px;">Consulte o FAQ ou envie uma solicitação ao suporte.</p>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px;">
                            <div>
                                <h4 style="color:var(--white);">FAQ</h4>
                                <ul style="color:var(--light-gray);margin-top:8px;line-height:1.6;">
                                    <li>Como registrar uma ocorrência?</li>
                                    <li>Como enviar uma sugestão de melhoria?</li>
                                    <li>Como visualizar relatórios da empresa?</li>
                                </ul>
                            </div>

                            <div>
                                <h4 style="color:var(--white);">Contato com Suporte</h4>
                                <form id="supportForm">
                                    <label class="form-label required">Assunto</label>
                                    <input class="form-control" id="supportSubject" required />
                                    <label class="form-label required" style="margin-top:8px;">Mensagem</label>
                                    <textarea class="form-control" id="supportMessage" rows="5" required></textarea>
                                    <label class="form-label" style="margin-top:8px;">Prioridade</label>
                                    <select class="form-control" id="supportPriority"><option value="baixa">Baixa</option><option value="media">Média</option><option value="alta">Alta</option></select>
                                    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;">
                                        <button type="button" class="btn btn-secondary" id="supportCancel">Cancelar</button>
                                        <button type="submit" class="btn btn-primary">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div style="margin-top:16px;">
                            <h4 style="color:var(--white);">Solicitações Enviadas</h4>
                            <div id="supportTickets" style="margin-top:8px;display:flex;flex-direction:column;gap:10px;">
                                <!-- Tickets serão renderizados aqui -->
                            </div>
                        </div>
                    </div>
                `;

                // renderizar tickets existentes
                const ticketsContainer = document.getElementById('supportTickets');
                const tickets = this.suporte || [];
                if (!tickets || tickets.length === 0) {
                    ticketsContainer.innerHTML = '<div class="dashboard-card">Nenhuma solicitação registrada.</div>';
                } else {
                    ticketsContainer.innerHTML = tickets.map(t=>`
                        <div class="registro-card">
                            <div class="registro-header"><h3 class="registro-title">${t.assunto}</h3><span class="registro-type">${t.prioridade}</span></div>
                            <p class="registro-description">${t.mensagem}</p>
                            <div class="registro-meta"><span>${t.data}</span><div class="registro-status"><span class="status-dot"></span><span>${t.status||'Aberto'}</span></div></div>
                        </div>
                    `).join('');
                }

                // eventos do formulário
                const supportForm = document.getElementById('supportForm');
                supportForm?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.enviarSuporte();
                });
                document.getElementById('supportCancel')?.addEventListener('click', ()=>{ document.getElementById('supportForm').reset(); });
            }

            enviarSuporte() {
                const assunto = document.getElementById('supportSubject').value;
                const mensagem = document.getElementById('supportMessage').value;
                const prioridade = document.getElementById('supportPriority').value;

                if (!assunto || !mensagem) {
                    this.mostrarNotificacao('error','Preencha todos os campos do suporte.');
                    return;
                }

                const ticket = {
                    id: 'sup_'+Date.now(),
                    assunto: assunto,
                    mensagem: mensagem,
                    prioridade: prioridade,
                    autor: this.usuarioLogado ? this.usuarioLogado.nome : 'Anônimo',
                    data: new Date().toLocaleString(),
                    status: 'Aberto'
                };

                this.suporte.unshift(ticket);
                this.salvarDados();
                this.mostrarNotificacao('success','Solicitação enviada ao suporte.');
                // re-render ajuda para atualizar lista
                this.renderAjuda();
            }

            abrirTabFeedback(tabId) {
                // Ativar tab
                document.querySelectorAll('.feedback-tab').forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.tab === tabId) {
                        tab.classList.add('active');
                    }
                });

                // Mostrar conteúdo
                document.querySelectorAll('.feedback-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            }

            renderPerfil() {
                // Atualizar dados do perfil com informações do usuário logado
                if (!this.usuarioLogado) return;

                const usuario = this.usuarioLogado;
                
                // Atualizar header do perfil
                const profileInfo = document.querySelector('.profile-info');
                if (profileInfo) {
                    profileInfo.innerHTML = `
                        <h2>${usuario.nome || 'Usuário'}</h2>
                        <p>${usuario.email || 'email@exemplo.com'}</p>
                        <p>Matrícula: ${usuario.matricula || usuario.username || 'N/A'}</p>
                        <div class="profile-badge">
                            <i class="fas fa-user-tie"></i>
                            <span>${usuario.tipo === 'colaborador' ? 'Colaborador' : usuario.tipo === 'empresa' ? 'Empresa' : 'Fornecedor'}</span>
                        </div>
                    `;
                }

                // Atualizar aba "Dados Cadastrais"
                const dadosInputs = document.querySelectorAll('#dados-tab input');
                if (dadosInputs.length > 0) {
                    dadosInputs[0].value = usuario.nome || 'João Silva Santos';
                    dadosInputs[1].value = usuario.cpf || '123.456.789-09';
                    dadosInputs[2].value = usuario.data_nascimento || usuario.dataNascimento || '1990-05-15';
                    dadosInputs[3].value = usuario.rg || '12.345.678-9';
                    dadosInputs[4].value = usuario.matricula || usuario.username || '2023001';
                    dadosInputs[5].value = usuario.cargo || 'Técnico de Segurança';
                    dadosInputs[6].value = usuario.setor || 'Segurança do Trabalho';
                    if (dadosInputs[7]) dadosInputs[7].value = usuario.data_admissao || usuario.dataAdmissao || '2023-01-02';
                }

                // Preencher informações da empresa (apenas para colaboradores)
                if (usuario.tipo === 'colaborador') {
                    document.getElementById('empresaRazaoSocial').textContent = usuario.empresaNome || 'Não informado';
                    document.getElementById('empresaNomeFantasia').textContent = usuario.empresaFantasia || usuario.empresaNome || 'Não informado';
                    document.getElementById('empresaCnpj').textContent = usuario.empresaCnpj || 'Não informado';
                    document.getElementById('empresaEmail').textContent = usuario.empresaEmail || 'Não informado';
                    document.getElementById('empresaTelefone').textContent = usuario.empresaTelefone || 'Não informado';
                    document.getElementById('empresaEndereco').textContent = usuario.empresaEndereco || 'Não informado';
                    document.getElementById('empresaCidadeEstado').textContent = usuario.empresaCidade && usuario.empresaEstado ? 
                        `${usuario.empresaCidade}/${usuario.empresaEstado}` : 'Não informado';
                    document.getElementById('empresaCep').textContent = usuario.empresaCep || 'Não informado';
                } else {
                    // Esconder seção da empresa para outros tipos de usuário
                    const empresaCard = document.querySelector('.dashboard-card h3 i.fa-building');
                    if (empresaCard) {
                        empresaCard.closest('.dashboard-card').style.display = 'none';
                    }
                }
            }

            abrirTabPerfil(tabId) {
                // Ativar tab
                document.querySelectorAll('.profile-tab').forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.dataset.tab === tabId) {
                        tab.classList.add('active');
                    }
                });

                // Mostrar conteúdo
                document.querySelectorAll('.profile-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}-tab`).classList.add('active');
            }

            registrarOcorrencia() {
                const formData = {
                    id: 'oc_' + Date.now(),
                    tipo: document.getElementById('tipoOcorrencia').value,
                    data: document.getElementById('dataOcorrencia').value,
                    local: document.getElementById('localOcorrencia').value,
                    envolvidos: document.getElementById('envolvidos').value,
                    epi: document.getElementById('epiEnvolvido').value,
                    fabricante: document.getElementById('fabricanteEPI').value,
                    descricao: document.getElementById('descricaoOcorrencia').value,
                    medidas: document.getElementById('medidasTomadas').value,
                    sugestoes: document.getElementById('sugestoesPrevencao').value,
                    autorNome: this.usuarioLogado ? this.usuarioLogado.nome : 'Anônimo',
                    autorTipo: this.tipoUsuario || 'colaborador',
                    status: 'Registrada',
                    imagens: []
                };

                // Validação básica
                if (!formData.tipo || !formData.data || !formData.local || !formData.descricao) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                // Adicionar arquivos do input (se houver)
                const inputFotos = document.getElementById('fotosOcorrencia');
                if (inputFotos && inputFotos.files.length > 0) {
                    Array.from(inputFotos.files).forEach(f => {
                        // Ler cada arquivo como base64 (simplificado)
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            formData.imagens.push(e.target.result);
                            // quando último arquivo lido, salvar
                            if (formData.imagens.length === inputFotos.files.length) {
                                this.ocorrencias.unshift(formData);
                                this.salvarDados();
                                this.mostrarNotificacao('success', 'Ocorrência registrada com sucesso!');
                                this.navegarPara('meus-registros');
                                document.getElementById('ocorrenciaForm').reset();
                                document.getElementById('filePreview').innerHTML = '';
                            }
                        };
                        reader.readAsDataURL(f);
                    });
                    // Se existirem arquivos, o fluxo continua dentro do reader
                    return;
                }

                // Sem arquivos: salvar imediatamente
                this.ocorrencias.unshift(formData);
                this.salvarDados();
                this.mostrarNotificacao('success', 'Ocorrência registrada com sucesso!');
                this.navegarPara('meus-registros');
                document.getElementById('ocorrenciaForm').reset();
                document.getElementById('filePreview').innerHTML = '';
            }

            formatData(dataStr) {
                if (!dataStr) return '';
                try {
                    let s = dataStr.toString().replace(' ', 'T');
                    const d = new Date(s);
                    if (isNaN(d)) return dataStr;
                    return d.toLocaleDateString('pt-BR');
                } catch (e) {
                    return dataStr;
                }
            }

            renderMeusRegistros() {
                const container = document.querySelector('#meus-registros .registros-grid');
                if (!container) return;

                const usuarioNome = this.usuarioLogado ? this.usuarioLogado.nome : null;
                // Filtrar ocorrências do usuário (ou mostrar todas se usuário for empresa)
                let lista = [];
                if (this.tipoUsuario === 'empresa') {
                    lista = this.ocorrencias.slice(); // empresa vê todas
                } else if (usuarioNome) {
                    lista = this.ocorrencias.filter(o => o.autorNome === usuarioNome);
                }

                if (lista.length === 0) {
                    container.innerHTML = '<div class="dashboard-card">Nenhum registro encontrado.</div>';
                    return;
                }

                container.innerHTML = lista.map(o => `
                    <div class="registro-card">
                        <div class="registro-header">
                            <h3 class="registro-title">${o.tipo}</h3>
                            <span class="registro-type">Ocorrência</span>
                        </div>
                        <p class="registro-description">${o.descricao || ''}</p>
                        ${o.imagens && o.imagens.length ? `<div class="registro-images">${o.imagens.map(img=>`<div class="registro-image"><img src="${img}" alt="Imagem"></div>`).join('')}</div>` : ''}
                        <div class="registro-meta">
                            <span>${this.formatData(o.data)}</span>
                            <div class="registro-status">
                                <span class="status-dot"></span>
                                <span>${o.status || ''}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            renderOcorrenciasEmpresa() {
                const container = document.querySelector('#ocorrencias-empresa .dashboard-card');
                if (!container) return;

                if (!this.ocorrencias || this.ocorrencias.length === 0) {
                    container.innerHTML = '<p>Não há ocorrências registradas.</p>';
                    return;
                }

                // Montar lista resumida
                container.innerHTML = `<div class="registros-grid">${this.ocorrencias.map(o=>`
                    <div class="registro-card">
                        <div class="registro-header"><h3 class="registro-title">${o.tipo}</h3><span class="registro-type">Ocorrência</span></div>
                        <p class="registro-description">${o.descricao || ''}</p>
                        <div class="registro-meta"><span>${this.formatData(o.data)}</span><div class="registro-status"><span class="status-dot"></span><span>${o.status || ''}</span></div></div>
                    </div>
                `).join('')}</div>`;
            }

            renderSugestoes() {
                const container = document.querySelector('#sugestoes-empresa .dashboard-card');
                if (!container) return;

                if (!this.sugestoes || this.sugestoes.length === 0) {
                    container.innerHTML = '<p>Não há sugestões registradas.</p>';
                    return;
                }

                container.innerHTML = `<div class="registros-grid">${this.sugestoes.map(s=>`
                    <div class="registro-card">
                        <div class="registro-header"><h3 class="registro-title">${s.titulo}</h3><span class="registro-type">Sugestão</span></div>
                        <p class="registro-description">${s.descricao || ''}</p>
                        <div class="registro-meta"><span>${s.data}</span><div class="registro-status"><span class="status-dot"></span><span>${s.status || ''}</span></div></div>
                    </div>
                `).join('')}</div>`;
            }

            renderColaboradores() {
                const container = document.querySelector('#colaboradores .dashboard-card');
                if (!container) return;

                const cols = Object.values(this.usuarios || {}).filter(u => u.tipo === 'colaborador');
                if (cols.length === 0) {
                    container.innerHTML = '<p>Nenhum colaborador cadastrado.</p>';
                    return;
                }

                container.innerHTML = `<div class="registros-grid">${cols.map(c=>`
                    <div class="registro-card">
                        <div class="registro-header"><h3 class="registro-title">${c.nome}</h3><span class="registro-type">Colaborador</span></div>
                        <p class="registro-description">Cargo: ${c.cargo || '-'} | Setor: ${c.setor || '-'}</p>
                        <div class="registro-meta"><span>${c.matricula || ''}</span></div>
                    </div>
                `).join('')}</div>`;
            }

            renderColaboradoresGestao() {
                const container = document.getElementById('colaboradoresContainer');
                if (!container) return;

                const colaboradores = Object.values(this.usuarios || {}).filter(u => u.tipo === 'colaborador');

                if (colaboradores.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhum colaborador cadastrado. Clique em "Novo Colaborador" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de colaboradores
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">Nome</th>
                                <th style="padding:12px;">Cargo</th>
                                <th style="padding:12px;">Setor</th>
                                <th style="padding:12px;">Matrícula</th>
                                <th style="padding:12px;">E-mail</th>
                                <th style="padding:12px;">Telefone</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${colaboradores.map(c => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;font-weight:500;">${c.nome || ''}</td>
                                    <td style="padding:12px;">${c.cargo || '-'}</td>
                                    <td style="padding:12px;">${c.setor || '-'}</td>
                                    <td style="padding:12px;">${c.matricula || '-'}</td>
                                    <td style="padding:12px;">${c.email || ''}</td>
                                    <td style="padding:12px;">${c.telefone || '-'}</td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarColaborador('${c.username}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarColaborador('${c.username}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de novo colaborador
                document.getElementById('addColaboradorBtn')?.removeEventListener('click', this._addColaboradorHandler);
                this._addColaboradorHandler = () => this.abrirFormColaborador();
                document.getElementById('addColaboradorBtn')?.addEventListener('click', this._addColaboradorHandler);
            }

            abrirFormColaborador(colaboradorUsername = null) {
                const colaborador = colaboradorUsername ? this.usuarios[colaboradorUsername] : null;
                const titulo = colaborador ? 'Editar Colaborador' : 'Novo Colaborador';
                const acao = colaborador ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="colaboradorForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Nome Completo *</label>
                                <input type="text" id="colNome" class="form-control" value="${colaborador?.nome || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">E-mail *</label>
                                <input type="email" id="colEmail" class="form-control" value="${colaborador?.email || ''}" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Matrícula</label>
                                <input type="text" id="colMatricula" class="form-control" value="${colaborador?.matricula || ''}" placeholder="Ex: 2024001">
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Cargo *</label>
                                <input type="text" id="colCargo" class="form-control" value="${colaborador?.cargo || ''}" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Setor</label>
                                <input type="text" id="colSetor" class="form-control" value="${colaborador?.setor || ''}" placeholder="Ex: Operacional">
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Telefone</label>
                                <input type="tel" id="colTelefone" class="form-control" value="${colaborador?.telefone || ''}" placeholder="(XX) XXXXX-XXXX">
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Empresa</label>
                                <input type="text" id="colEmpresa" class="form-control" value="${colaborador?.empresa || ''}" placeholder="Empresa onde trabalha">
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Observações</label>
                            <textarea id="colObservacoes" class="form-control" rows="3" placeholder="Observações sobre o colaborador...">${colaborador?.observacoes || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Colaborador</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                document.getElementById('colaboradorForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarColaborador(colaboradorUsername);
                });
            }

            salvarColaborador(colaboradorUsername = null) {
                const nome = document.getElementById('colNome').value;
                const email = document.getElementById('colEmail').value;
                const matricula = document.getElementById('colMatricula').value;
                const cargo = document.getElementById('colCargo').value;
                const setor = document.getElementById('colSetor').value;
                const telefone = document.getElementById('colTelefone').value;
                const empresa = document.getElementById('colEmpresa') ? document.getElementById('colEmpresa').value : '';
                const observacoes = document.getElementById('colObservacoes').value;

                if (!nome || !email || !cargo) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (colaboradorUsername) {
                    // Atualizar colaborador existente
                    if (this.usuarios[colaboradorUsername]) {
                        this.usuarios[colaboradorUsername] = {
                            ...this.usuarios[colaboradorUsername],
                            nome,
                            email,
                            matricula,
                            cargo,
                            setor,
                            empresa,
                            telefone,
                            observacoes
                        };
                        this.mostrarNotificacao('success', 'Colaborador atualizado com sucesso!');
                    }
                } else {
                    // Criar novo colaborador
                    const novoUsername = 'col_' + Date.now();
                    this.usuarios[novoUsername] = {
                        username: novoUsername,
                        nome,
                        email,
                        matricula,
                        cargo,
                        setor,
                        empresa,
                        telefone,
                        observacoes,
                        tipo: 'colaborador',
                        senha: 'senha123'
                    };
                    this.mostrarNotificacao('success', 'Colaborador adicionado com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderColaboradoresGestao();
            }

            editarColaborador(colaboradorUsername) {
                this.abrirFormColaborador(colaboradorUsername);
            }

            apagarColaborador(colaboradorUsername) {
                if (confirm('Tem certeza que deseja remover este colaborador?')) {
                    delete this.usuarios[colaboradorUsername];
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Colaborador removido com sucesso!');
                    this.renderColaboradoresGestao();
                }
            }

            renderEmpresasGestao() {
                const container = document.getElementById('empresasGestaoContainer');
                if (!container) return;

                const empresas = this.empresas || [];

                if (empresas.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhuma empresa cadastrada. Clique em "Nova Empresa" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de empresas
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">Razão Social</th>
                                <th style="padding:12px;">CNPJ</th>
                                <th style="padding:12px;">E-mail</th>
                                <th style="padding:12px;">Telefone</th>
                                <th style="padding:12px;">Cidade</th>
                                <th style="padding:12px;">Status</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${empresas.map(e => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;font-weight:500;">${e.razao_social || e.nome || ''}</td>
                                    <td style="padding:12px;">${e.cnpj || ''}</td>
                                    <td style="padding:12px;">${e.email || ''}</td>
                                    <td style="padding:12px;">${e.telefone || '-'}</td>
                                    <td style="padding:12px;">${e.cidade || '-'}</td>
                                    <td style="padding:12px;">
                                        <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:4px 8px;border-radius:4px;font-size:0.8rem;">
                                            Ativa
                                        </span>
                                    </td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarEmpresaGestao('${e.id || e.username}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarEmpresaGestao('${e.id || e.username}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de nova empresa
                document.getElementById('addEmpresaGestaoBtn')?.removeEventListener('click', this._addEmpresaGestaoHandler);
                this._addEmpresaGestaoHandler = () => this.abrirFormEmpresaGestao();
                document.getElementById('addEmpresaGestaoBtn')?.addEventListener('click', this._addEmpresaGestaoHandler);
            }

            abrirFormEmpresaGestao(empresaId = null) {
                const empresa = empresaId ? this.empresas.find(e => e.id === empresaId || e.username === empresaId) : null;
                const titulo = empresa ? 'Editar Empresa' : 'Nova Empresa';
                const acao = empresa ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="empresaGestaoForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Razão Social *</label>
                                <input type="text" id="empGRazaoSocial" class="form-control" value="${empresa?.razao_social || empresa?.nome || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">CNPJ *</label>
                                <input type="text" id="empGCnpj" class="form-control" value="${empresa?.cnpj || ''}" placeholder="XX.XXX.XXX/0001-XX" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">E-mail *</label>
                                <input type="email" id="empGEmail" class="form-control" value="${empresa?.email || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Telefone</label>
                                <input type="tel" id="empGTelefone" class="form-control" value="${empresa?.telefone || ''}" placeholder="(XX) XXXXX-XXXX">
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Cidade/Estado</label>
                                <input type="text" id="empGCidade" class="form-control" value="${empresa?.cidade || ''}" placeholder="Ex: Teresina, PI">
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Endereço</label>
                                <input type="text" id="empGEndereco" class="form-control" value="${empresa?.endereco || ''}" placeholder="Endereço completo">
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Atividade Principal</label>
                            <textarea id="empGAtividadePrincipal" class="form-control" rows="3" placeholder="Descrição da atividade principal...">${empresa?.atividade_principal || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Empresa</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                document.getElementById('empresaGestaoForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarEmpresaGestao(empresa?.id || empresa?.username);
                });
            }

            salvarEmpresaGestao(empresaId = null) {
                const razaoSocial = document.getElementById('empGRazaoSocial').value;
                const cnpj = document.getElementById('empGCnpj').value;
                const email = document.getElementById('empGEmail').value;
                const telefone = document.getElementById('empGTelefone').value;
                const cidade = document.getElementById('empGCidade').value;
                const endereco = document.getElementById('empGEndereco').value;
                const atividadePrincipal = document.getElementById('empGAtividadePrincipal').value;

                if (!razaoSocial || !cnpj || !email) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (empresaId) {
                    // Atualizar empresa existente
                    const idx = this.empresas.findIndex(e => e.id === empresaId || e.username === empresaId);
                    if (idx !== -1) {
                        this.empresas[idx] = {
                            ...this.empresas[idx],
                            razao_social: razaoSocial,
                            nome: razaoSocial,
                            cnpj,
                            email,
                            telefone,
                            cidade,
                            endereco,
                            atividade_principal: atividadePrincipal
                        };
                        this.mostrarNotificacao('success', 'Empresa atualizada com sucesso!');
                    }
                } else {
                    // Criar nova empresa
                    const novaEmpresa = {
                        id: 'emp_' + Date.now(),
                        username: 'emp_' + Date.now(),
                        razao_social: razaoSocial,
                        nome: razaoSocial,
                        cnpj,
                        email,
                        telefone,
                        cidade,
                        endereco,
                        atividade_principal: atividadePrincipal,
                        tipo: 'empresa'
                    };
                    this.empresas.unshift(novaEmpresa);
                    this.mostrarNotificacao('success', 'Empresa adicionada com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderEmpresasGestao();
            }
            
            buscarCEP(cep) {
  console.log('Buscando CEP:', cep);
  const cepLimpo = cep.replace(/\D/g, '');
  console.log('CEP limpo:', cepLimpo);

  if (cepLimpo.length !== 8) {
    this.mostrarNotificacao('error', 'CEP inválido.');
    return;
  }

  // Usar JSONP para evitar problemas de CORS
  const script = document.createElement('script');
  script.src = `https://viacep.com.br/ws/${cepLimpo}/json/?callback=cepCallback`;
  document.head.appendChild(script);

  // Definir a função de callback global
  window.cepCallback = (dados) => {
    console.log('Dados recebidos via JSONP:', dados);
    document.head.removeChild(script);
    delete window.cepCallback;

    if (dados.erro) {
      this.mostrarNotificacao('error', 'CEP não encontrado.');
      return;
    }

    document.getElementById('endLogradouro').value = dados.logradouro || '';
    document.getElementById('endBairro').value = dados.bairro || '';
    document.getElementById('endCidade').value = dados.localidade || '';
    document.getElementById('endUF').value = dados.uf || '';
    console.log('Campos preenchidos');
  };

  // Timeout para erro
  setTimeout(() => {
    if (window.cepCallback) {
      document.head.removeChild(script);
      delete window.cepCallback;
      console.error('Timeout na busca de CEP');
      this.mostrarNotificacao('error', 'Erro ao buscar o CEP.');
    }
  }, 5000);
}

            formatarCEP(input) {
                let value = input.value.replace(/\D/g, '');
                if (value.length > 5) {
                    value = value.slice(0, 5) + '-' + value.slice(5, 8);
                }
                input.value = value;
            }
            editarEmpresaGestao(empresaId) {
                this.abrirFormEmpresaGestao(empresaId);
            }

            apagarEmpresaGestao(empresaId) {
                if (confirm('Tem certeza que deseja remover esta empresa?')) {
                    this.empresas = this.empresas.filter(e => e.id !== empresaId && e.username !== empresaId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Empresa removida com sucesso!');
                    this.renderEmpresasGestao();
                }
            }

            renderFornecedores() {
                const container = document.querySelector('#fornecedores-empresa .suppliers-list');
                if (!container) return;

                if (!this.fornecedores || this.fornecedores.length === 0) {
                    container.innerHTML = '<p>Sem fornecedores cadastrados.</p>';
                    return;
                }

                container.innerHTML = this.fornecedores.map(f=>`
                    <div class="supplier-item">
                        <div style="width:50px;height:50px;background:var(--gradient-fornecedor);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-right:15px;"><i class="fas fa-truck"></i></div>
                        <div style="flex:1;"><h4 style="color:var(--white);margin-bottom:5px;">${f.nome || f.razao_social || f.username}</h4><div style="color:var(--gray);font-size:0.9rem;">${f.email || ''}</div></div>
                    </div>
                `).join('');
            }

            renderDashboardFornecedor() {
                const container = document.getElementById('dashboard-fornecedor');
                if (!container) return;

                // limpar gráficos anteriores
                if (this._fornecedorCharts && Array.isArray(this._fornecedorCharts)) {
                    this._fornecedorCharts.forEach(c => { try { c.destroy(); } catch(e){} });
                }
                this._fornecedorCharts = [];

                const produtos = this.produtos || [];
                const pedidos = this.pedidos || [];

                const totalProdutos = produtos.length;
                const totalPedidos = pedidos.length;
                const valorTotalPedidos = pedidos.reduce((s,p)=>s + (p.valor||0),0).toFixed(2);

                // Agrupar pedidos por status
                const byStatus = {};
                pedidos.forEach(p => { const st = p.status || 'Desconhecido'; byStatus[st] = (byStatus[st]||0) + 1; });

                // Vendas por produto (quantidade)
                const vendas = {};
                pedidos.forEach(p => { const pid = p.produtoId || p.produto || 'desconhecido'; vendas[pid] = (vendas[pid]||0) + (p.quantidade||0); });
                const vendaItems = Object.entries(vendas).map(([pid,qty]) => {
                    const prod = produtos.find(x=>x.id===pid) || produtos.find(x=>x.nome===pid) || { nome: pid };
                    return { nome: prod.nome || pid, quantidade: qty };
                }).sort((a,b)=>b.quantidade - a.quantidade);

                // Produtos com estoque baixo
                const estoqueBaixo = produtos.filter(p=>typeof p.estoque === 'number' && p.estoque <= 10).slice(0,8);

                // Renderizar conteúdo dinâmico
                container.innerHTML = `
                    <div class="page-header">
                        <h1 class="page-title">Dashboard do Fornecedor</h1>
                        <p class="page-subtitle">Painel de controle com métricas e gráficos de vendas.</p>
                    </div>
                    
                    <div class="dashboard-grid">
                        <div class="dashboard-card" style="padding:16px;">
                            <h4 style="margin:0 0 12px 0;color:var(--white);">📊 Resumo</h4>
                            <div style="font-size:0.9rem;color:var(--light-gray);line-height:1.6;">
                                <div>Produtos cadastrados: <strong>${totalProdutos}</strong></div>
                                <div>Pedidos: <strong>${totalPedidos}</strong></div>
                                <div>Valor total: <strong>R$ ${valorTotalPedidos}</strong></div>
                            </div>
                        </div>
                        
                        <div class="dashboard-card" style="padding:16px;">
                            <h4 style="margin:0 0 12px 0;color:var(--white);">⚠️ Estoque Baixo</h4>
                            <div style="font-size:0.9rem;color:var(--light-gray);">
                                ${estoqueBaixo.length ? estoqueBaixo.map(p=>`<div style="margin-bottom:6px;">${p.nome} <strong>(${p.estoque})</strong></div>`).join('') : '<div>Nenhum produto com estoque baixo.</div>'}
                            </div>
                        </div>
                    </div>

                    <div style="margin-top:20px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
                        <div class="dashboard-card" style="padding:16px;"><canvas id="chartPedidosStatus"></canvas></div>
                        <div class="dashboard-card" style="padding:16px;"><canvas id="chartVendasProduto"></canvas></div>
                    </div>

                    <div style="margin-top:20px;">
                        <div class="dashboard-card" style="padding:16px;">
                            <h4 style="margin:0 0 12px 0;color:var(--white);">📋 Últimos Pedidos</h4>
                            <div style="overflow-x:auto;">
                                <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                                    <thead><tr style="text-align:left;color:var(--gray);border-bottom:1px solid rgba(255,255,255,0.1);"><th style="padding:8px;">Pedido</th><th style="padding:8px;">Produto</th><th style="padding:8px;">Qtd</th><th style="padding:8px;">Valor</th><th style="padding:8px;">Status</th><th style="padding:8px;">Data</th></tr></thead>
                                    <tbody>
                                        ${pedidos.length === 0 ? '<tr><td colspan="6" style="padding:8px;text-align:center;">Nenhum pedido registrado.</td></tr>' : pedidos.slice(0,10).map(p=>{
                                            const prod = produtos.find(x=>x.id===p.produtoId) || { nome: p.produtoId };
                                            return `<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px;">${p.id}</td><td style="padding:8px;">${prod.nome||p.produtoId}</td><td style="padding:8px;">${p.quantidade||0}</td><td style="padding:8px;">R$ ${ (p.valor||0).toFixed(2) }</td><td style="padding:8px;"><span style="background:rgba(100,200,100,0.2);color:#00c176;padding:3px 8px;border-radius:4px;font-size:0.8rem;">${p.status||''}</span></td><td style="padding:8px;">${p.data||''}</td></tr>`;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;

                const palette = ['#0b84ff','#00c176','#ff6b6b','#ffb020','#7c3aed','#00bcd4'];

                // Gráfico de status dos pedidos
                setTimeout(() => {
                    const ctxS = document.getElementById('chartPedidosStatus')?.getContext('2d');
                    if (ctxS && Object.keys(byStatus).length > 0) {
                        const labels = Object.keys(byStatus);
                        const data = Object.values(byStatus);
                        const chartS = new Chart(ctxS, {
                            type: 'doughnut',
                            data: {
                                labels,
                                datasets: [{
                                    data,
                                    backgroundColor: labels.map((_,i)=>palette[i%palette.length])
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: { position: 'bottom' },
                                    title: { display: true, text: 'Pedidos por Status' }
                                }
                            }
                        });
                        this._fornecedorCharts.push(chartS);
                    }
                }, 100);

                // Gráfico de vendas por produto
                setTimeout(() => {
                    const ctxV = document.getElementById('chartVendasProduto')?.getContext('2d');
                    if (ctxV && vendaItems.length > 0) {
                        const top = vendaItems.slice(0,8);
                        const labels = top.map(t=>t.nome);
                        const data = top.map(t=>t.quantidade);
                        const chartV = new Chart(ctxV, {
                            type: 'bar',
                            data: {
                                labels,
                                datasets: [{
                                    label: 'Quantidade vendida',
                                    data,
                                    backgroundColor: labels.map((_,i)=>palette[i%palette.length])
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: { display: false },
                                    title: { display: true, text: 'Top Produtos Vendidos' }
                                },
                                scales: { y: { beginAtZero: true } }
                            }
                        });
                        this._fornecedorCharts.push(chartV);
                    }
                }, 100);
            }

            renderProdutos() {
                const container = document.getElementById('produtosContainer');
                if (!container) return;

                const produtos = this.produtos || [];

                if (produtos.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhum produto cadastrado. Clique em "Novo Produto" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de produtos
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">ID</th>
                                <th style="padding:12px;">Nome</th>
                                <th style="padding:12px;">Categoria</th>
                                <th style="padding:12px;">Preço</th>
                                <th style="padding:12px;">Estoque</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${produtos.map(p => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;">${p.id || ''}</td>
                                    <td style="padding:12px;font-weight:500;">${p.nome || ''}</td>
                                    <td style="padding:12px;">${p.categoria || ''}</td>
                                    <td style="padding:12px;">R$ ${(p.preco || 0).toFixed(2)}</td>
                                    <td style="padding:12px;">
                                        <span style="background:${p.estoque <= 10 ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'};color:${p.estoque <= 10 ? '#ef4444' : '#10b981'};padding:4px 8px;border-radius:4px;font-size:0.8rem;">
                                            ${p.estoque || 0}
                                        </span>
                                    </td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarProduto('${p.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarProduto('${p.id}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de novo produto
                document.getElementById('addProdutoBtn')?.removeEventListener('click', this._addProdutoHandler);
                this._addProdutoHandler = () => this.abrirFormProduto();
                document.getElementById('addProdutoBtn')?.addEventListener('click', this._addProdutoHandler);
            }

            abrirFormProduto(produtoId = null) {
                const produto = produtoId ? this.produtos.find(p => p.id === produtoId) : null;
                const titulo = produto ? 'Editar Produto' : 'Novo Produto';
                const acao = produto ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="produtoForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Nome do Produto *</label>
                                <input type="text" id="prodNome" class="form-control" value="${produto?.nome || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Categoria *</label>
                                <select id="prodCategoria" class="form-control" required>
                                    <option value="">Selecione uma categoria</option>
                                    <option value="EPI" ${produto?.categoria === 'EPI' ? 'selected' : ''}>EPI</option>
                                    <option value="EPC" ${produto?.categoria === 'EPC' ? 'selected' : ''}>EPC</option>
                                    <option value="Consultoria" ${produto?.categoria === 'Consultoria' ? 'selected' : ''}>Consultoria</option>
                                    <option value="Treinamento" ${produto?.categoria === 'Treinamento' ? 'selected' : ''}>Treinamento</option>
                                </select>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Preço (R$) *</label>
                                <input type="number" id="prodPreco" class="form-control" step="0.01" value="${produto?.preco || 0}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Estoque *</label>
                                <input type="number" id="prodEstoque" class="form-control" value="${produto?.estoque || 0}" required>
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Descrição</label>
                            <textarea id="prodDescricao" class="form-control" rows="3" placeholder="Descrição do produto...">${produto?.descricao || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Produto</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                document.getElementById('produtoForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarProduto(produto?.id);
                });
            }

            salvarProduto(produtoId = null) {
                const nome = document.getElementById('prodNome').value;
                const categoria = document.getElementById('prodCategoria').value;
                const preco = parseFloat(document.getElementById('prodPreco').value);
                const estoque = parseInt(document.getElementById('prodEstoque').value);
                const descricao = document.getElementById('prodDescricao').value;

                if (!nome || !categoria) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (produtoId) {
                    // Atualizar produto existente
                    const idx = this.produtos.findIndex(p => p.id === produtoId);
                    if (idx !== -1) {
                        this.produtos[idx] = { id: produtoId, nome, categoria, preco, estoque, descricao, fornecedor: this.usuarioLogado?.nome };
                        this.mostrarNotificacao('success', 'Produto atualizado com sucesso!'); 
                    }
                } else {
                    // Criar novo produto
                    const novoProduto = {
                        id: 'prod_' + Date.now(),
                        nome,
                        categoria,
                        preco,
                        estoque,
                        descricao,
                        fornecedor: this.usuarioLogado?.nome
                    };
                    this.produtos.unshift(novoProduto);
                    this.mostrarNotificacao('success', 'Produto adicionado com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderProdutos();
            }

            editarProduto(produtoId) {
                this.abrirFormProduto(produtoId);
            }

            apagarProduto(produtoId) {
                if (confirm('Tem certeza que deseja apagar este produto?')) {
                    this.produtos = this.produtos.filter(p => p.id !== produtoId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Produto removido com sucesso!');
                    this.renderProdutos();
                }
            }

            renderPedidos() {
                const container = document.getElementById('pedidosContainer');
                if (!container) return;

                const pedidos = this.pedidos || [];

                if (pedidos.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhum pedido registrado. Clique em "Novo Pedido" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de pedidos
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">ID</th>
                                <th style="padding:12px;">Produto</th>
                                <th style="padding:12px;">Quantidade</th>
                                <th style="padding:12px;">Valor</th>
                                <th style="padding:12px;">Status</th>
                                <th style="padding:12px;">Data</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pedidos.map(p => {
                                const statusColors = {
                                    'Em andamento': 'rgba(59,130,246,0.2)',
                                    'Concluído': 'rgba(16,185,129,0.2)',
                                    'Pendente': 'rgba(239,68,68,0.2)',
                                    'Cancelado': 'rgba(107,114,128,0.2)'
                                };
                                const statusTextColors = {
                                    'Em andamento': '#3b82f6',
                                    'Concluído': '#10b981',
                                    'Pendente': '#ef4444',
                                    'Cancelado': '#6b7280'
                                };
                                const bgColor = statusColors[p.status] || 'rgba(100,116,139,0.2)';
                                const textColor = statusTextColors[p.status] || '#64748b';
                                return `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;">${p.id || ''}</td>
                                    <td style="padding:12px;font-weight:500;">${p.produtoId || ''}</td>
                                    <td style="padding:12px;">${p.quantidade || 0}</td>
                                    <td style="padding:12px;">R$ ${(p.valor || 0).toFixed(2)}</td>
                                    <td style="padding:12px;">
                                        <span style="background:${bgColor};color:${textColor};padding:4px 8px;border-radius:4px;font-size:0.8rem;">
                                            ${p.status || 'Pendente'}
                                        </span>
                                    </td>
                                    <td style="padding:12px;">${p.data || ''}</td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarPedido('${p.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarPedido('${p.id}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `}).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de novo pedido
                document.getElementById('addPedidoBtn')?.removeEventListener('click', this._addPedidoHandler);
                this._addPedidoHandler = () => this.abrirFormPedido();
                document.getElementById('addPedidoBtn')?.addEventListener('click', this._addPedidoHandler);
            }

            abrirFormPedido(pedidoId = null) {
                const pedido = pedidoId ? this.pedidos.find(p => p.id === pedidoId) : null;
                const titulo = pedido ? 'Editar Pedido' : 'Novo Pedido';
                const acao = pedido ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="pedidoForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Produto *</label>
                                <select id="pedProduto" class="form-control" required>
                                    <option value="">Selecione um produto</option>
                                    ${(this.produtos || []).map(p => `<option value="${p.id}" ${pedido?.produtoId === p.id ? 'selected' : ''}>${p.nome}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Quantidade *</label>
                                <input type="number" id="pedQuantidade" class="form-control" value="${pedido?.quantidade || 1}" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Valor (R$) *</label>
                                <input type="number" id="pedValor" class="form-control" step="0.01" value="${pedido?.valor || 0}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Status *</label>
                                <select id="pedStatus" class="form-control" required>
                                    <option value="Pendente" ${pedido?.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                                    <option value="Em andamento" ${pedido?.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                                    <option value="Concluído" ${pedido?.status === 'Concluído' ? 'selected' : ''}>Concluído</option>
                                    <option value="Cancelado" ${pedido?.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                                </select>
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Data *</label>
                            <input type="date" id="pedData" class="form-control" value="${pedido?.data ? pedido.data.split(' ')[0] : new Date().toISOString().split('T')[0]}" required>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Pedido</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                document.getElementById('pedidoForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarPedido(pedido?.id);
                });
            }

            salvarPedido(pedidoId = null) {
                const produtoId = document.getElementById('pedProduto').value;
                const quantidade = parseInt(document.getElementById('pedQuantidade').value);
                const valor = parseFloat(document.getElementById('pedValor').value);
                const status = document.getElementById('pedStatus').value;
                const data = document.getElementById('pedData').value;

                if (!produtoId || !quantidade || !valor || !data) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (pedidoId) {
                    // Atualizar pedido existente
                    const idx = this.pedidos.findIndex(p => p.id === pedidoId);
                    if (idx !== -1) {
                        this.pedidos[idx] = { id: pedidoId, produtoId, quantidade, valor, status, data, fornecedor: this.usuarioLogado?.nome };
                        this.mostrarNotificacao('success', 'Pedido atualizado com sucesso!'); 
                    }
                } else {
                    // Criar novo pedido
                    const novoPedido = {
                        id: 'ped_' + Date.now(),
                        produtoId,
                        quantidade,
                        valor,
                        status: status || 'Pendente',
                        data,
                        fornecedor: this.usuarioLogado?.nome
                    };
                    this.pedidos.unshift(novoPedido);
                    this.mostrarNotificacao('success', 'Pedido criado com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderPedidos();
            }

            editarPedido(pedidoId) {
                this.abrirFormPedido(pedidoId);
            }

            apagarPedido(pedidoId) {
                if (confirm('Tem certeza que deseja apagar este pedido?')) {
                    this.pedidos = this.pedidos.filter(p => p.id !== pedidoId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Pedido removido com sucesso!');
                    this.renderPedidos();
                }
            }

            renderEmpresasParceiras() {
                const container = document.getElementById('empresasContainer');
                if (!container) return;

                // Usar empresas como parceiros
                const empresas = this.empresas || [];

                if (empresas.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhuma empresa parceira cadastrada. Clique em "Novo Parceiro" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de empresas parceiras
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">Razão Social</th>
                                <th style="padding:12px;">CNPJ</th>
                                <th style="padding:12px;">E-mail</th>
                                <th style="padding:12px;">Telefone</th>
                                <th style="padding:12px;">Status</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${empresas.map(e => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;font-weight:500;">${e.razao_social || e.nome || ''}</td>
                                    <td style="padding:12px;">${e.cnpj || ''}</td>
                                    <td style="padding:12px;">${e.email || ''}</td>
                                    <td style="padding:12px;">${e.telefone || '-'}</td>
                                    <td style="padding:12px;">
                                        <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:4px 8px;border-radius:4px;font-size:0.8rem;">
                                            Ativo
                                        </span>
                                    </td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarEmpresa('${e.id || e.username}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarEmpresa('${e.id || e.username}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de novo parceiro
                document.getElementById('addEmpresaBtn')?.removeEventListener('click', this._addEmpresaHandler);
                this._addEmpresaHandler = () => this.abrirFormEmpresa();
                document.getElementById('addEmpresaBtn')?.addEventListener('click', this._addEmpresaHandler);
            }

            abrirFormEmpresa(empresaId = null) {
                const empresa = empresaId ? this.empresas.find(e => e.id === empresaId || e.username === empresaId) : null;
                const titulo = empresa ? 'Editar Empresa Parceira' : 'Nova Empresa Parceira';
                const acao = empresa ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="empresaForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Razão Social *</label>
                                <input type="text" id="empRazaoSocial" class="form-control" value="${empresa?.razao_social || empresa?.nome || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">CNPJ *</label>
                                <input type="text" id="empCnpj" class="form-control" value="${empresa?.cnpj || ''}" placeholder="XX.XXX.XXX/0001-XX" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">E-mail *</label>
                                <input type="email" id="empEmail" class="form-control" value="${empresa?.email || ''}" required>
                            </div>
                            <h4 class="form-section-title">
  <i class="fas fa-map-marker-alt"></i> Endereço
</h4>

<div class="form-grid">
  <div class="form-group">
    <label class="form-label required">CEP</label>
    <input type="text" id="endCEP" class="form-control" placeholder="00000-000" maxlength="9" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Rua</label>
    <input type="text" id="endLogradouro" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Número</label>
    <input type="text" id="endNumero" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label">Complemento</label>
    <input type="text" id="endComplemento" class="form-control">
  </div>

  <div class="form-group">
    <label class="form-label required">Bairro</label>
    <input type="text" id="endBairro" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Cidade</label>
    <input type="text" id="endCidade" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">UF</label>
    <input type="text" id="endUF" class="form-control" maxlength="2" required>
  </div>
</div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Telefone</label>
                                <input type="tel" id="empTelefone" class="form-control" value="${empresa?.telefone || ''}" placeholder="(XX) XXXXX-XXXX">
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Endereço</label>
                            <input type="text" id="empEndereco" class="form-control" value="${empresa?.endereco || ''}" placeholder="Endereço completo">
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Especialidade/Serviços</label>
                            <textarea id="empEspecialidade" class="form-control" rows="3" placeholder="Descreva os serviços e especialidades dessa empresa...">${empresa?.especialidade || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Parceiro</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                const cepInput = document.getElementById('endCEP');
if (cepInput) {
  cepInput.addEventListener('blur', () => {
    this.buscarCEP(cepInput.value);
  });
  cepInput.addEventListener('input', () => {
    this.formatarCEP(cepInput);
  });
}
                document.getElementById('empresaForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarEmpresa(empresa?.id || empresa?.username);
                });
            }

            salvarEmpresa(empresaId = null) {
                const razaoSocial = document.getElementById('empRazaoSocial').value;
                const cnpj = document.getElementById('empCnpj').value;
                const email = document.getElementById('empEmail').value;
                const telefone = document.getElementById('empTelefone').value;
                const endereco = document.getElementById('empEndereco').value;
                const especialidade = document.getElementById('empEspecialidade').value;

                if (!razaoSocial || !cnpj || !email) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (empresaId) {
                    // Atualizar empresa existente
                    const idx = this.empresas.findIndex(e => e.id === empresaId || e.username === empresaId);
                    if (idx !== -1) {
                        this.empresas[idx] = {
                            ...this.empresas[idx],
                            razao_social: razaoSocial,
                            cnpj: cnpj,
                            email: email,
                            telefone: telefone,
                            endereco: endereco,
                            especialidade: especialidade
                        };
                        this.mostrarNotificacao('success', 'Empresa atualizada com sucesso!'); 
                    }
                } else {
                    // Criar nova empresa parceira
                    const novaEmpresa = {
                        id: 'emp_' + Date.now(),
                        tipo: 'empresa',
                        nome: razaoSocial,
                        razao_social: razaoSocial,
                        cnpj: cnpj,
                        email: email,
                        telefone: telefone,
                        endereco: endereco,
                        especialidade: especialidade,
                        username: 'emp_' + Date.now(),
                        avatar: razaoSocial.substring(0, 2).toUpperCase()
                    };
                    this.empresas.push(novaEmpresa);
                    this.mostrarNotificacao('success', 'Empresa parceira adicionada com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderEmpresasParceiras();
            }

            editarEmpresa(empresaId) {
                this.abrirFormEmpresa(empresaId);
            }

            apagarEmpresa(empresaId) {
                if (confirm('Tem certeza que deseja remover esta empresa parceira?')) {
                    this.empresas = this.empresas.filter(e => e.id !== empresaId && e.username !== empresaId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Empresa removida com sucesso!');
                    this.renderEmpresasParceiras();
                }
            }

            renderFornecedoresGestao() {
                const container = document.getElementById('fornecedoresContainer');
                if (!container) return;

                // Usar fornecedores para gestão
                const fornecedores = this.fornecedores || [];

                if (fornecedores.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhum fornecedor cadastrado. Clique em "Novo Fornecedor" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de fornecedores
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">Nome/Razão Social</th>
                                <th style="padding:12px;">E-mail</th>
                                <th style="padding:12px;">Telefone</th>
                                <th style="padding:12px;">Categoria</th>
                                <th style="padding:12px;">Status</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${fornecedores.map(f => `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;font-weight:500;">${f.razao_social || f.nome || f.username || ''}</td>
                                    <td style="padding:12px;">${f.email || ''}</td>
                                    <td style="padding:12px;">${f.telefone || '-'}</td>
                                    <td style="padding:12px;">${f.categoria || 'EPIs'}</td>
                                    <td style="padding:12px;">
                                        <span style="background:rgba(16,185,129,0.2);color:#10b981;padding:4px 8px;border-radius:4px;font-size:0.8rem;">
                                            Ativo
                                        </span>
                                    </td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarFornecedor('${f.id || f.username}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarFornecedor('${f.id || f.username}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de novo fornecedor
                document.getElementById('addFornecedorBtn')?.removeEventListener('click', this._addFornecedorHandler);
                this._addFornecedorHandler = () => this.abrirFormFornecedor();
                document.getElementById('addFornecedorBtn')?.addEventListener('click', this._addFornecedorHandler);
            }

            abrirFormFornecedor(fornecedorId = null) {
                const fornecedor = fornecedorId ? this.fornecedores.find(f => f.id === fornecedorId || f.username === fornecedorId) : null;
                const titulo = fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor';
                const acao = fornecedor ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="fornecedorForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Razão Social/Nome *</label>
                                <input type="text" id="fornRazaoSocial" class="form-control" value="${fornecedor?.razao_social || fornecedor?.nome || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">CNPJ/CPF</label>
                                <input type="text" id="fornCnpj" class="form-control" value="${fornecedor?.cnpj || ''}" placeholder="XX.XXX.XXX/0001-XX">
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">E-mail *</label>
                                <input type="email" id="fornEmail" class="form-control" value="${fornecedor?.email || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Telefone</label>
                                <input type="tel" id="fornTelefone" class="form-control" value="${fornecedor?.telefone || ''}" placeholder="(XX) XXXXX-XXXX">
                            </div>
                        </div>
                        <h4 class="form-section-title">
  <i class="fas fa-map-marker-alt"></i> Endereço
</h4>

<div class="form-grid">
  <div class="form-group">
    <label class="form-label required">CEP</label>
    <input type="text" id="endCEP" class="form-control" placeholder="00000-000" maxlength="9" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Rua</label>
    <input type="text" id="endLogradouro" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Número</label>
    <input type="text" id="endNumero" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label">Complemento</label>
    <input type="text" id="endComplemento" class="form-control">
  </div>

  <div class="form-group">
    <label class="form-label required">Bairro</label>
    <input type="text" id="endBairro" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">Cidade</label>
    <input type="text" id="endCidade" class="form-control" required>
  </div>

  <div class="form-group">
    <label class="form-label required">UF</label>
    <input type="text" id="endUF" class="form-control" maxlength="2" required>
  </div>
</div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Categoria *</label>
                                <select id="fornCategoria" class="form-control" required>

                                    <option value="EPIs" ${fornecedor?.categoria === 'EPIs' ? 'selected' : ''}>EPIs</option>
                                    <option value="EPCs" ${fornecedor?.categoria === 'EPCs' ? 'selected' : ''}>EPCs</option>
                                    <option value="Consultoria" ${fornecedor?.categoria === 'Consultoria' ? 'selected' : ''}>Consultoria</option>
                                    <option value="Outros" ${fornecedor?.categoria === 'Outros' ? 'selected' : ''}>Outros</option>
                                </select>
                            </div>
 
                            <div>
                                <label class="form-label" style="color:var(--white);">Endereço</label>
                                <input type="text" id="fornEndereco" class="form-control" value="${fornecedor?.endereco || ''}" placeholder="Endereço completo">
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Descrição/Especialidades</label>
                            <textarea id="fornDescricao" class="form-control" rows="3" placeholder="Descreva os produtos e serviços oferecidos...">${fornecedor?.descricao || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Fornecedor</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                const cepInput = document.getElementById('endCEP');
if (cepInput) {
  cepInput.addEventListener('blur', () => {
    this.buscarCEP(cepInput.value);
  });
  cepInput.addEventListener('input', () => {
    this.formatarCEP(cepInput);
  });
}
                document.getElementById('fornecedorForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarFornecedor(fornecedor?.id || fornecedor?.username);
                });
            }

            salvarFornecedor(fornecedorId = null) {
                const razaoSocial = document.getElementById('fornRazaoSocial').value;
                const cnpj = document.getElementById('fornCnpj').value;
                const email = document.getElementById('fornEmail').value;
                const telefone = document.getElementById('fornTelefone').value;
                const categoria = document.getElementById('fornCategoria').value;
                const endereco = document.getElementById('fornEndereco').value;
                const descricao = document.getElementById('fornDescricao').value;

                if (!razaoSocial || !email || !categoria) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (fornecedorId) {
                    // Atualizar fornecedor existente
                    const idx = this.fornecedores.findIndex(f => f.id === fornecedorId || f.username === fornecedorId);
                    if (idx !== -1) {
                        this.fornecedores[idx] = { 
                            ...this.fornecedores[idx],
                            razao_social: razaoSocial,
                            nome: razaoSocial,
                            cnpj,
                            email,
                            telefone,
                            categoria,
                            endereco,
                            descricao
                        };
                        this.mostrarNotificacao('success', 'Fornecedor atualizado com sucesso!');
                    }
                } else {
                    // Criar novo fornecedor
                    const novoFornecedor = {
                        id: 'forn_' + Date.now(),
                        username: 'forn_' + Date.now(),
                        razao_social: razaoSocial,
                        nome: razaoSocial,
                        cnpj,
                        email,
                        telefone,
                        categoria,
                        endereco,
                        descricao,
                        tipo: 'fornecedor'
                    };
                    this.fornecedores.unshift(novoFornecedor);
                    this.mostrarNotificacao('success', 'Fornecedor adicionado com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderFornecedoresGestao();
            }

            editarFornecedor(fornecedorId) {
                this.abrirFormFornecedor(fornecedorId);
            }

            apagarFornecedor(fornecedorId) {
                if (confirm('Tem certeza que deseja remover este fornecedor?')) {
                    this.fornecedores = this.fornecedores.filter(f => f.id !== fornecedorId && f.username !== fornecedorId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Fornecedor removido com sucesso!');
                    this.renderFornecedoresGestao();
                }
            }

            renderCertificacoes() {
                const container = document.getElementById('certificacoesContainer');
                if (!container) return;

                // Inicializar certificações se não existir
                if (!this.certificacoes) {
                    this.certificacoes = [];
                }

                const certificacoes = this.certificacoes || [];

                if (certificacoes.length === 0) {
                    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--gray);">Nenhuma certificação registrada. Clique em "Nova Certificação" para adicionar.</div>';
                    return;
                }

                // Renderizar tabela de certificações
                container.innerHTML = `
                    <table style="width:100%;color:var(--light-gray);font-size:0.9rem;border-collapse:collapse;">
                        <thead>
                            <tr style="text-align:left;color:var(--gray);border-bottom:2px solid rgba(255,255,255,0.1);">
                                <th style="padding:12px;">Nome da Certificação</th>
                                <th style="padding:12px;">Órgão Emissor</th>
                                <th style="padding:12px;">Número</th>
                                <th style="padding:12px;">Emissão</th>
                                <th style="padding:12px;">Validade</th>
                                <th style="padding:12px;">Status</th>
                                <th style="padding:12px;">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${certificacoes.map(c => {
                                const hoje = new Date();
                                const validade = new Date(c.dataValidade);
                                const diasParaVencer = Math.floor((validade - hoje) / (1000 * 60 * 60 * 24));
                                let statusClass, statusText;
                                if (diasParaVencer < 0) {
                                    statusClass = 'rgba(239,68,68,0.2)';
                                    statusText = '<span style="color:#ef4444;">Expirada</span>';
                                } else if (diasParaVencer <= 30) {
                                    statusClass = 'rgba(245,158,11,0.2)';
                                    statusText = `<span style="color:#f59e0b;">Vence em ${diasParaVencer} dias</span>`;
                                } else {
                                    statusClass = 'rgba(16,185,129,0.2)';
                                    statusText = '<span style="color:#10b981;">Ativa</span>';
                                }
                                return `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                                    <td style="padding:12px;font-weight:500;">${c.nome || ''}</td>
                                    <td style="padding:12px;">${c.orgao || ''}</td>
                                    <td style="padding:12px;">${c.numero || ''}</td>
                                    <td style="padding:12px;">${c.dataEmissao || ''}</td>
                                    <td style="padding:12px;">${c.dataValidade || ''}</td>
                                    <td style="padding:12px;background:${statusClass};border-radius:4px;">
                                        ${statusText}
                                    </td>
                                    <td style="padding:12px;">
                                        <button class="btn btn-small" style="padding:6px 12px;margin-right:4px;" onclick="sistemaSenac.editarCertificacao('${c.id}')"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-small" style="padding:6px 12px;background:rgba(239,68,68,0.2);color:#ef4444;" onclick="sistemaSenac.apagarCertificacao('${c.id}')"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            `}).join('')}
                        </tbody>
                    </table>
                `;

                // Adicionar evento ao botão de nova certificação
                document.getElementById('addCertBtn')?.removeEventListener('click', this._addCertHandler);
                this._addCertHandler = () => this.abrirFormCertificacao();
                document.getElementById('addCertBtn')?.addEventListener('click', this._addCertHandler);
            }

            abrirFormCertificacao(certificacaoId = null) {
                if (!this.certificacoes) this.certificacoes = [];
                const certificacao = certificacaoId ? this.certificacoes.find(c => c.id === certificacaoId) : null;
                const titulo = certificacao ? 'Editar Certificação' : 'Nova Certificação';
                const acao = certificacao ? 'Atualizar' : 'Adicionar';

                const modal = document.getElementById('registerModal');
                const modalBody = modal.querySelector('.modal-body');

                modalBody.innerHTML = `
                    <form id="certificacaoForm">
                        <h4 style="color: var(--white); margin-bottom: 20px;">${titulo}</h4>
                        
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Nome da Certificação *</label>
                                <input type="text" id="certNome" class="form-control" value="${certificacao?.nome || ''}" placeholder="Ex: ISO 9001, ABNT, etc." required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Órgão Emissor *</label>
                                <input type="text" id="certOrgao" class="form-control" value="${certificacao?.orgao || ''}" placeholder="Ex: ABNT, DNV, etc." required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Número do Certificado</label>
                                <input type="text" id="certNumero" class="form-control" value="${certificacao?.numero || ''}" placeholder="Número de série">
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Data de Emissão *</label>
                                <input type="date" id="certEmissao" class="form-control" value="${certificacao?.dataEmissao || ''}" required>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
                            <div>
                                <label class="form-label" style="color:var(--white);">Data de Validade *</label>
                                <input type="date" id="certValidade" class="form-control" value="${certificacao?.dataValidade || ''}" required>
                            </div>
                            <div>
                                <label class="form-label" style="color:var(--white);">Arquivo/Documento</label>
                                <input type="text" id="certDocumento" class="form-control" value="${certificacao?.documento || ''}" placeholder="URL ou nome do arquivo">
                            </div>
                        </div>

                        <div style="margin-bottom:12px;">
                            <label class="form-label" style="color:var(--white);">Observações</label>
                            <textarea id="certObservacoes" class="form-control" rows="3" placeholder="Observações importantes sobre a certificação...">${certificacao?.observacoes || ''}</textarea>
                        </div>

                        <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:20px;">
                            <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">${acao} Certificação</button>
                        </div>
                    </form>
                `;

                modal.classList.add('active');
                document.getElementById('certificacaoForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.salvarCertificacao(certificacao?.id);
                });
            }

            salvarCertificacao(certificacaoId = null) {
                const nome = document.getElementById('certNome').value;
                const orgao = document.getElementById('certOrgao').value;
                const numero = document.getElementById('certNumero').value;
                const dataEmissao = document.getElementById('certEmissao').value;
                const dataValidade = document.getElementById('certValidade').value;
                const documento = document.getElementById('certDocumento').value;
                const observacoes = document.getElementById('certObservacoes').value;

                if (!nome || !orgao || !dataEmissao || !dataValidade) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                if (new Date(dataEmissao) > new Date(dataValidade)) {
                    this.mostrarNotificacao('error', 'A data de validade deve ser posterior à data de emissão.');
                    return;
                }

                if (!this.certificacoes) this.certificacoes = [];

                if (certificacaoId) {
                    // Atualizar certificação existente
                    const idx = this.certificacoes.findIndex(c => c.id === certificacaoId);
                    if (idx !== -1) {
                        this.certificacoes[idx] = { id: certificacaoId, nome, orgao, numero, dataEmissao, dataValidade, documento, observacoes };
                        this.mostrarNotificacao('success', 'Certificação atualizada com sucesso!'); 
                    }
                } else {
                    // Criar nova certificação
                    const novaCertificacao = {
                        id: 'cert_' + Date.now(),
                        nome,
                        orgao,
                        numero,
                        dataEmissao,
                        dataValidade,
                        documento,
                        observacoes
                    };
                    this.certificacoes.unshift(novaCertificacao);
                    this.mostrarNotificacao('success', 'Certificação adicionada com sucesso!');
                }

                this.salvarDados();
                this.fecharModalCadastro();
                this.renderCertificacoes();
            }

            editarCertificacao(certificacaoId) {
                this.abrirFormCertificacao(certificacaoId);
            }

            apagarCertificacao(certificacaoId) {
                if (confirm('Tem certeza que deseja remover esta certificação?')) {
                    this.certificacoes = this.certificacoes.filter(c => c.id !== certificacaoId);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Certificação removida com sucesso!');
                    this.renderCertificacoes();
                }
            }

            renderRelatorios() {
                const container = document.querySelector('#relatorios .dashboard-card');
                if (!container) return;

                // Limpar charts anteriores
                if (this._relatoriosCharts && Array.isArray(this._relatoriosCharts)) {
                    this._relatoriosCharts.forEach(c => { try { c.destroy(); } catch(e){} });
                }
                this._relatoriosCharts = [];

                // Ler filtros
                const quick = document.getElementById('reportQuickRange');
                const startInput = document.getElementById('reportStartDate');
                const endInput = document.getElementById('reportEndDate');
                const filterTipoEl = document.getElementById('filterTipo');
                const filterStatusEl = document.getElementById('filterStatus');
                const filterColabEl = document.getElementById('filterColaborador');
                let endDate = endInput && endInput.value ? new Date(endInput.value) : new Date();
                let startDate = null;
                if (startInput && startInput.value) startDate = new Date(startInput.value);
                if (quick && quick.value && quick.value !== 'custom' && (!startDate || !endInput.value)) {
                    const days = parseInt(quick.value, 10) || 30;
                    endDate = new Date();
                    startDate = new Date();
                    startDate.setDate(endDate.getDate() - days + 1);
                }

                const parseDate = (s) => {
                    if (!s) return null;
                    // suporta formatos: 'YYYY-MM-DD' ou 'YYYY-MM-DD HH:MM' ou locale strings
                    let ds = s.toString().replace(' ', 'T');
                    const d = new Date(ds);
                    if (!isNaN(d)) return d;
                    return new Date(s);
                };

                // Popular filtros dinâmicos (tipos, status, colaboradores)
                const tiposSet = new Set();
                const statusSet = new Set();
                const colabSet = new Set();
                (this.ocorrencias || []).forEach(o => { if (o.tipo) tiposSet.add(o.tipo); if (o.status) statusSet.add(o.status); if (o.autorNome) colabSet.add(o.autorNome); });
                Object.values(this.usuarios || {}).forEach(u => { if (u.tipo === 'colaborador') colabSet.add(u.nome); });

                const populateSelect = (el, items, allLabel) => {
                    if (!el) return;
                    const current = el.value || 'all';
                    el.innerHTML = `<option value="all">${allLabel}</option>` + Array.from(items).map(i=>`<option value="${i}">${i}</option>`).join('');
                    if (Array.from(el.options).some(o=>o.value===current)) el.value = current; else el.value = 'all';
                };

                populateSelect(filterTipoEl, tiposSet, 'Tipo: Todos');
                populateSelect(filterStatusEl, statusSet, 'Status: Todos');
                populateSelect(filterColabEl, colabSet, 'Colaborador: Todos');

                // Filtrar ocorrências pelo intervalo e por filtros selecionados
                const ocorrenciasFiltradas = (this.ocorrencias || []).filter(o => {
                    // intervalo
                    if (startDate || endDate) {
                        const d = parseDate(o.data);
                        if (!d || isNaN(d)) return false;
                        if (startDate && d < startDate) return false;
                        if (endDate) { const endOfDay = new Date(endDate); endOfDay.setHours(23,59,59,999); if (d > endOfDay) return false; }
                    }
                    // tipo
                    if (filterTipoEl && filterTipoEl.value && filterTipoEl.value !== 'all') {
                        if ((o.tipo||'') !== filterTipoEl.value) return false;
                    }
                    // status
                    if (filterStatusEl && filterStatusEl.value && filterStatusEl.value !== 'all') {
                        if ((o.status||'') !== filterStatusEl.value) return false;
                    }
                    // colaborador
                    if (filterColabEl && filterColabEl.value && filterColabEl.value !== 'all') {
                        if ((o.autorNome||'') !== filterColabEl.value) return false;
                    }
                    return true;
                });

                // Computar dados a partir do conjunto filtrado
                const totalOcorrencias = ocorrenciasFiltradas.length;
                const totalSugestoes = this.sugestoes.length;
                const totalColaboradores = Object.values(this.usuarios || {}).filter(u=>u.tipo==='colaborador').length;
                const totalFornecedores = this.fornecedores.length;

                const byStatus = {};
                const byTipo = {};
                const byLocal = {};
                ocorrenciasFiltradas.forEach(o => {
                    const st = o.status || 'Desconhecido';
                    byStatus[st] = (byStatus[st] || 0) + 1;
                    const tp = o.tipo || 'Outros';
                    byTipo[tp] = (byTipo[tp] || 0) + 1;
                    const loc = o.local || 'Desconhecido';
                    byLocal[loc] = (byLocal[loc] || 0) + 1;
                });

                // Sugestões por categoria e por mês
                const byCategoria = {};
                const mapaCat = { epi: 'EPI', epc: 'EPC', procedimento: 'Procedimento', treinamento: 'Treinamento', outro: 'Outro' };
                this.sugestoes.forEach(s => { const c = mapaCat[s.categoria] || s.categoria || 'Outro'; byCategoria[c] = (byCategoria[c] || 0) + 1; });

                // Tendência: última janela (baseada em filtro ou padrão 6 meses)
                const months = [];
                const monthKeys = [];
                const now = endDate || new Date();
                // calcular meses entre startDate and endDate, limit to 12
                let monthsCount = 6;
                if (startDate && endDate) {
                    const diff = (endDate.getFullYear()-startDate.getFullYear())*12 + (endDate.getMonth()-startDate.getMonth());
                    monthsCount = Math.min(Math.max(diff+1,1),12);
                }
                for (let i = monthsCount-1; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    months.push(d.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }));
                    monthKeys.push(`${d.getFullYear()}-${d.getMonth()+1}`);
                }

                const countsByMonth = {};
                monthKeys.forEach(k => countsByMonth[k] = 0);
                ocorrenciasFiltradas.forEach(o => {
                    const ds = (o.data || '').toString();
                    const d = parseDate(ds);
                    if (!isNaN(d)) {
                        const k = `${d.getFullYear()}-${d.getMonth()+1}`;
                        if (k in countsByMonth) countsByMonth[k]++;
                    }
                });

                // Sugestões por mês
                const sugCountsByMonth = {};
                monthKeys.forEach(k => sugCountsByMonth[k] = 0);
                this.sugestoes.forEach(s => {
                    const d = parseDate(s.data);
                    if (!isNaN(d)) {
                        const k = `${d.getFullYear()}-${d.getMonth()+1}`;
                        if (k in sugCountsByMonth) sugCountsByMonth[k]++;
                    }
                });

                // Top colaboradores por ocorrências
                const byColab = {};
                ocorrenciasFiltradas.forEach(o => { const a = o.autorNome || 'Anônimo'; byColab[a] = (byColab[a]||0)+1; });
                const topColabs = Object.entries(byColab).sort((a,b)=>b[1]-a[1]).slice(0,6);

                // Layout: grid de 2 colunas para melhor organização dos gráficos
                container.innerHTML = `
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:16px;">
                        <div><canvas id="chartStatus"></canvas></div>
                        <div><canvas id="chartTipo"></canvas></div>
                        <div><canvas id="chartLocal"></canvas></div>
                        <div><canvas id="chartTrend"></canvas></div>
                        <div><canvas id="chartSugestoes"></canvas></div>
                        <div><canvas id="chartSugTrend"></canvas></div>
                        <div style="grid-column:1/-1"><canvas id="chartTopColab"></canvas></div>
                    </div>
                    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">
                        <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Total ocorrências: <strong>${totalOcorrencias}</strong></div>
                        <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Total sugestões: <strong>${totalSugestoes}</strong></div>
                        <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Colaboradores: <strong>${totalColaboradores}</strong></div>
                        <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Fornecedores: <strong>${totalFornecedores}</strong></div>
                    </div>
                `;

                const palette = ['#0b84ff','#ff6b6b','#00c176','#ffb020','#7c3aed','#00bcd4','#ff4081','#ff9800','#6a1b9a'];

                // Se não houver ocorrências no intervalo, mostrar aviso e não desenhar gráficos vazios
                if (ocorrenciasFiltradas.length === 0 && Object.keys(byCategoria).length === 0) {
                    container.innerHTML = '<div class="dashboard-card">Nenhum dado disponível para o intervalo selecionado.</div>';
                    // ainda mostrar cartões de total (zerados)
                    container.insertAdjacentHTML('beforeend', `\n                        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px;">\n                            <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Total ocorrências: <strong>0</strong></div>\n                            <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Total sugestões: <strong>${totalSugestoes}</strong></div>\n                            <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Colaboradores: <strong>${totalColaboradores}</strong></div>\n                            <div class="dashboard-card" style="flex:1;min-width:180px;padding:12px;">Fornecedores: <strong>${totalFornecedores}</strong></div>\n                        </div>\n                    `);
                    return;
                }

                // Status (doughnut)
                const ctxStatus = document.getElementById('chartStatus').getContext('2d');
                const statusChart = new Chart(ctxStatus, { type:'doughnut', data:{ labels:Object.keys(byStatus), datasets:[{ data:Object.values(byStatus), backgroundColor:Object.keys(byStatus).map((_,i)=>palette[i%palette.length]) }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' }, tooltip:{ callbacks:{ label: ctx=> `${ctx.label}: ${ctx.parsed} (${ (totalOcorrencias? (ctx.parsed/totalOcorrencias*100).toFixed(1):0)}%)` } } } } });
                this._relatoriosCharts.push(statusChart);

                // Tipo (bar)
                const ctxTipo = document.getElementById('chartTipo').getContext('2d');
                const tipoChart = new Chart(ctxTipo, { type:'bar', data:{ labels:Object.keys(byTipo), datasets:[{ label:'Ocorrências por tipo', data:Object.values(byTipo), backgroundColor:Object.keys(byTipo).map((_,i)=>palette[i%palette.length]) }] }, options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true } } } });
                this._relatoriosCharts.push(tipoChart);

                // Local (bar horizontal)
                const ctxLocal = document.getElementById('chartLocal').getContext('2d');
                const localLabels = Object.keys(byLocal);
                const localData = Object.values(byLocal);
                const localChart = new Chart(ctxLocal, { type:'bar', data:{ labels:localLabels, datasets:[{ label:'Ocorrências por local', data:localData, backgroundColor: localLabels.map((_,i)=>palette[(i+1)%palette.length]) }] }, options:{ indexAxis:'y', responsive:true, scales:{ x:{ beginAtZero:true } } } });
                this._relatoriosCharts.push(localChart);

                // Trend (line)
                const trendData = monthKeys.map(k => countsByMonth[k] || 0);
                const ctxTrend = document.getElementById('chartTrend').getContext('2d');
                const trendChart = new Chart(ctxTrend, { type:'line', data:{ labels:months, datasets:[{ label:`Ocorrências (${months.length} meses)`, data:trendData, borderColor:palette[0], backgroundColor:'rgba(14,165,233,0.12)', tension:0.25, fill:true }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } }, scales:{ y:{ beginAtZero:true } } } });
                this._relatoriosCharts.push(trendChart);

                // Sugestões por categoria (pie)
                const ctxSug = document.getElementById('chartSugestoes').getContext('2d');
                const sugChart = new Chart(ctxSug, { type:'pie', data:{ labels:Object.keys(byCategoria), datasets:[{ data:Object.values(byCategoria), backgroundColor:Object.keys(byCategoria).map((_,i)=>palette[(i+2)%palette.length]) }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' }, tooltip:{ callbacks:{ label: ctx=> `${ctx.label}: ${ctx.parsed} (${ (totalSugestoes? (ctx.parsed/totalSugestoes*100).toFixed(1):0)}%)` } } } } });
                this._relatoriosCharts.push(sugChart);

                // Sugestões por mês (line)
                const sugTrendData = monthKeys.map(k => sugCountsByMonth[k] || 0);
                const ctxSugTrend = document.getElementById('chartSugTrend').getContext('2d');
                const sugTrendChart = new Chart(ctxSugTrend, { type:'line', data:{ labels:months, datasets:[{ label:'Sugestões por mês', data:sugTrendData, borderColor:palette[2], backgroundColor:'rgba(16,185,129,0.12)', tension:0.25, fill:true }] }, options:{ responsive:true, plugins:{ legend:{ position:'bottom' } }, scales:{ y:{ beginAtZero:true } } } });
                this._relatoriosCharts.push(sugTrendChart);

                // Top colaboradores
                const ctxTop = document.getElementById('chartTopColab').getContext('2d');
                const topLabels = topColabs.map(t=>t[0]);
                const topData = topColabs.map(t=>t[1]);
                const topChart = new Chart(ctxTop, { type:'bar', data:{ labels:topLabels, datasets:[{ label:'Ocorrências por colaborador', data:topData, backgroundColor: topLabels.map((_,i)=>palette[(i+3)%palette.length]) }] }, options:{ indexAxis:'y', responsive:true, scales:{ x:{ beginAtZero:true } } } });
                this._relatoriosCharts.push(topChart);

                // adicionar evento ao botão aplicar (para reaplicar filtros)
                const applyBtn = document.getElementById('applyReportFilter');
                if (applyBtn && !applyBtn._wired) {
                    applyBtn.addEventListener('click', (e)=>{ e.preventDefault(); this.renderRelatorios(); });
                    applyBtn._wired = true;
                }
            }

            registrarSugestao() {
                const categoria = document.querySelector('input[name="categoria"]:checked');
                const titulo = document.getElementById('tituloSugestao').value;
                const descricao = document.getElementById('descricaoSugestao').value;

                if (!categoria || !titulo || !descricao) {
                    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios.');
                    return;
                }

                const sugestao = {
                    id: 'sug_' + Date.now(),
                    categoria: categoria.value,
                    titulo: titulo,
                    descricao: descricao,
                    autorNome: this.usuarioLogado ? this.usuarioLogado.nome : 'Anônimo',
                    autorTipo: this.tipoUsuario || 'colaborador',
                    data: new Date().toLocaleString(),
                    status: 'Recebida'
                };

                // Salvar sugestão
                this.sugestoes.unshift(sugestao);
                this.salvarDados();

                this.mostrarNotificacao('success', 'Sugestão enviada com sucesso!');
                this.navegarPara('meus-registros');
                document.getElementById('sugestaoForm').reset();
            }

            processarArquivos(event) {
                const files = event.target.files;
                const preview = document.getElementById('filePreview');
                preview.innerHTML = '';

                Array.from(files).forEach((file, index) => {
                    if (!file.type.match('image.*') && !file.type.match('application/pdf')) {
                        this.mostrarNotificacao('warning', 'Apenas imagens e PDFs são permitidos.');
                        return;
                    }

                    if (file.size > 5 * 1024 * 1024) { // 5MB
                        this.mostrarNotificacao('warning', 'Arquivo muito grande (máx. 5MB).');
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const item = document.createElement('div');
                        item.className = 'file-preview-item';
                        
                        if (file.type.match('image.*')) {
                            item.innerHTML = `
                                <img src="${e.target.result}" alt="Preview ${index + 1}">
                                <button class="file-preview-remove" onclick="sistemaSenac.removerArquivo(${index})">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;
                        } else {
                            item.innerHTML = `
                                <div style="width:100%;height:100%;background:var(--dark-gradient);display:flex;align-items:center;justify-content:center;color:var(--white);">
                                    <i class="fas fa-file-pdf" style="font-size:2rem;"></i>
                                </div>
                                <button class="file-preview-remove" onclick="sistemaSenac.removerArquivo(${index})">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;
                        }
                        
                        preview.appendChild(item);
                    };
                    
                    reader.readAsDataURL(file);
                });
            }

            removerArquivo(index) {
                const input = document.getElementById('fotosOcorrencia');
                const files = Array.from(input.files);
                files.splice(index, 1);
                
                // Criar nova FileList (simplificado para demonstração)
                const dt = new DataTransfer();
                files.forEach(file => dt.items.add(file));
                input.files = dt.files;
                
                // Recriar preview
                const event = new Event('change');
                input.dispatchEvent(event);
            }

            mostrarNotificacoes() {
                this.mostrarNotificacao('info', 'Você tem 2 notificações não lidas', 5000);
            }

            mostrarAjuda() {
                this.navegarPara('ajuda');
            }

            mudarTipoUsuario(tipo) {
                if (this.usuarioLogado) {
                    // Se já está logado, muda o tipo
                    const usuario = this.usuariosDemo[tipo];
                    if (usuario) {
                        this.tipoUsuario = tipo;
                        this.usuarioLogado = usuario;
                        this.atualizarInterfaceUsuario();
                        this.navegarPara('home');
                        this.mostrarNotificacao('info', `Modo alterado para: ${tipo}`);
                    }
                } else {
                    // Se não está logado, muda apenas no seletor
                    document.querySelectorAll('.user-type-btn').forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.dataset.type === tipo) {
                            btn.classList.add('active');
                            this.tipoUsuario = tipo;
                        }
                    });
                }
            }

            abrirModalCadastro() {
  const modal = document.getElementById('registerModal');
  const modalBody = modal.querySelector('.modal-body');

  // Gerar formulário baseado no tipo de usuário
  const formHtml = this.gerarFormularioCadastro();
  modalBody.innerHTML = formHtml;

  // 👉 Inicializar selects de Estado/Cidade dentro do modal
  this.inicializarEstadoCidadeCadastro(modalBody);

  modal.classList.add('active');

setTimeout(() => {
  const ieInput = document.getElementById('empCadIE');
  if (ieInput) {
    ieInput.removeAttribute('required');
  }
}, 0);

  // Adicionar eventos ao formulário
  const form = modalBody.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => this.processarCadastro(e));
  }

  // Adicionar eventos de toggle de senha ao modal
  modalBody.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const passwordInput = btn.closest('.password-wrapper').querySelector('.password-input');
      const icon = btn.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.class
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        } else {
                            passwordInput.type = 'password';
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    });
                });

  // Adicionar funcionalidade de busca automática por CEP
  this.inicializarBuscaCEP(modalBody);

  // Adicionar formatação de CNPJ para empresa
  this.inicializarFormatacaoCNPJ(modalBody);
            }

            fecharModalCadastro() {
                document.getElementById('registerModal').classList.remove('active');
            }

            inicializarFormatacaoCNPJ(modalBody) {
                const cnpjInput = modalBody.querySelector('#colCadCnpjEmpresa');
                if (cnpjInput) {
                    cnpjInput.addEventListener('input', (e) => this.formatarCNPJ(e.target));
                    cnpjInput.addEventListener('blur', () => this.verificarEmpresaPorCNPJ(modalBody));
                }
            }

            formatarCNPJ(input) {
                let value = input.value.replace(/\D/g, '');
                
                if (value.length <= 14) {
                    if (value.length > 2) value = value.substring(0, 2) + '.' + value.substring(2);
                    if (value.length > 6) value = value.substring(0, 6) + '.' + value.substring(6);
                    if (value.length > 10) value = value.substring(0, 10) + '/' + value.substring(10);
                    if (value.length > 15) value = value.substring(0, 15) + '-' + value.substring(15, 17);
                }
                
                input.value = value;
            }

            verificarEmpresaPorCNPJ(modalBody) {
                const cnpjInput = modalBody.querySelector('#colCadCnpjEmpresa');
                const empresaInfo = modalBody.querySelector('#empresaInfo');
                
                if (!cnpjInput) return;
                
                const cnpj = cnpjInput.value.replace(/\D/g, '');
                
                if (cnpj.length !== 14) {
                    if (empresaInfo) empresaInfo.remove();
                    return;
                }
                
                // Procurar empresa
                const empresaEncontrada = this.empresas.find(empresa => empresa.cnpj.replace(/\D/g, '') === cnpj);
                
                // Remover info anterior se existir
                if (empresaInfo) empresaInfo.remove();
                
                // Criar nova info da empresa
                const infoDiv = document.createElement('div');
                infoDiv.id = 'empresaInfo';
                infoDiv.style.cssText = `
                    margin-top: 10px;
                    padding: 15px;
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                `;
                
                if (empresaEncontrada) {
                    infoDiv.style.background = 'rgba(16, 185, 129, 0.1)';
                    infoDiv.style.border = '1px solid var(--success)';
                    infoDiv.innerHTML = `
                        <div style="color: var(--success); font-weight: 600; margin-bottom: 5px;">
                            <i class="fas fa-check-circle"></i> Empresa encontrada!
                        </div>
                        <div style="color: var(--gray);">
                            <strong>${empresaEncontrada.razao_social}</strong><br>
                            ${empresaEncontrada.nome || empresaEncontrada.razao_social}<br>
                            CNPJ: ${empresaEncontrada.cnpj}
                        </div>
                    `;
                } else {
                    infoDiv.style.background = 'rgba(239, 68, 68, 0.1)';
                    infoDiv.style.border = '1px solid var(--danger)';
                    infoDiv.innerHTML = `
                        <div style="color: var(--danger); font-weight: 600; margin-bottom: 5px;">
                            <i class="fas fa-exclamation-triangle"></i> Empresa não encontrada
                        </div>
                        <div style="color: var(--gray);">
                            O CNPJ informado não está cadastrado no sistema.<br>
                            <strong>Peça para o responsável da empresa fazer o cadastro primeiro.</strong>
                        </div>
                    `;
                }
                
                // Inserir após o campo CNPJ
                cnpjInput.parentNode.insertAdjacentElement('afterend', infoDiv);
            }

            formatarCEP(input) {
                let value = input.value.replace(/\D/g, '');
                if (value.length > 5) {
                    value = value.substring(0, 5) + '-' + value.substring(5, 8);
                }
                input.value = value;
            }

            async buscarEnderecoPorCEP(tipo, modalBody) {
                let cepInput, enderecoInput, cidadeSelect, estadoSelect;
                
                if (tipo === 'empresa') {
                    cepInput = modalBody.querySelector('#empCadCep');
                    enderecoInput = modalBody.querySelector('#empCadEndereco');
                    cidadeSelect = modalBody.querySelector('#empCadCidade');
                    estadoSelect = modalBody.querySelector('#empCadEstado');
                } else if (tipo === 'fornecedor') {
                    cepInput = modalBody.querySelector('#fornCepReg');
                    enderecoInput = modalBody.querySelector('#fornEnderecoReg');
                    cidadeSelect = modalBody.querySelector('#fornCidadeReg');
                    estadoSelect = modalBody.querySelector('#fornEstadoReg');
                }
                
                if (!cepInput || !enderecoInput || !cidadeSelect || !estadoSelect) return;
                
                const cep = cepInput.value.replace(/\D/g, '');
                
                if (cep.length !== 8) {
                    if (cep.length > 0) {
                        this.mostrarNotificacao('warning', 'CEP deve ter 8 dígitos');
                    }
                    return;
                }
                
                try {
                    // Mostrar loading
                    cepInput.disabled = true;
                    cepInput.style.opacity = '0.6';
                    
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();
                    
                    if (data.erro) {
                        this.mostrarNotificacao('error', 'CEP não encontrado');
                        return;
                    }
                    
                    // Preencher endereço
                    const enderecoCompleto = `${data.logradouro}, ${data.bairro}`;
                    enderecoInput.value = enderecoCompleto;
                    
                    // Preencher estado
                    estadoSelect.value = data.uf;
                    
                    // Trigger change event para atualizar cidades
                    estadoSelect.dispatchEvent(new Event('change'));
                    
                    // Aguardar um pouco para as cidades serem carregadas e selecionar
                    setTimeout(() => {
                        // Procurar cidade no select
                        const options = cidadeSelect.querySelectorAll('option');
                        let cidadeEncontrada = false;
                        options.forEach(option => {
                            if (option.textContent.toLowerCase() === data.localidade.toLowerCase()) {
                                cidadeSelect.value = option.value;
                                cidadeEncontrada = true;
                            }
                        });
                        
                        if (!cidadeEncontrada) {
                            // Se não encontrou, adicionar como opção
                            const option = document.createElement('option');
                            option.value = data.localidade;
                            option.textContent = data.localidade;
                            option.selected = true;
                            cidadeSelect.appendChild(option);
                        }
                    }, 100);
                    
                    this.mostrarNotificacao('success', 'Endereço preenchido automaticamente');
                    
                } catch (error) {
                    console.error('Erro ao buscar CEP:', error);
                    this.mostrarNotificacao('error', 'Erro ao buscar CEP. Tente novamente.');
                } finally {
                    cepInput.disabled = false;
                    cepInput.style.opacity = '1';
                }
            }

            abrirModalRecuperacaoSenha() {
                const modal = document.getElementById('forgotPasswordModal');
                const form = document.getElementById('forgotPasswordForm');
                const confirmacao = document.getElementById('forgotPasswordConfirmacao');
                
                if (form) form.style.display = 'block';
                if (confirmacao) confirmacao.style.display = 'none';
                if (modal) modal.classList.add('active');
            }

            fecharModalRecuperacaoSenha() {
                const modal = document.getElementById('forgotPasswordModal');
                if (modal) modal.classList.remove('active');
            }

            processarRecuperacaoSenha() {
                const usuario = document.getElementById('usuarioRecuperacao')?.value;
                
                if (!usuario) {
                    this.mostrarNotificacao('error', 'Informe seu username ou e-mail');
                    return;
                }

                // Procurar usuário por username ou email
                let usuarioEncontrado = null;

                // Procurar em colaboradores
                if (this.usuarios[usuario]) {
                    usuarioEncontrado = this.usuarios[usuario];
                } else {
                    // Procurar por email em colaboradores
                    usuarioEncontrado = Object.values(this.usuarios).find(u => u.email === usuario);
                }

                // Procurar em empresas
                if (!usuarioEncontrado) {
                    usuarioEncontrado = this.empresas.find(e => e.username === usuario || e.email === usuario);
                }

                // Procurar em fornecedores
                if (!usuarioEncontrado) {
                    usuarioEncontrado = this.fornecedores.find(f => f.username === usuario || f.email === usuario);
                }

                if (!usuarioEncontrado) {
                    this.mostrarNotificacao('error', 'Usuário ou e-mail não encontrado');
                    return;
                }

                // Armazenar usuário temporariamente para redefinição
                this.usuarioRecuperando = usuarioEncontrado;
                
                // Mostrar seção de confirmação
                const form = document.getElementById('forgotPasswordForm');
                const confirmacao = document.getElementById('forgotPasswordConfirmacao');
                const emailConfirmacao = document.getElementById('emailConfirmacao');

                if (form) form.style.display = 'none';
                if (confirmacao) confirmacao.style.display = 'block';
                
                // Mostrar email ou username
                const emailOuUsername = usuarioEncontrado.email || usuarioEncontrado.username;
                if (emailConfirmacao) {
                    emailConfirmacao.textContent = `Enviamos instruções para ${emailOuUsername}. Crie uma nova senha abaixo:`;
                }

                this.mostrarNotificacao('success', 'Usuário encontrado! Crie uma nova senha.');

                // Adicionar eventos aos botões de toggle de senha
                document.querySelectorAll('#forgotPasswordConfirmacao .password-toggle-btn').forEach(btn => {
                    btn.removeEventListener('click', this.togglePasswordHandler);
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const passwordInput = btn.closest('.password-wrapper').querySelector('.password-input');
                        const icon = btn.querySelector('i');
                        
                        if (passwordInput.type === 'password') {
                            passwordInput.type = 'text';
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        } else {
                            passwordInput.type = 'password';
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    });
                });
            }

            redefinirSenha() {
                const novaSenha = document.getElementById('novaSenhaRecuperacao')?.value;
                const confirmaSenha = document.getElementById('confirmaSenhaRecuperacao')?.value;

                if (!novaSenha || !confirmaSenha) {
                    this.mostrarNotificacao('error', 'Preencha ambos os campos de senha');
                    return;
                }

                if (novaSenha !== confirmaSenha) {
                    this.mostrarNotificacao('error', 'As senhas não conferem');
                    return;
                }

                if (novaSenha.length < 6) {
                    this.mostrarNotificacao('error', 'A senha deve ter no mínimo 6 caracteres');
                    return;
                }

                if (!this.usuarioRecuperando) {
                    this.mostrarNotificacao('error', 'Erro ao recuperar usuário');
                    return;
                }

                // Atualizar senha
                const usuario = this.usuarioRecuperando;
                usuario.senha = novaSenha;

                // Salvar alterações no armazenamento apropriado
                if (this.usuarios[usuario.username]) {
                    this.usuarios[usuario.username] = usuario;
                } else if (this.empresas.find(e => e.username === usuario.username)) {
                    const index = this.empresas.findIndex(e => e.username === usuario.username);
                    this.empresas[index] = usuario;
                } else if (this.fornecedores.find(f => f.username === usuario.username)) {
                    const index = this.fornecedores.findIndex(f => f.username === usuario.username);
                    this.fornecedores[index] = usuario;
                }

                this.salvarDados();
                this.mostrarNotificacao('success', 'Senha redefinida com sucesso! Você pode fazer login agora.');
                
                // Limpar formulário e fechar modal
                document.getElementById('novaSenhaRecuperacao').value = '';
                document.getElementById('confirmaSenhaRecuperacao').value = '';
                document.getElementById('usuarioRecuperacao').value = '';
                this.usuarioRecuperando = null;
                
                setTimeout(() => {
                    this.fecharModalRecuperacaoSenha();
                }, 2000);
            }

            inicializarEstadoCidadeCadastro(root = document) {
    const setupParEstadoCidade = (idEstado, idCidade) => {
      const selEstado = root.querySelector('#' + idEstado);
      const selCidade = root.querySelector('#' + idCidade);
      if (!selEstado || !selCidade) return;

      // Preencher lista de estados
      selEstado.innerHTML =
        '<option value="">Selecione o estado</option>' +
        Object.keys(this.estadosCidades)
          .sort()
          .map(uf => `<option value="${uf}">${uf}</option>`)
          .join('');

      // Quando mudar o estado, preencher as cidades
      selEstado.addEventListener('change', () => {
        const uf = selEstado.value;

        // Resetar cidades
        selCidade.innerHTML = '<option value="">Selecione a cidade</option>';

        // Se não escolheu nada, não faz mais nada
        if (!uf || !this.estadosCidades[uf]) return;

        // Adicionar opções de cidades
        selCidade.innerHTML += this.estadosCidades[uf]
          .map(cidade => `<option value="${cidade}">${cidade}</option>`)
          .join('');
      });
    };

    // Cadastro de empresa usa empCadEstado / empCadCidade
    setupParEstadoCidade('empCadEstado', 'empCadCidade');
    setupParEstadoCidade('fornEstadoReg', 'fornCidadeReg');
   
  }

            inicializarBuscaCEP(root = document) {
                const setupCepAutoFill = (cepSelector, tipo) => {
                    const cepInput = root.querySelector(cepSelector);
                    if (!cepInput) return;

                    cepInput.addEventListener('blur', () => {
                        this.buscarEnderecoPorCEP(tipo, root);
                    });
                    cepInput.addEventListener('input', () => {
                        this.formatarCEP(cepInput);
                    });
                };

                setupCepAutoFill('#empCadCep', 'empresa');
                setupCepAutoFill('#fornCepReg', 'fornecedor');
            }

            gerarFormularioCadastro() {
                switch(this.tipoUsuario) {
                    case 'colaborador':
                        return `
                            <form id="cadastroColaboradorForm">
                                <h4 style="color: var(--white); margin-bottom: 20px;">Cadastro de Colaborador</h4>
                                
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label class="form-label required">Nome Completo</label>
                                        <input type="text" id="colCadNome" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">CPF</label>
                                        <input type="text" id="colCadCpf" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">RG</label>
                                        <input type="text" id="colCadRg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Data de Nascimento</label>
                                        <input type="date" id="colCadNascimento" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">E-mail</label>
                                        <input type="email" id="colCadEmail" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Telefone/Celular</label>
                                        <input type="tel" id="colCadTelefone" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Cargo</label>
                                        <input type="text" id="colCadCargo" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Setor</label>
                                        <input type="text" id="colCadSetor" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Empresa</label>
                                        <input type="text" id="colCadEmpresa" class="form-control" placeholder="Empresa onde trabalha">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Data de Admissão</label>
                                        <input type="date" id="colCadAdmissao" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Nome de Usuário</label>
                                        <input type="text" id="colCadUsername" class="form-control" placeholder="Escolha um username único" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Senha</label>
                                        <div class="password-wrapper">
                                            <input type="password" id="colCadSenha" class="form-control password-input" required>
                                            <button type="button" class="password-toggle-btn" tabindex="-1">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Confirmar Senha</label>
                                        <div class="password-wrapper">
                                            <input type="password" id="colCadConfirmaSenha" class="form-control password-input" required>
                                            <button type="button" class="password-toggle-btn" tabindex="-1">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label required">CNPJ da Empresa</label>
                                        <input type="text"
                                        id="colCadCnpjEmpresa"
                                        class="form-control"
                                        placeholder="00.000.000/0000-00" required>
                                 </div>

                                <div class="flex justify-end gap-4 mt-8">
                                    <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">
                                        Cancelar
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-user-plus"></i> Cadastrar
                                    </button>
                                </div>
                            </form>
                        `;
                        
                    case 'empresa':
  return `
    <form id="cadastroEmpresaForm">
      <h4 style="color: var(--white); margin-bottom: 20px;">Cadastro de Empresa</h4>

      <div class="form-grid">
        <div class="form-group">
          <label class="form-label required">Razão Social</label>
          <input type="text" id="empCadRazaoSocial" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Nome da Empresa</label>
          <input type="text" id="empCadNomeFantasia" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">CNPJ</label>
          <input type="text" id="empCadCnpj" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label ">Inscrição Estadual</label>
          <input type="text" id="empCadIE" class="form-control"required>
        </div>

        <div class="form-group">
          <label class="form-label required">Responsável Legal</label>
          <input type="text" id="empCadResponsavel" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">CPF do Responsável</label>
          <input type="text" id="empCadCpfResponsavel" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">E-mail Corporativo</label>
          <input type="email" id="empCadEmail" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Telefone</label>
          <input type="tel" id="empCadTelefone" class="form-control" required>
        </div>

        <!-- Novo: Estado (UF) -->
        <div class="form-group">
          <label class="form-label required">Estado (UF)</label>
          <select id="empCadEstado" class="form-control" required>
            <option value="">Selecione o estado</option>
            <!-- opções serão preenchidas via JavaScript -->
          </select>
        </div>

        <!-- Novo: Cidade -->
        <div class="form-group">
          <label class="form-label required">Cidade</label>
          <select id="empCadCidade" class="form-control" required>
            <option value="">Selecione a cidade</option>
            <!-- opções serão preenchidas via JavaScript -->
          </select>
        </div>

        <div class="form-group">
          <label class="form-label required">CEP</label>
          <input type="text" id="empCadCep" class="form-control" placeholder="00000-000" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Endereço</label>
          <input type="text" id="empCadEndereco" class="form-control" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Nome de Usuário</label>
          <input type="text" id="empCadUsername" class="form-control" placeholder="Escolha um username único" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Senha</label>
          <div class="password-wrapper">
            <input type="password" id="empCadSenha" class="form-control password-input" required>
            <button type="button" class="password-toggle-btn" tabindex="-1">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Confirmar Senha</label>
          <div class="password-wrapper">
            <input type="password" id="empCadConfirmaSenha" class="form-control password-input" required>
            <button type="button" class="password-toggle-btn" tabindex="-1">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
      </div> <!-- fecha a form-grid única -->

      <div class="flex justify-end gap-4 mt-8">
        <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-building"></i> Cadastrar Empresa
        </button>
      </div>
    </form>
  `;
                        
                    case 'fornecedor':
                        return `
                            <form id="cadastroFornecedorForm">
                                <h4 style="color: var(--white); margin-bottom: 20px;">Cadastro de Fornecedor</h4>
                                
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label class="form-label required">Razão Social</label>
                                        <input type="text" id="fornRazaoSocialReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Nome do Fornecedor</label>
                                        <input type="text" id="fornNomeFantasiaReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">CNPJ</label>
                                        <input type="text" id="fornCnpjReg" class="form-control" placeholder="XX.XXX.XXX/0001-XX" required>
                                    </div>
                                    
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Contato Principal</label>
                                        <input type="text" id="fornContatoReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">CPF do Contato</label>
                                        <input type="text" id="fornCpfContatoReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">E-mail</label>
                                        <input type="email" id="fornEmailReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Telefone</label>
                                        <input type="tel" id="fornTelefoneReg" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Categoria de Fornecimento</label>
                                        <select id="fornCategoriaReg" class="form-control" required>
                                            <option value="">Selecione uma categoria</option>
                                            <option value="EPIs">EPIs (Equipamentos de Proteção Individual)</option>
                                            <option value="EPCs">EPCs (Equipamentos de Proteção Coletiva)</option>
                                            <option value="Consultoria">Consultoria em Segurança</option>
                                            <option value="Treinamento">Treinamento</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
     
                                    <!-- Dentro da div com class="form-grid", após os campos de Estado/Cidade -->

                                   <div class="form-group">
  <label class="form-label required">Estado (UF)</label>
  <select id="fornEstadoReg" class="form-control" required>
    <option value="">Selecione o estado</option>
    <!-- opções serão preenchidas via JavaScript -->
  </select>
</div>

<div class="form-group">
  <label class="form-label required">Cidade</label>
  <select id="fornCidadeReg" class="form-control" required>
    <option value="">Selecione a cidade</option>
    <!-- opções serão preenchidas via JavaScript -->
  </select>
</div>

<div class="form-group">
  <label class="form-label required">CEP</label>
  <input type="text" id="fornCepReg" class="form-control" placeholder="00000-000" required>
</div>

<div class="form-group">
  <label class="form-label required">Endereço</label>
  <input type="text" id="fornEnderecoReg" class="form-control" required>
</div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Nome de Usuário</label>
                                        <input type="text" id="fornUsernameReg" class="form-control" placeholder="Escolha um username único" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Senha</label>
                                        <div class="password-wrapper">
                                            <input type="password" id="fornSenhaReg" class="form-control password-input" required>
                                            <button type="button" class="password-toggle-btn" tabindex="-1">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label required">Confirmar Senha</label>
                                        <div class="password-wrapper">
                                            <input type="password" id="fornConfirmaSenhaReg" class="form-control password-input" required>
                                            <button type="button" class="password-toggle-btn" tabindex="-1">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="flex justify-end gap-4 mt-8">
                                    <button type="button" class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">
                                        Cancelar
                                    </button>
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-truck"></i> Cadastrar Fornecedor
                                    </button>
                                </div>
                            </form>
                        `;
                        
                    default:
                        return `
                            <div style="text-align: center; padding: 40px;">
                                <h4 style="color: var(--white); margin-bottom: 20px;">Cadastro de ${this.tipoUsuario}</h4>
                                <p style="color: var(--gray); margin-bottom: 30px;">
                                    Em desenvolvimento...
                                </p>
                                <button class="btn btn-secondary" onclick="sistemaSenac.fecharModalCadastro()">
                                    Fechar
                                </button>
                            </div>
                        `;
                }
            }

            processarCadastro(event) {
                event.preventDefault();
                
                const form = event.target;
                const tipo = this.tipoUsuario;
                
                if (tipo === 'colaborador') {
                    const nome = document.getElementById('colCadNome')?.value;
                    const cpf = document.getElementById('colCadCpf')?.value;
                    const rg = document.getElementById('colCadRg')?.value;
                    const dataNascimento = document.getElementById('colCadNascimento')?.value;
                    const email = document.getElementById('colCadEmail')?.value;
                    const telefone = document.getElementById('colCadTelefone')?.value;
                    const cargo = document.getElementById('colCadCargo')?.value;
                    const setor = document.getElementById('colCadSetor')?.value;
                    const empresa = document.getElementById('colCadEmpresa')?.value;
                    const dataAdmissao = document.getElementById('colCadAdmissao')?.value;
                    const username = document.getElementById('colCadUsername')?.value;
                    const senha = document.getElementById('colCadSenha')?.value;
                    const confirmaSenha = document.getElementById('colCadConfirmaSenha')?.value;
                    
                    if (!nome || !email || !username || !senha) {
                        this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios!');
                        return;
                    }
                    
                    if (senha !== confirmaSenha) {
                        this.mostrarNotificacao('error', 'As senhas não conferem!');
                        return;
                    }
                    
                    // 🔹 Pegar o CNPJ digitado pelo colaborador
                    const cnpjEmpresa = document.getElementById('colCadCnpjEmpresa').value.trim();

                    // 🔹 Validar formato do CNPJ
                    const cnpjLimpo = cnpjEmpresa.replace(/\D/g, '');
                    if (cnpjLimpo.length !== 14) {
                        this.mostrarNotificacao('error', 'CNPJ da empresa deve ter 14 dígitos');
                        return;
                    }

                    // 🔹 Procurar empresa com esse CNPJ
                    const empresaEncontrada = this.empresas.find(empresa => empresa.cnpj.replace(/\D/g, '') === cnpjLimpo);

                    // ❌ Se não encontrou, bloqueia o cadastro
                    if (!empresaEncontrada) {
                        this.mostrarNotificacao('error', 'CNPJ da empresa não encontrado no sistema. Solicite ao responsável da empresa que faça o cadastro primeiro.');
                        return;
                    }

                    // ✅ Empresa encontrada - mostrar confirmação
                    this.mostrarNotificacao('success', `Empresa "${empresaEncontrada.razao_social}" vinculada com sucesso!`);
``
                    // Verificar se username já existe
                    if (this.usuarios[username]) {
                        this.mostrarNotificacao('error', 'Este username já está em uso!');
                        return;
                    }
                    
                    const novoColaborador = {
                        username: username,
                        nome: nome,
                        email: email,
                        cpf: cpf,
                        rg: rg,
                        data_nascimento: dataNascimento,
                        telefone: telefone,
                        cargo: cargo,
                        setor: setor,
                        empresa: empresa,
                        data_admissao: dataAdmissao,
                        senha: senha,
                        tipo: 'colaborador',
                        
                        // 🔗 VÍNCULO COM A EMPRESA
                        empresaId: empresaEncontrada.id,
                        empresaNome: empresaEncontrada.razao_social,
                        empresaFantasia: empresaEncontrada.nome || empresaEncontrada.razao_social,
                        empresaCnpj: empresaEncontrada.cnpj,
                        empresaEmail: empresaEncontrada.email,
                        empresaTelefone: empresaEncontrada.telefone,
                        empresaEndereco: empresaEncontrada.endereco,
                        empresaCidade: empresaEncontrada.cidade,
                        empresaEstado: empresaEncontrada.estado,
                        empresaCep: empresaEncontrada.cep
                    };
                    
                    this.usuarios[username] = novoColaborador;
                    this.salvarDados();
                    this.mostrarNotificacao('success', `Cadastro realizado com sucesso! Você foi vinculado à empresa "${empresaEncontrada.razao_social}". Agora faça login com suas credenciais.`);
                    
                } else if (tipo === 'empresa') {
                    const razaoSocial = document.getElementById('empCadRazaoSocial')?.value;
                    const nomeFantasia = document.getElementById('empCadNomeFantasia')?.value;
                    const cnpj = document.getElementById('empCadCnpj')?.value;
                    const email = document.getElementById('empCadEmail')?.value;
                    const telefone = document.getElementById('empCadTelefone')?.value;
                    const username = document.getElementById('empCadUsername')?.value;
                    const senha = document.getElementById('empCadSenha')?.value;
                    const confirmaSenha = document.getElementById('empCadConfirmaSenha')?.value;
                    const endereco = document.getElementById('empCadEndereco')?.value;
                    const cidade = document.getElementById('empCadCidade')?.value;
                    const cep = document.getElementById('empCadCep')?.value;
                    
                    if (!razaoSocial || !email || !username || !senha || !cep) {
                        this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios!');
                        return;
                    }
                    
                    if (senha !== confirmaSenha) {
                        this.mostrarNotificacao('error', 'As senhas não conferem!');
                        return;
                    }
                    
                    // Verificar se username já existe
                    if (this.empresas.find(e => e.username === username)) {
                        this.mostrarNotificacao('error', 'Este username já está em uso!');
                        return;
                    }
                    
                    const novaEmpresa = {
                        id: 'emp_' + Date.now(),
                        username: username,
                        razao_social: razaoSocial,
                        nome: nomeFantasia,
                        cnpj: cnpj,
                        email: email,
                        telefone: telefone,
                        endereco: endereco,
                        cidade: cidade,
                        cep: cep,
                        senha: senha,
                        tipo: 'empresa'
                    };
                    
                    this.empresas.push(novaEmpresa);
                    this.salvarDados();
                    this.mostrarNotificacao('success', 'Cadastro de empresa realizado com sucesso! Agora faça login com suas credenciais.');
                    
                } else if (tipo === 'fornecedor') {
  const razaoSocial = document.getElementById('fornRazaoSocialReg')?.value;
  const nomeFantasia = document.getElementById('fornNomeFantasiaReg')?.value;
  const cnpj = document.getElementById('fornCnpjReg')?.value;
  const email = document.getElementById('fornEmailReg')?.value;
  const telefone = document.getElementById('fornTelefoneReg')?.value;
  const categoria = document.getElementById('fornCategoriaReg')?.value;
  const endereco = document.getElementById('fornEnderecoReg')?.value;
  const estado = document.getElementById('fornEstadoReg')?.value;
  const cidade = document.getElementById('fornCidadeReg')?.value;
  const cep = document.getElementById('fornCepReg')?.value;
  const username = document.getElementById('fornUsernameReg')?.value;
  const senha = document.getElementById('fornSenhaReg')?.value;
  const confirmaSenha = document.getElementById('fornConfirmaSenhaReg')?.value;

  if (!razaoSocial || !email || !username || !senha || !categoria || !estado || !cidade || !cep) {
    this.mostrarNotificacao('error', 'Preencha todos os campos obrigatórios!');
    return;
  }

  if (senha !== confirmaSenha) {
    this.mostrarNotificacao('error', 'As senhas não conferem!');
    return;
  }

  if (this.fornecedores.find(f => f.username === username)) {
    this.mostrarNotificacao('error', 'Este username já está em uso!');
    return;
  }

  const novoFornecedor = {
    id: 'forn_' + Date.now(),
    username: username,
    razao_social: razaoSocial,
    nome: nomeFantasia || razaoSocial,
    cnpj: cnpj,
    email: email,
    telefone: telefone,
    categoria: categoria,
    endereco: endereco,
    estado: estado,
    cidade: cidade,
    cep: cep,
    senha: senha,
    tipo: 'fornecedor'
  };

  this.fornecedores.push(novoFornecedor);
  this.salvarDados();
  this.mostrarNotificacao('success', 'Cadastro de fornecedor realizado com sucesso! Agora faça login com suas credenciais.');
}
                
                setTimeout(() => {
                    this.fecharModalCadastro();
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                }, 1500);
            }

            mostrarNotificacao(tipo, mensagem, duracao = 3000) {
                const container = document.getElementById('notificationContainer');
                
                const notification = document.createElement('div');
                notification.className = `notification ${tipo}`;
                
                let icon;
                switch(tipo) {
                    case 'success': icon = 'fa-check-circle'; break;
                    case 'error': icon = 'fa-exclamation-circle'; break;
                    case 'warning': icon = 'fa-exclamation-triangle'; break;
                    default: icon = 'fa-info-circle';
                }
                
                notification.innerHTML = `
                    <div class="notification-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="notification-message">${mensagem}</div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                container.appendChild(notification);
                
                // Animar entrada
                setTimeout(() => notification.classList.add('show'), 10);
                
                // Fechar ao clicar
                notification.querySelector('.notification-close').addEventListener('click', () => {
                    this.fecharNotificacao(notification);
                });
                
                // Auto-fechar
                if (duracao > 0) {
                    setTimeout(() => this.fecharNotificacao(notification), duracao);
                }
            }

            fecharNotificacao(notification) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }

        // ===== CLASSE DO CARROSSEL =====
        class CarrosselOrientacoes {
            constructor() {
                this.slides = [
                    {
                        titulo: 'NR-6 - Equipamentos de Proteção Individual',
                        descricao: 'Norma que regulamenta o fornecimento, uso e conservação dos EPIs. A empresa é obrigada a fornecer EPIs adequados aos riscos.',
                        icon: 'fa-hard-hat',
                        cor: 'var(--neon-blue)'
                    },
                    {
                        titulo: 'NR-18 - Condições e Meio Ambiente na Indústria da Construção',
                        descricao: 'Estabelece diretrizes para prevenção de acidentes na construção civil, incluindo proteção contra quedas e sinalização.',
                        icon: 'fa-tools',
                        cor: 'var(--neon-green)'
                    },
                    {
                        titulo: 'NR-35 - Trabalho em Altura',
                        descricao: 'Define requisitos mínimos para trabalho em altura, incluindo planejamento, organização e execução das atividades.',
                        icon: 'fa-mountain',
                        cor: 'var(--neon-purple)'
                    },
                    {
                        titulo: 'NBR 14.280 - Sinalização de Segurança',
                        descricao: 'Especifica cores para identificação de equipamentos de segurança e delimitação de áreas.',
                        icon: 'fa-exclamation-triangle',
                        cor: 'var(--neon-orange)'
                    },
                    {
                        titulo: 'NR-23 - Proteção Contra Incêndios',
                        descricao: 'Estabelece medidas de prevenção e combate a incêndios, incluindo extintores, saídas de emergência e brigada de incêndio.',
                        icon: 'fa-fire-extinguisher',
                        cor: 'var(--danger)'
                    }
                ];
                
                this.slideAtual = 0;
                this.init();
            }
            
            init() {
                this.renderizarCarrossel();
                this.iniciarAutoPlay();
            }
            
            renderizarCarrossel() {
                const container = document.getElementById('carrosselSlides');
                const dots = document.getElementById('carrosselIndicators');
                
                if (!container || !dots) return;
                
                // Limpar conteúdo
                container.innerHTML = '';
                dots.innerHTML = '';
                
                // Adicionar slides
                this.slides.forEach((slide, index) => {
                    const slideDiv = document.createElement('div');
                    slideDiv.className = 'carrossel-slide';
                    if (index === 0) {
                        slideDiv.classList.add('active');
                    }
                    
                    slideDiv.innerHTML = `
                        <div style="background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: 30px; border-left: 4px solid ${slide.cor};">
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                                <div style="width: 60px; height: 60px; background: ${slide.cor}; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                                    <i class="fas ${slide.icon}"></i>
                                </div>
                                <div style="flex: 1;">
                                    <h3 style="color: var(--white); margin-bottom: 5px;">${slide.titulo}</h3>
                                    <p style="color: var(--light-gray);">${slide.descricao}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    container.appendChild(slideDiv);
                    
                    // Adicionar dot
                    const dot = document.createElement('button');
                    dot.className = 'carrossel-indicator';
                    if (index === 0) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => this.irParaSlide(index));
                    
                    dots.appendChild(dot);
                });
            }
            
            mostrarSlide(index) {
                const slides = document.querySelectorAll('.carrossel-slide');
                const dots = document.querySelectorAll('.carrossel-indicator');
                
                if (slides.length === 0 || dots.length === 0) return;
                
                // Esconder todos os slides
                slides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Resetar todos os dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Mostrar slide atual
                if (slides[index]) {
                    slides[index].classList.add('active');
                }
                
                // Ativar dot atual
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
            
            proximo() {
                this.slideAtual = (this.slideAtual + 1) % this.slides.length;
                this.mostrarSlide(this.slideAtual);
            }
            
            anterior() {
                this.slideAtual = (this.slideAtual - 1 + this.slides.length) % this.slides.length;
                this.mostrarSlide(this.slideAtual);
            }
            
            irParaSlide(index) {
                if (index >= 0 && index < this.slides.length) {
                    this.slideAtual = index;
                    this.mostrarSlide(index);
                }
            }
            
            iniciarAutoPlay() {
                setInterval(() => {
                    this.proximo();
                }, 5000); // Muda a cada 5 segundos
            }
        }

        // ===== INICIALIZAR SISTEMA =====
        const sistemaSenac = new EpsafeEP();

        // Tornar acessível globalmente para eventos inline
        window.sistemaSenac = sistemaSenac;
    
