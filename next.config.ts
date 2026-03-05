import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositorySlug = process.env.GITHUB_REPOSITORY ?? "";
const repositoryNameFromSlug = repositorySlug.split("/")[1];
const repositoryName = repositoryNameFromSlug || "keppeki_sinkan2026";
const isOrgSiteRepository = repositoryName.endsWith(".github.io");
const githubPagesBasePath = isOrgSiteRepository ? "" : `/${repositoryName}`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? githubPagesBasePath : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? githubPagesBasePath : "",
  },
};

export default nextConfig;
