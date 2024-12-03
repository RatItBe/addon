import { world } from "@minecraft/server";

export function playerSpawn(eventData) {
    const player = eventData.player;
    let joinedPlayers = world.getDynamicProperty("joinedPlayers") || ""; // 플레이어 명단 불러오기
    let playerList = joinedPlayers ? joinedPlayers.split(",") : [];

    if (!playerList.includes(player.name)) { // 서버 최초 방문자일 시
        playerList.push(player.name); // 명단에 플레이어 새로 추가
        world.setDynamicProperty("joinedPlayers", playerList.join(","));

        world.scoreboard.getObjective("burns").setScore(player, 0); // 화상 초기설정
        world.scoreboard.getObjective("job").setScore(player, 0); // 직업 초기설정
    }
    else if (!eventData.initialSpawn) { //플레이어가 죽고 부활한 경우라면
        world.scoreboard.getObjective("burns").setScore(player, 0); // 화상 스코어보드 초기화
    }
}