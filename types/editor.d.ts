import type { Editor } from "@tiptap/react";
import type { Category } from "./article";

export type TipTapEditor = Editor;

export type EditorMetadata = {
    title: string;
    timeToRead: number;
    totalWords: number;
    categories: string[] | Category[];
};
