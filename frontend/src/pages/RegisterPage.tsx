import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = email.includes("@") && email.length > 3;
  const isPasswordValid = password.length >= 6;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isNameValid || !isEmailValid || !isPasswordValid) return;
    alert("Kayıt başarılı!");
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-grup">
          <label htmlFor="name">Ad Soyad</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ borderColor: touched && !isNameValid ? "red" : "#ccc", backgroundColor: touched && !isNameValid ? "#fff5f5" : "white" }}
          />
          {touched && !isNameValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Ad soyad en az 3 karakter olmalı.</p>
          )}
        </div>

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

        <div className="form-grup">
          <label htmlFor="confirmPassword">Şifre (tekrar)</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="buton">Kayıt ol</button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;