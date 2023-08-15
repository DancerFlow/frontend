export function scoring(sheet, timestamp, p_kp) {
    // * 플레이어 sheet의 keypoints
    const a_kp = sheet.filter((obj) => obj.time === timestamp)[0]['keypoints'];
    console.log(timestamp, a_kp);

    // * 10개의 체크포인트를 기준으로 각도를 계산하고, 그 각도의 코사인값을 더하기
    const CHECK_POINTS = [
        [5, 7],
        [7, 9],
        [6, 8],
        [8, 10],
        [11, 13],
        [13, 15],
        [12, 14],
        [14, 16],
        [9, 15],
        [10, 16] //z축평가를 위해 넣은 체크포인트
    ];

    // * score : 사용자의 포즈와 기준 포즈 간의 각도 차이를 바탕으로 계산된 점수
    // ! 두 각도 사이의 차이가 작을수록 점수는 높아집니다.
    let score = 0;
    for (let j = 0; j < CHECK_POINTS.length; j++) {
        const p_theta = vectorToTheta(p_kp, CHECK_POINTS[j][0], CHECK_POINTS[j][1]); // 플레이어 각도
        const a_theta = vectorToTheta(a_kp, CHECK_POINTS[j][0], CHECK_POINTS[j][1]); // 정답 각도
        const degree = Math.abs(a_theta - p_theta);

        // 각도의 차이가 90도 넘어가면 채점하지않음
        score = Math.cos((degree * Math.PI) / 180) >= 0 ? (score += Math.cos((degree * Math.PI) / 180)) : score;
    }
    score *= 10;
    if (score >= 90) {
        return 'Perfect';
    } else if (score >= 85) {
        return 'Great';
    } else if (score >= 80) {
        return 'Good';
    } else if (score >= 60) {
        return 'Normal';
    } else {
        return 'Miss';
    }
}

//* 두 키포인트 사이의 벡터를 계산하고, 그 벡터의 각도를 구하기
function vectorToTheta(KP, a, b) {
    const v_x = KP[a].x - KP[b].x; // keypotin의 방향(벡터) [ x1 - x2]
    const v_y = KP[a].y - KP[b].y; //                      [ y2 - y1]
    const theta = cartesianToCylindrical(v_x, v_y);
    return theta;
}

// * 2차원의 x, y 좌표를 받아서 해당 좌표에 해당하는 벡터의 각도(세타)를 계산
//p_kp 있다고 가정
function cartesianToCylindrical(x, y) {
    const theta = Math.atan2(y, x);
    return (theta * 180) / Math.PI; // 라디안(세타)에서 디그리(360도) 기준으로 변환
}
