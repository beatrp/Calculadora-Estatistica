function ActionButtons({ isLoading }) {
  return (
    <div className="action-buttons" aria-label="Ações de cálculo">
      <button
        type="submit"
        className="primary-button action-button"
        disabled={isLoading}
      >
        {isLoading ? "Calculando..." : "Calcular"}
      </button>
    </div>
  );
}

export default ActionButtons;
