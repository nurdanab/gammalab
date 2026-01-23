'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = 'uploads' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError(null);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Поддерживаются только JPG, PNG, WebP и GIF');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Максимальный размер файла 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Ошибка загрузки');
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px',
        }}
      >
        Изображение
      </label>

      {value ? (
        <div
          style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #E5E7EB',
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? '#209DA7' : '#E5E7EB'}`,
            borderRadius: '8px',
            padding: '32px 16px',
            textAlign: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            backgroundColor: dragOver ? '#F0FDFA' : '#FAFAFA',
            transition: 'all 0.2s',
          }}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Loader2
                style={{
                  width: '32px',
                  height: '32px',
                  color: '#209DA7',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Загрузка...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#E0F2F4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {dragOver ? (
                  <ImageIcon style={{ width: '24px', height: '24px', color: '#209DA7' }} />
                ) : (
                  <Upload style={{ width: '24px', height: '24px', color: '#209DA7' }} />
                )}
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#374151', margin: '0 0 4px', fontWeight: '500' }}>
                  {dragOver ? 'Отпустите файл' : 'Нажмите или перетащите'}
                </p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>
                  JPG, PNG, WebP до 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {error && (
        <p style={{ fontSize: '13px', color: '#EF4444', marginTop: '8px', marginBottom: 0 }}>
          {error}
        </p>
      )}

      {/* Manual URL input fallback */}
      <div style={{ marginTop: '12px' }}>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Или вставьте URL изображения"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
            color: '#6B7280',
          }}
        />
      </div>
    </div>
  );
}
