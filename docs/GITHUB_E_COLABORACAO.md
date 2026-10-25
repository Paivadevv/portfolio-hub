# GitHub: usuários, acesso e colaboração

> Itens com ☐ são configurações da conta/repositório recomendadas e dependem do dono; só marque como feitos após conferir no GitHub.

## 1. Gestão de usuários
Repositório de conta pessoal: um dono (owner) e colaboradores. Papéis: **Read** (ver/clonar), **Triage** (issues/PRs), **Write** (push em branches), **Maintain**, **Admin**. Regra: o menor papel necessário, pelo menor tempo.

☐ Ativar autenticação em dois fatores (Settings → Password and authentication). O GitHub avisa que será obrigatória para esta conta até 01/12/2026.
☐ Usar chave SSH ou Git Credential Manager; se usar token (PAT), com escopo mínimo e expiração curta, nunca em arquivos do projeto.
☐ Colaboradores só com autorização do dono (Settings → Collaborators).

## 2. Repositório público × privado
| | Público | Privado |
|---|---|---|
| Visibilidade | qualquer pessoa vê e clona | só dono e convidados |
| GitHub Pages | disponível no plano gratuito | exige plano pago |
| Uso aqui | `portfolio-hub` é público (portfólio) | rascunhos e dados sensíveis |

Antes de manter público: revisar histórico e arquivos em busca de segredos ou dados pessoais desnecessários.

## 3. Proteção do branch `main` (Settings → Branches ou Rulesets)
☐ Exigir Pull Request antes do merge; ☐ exigir o status check `CI`; ☐ bloquear force-push; ☐ restringir exclusão do branch.

## 4. Fluxo de colaboração (exemplo: este PR)
1. `git switch -c feature/vitrine-api-github` e commits pequenos no formato Conventional Commits (`feat`, `fix`, `docs`, `test`, `ci`).
2. Abrir **Pull Request** contra `main`; o workflow `CI` roda `npm test`.
3. Revisar o diff (a IA, como o Gemini, pode ajudar, mas a decisão é humana) e fazer *squash and merge* ou merge normal.
4. Pages republica o site a partir do `main` depois do merge.
5. Versionamento: tags semânticas e Releases (já existem v1.0 e v1.1; esta entrega seria v1.2).

## 5. Integração GitHub ↔ PortfolioHUB
A página `vitrine.html` consulta `api.github.com/users/Paivadevv/repos` e lista repositórios públicos que não sejam fork nem arquivados. Para exibir só alguns, defina `topic` em `js/config.js` (por exemplo `portfoliohub`) e adicione esse tópico aos repositórios desejados. Novo projeto = criar o repositório e preencher a descrição.
