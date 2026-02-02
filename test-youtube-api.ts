/**
 * Test YouTube API Key
 * Run with: npx ts-node test-youtube-api.ts
 */

async function testYouTubeAPI() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey) {
    console.error('❌ YOUTUBE_API_KEY is not set in .env.local');
    process.exit(1);
  }

  if (!channelId) {
    console.error('❌ YOUTUBE_CHANNEL_ID is not set in .env.local');
    process.exit(1);
  }

  try {
    console.log('🔍 Testing YouTube API...');
    console.log(`📺 Channel ID: ${channelId}`);

    // Test 1: Get channel info
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();

    if (!channelRes.ok) {
      console.error('❌ Channel fetch failed:', channelData.error);
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

    // Test 2: Get latest uploads
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    if (uploadsPlaylistId) {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=5&key=${apiKey}`;
      const playlistRes = await fetch(playlistUrl);
      const playlistData = await playlistRes.json();

      if (playlistRes.ok && playlistData.items.length > 0) {
        console.log(`\n✅ Latest ${playlistData.items.length} videos:`);
        playlistData.items.forEach((item: any, i: number) => {
          console.log(
            `   ${i + 1}. ${item.snippet.title} (${item.snippet.publishedAt.split('T')[0]})`
          );
        });
      }
    }

    console.log('\n✅ YouTube API Key is valid and working!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testYouTubeAPI();
