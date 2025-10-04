/**
 * Repository Statistics Handler
 * Returns GitHub repository statistics as JSON
 */

export default async function repoStatsHandler({ req, env }) {
  try {
    const REPO_OWNER = 'akanshSirohi';
    const REPO_NAME = 'Github-Cards-API';

    // Try GitHub API first
    let stats = await fetchGitHubStats(REPO_OWNER, REPO_NAME);
    
    // Fallback to static data if GitHub API fails
    if (!stats) {
      stats = getStaticFallback();
    }

    return new Response(JSON.stringify(stats), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    console.error('Error in repo stats handler:', error);
    
    return new Response(JSON.stringify(getStaticFallback()), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60'
      }
    });
  }
}

// Fetch stats from GitHub API
async function fetchGitHubStats(owner, repo) {
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'User-Agent': 'Github-Cards-API',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!repoResponse.ok) {
      console.warn('GitHub API failed:', repoResponse.status);
      return null;
    }

    const repoData = await repoResponse.json();
    
    // Get contributors count (optional)
    let contributorsCount = 1;
    try {
      const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
        headers: {
          'User-Agent': 'Github-Cards-API',
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (contributorsResponse.ok) {
        const contributorsData = await contributorsResponse.json();
        contributorsCount = contributorsData.length;
      }
    } catch (e) {
      // Use default if contributors fetch fails
    }
    
    return {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      contributors: contributorsCount,
      updatedAt: repoData.updated_at,
      language: repoData.language,
      method: 'github_api'
    };

  } catch (error) {
    console.warn('GitHub API error:', error);
    return null;
  }
}

// Static fallback data
function getStaticFallback() {
  return {
    stars: 25, // Based on actual current count
    forks: 8,
    contributors: 3,
    updatedAt: new Date().toISOString(),
    language: 'JavaScript',
    method: 'static_fallback',
    note: 'GitHub API unavailable - using cached estimates'
  };
}