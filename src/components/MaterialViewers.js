import { useState, useEffect } from 'react';
import * as mammoth from 'mammoth';

export function getFileType(filename) {
  const lower = (filename || '').toLowerCase();
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(lower)) return 'image';
  if (lower.endsWith('.docx') || lower.endsWith('.doc')) return 'docx';
  if (lower.endsWith('.pptx') || lower.endsWith('.ppt')) return 'pptx';
  return 'other';
}

export function DocxViewer({ url, label }) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.arrayBuffer();
      })
      .then((arrayBuffer) => mammoth.convertToHtml({ arrayBuffer }))
      .then((result) => {
        if (!cancelled) setHtml(result.value);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not display document.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [url]);

  return (
    <section className="materials-viewer-block">
      <h3 className="materials-viewer-title">{label}</h3>
      {loading && <p className="materials-viewer-loading">Loading…</p>}
      {error && <p className="materials-viewer-error">{error}</p>}
      {!loading && !error && html && (
        <div
          className="materials-docx-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </section>
  );
}

function isLocalhost() {
  if (typeof window === 'undefined') return true;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

export function PptxViewer({ url, label }) {
  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : '';
  const viewerUrl = fullUrl
    ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fullUrl)}`
    : '';
  const useIframe = viewerUrl && !isLocalhost();

  return (
    <section className="materials-viewer-block">
      <h3 className="materials-viewer-title">{label}</h3>
      {useIframe ? (
        <>
          <div className="materials-pptx-wrap">
            <iframe
              src={viewerUrl}
              title={label}
              className="materials-pptx-iframe"
            />
          </div>
        </>
      ) : url ? (
        <div className="materials-pptx-localhost">
          <p className="materials-pptx-localhost-message">
            Slide preview isn’t available on localhost. Open the file in a new tab to view or download.
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="materials-pptx-localhost-link">
            Open slides in new tab
          </a>
        </div>
      ) : (
        <p className="materials-viewer-error">Unable to load viewer.</p>
      )}
    </section>
  );
}

export function MaterialBlock({ item, sectionId }) {
  const fileUrl = `/Week${sectionId}/assignments/${encodeURIComponent(item.file)}`;
  const type = getFileType(item.file);

  if (type === 'image') {
    return (
      <section className="materials-viewer-block">
        <h3 className="materials-viewer-title">{item.label}</h3>
        <div className="materials-image-wrap">
          <img src={fileUrl} alt={item.label} className="materials-image" />
        </div>
      </section>
    );
  }
  if (type === 'docx') {
    return <DocxViewer url={fileUrl} label={item.label} />;
  }
  if (type === 'pptx') {
    return <PptxViewer url={fileUrl} label={item.label} />;
  }
  return (
    <section className="materials-viewer-block">
      <h3 className="materials-viewer-title">{item.label}</h3>
      <p className="materials-viewer-error">This file type cannot be displayed here.</p>
    </section>
  );
}
