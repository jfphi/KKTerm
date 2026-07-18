import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function importTypeScriptModule(path) {
  const source = await readFile(path, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2020,
      target: ts.ScriptTarget.ES2020,
      verbatimModuleSyntax: true,
    },
  });
  return import(
    `data:text/javascript;charset=utf-8,${encodeURIComponent(transpiled.outputText)}`
  );
}

test("official-script provenance stays separate from management providers", async () => {
  const { isOfficialScriptInstall } = await importTypeScriptModule(
    new URL("../src/modules/installer/types.ts", import.meta.url),
  );

  assert.equal(isOfficialScriptInstall({ installSource: "officialScript" }), true);
  assert.equal(isOfficialScriptInstall({ installProvider: "winget" }), false);
});

test("official-script installs hide destructive WinGet management actions", async () => {
  const dialogSource = await readFile(
    new URL("../src/modules/installer/InstallerToolDialog.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    dialogSource,
    /supportsLatestVersion = recipeSupportsManagedLatestVersion\(\s*recipe,\s*detected,/,
    "latest checks and updates should use provenance-aware support",
  );
  assert.match(
    dialogSource,
    /!officialScript \? \(\s*<button[\s\S]*installer\.actions\.uninstall/,
    "uninstall must not route a standalone copy through the WinGet recipe",
  );
});

test("backend independently blocks catalog management for standalone uv", async () => {
  const [installSource, uninstallSource, latestSource] = await Promise.all([
    readFile(
      new URL("../src-tauri/src/installer/install.rs", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src-tauri/src/installer/uninstall.rs", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src-tauri/src/installer/latest_version.rs", import.meta.url),
      "utf8",
    ),
  ]);

  for (const source of [installSource, uninstallSource]) {
    assert.match(
      source,
      /recipe\.id == "uv" && detect_one\(recipe\)\.is_official_script_install\(\)/,
    );
  }
  assert.match(
    latestSource,
    /child\.id == "uv" && detect_one\(child\)\.is_official_script_install\(\)[\s\S]*return Ok\(None\)/,
    "direct backend latest checks must not cache WinGet metadata for the standalone Python bundle",
  );
});
