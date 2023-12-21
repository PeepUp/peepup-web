"use client";

import * as React from "react";
import { Article } from "@/types/article";


type NewArticleData = Pick<Article, "title" | "content" | "categories" | "timeToRead" | "image_cover">;

type Props = {
    newArticle: NewArticleData
}


export interface EditorDataContextProps {
    data: Props;
    setData: React.Dispatch<React.SetStateAction<Props>>;
}

const EditorContext = React.createContext<EditorDataContextProps>({
  data: {} as Props,
  setData: (): Props => ({}) as Props,
})

export function useEditorContext() {
  return React.useContext(EditorContext);
}

export function EditorProvider(props: { children: React.ReactNode }) {
  const [data, setData] = React.useState<Props>(
    {
      newArticle: {} as NewArticleData 
    } as Props
  );

  return (
    <EditorContext.Provider value={{ data, setData }}>
      {props.children}
    </EditorContext.Provider>
  );
}
