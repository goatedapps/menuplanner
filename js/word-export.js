// A genuine, self-contained Word document (OOXML in a ZIP package).
// Text-only menus need no media files, HTML conversion, network, or build step.
function mpXml(value) {
  return String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function mpZipFiles(files) {
  const encoder = new TextEncoder();
  const chunks = [], directory = [];
  let offset = 0, directorySize = 0;
  const header = size => new DataView(new ArrayBuffer(size));
  const crc32 = bytes => {
    let crc = 0xffffffff;
    for (const byte of bytes) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  for (const [path, content] of Object.entries(files)) {
    const name = encoder.encode(path), bytes = encoder.encode(content), crc = crc32(bytes);
    const local = header(30);
    local.setUint32(0, 0x04034b50, true); local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); local.setUint16(12, 33, true);
    local.setUint32(14, crc, true); local.setUint32(18, bytes.length, true);
    local.setUint32(22, bytes.length, true); local.setUint16(26, name.length, true);
    chunks.push(new Uint8Array(local.buffer), name, bytes);
    const central = header(46);
    central.setUint32(0, 0x02014b50, true); central.setUint16(4, 20, true);
    central.setUint16(6, 20, true); central.setUint16(8, 0x0800, true);
    central.setUint16(14, 33, true); central.setUint32(16, crc, true);
    central.setUint32(20, bytes.length, true); central.setUint32(24, bytes.length, true);
    central.setUint16(28, name.length, true); central.setUint32(42, offset, true);
    directory.push(new Uint8Array(central.buffer), name);
    directorySize += 46 + name.length;
    offset += 30 + name.length + bytes.length;
  }
  const end = header(22), count = Object.keys(files).length;
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, count, true);
  end.setUint16(10, count, true); end.setUint32(12, directorySize, true);
  end.setUint32(16, offset, true);
  const result = new Uint8Array(offset + directorySize + 22);
  let position = 0;
  for (const chunk of [...chunks, ...directory, new Uint8Array(end.buffer)]) {
    result.set(chunk, position); position += chunk.length;
  }
  return result;
}

function buildPlanDocx(plan) {
  const paragraph = (text, { bold = false, italic = false, white = false } = {}) =>
    `<w:p><w:pPr><w:spacing w:after="0"/></w:pPr><w:r><w:rPr>${bold ? "<w:b/>" : ""}${italic ? "<w:i/>" : ""}<w:color w:val="${white ? "FFFFFF" : "000000"}"/><w:sz w:val="26"/></w:rPr><w:t xml:space="preserve">${mpXml(text)}</w:t></w:r></w:p>`;
  function meal(slotKey) {
    const items = (plan.slots[slotKey] || []).map(id => getItemById(MP_ITEMS, id) || plan.customDishes?.[id]).filter(Boolean);
    if (!plan.manualOrder?.[slotKey]) items.sort((a, b) => Number(!!b.isCarbohydrate) - Number(!!a.isCarbohydrate));
    let body = plan.mealNotes?.[slotKey] ? paragraph(plan.mealNotes[slotKey], { italic: true }) : "";
    body += items.length ? items.map(item => paragraph(`• ${item.name}${plan.notes?.[slotKey]?.[item.id] ? ` (${plan.notes[slotKey][item.id]})` : ""}`)).join("") : paragraph("—");
    return body;
  }
  const cell = (body, width, shaded = false) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/><w:vAlign w:val="top"/>${shaded ? '<w:shd w:fill="000000"/>' : ""}</w:tcPr>${body}</w:tc>`;
  const row = (cells, heading = false) => `<w:tr><w:trPr><w:cantSplit/>${heading ? "<w:tblHeader/>" : ""}</w:trPr>${cells}</w:tr>`;
  const widths = plan.scope === "week" ? [1466, 4500, 4500] : [2000, 8466];
  let rows = "";
  if (plan.scope === "week") {
    rows += row(["Day", "Lunch", "Dinner"].map((label, i) => cell(paragraph(label, { bold: true, white: true }), widths[i], true)).join(""), true);
    getWeekdayRows().forEach(day => {
      rows += row(cell(paragraph(day.label, { bold: true }), widths[0]) + cell(meal(day.lunchKey), widths[1]) + cell(meal(day.dinnerKey), widths[2]));
    });
  } else {
    getSlotsForScope(plan.scope).forEach(slot => { rows += row(cell(paragraph(slot.label, { bold: true }), widths[0]) + cell(meal(slot.key), widths[1])); });
  }
  const borders = ["top", "left", "bottom", "right", "insideH", "insideV"].map(side => `<w:${side} w:val="single" w:sz="6" w:color="000000"/>`).join("");
  const table = `<w:tbl><w:tblPr><w:tblW w:w="10466" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders>${borders}</w:tblBorders><w:tblCellMar><w:top w:w="100" w:type="dxa"/><w:left w:w="90" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map(width => `<w:gridCol w:w="${width}"/>`).join("")}</w:tblGrid>${rows}</w:tbl>`;
  const decl = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  const ns = "http://schemas.openxmlformats.org";
  return mpZipFiles({
    "[Content_Types].xml": `${decl}<Types xmlns="${ns}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`,
    "_rels/.rels": `${decl}<Relationships xmlns="${ns}/package/2006/relationships"><Relationship Id="rId1" Type="${ns}/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
    "word/document.xml": `${decl}<w:document xmlns:w="${ns}/wordprocessingml/2006/main"><w:body>${table}<w:p/><w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`,
    "word/styles.xml": `${decl}<w:styles xmlns:w="${ns}/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="26"/><w:color w:val="000000"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults></w:styles>`,
    "word/_rels/document.xml.rels": `${decl}<Relationships xmlns="${ns}/package/2006/relationships"><Relationship Id="rId1" Type="${ns}/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`
  });
}

function downloadPlanDocx(plan) {
  const blob = new Blob([buildPlanDocx(plan)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  const url = URL.createObjectURL(blob), link = document.createElement("a");
  link.href = url; link.download = `menu-plan-${plan.scope}.docx`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
