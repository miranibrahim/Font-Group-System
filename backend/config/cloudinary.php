<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Cloudinary\Cloudinary;
use Dotenv\Dotenv;

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Get env variables
$cloudName = $_ENV['CLOUDINARY_CLOUD_NAME'] ?? '';
$apiKey = $_ENV['CLOUDINARY_API_KEY'] ?? '';
$apiSecret = $_ENV['CLOUDINARY_API_SECRET'] ?? '';

// Create Cloudinary instance
return new Cloudinary(
    [
        'cloud' => [
            'cloud_name' => $cloudName,
            'api_key'    => $apiKey,
            'api_secret' => $apiSecret,
        ],
        'url' => [
            'secure' => true
        ]
    ]
);
