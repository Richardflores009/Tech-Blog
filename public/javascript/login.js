const signupBlog = async function(event) {
    event.preventDefault();

    const username = document.querySelector('#usernameInfo').value.trim();
    const password = document.querySelector('#passwordInfo').value.trim()

    if (username && password) {
        const response = await fetch('api/user', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            console.log('success')
        } else {
            alert(response.statusText)
        }
    }
}

const loginBlog = async function(event) {
    event.preventDefault()

    const username = document.querySelector('#usernameInfo').value.trim();
    const password = document.querySelector('#passwordInfo').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
} 

document.querySelector('.login-form').addEventListener('submit', loginBlog);
document.querySelector('.signup-form').addEventListener('submit', signupBlog);