export function toFormData(data: Record<string, unknown>) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, String(v)));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}
