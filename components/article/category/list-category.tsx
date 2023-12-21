import React from "react";

import { Chip, Spacer } from "@nextui-org/react";

import { cn } from "@/lib/utils";

import type { Article, Category } from "@/types/article";
import { useEditorContext } from "@/context/store/editor-store";

type NewArticleData = Pick<Article, "title" | "content" | "categories">;

export function ListCategory() {
  const [categories, setCategories] = React.useState<Category[]>([] as Category[]);
  const [newCategoryLabel, setNewCategoryLabel] = React.useState("");
  const { setData, data } = useEditorContext();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" && newCategoryLabel.trim() !== "") {
      addCategory(newCategoryLabel.trim());
      setNewCategoryLabel("");
    }
  }

  function addCategory(label: string): void {
    const newCategory = {
      id: categories.length + 1,
      label,
    };

    setCategories([...categories, newCategory]);
    setData({
        ...data,
        newArticle: {
          ...data.newArticle,
          categories: data.newArticle.categories ? [...data.newArticle.categories, newCategory] : [newCategory]
        }
    });
  }

  function deleteCategory(id: number): void {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
    setData({
        ...data,
        newArticle: {
          ...data.newArticle,
          categories: data.newArticle.categories ? data.newArticle.categories.filter((category) => category.id !== id) : []
        }
    });
  }

  return (
    <div className="container mx-auto flex h-max max-w-3xl flex-col gap-4 space-x-1 self-start overflow-x-auto px-4">
      <div>
        <h4>Select Category:</h4>
      </div>
      <div className="rounded-lg p-4">
        <div className="space-x-2">
          {categories && categories.length > 0
            ? categories.map((category, i) => (
                <Chip key={i} onClose={() => deleteCategory(category.id)}>
                  {category.label}
                </Chip>
              ))
            : null}
        </div>

        <Spacer y={3} />

        <input
          type="text"
          value={newCategoryLabel}
          className={cn([
            "h-8 w-2/6 rounded-md bg-transparent px-4 py-2 font-medium text-foreground outline-none",
            "hover:ring-1 hover:ring-secondary hover:ring-offset-1 hover:ring-offset-background",
            "focus:ring-1 focus:ring-secondary focus:ring-offset-1 focus:ring-offset-background",
            "placeholder-foreground placeholder-opacity-50"
          ])}
          placeholder="input category..."
          onChange={(e) => setNewCategoryLabel(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Spacer y={3} />
    </div>
  );
}
