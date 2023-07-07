// javascriptCopy code
const MAX_PROGRESS_BARS = 3; // Maximum number of progress bars that can run simultaneously
const progressBarsContainer = document.getElementById(
  "progress-bars-container"
);
const addButton = document.getElementById("add-progress-bar");

let activeProgressBars = 0; // Number of progress bars currently running
let pendingProgressBars = []; // Queue of pending progress bars to be started

// Function to create and start a progress bar
function createProgressBar() {
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBarsContainer.appendChild(progressBar);
  activeProgressBars++;

  // Animate the progress bar
  let progress = 0;
  const intervalId = setInterval(() => {
    progress++;
    progressBar.style.width = `${progress}%`;
    if (progress === 100) {
      clearInterval(intervalId);
      // progressBarsContainer.removeChild(progressBar);
      activeProgressBars--;
      if (pendingProgressBars.length > 0) {
        const nextProgressBar = pendingProgressBars.shift();
        createProgressBar(nextProgressBar);
      }
    }
  }, 50);
}

// Function to handle the "Add Progress Bar" button click
function onAddProgressBarClick() {
  if (activeProgressBars >= MAX_PROGRESS_BARS) {
    // Add the progress bar to the queue
    pendingProgressBars.push(new Date());
  } else {
    createProgressBar();
  }
}

addButton.addEventListener("click", onAddProgressBarClick);
