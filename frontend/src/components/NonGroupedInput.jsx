function NonGroupedInput({ rawInput, onInputChange }) {
  return (
    <div className="input-mode-card">
      <label htmlFor="numbers" className="label">
        Lista de números
      </label>
      <p className="input-helper">
        Use números separados por vírgula.
      </p>
      <textarea
        id="numbers"
        className="textarea"
        placeholder="Ex: 10, 20, 30, 40, 50"
        value={rawInput}
        onChange={(event) => onInputChange(event.target.value)}
        rows={8}
      />
    </div>
  );
}

export default NonGroupedInput;
