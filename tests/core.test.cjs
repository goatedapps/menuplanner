const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function runtime() {
  const store = () => { const values = new Map(); return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }; };
  const context = vm.createContext({ TextEncoder, localStorage: store(), sessionStorage: store(), console });
  for (const file of ["data", "storage", "generator", "word-export"]) vm.runInContext(fs.readFileSync(path.join(__dirname, "../js", `${file}.js`), "utf8"), context);
  return context;
}

const planSource = `({version:2,scope:"week",mode:"manual",createdAt:"2026-11-24T00:00:00Z",slots:Object.fromEntries(getSlotsForScope("week").map(slot=>[slot.key,[]])),notes:{},mealNotes:{},customDishes:{},manualOrder:{},includeTags:[],excludeTags:[]})`;

test("existing plans survive and editing a saved plan starts with an independent current copy", () => {
  const c = runtime();
  const result = vm.runInContext(`(() => {
    const original = ${planSource}; original.slots["wed-dinner"]=["drunken-herbal-prawns"];
    savePlan(original); const restored=loadPlan();
    const saved=addSavedPlan("Our week",original);
    sessionStorage.setItem("menuPlanner.pendingChoice","stale");
    openSavedPlan(saved.entry.id); const current=loadPlan();
    current.slots["wed-dinner"].push("white-brown-rice"); savePlan(current);
    const before=loadSavedPlans()[0].plan.slots["wed-dinner"].length;
    const updated=updateSavedPlan(saved.entry.id,current);
    return {restored:restored.version,scope:current.scope,name:current.name,before,after:loadSavedPlans()[0].plan.slots["wed-dinner"].length,count:loadSavedPlans().length,updated:updated.ok,pending:sessionStorage.getItem("menuPlanner.pendingChoice")};
  })()`, c);
  assert.equal(result.restored, 2); assert.equal(result.scope, "week"); assert.equal(result.name, "Our week");
  assert.equal(result.before, 1); assert.equal(result.after, 2); assert.equal(result.count, 1);
  assert.equal(result.updated, true); assert.equal(result.pending, null);
});

test("saved-plan cap remains non-destructive, and clearing the current plan keeps snapshots", () => {
  const c = runtime();
  const result = vm.runInContext(`(() => {
    const plan=${planSource}; for(let i=0;i<10;i++)addSavedPlan("Week "+i,plan);
    const overflow=addSavedPlan("Eleventh",plan);savePlan(plan);clearPlan();
    return {ok:overflow.ok,count:loadSavedPlans().length,first:loadSavedPlans()[0].name,current:loadPlan()};
  })()`, c);
  assert.equal(result.ok, false); assert.equal(result.count, 10); assert.equal(result.first, "Week 0"); assert.equal(result.current, null);
});

test("weekly generation still has ten editable meals and the fixed Tuesday dinner", () => {
  const c = runtime();
  const result = vm.runInContext(`generatePlanSlots(MP_ITEMS,"week",[],[])`, c);
  assert.equal(Object.keys(result.slots).length, 10);
  assert.ok(result.slots["tue-dinner"].includes("yong-tau-foo-bee-tai-mak"));
  for (const ids of Object.values(result.slots)) { assert.ok(ids.length); assert.equal(new Set(ids).size, ids.length); }
});

function unzipStored(bytes) {
  const buffer = Buffer.from(bytes), files = {};
  let offset = 0;
  while (buffer.readUInt32LE(offset) === 0x04034b50) {
    assert.equal(buffer.readUInt16LE(offset + 8), 0);
    const size=buffer.readUInt32LE(offset+18), nameLength=buffer.readUInt16LE(offset+26), extraLength=buffer.readUInt16LE(offset+28);
    const name=buffer.subarray(offset+30,offset+30+nameLength).toString("utf8");
    const start=offset+30+nameLength+extraLength;
    files[name]=buffer.subarray(start,start+size).toString("utf8");offset=start+size;
  }
  assert.equal(buffer.readUInt32LE(offset),0x02014b50);
  assert.equal(buffer.readUInt32LE(buffer.length-22),0x06054b50);
  return files;
}

for (const scope of ["meal", "day", "week"]) {
  test(`real ${scope} DOCX includes all notes, custom dishes, Unicode and no external files`, () => {
    const c = runtime();
    const bytes = vm.runInContext(`(() => {
      const plan=${planSource};plan.scope=${JSON.stringify(scope)};
      plan.slots=Object.fromEntries(getSlotsForScope(plan.scope).map(slot=>[slot.key,[]]));
      const first=getSlotsForScope(plan.scope)[0].key;
      plan.customDishes.custom={id:"custom",name:'Chef’s noodles & "soup" <special>',tags:[]};
      plan.slots[first]=["custom","white-brown-rice"];
      plan.notes[first]={custom:"No chilli & extra broth"};plan.mealNotes[first]="2 adults, 1 child";
      plan.manualOrder[first]=true;
      return buildPlanDocx(plan);
    })()`, c);
    const files=unzipStored(bytes), xml=files["word/document.xml"];
    assert.equal(Object.keys(files).length,5);
    assert.ok(files["[Content_Types].xml"].includes("wordprocessingml.document.main+xml"));
    assert.ok(xml.includes("Chef’s noodles &amp; &quot;soup&quot; &lt;special&gt;"));
    assert.ok(xml.includes("No chilli &amp; extra broth"));assert.ok(xml.includes("2 adults, 1 child"));
    assert.ok(xml.indexOf("Chef’s noodles")<xml.indexOf("White/Brown Rice"));
    assert.ok(!Object.values(files).some(text=>text.includes('TargetMode="External"')));
    if(process.env.MP_TEST_OUTPUT_DIR) {fs.mkdirSync(process.env.MP_TEST_OUTPUT_DIR,{recursive:true});fs.writeFileSync(path.join(process.env.MP_TEST_OUTPUT_DIR,`menu-plan-${scope}.docx`),Buffer.from(bytes));}
  });
}
