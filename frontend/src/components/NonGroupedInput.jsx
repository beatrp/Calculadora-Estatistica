function NonGroupedInput({ rawInput, onInputChange }) {
  return (
    <div className="input-mode-card">
      <label htmlFor="numbers" className="label">
        Lista de números
      </label>
      <p className="input-helper">
        Use números separados por vírgula. Ex: 2.5, 3.0, 1.5, 4.2
      </p>
      <textarea
        id="numbers"
        className="textarea"
        placeholder="Ex: 2.5, 3.0, 1.5"
        value={rawInput}
        onChange={(event) => onInputChange(event.target.value)}
        rows={8}
      />
    </div>
  );
}

export default NonGroupedInput;
