const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();

    if (content) {
        try {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to add comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    }
};

const delCommentHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        try {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', newCommentHandler);

document
    .querySelector('.comment-list')
    .addEventListener('click', delCommentHandler);