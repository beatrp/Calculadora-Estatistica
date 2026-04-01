function IntervalInputTable({ rows, onRowChange, onAddRow, onRemoveRow }) {
  return (
    <div className="input-mode-card">
      <div className="input-mode-header">
        <div>
          <label className="label">Dados por intervalo de classe</label>
          <p className="input-helper">
            Informe o intervalo e a frequência. Ex: 0-10 com frequência 4.
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
              <th>Intervalo</th>
              <th>Frequência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`interval-${index}`}>
                <td>
                  <input
                    className="table-input"
                    type="text"
                    placeholder="Ex: 0-10"
                    value={row.interval}
                    onChange={(event) => onRowChange(index, "interval", event.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="table-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Ex: 4"
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

export default IntervalInputTable;
