// Example badge helper functions
// Replace with your actual data fetching logic

export const getBadgeCounts = () => {
    // This could fetch from your store, API, or context
    return {
        repositories: 12,
        pullRequests: 3,
        issues: 7,
        security: 2
    }
}

// Individual badge getters
export const getRepositoriesCount = () => getBadgeCounts().repositories
export const getPullRequestsCount = () => getBadgeCounts().pullRequests
export const getIssuesCount = () => getBadgeCounts().issues
export const getSecurityCount = () => getBadgeCounts().security
