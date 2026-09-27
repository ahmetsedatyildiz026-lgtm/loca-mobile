const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable SVG support
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Add additional file extensions
config.resolver.assetExts.push('svg', 'png', 'jpg', 'jpeg', 'gif', 'webp');

module.exports = config;