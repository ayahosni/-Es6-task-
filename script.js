/* let a = 5;
let b = 10;

[a, b] = [b, a];

console.log(a); 
console.log(b); 

///*********************************************************** */
/* function getMinMax(...arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    return { min, max };
}

const values = [3, 7, 2, 9, 4, 10];
const { min, max } = getMinMax(...values);

console.log(`Min: ${min}`); 
console.log(`Max: ${max}`); */  
//***************************************************************** */
document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.getElementById('tabs');
    const contentContainer = document.getElementById('content');

    function fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    const tab = document.createElement('div');
                    tab.className = 'tab';
                    tab.textContent = user.username;
                    tab.dataset.userId = user.id;
                    tab.addEventListener('click', () => fetchUserPosts(user.id));
                    tabsContainer.appendChild(tab);
                });
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    async function fetchUserPosts(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const posts = await response.json();

            contentContainer.innerHTML = '';

            posts.forEach(post => {
                const postTitle = document.createElement('div');
                postTitle.textContent = post.title;
                contentContainer.appendChild(postTitle);
            });

            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelector(`.tab[data-user-id="${userId}"]`).classList.add('active');
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    fetchUsers();
});









