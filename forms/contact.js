// Load EmailJS library dynamically
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
script.onload = () => {
    emailjs.init("LmxG_ztt4lT6cCZsJ"); // Your actual EmailJS Public Key
};
document.head.appendChild(script);

// Wait for DOM to load before attaching event listener
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form refresh

        const thisForm = this;
        thisForm.querySelector('.loading').style.display = "block";
        thisForm.querySelector('.error-message').style.display = "none";
        thisForm.querySelector('.sent-message').style.display = "none";

        const formData = {
            from_name: document.querySelector('input[name="name"]').value,
            from_email: document.querySelector('input[name="email"]').value,
            reply_to: document.querySelector('input[name="email"]').value,
            subject: document.querySelector('input[name="subject"]').value,
            message: document.querySelector('textarea[name="message"]').value
        };

        // Basic validation (check if fields are not empty)
        if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
            thisForm.querySelector('.loading').style.display = "none";
            thisForm.querySelector('.error-message').textContent = "Please fill in all the fields.";
            thisForm.querySelector('.error-message').style.display = "block";
            return;
        }

        // Send email using EmailJS
        emailjs.send("service_0t3lo5u", "template_rd9k70d", formData)
            .then(function (response) {
                thisForm.querySelector('.loading').style.display = "none";
                thisForm.querySelector('.sent-message').style.display = "block";
                thisForm.reset(); // Reset the form on success
            }, function (error) {
                thisForm.querySelector('.loading').style.display = "none";
                thisForm.querySelector('.error-message').textContent = "Failed to send message. Please try again.";
                thisForm.querySelector('.error-message').style.display = "block";
                console.error("EmailJS Error:", error);
            });
    });
});
