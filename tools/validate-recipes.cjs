// Optional authoring check. Nothing here runs in the browser or builds the app.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../recipes.js'), 'utf8'), context, {timeout: 1000});
const recipes = context.window.RECIPES;
const errors = [];
const fields = ['id','title','category','description','minutes','yieldLabel','art','tone','tags','ingredients','steps','contributor'].sort();
const ids = new Set();
if (!Array.isArray(recipes) || !recipes.length) throw Error('window.RECIPES must be a nonempty array.');
for (const r of recipes) {
 const name = r.id || '(missing id)';
 const check = (ok, msg) => {if (!ok) errors.push(`${name}: ${msg}`);};
 check(Object.keys(r).sort().join('|')===fields.join('|'), 'fields must match the documented schema');
 check(typeof r.id==='string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id) && !ids.has(r.id), 'ID must be unique kebab-case'); ids.add(r.id);
 for(const k of ['title','description','yieldLabel','contributor']) check(typeof r[k]==='string'&&r[k].trim().length>0, `${k} must be nonempty text`);
 check(r.title?.length>=3&&r.title?.length<=70,'title must be 3–70 characters');
 check(r.description?.length>=15&&r.description?.length<=180,'description must be 15–180 characters');
 check(['cake','cocktail'].includes(r.category),'invalid category');
 check(Number.isInteger(r.minutes)&&r.minutes>=1&&r.minutes<=1440,'invalid total minutes');
 check(['pink','peach','yellow','sage','lavender','orange'].includes(r.tone),'invalid illustration tone');
 check((r.category==='cake'?['layer-cake','bundt','chocolate-cake']:['martini','highball','rocks']).includes(r.art),'illustration must match category');
 for(const [key,min,max] of [['tags',1,5],['ingredients',3,20],['steps',2,10]]) check(Array.isArray(r[key])&&r[key].length>=min&&r[key].length<=max&&r[key].every(x=>typeof x==='string'&&x.trim()),`${key} must contain ${min}–${max} nonempty strings`);
 if(r.category==='cocktail') check(Array.isArray(r.tags)&&['Contains alcohol','Alcohol-free'].filter(t=>r.tags.includes(t)).length===1,'drink must have exactly one alcohol classification');
}
if (errors.length) {console.error(errors.join('\n')); process.exit(1);}
console.log(`Validated ${recipes.length} recipes: schema, IDs, categories, illustration choices, and alcohol labels passed.`);
