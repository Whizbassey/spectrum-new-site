import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ImageUploaderProps {
  bucket: string;
  onUpload: (url: string) => void;
  label?: string;
  initialUrl?: string;
}

export default function ImageUploader({ bucket, onUpload, label, initialUrl }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialUrl || "");

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      alert("Upload failed!");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    setPreview(publicUrlData.publicUrl);
    onUpload(publicUrlData.publicUrl);
    setUploading(false);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
      <input type="file" accept="image/*" onChange={uploadImage} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: 200, marginTop: 8, borderRadius: 8 }} />
      )}
    </div>
  );
} 