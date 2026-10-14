export default function ErrorMessage({ message }) {
  return <p className="error">{message || 'Възникна грешка.'}</p>;
}