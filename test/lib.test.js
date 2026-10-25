import test from "node:test";
import assert from "node:assert/strict";
import { isValidUser, safeGithubUrl, safeLinkedinUrl, filterApiRepos, fromLocal, matches, uniqueTech } from "../js/lib.js";

test("isValidUser aceita nomes válidos e rejeita injeção", () => {
  assert.equal(isValidUser("octocat"), true);
  assert.equal(isValidUser("luiz-paiva"), true);
  for (const bad of ["", "-abc", "abc-", "a--b", "a/b", "a b", "<script>", "../x", "x".repeat(40), null, 5]) {
    assert.equal(isValidUser(bad), false, String(bad));
  }
});

test("safeGithubUrl só aceita https://github.com", () => {
  assert.ok(safeGithubUrl("https://github.com/octocat/hello"));
  for (const bad of ["javascript:alert(1)", "http://github.com/x", "https://evil.com/github.com", "https://github.com.evil.com/x", "https://user:pw@github.com/x", "data:text/html,x", "", undefined]) {
    assert.equal(safeGithubUrl(bad), null, String(bad));
  }
});

test("safeLinkedinUrl", () => {
  assert.ok(safeLinkedinUrl("https://www.linkedin.com/in/x/"));
  assert.equal(safeLinkedinUrl("https://linkedin.com.evil.io/in/x"), null);
  assert.equal(safeLinkedinUrl("javascript:1"), null);
});

test("filterApiRepos remove fork/arquivado e respeita tópico", () => {
  const api = [
    { name: "a", fork: false, archived: false, topics: ["portfoliohub", "esp32"], language: "C++", html_url: "https://github.com/u/a", description: "A" },
    { name: "b", fork: true, archived: false, topics: ["portfoliohub"], html_url: "https://github.com/u/b" },
    { name: "c", fork: false, archived: true, topics: ["portfoliohub"], html_url: "https://github.com/u/c" },
    { name: "d", fork: false, archived: false, topics: [], html_url: "https://github.com/u/d" },
    { name: "e", fork: false, archived: false, topics: ["portfoliohub"], html_url: "javascript:alert(1)" }
  ];
  const out = filterApiRepos(api, "portfoliohub");
  assert.deepEqual(out.map((p) => p.name), ["a", "e"]);
  assert.deepEqual(out[0].tech, ["C++", "esp32"]);
  assert.equal(out[1].url, null); // URL maliciosa descartada
  assert.equal(filterApiRepos(api, "").length, 3);
  assert.deepEqual(filterApiRepos("lixo", "x"), []);
});

test("fromLocal monta link só com usuário válido", () => {
  const data = [{ name: "N", repo: "meu-repo", description: "d", tech: ["x"] }];
  assert.equal(fromLocal(data, "")[0].url, null);
  assert.equal(fromLocal(data, "u1")[0].url, "https://github.com/u1/meu-repo");
  assert.equal(fromLocal([{ ...data[0], repo: "../../evil" }], "u1")[0].url, null);
  // url explícita só vale se for https://github.com
  assert.equal(fromLocal([{ ...data[0], url: "https://github.com/u/r/tree/main/x" }], "")[0].url, "https://github.com/u/r/tree/main/x");
  assert.equal(fromLocal([{ ...data[0], url: "javascript:alert(1)" }], "")[0].url, null);
});

test("busca e filtro", () => {
  const p = { name: "Cofre", description: "RFID", tech: ["ESP32"] };
  assert.equal(matches(p, "rfid", ""), true);
  assert.equal(matches(p, "", "Arduino"), false);
  assert.equal(matches(p, "<img onerror=1>", ""), false);
  assert.deepEqual(uniqueTech([p, { ...p, tech: ["ESP32", "C++"] }]), ["C++", "ESP32"]);
});
