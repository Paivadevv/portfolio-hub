# Uso do Google Gemini no projeto

**Status:** os prompts P1, P3 e P4 foram executados no Gemini (conta do autor, modelo exibido como "Gemini Pro") em 25/10/2026, e as respostas foram avaliadas criticamente antes de qualquer decisão. Os prompts P2, P5 e P6 **não** foram executados. O código da vitrine foi escrito antes das consultas, com apoio de outro assistente de IA; o Gemini serviu para planejar e revisar, e nenhum código do Gemini foi aplicado.

Regra: a IA sugere, o autor verifica. Toda sugestão é testada ou confrontada com o código antes de ser aplicada.

## Prompts
**P1 – Planejamento.** Sou estudante de Engenharia de Computação. Preciso evoluir meu portfólio estático (HTML/CSS) no GitHub Pages para listar meus repositórios pela API pública do GitHub, sem back-end. Crie um plano em etapas, com riscos, testes e entregáveis, para um dia de trabalho.

**P2 – Desenvolvimento (não executado).** Revise esta função JavaScript que valida URLs do GitHub e sugira casos de teste de borda.

**P3 – Segurança.** Atue como revisor de segurança de aplicações web. Analise trechos de vitrine.html, js/app.js e js/lib.js (CSP, textContent, safeGithubUrl, fetch da API). Liste achados por severidade, com correção.

**P4 – Configuração do GitHub.** Liste as configurações de segurança recomendadas para um repositório público pessoal que publica no GitHub Pages (2FA, proteção de branch, secret scanning, Dependabot, permissões do Actions), em checklist.

**P5 – Revisão do CI (não executado)** e **P6 – Fala da apresentação (não executado).**

## Registro das respostas e decisões (25/10/2026)
| Prompt | Resumo da resposta do Gemini | Decisão | Justificativa |
|---|---|---|---|
| P1 | Plano em 4 etapas: fetch da API, renderização com createElement, tratamento de erros (rate limit de 60 req/h, try/catch, indicador de carregamento) e testes com DevTools (offline, Slow 3G) e deploy. | **Aceito** (já alinhado), com **ajuste** | A implementação já segue o plano (fetch, DOM seguro, fallback local, cache). Em vez de testar offline manualmente, foram usados testes automatizados com falha HTTP 403 simulada. |
| P3 | Sem achados de severidade alta ou média; elogiou a CSP e o uso de textContent. Dois achados baixos: (1) safeGithubUrl "ignorada" em renderGrid e sugestão de usar html_url; (2) rate limit sem tratamento, sugerindo usar o cache de sessão como fallback. | (1) **Rejeitado**; (2) **Parcialmente aceito** | (1) Falso positivo causado pelo trecho parcial enviado: a URL já é validada na normalização (`fromApiRepo` usa `safeGithubUrl(r.html_url)`, coberto por teste unitário). Reaplicar no ponto de uso seria defesa em profundidade e fica como melhoria. (2) `loadProjects` já captura o erro e cai para a lista local; usar o cache expirado antes da lista local é uma melhoria futura. |
| P4 | Checklist de 10 itens: 2FA, proteção do main, secret scanning, push protection, Dependabot (alertas e atualizações), permissão padrão do Actions somente leitura, permissões mínimas no workflow, fixar Actions por SHA, proteger o environment github-pages. | **Aceito como checklist** | O CI já usa `contents: read`. Pendentes de ação do dono: 2FA, proteção do main, secret scanning/push protection, Dependabot e fixação por SHA. A sugestão `pages: write`/`id-token: write` não se aplica ao CI atual, pois o Pages usa o workflow nativo. |

Capturas das conversas: `evidencias/` do pacote de entrega.

## Como validar respostas de IA
Compare com a documentação oficial (docs.github.com, developer.mozilla.org), confronte o achado com o código completo, rode `npm test` e só aplique o que entender.
