# PortfolioHUB

Repositório criado para o **Desafio da Entrega Intermediária do Bootcamp I — Criação de Repositório com Versionamento**.

Ele reúne meus projetos acadêmicos e pessoais em um só lugar, organizados em pastas, documentados com README e versionados com Git. O repositório também contém um site de portfólio simples, feito em HTML e CSS e publicado no GitHub Pages.

---

## 🌐 Links

| Item | Link |
|---|---|
| Site (GitHub Pages) | https://paivadevv.github.io/portfolio-hub/ |
| Repositório | https://github.com/Paivadevv/portfolio-hub |
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

### Como editar
- Textos e links: edite o `index.html`;
- Cores: altere as variáveis no início do `css/style.css`;
- Foto: substitua `img/avatar.svg` por sua foto (ex.: `img/avatar.jpg`) e atualize o `src` no HTML.

---

## 🔖 Versionamento

O projeto é versionado com Git seguindo commits curtos e descritivos (padrão *Conventional Commits*).

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
