let currentPlayer = 'black'; // 현재 플레이어 (흑돌 시작)
const boardSize = 15; // 보드 크기
let boardState = []; // 보드 상태를 저장하는 2차원 배열

function startGame() {
    const board = document.getElementById('board');
    const button = document.querySelector('.button');

    board.style.display = 'grid'; // 보드 표시
    board.innerHTML = ''; // 기존 보드 초기화
    boardState = Array.from({ length: boardSize }, () => Array(boardSize).fill(null)); // 보드 상태 초기화

    // 버튼 텍스트를 "게임 재시작"으로 변경
    button.textContent = '게임 재시작';
    button.onclick = resetBoard;

    // 15x15 보드 생성
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row; // 행 정보 저장
            cell.dataset.col = col; // 열 정보 저장
            cell.addEventListener('click', () => placeStone(cell, row, col));
            board.appendChild(cell);
        }
    }
}

function placeStone(cell, row, col) {
    if (boardState[row][col] !== null) {
        return; // 이미 돌이 놓인 칸은 무시
    }

    // 현재 플레이어의 돌 놓기
    boardState[row][col] = currentPlayer;
    cell.classList.add(currentPlayer);

    // 승리 조건 확인
    if (checkWin(row, col)) {
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '흑돌' : '백돌'} 승리!`);
            resetBoard();
        }, 500); // 0.5초 후에 승리 메시지 표시
        return;
    }

    // 플레이어 전환
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

function checkWin(row, col) {
    const directions = [
        { dr: 0, dc: 1 },  // 가로
        { dr: 1, dc: 0 },  // 세로
        { dr: 1, dc: 1 },  // 대각선 (\)
        { dr: 1, dc: -1 }  // 대각선 (/)
    ];

    for (const { dr, dc } of directions) {
        let count = 1;

        // 한 방향으로 연속된 돌 개수 확인
        count += countStones(row, col, dr, dc);
        // 반대 방향으로 연속된 돌 개수 확인
        count += countStones(row, col, -dr, -dc);

        if (count >= 5) {
            return true; // 5개 이상 연속되면 승리
        }
    }

    return false; // 승리 조건 미충족
}

function countStones(row, col, dr, dc) {
    let count = 0;
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && boardState[r][c] === currentPlayer) {
        count++;
        r += dr;
        c += dc;
    }

    return count;
}

function resetBoard() {
    const board = document.getElementById('board');
    const button = document.querySelector('.button');

    board.style.display = 'none'; // 보드 숨기기
    board.innerHTML = ''; // 보드 초기화
    currentPlayer = 'black'; // 흑돌로 초기화
    boardState = []; // 보드 상태 초기화

    // 버튼 텍스트를 "게임 시작"으로 변경
    button.textContent = '게임 시작';
    button.onclick = startGame;
}
