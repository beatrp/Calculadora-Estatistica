import { jsPDF } from "jspdf";
import { getCalculationExplanation } from "../utils/calculationExplanation";
import { getPanelContents } from "../utils/reportSections";

function createPdfHelpers(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let cursorY = 20;

  function ensureSpace(requiredHeight = 10) {
    if (cursorY + requiredHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
  }

  function addTitle(text) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(text, margin, cursorY);
    cursorY += 10;
  }

  function addSubtitle(text) {
    ensureSpace(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(text, margin, cursorY);
    cursorY += 7;
  }

  function addLabelValue(label, value) {
    ensureSpace(8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${label}:`, margin, cursorY);
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(String(value), pageWidth - margin * 2);
    doc.text(wrapped, margin + 24, cursorY);
    cursorY += wrapped.length * 6;
  }

  function addParagraph(text, indent = 0) {
    ensureSpace(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const wrapped = doc.splitTextToSize(String(text), pageWidth - margin * 2 - indent);
    doc.text(wrapped, margin + indent, cursorY);
    cursorY += wrapped.length * 6;
  }

  function addStepList(steps) {
    steps.forEach((step, index) => {
      addParagraph(`${index + 1}. ${step}`);
    });
  }

  function addDivider() {
    ensureSpace(8);
    doc.setDrawColor(215, 226, 239);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 8;
  }

  function addFrequencyTable(items) {
    addFrequencyTableWithHeaders("Tabela de Frequência", ["Valor", "Frequência"], items);
  }

  function addFrequencyTableWithHeaders(title, headers, items) {
    addSubtitle(title);

    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const columnWidth = (pageWidth - margin * 2) / headers.length;

    headers.forEach((header, index) => {
      doc.text(String(header), margin + index * columnWidth, cursorY);
    });
    cursorY += 6;

    doc.setDrawColor(215, 226, 239);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 6;

    items.forEach((item) => {
      ensureSpace(8);
      doc.setFont("helvetica", "normal");
      const values = Array.isArray(item)
        ? item
        : headers.map((header, index) => item[header] ?? item[index] ?? "-");

      values.forEach((value, index) => {
        doc.text(String(value), margin + index * columnWidth, cursorY);
      });
      cursorY += 7;
    });
  }

  return {
    addTitle,
    addSubtitle,
    addLabelValue,
    addParagraph,
    addStepList,
    addDivider,
    addFrequencyTable,
    addFrequencyTableWithHeaders,
    save(filename) {
      doc.save(filename);
    },
  };
}

export function exportStatisticsPdf({
  inputSummary,
  selectedDataType,
  values,
  result,
  processedData,
}) {
  const doc = new jsPDF();
  const pdf = createPdfHelpers(doc);
  const sections = getPanelContents("geral", selectedDataType, values, result, processedData);
  const tableSection = sections.find((section) => section.tableItems);
  const resultSections = sections.filter((section) => !section.tableItems);
  const explanationItems = getCalculationExplanation(values, result);

  pdf.addTitle("Calculadora Estatística - Grupo X");
  pdf.addLabelValue("Dados informados", `${values.length} valores informados`);
  pdf.addDivider();

  if (tableSection?.tableItems?.length) {
    pdf.addFrequencyTableWithHeaders(
      tableSection.title,
      tableSection.tableHeaders ?? ["Valor", "Frequência"],
      tableSection.tableItems
    );
    pdf.addDivider();
  }

  pdf.addSubtitle("Resultados finais");
  resultSections.forEach((section) => {
    pdf.addLabelValue(section.title, section.finalResult);
  });
  pdf.addDivider();

  pdf.addSubtitle("Como foi calculado");
  explanationItems.forEach((item) => {
    pdf.addLabelValue(item.title, `${item.formula}. ${item.text}`);
  });

  pdf.save("calculadora-estatistica-grupo-x.pdf");
}
