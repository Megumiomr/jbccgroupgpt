import { Card } from "@/components/ui/card";
import { Option } from "@/features/option/option";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <Card className="h-full items-center flex justify-center flex-1">
      <Option />
    </Card>
  );
}
