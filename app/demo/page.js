'use client';

import { useEffect } from 'react';

const WIDGET_URL    = 'https://widget.autoserviceflow.com/chat.js';
const DEMO_WEBHOOK  = 'https://n8n.autoserviceflow.com/webhook/chat';
const DEMO_CLIENT   = 'mr_kim_001';
const CONTACT_EMAIL = 'hello@autoserviceflow.com';

const C = {
  navy:      '#0F2D52',
  cyan:      '#00C8D4',
  white:     '#FFFFFF',
  grayLight: '#F9FAFB',
  grayMid:   '#64748b',
  grayDim:   '#94a3b8',
};

function DemoPage() {
  useEffect(() => {
    const existing = document.getElementById('asf-chat-script');
    if (existing) return;

    const script = document.createElement('script');
    script.id  = 'asf-chat-script';
    script.src = WIDGET_URL;
    script.setAttribute('data-client-id',   DEMO_CLIENT);
    script.setAttribute('data-webhook-url', DEMO_WEBHOOK);
    script.setAttribute('data-lang',        'ko');
    script.setAttribute('data-theme',       'navy');
    script.setAttribute('data-open',        'true');
    script.setAttribute('data-welcome',     'true');
    script.setAttribute('data-container',   'asf-demo-widget-container');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById('asf-chat-script');
      if (s && document.body.contains(s)) document.body.removeChild(s);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: C.grayLight,
      fontFamily: "'Inter', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes asf-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .asf-loader {
          width: 40px; height: 40px;
          border: 3px solid #E5E7EB;
          border-top-color: #00C8D4;
          border-radius: 50%;
          animation: asf-spin 0.9s linear infinite;
        }
        @media (max-width: 640px) {
          #asf-demo-widget-container { height: calc(100dvh - 160px) !important; border-radius: 8px !important; }
          .demo-footer-inner { flex-direction: column !important; gap: 6px !important; text-align: center !important; }
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header style={{
        background: C.navy,
        borderBottom: '2px solid ' + C.cyan,
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ color: C.white, fontWeight: 800, fontSize: '20px', letterSpacing: '-0.3px' }}>
          AutoServiceFlow
        </span>
      </header>

      {/* ── WIDGET AREA ────────────────────────────────────────────── */}
      <section style={{
        flex: 1,
        padding: '40px 24px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        <div id="asf-demo-widget-container" style={{
          maxWidth: '480px', width: '100%', height: '600px',
          borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(15,45,82,0.18)',
          background: C.white,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div id="asf-widget-placeholder" style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '12px', color: C.grayMid,
          }}>
            <div className="asf-loader" />
            <span style={{ fontSize: '14px', fontFamily: 'Inter, Arial, sans-serif' }}>
              AI 어시스턴트 로딩 중…
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ background: C.navy, padding: '18px 32px', flexShrink: 0 }}>
        <div className="demo-footer-inner" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ color: C.white, fontWeight: 600, fontSize: '14px' }}>AutoServiceFlow</span>
          <span style={{ color: C.grayDim, fontSize: '14px' }}>{CONTACT_EMAIL}</span>
        </div>
      </footer>
    </div>
  );
}

export default DemoPage;