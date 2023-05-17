export function test(sheet, timestamp, p_kp) {
    //const{sheet}=axios.get('')

    const idx = sheet[0]['time'] === 0 ? timestamp * 2 : timestamp * 2 - 1;
    // *  시트에서 해당 시간의 키포인트 찾기
    const a_kp = sheet[timestamp]['keypoints'];

    // * 2차원의 x, y 좌표를 받아서 해당 좌표에 해당하는 각도(세타)를 계산
    //p_kp 있다고 가정
    function cartesianToCylindrical(x, y) {
        const theta = Math.atan2(y, x);
        return (theta * 180) / Math.PI;
    }

    //* 두 키포인트 사이의 벡터를 계산하고, 그 벡터의 각도를 구하기
    function vectorToTheta(KP, a, b) {
        const v_x = KP[a].x - KP[b].x;
        const v_y = KP[a].y - KP[b].y;
        const theta = cartesianToCylindrical(v_x, v_y);
        return theta;
    }

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
    const detail = [0, 0, 0];
    for (let j = 0; j < CHECK_POINTS.length; j++) {
        const p_theta = vectorToTheta(p_kp, CHECK_POINTS[j][0], CHECK_POINTS[j][1]);
        const a_theta = vectorToTheta(a_kp, CHECK_POINTS[j][0], CHECK_POINTS[j][1]); //혹시나 부위별로 틀릴때 틀린부위를 뭐 색상이라거나 요런작업을하는가
        const degree = Math.abs(a_theta - p_theta);
        score = Math.cos((degree * Math.PI) / 180) >= 0 ? (score += Math.cos((degree * Math.PI) / 180)) : score;
        if (degree < 10) {
            // console.log('perfect');
            detail[0] += 1;
        } else if (degree < 20) {
            // console.log('good');
            detail[1] += 1;
        } else {
            // console.log('miss');
            detail[2] += 1;
        }
    }
    // COLOR_LIST=['g','g','g','g','g','g','g',...] <=state화 해서 하면 된다.
    return score*10;
}
