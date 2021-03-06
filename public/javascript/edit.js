const idPost = document.querySelector('input[name="post-id"]').value;

async function editPost(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${idPost}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};

async function deletePost() {
  await fetch(`/api/post/${idPost}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document.querySelector('#edit-post-form').addEventListener('submit', editPost);
document.querySelector('#delete-btn').addEventListener('click', deletePost);
