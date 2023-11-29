const exampleModal = document.getElementById('delete-step-modal')
if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {

        const button = event.relatedTarget

        const id = button.getAttribute('data-bs-id')

        const form = exampleModal.querySelector('form')
        const action = form.getAttribute('action')

        form.setAttribute('action', action + "/" + id)
    })
}