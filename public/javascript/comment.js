async function commentCreate(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim()

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', commentCreate)