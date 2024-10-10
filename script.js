document.getElementById('mode').addEventListener('change', function() {
  const mode = this.value;
  const topicContainer = document.getElementById('topic-container');

  // Log to confirm the mode change event is firing
  console.log('Mode changed to:', mode);

  if (mode === 'custom') {
    console.log('Custom mode selected: showing topic input');
    topicContainer.classList.remove('hidden');
  } else {
    console.log('Any mode selected: hiding topic input');
    topicContainer.classList.add('hidden');
  }
});
