import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const isNameValid = name.trim().length >= 3;
  const isEmailValid = email.includes("@") && email.length > 3;
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return;
    
    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
    navigate("/login");
  }

  return (
    <section style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-grup" style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Ad Soyad</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", borderColor: touched && !isNameValid ? "red" : "#ccc", backgroundColor: touched && !isNameValid ? "#fff5f5" : "white", border: "1px solid", borderRadius: "4px" }}
          />
          {touched && !isNameValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Ad soyad en az 3 karakter olmalı.</p>
          )}
        </div>

        <div className="form-grup" style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>E-posta</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", borderColor: touched && !isEmailValid ? "red" : "#ccc", backgroundColor: touched && !isEmailValid ? "#fff5f5" : "white", border: "1px solid", borderRadius: "4px" }}
          />
          {touched && !isEmailValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Geçerli bir e-posta girin.</p>
          )}
        </div>

        <div className="form-grup" style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Şifre</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", borderColor: touched && !isPasswordValid ? "red" : "#ccc", backgroundColor: touched && !isPasswordValid ? "#fff5f5" : "white", border: "1px solid", borderRadius: "4px" }}
          />
          {touched && !isPasswordValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Şifre en az 6 karakter olmalı.</p>
          )}
        </div>

        <div className="form-grup" style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Şifre (tekrar)</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", borderColor: touched && !isConfirmPasswordValid ? "red" : "#ccc", backgroundColor: touched && !isConfirmPasswordValid ? "#fff5f5" : "white", border: "1px solid", borderRadius: "4px" }}
          />
          {touched && !isConfirmPasswordValid && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>Şifreler eşleşmiyor.</p>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="buton" style={{ width: "100%", padding: "10px", background: "#2ecc71", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Kayıt ol</button>
        </div>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
        </div>
      </form>
    </section>
  );
}

export default RegisterPage;