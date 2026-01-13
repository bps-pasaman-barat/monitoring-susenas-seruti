import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ButtonBack({ linkUrl }: { linkUrl: string }) {
  return (
    <>
      <Button variant="ghost" size="icon" asChild>
        <Link href={linkUrl}>
          <MoveLeft className="size-10" />
        </Link>
      </Button>
    </>
  );
}
