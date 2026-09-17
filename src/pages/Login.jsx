import { useState } from "react";

/**
 * LoginPage — resident sign-in screen for the gated community app.
 * Shares the same visual language and class prefix (gc-) as RegisterPage,
 * so both can sit in the same app without style collisions or duplicate CSS.
 */

export default function LoginPage({ onLogin, onNavigateToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = {
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? "Enter a valid email." : null,
    password: !form.password ? "Enter your password." : null,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));
  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors) return;

    setServerError("");
    setSubmitting(true);
    try {
      if (onLogin) await onLogin(form);
    } catch (err) {
      setServerError(err?.message || "Couldn't sign you in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="gc-login-page">
      <style>{`
        .gc-login-page {
          height: 100vh;
          height: 100dvh;
          display: flex;
          background: #12161c;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
          overflow: hidden;
        }

        .gc-login-panel-brand {
          position: relative;
          flex: 1 1 40%;
          background: linear-gradient(175deg, #161c24 0%, #0d1116 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.25rem, 3vw, 3rem);
          overflow: hidden;
        }

        .gc-login-panel-brand svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
        }

        .gc-login-brand-mark {
          position: relative;
          z-index: 1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          letter-spacing: 0.02em;
          color: #f2ede2;
        }

        .gc-login-brand-copy {
          position: relative;
          z-index: 1;
          max-width: 26rem;
        }

        .gc-login-brand-copy h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          font-size: clamp(1.3rem, 3vw, 2.1rem);
          line-height: 1.28;
          color: #f2ede2;
          margin: 0 0 0.6rem;
        }

        .gc-login-brand-copy p {
          font-size: clamp(0.82rem, 1.4vw, 0.98rem);
          line-height: 1.55;
          color: #9aa2ae;
          margin: 0;
        }

        .gc-login-panel-form {
          flex: 1 1 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 3vh, 2rem) 1.5rem;
          background: #f7f5f0;
          overflow-y: auto;
          min-height: 0;
        }

        .gc-login-card {
          width: 100%;
          max-width: 24rem;
        }

        .gc-login-card h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.25rem, 2.4vw, 1.5rem);
          font-weight: 500;
          color: #1b1f26;
          margin: 0 0 0.3rem;
        }

        .gc-login-sub {
          font-size: 0.86rem;
          color: #6b7280;
          margin: 0 0 1.3rem;
        }

        .gc-login-field {
          margin-bottom: 0.85rem;
        }

        .gc-login-field-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .gc-login-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: #3a3f47;
        }

        .gc-login-forgot {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.76rem;
          color: #a8823a;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .gc-login-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.65rem 0.85rem;
          font-size: 0.94rem;
          border-radius: 8px;
          border: 1.5px solid #dcd8ce;
          background: #fffefb;
          color: #1b1f26;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .gc-login-field input::placeholder {
          color: #a9a49a;
        }

        .gc-login-field input:focus {
          outline: none;
          border-color: #a8823a;
          box-shadow: 0 0 0 3px rgba(168, 130, 58, 0.18);
        }

        .gc-login-field input[aria-invalid="true"] {
          border-color: #c05a4f;
        }

        .gc-login-field-error {
          margin-top: 0.35rem;
          font-size: 0.8rem;
          color: #b5453b;
        }

        .gc-login-server-error {
          margin-bottom: 0.9rem;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          background: #fbeae8;
          border: 1px solid #e3b8b2;
          color: #9c3b31;
          font-size: 0.84rem;
        }

        .gc-login-submit {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-top: 0.5rem;
          border: none;
          border-radius: 8px;
          background: #1b1f26;
          color: #f7f5f0;
          font-size: 0.96rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .gc-login-submit:hover:not(:disabled) {
          background: #2a303a;
        }

        .gc-login-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .gc-login-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .gc-login-register-line {
          text-align: center;
          margin-top: 1.1rem;
          font-size: 0.86rem;
          color: #6b7280;
        }

        .gc-login-register-line button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          color: #a8823a;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        @media (max-width: 860px) {
          .gc-login-page {
            flex-direction: column;
          }
          .gc-login-panel-brand {
            flex: 0 0 auto;
            padding: 1rem 1.5rem;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .gc-login-panel-brand svg {
            display: none;
          }
          .gc-login-brand-copy {
            display: none;
          }
          .gc-login-panel-form {
            flex: 1 1 auto;
            padding: 1rem 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gc-login-submit {
            transition: none;
          }
        }
      `}</style>

      {/* Left panel: gatehouse motif, same as RegisterPage */}
      <div className="gc-login-panel-brand">
        <svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="gcLoginSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b222c" />
              <stop offset="100%" stopColor="#0d1116" />
            </linearGradient>
          </defs>
          <rect width="500" height="700" fill="url(#gcLoginSky)" />
          <g fill="#1e2530">
            <rect x="20" y="420" width="60" height="280" />
            <rect x="90" y="380" width="50" height="320" />
            <rect x="360" y="400" width="55" height="300" />
            <rect x="425" y="440" width="60" height="260" />
          </g>
          <g fill="#c9a44c" opacity="0.55">
            <rect x="32" y="440" width="8" height="8" />
            <rect x="52" y="460" width="8" height="8" />
            <rect x="32" y="500" width="8" height="8" />
            <rect x="60" y="520" width="8" height="8" />
            <rect x="105" y="410" width="8" height="8" />
            <rect x="120" y="450" width="8" height="8" />
            <rect x="105" y="490" width="8" height="8" />
            <rect x="375" y="430" width="8" height="8" />
            <rect x="392" y="470" width="8" height="8" />
            <rect x="440" y="470" width="8" height="8" />
            <rect x="458" y="510" width="8" height="8" />
          </g>
          <g>
            <path
              d="M120 700 V330 Q120 260 250 260 Q380 260 380 330 V700"
              fill="none"
              stroke="#c9a44c"
              strokeWidth="10"
            />
            <rect x="105" y="690" width="30" height="14" fill="#c9a44c" />
            <rect x="365" y="690" width="30" height="14" fill="#c9a44c" />
            <circle cx="250" cy="330" r="7" fill="#c9a44c" />
          </g>
          <g stroke="#2b3340" strokeWidth="6">
            <line x1="160" y1="400" x2="160" y2="700" />
            <line x1="195" y1="400" x2="195" y2="700" />
            <line x1="230" y1="400" x2="230" y2="700" />
            <line x1="270" y1="400" x2="270" y2="700" />
            <line x1="305" y1="400" x2="305" y2="700" />
            <line x1="340" y1="400" x2="340" y2="700" />
          </g>
        </svg>

        <div className="gc-login-brand-mark">Meridian Court</div>

        <div className="gc-login-brand-copy">
          <h1>Welcome back.</h1>
          <p>
            Sign in to book the clubhouse, track maintenance tickets, approve
            visitor entries, and catch up on notices from your committee.
          </p>
        </div>
      </div>

      {/* Right panel: form */}
      <div className="gc-login-panel-form">
        <div className="gc-login-card">
          <h2>Sign in</h2>
          <p className="gc-login-sub">Use the email and password from your resident account.</p>

          {serverError && <div className="gc-login-server-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="gc-login-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="asha.nair@email.com"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                aria-invalid={!!showError("email")}
              />
              {showError("email") && <div className="gc-login-field-error">{errors.email}</div>}
            </div>

            <div className="gc-login-field">
              <div className="gc-login-field-head">
                <label htmlFor="login-password">Password</label>
                <button type="button" className="gc-login-forgot">
                  Forgot password?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                aria-invalid={!!showError("password")}
              />
              {showError("password") && <div className="gc-login-field-error">{errors.password}</div>}
            </div>

            <button type="submit" className="gc-login-submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="gc-login-register-line">
            New here?{" "}
            <button type="button" onClick={onNavigateToRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}