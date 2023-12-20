import * as UI from "@nextui-org/react";

type Props = {
    src: string;
};

export function ImageCoverModal({ src }: Props) {
    return (
        <UI.ModalContent>
            {(onClose) => (
                <UI.Image
                    src={src}
                    onClick={onClose}
                    alt="Album cover"
                    radius="none"
                    width="100%"
                    className="object-cover self-center max-h-[600px]"
                    draggable={false}
                />
            )}
        </UI.ModalContent>
    );
}
