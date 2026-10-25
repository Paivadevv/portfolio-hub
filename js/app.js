import { CONFIG } from "./config.js";
import { isValidUser, filterApiRepos, fromLocal, matches, uniqueTech } from "./lib.js";

const $ = (id) => document.getElementById(id);
const state = { projects: [], tech: "", query: "" };

// Todo conteúdo externo entra no DOM via textContent (nunca innerHTML) para evitar XSS.
function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text != null) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}

function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    return Date.now() - t < CONFIG.cacheMinutes * 60000 ? v : null;
  } catch { return null; }
}
function cacheSet(key, v) {
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch { /* sem cache */ }
}

async function loadLocal() {
  const res = await fetch("data/projects.json", { cache: "no-cache" });
  if (!res.ok) throw new Error("projects.json HTTP " + res.status);
  return fromLocal(await res.json(), CONFIG.githubUser);
}

async function loadFromGithub() {
  const key = "phub:" + CONFIG.githubUser;
  const cached = cacheGet(key);
  if (cached) return cached;
  const url = `https://api.github.com/users/${encodeURIComponent(CONFIG.githubUser)}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error("GitHub API HTTP " + res.status);
  const projects = filterApiRepos(await res.json(), CONFIG.topic);
  cacheSet(key, projects);
  return projects;
}

async function loadProjects() {
  const status = $("status");
  if (isValidUser(CONFIG.githubUser)) {
    try {
      const list = await loadFromGithub();
      if (list.length) { status.textContent = "Dados lidos da API pública do GitHub (" + list.length + " repositórios)."; return list; }
      status.textContent = "Nenhum repositório encontrado na API; exibindo a lista local.";
    } catch (e) {
      status.textContent = "Não foi possível ler a API do GitHub agora; exibindo a lista local.";
      status.className = "aviso";
    }
  } else {
    status.textContent = "Modo local: informe githubUser em js/config.js para sincronizar com o GitHub.";
  }
  return loadLocal();
}

function renderFilters() {
  const box = $("filters");
  box.replaceChildren();
  for (const t of ["", ...uniqueTech(state.projects)]) {
    const b = el("button", t || "Todos");
    b.type = "button";
    b.setAttribute("aria-pressed", String(state.tech === t));
    b.addEventListener("click", () => { state.tech = t; renderFilters(); renderGrid(); });
    box.append(b);
  }
}

function renderGrid() {
  const grid = $("grid");
  grid.replaceChildren();
  const shown = state.projects.filter((p) => matches(p, state.query, state.tech));
  for (const p of shown) {
    const card = el("article", null, "card");
    const tags = el("div", null, "tags");
    for (const t of p.tech) tags.append(el("span", t, "tag"));
    card.append(tags, el("h4", p.name), el("p", p.description));
    if (p.url) {
      const a = el("a", "Ver no GitHub →");
      a.href = p.url;
      a.rel = "noopener noreferrer";
      a.target = "_blank";
      card.append(a);
    } else {
      card.append(el("p", "Repositório ainda não vinculado", "semlink"));
    }
    grid.append(card);
  }
  if (!shown.length) grid.append(el("p", "Nenhum projeto encontrado para esse filtro."));
}

async function main() {
  $("q").addEventListener("input", (e) => { state.query = e.target.value.slice(0, 60); renderGrid(); });
  try {
    state.projects = await loadProjects();
    renderFilters();
    renderGrid();
  } catch (e) {
    $("status").textContent = "Erro ao carregar projetos. Tente novamente mais tarde.";
    $("status").className = "aviso";
  }
}
main();
