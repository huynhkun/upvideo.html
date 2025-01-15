document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngan kh�ng cho form t? g?i
    const file = document.getElementById('videoFile').files[0];
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = '�ang t?i video l�n...';

    // Ki?m tra n?u kh�ng c� file
    if (!file) {
        statusDiv.innerHTML = 'Vui l�ng ch?n video!';
        return;
    }

    // T?o d?i tu?ng FormData d? g?i video l�n API
    const formData = new FormData();
    formData.append('video', file);

    // G?i video l�n Abyss
    uploadToAbyss(formData, statusDiv);
    
    // G?i video l�n Helvid
    uploadToHelvid(formData, statusDiv);
});

// H�m upload video l�n Abyss
function uploadToAbyss(formData, statusDiv) {
    fetch('http://up.hydrax.net/05abf5e36a281e1f7a49a8795317c50e', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            statusDiv.innerHTML += `<p>Video d� du?c t?i l�n Abyss! Link: ${data.link}</p>`;
        } else {
            statusDiv.innerHTML += '<p>L?i khi t?i video l�n Abyss.</p>';
        }
    })
    .catch(error => {
        statusDiv.innerHTML += '<p>L?i m?ng: Kh�ng th? t?i video l�n Abyss.</p>';
    });
}

// H�m upload video l�n Helvid
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
            statusDiv.innerHTML += `<p>Video d� du?c t?i l�n Helvid! Link: ${data.slug}</p>`;
        } else {
            statusDiv.innerHTML += '<p>L?i khi t?i video l�n Helvid.</p>';
        }
    })
    .catch(error => {
        statusDiv.innerHTML += '<p>L?i m?ng: Kh�ng th? t?i video l�n Helvid.</p>';
    });
}
