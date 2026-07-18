import type { DetectedState, Provider, Recipe } from "./types";

export function providerSupportsLatestVersion(provider: Provider): boolean {
  switch (provider.kind) {
    case "winget":
    case "chocolatey":
    case "uvPip":
    case "githubRelease":
      return true;
    case "npm":
      return !provider.pkg.startsWith("github:");
    case "bundle":
      return provider.steps.length === 1;
    case "downloadInstaller":
    case "windowsFeature":
    case "wslDistro":
      return false;
  }
}

export function recipeSupportsLatestVersion(recipe: Recipe): boolean {
  if (
    recipe.provider.kind === "npm" &&
    recipe.provider.pkg.startsWith("github:")
  ) {
    return githubReleasesRepoFromUrl(recipe.releaseNotesUrl) !== null;
  }
  return providerSupportsLatestVersion(recipe.provider);
}

export function recipeSupportsManagedLatestVersion(
  recipe: Recipe,
  detected?: DetectedState | null,
): boolean {
  // The catalog's latest version is actionable only through its provider.
  // A receipt-backed standalone uv copy is real, but sending its update or
  // uninstall through WinGet would target a different installation channel.
  return (
    detected?.installSource !== "officialScript" &&
    recipeSupportsLatestVersion(recipe)
  );
}

export function latestVersionWebUrlForRecipe(recipe: Recipe): string | null {
  if (recipeSupportsLatestVersion(recipe)) return null;
  if (recipe.provider.kind === "downloadInstaller") {
    return recipe.provider.url;
  }
  return null;
}

function githubReleasesRepoFromUrl(url?: string): string | null {
  const match = url?.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/releases(?:\/|$)/,
  );
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}
