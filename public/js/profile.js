const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blogpost-title').value.trim();
  const content = document.querySelector('#blogpost-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogposts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

const editButtonHandler = async (event) => {
  event.preventDefault();

  // Collect blog post details
  const title = document.querySelector('#edit-blogpost-title').value.trim();
  const content = document.querySelector('#edit-blogpost-content').value.trim();

  // Fill in edit form fields
  document.querySelector('.edit-blog-post-form').style.display = 'block';
  document.querySelector('#edit-blogpost-title').value = title;
  document.querySelector('#edit-blogpost-content').value = content;

  // Hide other elements
  document.querySelector('.new-blog-post-form').style.display = 'none';
  document.querySelector('.blogpost-list').style.display = 'none';
};

// Cancel edit button handler
const cancelEditButtonHandler = async (event) => {
  event.preventDefault();

  // Hide edit form and show other elements
  document.querySelector('.edit-blog-post-form').style.display = 'none';
  document.querySelector('.new-blog-post-form').style.display = 'block';
  document.querySelector('.blogpost-list').style.display = 'block';
};

// Edit blog post form submit handler
const editSubmitHandler = async (event) => {
  event.preventDefault();

  // Collect form values
  const title = document.querySelector('#edit-blogpost-title').value.trim();
  const content = document.querySelector('#edit-blogpost-content').value.trim();

  // Collect blog post ID from URL
  const pathName = window.location.pathname;
  const pathParts = pathName.split('/');
  const id = pathParts[pathParts.length - 1];

  // PUT request to update the blog post
  if (id && title && content) {
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If response ok, reload the page to reflect changes
    if (response.ok) {
      alert('Blog post updated successfully');
      document.location.reload();
    } else {
      console.error('Failed to update blog post');
      alert('Unable to update blog post');
    }
  }
};


document
  .querySelector('.new-blog-post-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('.blogpost-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-danger')) {
    // Handle delete button click
    delButtonHandler(event);
  } else if (event.target.classList.contains('edit-btn')) {
    // Handle edit button click
    editButtonHandler(event);
  }
});

  // document
//   .querySelector('.blogpost-list')
//   .addEventListener('click', delButtonHandler);

// document
//   .querySelector('.btn btn-sm btn-primary edit-btn')
//   .addEventListener('click', editButtonHandler);

document
  .querySelector('.cancel-edit-btn')
  .addEventListener('click', cancelEditButtonHandler);

document
  .querySelector('.edit-blog-post-form')
  .addEventListener('submit', editSubmitHandler);