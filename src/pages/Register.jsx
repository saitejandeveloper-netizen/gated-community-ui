import { useState } from "react";

/**
 * RegisterPage — resident sign-up screen for the gated community app.
 *
 * Fields map 1:1 to the existing Spring Boot endpoint:
 *   fullName, email, phone (10 digits), password (min 8 chars), flatNumber
 *
 * Self-contained: styles are scoped under .gc-register-* class names via
 * a single <style> tag, so this drops into any React app with no extra
 * CSS setup. Swap the font stack for a Google Fonts import if you want
 * "Fraunces" for the wordmark — it falls back gracefully without it.
 */

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  flatNumber: "",
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!/^\d{10}$/.test(form.phone)) errors.phone = "Phone must be exactly 10 digits.";
  if (form.password.length < 8) errors.password = "Password needs at least 8 characters.";
  if (!form.flatNumber.trim()) errors.flatNumber = "Enter your flat number.";
  return errors;
}

export default function RegisterPage({ onRegister, onNavigateToLogin }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      flatNumber: true,
    });
    if (hasErrors) return;

    setServerError("");
    setSubmitting(true);
    try {
      if (onRegister) {
        await onRegister(form);
      }
    } catch (err) {
      setServerError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="gc-register-page">
      <style>{`
        .gc-register-page {
          height: 100vh;
          height: 100dvh;
          display: flex;
          background: #12161c;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
          overflow: hidden;
        }

        .gc-panel-brand {
          position: relative;
          flex: 1 1 40%;
          background: linear-gradient(175deg, #161c24 0%, #0d1116 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.25rem, 3vw, 3rem);
          overflow: hidden;
        }

        .gc-panel-brand svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
        }

        .gc-brand-mark {
          position: relative;
          z-index: 1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          letter-spacing: 0.02em;
          color: #f2ede2;
        }

        .gc-brand-copy {
          position: relative;
          z-index: 1;
          max-width: 26rem;
        }

        .gc-brand-copy h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          font-size: clamp(1.3rem, 3vw, 2.1rem);
          line-height: 1.28;
          color: #f2ede2;
          margin: 0 0 0.6rem;
        }

        .gc-brand-copy p {
          font-size: clamp(0.82rem, 1.4vw, 0.98rem);
          line-height: 1.55;
          color: #9aa2ae;
          margin: 0;
        }

        .gc-panel-form {
          flex: 1 1 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 3vh, 2rem) 1.5rem;
          background: #f7f5f0;
          overflow-y: auto;
          min-height: 0;
        }

        .gc-form-card {
          width: 100%;
          max-width: 27rem;
        }

        .gc-form-card h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.25rem, 2.4vw, 1.5rem);
          font-weight: 500;
          color: #1b1f26;
          margin: 0 0 0.3rem;
        }

        .gc-form-sub {
          font-size: 0.86rem;
          color: #6b7280;
          margin: 0 0 1.1rem;
        }

        .gc-field {
          margin-bottom: 0.7rem;
        }

        .gc-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
        }

        .gc-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: #3a3f47;
          margin-bottom: 0.3rem;
        }

        .gc-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.6rem 0.8rem;
          font-size: 0.92rem;
          border-radius: 8px;
          border: 1.5px solid #dcd8ce;
          background: #fffefb;
          color: #1b1f26;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .gc-field input::placeholder {
          color: #a9a49a;
        }

        .gc-field input:focus {
          outline: none;
          border-color: #a8823a;
          box-shadow: 0 0 0 3px rgba(168, 130, 58, 0.18);
        }

        .gc-field input[aria-invalid="true"] {
          border-color: #c05a4f;
        }

        .gc-field-error {
          margin-top: 0.35rem;
          font-size: 0.8rem;
          color: #b5453b;
        }

        .gc-server-error {
          margin-bottom: 0.8rem;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          background: #fbeae8;
          border: 1px solid #e3b8b2;
          color: #9c3b31;
          font-size: 0.84rem;
        }

        .gc-submit {
          width: 100%;
          padding: 0.72rem 1rem;
          margin-top: 0.2rem;
          border: none;
          border-radius: 8px;
          background: #1b1f26;
          color: #f7f5f0;
          font-size: 0.96rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .gc-submit:hover:not(:disabled) {
          background: #2a303a;
        }

        .gc-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .gc-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .gc-login-line {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.86rem;
          color: #6b7280;
        }

        .gc-login-line button {
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
          .gc-register-page {
            flex-direction: column;
          }
          .gc-panel-brand {
            flex: 0 0 auto;
            padding: 1rem 1.5rem;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .gc-panel-brand svg {
            display: none;
          }
          .gc-brand-copy {
            display: none;
          }
          .gc-panel-form {
            flex: 1 1 auto;
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 380px) {
          .gc-field-row {
            grid-template-columns: 1fr;
            gap: 0.7rem 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gc-submit {
            transition: none;
          }
        }
      `}</style>

      {/* Left panel: gatehouse motif */}
      <div className="gc-panel-brand">
        <svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="gcSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1b222c" />
              <stop offset="100%" stopColor="#0d1116" />
            </linearGradient>
          </defs>
          <rect width="500" height="700" fill="url(#gcSky)" />
          {/* distant building silhouettes */}
          <g fill="#1e2530">
            <rect x="20" y="420" width="60" height="280" />
            <rect x="90" y="380" width="50" height="320" />
            <rect x="360" y="400" width="55" height="300" />
            <rect x="425" y="440" width="60" height="260" />
          </g>
          {/* lit windows */}
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
          {/* the gate arch, foreground */}
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
          {/* gate bars */}
          <g stroke="#2b3340" strokeWidth="6">
            <line x1="160" y1="400" x2="160" y2="700" />
            <line x1="195" y1="400" x2="195" y2="700" />
            <line x1="230" y1="400" x2="230" y2="700" />
            <line x1="270" y1="400" x2="270" y2="700" />
            <line x1="305" y1="400" x2="305" y2="700" />
            <line x1="340" y1="400" x2="340" y2="700" />
          </g>
        </svg>

        <div className="gc-brand-mark">Meridian Court</div>

        <div className="gc-brand-copy">
          <h1>One key, every gate.</h1>
          <p>
            Register once to book the clubhouse, raise a maintenance ticket,
            approve visitor entries, and hear from your management committee —
            all from the same account.
          </p>
        </div>
      </div>

      {/* Right panel: form */}
      <div className="gc-panel-form">
        <div className="gc-form-card">
          <h2>Create your resident account</h2>
          <p className="gc-form-sub">Takes about a minute. Your management office already has your flat on file.</p>

          {serverError && <div className="gc-server-error">{serverError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="gc-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Asha Nair"
                value={form.fullName}
                onChange={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                aria-invalid={!!showError("fullName")}
              />
              {showError("fullName") && <div className="gc-field-error">{errors.fullName}</div>}
            </div>

            <div className="gc-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="asha.nair@email.com"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                aria-invalid={!!showError("email")}
              />
              {showError("email") && <div className="gc-field-error">{errors.email}</div>}
            </div>

            <div className="gc-field gc-field-row">
              <div>
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => handleChange("phone")({ target: { value: e.target.value.replace(/\D/g, "") } })}
                  onBlur={handleBlur("phone")}
                  aria-invalid={!!showError("phone")}
                />
                {showError("phone") && <div className="gc-field-error">{errors.phone}</div>}
              </div>
              <div>
                <label htmlFor="flatNumber">Flat number</label>
                <input
                  id="flatNumber"
                  type="text"
                  placeholder="B-1204"
                  value={form.flatNumber}
                  onChange={handleChange("flatNumber")}
                  onBlur={handleBlur("flatNumber")}
                  aria-invalid={!!showError("flatNumber")}
                />
                {showError("flatNumber") && <div className="gc-field-error">{errors.flatNumber}</div>}
              </div>
            </div>

            <div className="gc-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                aria-invalid={!!showError("password")}
              />
              {showError("password") && <div className="gc-field-error">{errors.password}</div>}
            </div>

            <button type="submit" className="gc-submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="gc-login-line">
            Already registered?{" "}
            <button type="button" onClick={onNavigateToLogin}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
