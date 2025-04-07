"use client";
import { trpc } from "@/utils/trpc";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface Props {
  id: string;
}

export default function DeleteUrl({ id }: Props) {
  const utils = trpc.useUtils();

  const { mutateAsync, isPending } = trpc.url.deleteUrl.useMutation({
    onSuccess: () => {
      toast.success("URL deleted successfully");
      // Invalidate the urlList query to trigger a refetch
      utils.url.urlList.invalidate();
    },
  });

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => mutateAsync({ id })}
      disabled={isPending}
      className=" hover:bg-red-400 bg-red-500 text-white hover:text-white"
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
