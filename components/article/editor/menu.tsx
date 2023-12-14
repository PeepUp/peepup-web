import * as UI from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { BulletListIcon, ItalicFontIcon, ListOlIcon } from "@/components/icons";

import type { TipTapEditor } from "@/types/editor";

type Props = {
    editor: TipTapEditor | null;
};

export function EditorMenu({ editor }: Props) {
    if (!editor) {
        return null;
    }

    const PopOverHeadings = () => {
        return (
            <UI.Popover placement="top" showArrow offset={10}>
                <UI.PopoverTrigger>
                    <UI.Button
                        size="sm"
                        className="basis-4 font-bold h-8"
                        variant="light"
                        color="secondary"
                    >
                        H
                    </UI.Button>
                </UI.PopoverTrigger>
                <UI.PopoverContent className="w-max">
                    {() => (
                        <div className="p-1 w-full">
                            <div className="flex gap-2 w-full">
                                <UI.Tooltip content="Heading 1" offset={5}>
                                    <UI.Button
                                        variant="light"
                                        color="success"
                                        className={cn([
                                            "font-bold h-8",
                                            editor.isActive("heading", { level: 1 })
                                                ? "is-active"
                                                : "",
                                        ])}
                                        size="sm"
                                        onPress={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeading({ level: 1 })
                                                .run()
                                        }
                                    >
                                        H1
                                    </UI.Button>
                                </UI.Tooltip>
                                <UI.Tooltip content="Heading 2" offset={5}>
                                    <UI.Button
                                        variant="light"
                                        color="success"
                                        className={cn([
                                            "font-bold h-8",
                                            editor.isActive("heading", { level: 2 })
                                                ? "is-active"
                                                : "",
                                        ])}
                                        size="sm"
                                        onPress={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeading({ level: 2 })
                                                .run()
                                        }
                                    >
                                        H2
                                    </UI.Button>
                                </UI.Tooltip>
                                <UI.Tooltip content="Heading 3" offset={5}>
                                    <UI.Button
                                        variant="light"
                                        color="success"
                                        className={cn([
                                            "font-bold h-8",
                                            editor.isActive("heading", { level: 3 })
                                                ? "is-active"
                                                : "",
                                        ])}
                                        size="sm"
                                        onPress={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeading({ level: 3 })
                                                .run()
                                        }
                                    >
                                        H3
                                    </UI.Button>
                                </UI.Tooltip>
                                <UI.Tooltip content="Heading 4" offset={5}>
                                    <UI.Button
                                        variant="light"
                                        color="success"
                                        className={cn([
                                            "font-bold h-8",
                                            editor.isActive("heading", { level: 4 })
                                                ? "is-active"
                                                : "",
                                        ])}
                                        size="sm"
                                        onPress={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeading({ level: 4 })
                                                .run()
                                        }
                                    >
                                        H4
                                    </UI.Button>
                                </UI.Tooltip>
                            </div>
                        </div>
                    )}
                </UI.PopoverContent>
            </UI.Popover>
        );
    };

    if (editor) {
        return (
            <div className="rounded-lg p-2 flex gap-1 container flex-wrap shadow-small transition-all">
                <PopOverHeadings />
                <UI.Tooltip content="Bold" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "basis-5 h-8",
                            editor.isActive("bold") ? "is-active" : "",
                            editor.isActive("bold") ? "font-bold" : "font-medium",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleBold().run()}
                    >
                        B
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Italic" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "max-w-xs font-bold h-8",
                            editor.isActive("italic") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <ItalicFontIcon size={10} stroke="currentColor" />
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Underline" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "max-w-xs font-bold h-8 underline",
                            editor.isActive("underline") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        U
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Strike" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "max-w-xs font-bold h-8 line-through",
                            editor.isActive("strike") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleStrike().run()}
                    >
                        S
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Inline code" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "max-w-xs font-bold h-8",
                            editor.isActive("code") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleCode().run()}
                    >
                        {"< >"}
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Order list" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "basis-8 font-bold h-8",
                            editor.isActive("orderedList") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOlIcon size={16} fill="currentColor" />
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Bullet list" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "basis-8 font-bold h-8",
                            editor.isActive("bulletList") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <BulletListIcon size={14} fill="currentColor" />
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Horizontal rule" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        size="sm"
                        className={cn(["basis-8 font-bold h-8"])}
                        onPress={() => editor.chain().focus().setHorizontalRule().run()}
                    >
                        HR
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Task List" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "basis-8 font-bold h-8",
                            editor.isActive("taskList") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleTaskList().run()}
                    >
                        Task
                    </UI.Button>
                </UI.Tooltip>

                <UI.Tooltip content="Blockquote" offset={5}>
                    <UI.Button
                        variant="light"
                        color="secondary"
                        className={cn([
                            "basis-8 font-bold h-8",
                            editor.isActive("blockquote") ? "is-active" : "",
                        ])}
                        size="sm"
                        onPress={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <i>""</i>
                    </UI.Button>
                </UI.Tooltip>
            </div>
        );
    }
}
