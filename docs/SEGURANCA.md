# Segurança da vitrine GitHub

## Superfície de ataque
A página `vitrine.html` é estática (sem servidor próprio, banco, login ou formulário). Entradas não confiáveis: (1) JSON da API do GitHub (descrições e tópicos são editáveis por quem controla o repositório), (2) campo de busca, (3) `data/projects.json`. A página `index.html` original continua apenas HTML/CSS, sem JavaScript.

## Controles implementados

| Controle | Onde | Verificação |
|---|---|---|
| Content-Security-Policy restritiva: `default-src 'none'`, scripts/estilos só `'self'`, `connect-src` só `self` e `api.github.com`, `form-action 'none'`, `base-uri 'none'` | `vitrine.html` | teste local no navegador: sem violações no console |
| Sem `innerHTML`/`eval`; todo texto externo via `textContent` | `js/app.js` | teste local: descrição com HTML aparece como texto, sem execução |
| Validação do usuário GitHub (regra oficial de nomes) | `js/lib.js: isValidUser` | teste unitário (`npm test`) |
| Allowlist de URL (`https://github.com`, sem credenciais); `javascript:` e `data:` descartados | `js/lib.js: safeGithubUrl` | teste unitário |
| `rel="noopener noreferrer"` e `referrer: no-referrer` | `app.js`, `vitrine.html` | teste local |
| Limite de tamanho em textos externos e busca de até 60 caracteres | `lib.js: clip`, `vitrine.html` | revisão de código |
| Nenhum token/segredo no cliente; API usada sem autenticação | `js/config.js` | revisão |
| Zero dependências de runtime | `package.json` | sem `dependencies` |
| CI com permissões mínimas (`contents: read`) | `.github/workflows/ci.yml` | execução do workflow no GitHub Actions |

## Recomendações para o repositório (configurar no GitHub, por conta e risco do dono)
Autenticação em dois fatores (o GitHub exige até 01/12/2026); proteção do branch `main` (PR obrigatório, sem force-push); Secret scanning + Push protection; Dependabot para Actions; relatos privados de vulnerabilidade (veja `SECURITY.md`).

## Riscos residuais
- Quem controla os repositórios listados controla o texto exibido (mitigado: texto puro e tamanhos limitados).
- A API pública limita 60 requisições/hora por IP; há cache de sessão e lista local de fallback.
- `index.html` não tem CSP; recomenda-se aplicar a mesma política em uma próxima etapa.
- Actions de terceiros (`actions/*`) estão fixadas por tag, não por SHA.
- GitHub Pages não permite cabeçalhos HTTP próprios (HSTS, X-Frame-Options); a CSP via `<meta>` não suporta `frame-ancestors`.

## Menor privilégio
Nenhum token no front-end; workflow somente leitura; colaboradores com o menor papel necessário (Read, Triage ou Write).
