'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Trash2, FileText, Image, ExternalLink, Plus, X } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  titleKz: string | null;
  titleEn: string | null;
  description: string | null;
  descriptionKz: string | null;
  descriptionEn: string | null;
  fileUrl: string;
  fileName: string | null;
  fileType: string;
  order: number;
  isActive: boolean;
}

const fileTypeOptions = [
  { value: 'license', label: 'Лицензия' },
  { value: 'certificate', label: 'Сертификат' },
  { value: 'other', label: 'Другое' },
];

export default function DocumentsAdminPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    titleKz: '',
    titleEn: '',
    description: '',
    descriptionKz: '',
    descriptionEn: '',
    fileUrl: '',
    fileName: '',
    fileType: 'license',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/admin/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          fileUrl: data.url,
          fileName: data.fileName,
        }));
      } else {
        const error = await res.json();
        alert(error.error || 'Ошибка загрузки файла');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка загрузки файла');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileUrl) {
      alert('Пожалуйста, загрузите файл');
      return;
    }

    setSaving(true);

    try {
      const url = editingDoc
        ? `/api/admin/documents/${editingDoc.id}`
        : '/api/admin/documents';
      const method = editingDoc ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setEditingDoc(null);
        resetForm();
        fetchDocuments();
      } else {
        alert('Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (doc: Document) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title,
      titleKz: doc.titleKz || '',
      titleEn: doc.titleEn || '',
      description: doc.description || '',
      descriptionKz: doc.descriptionKz || '',
      descriptionEn: doc.descriptionEn || '',
      fileUrl: doc.fileUrl,
      fileName: doc.fileName || '',
      fileType: doc.fileType,
      order: doc.order,
      isActive: doc.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDocuments(documents.filter(d => d.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleKz: '',
      titleEn: '',
      description: '',
      descriptionKz: '',
      descriptionEn: '',
      fileUrl: '',
      fileName: '',
      fileType: 'license',
      order: 0,
      isActive: true,
    });
  };

  const openNewModal = () => {
    setEditingDoc(null);
    resetForm();
    setShowModal(true);
  };

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #E5E7EB',
            borderTopColor: '#209DA7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  };

  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .page-header {
            padding-top: 48px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            href="/admin"
            style={{
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              color: '#091D33',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
          </Link>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#091D33', margin: '0 0 4px' }}>
              Лицензии и сертификаты
            </h1>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
              Управление документами для страницы &quot;О нас&quot;
            </p>
          </div>
        </div>
        <button
          onClick={openNewModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            backgroundColor: '#209DA7',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          <Plus style={{ width: '18px', height: '18px' }} />
          Добавить
        </button>
      </div>

      {/* Documents Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              opacity: doc.isActive ? 1 : 0.6,
            }}
          >
            {/* Preview */}
            <div
              style={{
                height: '160px',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {isImage(doc.fileUrl) ? (
                <img
                  src={doc.fileUrl}
                  alt={doc.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <FileText style={{ width: '48px', height: '48px', color: '#9CA3AF' }} />
              )}
              {!doc.isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}
                >
                  Скрыт
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '500',
                    backgroundColor: doc.fileType === 'license' ? '#E0F2F4' : doc.fileType === 'certificate' ? '#FEF3C7' : '#F3F4F6',
                    color: doc.fileType === 'license' ? '#209DA7' : doc.fileType === 'certificate' ? '#D97706' : '#6B7280',
                  }}
                >
                  {fileTypeOptions.find(o => o.value === doc.fileType)?.label || doc.fileType}
                </span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
                {doc.title}
              </h3>
              {doc.description && (
                <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px', lineHeight: 1.5 }}>
                  {doc.description.length > 80 ? doc.description.slice(0, 80) + '...' : doc.description}
                </p>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#374151',
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={14} />
                  Открыть
                </a>
                <button
                  onClick={() => handleEdit(doc)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #209DA7',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#209DA7',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  Изменить
                </button>
                <button
                  onClick={() => setDeleteId(doc.id)}
                  style={{
                    padding: '8px',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Trash2 size={16} style={{ color: '#EF4444' }} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              color: '#9CA3AF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <FileText style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ margin: 0 }}>Документов пока нет</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#091D33', margin: 0 }}>
                {editingDoc ? 'Редактировать документ' : 'Добавить документ'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
              >
                <X size={20} style={{ color: '#6B7280' }} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              {/* File Upload */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Файл *</label>
                {formData.fileUrl ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '8px',
                    }}
                  >
                    {isImage(formData.fileUrl) ? (
                      <Image size={24} style={{ color: '#209DA7' }} />
                    ) : (
                      <FileText size={24} style={{ color: '#209DA7' }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#091D33', margin: 0 }}>
                        {formData.fileName || 'Файл загружен'}
                      </p>
                      <a
                        href={formData.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '12px', color: '#209DA7' }}
                      >
                        Просмотреть
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, fileUrl: '', fileName: '' }))}
                      style={{
                        padding: '6px',
                        border: 'none',
                        backgroundColor: '#FEE2E2',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={16} style={{ color: '#EF4444' }} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #E5E7EB',
                      borderRadius: '8px',
                      padding: '32px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Upload
                      size={32}
                      style={{ color: '#9CA3AF', margin: '0 auto 12px' }}
                    />
                    <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 4px' }}>
                      {uploading ? 'Загрузка...' : 'Нажмите для загрузки'}
                    </p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                      PDF, JPEG, PNG до 25MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>

              {/* Type */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Тип документа</label>
                <select
                  value={formData.fileType}
                  onChange={(e) => setFormData(prev => ({ ...prev, fileType: e.target.value }))}
                  style={inputStyle}
                >
                  {fileTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Название (RU) *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Название (KZ)</label>
                  <input
                    type="text"
                    value={formData.titleKz}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleKz: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Название (EN)</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Описание (RU)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Описание (KZ)</label>
                  <textarea
                    value={formData.descriptionKz}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionKz: e.target.value }))}
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Описание (EN)</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Order and Active */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={labelStyle}>Порядок</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Статус</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '14px', color: '#374151' }}>Активен</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving || !formData.fileUrl}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#209DA7',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#091D33', marginBottom: '8px' }}>
              Удалить документ?
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
              Это действие нельзя отменить. Документ и файл будут удалены навсегда.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Отмена
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#EF4444',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
