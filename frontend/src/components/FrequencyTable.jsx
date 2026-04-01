function FrequencyTable({ selectedAction, items, headers = ["Valor", "Frequência"] }) {
  const normalizedAction = selectedAction?.toLowerCase();

  if (!["tabela", "geral"].includes(normalizedAction) || !items?.length) {
    return null;
  }

  const normalizedItems = items.map((item) =>
    Array.isArray(item)
      ? item.map((value) => value ?? "-")
      : headers.map((header, index) => item[header] ?? item[index] ?? "-")
  );

  return (
    <div className="table-wrapper">
      <table className="frequency-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedItems.map((item, rowIndex) => (
            <tr key={`${item.join("-")}-${rowIndex}`}>
              {item.map((value, cellIndex) => (
                <td key={`${headers[cellIndex]}-${rowIndex}`}>{value ?? "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FrequencyTable;
