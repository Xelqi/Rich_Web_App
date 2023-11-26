const { fromEvent, timer } = rxjs;
const { map, takeUntil, switchMap } = rxjs.operators;

function startTimer() {
  const h = document.getElementById("hour-input").valueAsNumber || 0;
  const m = document.getElementById("minute-input").valueAsNumber || 0;
  const s = document.getElementById("second-input").valueAsNumber || 0;

  // Get time in seconds for conversion later
  let totalSeconds = h * 3600 + m * 60 + s;

  document.getElementById("hour-input").value = "";
  document.getElementById("minute-input").value = "";
  document.getElementById("second-input").value = "";

  const counterDisplay = document.getElementById("counter");

  // Create an observable that emits every second
  const timer$ = timer(0, 1000);

  // Use switchMap to handle the interval logic
  timer$.pipe(
    takeUntil(fromEvent(document.getElementById("start-btn"), "click")),
    map(() => {
      var hR = Math.floor(totalSeconds / 3600);
      var mR = Math.floor((totalSeconds % 3600) / 60);
      var sR = totalSeconds % 60;

      counterDisplay.innerHTML = `${hR}:${mR}:${sR}`;

      if (totalSeconds <= 0) {
        counterDisplay.innerHTML = "Countdown Complete!";
        throw new Error("Countdown Complete");
      } else {
        totalSeconds--;
      }
    }),
    // Switch to a new observable when the start button is clicked
    switchMap(() => timer$)).subscribe({error: (err) => {
      if (err.message === "Countdown Complete") {
        // Handle completion if needed
        console.log("Countdown complete");
      }
    },
  });
}

// Attach the startTimer function to the click event of the start button
fromEvent(document.getElementById("start-btn"), "click").subscribe(startTimer);
