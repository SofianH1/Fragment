import type { Fragment, FragmentColor } from "@/types/fragment";


export type FragmentFormData = {
    title: string;
    content: string;
    color:FragmentColor;
}

export interface FragmentFormProps {
    initialFragment?: Fragment | null;
    onSubmit: (data: FragmentFormData) => void;
    onClose: () => void;
}