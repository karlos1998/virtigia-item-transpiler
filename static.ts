import {formatHtmlEntities} from "./formatHtmlEntities";
import {formatJsonValue} from "./formatJsonValue";

export const categories = {
    "1": "oneHanded",
    "2": "twoHanded",
    "3": "halfHanded",
    "4": "distances",
    "5": "auxiliary",
    "6": "wands",
    "7": "staffs",
    "8": "armors",
    "9": "helmets",
    "10": "boots",
    "11": "gloves",
    "12": "rings",
    "13": "necklaces",
    "14": "shields",
    "15": "neutrals",
    "16": "consumable",
    "17": "golds",
    "18": "keys",
    "19": "quests",
    "20": "renewable",
    "21": "arrows",
    "22": "talismans",
    "23": "books",
    "24": "backpacks",
    "25": "blessings",
    "26": "upgrades",
};

export const attributes = {
    "unbind_credits": () => "isUnbindScroll=true",
    "lowheal2turns": (pointsData: string) => `heal2TurnsReduction=${pointsData}`,
    "resmanaendest": (pointsData: string) => `manaEnergyDestroyReduction=${pointsData}`,
    "force_binding": () => "isBindPermamentlyAfterBuy=true",
    "lowcritallval": (pointsData: string) => `critPowerReduction=${pointsData}`,
    "summonparty": () => "isSummonScroll=true",
    "nodepoclan": () => "isNonStoreableInClanDeposit=true",
    "creditsbon": (incrementData: string) => `addDraconite=${incrementData}`,
    "legendary": () => "rarity=legendary",
    "noauction": () => "isNotAuctionable=true",
    "soulbound": () => "isBoundToOwner=true",
    "permbound": () => "isPermamentlyBounded=true",
    "recovered": () => "isRecovered=true",
    "energybon": (pointsData: string) => `energy=${pointsData}`,
    "townlimit": (mapIds: string) => `limitedToMaps=${formatJsonValue(mapIds.split(","))}`,
    "timelimit": (timeData: string) => `cooldownTime=${formatJsonValue(timeData.split(","))}`,
    "afterheal": (healData: string) => `healChanceAfterFight=${formatJsonValue(healData.split(","))}`,
    "lowevade": (pointsData: string) => `enemyEvasionReduction=${pointsData}`,
    "manadest": (percentData: string) => `enemyManaReduction=${percentData}`,
    "reslight": (percentData: string) => `lightResistance=${percentData}`,
    "resfrost": (percentData: string) => `frostResistance=${percentData}`,
    "upgraded": () => "rarity=upgraded",
    "artefact": () => "rarity=artefact",
    "critmval": (pointsData: string) => `magicalCritPower=${pointsData}`,
    "capacity": (maxStackableData: string) => `maxQuantity=${maxStackableData}`,
    "teleport": (teleportData: string) => `teleportTo=${formatJsonValue(teleportData.split(","))}`,
    "fullheal": (remainingPoints: string) => `healRemaining=${remainingPoints}`,
    "goldpack": (incrementData: string) => `addGold=${incrementData}`,
    "resacdmg": (pointsData: string) => `destroyArmorReduction=${pointsData}`,
    "lootbox2": (lootboxData: string) => `previewLootbox=v2,${lootboxData}`,
    "lootbox": (lootboxData: string) => `previewLootbox=v1,${lootboxData}`,
    "created": (timestampData: string) => `lootedAt=${timestampData}`,
    "critval": (percentData: string) => `physicalCritPower=${percentData}`,
    "resfire": (pointsData: string) => `fireResistance=${pointsData}`,
    "lowcrit": (pointsData: string) => `criticalReductionDuringDefending=${pointsData}`,
    "manabon": (pointsData: string) => `mana=${pointsData}`,
    "absorbm": (pointsData: string) => `magicalDamageAbsorption=${pointsData}`,
    "pierceb": (pointsData: string) => `chanceToBlockPuncture=${pointsData}`,
    "perheal": (pointsData: string) => `healthRestorationPercent=${pointsData}`,
    "stamina": (minutesData: string) => `addStamina=${minutesData}`,
    "respred": (pointsData: string) => `fasterRevivalRecovery=${pointsData}`,
    "improve": ([__upgradeType__, percentData]: string[]) => `addEnchancementPoints=${percentData}`,
    "undoupg": () => "isUndoScroll=true",
    "expires": (expireData: string) => `expirationAt=${expireData}`,
    "nodepo": () => "isNonStoreableInDeposit=true",
    "endest": (pointsData: string) => `energyDestroy=${pointsData}`,
    "abdest": (pointsData: string) => `absorptionDestroy=${pointsData}`,
    "contra": (percentData: string) => `chanceToCounter=${percentData}`,
    "poison": (damageData: string) => `poisonDamage=${formatJsonValue(damageData.split(","))}`,
    "legbon": (bonusData: string) => {
        const [bonusName, __bonusLevel__] = bonusData.split(",");
        switch(bonusName) {
            case "holytouch": {
                return `legendaryBon=["angelTouchHealingChance",7]`;
            };
            case "verycrit": {
                return `legendaryBon=["superCriticalHitChance",13]`;
            };
            case "lastheal": {
                return `legendaryBon=["superHealOnLowHealth",18]`;
            };
            case "critred": {
                return `legendaryBon=["superCriticalReduction",16]`;
            };
            case "resgain": {
                return `legendaryBon=["superMagicalReduction",15]`
            };
            case "dmgred": {
                return `legendaryBon=["superPhysicalReduction",16]`
            };
            case "glare": {
                return `legendaryBon=["glareChanceAfterGetHit",9]`
            };
            case "curse": {
                return `legendaryBon=["curseChanceAfterDoHit",9]`
            };
        };
    },
    "lowreq": () => `isLowerLevelScroll=true`,
    "nodesc": () => "isUnidentified=true",
    "resdmg": (percentData: string) => `magicalResistanceReduction=${percentData}`,
    "absorb": (pointsData: string) => `physicalDamageAbsorption=${pointsData}`,
    "revive": (reductionData: string) => `shortenRevival=${reductionData}`,
    "amount": (quantityData: string) => `quantity=${quantityData}`,
    "outfit": (outfitData: string) => {
        const arr = outfitData.split(',');
        const data = {
            time: parseInt(arr[0]),
            src: arr[1]
        }
        return `useOutfit=${JSON.stringify(data)}`
    },
    "heroic": () => "rarity=heroic",
    "unique": () => "rarity=unique",
    "action": (actionData: string) => {
        const [actionName] = actionData.split(",");
        switch(actionName) {
            case "fightperheal": {
                return `combatSelfHeal=${actionData.slice(actionName.length + 1)}`;
            };
            case "fatigue": {
                return `incrementFatigue=${actionData.slice(actionName.length + 1)}`;
            };
            case "deposit": {
                return `openDeposit=true`;
            };
            case "auction": {
                return `openAuction=true`;
            };
            case "nloc": {
                return `npcLocate=${actionData.slice(actionName.length + 1)}`;
            };
            case "flee": {
                return `combatFlee=true`;
            };
            case "mail": {
                return `openMail=true`;
            };
        };
    },
    "expadd": (percentData: string) => `multiplyExperienceAfterNextKill=${percentData}`,
    "pierce": (pointsData: string) => `armorPuncture=${pointsData}`,
    "unbind": () => "isUnbindingScroll=true",
    "cursed": () => "isCursed=true",
    "binds": () => `isBindsAfterEquip=true`,
    "evade": (pointsData: string) => `evadePoints=${pointsData}`,
    "quest": (questId: string) => `needInQuest=${questId}`,
    "wound": (deepWoundData: string) => `deepWoundChance=${formatJsonValue(deepWoundData.split(","))}`,
    "adest": (pointsData: string) => `combatHealthReduction=${pointsData}`,
    "acdmg": (pointsData: string) => `defenseDestroy=${pointsData}`,
    "hpbon": (pointsData: string) => `healthPerStrength=${pointsData}`,
    "light": (damageData: string) => `lightDamage=${damageData}`,
    "frost": (damageData: string) => `frostDamage=${formatJsonValue(damageData.split(","))}`,
    "leczy": (healPointsData: string) => `restoreHealthPoints=${healPointsData}`,
    "runes": (incrementCount: string) => `incrementDraconite=${incrementCount}`,
    // "btype": (bagType: string) => `bagTypes=["${categories[bagType]}"]`,
    "play": (mp3Data: string) => `playAudio=${mp3Data}`,
    "opis": (descriptionData: string) => {
        descriptionData = descriptionData
            .replaceAll("\\n", "<br>")
            .replaceAll("&quot;", '"')
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">");

        return `description=${descriptionData}`
    },
    "slow": (pointsData: string) => `enemyAttackSpeedReduction=${pointsData}`,
    "heal": (pointsData: string) => `combatHealthRestoration=${pointsData}`,
    "ammo": (quantityData: string) => `quantity=${quantityData}`,
    "loot": (lootData: string) => `lootWith=${lootData}`,
    "crit": (percentData: string) => `criticalChance=${percentData}`,
    "pdmg": (damageData: string) => `arrowPhysicalDamage=${damageData}`,
    "fire": (damageData: string) => `fireDamage=${damageData}`,
    "blok": (pointsData: string) => `blockPoints=${pointsData}`,
    "reqp": (professionsData: string) => `needProfessions=${formatJsonValue(professionsData.split(""))}`,
    "reqi": (intellectData: string) => `needIntellect=${intellectData}`,
    "reqs": (strengthData: string) => `needStrength=${strengthData}`,
    "reqz": (agilityData: string) => `needAgility=${agilityData}`,
    "book": (bookId: string) => `openBook=${bookId}`,
    "rkey": (keyId: string) => `keyToMap=${keyId}`,
    "gold": (incrementData: string) => `incrementGold=${incrementData}`,
    "act": (percentData: string) => `poisonResistance=${percentData}`,
    "upg": (percentData: string) => `upgradePercent=${percentData}`,
    "dmg": (damageData: string) => `physicalDamage=${formatJsonValue(damageData.split("-"))}`,
    "lvl": (levelData: string) => `needLevel=${levelData}`,
    "bag": (capacityData: string) => `bagCapacity=${capacityData}`,
    "pet": (petData: string) => `usePet=${petData}`,
    "emo": (emoData: string) => `useEmotion=${emoData}`,
    "da": (pointsData: string) => `allBaseAttributes=${pointsData}`,
    "sa": (pointsData: string) => `attackSpeed=${pointsData}`,
    "di": (pointsData: string) => `intellect=${pointsData}`,
    "ds": (pointsData: string) => `strength=${pointsData}`,
    "dz": (pointsData: string) => `agility=${pointsData}`,
    "ac": (pointsData: string) => `defense=${pointsData}`,
    "hp": (pointsData: string) => `health=${pointsData}`
};