const postId = document.querySelector('input[name="post-id"]').value;

const newPost = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value
    const body = document.querySelector('input[name="post-body"]').value

    const response = await fetch('/api/post', {
        method: 'post',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

const editPostForm = async function(event) {
    event.preventDefault()

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('input[name="post-body"]').value.trim();

    const response = await fetch(`/api/post/${postId}`, {
        method: 'put',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    document.location.replace('/dashboard')
}

const deletePostForm = async function(event) {
    event.preventDefault();

    await fetch(`/api/post/${postId}`, {
        method:'delete',
    });
    document.location.replace('/dashboard')
}

document.querySelector('.new-post').addEventListener('submit', newPost)
document.querySelector('#edit-post').addEventListener('click', editPostForm)
document.querySelector('#delete-btn').addEventListener('click', deletePostForm)