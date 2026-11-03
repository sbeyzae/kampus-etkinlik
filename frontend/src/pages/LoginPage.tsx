import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = email.includes("@") && email.length > 3;
  const isPasswordValid = password.length >= 6;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isEmailValid || !isPasswordValid) return;
    alert("Giriş yapıldı!");
  }

  return (
    <section>
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

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: touched && !isPasswordValid ? "red" : "#ccc", backgroundColor: touched && !isPasswordValid ? "#fff5f5" : "white" }}
          />
          {touched && !isPasswordValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Şifre en az 6 karakter olmalı.</p>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="buton">Giriş yap</button>
        </div>

        <div style={{ marginTop: "15px", display: "flex", gap: "20px" }}>
          <Link to="/forgot-password">Şifremi unuttum</Link>
          <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
        </div>
      </form>
    </section>
  );
}

export default LoginPage;