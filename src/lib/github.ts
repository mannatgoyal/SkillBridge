import { Octokit } from "octokit";

// Initialize Octokit
// Note: In a real app, you'd handle token exchange on the server side to keep the secret safe.
// For this demo, we might use a simplified flow or server actions.

export const getGithubUser = async (accessToken: string) => {
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.rest.users.getAuthenticated();
    return data;
};

export const getUserRepos = async (accessToken: string) => {
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 10,
    });
    return data;
};

export const getRepoLanguages = async (accessToken: string, owner: string, repo: string) => {
    const octokit = new Octokit({ auth: accessToken });
    const { data } = await octokit.rest.repos.listLanguages({
        owner,
        repo,
    });
    return data;
};
