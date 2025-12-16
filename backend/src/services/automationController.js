require('dotenv').config();
const cron = require('node-cron');
const { generateArticle, processFailedJobs } = require('./contentGenerator');
const dataManager = require('../utils/dataManager');
const categories = require('../../categories.json');

// Configuration
const ARTICLES_PER_CATEGORY = 2; // 1 trending + 1 evergreen
const TOTAL_ARTICLES_PER_DAY = categories.length * ARTICLES_PER_CATEGORY; // 16 articles

let isProcessing = false;

/**
 * Main daily automation function
 * Generates 16 articles (2 per category: 1 trending, 1 evergreen)
 */
async function runDailyAutomation() {
  if (isProcessing) {
    console.log('⚠️  Automation already running, skipping this cycle');
    return;
  }

  isProcessing = true;
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting Daily Automation - ${new Date().toISOString()}`);
  console.log(`${'='.repeat(80)}`);

  try {
    // Step 1: Process any failed jobs from previous runs
    console.log('\n📋 Step 1: Processing failed jobs...');
    await processFailedJobs();

    // Step 2: Generate new articles
    console.log('\n📝 Step 2: Generating daily articles...');
    const articlesGenerated = [];
    let successCount = 0;
    let failureCount = 0;

    for (const category of categories) {
      console.log(`\n📂 Processing category: ${category.name}`);

      // Generate trending article
      try {
        console.log(`   → Generating trending article...`);
        const trendingArticle = await generateArticle(category, 'trending');
        articlesGenerated.push(trendingArticle);
        successCount++;
        console.log(`   ✅ Trending article generated`);
      } catch (error) {
        console.error(`   ❌ Failed to generate trending article: ${error.message}`);
        failureCount++;
      }

      // Generate evergreen article
      try {
        console.log(`   → Generating evergreen article...`);
        const evergreenArticle = await generateArticle(category, 'evergreen');
        articlesGenerated.push(evergreenArticle);
        successCount++;
        console.log(`   ✅ Evergreen article generated`);
      } catch (error) {
        console.error(`   ❌ Failed to generate evergreen article: ${error.message}`);
        failureCount++;
      }
    }

    // Step 3: Summary
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📊 Daily Automation Summary`);
    console.log(`${'='.repeat(80)}`);
    console.log(`✅ Successfully generated: ${successCount} articles`);
    console.log(`❌ Failed to generate: ${failureCount} articles`);
    console.log(`📈 Total articles in database: ${await dataManager.getArticlesCount()}`);
    console.log(`⏰ Completed at: ${new Date().toISOString()}`);
    console.log(`${'='.repeat(80)}\n`);

    return {
      success: true,
      articlesGenerated: successCount,
      articlesFailed: failureCount,
      totalArticles: await dataManager.getArticlesCount(),
    };
  } catch (error) {
    console.error(`\n❌ Daily automation failed: ${error.message}`);
    return {
      success: false,
      error: error.message,
    };
  } finally {
    isProcessing = false;
  }
}

/**
 * Schedule daily automation
 * Runs at 00:00 UTC every day (configurable)
 */
function scheduleDailyAutomation(cronExpression = '0 0 * * *') {
  console.log(`⏰ Scheduling daily automation with cron expression: "${cronExpression}"`);
  
  cron.schedule(cronExpression, async () => {
    console.log(`\n⏰ Cron job triggered at ${new Date().toISOString()}`);
    await runDailyAutomation();
  });

  console.log('✅ Daily automation scheduled successfully');
}

/**
 * Run automation once (useful for testing or manual triggering)
 */
async function runOnce() {
  console.log('🎯 Running automation once...');
  return await runDailyAutomation();
}

/**
 * Get automation status
 */
function getStatus() {
  return {
    isProcessing,
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  runDailyAutomation,
  scheduleDailyAutomation,
  runOnce,
  getStatus,
};
