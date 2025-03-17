document.getElementById('generateEmail').addEventListener('click', async () => {
    const email = generateEmail();
    document.getElementById('emailAddress').value = email;
    checkEmails(email);
});

function generateEmail() {
    const random = Math.random().toString(36).substring(2, 10);
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com']; // Use real domains
    return `${random}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

async function checkEmails(email) {
    const emailList = document.getElementById('emailList');
    emailList.innerHTML = '<div class="email-item">⏳ Loading emails...</div>';

    try {
        // Use SnapMail API (no CORS issues)
        const response = await fetch(`https://snapmail.cc/emailList/${email}`);
        const emails = await response.json();
        
        emailList.innerHTML = emails.length > 0 
            ? emails.map(email => `
                <div class="email-item">
                    <strong>From:</strong> ${email.from}<br>
                    <strong>Subject:</strong> ${email.subject}<br>
                    <strong>Content:</strong> ${email.html || 'No content'}
                </div>
            `).join('')
            : '<div class="email-item">📭 No emails found</div>';
    } catch (error) {
        emailList.innerHTML = `
            <div class="email-item">
                ❌ Error: ${error.message || 'API limit reached. Try later.'}
            </div>
        `;
    }
}

document.getElementById('currentYear').textContent = new Date().getFullYear();