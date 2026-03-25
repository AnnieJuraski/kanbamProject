import "./Button.css";
function Button({ children, onClick, variant = "default" }) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
