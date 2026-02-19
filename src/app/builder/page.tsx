import { Suspense } from "react";
import { WizardShell } from "@/components/wizard/WizardShell";

export default function BuilderPage() {
  return (
    <Suspense fallback={null}>
      <WizardShell />
    </Suspense>
  );
}
