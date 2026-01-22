import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { PhotoData } from "@/lib/types";
import { resizeImage } from "@/lib/utils";
import { trackPhotoUpload } from "@/lib/tracking";
import { useToast } from "./ToastProvider";

interface PhotoUploadProps {
  photos: PhotoData[];
  onChange: (photos: PhotoData[]) => void;
  maxPhotos?: number;
  maxSizeMB?: number;
}

export function PhotoUpload({
  photos,
  onChange,
  maxPhotos = 3,
  maxSizeMB = 5,
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (photos.length + files.length > maxPhotos) {
      showToast(
        "error",
        `Maximum ${maxPhotos} photos autorisées`
      );
      return;
    }

    setIsUploading(true);

    try {
      const newPhotos: PhotoData[] = [];

      for (const file of files) {
        if (file.size > maxSizeMB * 1024 * 1024) {
          showToast(
            "error",
            `${file.name} est trop volumineux (max ${maxSizeMB}MB)`
          );
          continue;
        }

        if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
          showToast(
            "error",
            `${file.name} n'est pas un format d'image valide`
          );
          continue;
        }

        const dataUrl = await resizeImage(file);

        newPhotos.push({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl,
        });
      }

      const updatedPhotos = [...photos, ...newPhotos];
      onChange(updatedPhotos);
      trackPhotoUpload(updatedPhotos.length);
      showToast("success", `${newPhotos.length} photo(s) ajoutée(s)`);
    } catch (error) {
      showToast("error", "Erreur lors du chargement des photos");
      console.error(error);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onChange(updatedPhotos);
    showToast("info", "Photo supprimée");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Photos (optionnel)
        </label>
        <span className="text-xs text-gray-500">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo.dataUrl}
              alt={photo.name}
              className="w-full h-24 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
          <label className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary-50 transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            {isUploading ? (
              <div className="text-primary text-xs">Chargement...</div>
            ) : (
              <>
                {photos.length === 0 ? (
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                )}
                <span className="text-xs text-gray-500 text-center px-2">
                  Ajouter
                </span>
              </>
            )}
          </label>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Formats acceptés : JPG, PNG, WebP. Max {maxSizeMB}MB par photo.
      </p>
    </div>
  );
}
