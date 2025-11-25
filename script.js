// script.js

let countdown;
let isRunning = false;
let countdownTime = 30;  // 默认循环倒计时 30秒
let loopCount = 5; // 默认循环次数
let currentLoop = 1;  // 当前进行的循环次数

const countdownTimerDisplay = document.getElementById("countdown-timer");
const loopInfoDisplay = document.getElementById("loop-info");
const alertSound = document.getElementById("alertSound");

function startCountdown() {
    if (isRunning) return;  // 防止重复点击

    isRunning = true;
    currentLoop = 1;  // 重置循环次数

    startLoopCountdown(countdownTime, currentLoop);
}

function startLoopCountdown(timeLeft, currentLoop) {
    let remainingTime = timeLeft;
    
    countdown = setInterval(() => {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countdownTimerDisplay.textContent = `${minutes}:${seconds}`;
        remainingTime--;

        // 更新循环次数显示
        loopInfoDisplay.textContent = `第 ${currentLoop} 次循环`;

        if (remainingTime < 0) {
            clearInterval(countdown); // 清除当前倒计时
            alertSound.play(); // 播放提示音

            if (currentLoop < loopCount) {
                currentLoop++;  // 增加循环次数
                setTimeout(() => {
                    startLoopCountdown(countdownTime, currentLoop); // 继续下一个倒计时
                }, 1000);
            } else {
                // 所有循环完成后停止倒计时
                setTimeout(() => {
                    loopInfoDisplay.textContent = "所有倒计时完成！";
                    isRunning = false;  // 重置状态
                }, 1000);
            }
        }
    }, 1000);
}

document.getElementById("settingsBtn").addEventListener("click", () => {
    document.getElementById("settingsModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("settingsModal").style.display = "none";
});

document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault(); // 防止表单提交刷新页面

    countdownTime = parseInt(document.getElementById("intervalTime").value);
    loopCount = parseInt(document.getElementById("loopCount").value);

    document.getElementById("settingsModal").style.display = "none"; // 隐藏表单

    if (isRunning) {
        clearInterval(countdown);
        isRunning = false;
        startCountdown(); // 重新启动倒计时
    }
});

document.getElementById("startBtn").addEventListener("click", startCountdown);
