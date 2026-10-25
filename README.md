# PortfolioHUB

Repositório criado para o **Desafio da Entrega Intermediária do Bootcamp I — Criação de Repositório com Versionamento**.

Ele reúne meus projetos acadêmicos e pessoais em um só lugar, organizados em pastas, documentados com README e versionados com Git. O repositório também contém um site de portfólio simples, feito em HTML e CSS e publicado no GitHub Pages.

---

## 🌐 Links

| Item | Link |
|---|---|
| Site (GitHub Pages) | https://paivadevv.github.io/portfolio-hub/ |
| Repositório | https://github.com/Paivadevv/portfolio-hub |
| LinkedIn | https://www.linkedin.com/in/luiz-eduardo-paiva-costa-9475502b7/ |
| Vídeo de apresentação | *(em breve)* |

---

## 📁 Estrutura do repositório

```
portfolio-hub/
├── index.html                  → Página principal do portfólio
├── css/
│   └── style.css               → Estilos do site
├── img/
│   └── avatar.svg              → Imagem de perfil (substitua pela sua foto)
├── projetos/
│   ├── academicos/
│   │   ├── ironstack-banco-de-dados/
│   │   └── artigo-programacao-funcional/
│   └── pessoais/
│       ├── automacao-python/
│       └── estudos-java/
├── docs/
│   ├── relatorio-final.html    → Relatório de entrega do Bootcamp (abre no navegador)
│   ├── guia-git/README.md      → Comandos Git e exemplos de commits
│   ├── guia-publicacao.md      → GitHub Pages, repositório público e LinkedIn
│   └── roteiro-video.md        → Roteiro da apresentação de 5 minutos
├── .gitignore
└── README.md                   → Este arquivo
```

Cada pasta de projeto possui o seu próprio `README.md` com descrição, objetivos, tecnologias e instruções de uso.

---

## 📚 Projetos

### Acadêmicos
| Projeto | Descrição | Tecnologias |
|---|---|---|
| [IronStack](projetos/academicos/ironstack-banco-de-dados/) | Banco de dados de um sistema de academia | SQL |
| [Programação Funcional](projetos/academicos/artigo-programacao-funcional/) | Artigo ABNT sobre programação funcional e qualidade de software | Node.js, Clean |

### Pessoais
| Projeto | Descrição | Tecnologias |
|---|---|---|
| [Automação de Inatividade](projetos/pessoais/automacao-python/) | Fecha o navegador após inatividade do mouse | Python |
| [Estudos de Java](projetos/pessoais/estudos-java/) | Exercícios do Bootcamp Java com IA | Java |

---

## ⚙️ Como funciona o site

O site é **estático**: usa apenas HTML e CSS, sem JavaScript, frameworks ou banco de dados.

- `index.html` contém as seções: **Apresentação, Sobre, Projetos, Habilidades, Documentos e Contato**;
- `css/style.css` define cores, fontes, cards e a versão para celular (responsiva);
- o menu do topo usa links internos (`#sobre`, `#projetos`...) para navegar pela página.

### Como abrir localmente
1. Baixe ou clone o repositório;
2. Dê dois cliques no arquivo `index.html`;
3. O site abre no navegador.
---

## 🔖 Versionamento

O projeto é versionado com Git seguindo commits curtos e descritivos.

| Versão | Descrição |
|---|---|
| **v1.0** | Primeira versão do site e estrutura inicial do repositório |
| **v1.1** | Inclusão dos projetos, documentação, relatório e links atualizados |

Os comandos Git equivalentes estão em [`docs/guia-git`](docs/guia-git/README.md).

---

## 🛠️ Tecnologias e ferramentas

- **HTML5** e **CSS3** — site do portfólio
- **Git** — versionamento local
- **GitHub** — hospedagem do repositório
- **GitHub Pages** — publicação do site
- **LinkedIn** — divulgação do projeto

---

## 👤 Autor

**Luiz Eduardo Paiva Costa** — Estudante de Engenharia de Computação (CEUB) · Brasília - DF

- GitHub: https://github.com/Paivadevv
- LinkedIn: https://www.linkedin.com/in/luiz-eduardo-paiva-costa-9475502b7/


## 🔌 Vitrine GitHub (v1.2 — Entrega Final)

A página [`vitrine.html`](vitrine.html) lê meus repositórios públicos pela **API pública do GitHub** (sem token) e os exibe com nome, descrição, tecnologias e link, com busca e filtro. Se a API falhar, usa a lista local `data/projects.json`.

| Arquivo | Função |
|---|---|
| `vitrine.html` | Página com CSP restritiva |
| `js/config.js` | Usuário do GitHub e tópico (configuração pública, nunca coloque tokens) |
| `js/lib.js` | Validação de usuário/URL e filtros (testados) |
| `js/app.js` | Interface e chamada à API |
| `test/lib.test.js` | Testes unitários |
| `.github/workflows/ci.yml` | CI: roda os testes com permissão somente leitura |

**Testes:** `npm test` (Node.js 20+, sem dependências).
**Servidor local:** `python3 -m http.server 8080` e abra `http://localhost:8080/vitrine.html` (módulos ES não funcionam via `file://`).

Documentação: [Segurança](docs/SEGURANCA.md) · [GitHub, usuários e colaboração](docs/GITHUB_E_COLABORACAO.md) · [Uso do Gemini](docs/GEMINI.md) · [SECURITY.md](SECURITY.md)
