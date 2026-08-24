const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const masterFile = path.join(localesDir, 'en.ts');

const locales = ['ar', 'zh', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'nl'];

function parseTsLocaleObject(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const cleaned = content
    .replace(/export\s+const\s+\w+\s*=\s*/, 'module.exports = ')
    .replace(/export\s+default\s+/, 'module.exports = ');
  
  try {
    const fn = new Function('module', 'exports', cleaned);
    const moduleObj = { exports: {} };
    fn(moduleObj, moduleObj.exports);
    return moduleObj.exports;
  } catch (e) {
    console.error(`Error parsing ${filePath}:`, e.message);
    return {};
  }
}

function syncStructure(master, target) {
  if (typeof master !== 'object' || master === null) {
    return typeof target === 'string' && target.trim() !== '' ? target : master;
  }

  const result = {};
  for (const key of Object.keys(master)) {
    const masterVal = master[key];
    const targetVal = target ? target[key] : undefined;

    if (typeof masterVal === 'object' && masterVal !== null && !Array.isArray(masterVal)) {
      result[key] = syncStructure(masterVal, typeof targetVal === 'object' ? targetVal : {});
    } else {
      if (typeof targetVal === 'string' && targetVal.trim() !== '') {
        result[key] = targetVal;
      } else {
        result[key] = masterVal; // Fallback to master (English) value
      }
    }
  }
  return result;
}

function stringifyLocaleObject(varName, obj) {
  return `export const ${varName} = ${JSON.stringify(obj, null, 2)};\n`;
}

console.log('Synchronizing all locale files to match master en.ts schema...');

const masterObj = parseTsLocaleObject(masterFile);

locales.forEach(loc => {
  const filePath = path.join(localesDir, `${loc}.ts`);
  const existingObj = parseTsLocaleObject(filePath);
  const syncedObj = syncStructure(masterObj, existingObj);
  const formattedContent = stringifyLocaleObject(loc, syncedObj);
  fs.writeFileSync(filePath, formattedContent, 'utf8');
  console.log(`✓ Synchronized ${loc}.ts`);
});

console.log('Locale synchronization complete!');
