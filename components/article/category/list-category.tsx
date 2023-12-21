import React from "react";
import { ListBoxWrapper } from "./list-box-wrapper";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Input,
  Spacer,
} from "@nextui-org/react";
import { join } from "path";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";

import type { Category } from "@/types/article";
import { cn } from "@/lib/utils";

export function ListCategory() {
  const [categories, setCategories] = React.useState<Category[]>([
    {
      id: 1,
      label: "Category 1",
    },
  ] as Category[]);

  const [newCategoryLabel, setNewCategoryLabel] = React.useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter" && newCategoryLabel.trim() !== "") {
      addCategory(newCategoryLabel.trim());
      setNewCategoryLabel(""); // Clear the input field after adding the category
    }
  }

  function addCategory(label: string): void {
    const newCategory = {
      id: categories.length + 1,
      label,
    };

    setCategories([...categories, newCategory]);
  }

  function deleteCategory(id: number): void {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
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
            "hover:ring-2 hover:ring-secondary hover:ring-offset-2 hover:ring-offset-background",
            "focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background",
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
