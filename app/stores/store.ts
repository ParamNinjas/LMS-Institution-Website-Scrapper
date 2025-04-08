import { create } from 'zustand';

export type FormError = {
  urlError: boolean;
  envError: boolean;
  dataError: boolean;
  errorText: string;
};

export type FormState = {
  loading: boolean;
  env_clientKey: string;
  url: string;
  jobId: string;
  status: string;
  data: []; // Optionally replace with a specific Course type
  error: FormError;
};

type FormStore = {
  form: FormState;
  updateData: (newData: Partial<FormState>) => void;
  setErrors: (newError: Partial<FormError>) => void;
};

export const formStore = create<FormStore>((set) => ({
  form: {
    loading: false,
    env_clientKey: "",
    url: "",
    jobId: "",
    status: "",
    data: [],
    error: {
      urlError: false,
      envError: false,
      dataError: false,
      errorText: "",
    },
  },
  updateData: (newData) =>
    set((state) => ({
      form: {
        ...state.form,
        ...newData,
      },
    })),
  setErrors: (newError) =>
    set((state) => ({
      form: {
        ...state.form,
        error: {
          ...state.form.error,
          ...newError,
        },
      },
    })),
}));
