/**
 * Test YouTube API Key
 * Run with: node test-youtube-api.js
 */

require('dotenv').config({ path: '.env.local' });

async function testYouTubeAPI() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  console.log('🔍 Testing YouTube API...');
  console.log(`API Key: ${apiKey?.substring(0, 10)}...`);
  console.log(`Channel ID: ${channelId}`);

  if (!apiKey) {
    console.error('❌ YOUTUBE_API_KEY is not set in .env.local');
    process.exit(1);
  }

  if (!channelId) {
    console.error('❌ YOUTUBE_CHANNEL_ID is not set in .env.local');
    process.exit(1);
  }

  try {
    // Test 1: Get channel info
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    console.log('🌐 Making API request...');
    
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();

    console.log('📡 Response status:', channelRes.status);
    console.log('📄 Response data:', JSON.stringify(channelData, null, 2));

    if (!channelRes.ok) {
      console.error('❌ API request failed:', channelData.error);
      if (channelData.error?.message?.includes('invalid')) {
        console.error('💡 Hint: Make sure you use a YouTube Data API v3 key, not OAuth Client ID');
      }
      process.exit(1);
    }

    if (channelData.items.length === 0) {
      console.error('❌ Channel not found');
      process.exit(1);
    }

    const channel = channelData.items[0];
    console.log('✅ Channel found:', channel.snippet.title);
    console.log(`   Subscribers: ${channel.statistics.subscriberCount || 'Hidden'}`);
    console.log(`   Videos: ${channel.statistics.videoCount}`);
    console.log(`   Views: ${channel.statistics.viewCount}`);

    console.log('\n✅ YouTube API Key is valid and working!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testYouTubeAPI();