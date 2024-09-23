/**
 * Class representing a GitHub user profile.
 */
class UserProfile {
    /**
     * Create a user profile.
     * @param {string} userUrl - The URL to fetch user data.
     * @param {string} reposUrl - The URL to fetch repositories data.
     * @param {HTMLElement} avatarElement - The element to display the user's avatar.
     * @param {HTMLElement} repoListElement - The element to display the list of repositories.
     * @param {HTMLElement} displayNameElement - The element to display the user's display name.
     * @param {HTMLElement} followersCountElement - The element to display the user's followers count.
     */
    constructor(userUrl, reposUrl, avatarElement, repoListElement, displayNameElement, followersCountElement) {
        this.userUrl = userUrl;
        this.reposUrl = reposUrl;
        this.avatarElement = avatarElement;
        this.repoListElement = repoListElement;
        this.displayNameElement = displayNameElement;
        this.followersCountElement = followersCountElement;
        
        this.init();
    }

    /**
     * Initialize the user profile by fetching and displaying user and repository data.
     */
    async init() {
        try {
            // Fetch user information
            const userResponse = await fetch(this.userUrl);
            const userData = await userResponse.json();
            this.avatarElement.src = userData.avatar_url;
            this.displayNameElement.textContent = userData.name || 'GitHub User';
            this.followersCountElement.textContent = `Followers: ${userData.followers}`;

            // Fetch repository information
            const reposResponse = await fetch(this.reposUrl);
            const reposData = await reposResponse.json();
            reposData.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');
                repoItem.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || 'No description available'}</p>
                    <p>⭐ Stars: ${repo.stargazers_count}</p>
                    <p>🖥️ Language: ${repo.language || 'Not specified'}</p>
                    <br>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                this.repoListElement.appendChild(repoItem);
            });
        
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const userUrl = 'https://api.github.com/users/krxnkos';
    const reposUrl = 'https://api.github.com/users/krxnkos/repos';
    const avatarElement = document.getElementById('avatar');
    const repoListElement = document.getElementById('repo-list');
    const displayNameElement = document.getElementById('display-name');
    const followersCountElement = document.getElementById('followers-count');

    new UserProfile(userUrl, reposUrl, avatarElement, repoListElement, displayNameElement, followersCountElement);
});