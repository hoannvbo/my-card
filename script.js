// Image Upload Handler
document.addEventListener('DOMContentLoaded', function () {
    const profileLogo = document.getElementById('profile-logo');
    const imageInput = document.getElementById('image-input');

    // Trigger file input when logo is clicked
    profileLogo.addEventListener('click', function () {
        imageInput.click();
    });

    // Handle file selection
    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }

            // Read the file and display it
            const reader = new FileReader();

            reader.onload = function (e) {
                // Remove previous image if exists
                const existingImg = profileLogo.querySelector('img');
                if (existingImg) {
                    existingImg.remove();
                }

                // Remove the logo-circle text
                const logoCircle = profileLogo.querySelector('.logo-circle');
                if (logoCircle) {
                    logoCircle.style.display = 'none';
                }

                // Create and add new image
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Profile Image';
                profileLogo.appendChild(img);

                // Save to localStorage
                localStorage.setItem('profileImage', e.target.result);
            };

            reader.readAsDataURL(file);
        }
    });

    // Load image from localStorage if it exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        const existingImg = profileLogo.querySelector('img');
        if (existingImg) {
            existingImg.remove();
        }

        const logoCircle = profileLogo.querySelector('.logo-circle');
        if (logoCircle) {
            logoCircle.style.display = 'none';
        }

        const img = document.createElement('img');
        img.src = savedImage;
        img.alt = 'Profile Image';
        profileLogo.appendChild(img);
    }

    // Add keyboard accessibility
    profileLogo.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            imageInput.click();
        }
    });

    // Update upload hint text
    profileLogo.setAttribute('role', 'button');
    profileLogo.setAttribute('tabindex', '0');
});
