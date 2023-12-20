"use client";

import { FilledUploadIcon } from "@/components/icons";
import * as UI from "@nextui-org/react";
import * as React from "react";
import { ImageCoverModal } from "./image-modal";

export function ImageUploader() {
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onOpenChange: onOpenChangeModal,
    } = UI.useDisclosure();
    const [image, setImage] = React.useState<File | string>("");
    const [loading, setLoading] = React.useState(false);

    async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                if (e.target?.result) {
                    const result = e.target.result as string;
                    setImage(result as string);
                }
            };
        }
        setLoading(false);
    }

    return (
        <>
            {image ? (
                <div className="relative w-full overflow-hidden">
                    <div className="absolute z-20 top-0 right-0 px-4 py-2">
                        <UI.Chip
                            className="p-3 cursor-pointer font-bold hover:text-secondary"
                            size="sm"
                            onClick={() => setImage("")}
                        >
                            X
                        </UI.Chip>
                    </div>

                    <UI.Modal
                        isOpen={isOpenModal}
                        onOpenChange={onOpenChangeModal}
                        radius="lg"
                        size="4xl"
                        draggable={false}
                        placement="center"
                        backdrop="blur"
                    >
                        <ImageCoverModal src={image as string} />
                    </UI.Modal>

                    <UI.Image
                        src={image as string}
                        width="100%"
                        onClick={onOpenModal}
                        isBlurred
                        className="object-cover rounded-md max-h-48"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            ) : (
                <UI.Button
                    className="flex justify-center items-center w-full h-48 shadow-md rounded-xl cursor-pointer"
                    variant="bordered"
                    onPress={() => {
                        const input: HTMLInputElement | null =
                            document.querySelector("#uploadImage");

                        if (input) {
                            input.click();
                        }
                    }}
                >
                    <div className="space-y-4 select-none">
                        {!loading ? (
                            <>
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                    name="uploadImage"
                                    id="uploadImage"
                                />
                                <p>
                                    <span className="text-sm font-semibold text-current">
                                        Upload image
                                    </span>
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        or drag and drop
                                    </span>
                                </p>
                            </>
                        ) : (
                            <UI.Spinner color="secondary" />
                        )}
                    </div>
                </UI.Button>
            )}
        </>
    );
}
