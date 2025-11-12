// DOM Elements
const form = document.getElementById('signatureForm');
const preview = document.getElementById('signaturePreview');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const profilePreview = document.getElementById('profilePreview');
const profilePicInput = document.getElementById('profilePic');
const showAddressCheckbox = document.getElementById('showAddress');
const addressSection = document.getElementById('addressSection');

// Social media icons
const socialIcons = {
    linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/linkedin.svg',
    twitter: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/twitter.svg',
    facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/facebook.svg',
    instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/instagram.svg'
};

// Initialize
updateSignature();

// Event listeners
form.addEventListener('input', updateSignature);
profilePicInput.addEventListener('input', updateProfilePic);
copyBtn.addEventListener('click', copySignature);
downloadBtn.addEventListener('click', downloadSignature);
showAddressCheckbox.addEventListener('change', toggleAddressSection);

// Toggle address section visibility
function toggleAddressSection() {
    if (showAddressCheckbox.checked) {
        addressSection.classList.remove('hidden');
    } else {
        addressSection.classList.add('hidden');
    }
    updateSignature(); // Update preview when toggling
}

// Update profile picture preview
function updateProfilePic() {
    const url = profilePicInput.value;
    if (url) {
        profilePreview.src = url;
        profilePreview.onerror = () => {
            profilePreview.src = 'https://picsum.photos/seed/avatar/100/100.jpg';
        };
    }
}

// Update signature preview
function updateSignature() {
    const data = getFormData();
    const html = generateSignatureHTML(data);
    preview.innerHTML = html;
    
    // Update CSS variables for styling
    preview.style.setProperty('--font-family', data.fontFamily);
    preview.style.setProperty('--font-size', data.fontSize);
    preview.style.setProperty('--text-color', data.textColor);
    preview.style.setProperty('--bg-color', data.bgColor);
    preview.style.setProperty('--border-style', data.borderStyle);
    preview.style.setProperty('--border-radius', data.borderRadius);
}

// Get form data
function getFormData() {
    return {
        fullName: document.getElementById('fullName').value || 'John Doe',
        jobTitle: document.getElementById('jobTitle').value || 'Software Engineer',
        company: document.getElementById('company').value || 'Tech Corp',
        email: document.getElementById('email').value || 'john@example.com',
        phone: document.getElementById('phone').value || '+1 (555) 123-4567',
        website: document.getElementById('website').value || 'www.example.com',
        streetAddress: document.getElementById('streetAddress').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pinCode: document.getElementById('pinCode').value,
        country: document.getElementById('country').value,
        profilePic: document.getElementById('profilePic').value || 'https://picsum.photos/seed/avatar/100/100.jpg',
        linkedin: document.getElementById('linkedin').value,
        twitter: document.getElementById('twitter').value,
        facebook: document.getElementById('facebook').value,
        instagram: document.getElementById('instagram').value,
        fontFamily: document.getElementById('fontFamily').value,
        fontSize: document.getElementById('fontSize').value,
        textColor: document.getElementById('textColor').value,
        bgColor: document.getElementById('bgColor').value,
        borderStyle: document.getElementById('borderStyle').value,
        borderRadius: document.getElementById('borderRadius').value
    };
}

// Format social media URL
function formatSocialUrl(input, platform) {
    if (!input) return '';
    
    // Remove any leading @ symbol
    input = input.replace(/^@/, '');
    
    // Construct URL based on platform
    const baseUrl = {
        linkedin: 'https://linkedin.com/in/',
        twitter: 'https://twitter.com/',
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/'
    };
    
    return baseUrl[platform] + input;
}

// Generate signature HTML
function generateSignatureHTML(data) {
    // Build address string only if address section is visible
    let address = '';
    if (showAddressCheckbox.checked) {
        const addressParts = [];
        if (data.streetAddress) addressParts.push(data.streetAddress);
        if (data.city) addressParts.push(data.city);
        if (data.state) addressParts.push(data.state);
        if (data.pinCode) addressParts.push(data.pinCode);
        if (data.country) addressParts.push(data.country);
        
        address = addressParts.join(', ');
    }

    // Build social links
    const socialLinks = [];
    
    if (data.linkedin) {
        const url = formatSocialUrl(data.linkedin, 'linkedin');
        socialLinks.push(`<a href="${url}" target="_blank" style="display: inline-block; margin-right: 8px;"><img src="${socialIcons.linkedin}" alt="LinkedIn" style="width: 16px; height: 16px; vertical-align: middle;"></a>`);
    }
    if (data.twitter) {
        const url = formatSocialUrl(data.twitter, 'twitter');
        socialLinks.push(`<a href="${url}" target="_blank" style="display: inline-block; margin-right: 8px;"><img src="${socialIcons.twitter}" alt="Twitter" style="width: 16px; height: 16px; vertical-align: middle;"></a>`);
    }
    if (data.facebook) {
        const url = formatSocialUrl(data.facebook, 'facebook');
        socialLinks.push(`<a href="${url}" target="_blank" style="display: inline-block; margin-right: 8px;"><img src="${socialIcons.facebook}" alt="Facebook" style="width: 16px; height: 16px; vertical-align: middle;"></a>`);
    }
    if (data.instagram) {
        const url = formatSocialUrl(data.instagram, 'instagram');
        socialLinks.push(`<a href="${url}" target="_blank" style="display: inline-block; margin-right: 8px;"><img src="${socialIcons.instagram}" alt="Instagram" style="width: 16px; height: 16px; vertical-align: middle;"></a>`);
    }

    return `
        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr>
                <td style="vertical-align: top; padding-right: 15px;">
                    <img src="${data.profilePic}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
                </td>
                <td style="vertical-align: top;">
                    <p style="margin: 0 0 5px 0; font-weight: 600; font-size: 1.1em;">${data.fullName}</p>
                    <p style="margin: 0 0 5px 0; color: #666;">${data.jobTitle}</p>
                    <p style="margin: 0 0 10px 0; font-weight: 500;">${data.company}</p>
                    
                    <div style="margin-bottom: 10px;">
                        ${data.email ? `<p style="margin: 2px 0;"><a href="mailto:${data.email}" style="color: inherit; text-decoration: none;">${data.email}</a></p>` : ''}
                        ${data.phone ? `<p style="margin: 2px 0;">${data.phone}</p>` : ''}
                        ${data.website ? `<p style="margin: 2px 0;"><a href="${data.website}" target="_blank" style="color: inherit; text-decoration: none;">${data.website}</a></p>` : ''}
                        ${address ? `<p style="margin: 2px 0;">${address}</p>` : ''}
                    </div>
                    
                    ${socialLinks.length > 0 ? `<div style="white-space: nowrap;">${socialLinks.join('')}</div>` : ''}
                </td>
            </tr>
        </table>
    `;
}

// Copy signature to clipboard
function copySignature() {
    const data = getFormData();
    const html = generateSignatureHTML(data);
    const styledHtml = `
        <div style="font-family: ${data.fontFamily}; font-size: ${data.fontSize}; color: ${data.textColor}; background-color: ${data.bgColor}; border: ${data.borderStyle}; border-radius: ${data.borderRadius}; padding: 20px; max-width: 500px;">
            ${html}
        </div>
    `;
    
    navigator.clipboard.writeText(styledHtml).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        copyBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            copyBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    });
}

// Download signature as image
function downloadSignature() {
    // Add loading state
    downloadBtn.classList.add('loading');
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Generating...</span>';
    
    // Clone the preview element to avoid modifying the original
    const clone = preview.cloneNode(true);
    
    // Set explicit styles for better image rendering
    clone.style.width = '500px';
    clone.style.boxSizing = 'border-box';
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    // Use html2canvas to generate the image
    html2canvas(clone, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(blob => {
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mailstamp-signature-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Remove temporary container
            document.body.removeChild(tempContainer);
            
            // Reset button state
            downloadBtn.classList.remove('loading');
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-check"></i><span>Downloaded!</span>';
            downloadBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            downloadBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i><span>Download Image</span>';
                downloadBtn.classList.remove('bg-green-600', 'hover-bg-green-700');
                downloadBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            }, 2000);
        }, 'image/png');
    }).catch(error => {
        console.error('Error generating image:', error);
        alert('Error generating image. Please try again.');
        
        // Reset button state
        downloadBtn.classList.remove('loading');
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<i class="fas fa-download"></i><span>Download Image</span>';
        
        // Remove temporary container
        document.body.removeChild(tempContainer);
    });
      }
