import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = email.includes("@") && email.length > 3;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isEmailValid) return;
    alert("Şifre sıfırlama bağlantısı gönderildi!");
  }

  return (
    <section>
      <p style={{ marginBottom: "20px", color: "#333" }}>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: touched && !isEmailValid ? "red" : "#ccc", backgroundColor: touched && !isEmailValid ? "#fff5f5" : "white" }}
          />
          {touched && !isEmailValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Geçerli bir e-posta girin.</p>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="buton">Bağlantı gönder</button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Link to="/login">← Girişe dön</Link>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordPage;