import { http } from './http'
import { ui } from './ui'

// Get posts on dom loaded
document.addEventListener('DOMContentLoaded', getPosts)

document.querySelector('.post-submit').addEventListener('click', submitPost)

document.querySelector('#posts').addEventListener('click', enableEdit)

document.querySelector('.card-form').addEventListener('click', cancelEdit)

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err))
}

//submit post
function submitPost() {
    const title = document.querySelector('#title').value
    const body = document.querySelector('#body').value
    const id = document.querySelector('#id').value

    const data = {
        title,
        body
    }

    if(title === '' || body === '') {
        ui.showAlert('Please fill in all fields', 'alert alert-danger')
    } else {
        if (id === '') {

            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Post added', 'alert alert-success')
                    ui.clearFields()
                    getPosts()
                })
                .catch(err => console.log(err))
        } else {
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post updated', 'alert alert-success')
                    ui.changeFormState('add')
                    getPosts()
                })
                .catch(err => console.log(err))
        }

    }

}

function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id
        const body = e.target.parentElement.previousElementSibling.textContent
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent

        const data = {
            id,
            title,
            body
        }

        ui.fillForm(data)
    }
    e.preventDefault();
    
}

function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add')
    }

    e.preventDefault()
}