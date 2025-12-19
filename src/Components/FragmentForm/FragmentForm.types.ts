import type { Fragment } from "@/types/fragment";


export type FragmentFormData = {
    title: string;
    content: string;
}

export interface FragmentFormProps {
    initialFragment?: Fragment | null;
    onSubmit: (data: FragmentFormData) => void;
    onClose: () => void;
}