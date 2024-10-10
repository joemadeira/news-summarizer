// Function to fetch news from NewsAPI
async function fetchNews(topic, sources, timeline) {
  const apiKey = 'acb249b6d26b47c4bfd750a1663c8741'; // Your actual API key
  const url = `https://newsapi.org/v2/everything?q=${topic}&sources=${sources.join(',')}&from=${getDate(timeline)}&apiKey=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map(article => article.title).join('\n');
    } else {
      return 'No articles found for this topic and source combination.';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return 'Error fetching news.';
  }
}

// Function to get the date based on the timeline selected
function getDate(timeline) {
  const date = new Date();
  if (timeline === '24hours') {
    date.setDate(date.getDate() - 1);
  } else if (timeline === '7days') {
    date.setDate(date.getDate() - 7);
  }
  return date.toISOString().split('T')[0]; // return the date in YYYY-MM-DD format
}

// Handle form submission and fetching the news
document.getElementById('news-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const mode = document.getElementById('mode').value;
  const topic = document.getElementById('topic').value;
  const timeline = document.getElementById('timeline').value;
  const sources = document.getElementById('sources').value.split(',').map(s => s.trim());

  let summary = "Summary of the news articles:";
  let usedSources = "";

  if (mode === 'any') {
    // Mode 1: Fetch general news (no specific topic required)
    summary += "\nFetching general articles is not yet supported via NewsAPI.";
    usedSources = "Default sources (NewsAPI supports specific topics).";
  } else if (mode === 'custom' && topic) {
    // Mode 2: Fetch news for the specific topic from provided sources
    const fetchedSummary = await fetchNews(topic, sources, timeline);
    summary += `\n${fetchedSummary}`;
    usedSources = `Sources: ${sources.join(', ')}`;
  } else {
    summary = "Please enter a valid topic and sources.";
  }

  // Update the result in the HTML
  document.getElementById('summary-text').textContent = summary;
  document.getElementById('summary-sources').textContent = usedSources;
});
