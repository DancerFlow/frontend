import Bronze from '../assets/ranks/bronze.png';
import Silver from '../assets/ranks/silver.png';
import Gold from '../assets/ranks/gold.png';
import Platinum from '../assets/ranks/platinum.png';
import Diamond from '../assets/ranks/diamond.png';

export enum Tier {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    PLATINUM = 'PLATINUM',
    DIAMOND = 'DIAMOND'
}

export const tierThresholds: Record<Tier, number> = {
    [Tier.BRONZE]: 50,
    [Tier.SILVER]: 200,
    [Tier.GOLD]: 500,
    [Tier.PLATINUM]: 800,
    [Tier.DIAMOND]: 1500
};

export function getTier(xp: number): Tier {
    if (xp < tierThresholds[Tier.BRONZE]) {
        return Tier.BRONZE;
    } else if (xp < tierThresholds[Tier.SILVER]) {
        return Tier.SILVER;
    } else if (xp < tierThresholds[Tier.GOLD]) {
        return Tier.GOLD;
    } else if (xp < tierThresholds[Tier.PLATINUM]) {
        return Tier.PLATINUM;
    } else {
        return Tier.DIAMOND;
    }
}

export function getNextTier(xp: number): Tier {
    const currentTier: Tier = getTier(xp);

    switch (currentTier) {
        case Tier.BRONZE:
            return Tier.SILVER;
        case Tier.SILVER:
            return Tier.GOLD;
        case Tier.GOLD:
            return Tier.PLATINUM;
        case Tier.PLATINUM:
            return Tier.DIAMOND;
        case Tier.DIAMOND:
            return Tier.DIAMOND; // 다이아는 넥스트도 다이아
    }
}

export function getPrevTier(xp: number): Tier {
    const currentTier: Tier = getTier(xp);

    switch (currentTier) {
        case Tier.BRONZE:
            return Tier.BRONZE; //브론즈는 이전도 브론즈
        case Tier.SILVER:
            return Tier.BRONZE;
        case Tier.GOLD:
            return Tier.SILVER;
        case Tier.PLATINUM:
            return Tier.GOLD;
        case Tier.DIAMOND:
            return Tier.PLATINUM;
    }
}

export const tierImages: Record<Tier, string> = {
    [Tier.BRONZE]: Bronze,
    [Tier.SILVER]: Silver,
    [Tier.GOLD]: Gold,
    [Tier.PLATINUM]: Platinum,
    [Tier.DIAMOND]: Diamond
};

export function getPercentageToNextTier(xp: number): number {
    const currentTier: Tier = getTier(xp);

    if (currentTier === Tier.DIAMOND) {
        return 100; // 이미 100% 달성
    }

    const prevTier: Tier = getPrevTier(xp);
    const xpMin: number = tierThresholds[prevTier];
    const xpMax: number = tierThresholds[currentTier];

    return ((xp - xpMin) / (xpMax - xpMin)) * 100;
}
