document.addEventListener('DOMContentLoaded', async () => {
    const repoList = document.getElementById('repo-list');
    const avatar = document.getElementById('avatar');

    const username = 'krxnkos';
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    try {
        // Fetch user information
        const userResponse = await fetch(userUrl);
        const userData = await userResponse.json();
        avatar.src = userData.avatar_url;

        // Fetch repository information
        const reposResponse = await fetch(reposUrl);
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
            repoList.appendChild(repoItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

document.addEventListener('scroll', () => {

    console.log(scrollY)

    if (scrollY > 60) {

        document.getElementById('navigation').classList.add('active');

    } else {

        document.getElementById('navigation').classList.remove('active');

    }

    

})