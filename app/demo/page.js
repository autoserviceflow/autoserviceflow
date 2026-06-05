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
        .demo-context-label { color: #94a3b8; font-size: 13px; }
        @media (max-width: 640px) {
          .demo-context-label { display: none !important; }
          .demo-headline { font-size: 24px !important; }
          .demo-instruction { font-size: 14px !important; }
          #asf-demo-widget-container { height: calc(100dvh - 220px) !important; border-radius: 8px !important; }
          .demo-footer-inner { flex-direction: column !important; gap: 6px !important; text-align: center !important; }
        }
      `}</style>

      <header style={{
        background: C.navy,
        borderBottom: '2px solid ' + C.cyan,
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ color: C.white, fontWeight: 800, fontSize: '20px', letterSpacing: '-0.3px' }}>
          AutoServiceFlow
        </span>
        <span className="demo-context-label">
          Intermac Master 23&nbsp;&nbsp;·&nbsp;&nbsp;Troubleshooting Demo
        </span>
      </header>

      <section style={{ textAlign: 'center', padding: '48px 24px 36px', flexShrink: 0 }}>
        <h1 className="demo-headline" style={{
          color: C.navy, fontSize: '32px', fontWeight: 800,
          margin: '0 0 16px', letterSpacing: '-0.5px',
        }}>
          See the AI in Action
        </h1>
        <p className="demo-instruction" style={{
          color: C.grayMid, fontSize: '16px', lineHeight: 1.65,
          maxWidth: '520px', margin: '0 auto 6px',
        }}>
          Type a machine problem in the chat below — or send a photo of your error screen.
        </p>
        <p className="demo-instruction" style={{
          color: C.grayMid, fontSize: '16px', lineHeight: 1.65,
          maxWidth: '520px', margin: '0 auto',
        }}>
          The AI responds in Korean and can retrieve the relevant service diagram automatically.
        </p>
      </section>

      <section style={{
        flex: 1, padding: '0 24px 56px',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      }}>
        <div id="asf-demo-widget-container" style={{
          maxWidth: '480px', width: '100%', height: '560px',
          borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(15,45,82,0.18)',
          background: C.white,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: C.grayMid }}>
            <div className="asf-loader" />
            <span style={{ fontSize: '14px', fontFamily: 'Inter, Arial, sans-serif' }}>Loading AI assistant…</span>
          </div>
        </div>
      </section>

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