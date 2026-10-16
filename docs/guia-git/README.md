# Guia de Git — PortfolioHUB

Passo a passo dos comandos usados para versionar este repositório.

> Pré-requisitos: [Git instalado](https://git-scm.com/downloads) e uma conta no [GitHub](https://github.com).
> Nos comandos abaixo, troque `SEU-USUARIO` pelo seu usuário do GitHub.

---

## 1. Configurar o Git (só na primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Use o mesmo e-mail da sua conta do GitHub.

## 2. Criar o repositório no GitHub

1. Acesse **github.com** → botão **New** (ou **+ → New repository**);
2. **Repository name:** `portfolio-hub`;
3. Marque **Public**;
4. **Não** marque "Add a README" (o projeto já tem um);
5. Clique em **Create repository**.

## 3. Versão 1.0 — primeiro envio

Abra o terminal (ou Git Bash) **dentro da pasta `portfolio-hub`**:

```bash
git init
git branch -M main

# Commit 1: estrutura e site
git add index.html css/ img/ .gitignore
git commit -m "feat: cria site do portfólio em HTML e CSS"

# Commit 2: documentação principal
git add README.md
git commit -m "docs: adiciona README principal do repositório"

# Marca a versão 1.0
git tag -a v1.0 -m "Versão 1.0 - site inicial do portfólio"

# Conecta com o GitHub e envia
git remote add origin https://github.com/SEU-USUARIO/portfolio-hub.git
git push -u origin main
git push origin v1.0
```

> Ao fazer o primeiro `push`, o GitHub pode pedir login. Autorize pelo navegador
> (Git Credential Manager) ou use um *Personal Access Token* no lugar da senha.

## 4. Versão 1.1 — alterações e novo envio

O desafio pede para **realizar alterações e enviar novamente**. Exemplo:

```bash
# Commit 3: pastas dos projetos
git add projetos/
git commit -m "feat: adiciona pastas e READMEs dos projetos acadêmicos e pessoais"

# Commit 4: documentos de apoio
git add docs/
git commit -m "docs: adiciona guia de Git, guia de publicação, roteiro e relatório"

# Commit 5: uma alteração no site (ex.: depois de colocar seus links reais)
git add index.html README.md
git commit -m "fix: atualiza links de contato e do GitHub Pages"

git tag -a v1.1 -m "Versão 1.1 - projetos e documentação"
git push
git push origin v1.1
```

## 5. Comandos úteis

| Comando | Para que serve |
|---|---|
| `git status` | Mostra o que foi alterado |
| `git log --oneline` | Lista o histórico de commits |
| `git diff` | Mostra as diferenças antes do commit |
| `git pull` | Baixa as atualizações do GitHub |
| `git tag` | Lista as versões marcadas |

## 6. Boas práticas de commit usadas

Formato: `tipo: descrição curta no imperativo`

| Tipo | Uso | Exemplo |
|---|---|---|
| `feat` | Nova funcionalidade/conteúdo | `feat: adiciona seção de habilidades` |
| `fix` | Correção | `fix: corrige link quebrado do relatório` |
| `docs` | Documentação | `docs: melhora README do projeto IronStack` |
| `style` | Visual/formatação, sem mudar conteúdo | `style: ajusta cores dos cards` |
| `chore` | Tarefas gerais | `chore: adiciona .gitignore` |

Outras práticas:

- um commit por mudança lógica (não juntar tudo em um commit só);
- mensagens claras, em português, explicando **o que** mudou;
- usar *tags* (`v1.0`, `v1.1`) para marcar versões.

## 7. Colaboração (opcional, para trabalhos em equipe)

```bash
git checkout -b feature/nova-secao      # cria um branch
# ... faz alterações e commits ...
git push -u origin feature/nova-secao   # envia o branch
```

Depois, no GitHub, abra um **Pull Request** para revisar e juntar as alterações ao `main`.
