import type { Fragment } from "@/types/fragment";

export interface FragmentReaderProps {
    fragment: Fragment;
    onClose: () => void;
    onEdit: (fragment:Fragment) => void;
    onDelete: (id: string) => void;
}