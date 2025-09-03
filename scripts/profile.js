document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('edit-profile-btn');
    const formInputs = document.querySelectorAll('#profile-form input');
    editBtn.addEventListener('click', () => {
        if (editBtn.innerText.includes('Edit')) {
            editBtn.innerHTML = '<i class="fa-solid fa-save me-2"></i> Save Profile';
            formInputs.forEach(input => {
                input.disabled = false;
            });
        } else {
            editBtn.innerHTML = '<i class="fa-solid fa-pencil me-2"></i> Edit Profile';
            formInputs.forEach(input => {
                input.disabled = true;
            });
            console.log('Profile saved!');
        }
    });
});