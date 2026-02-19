export function hasFile(formData: FormData, key: string) {
    const value = formData.get(key);
    return value instanceof File && value.size > 0;
  }
  
  export function appendIfExists(
    formData: FormData,
    key: string,
    value?: string | Blob | null
  ) {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }
  