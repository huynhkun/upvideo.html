<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Kiểm tra xem file có được chọn không
    if (isset($_FILES['video']) && $_FILES['video']['error'] == 0) {
        // Lấy thông tin file video
        $videoFile = $_FILES['video']['tmp_name'];
        $fileName = $_FILES['video']['name'];

        // Tạo FormData để gửi video
        $formData = array(
            'file' => new CURLFile($videoFile, 'video/mp4', $fileName),
            'API Key' => '8SKrnxC82ypbpgDNiiMApcuBE7Y0E', // API Key của Helvid
            'CID' => '15', // Video class ID
            'FID' => '18', // Server ID
            'MyCID' => '17' // My class ID
        );

        // Gửi video lên Abyss
        uploadToAbyss($formData);

        // Gửi video lên Helvid
        uploadToHelvid($formData);
    } else {
        echo 'Vui lòng chọn một video để tải lên!';
    }
}

function uploadToAbyss($formData) {
    $url = 'http://up.hydrax.net/05abf5e36a281e1f7a49a8795317c50e';
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: multipart/form-data'
    ));

    $response = curl_exec($ch);

    if(curl_errno($ch)) {
        echo 'Lỗi cURL: ' . curl_error($ch);
    } else {
        $data = json_decode($response, true);
        if ($data && isset($data['link'])) {
            echo '<p>Video đã được tải lên Abyss! Link: ' . $data['link'] . '</p>';
        } else {
            echo '<p>Lỗi khi tải video lên Abyss.</p>';
        }
    }

    curl_close($ch);
}

function uploadToHelvid($formData) {
    $url = 'https://helvid.com/api/upload';
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if(curl_errno($ch)) {
        echo 'Lỗi cURL: ' . curl_error($ch);
    } else {
        $data = json_decode($response, true);
        if ($data && isset($data['slug'])) {
            echo '<p>Video đã được tải lên Helvid! Link: ' . $data['slug'] . '</p>';
        } else {
            echo '<p>Lỗi khi tải video lên Helvid.</p>';
        }
    }

    curl_close($ch);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Video</title>
</head>
<body>
    <h2>Upload Video</h2>
    <form action="index.php" method="post" enctype="multipart/form-data">
        <label for="video">Chọn video:</label>
        <input type="file" name="video" id="video" required><br><br>
        <button type="submit">Tải lên</button>
    </form>
</body>
</html>
