import { Copy, Smartphone } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { Button } from "../ui/button";
import DeleteUrl from "./DeleteUrl";

interface Props {
  id: string;
  shortUrl: string;
  url: string;
  clicks: number;
  mobileClicks: number;
}
export default function UrlRow({
  id,
  shortUrl,
  url,
  clicks,
  mobileClicks,
}: Props) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md gap-4">
      <div className="overflow-hidden flex-1">
        <p className="font-medium truncate">
          {window.location.origin}/api/url/{shortUrl}
        </p>
        <p className="text-sm text-muted-foreground truncate">{url}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MousePointerClick className="h-4 w-4" />
          <span>{clicks ?? 0}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Smartphone className="h-4 w-4" />
          <span>{mobileClicks ?? 0}</span>
        </div>
        <Button
          className="cursor-pointer"
          size="sm"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/api/url/${shortUrl}`
            );
            toast.success("URL copied to clipboard");
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <DeleteUrl id={id} />
      </div>
    </div>
  );
}
