function GroupedInputTable({ rows, onRowChange, onAddRow, onRemoveRow }) {
  return (
    <div className="input-mode-card">
      <div className="input-mode-header">
        <div>
          <label className="label">Dados agrupados por frequência</label>
          <p className="input-helper">
            Informe o valor e quantas vezes ele aparece. Ex: valor 10 com frequência 3.
          </p>
        </div>

        <button type="button" className="secondary-button table-action-button" onClick={onAddRow}>
          Adicionar linha
        </button>
      </div>

      <div className="table-wrapper input-table-wrapper">
        <table className="frequency-table input-table">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Frequência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`grouped-${index}`}>
                <td>
                  <input
                    className="table-input"
                    type="text"
                    placeholder="Ex: 2.5"
                    value={row.value}
                    onChange={(event) => onRowChange(index, "value", event.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="table-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Ex: 3"
                    value={row.frequency}
                    onChange={(event) => onRowChange(index, "frequency", event.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="secondary-button remove-row-button"
                    onClick={() => onRemoveRow(index)}
                    disabled={rows.length === 1}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupedInputTable;
