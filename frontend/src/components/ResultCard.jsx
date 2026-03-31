function ResultCard({ label, value }) {
  return (
    <article className="result-card">
      <span className="result-label">{label}</span>
      <strong className="result-value">{value}</strong>
    </article>
  );
}

export default ResultCard;
