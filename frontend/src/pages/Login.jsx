import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import * as authService from '../services/authService';

// ─── Inline styles ───────────────────────────────────────────────────────────

const styles = {
  /* Outer wrapper */
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  /* ── Left column ── */
  leftCol: {
    flex: '0 0 50%',
    backgroundColor: '#0A58CA',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 40px',
    position: 'relative',
    overflow: 'hidden',
  },
  /* Decorative blobs */
  blob1: {
    position: 'absolute',
    top: '-80px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    bottom: '-100px',
    right: '-60px',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    pointerEvents: 'none',
  },
  blob3: {
    position: 'absolute',
    top: '40%',
    right: '-40px',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    pointerEvents: 'none',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '16px',
    zIndex: 1,
  },
  logoIcon: {
    fontSize: '52px',
    lineHeight: 1,
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
  },
  logoText: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    lineHeight: 1.1,
  },
  tagline: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: '48px',
    letterSpacing: '0.3px',
    zIndex: 1,
  },
  illustrationArea: {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  buildingEmoji: {
    fontSize: '96px',
    lineHeight: 1,
    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
    animation: 'floatUp 3s ease-in-out infinite',
  },
  buildingCaption: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },

  /* Feature pills */
  featurePills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '32px',
    zIndex: 1,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.9)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.15)',
  },

  /* ── Right column ── */
  rightCol: {
    flex: '0 0 50%',
    backgroundColor: '#F8F9FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    overflowY: 'auto',
  },

  /* Login card */
  card: {
    width: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '40px 36px',
    boxShadow: '0 8px 40px rgba(10,88,202,0.10), 0 2px 8px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    marginBottom: '28px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    marginBottom: '6px',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#6c757d',
  },

  /* Form */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#495057',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '13px',
    color: '#adb5bd',
    pointerEvents: 'none',
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: '44px',
    border: '1.5px solid #dee2e6',
    borderRadius: '8px',
    padding: '0 42px 0 42px',
    fontSize: '14px',
    color: '#212529',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  eyeButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#adb5bd',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.15s ease',
  },
  fieldError: {
    fontSize: '12px',
    color: '#dc3545',
    marginTop: '2px',
  },

  /* Remember + forgot row */
  rememberRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#495057',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: {
    width: '15px',
    height: '15px',
    accentColor: '#0A58CA',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#0A58CA',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  },

  /* Submit button */
  submitButton: {
    width: '100%',
    height: '46px',
    backgroundColor: '#0A58CA',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
    boxShadow: '0 4px 14px rgba(10,88,202,0.35)',
    letterSpacing: '0.3px',
  },
  submitButtonDisabled: {
    backgroundColor: '#6ea8fe',
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'none',
  },

  /* Error alert */
  errorAlert: {
    backgroundColor: '#fff5f5',
    border: '1px solid #f5c6cb',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '13px',
    color: '#dc3545',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  /* Spinner */
  spinner: {
    width: '18px',
    height: '18px',
    border: '2.5px solid rgba(255,255,255,0.35)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  },

  /* Footer */
  cardFooter: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#adb5bd',
  },
};

// ─── Keyframe injection ───────────────────────────────────────────────────────

const injectKeyframes = () => {
  if (document.getElementById('login-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'login-keyframes';
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes floatUp {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    .login-input:focus {
      border-color: #0A58CA !important;
      box-shadow: 0 0 0 3px rgba(10,88,202,0.12) !important;
    }
    .login-input.error:focus {
      border-color: #dc3545 !important;
      box-shadow: 0 0 0 3px rgba(220,53,69,0.12) !important;
    }
    .login-submit-btn:not(:disabled):hover {
      background-color: #0846a8 !important;
      box-shadow: 0 6px 18px rgba(10,88,202,0.45) !important;
    }
    .login-submit-btn:not(:disabled):active {
      transform: translateY(1px) !important;
    }
    .login-eye-btn:hover {
      color: #495057 !important;
    }
  `;
  document.head.appendChild(style);
};

// ─── Component ────────────────────────────────────────────────────────────────

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Inject CSS keyframes once
  useEffect(() => {
    injectKeyframes();
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (formData) => {
    setServerError('');
    setIsLoading(true);
    try {
      const response = await authService.login({
        email: formData.email,
        matKhau: formData.password,
      });

      // api interceptor returns response body directly (e.g. { success, data: { token, user } })
      login(response.data || response);

      if (formData.rememberMe) {
        localStorage.setItem('homestay_remember', formData.email);
      } else {
        localStorage.removeItem('homestay_remember');
      }

      toast.success('Đăng nhập thành công! Chào mừng trở lại 👋');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.message ||
        err?.error ||
        'Sai email hoặc mật khẩu. Vui lòng thử lại.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* ── Left column ── */}
      <div style={styles.leftCol}>
        {/* Decorative blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.blob3} />

        {/* Logo */}
        <div style={styles.logoArea}>
          <span style={styles.logoIcon}>🏠</span>
          <span style={styles.logoText}>HomeStay Dorm</span>
        </div>

        {/* Tagline */}
        <p style={styles.tagline}>Hệ thống quản lý nhà trọ thông minh</p>

        {/* Building illustration */}
        <div style={styles.illustrationArea}>
          <span style={styles.buildingEmoji} role="img" aria-label="building">
            🏢
          </span>
          <span style={styles.buildingCaption}>Quản lý chuyên nghiệp</span>
        </div>

        {/* Feature pills */}
        <div style={styles.featurePills}>
          {['Quản lý phòng', 'Hợp đồng số', 'Hóa đơn tự động', 'Báo cáo thời gian thực'].map(
            (f) => (
              <span key={f} style={styles.pill}>
                {f}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Right column ── */}
      <div style={styles.rightCol}>
        <div style={styles.card}>
          {/* Card header */}
          <div style={styles.cardHeader}>
            <h1 style={styles.cardTitle}>Đăng nhập hệ thống</h1>
            <p style={styles.cardSubtitle}>
              Nhập thông tin tài khoản để tiếp tục
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <div style={{ ...styles.errorAlert, marginBottom: '16px' }}>
              <span>⚠️</span>
              <span>{serverError}</span>
            </div>
          )}

          {/* Form */}
          <form
            style={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Email */}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <div style={styles.inputWrapper}>
                <FiUser size={16} style={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@homestay.com"
                  className={`login-input${errors.email ? ' error' : ''}`}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                  {...register('email', {
                    required: 'Email không được để trống',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email không đúng định dạng',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span style={styles.fieldError}>{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Mật khẩu
              </label>
              <div style={styles.inputWrapper}>
                <FiLock size={16} style={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`login-input${errors.password ? ' error' : ''}`}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                  }}
                  {...register('password', {
                    required: 'Mật khẩu không được để trống',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự',
                    },
                  })}
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span style={styles.fieldError}>{errors.password.message}</span>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div style={styles.rememberRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  {...register('rememberMe')}
                />
                Ghi nhớ đăng nhập
              </label>
              <button type="button" style={styles.forgotLink}>
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
              style={{
                ...styles.submitButton,
                ...(isLoading ? styles.submitButtonDisabled : {}),
              }}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner} />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.cardFooter}>
            © {new Date().getFullYear()} HomeStay Dorm System. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
