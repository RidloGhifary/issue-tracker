import { TriangleAlert } from "lucide-react";

interface Props {
  label: string;
}

export function FormAlertError({ label }: Props) {
  return (
    <div className="w-full rounded-md p-4 bg-destructive/10 text-destructive flex items-center gap-2">
      <TriangleAlert className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
