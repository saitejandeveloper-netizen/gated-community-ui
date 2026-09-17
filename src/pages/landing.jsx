/**
 * LandingPage — entry screen for the gated community app.
 * Same visual language as LoginPage/RegisterPage (gc-landing-* prefix
 * keeps styles isolated so all three can be imported together).
 *
 * Wire onNavigateToLogin / onNavigateToRegister to your router
 * (e.g. navigate("/login"), navigate("/register")).
 */

export default function LandingPage({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="gc-landing-page">
      <style>{`
        .gc-landing-page {
          height: 100vh;
          height: 100dvh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(175deg, #161c24 0%, #0d1116 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
          overflow: hidden;
          padding: 1.5rem;
          box-sizing: border-box;
        }

        .gc-landing-page svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.85;
        }

        .gc-landing-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 30rem;
        }

        .gc-landing-mark {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.1rem, 2.4vw, 1.4rem);
          letter-spacing: 0.03em;
          color: #c9a44c;
          margin-bottom: clamp(1rem, 4vh, 2rem);
        }

        .gc-landing-content h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          font-size: clamp(1.8rem, 5vw, 2.75rem);
          line-height: 1.22;
          color: #f2ede2;
          margin: 0 0 0.75rem;
        }

        .gc-landing-content p {
          font-size: clamp(0.88rem, 1.8vw, 1rem);
          line-height: 1.6;
          color: #9aa2ae;
          margin: 0 0 clamp(1.5rem, 5vh, 2.5rem);
          max-width: 26rem;
        }

        .gc-landing-actions {
          display: flex;
          gap: 0.85rem;
          width: 100%;
          max-width: 22rem;
        }

        .gc-landing-btn {
          flex: 1;
          padding: 0.78rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, transform 0.05s ease;
        }

        .gc-landing-btn:active {
          transform: translateY(1px);
        }

        .gc-landing-btn-primary {
          border: none;
          background: #c9a44c;
          color: #14181f;
        }

        .gc-landing-btn-primary:hover {
          background: #d8b463;
        }

        .gc-landing-btn-secondary {
          border: 1.5px solid #3a4250;
          background: transparent;
          color: #f2ede2;
        }

        .gc-landing-btn-secondary:hover {
          border-color: #5a6474;
          background: rgba(255, 255, 255, 0.03);
        }

        .gc-landing-footnote {
          margin-top: clamp(1.25rem, 4vh, 2rem);
          font-size: 0.78rem;
          color: #5c6472;
        }

        @media (prefers-reduced-motion: reduce) {
          .gc-landing-btn {
            transition: none;
          }
        }
      `}</style>

      <svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="gcLandingSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b222c" />
            <stop offset="100%" stopColor="#0d1116" />
          </linearGradient>
        </defs>
        <rect width="500" height="700" fill="url(#gcLandingSky)" />
        <g fill="#1e2530">
          <rect x="20" y="420" width="60" height="280" />
          <rect x="90" y="380" width="50" height="320" />
          <rect x="360" y="400" width="55" height="300" />
          <rect x="425" y="440" width="60" height="260" />
        </g>
        <g fill="#c9a44c" opacity="0.4">
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
            opacity="0.5"
          />
          <rect x="105" y="690" width="30" height="14" fill="#c9a44c" opacity="0.5" />
          <rect x="365" y="690" width="30" height="14" fill="#c9a44c" opacity="0.5" />
          <circle cx="250" cy="330" r="7" fill="#c9a44c" opacity="0.5" />
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

      <div className="gc-landing-content">
        <div className="gc-landing-mark">Meridian Court</div>
        <h1>One key, every gate.</h1>
        <p>
          Book the clubhouse, raise maintenance tickets, approve visitor
          entries, and stay in sync with your management committee — all in
          one account.
        </p>

        <div className="gc-landing-actions">
          <button
            type="button"
            className="gc-landing-btn gc-landing-btn-secondary"
            onClick={onNavigateToLogin}
          >
            Log in
          </button>
          <button
            type="button"
            className="gc-landing-btn gc-landing-btn-primary"
            onClick={onNavigateToRegister}
          >
            Register
          </button>
        </div>

        <div className="gc-landing-footnote">Residents of Meridian Court only</div>
      </div>
    </div>
  );
}