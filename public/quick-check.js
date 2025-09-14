document.addEventListener("DOMContentLoaded", function() {
    shuffleArray(results);
    // quick check
    let currentIndex = 0;
    let hintCount = 0;
    let time = 0;
    let timeInterval = null;
    let firstMeaningValid = false;
    let secondMeaningValid = false;
    const showMeaning = document.getElementById("show-meaning");
    showMeaning.textContent = results[currentIndex][requestMeaning];

    // result
    document.getElementById("chinese-result").textContent = results[currentIndex].chinese;
    document.getElementById("japanese-result").textContent = results[currentIndex].japanese;
    document.getElementById("vietnamese-result").textContent = results[currentIndex].vietnamese;

    // start test
    document.getElementById('start-test').addEventListener('click', function() {
        document.getElementsByTagName("main")[0].classList.remove('hidden')
        document.getElementById('pre-content').classList.add('hidden')

        updateClock()
        timeInterval = setInterval(updateClock, 1000)
    })

    // handle input first meaning
    const firstMeaningInput = document.getElementById("first-meaning-input");
    const firstMeaningInputStatus = document.getElementById("first-meaning-input-status");
    firstMeaningInput.addEventListener("input", function() {
        firstMeaningValid = firstMeaningInput.value.trim() === results[currentIndex][answerMeaning1].trim();
        if (firstMeaningValid) {
            firstMeaningInputStatus.querySelector(".error-icon").classList.add("hidden");
            firstMeaningInputStatus.querySelector(".success-icon").classList.remove("hidden");
        } else {
            firstMeaningInputStatus.querySelector(".error-icon").classList.remove("hidden");
            firstMeaningInputStatus.querySelector(".success-icon").classList.add("hidden");
        }
        checkEnableNextButton();
    });

    // handle input second meaning
    const secondMeaningInput = document.getElementById("second-meaning-input");
    const secondMeaningInputStatus = document.getElementById("second-meaning-input-status");
    secondMeaningInput.addEventListener("input", function() {
        secondMeaningValid = secondMeaningInput.value.trim().toLowerCase() === results[currentIndex][answerMeaning2].trim().toLowerCase();
        if (secondMeaningValid) {
            secondMeaningInputStatus.querySelector(".error-icon").classList.add("hidden");
            secondMeaningInputStatus.querySelector(".success-icon").classList.remove("hidden");
        }
        else {
            secondMeaningInputStatus.querySelector(".error-icon").classList.remove("hidden");
            secondMeaningInputStatus.querySelector(".success-icon").classList.add("hidden");
        }
        checkEnableNextButton();
    });

    // handle show result
    const showResultButton = document.querySelector("button.outline");
    showResultButton.addEventListener("click", function() {
        hintCount++;
        document.getElementById("result-table").classList.remove("hidden");
    });

    // handle next button
    const nextButton = document.querySelector("button.next-button");
    nextButton.addEventListener("click", function() {
        if (!firstMeaningValid || !secondMeaningValid) {
            return;
        }
        if (currentIndex === results.length - 1) {
            renderTestResult();
            return;
        }
        currentIndex++;
        showMeaning.textContent = results[currentIndex][requestMeaning];
        document.getElementById("chinese-result").textContent = results[currentIndex].chinese;
        document.getElementById("japanese-result").textContent = results[currentIndex].japanese;
        document.getElementById("vietnamese-result").textContent = results[currentIndex].vietnamese;
        firstMeaningValid = false;
        secondMeaningValid = false;
        firstMeaningInput.value = "";
        secondMeaningInput.value = "";
        firstMeaningInputStatus.querySelector(".error-icon").classList.add("hidden");
        firstMeaningInputStatus.querySelector(".success-icon").classList.add("hidden");
        secondMeaningInputStatus.querySelector(".error-icon").classList.add("hidden");
        secondMeaningInputStatus.querySelector(".success-icon").classList.add("hidden");
        document.getElementById("result-table").classList.add("hidden");
        document.getElementById("current-index").textContent = currentIndex + 1 + "/" + results.length;
        checkEnableNextButton();
    });


    // utility functions
    function checkEnableNextButton() {
        if (firstMeaningValid && secondMeaningValid) {
            document.querySelector("button.next-button").classList.remove(...["bg-gray-500", "cursor-not-allowed"]);
            document.querySelector("button.next-button").classList.add(...["bg-green-500", "cursor-pointer"]);
        }
        else {
            document.querySelector("button.next-button").classList.remove(...["bg-green-500", "cursor-pointer"]);
            document.querySelector("button.next-button").classList.add(...["bg-gray-500", "cursor-not-allowed"]);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updateClock() {
        time++;
        let h = String(Math.floor(time / 3600)).padStart(2, "0");
        let m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
        let s = String(time % 60).padStart(2, "0");

        document.getElementById("clock").textContent = `${h}:${m}:${s}`;
    }

    function renderTestResult() {
        clearInterval(timeInterval);
        let h = String(Math.floor(time / 3600)).padStart(2, "0");
        let m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
        let s = String(time % 60).padStart(2, "0");

        document.getElementsByTagName("main")[0].innerHTML = `
            <H2 class="text-2xl font-bold w-full text-center">Test Result</H2>
            <p class="text-sm text-gray-500 w-full text-center">Time: ${h}:${m}:${s}</p>

            <div id="test-result" class="bg-white shadow rounded-lg overflow-hidden my-4">

               <table class="min-w-full text-left border-collapse">
                 <thead>
                  <tr>
                     <th class="px-6 py-3 text-sm font-medium text-gray-600">Total</th>
                     <th class="px-6 py-3 text-sm font-medium text-gray-600">Pass</th>
                     <th class="px-6 py-3 text-sm font-medium text-gray-600">Hint</th>
                  </tr>
                 </thead>
                 <tbody>
                  <tr>
                     <td class="px-6 py-4 border-b border-gray-100">${results.length}</td>
                     <td class="px-6 py-4 border-b border-gray-100">${results.length - hintCount}</td>
                     <td class="px-6 py-4 border-b border-gray-100">${hintCount}</td>
                   </tr>
                 </tbody>
               </table>
             </div>
        `
    }
});
