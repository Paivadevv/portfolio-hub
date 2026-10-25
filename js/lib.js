// Funções puras (sem DOM) para poderem ser testadas em Node.

const USER_RE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i; // regra de nomes de usuário do GitHub
const REPO_RE = /^[\w.-]{1,100}$/;

export function isValidUser(u) {
  return typeof u === "string" && USER_RE.test(u);
}

/** Aceita apenas URLs https://github.com/... ; qualquer outra coisa vira null. */
export function safeGithubUrl(value) {
  try {
    const u = new URL(String(value));
    if (u.protocol !== "https:" || u.hostname !== "github.com" || u.username || u.password) return null;
    return u.href;
  } catch {
    return null;
  }
}

export function safeLinkedinUrl(value) {
  try {
    const u = new URL(String(value));
    if (u.protocol !== "https:" || !/(^|\.)linkedin\.com$/.test(u.hostname)) return null;
    return u.href;
  } catch {
    return null;
  }
}

const clip = (s, n) => String(s ?? "").slice(0, n);

/** Normaliza um item vindo da API do GitHub. */
export function fromApiRepo(r) {
  const tech = [];
  if (r.language) tech.push(clip(r.language, 30));
  for (const t of Array.isArray(r.topics) ? r.topics : []) {
    if (t !== "portfoliohub" && tech.length < 6) tech.push(clip(t, 30));
  }
  return {
    name: clip(r.name, 100),
    description: clip(r.description || "Sem descrição cadastrada no GitHub.", 300),
    tech,
    url: safeGithubUrl(r.html_url)
  };
}

/** Filtra repositórios da API: sem forks, sem arquivados e (opcional) com o tópico. */
export function filterApiRepos(list, topic) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((r) => r && !r.fork && !r.archived && (!topic || (r.topics || []).includes(topic)))
    .map(fromApiRepo);
}

/** Normaliza o JSON local; monta o link a partir do usuário + nome do repositório. */
export function fromLocal(list, user) {
  if (!Array.isArray(list)) return [];
  return list.map((p) => ({
    name: clip(p.name, 100),
    description: clip(p.description, 300),
    tech: (Array.isArray(p.tech) ? p.tech : []).slice(0, 6).map((t) => clip(t, 30)),
    url: safeGithubUrl(p.url) || (isValidUser(user) && REPO_RE.test(p.repo || "")
      ? safeGithubUrl(`https://github.com/${user}/${p.repo}`)
      : null)
  }));
}

export function matches(project, query, tech) {
  const q = String(query || "").trim().toLowerCase();
  if (tech && !project.tech.includes(tech)) return false;
  if (!q) return true;
  return [project.name, project.description, ...project.tech].join(" ").toLowerCase().includes(q);
}

export function uniqueTech(projects) {
  return [...new Set(projects.flatMap((p) => p.tech))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}
