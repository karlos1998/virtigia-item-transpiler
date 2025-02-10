import fs from "fs";
import pool from "./db";
import { categories, attributes } from "./static";
import { RowDataPacket } from "mysql2";
import maps from "./maps.json";
import {formatHtmlEntities} from "./formatHtmlEntities"; // Import JSON z mapami

const BATCH_SIZE = 100; // Ilość rekordów w jednej partii
const LOG_FILE = "logs.txt";

// 📌 Interfejsy dla typowania
interface MapData {
    id: number;
    name: string;
}

interface ItemData {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    attributes: Record<string, any>;
    category: string;
    currency: "gold" | "unset";
    rarity: string;
    price: string;
    icon: string;
}

const allMaps: MapData[] = maps as MapData[];

interface BaseItem extends RowDataPacket {
    id: number;
    name: string;
    stats: string;
    pr: string;
    cl: keyof typeof categories;
    icon: string;
    created_at: string;
    updated_at: string;
    attributes: string;
}

// 📌 Logowanie zmian do pliku i konsoli
const logChange = (id: number, oldValue: string, newValue: string) => {
    const oldObj = JSON.parse(oldValue || "{}");
    const newObj = JSON.parse(newValue || "{}");

    const added: Record<string, any> = {};
    const removed: Record<string, any> = {};
    const changed: Record<string, { old: any; new: any }> = {};

    // Sprawdzanie usuniętych i zmienionych kluczy
    for (const key in oldObj) {
        if (!(key in newObj)) {
            removed[key] = oldObj[key]; // Usunięte pole
        } else if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
            changed[key] = { old: oldObj[key], new: newObj[key] }; // Zmienione pole
        }
    }

    // Sprawdzanie dodanych kluczy
    for (const key in newObj) {
        if (!(key in oldObj)) {
            added[key] = newObj[key]; // Dodane pole
        }
    }

    const logEntry = `ID: ${id}\n` +
        (Object.keys(added).length ? `🟢 Dodane: ${JSON.stringify(added, null, 2)}\n` : "") +
        (Object.keys(removed).length ? `🔴 Usunięte: ${JSON.stringify(removed, null, 2)}\n` : "") +
        (Object.keys(changed).length ? `🟡 Zmienione: ${JSON.stringify(changed, null, 2)}\n` : "");

    if (logEntry.trim()) {
        console.log(logEntry);
        fs.appendFileSync(LOG_FILE, logEntry);
    }
};


// 📌 Aktualizacja tylko jeśli `attributes` się zmieniły
const updateItemIfChanged = async (item: BaseItem, newAttributes: object, itemData: ItemData) => {
    const newAttributesString = JSON.stringify(newAttributes);

    if (newAttributesString !== item.attributes) {
        logChange(item.id, item.attributes, newAttributesString);
        await pool.query("UPDATE base_items SET attributes = ?, category = ?, currency = ?, rarity = ? WHERE id = ?", [newAttributesString, itemData.category, itemData.currency, itemData.rarity, item.id]);
    }
};

// 📌 Tworzenie nowych `attributes`
const generateAttributes = (stats: string) => {
    const attributesObj: Record<string, any> = {};

    formatHtmlEntities(stats)
        .split(";")
        .filter(entry => entry)
        .forEach(attributeValue => {
            const [attributeName, attributeData] = attributeValue.split("=");

            const transpiler = attributes[attributeName as keyof typeof attributes];

            if (!transpiler) return;


            let transpiled: string;
            if (typeof transpiler === "function") {
                // @ts-ignore
                transpiled = transpiler(attributeData);
            } else {
                transpiled = transpiler as string;
            }

            if (!transpiled) return;

            const [statName, statData] = transpiled.split("=");
            try {
                attributesObj[statName] = JSON.parse(statData);
            } catch {
                attributesObj[statName] = statData || "true";
            }
        });

    // 🗺 Obsługa teleportacji (dodajemy nazwę mapy)
    if ("teleportTo" in attributesObj) {
        const mapId = attributesObj.teleportTo[0];
        const mapData = allMaps.find((map) => map.id === Number(mapId));
        if (mapData) {
            attributesObj.teleportTo.push(mapData.name);
        }
    }

    // 🔑 Obsługa kluczy do mapy (dodajemy `keyDescription`)
    if ("keyToMap" in attributesObj) {
        const mapId = attributesObj.keyToMap;
        const mapData = allMaps.find((map) => map.id === Number(mapId));
        if (mapData) {
            attributesObj.keyDescription = mapData.name;
        }
    }

    return attributesObj;
};

// 📌 Procesowanie partii rekordów
const processBatch = async (batch: BaseItem[]) => {
    for (const item of batch) {
        const { id, name, stats, pr, cl, icon, created_at, updated_at } = item;

        // if(id != 27035) continue;

        const itemData: ItemData = {
            createdAt: created_at,
            updatedAt: updated_at,
            attributes: generateAttributes(stats),
            category: categories[cl] || "unknown",
            currency: "gold",
            rarity: "common",
            price: pr,
            icon,
            name,
            id,
        };

        if (itemData.category === "golds") {
            itemData.currency = "unset";
            itemData.price = "unset";
        }


        if ("rarity" in itemData.attributes) {
            delete itemData.attributes.rarity;
        }

        // Sprawdza, czy trzeba aktualizować `attributes`
        await updateItemIfChanged(item, itemData.attributes, itemData);
    }
};

// 📌 Pobieranie rekordów partiami i przetwarzanie
const fetchItemsInBatches = async () => {

    fs.writeFileSync(LOG_FILE, "");

    let offset = 0;
    let hasMoreRecords = true;

    while (hasMoreRecords) {
        try {
            const [rows] = await pool.query<BaseItem[]>(`SELECT * FROM base_items LIMIT ? OFFSET ?`, [BATCH_SIZE, offset]);

            if (Array.isArray(rows) && rows.length > 0) {
                await processBatch(rows);
                offset += BATCH_SIZE;
            } else {
                hasMoreRecords = false;
            }
        } catch (error) {
            console.error("Błąd podczas pobierania rekordów:", error);
            hasMoreRecords = false;
        }
    }

    await pool.end();
    console.log("Zakończono aktualizację rekordów.");
};

// Startujemy proces
fetchItemsInBatches();
