import * as UI from "@nextui-org/react";

export function Unimplemented() {
  return (
    <UI.ModalContent>
      {(_onClose) => (
        <UI.ModalBody>
          <div className="flex h-[100px] w-full items-center">
            <h4 className="text-center text-xl">
              You caught us! This feature is not yet implemented. Please check
              back later.
            </h4>
          </div>
        </UI.ModalBody>
      )}
    </UI.ModalContent>
  );
}
