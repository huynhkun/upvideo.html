document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngan không cho form t? g?i
    const file = document.getElementById('videoFile').files[0];
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = 'Ðang t?i video lên...';

    // Ki?m tra n?u không có file
    if (!file) {
        statusDiv.innerHTML = 'Vui lòng ch?n video!';
        return;
    }

    // T?o d?i tu?ng FormData d? g?i video lên API
    const formData = new FormData();
    formData.append('video', file);

    // G?i video lên Abyss
    uploadToAbyss(formData, statusDiv);
    
    // G?i video lên Helvid
    uploadToHelvid(formData, statusDiv);
});

// Hàm upload video lên Abyss
function uploadToAbyss(formData, statusDiv) {
    fetch('http://up.hydrax.net/05abf5e36a281e1f7a49a8795317c50e', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusDiv.innerHTML += `<p>Video dã du?c t?i lên Abyss! Link: ${data.link}</p>`;
        } else {
            statusDiv.innerHTML += '<p>L?i khi t?i video lên Abyss.</p>';
        }
    })
    .catch(error => {
        statusDiv.innerHTML += '<p>L?i m?ng: Không th? t?i video lên Abyss.</p>';
    });
}

// Hàm upload video lên Helvid
function uploadToHelvid(formData, statusDiv) {
    fetch('https://api.helvid.com/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 8SKrnxC82ypbpgDNiiMApcuBE7Y0E' // API Key c?a b?n
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusDiv.innerHTML += `<p>Video dã du?c t?i lên Helvid! Link: ${data.slug}</p>`;
        } else {
            statusDiv.innerHTML += '<p>L?i khi t?i video lên Helvid.</p>';
        }
    })
    .catch(error => {
        statusDiv.innerHTML += '<p>L?i m?ng: Không th? t?i video lên Helvid.</p>';
    });
}
