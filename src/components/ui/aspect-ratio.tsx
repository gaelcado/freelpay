"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root
      data-slot="aspect-ratio"
      {...props}
      data-oid="6fc0o6w"
    />
  );
}
export { AspectRatio };
