import type { ReactNode } from "react";
import { Dialog as HLDialog } from "@headlessui/react";
import { Button, Container } from "components/core";

const Dialog = ({
  open,
  onClose,
  body,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  body: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <HLDialog
      open={open}
      onClose={() => onClose()}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <HLDialog.Overlay className="fixed inset-0 bg-black opacity-20" />

        <div className="z-20 mx-auto w-full rounded bg-stone-900 sm:w-96">
          <div className="mx-auto max-w-sm py-8 px-4 sm:px-6 lg:px-8">
            <Container>{body}</Container>
          </div>

          <div className="flex justify-between rounded-b bg-stone-800 px-4 py-3 sm:px-6">
            <Button onClick={() => onClose()}>Close</Button>
            {footer}
          </div>
        </div>
      </div>
    </HLDialog>
  );
};

export default Dialog;
