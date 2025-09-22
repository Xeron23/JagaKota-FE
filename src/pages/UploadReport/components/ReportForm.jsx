import { useEffect } from "react";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Alert from "@/components/Alert";
import toast from "react-hot-toast";

const ReportForm = ({
  form,
  preview,
  progress,
  fileRef,
  isPending,
  isSuccess,
  error,
  canSubmit,
  onFormChange,
  onProvinceChange,
  onRegencyChange,
  onPhotoChange,
  onSubmit,
  onReset,
}) => {
  const fieldErrors =
    typeof error === "object" && error !== null && !(error instanceof Error)
      ? error
      : {};
  const generalError = error instanceof Error ? error.message : null;

  useEffect(() => {
  }, [isSuccess, isPending, error]);

  // Success handling dengan toast
  useEffect(() => {
    if (isSuccess) {
      toast.success("Report uploaded successfully! 🎉", {
        duration: 4000,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (generalError) {
      toast.error("Gagal untuk mengunggah laporan, silakan coba lagi", {
        duration: 4000,
      });
    }
  }, [generalError]);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Form Judul */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Judul</label>
        <Input
          name="title"
          value={form.title}
          onChange={onFormChange}
          placeholder="Judul laporan"
          disabled={isPending}
          error={fieldErrors.title}
        />
      </div>

      {/* Form Deskripsi */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onFormChange}
          placeholder="Jelaksan kerusakan yang terjadi"
          rows={4}
          className={`w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            fieldErrors.description
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-input focus-visible:ring-ring"
          }`}
        />
        {fieldErrors.description && (
          <p className="text-sm text-red-600" role="alert">
            {fieldErrors.description}
          </p>
        )}
      </div>

      {/* Form Alamat */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Alamat</label>
        <Input
          name="street"
          value={form.street}
          onChange={onFormChange}
          placeholder="Alamat Jalan"
          disabled={isPending}
          error={fieldErrors.street}
        />
      </div>

      {/* Form Provinsi & Regency */}
      <div className="space-y-2">
        <ProvinceRegencySelect
          provinceId={form.provinceId}
          regencyId={form.regencyId}
          onProvinceChange={onProvinceChange}
          onRegencyChange={onRegencyChange}
          theme="light"
          className="font-medium"
          disabled={isPending}
          provinceError={fieldErrors.provinceId}
          regencyError={fieldErrors.regencyId}
        />
      </div>

      {/* Form Lat/Long */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Latitude</label>
          <Input
            name="latitude"
            inputMode="decimal"
            value={form.latitude}
            onChange={onFormChange}
            placeholder="-6.2"
            disabled={isPending}
            error={fieldErrors.latitude}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Longitude</label>
          <Input
            name="longitude"
            inputMode="decimal"
            value={form.longitude}
            onChange={onFormChange}
            placeholder="106.8"
            disabled={isPending}
            error={fieldErrors.longitude}
          />
        </div>
      </div>

      {/* Form Photo */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Photo</label>
        <Input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          disabled={isPending}
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 max-h-44 w-auto rounded-md border object-cover"
          />
        )}
      </div>

      {/* Button Actions */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="flex-1"
          disabled={isPending || !canSubmit}
        >
          {isPending ? `Uploading... ${progress}%` : "Lapor"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isPending}
        >
          Reset
        </Button>
      </div>

      {/* Feedback Messages */}
      {generalError && <Alert message={generalError} type="danger" />}
    </form>
  );
};

export default ReportForm;
