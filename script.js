document.getElementById('mode').addEventListener('change', function() {
  const mode = this.value;
  const topicContainer = document.getElementById('topic-container');

  if (mode === 'custom') {
    topicContainer.classList.remove('hidden');
  } else {
    topicContainer.classList.add('hidden');
  }
});

document.getElementById('news-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const mode = document.getElementById('mode').value;
  const topic = document.getElementById('topic').value;
  const timeline = document.getElementById('timeline').value;
  const sources = document.getElementById('sources').value.split(',').map(s => s.trim());

  let summary = "Summary of the news articles:";
  let usedSources = "";

  // Placeholder: This is where you'd normally fetch the data from the news APIs or scrape websites
  // For simplicity, we'll just mock this functionality here.

  if (mode === 'any') {
    summary += "\nFound 5 articles on general topics in the last " + timeline;
    usedSources = "Sources: BBC, Reuters, CNN, Al Jazeera, The Guardian";
  } else {
    summary += `\nFound 3 articles on ${topic} in the last ${timeline}`;
    usedSources = `Sources: ${sources.join(', ')}`;
  }

  // Output the results
  document.getElementById('summary-text').textContent = summary;
  document.getElementById('summary-sources').textContent = usedSources;
});
