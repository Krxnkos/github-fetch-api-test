class UserProfile {
    constructor(userUrl, reposUrl, avatarElement, repoListElement, readmeElement) {
        this.userUrl = userUrl;
        this.reposUrl = reposUrl;
        this.avatar = avatarElement;
        this.repoList = repoListElement;
        this.readme = readmeElement;

        this.init();
    }

    async init() {
        try {
            const userResponse = await fetch(this.userUrl);
            const userData = await userResponse.json();
            this.avatar.src = userData.avatar_url;

            // Fetch repository information
            const reposResponse = await fetch(this.reposUrl);
            const reposData = await reposResponse.json();
            reposData.forEach(repo => {
                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');
                repoItem.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                    <iframe src="${repo.html_url}" width="100%" height="200"></iframe>
                `;
                this.repoList.appendChild(repoItem);
            });

            // Fetch README file
            const readmeResponse = await fetch(`https://api.github.com/repos/krxnkos/krxnkos/readme`, {
                headers: { 'Accept': 'application/vnd.github.v3.raw' }
            });
            const readmeText = await readmeResponse.text();
            this.readme.innerHTML = marked(readmeText); // Convert Markdown to HTML using marked.js
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
    const readmeElement = document.getElementById('readme');

    new UserProfile(userUrl, reposUrl, avatarElement, repoListElement, readmeElement);
});

document.addEventListener('scroll', () => {
    console.log(scrollY);

    if (scrollY > 60) {
        document.getElementById('navigation').classList.add('active');
    } else {
        document.getElementById('navigation').classList.remove('active');
    }
});