const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU4ra0hFb21SMk1HdllycC9uL0s3dUZQT0p6Y3MvdWdJbGtiQzRaSWltTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUVjdUtwYUYrcUNEM0N6NGhLRTVzUUoyNzVCR1hvWC9NNTV0REptM3hFST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQWRnc1psMmVVS3RXaWprUDNJUDZFbkZEZUVRZjRyWngzcllGMnVpMTBjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3NHpES2tZMEdGZVdIS2dIekF2VVFvVE52cjAxcUM5MXljRjRGSmVWZzNVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVJa2dBa2t2d2xyRFdiL1hPRWJGY0VNd3pFallzUjM1TGtoSWxTa2dyR1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ild1dE9GZXJFQ3pnZmJ0QmI4VC9XZFpTTmJlYUlkN0xJNkxsOFFmajhwbkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEhQeVRlWUllb3orait0SHZyM2xkT2dWSTlKcGl2d0VBRGdSS0dsMERVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVhZWGFQcFVZK0ZEbmNkZWpEeFNiOEdEU2dEWkVsOGFvQ0tjYXRZZlVHaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBNZ01IMVlaOTFKbjVSRVdMK3RXZFdJYzVPUW5hUDFPRHErWE9DUDMwTG1DdENvVHY4K1JuNVNWUmV0WXFiSXIxUlNrSXhvM1NwWllGMGREejFxb0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJHSGNJanEyRi9FeFZ4ZXNxNmN5dUxmQ1ptZXJ5TWJidG5rRzdVUk9pTlY4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxUzdjelhyNlQ0cTJDNGQ5VmhmbnVBIiwicGhvbmVJZCI6IjZjMWI3MTMyLTNjMmMtNGU2YS1hMDk3LWRjZDY2ZmFmMmZlNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKN0o5Y0pkbVFlL3lvUWplVlF6ZDd5eTRDcEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjVqcjBXMm93SSs2UGdmK3RYTHkxK1BlUU5jPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJDSzQ4V1NLIiwibWUiOnsiaWQiOiIyMzQ3MDQxMDM5MzY3OjU0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmbHwnZm78J2ahPCdmbQg8J2Zs/CdmbTwnZm88J2ZvvCdmb0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08zRjhMRUNFTkxxazdZR0dBNGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkZZZlVUWk5vV0tLbzNpUDNqTTlIQTRMUUFYNHpBOGE1bzM5WjlqU3ZGMjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdMRk1CTVJyNkVEUnJtY2NVa1VsRm9ldzh4bHJ6eDYzWTh2bEYxMEFFTzJ1WGVuSDk1U0NQNlJGSnhZN2FjdVZVeXU5R2dOY1FCVDRlbGltRFE5R0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPd1dZN0JDazA4ZFlDZW4zZy9malY0clpHQ2JOVnlWUHhlNTF6UTk4NnMxaEdTVFFVQklrOVdEMHJDMS9lQUMwYmFhZFRFOXc0WHVhbTRtaWFSR3lDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDEwMzkzNjc6NTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUldIMUUyVGFGaWlxTjRqOTR6UFJ3T0MwQUYrTXdQR3VhTi9XZlkwcnhkdCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDE4MzkwMywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFSHAifQ==',
    PREFIXE: process.env.PREFIX || "$",
    OWNER_NAME: process.env.OWNER_NAME || "𝙱𝙻𝚄𝙴 𝙳𝙴𝙼𝙾𝙽",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝙱𝙻𝚄𝙴 𝙳𝙴𝙼𝙾𝙽",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝙳𝙴𝙼𝙾𝙽-md',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/74b7b653e641e0cdd03c0.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || 'available',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


