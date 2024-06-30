import { CheckCircle } from "lucide-react";

interface Props {
  label: string;
}

export function FormAlertSuccess({ label }: Props) {
  return (
    <div className="w-full rounded-md p-4 bg-emerald-500/10 text-emerald-500 flex items-center gap-2">
      <CheckCircle className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
