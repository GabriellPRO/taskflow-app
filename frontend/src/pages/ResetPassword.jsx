import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import { authAPI } from '../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('As senhas não correspondem!');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authAPI.resetPassword(token, { password });
      alert('Senha alterada com sucesso! Faça login com sua nova senha.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="container">
        <div className="card">
          <h1>Redefinir senha</h1>
          <p className="form-description">Digite sua nova senha</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Nova senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Alterando...' : 'Redefinir senha'}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="link-text">
            <a href="/login">Voltar ao login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
