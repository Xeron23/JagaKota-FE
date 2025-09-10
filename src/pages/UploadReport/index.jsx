// ...existing code...
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { usePostReport } from "@/hooks/usePostReport";
import ReportForm from "./components/ReportForm";
import LocationPicker from "./components/LocationPicker";

const INITIAL_FORM = {
  title: "",
  description: "",
  street: "",
  provinceId: "",
  regencyId: "",
  latitude: "",
  longitude: "",
  photo: null,
};

const UploadReportPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const { mutate, isPending, isSuccess, isError, error, reset } =
    usePostReport();

  useEffect(() => {
    if (!form.photo) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(form.photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [form.photo]);

  const { latValid, lngValid } = useMemo(() => {
    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);
    return {
      latValid: !isNaN(lat) && lat >= -90 && lat <= 90,
      lngValid: !isNaN(lng) && lng >= -180 && lng <= 180,
    };
  }, [form.latitude, form.longitude]);

  const canSubmit = useMemo(
    () =>
      !!(
        form.title &&
        form.description &&
        form.street &&
        form.provinceId &&
        form.regencyId &&
        form.photo &&
        latValid &&
        lngValid
      ),
    [form, latValid, lngValid],
  );

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const handleLocationChange = useCallback(({ lat, lng }) => {
    setForm((f) => ({
      ...f,
      latitude: lat ? Number(lat).toFixed(6) : "",
      longitude: lng ? Number(lng).toFixed(6) : "",
    }));
  }, []);

  const handleProvinceChange = useCallback((provinceId) => {
    setForm((f) => ({
      ...f,
      provinceId: provinceId || "",
      regencyId: "",
    }));
  }, []);

  const handleRegencyChange = useCallback((regencyId) => {
    setForm((f) => ({
      ...f,
      regencyId: regencyId || "",
    }));
  }, []);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, photo: file }));
  }, []);

  const handleReset = useCallback(() => {
    setForm(INITIAL_FORM);
    setProgress(0);
    fileRef.current && (fileRef.current.value = "");
    reset();
  }, [reset]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!canSubmit || isPending) return;

      reset();
      setProgress(0);

      mutate(
        {
          ...form,
          config: {
            onUploadProgress: (evt) => {
              if (!evt.total) return;
              setProgress(Math.round((evt.loaded * 100) / evt.total));
            },
          },
        },
        {
          onSuccess: () => {
            setProgress(100);
            handleReset();
          },
          onError: () => setProgress(0),
        },
      );
    },
    [canSubmit, isPending, form, mutate, reset, handleReset],
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Upload Laporan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Isi Form sebaik baiknya untuk pelaporan kerusakan.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportForm
          form={form}
          preview={preview}
          progress={progress}
          fileRef={fileRef}
          isPending={isPending}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          canSubmit={canSubmit}
          onFormChange={handleFormChange}
          onProvinceChange={handleProvinceChange}
          onRegencyChange={handleRegencyChange}
          onPhotoChange={handlePhotoChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
        <LocationPicker
          latitude={form.latitude}
          longitude={form.longitude}
          onLocationChange={handleLocationChange}
        />
      </div>
    </div>
  );
};

export default UploadReportPage;
// ...existing code...
