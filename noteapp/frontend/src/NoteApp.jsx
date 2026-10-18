import { useState, useEffect } from 'react';
import axios from 'axios';

function NoteApp() {
  // ─── State ───────────────────────────────────────────
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ─── Lấy danh sách ghi chú khi component mount ───────
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/notes');
        setNotes(res.data);
      } catch (err) {
        setError('Không thể tải danh sách ghi chú. Hãy kiểm tra server!');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // ─── Xử lý submit form thêm ghi chú ──────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title.trim()) {
      setError('Tiêu đề không được để trống!');
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post('/api/notes', {
        title: title.trim(),
        content: content.trim(),
      });

      const newNote = res.data;

      // Cập nhật giao diện ngay lập tức — không cần reload trang
      setNotes((prevNotes) => [newNote, ...prevNotes]);

      // Reset form
      setTitle('');
      setContent('');
      setSuccessMsg('✅ Thêm ghi chú thành công!');

      // Xóa thông báo thành công sau 3 giây
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Lỗi khi thêm ghi chú!';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Hiển thị thời gian ───────────────────────────────
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ─── Render ───────────────────────────────────────────
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Ứng Dụng Ghi Chú</h1>

      {/* ── Form thêm ghi chú ── */}
      <div style={styles.formCard}>
        <h2 style={styles.subHeading}>Thêm Ghi Chú Mới</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Tiêu đề (*)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            disabled={submitting}
          />
          <textarea
            placeholder="Nội dung ghi chú..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            rows={4}
            disabled={submitting}
          />
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? '⏳ Đang thêm...' : '➕ Thêm Ghi Chú'}
          </button>
        </form>

        {/* Thông báo lỗi / thành công */}
        {error && <p style={styles.errorMsg}>{error}</p>}
        {successMsg && <p style={styles.successMsg}>{successMsg}</p>}
      </div>

      {/* ── Danh sách ghi chú ── */}
      <div style={styles.listSection}>
        <h2 style={styles.subHeading}>
          Danh Sách Ghi Chú ({notes.length})
        </h2>

        {loading ? (
          <p style={styles.infoMsg}>⏳ Đang tải...</p>
        ) : notes.length === 0 ? (
          <p style={styles.infoMsg}>Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên!</p>
        ) : (
          <ul style={styles.noteList}>
            {notes.map((note) => (
              <li key={note._id} style={styles.noteCard}>
                <div style={styles.noteHeader}>
                  <h3 style={styles.noteTitle}>
                    {note.isPinned ? '📌 ' : ''}
                    {note.title}
                  </h3>
                  <span style={styles.noteDate}>{formatDate(note.createdAt)}</span>
                </div>
                {note.content && (
                  <p style={styles.noteContent}>{note.content}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Inline Styles (minimal) ─────────────────────────────
const styles = {
  container: { maxWidth: '700px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' },
  heading: { textAlign: 'center', marginBottom: '24px' },
  subHeading: { marginTop: 0, marginBottom: '16px', fontSize: '18px' },
  formCard: { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '32px', background: '#f9f9f9' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' },
  textarea: { padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical', outline: 'none' },
  button: { padding: '10px 18px', fontSize: '15px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  errorMsg: { color: '#dc2626', marginTop: '8px', fontWeight: '500' },
  successMsg: { color: '#16a34a', marginTop: '8px', fontWeight: '500' },
  infoMsg: { color: '#6b7280', fontStyle: 'italic' },
  listSection: {},
  noteList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' },
  noteCard: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  noteHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' },
  noteTitle: { margin: 0, fontSize: '16px', color: '#111827', flexShrink: 1 },
  noteDate: { fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px' },
  noteContent: { margin: 0, color: '#4b5563', fontSize: '14px', lineHeight: '1.6' },
};

export default NoteApp;

