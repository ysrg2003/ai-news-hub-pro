require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const { ArticleOutputSchema } = require('../utils/schemas');
const dataManager = require('../utils/dataManager');
const { generateArticleCoverImage, svgToBase64 } = require('../utils/imageGenerator');
const { updateSitemap } = require('../utils/sitemapGenerator');
const crypto = require('crypto');
const categories = require('../../categories.json');

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1500; // 1.5 seconds between calls
const MAX_CONCURRENT_JOBS = 3; // Process 3 jobs at a time

// Helper function to add delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to calculate read time (words / 200 = minutes)
function calculateReadTime(content) {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

// Helper function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

// Helper function to strip HTML tags
function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Step 1: Story Discovery (for Trending) or Topic Selection (for Evergreen)
 */
async function step1_DiscoverHeadline(category, articleType) {
  await delay(RATE_LIMIT_DELAY);

  const categoryName = category.name;
  let prompt;

  if (articleType === 'trending') {
    prompt = `You are an investigative tech journalist. Your mission is to find a compelling and impactful story in the ${categoryName} field. Use your available search tool (Google Search) to search the modern Google index for a significant study, or a practical application from a leading company that has made an impact within the last few months. I don't want just a general topic; I want a narrative angle that connects the technical concept to a human impact or commercial success. Based on your research, suggest a catchy journalistic headline that reflects this story. Return only the headline as plain text.`;
  } else {
    prompt = `You are an educational content editor. Your task is to choose a fundamental and evergreen topic from the ${categoryName} field. After choosing the topic, use the search tool (Google Search) to find the latest developments or practical applications of this concept. Based on that, suggest an engaging educational headline that connects the core concept to its modern applications. Return only the headline as plain text.`;
  }

  try {
    const response = await geminiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const headline = response.text.trim();
    console.log(`✓ Step 1 completed for ${articleType} article in ${categoryName}: "${headline}"`);
    return headline;
  } catch (error) {
    console.error(`✗ Step 1 failed: ${error.message}`);
    throw error;
  }
}

/**
 * Step 2: Write Research Draft
 */
async function step2_WriteDraft(headline, categoryName) {
  await delay(RATE_LIMIT_DELAY);

  const prompt = `You are the Senior and Chief Editor at 'AI News Hub'. You don't just write; you build, critique, and improve in real-time. Your mission is to create a comprehensive article draft (1500-1800 words) based on the following headline: '${headline}'.

Before you write a single word, internalize this philosophy: Every sentence must serve a purpose, every paragraph must build momentum, and every section must deliver undeniable value.

---

**Section One: The Unseen Editorial Principles**
*(This is your critical lens through which you must constantly evaluate your work)*

1. The "So What?" Principle: After every fact you present, ask yourself, "So, what's the significance?" and answer that question. Don't leave any information hanging.
2. The "Avoid the AI Voice" Principle: Completely avoid generic and repetitive phrases (like "In today's digital age...", "The world of AI is ever-evolving...", "In conclusion..."). If you write a sentence that sounds like it came from a template, delete it and rewrite it with a confident, direct human voice.
3. The "Depth, Not Breadth" Principle: Choose only 4-5 key points and delve into their analysis completely. Resist the temptation to mention everything. Quality comes from deep analysis.
4. The "Double Verification" Principle: While researching, try to find two sources for important information to ensure absolute accuracy.
5. The "Directed Narrative" Principle: Build the article as a narrative with a beginning (problem/opportunity), middle (exploration of solutions and challenges), and end (a vision for the future).
6. The "Balanced Perspective" Principle: Always present the benefits (The Upside) and the challenges or criticisms (The Downside) of any technology to add credibility.
7. The "Visual Clarity of Text" Principle: Mix short, impactful sentences with longer ones that explain complex ideas to create an enjoyable and non-monotonous reading rhythm.

---

**Section Two: The Strict Execution Checklist**
*(This is the list of technical tasks that must be executed literally, without any simplification)*

1. Originality and Depth:
   - Use the search tool (Google Search) extensively to gather data from multiple, reliable sources (studies, technical reports, articles from experts).
   - Don't just list facts. Provide in-depth analysis, explain the 'why' and 'how', and offer unique insights not found in any other single article.
   - The content must be 100% original and written from scratch based on your research.

2. Structure and Formatting:
   - Engaging Introduction: Start by grabbing the reader's attention with a story, a question, or a surprising fact. Do not use generic introductions.
   - Article Body: Divide the content into logical parts using clear subheadings (H2 and H3). Each section should be self-contained but contribute to the overall narrative.
   - Strong Conclusion: Summarize the main points and offer a final thought or a call to think. Avoid using the word "In conclusion".

3. Clarity and Readability:
   - Use simple, clear, and professional English. Explain any complex technical terms in a simplified manner as if you were explaining them to a smart, non-specialist colleague.
   - Write short paragraphs (2-4 sentences as a general rule) to facilitate reading on all devices.
   - Ensure the text is completely free of grammatical and spelling errors.

4. Reader-Focused Value:
   - The primary goal of the article must be to educate and benefit the reader.
   - Proactively answer questions the reader might have about the topic.

---

**Section Three: The Mandatory Self-Correction Loop**
*(After writing the initial draft, review it completely based on the following questions. This is not an option; it is part of the task)*

- Does the introduction truly engage the reader, or is it just a preamble? If it's a preamble, rewrite it.
- Does each section clearly answer the "So What?" question? If not, add the necessary analysis.
- Is there any sentence that sounds like "filler" or from an "AI template"? If you find one, delete or replace it.
- Is the narrative coherent from beginning to end? If not, rearrange paragraphs or add better transitions.
- Is the explanation of complex terms simple enough for a non-technical person? If not, simplify it further.
- Does the article present a balanced perspective, or does it seem overly promotional? If it's promotional, add a section on challenges or criticisms.

---

Start the article with the human side or the real-world impact of the story. After completing the writing and self-review process, return the final result as a JSON object containing \`draftTitle\` and \`draftContent\` (in HTML format with proper H2 and H3 tags for sections).`;

  try {
    const response = await geminiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let text = response.text.trim();
    
    // Extract JSON if wrapped in markdown code block
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const draftData = JSON.parse(text);
    console.log(`✓ Step 2 completed: Draft article written (${draftData.draftContent.length} characters)`);
    return draftData;
  } catch (error) {
    console.error(`✗ Step 2 failed: ${error.message}`);
    throw error;
  }
}

/**
 * Step 3: Final Editing, Internal Linking, Icon Extraction, and SEO Generation
 */
async function step3_FinalizeArticle(draft, categoryName, existingArticles) {
  await delay(RATE_LIMIT_DELAY);

  // Create knowledge graph from existing articles
  const knowledgeGraph = existingArticles.map(article => ({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    tags: article.tags,
    articleType: article.articleType,
  }));

  const prompt = `You are the Strategic Editor-in-Chief of 'AI News Hub'. Your job is not just to edit this draft, but to intelligently integrate it into the site's existing knowledge network to maximize its overall value.

**Inputs:**
1. Current Draft: Title: "${draft.draftTitle}", Content: "${draft.draftContent.substring(0, 500)}..."
2. Site Database (The Knowledge Graph): ${JSON.stringify(knowledgeGraph.slice(0, 10))}

**Execute the following strategic and editorial tasks with extreme precision:**

**Section One: Article-Level Optimization**

1. Stellar Polish:
   - Review every sentence for clarity and impact. Delete unnecessary words and filler.
   - Ensure the style is consistent and engaging from start to finish, reflecting the 'AI News Hub' identity.
   - Perform a final check for grammatical and spelling errors.

2. Add Textual Rich Media Elements:
   - Add bulleted or numbered lists to break up long texts and make complex information easier to digest.
   - Use Blockquotes to highlight important points or expert quotes.

3. Conceptual Icon Extraction:
   - Extract one or two English words that represent the core concept of the article (e.g., 'network', 'balance', 'security').

**Section Two: Network-Level Optimization**

4. Strategic Internal Linking:
   - Based on the current draft, analyze the site database. Are there concepts mentioned in the draft that are not explained in depth in existing articles?
   - Add 3-5 HTML links (\`<a href=... >\`) to the most relevant existing articles. Don't just link keywords; link phrases that explain a concept.
   - Future Article Suggestions: Based on the gap analysis, suggest two titles for future articles that could be written to fill these knowledge gaps.

5. Article Positioning in the Network:
   - Analyze the article type (Trending/Evergreen) and its content.
   - Is this article considered "Pillar Content" or "Spoke Content"?
   - Based on this analysis, adjust the \`excerpt\` and \`tags\` to reflect its role in the network.

**Section Three: Final Publishing Package**

6. Create a Complete SEO Package:
   - \`metaTitle\`: An attractive and search-engine-friendly title (50-60 characters).
   - \`metaDescription\`: A brief and compelling description (150-160 characters).
   - \`imageAltText\`: A descriptive alt text for the main image.
   - \`tags\`: A list of 5-7 optimized tags based on the analysis of the article's position in the network.

**Required Output:**
Return a final JSON object containing: \`finalTitle\`, \`finalContent\`, \`excerpt\`, \`seo\`, \`tags\`, \`conceptualIcon\`, and \`futureArticleSuggestions\` (an array of two titles).`;

  try {
    const response = await geminiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let text = response.text.trim();
    
    // Extract JSON if wrapped in markdown code block
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const finalData = JSON.parse(text);
    
    // Validate using zod schema
    const validated = ArticleOutputSchema.parse(finalData);
    console.log(`✓ Step 3 completed: Article finalized and validated`);
    return validated;
  } catch (error) {
    console.error(`✗ Step 3 failed: ${error.message}`);
    throw error;
  }
}

/**
 * Main function to generate a complete article
 */
async function generateArticle(category, articleType) {
  const jobId = crypto.randomUUID();
  console.log(`\n📝 Starting article generation (Job ID: ${jobId})`);
  console.log(`   Category: ${category.name}, Type: ${articleType}`);

  try {
    // Step 1: Discover headline
    const headline = await step1_DiscoverHeadline(category, articleType);

    // Step 2: Write draft
    const draft = await step2_WriteDraft(headline, category.name);

    // Step 3: Finalize article
    const existingArticles = await dataManager.readArticles();
    const finalArticle = await step3_FinalizeArticle(draft, category.name, existingArticles);

    // Generate cover image
    const svg = generateArticleCoverImage(finalArticle.finalTitle, category.id, finalArticle.conceptualIcon);
    const imageBase64 = svgToBase64(svg);

    // Create article object
    const slug = createSlug(finalArticle.finalTitle);
    const readTime = calculateReadTime(stripHtmlTags(finalArticle.finalContent));
    
    const article = {
      id: crypto.randomUUID(),
      title: finalArticle.finalTitle,
      content: finalArticle.finalContent,
      excerpt: finalArticle.excerpt,
      category: category.id,
      categoryName: category.name,
      articleType,
      author: 'AI News Hub',
      date: new Date().toISOString(),
      readTime,
      image: `data:image/svg+xml;base64,${imageBase64}`,
      seo: finalArticle.seo,
      tags: finalArticle.tags,
      conceptualIcon: finalArticle.conceptualIcon,
      internalLinks: [], // Will be populated from HTML content
      futureArticleSuggestions: finalArticle.futureArticleSuggestions,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save article
    await dataManager.addArticle(article);
    console.log(`✅ Article saved successfully: "${article.title}"`);

    // Update sitemap
    await updateSitemap();

    return article;
  } catch (error) {
    console.error(`❌ Article generation failed (Job ID: ${jobId}): ${error.message}`);
    
    // Log failed job for retry
    const failedJob = {
      jobId,
      category: category.id,
      articleType,
      status: 'failed_at_step_3_validation',
      attempts: 1,
      lastAttempted: new Date().toISOString(),
      error: error.message,
      createdAt: new Date().toISOString(),
    };
    
    await dataManager.addPendingJob(failedJob);
    throw error;
  }
}

/**
 * Process failed jobs from pending-jobs.json
 */
async function processFailedJobs() {
  const failedJobs = await dataManager.getFailedJobs();
  
  if (failedJobs.length === 0) {
    console.log('No failed jobs to retry');
    return;
  }

  console.log(`\n🔄 Processing ${failedJobs.length} failed jobs...`);

  for (const job of failedJobs) {
    try {
      const category = categories.find(c => c.id === job.category);
      if (!category) {
        console.warn(`Category ${job.category} not found, skipping job ${job.jobId}`);
        continue;
      }

      console.log(`Retrying job ${job.jobId} (Attempt ${job.attempts + 1}/3)...`);
      await generateArticle(category, job.articleType);
      
      // Remove from pending jobs on success
      await dataManager.removePendingJob(job.jobId);
    } catch (error) {
      // Update job with new attempt count
      await dataManager.updatePendingJob(job.jobId, {
        attempts: job.attempts + 1,
        lastAttempted: new Date().toISOString(),
        error: error.message,
      });
    }
  }
}

module.exports = {
  generateArticle,
  processFailedJobs,
};
