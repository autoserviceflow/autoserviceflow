'use client';

import { useEffect } from 'react';

const WIDGET_URL    = 'https://widget.autoserviceflow.com/chat.js';
const DEMO_WEBHOOK  = 'https://n8n.autoserviceflow.com/webhook/chat';
const DEMO_CLIENT   = 'mr_kim_001';

const C = {
  navy:      '#0F2D52',
  cyan:      '#00C8D4',
  white:     '#FFFFFF',
  grayMid:   '#64748b',
};

// How long to wait for chat.js to load before assuming it failed.
// Covers cases where the <script> tag never fires error OR load —
// e.g. very old TLS stacks that silently hang instead of failing fast.
const LOAD_TIMEOUT_MS = 10000;

function showLoadFailure() {
  const placeholder = document.getElementById('asf-widget-placeholder');
  if (!placeholder) return;
  placeholder.innerHTML = `
    <div style="text-align:center;color:${C.grayMid};font-family:Inter,Arial,sans-serif;padding:0 24px;">
      <div style="font-size:15px;color:#FFFFFF;margin-bottom:8px;">
        연결할 수 없습니다 · Unable to connect
      </div>
      <div style="font-size:13px;color:#94a3b8;line-height:1.5;">
        브라우저를 업데이트하거나 다른 브라우저로 시도해 주세요.<br/>
        Please update your browser or try a different one.
      </div>
    </div>
  `;
}

function DemoPage() {
  useEffect(() => {
    const existing = document.getElementById('asf-chat-script');
    if (existing) return;

    let settled = false; // true once the script has either loaded or failed

    const timeoutId = setTimeout(function () {
      if (!settled) {
        settled = true;
        showLoadFailure();
      }
    }, LOAD_TIMEOUT_MS);

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

    script.onload = function () {
      settled = true;
      clearTimeout(timeoutId);
      // chat.js itself clears/replaces the placeholder once it mounts.
      // If it loaded but didn't mount within a beat, the timeout above
      // would already have fired separately — nothing else to do here.
    };

    script.onerror = function () {
      settled = true;
      clearTimeout(timeoutId);
      showLoadFailure();
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      const s = document.getElementById('asf-chat-script');
      if (s && document.body.contains(s)) document.body.removeChild(s);
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      overflow: 'hidden',
      background: C.navy,
      fontFamily: "'Inter', Arial, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }
        @keyframes asf-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .asf-loader {
          width: 40px; height: 40px;
          border: 3px solid #E5E7EB;
          border-top-color: #00C8D4;
          border-radius: 50%;
          animation: asf-spin 0.9s linear infinite;
        }
      `}</style>

      {/* Widget fills the entire viewport */}
      <div
        id="asf-demo-widget-container"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Spinner shown until chat.js mounts and clears it,
            or replaced with a failure message after LOAD_TIMEOUT_MS */}
        <div id="asf-widget-placeholder" style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px', color: C.grayMid,
        }}>
          <div className="asf-loader" />
          <span style={{ fontSize: '14px', fontFamily: 'Inter, Arial, sans-serif', color: '#94a3b8' }}>
            AI 어시스턴트 로딩 중…
          </span>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;