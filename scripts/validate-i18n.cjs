const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const masterFile = path.join(localesDir, 'en.ts');

const locales = ['ar', 'zh', 'fr', 'de', 'es', 'it', 'pt', 'ru', 'nl'];

function parseTsLocaleObject(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Strip export statement and typescript annotations, then evaluate safely as JS object
  const cleaned = content
    .replace(/export\s+const\s+\w+\s*=\s*/, 'module.exports = ')
    .replace(/export\s+default\s+/, 'module.exports = ');
  
  // Custom sandbox evaluation
  const fn = new Function('module', 'exports', cleaned);
  const moduleObj = { exports: {} };
  fn(moduleObj, moduleObj.exports);
  return moduleObj.exports;
}

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const fullPath = prefix ? `${prefix}.${k}` : k;
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        keys = keys.concat(getAllKeys(obj[k], fullPath));
      } else {
        keys.push({ key: fullPath, value: obj[k] });
      }
    }
  }
  return keys;
}

console.log('\n========================================');
console.log('   Translation Key Validation Report    ');
console.log('========================================\n');

try {
  const masterObj = parseTsLocaleObject(masterFile);
  const masterKeys = getAllKeys(masterObj);
  const masterKeyPaths = new Set(masterKeys.map(k => k.key));

  console.log(`✓ Master English Dictionary (en.ts): ${masterKeys.length} total key paths.\n`);

  let totalErrors = 0;

  for (const locale of locales) {
    const targetFile = path.join(localesDir, `${locale}.ts`);
    if (!fs.existsSync(targetFile)) {
      console.log(`✗ ${locale}: FILE MISSING`);
      totalErrors++;
      continue;
    }

    try {
      const targetObj = parseTsLocaleObject(targetFile);
      const targetKeys = getAllKeys(targetObj);
      const targetKeyPaths = new Set(targetKeys.map(k => k.key));

      const missingKeys = masterKeys.filter(k => !targetKeyPaths.has(k.key));
      const extraKeys = targetKeys.filter(k => !masterKeyPaths.has(k.key));
      const emptyKeys = targetKeys.filter(k => k.value === '' || k.value === null || k.value === undefined);

      if (missingKeys.length === 0 && extraKeys.length === 0 && emptyKeys.length === 0) {
        console.log(`✓ ${locale}: 100% Symmetrical (${targetKeys.length}/${masterKeys.length} keys match master)`);
      } else {
        console.log(`✗ ${locale}: Discrepancies found!`);
        if (missingKeys.length > 0) {
          console.log(`   - Missing (${missingKeys.length}):`);
          missingKeys.slice(0, 10).forEach(m => console.log(`     - ${m.key}`));
          if (missingKeys.length > 10) console.log(`     ... and ${missingKeys.length - 10} more`);
        }
        if (extraKeys.length > 0) {
          console.log(`   - Extra (${extraKeys.length}):`);
          extraKeys.slice(0, 5).forEach(e => console.log(`     - ${e.key}`));
        }
        if (emptyKeys.length > 0) {
          console.log(`   - Empty Values (${emptyKeys.length}):`);
          emptyKeys.slice(0, 5).forEach(e => console.log(`     - ${e.key}`));
        }
        totalErrors += (missingKeys.length + extraKeys.length + emptyKeys.length);
      }
    } catch (err) {
      console.log(`✗ ${locale}: Failed to parse dictionary (${err.message})`);
      totalErrors++;
    }
  }

  console.log('\n========================================');
  if (totalErrors === 0) {
    console.log(' SUCCESS: All locales are 100% aligned with en.ts!');
  } else {
    console.log(` WARNING: Found ${totalErrors} issues across locale files.`);
  }
  console.log('========================================\n');

  process.exit(totalErrors === 0 ? 0 : 1);
} catch (err) {
  console.error('Fatal error during validation:', err);
  process.exit(1);
}
