import React from "react";

import * as UI from "@nextui-org/react";
import { MyInput } from "./input";

export function ModalAuth() {
  return (
    <UI.ModalContent>
      {(onClose) => (
        <>
          <UI.ModalHeader>Sign in</UI.ModalHeader>
          <UI.ModalBody>
            <div className="flex w-full flex-col items-center justify-center">
              <form className="mx-auto flex h-max w-full flex-col gap-4">
                <MyInput
                  required
                  size="md"
                  placeholder="Email, username or phone number"
                  color="darker2"
                  variant="bordered"
                  radius="md"
                  type="email"
                />

                <MyInput
                  required
                  variant="bordered"
                  size="md"
                  radius="md"
                  color="darker2"
                  type="password"
                  placeholder="Password"
                />
              </form>
            </div>
          </UI.ModalBody>
          <UI.ModalFooter>
            <div className="flex space-x-2">
              <UI.Button
                fullWidth
                variant="flat"
                color="danger"
                onPress={onClose}
              >
                Close
              </UI.Button>

              <div className="flex justify-end gap-2">
                <UI.Button fullWidth variant="solid" color="success">
                  Sign in
                </UI.Button>
              </div>
            </div>
          </UI.ModalFooter>
        </>
      )}
    </UI.ModalContent>
  );
}
