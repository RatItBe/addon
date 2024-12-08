// 총기 리스트 (새 총 추가할 때마다 복붙 후 수정)
export const weaponList = [
    {
        weaponName: "fs:r306_l", // 총 이름
        bulletName: "fs:r306_bullet", // 탄알 이름
        bulletSpeed: 5, // 탄알 속도
        bulletDamage: 1, // 탄알 데미지
        spreadAngle: 0.3, // 퍼짐 각도(낮을수록 잘 맞음)
        weaponSound: { name: "camera.take_picture", pitch: 2, volume: 10 }, // 소리 설정
        emptyWeaponName: "fs:r306_e", // 비어있는 총 이름
        burst: { count: 3, tick: 2 } // 점사 정보, (count: 1일 시 단발, tick: 0일시 한번에 나감)
    },
    {
        weaponName: "fs:r306_mk1_l",
        bulletName: "fs:r306_bullet",
        bulletSpeed: 5,
        bulletDamage: 1,
        spreadAngle: 0.3,
        weaponSound: { name: "camera.take_picture", pitch: 2, volume: 10 },
        emptyWeaponName: "fs:r306_mk1_e",
        burst: { count: 3, tick: 2 }
    },
    {
        weaponName: "fs:r306_mk2_l",
        bulletName: "fs:r306_bullet",
        bulletSpeed: 6,
        bulletDamage: 1,
        spreadAngle: 0.25,
        weaponSound: { name: "camera.take_picture", pitch: 2, volume: 10 },
        emptyWeaponName: "fs:r306_mk2_e",
        burst: { count: 3, tick: 2 }
    },
    {
        weaponName: "fs:r306_mk3_l",
        bulletName: "fs:r306_bullet",
        bulletSpeed: 9,
        bulletDamage: 1,
        spreadAngle: 0.1,
        weaponSound: { name: "camera.take_picture", pitch: 2, volume: 10 },
        emptyWeaponName: "fs:r306_mk3_e",
        burst: { count: 3, tick: 2 }
    },
    {
        weaponName: "fs:sentinel",
        bulletName: "fs:sentinel_bullet",
        bulletSpeed: 15,
        bulletDamage: 1,
        spreadAngle: 0.01,
        weaponSound: { name: "random.explode", pitch: 1, volume: 15 },
        emptyWeaponName: undefined,
        burst: { count: 1, tick: 0 } // 단발
    }
];
