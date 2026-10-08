import { SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SharkApprovalTable() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
        <SearchX className="size-5" />
        Shark applications are managed from the approval panel.
      </CardContent>
    </Card>
  );
}
