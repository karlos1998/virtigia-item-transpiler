export const formatJsonValue = (jsonData: string[]) =>
    JSON.stringify(jsonData.map(entry => (!isNaN(Number(entry)) ? Number(entry) : entry)));