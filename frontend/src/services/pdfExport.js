import { jsPDF } from "jspdf";
import { getPanelContents } from "../utils/reportSections";
import { formatNumber } from "../utils/formatters";

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
    doc.text(headers[0], margin, cursorY);
    doc.text(headers[1], margin + 90, cursorY);
    cursorY += 6;

    doc.setDrawColor(215, 226, 239);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 6;

    items.forEach((item) => {
      ensureSpace(8);
      doc.setFont("helvetica", "normal");
      doc.text(String(item.first), margin, cursorY);
      doc.text(String(item.second), margin + 90, cursorY);
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

  pdf.addTitle("Calculadora Estatística - Grupo X");
  pdf.addLabelValue("Dados informados", inputSummary);
  pdf.addLabelValue("Valores processados", values.map(formatNumber).join(", "));
  pdf.addDivider();

  sections.forEach((section) => {
    pdf.addSubtitle(section.title);
    pdf.addLabelValue("Fórmula", section.formula);
    pdf.addLabelValue("Cálculo", section.calculation);
    pdf.addLabelValue("Resultado", section.finalResult);

    if (section.steps?.length) {
      pdf.addParagraph("Detalhamento:");
      pdf.addStepList(section.steps);
    }

    if (section.tableItems?.length) {
      pdf.addFrequencyTableWithHeaders(
        section.title,
        section.tableHeaders ?? ["Valor", "Frequência"],
        section.tableItems
      );
    }

    pdf.addDivider();
  });

  pdf.save("calculadora-estatistica-grupo-x.pdf");
}
