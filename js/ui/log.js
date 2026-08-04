// 작업 및 시스템 로그 출력
function addLog(msg) {
    const box = document.getElementById('log-box');
    const div = document.createElement('div');
    div.innerHTML = `&gt; ${msg}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;

    while (box.children.length > 50) {
        box.removeChild(box.firstChild);
    }
}

export { addLog };
