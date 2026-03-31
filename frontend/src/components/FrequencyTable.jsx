function FrequencyTable({ selectedAction, items, headers = ["Valor", "Frequência"] }) {
  const normalizedAction = selectedAction?.toLowerCase();

  if (!["tabela", "geral"].includes(normalizedAction) || !items?.length) {
    return null;
  }

  return (
    <div className="table-wrapper">
      <table className="frequency-table">
        <thead>
          <tr>
            <th>{headers[0]}</th>
            <th>{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.first}-${item.second}`}>
              <td>{item.first}</td>
              <td>{item.second}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FrequencyTable;
