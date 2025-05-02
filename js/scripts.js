/**
 * Taste of Levant - Middle Eastern Food Website
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    setupMobileNavigation();
    
    // Form validation
    setupFormValidation();
    
    // Recipe category filters
    setupRecipeFilters();
    
    // FAQ toggles
    setupFaqToggles();
    
    // Password toggles
    setupPasswordToggles();
});

/**
 * Sets up the mobile navigation menu
 */
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('show');
        document.body.classList.toggle('nav-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('show') && 
            !navLinks.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.classList.remove('nav-open');
        }
    });
}

/**
 * Sets up recipe category filtering functionality
 */
function setupRecipeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeItems = document.querySelectorAll('.recipe-item');
    
    if (filterButtons.length === 0 || recipeItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Show/hide recipe items based on filter
            recipeItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Sets up FAQ accordion functionality
 */
function setupFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on current item
            item.classList.toggle('active');
            
            // Update the icon
            const icon = question.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

/**
 * Sets up password visibility toggles
 */
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    if (toggleButtons.length === 0) return;
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const passwordField = button.previousElementSibling;
            const icon = button.querySelector('i');
            
            // Toggle password visibility
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

/**
 * Sets up form validation for contact and registration forms
 */
function setupFormValidation() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation logic would go here
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Check for empty fields
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                clearError(subject);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                clearError(message);
            }
            
            // If valid, show success message
            if (isValid) {
                contactForm.style.display = 'none';
                const successMessage = document.getElementById('form-success');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        // Check password strength as user types
        const password = document.getElementById('password');
        if (password) {
            password.addEventListener('input', checkPasswordStrength);
        }
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation logic would go here
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const termsAgree = document.getElementById('termsAgree');
            
            let isValid = true;
            
            // Check for empty fields
            if (!fullName.value.trim()) {
                showError(fullName, 'Full name is required');
                isValid = false;
            } else {
                clearError(fullName);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (!isStrongPassword(password.value)) {
                showError(password, 'Please create a stronger password');
                isValid = false;
            } else {
                clearError(password);
            }
            
            if (!confirmPassword.value) {
                showError(confirmPassword, 'Please confirm your password');
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            } else {
                clearError(confirmPassword);
            }
            
            if (!termsAgree.checked) {
                showError(termsAgree, 'You must agree to the terms');
                isValid = false;
            } else {
                clearError(termsAgree);
            }
            
            // If valid, form would submit (in a real application)
            if (isValid) {
                // For demo purposes, we'll just console log a success message
                console.log('Form submitted successfully');
                signupForm.reset();
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation logic would go here
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            
            let isValid = true;
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            } else {
                clearError(password);
            }
            
            // If valid, form would submit (in a real application)
            if (isValid) {
                // For demo purposes, we'll just console log a success message
                console.log('Login form submitted');
            }
        });
    }
    
    // Course registration form
    const courseForm = document.getElementById('course-registration');
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation logic would go here
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const courseDate = document.getElementById('courseDate');
            
            let isValid = true;
            
            // Check for empty fields
            if (!fullName.value.trim()) {
                showError(fullName, 'Full name is required');
                isValid = false;
            } else {
                clearError(fullName);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(email);
            }
            
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else {
                clearError(phone);
            }
            
            if (!courseDate.value) {
                showError(courseDate, 'Please select a course date');
                isValid = false;
            } else {
                clearError(courseDate);
            }
            
            // If valid, form would submit (in a real application)
            if (isValid) {
                // For demo purposes, we'll just alert a success message
                alert('Course registration submitted successfully! We will contact you soon to confirm your booking.');
                courseForm.reset();
            }
        });
    }
}

/**
 * Shows error message for a form field
 */
function showError(input, message) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    input.classList.add('error');
}

/**
 * Clears error message for a form field
 */
function clearError(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    input.classList.remove('error');
}

/**
 * Validates email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Checks if a password meets strength requirements
 */
function isStrongPassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password);
}

/**
 * Updates the password strength indicators
 */
function checkPasswordStrength() {
    const password = document.getElementById('password');
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const numberCheck = document.getElementById('number-check');
    
    if (!password || !lengthCheck || !uppercaseCheck || !numberCheck) return;
    
    // Check length
    if (password.value.length >= 8) {
        lengthCheck.classList.add('valid');
    } else {
        lengthCheck.classList.remove('valid');
    }
    
    // Check for uppercase
    if (/[A-Z]/.test(password.value)) {
        uppercaseCheck.classList.add('valid');
    } else {
        uppercaseCheck.classList.remove('valid');
    }
    
    // Check for number
    if (/[0-9]/.test(password.value)) {
        numberCheck.classList.add('valid');
    } else {
        numberCheck.classList.remove('valid');
    }
} 