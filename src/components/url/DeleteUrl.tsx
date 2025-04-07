"use client";
import { trpc } from "@/utils/trpc";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  id: string;
}

export default function DeleteUrl({ id }: Props) {
  const utils = trpc.useUtils();
  const [open, setOpen] = React.useState(false);

  const { mutateAsync, isPending } = trpc.url.deleteUrl.useMutation({
    onSuccess: () => {
      toast.success("URL deleted successfully");
      // Invalidate the urlList query to trigger a refetch
      utils.url.urlList.invalidate();
      setOpen(false);
    },
  });

  const handleDelete = () => {
    mutateAsync({ id });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-red-400 bg-red-500 text-white hover:text-white"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex flex-col gap-3">
          <h4 className="font-medium">
            Are you sure you want to delete this URL?
          </h4>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
