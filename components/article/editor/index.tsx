"use client";

import * as UI from "@nextui-org/react";
import * as React from "react";

import { join } from "path";
import { base64Encode, cn } from "@/lib/utils";
import { EditorMenu } from "./menu";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import InlineCode from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";

import { EditorMetadataPreview } from "./metadata";
import { ImageUploader } from "../image/uploader";
import { ListCategory } from "../category/list-category";
import { useEditorContext } from "@/context/store/editor-store";
import { URL_ENDPOINT_ARTICLES } from "@/lib/constant";
import { useGlobalContext } from "@/context/store/global";
import { toast } from "sonner";

export function Editor() {
  const [totalWords, setTotalWords] = React.useState(0);
  const [timeToRead, setTimeToRead] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const { data: globalData } = useGlobalContext();
  const { setData, data } = useEditorContext();
  const [title, setTitle] = React.useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline.configure({}),
      InlineCode.configure({
        HTMLAttributes: {
          class: "px-[2px] py-1 bg-[#1c1c1c] rounded-md font-mono",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-5 font-semibold",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-5 font-semibold",
        },
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: "border-top-2 my-2 leading-loose",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "ml-5 font-semibold",
        },
      }),
      TaskItem.configure({
        nested: true,
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-2 border-current pl-4 py-1 font-semibold my-2",
        },
      }),
    ],
    content: contentDefault,
    autofocus: true,
    editable: true,
    injectCSS: true,
    editorProps: {
      attributes: {
        class: editorAttributesClass,
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const words = content.split(" ").length;

      if (content.length) {
        const computedTime = Math.ceil(words / 200);
        setTimeToRead(computedTime);
        setTotalWords(words);
        setData({
          ...data,
          newArticle: {
            ...data.newArticle,
            timeToRead: computedTime.toString(),
            content,
          },
        });
      }
    },
    onFocus: ({ editor }) => {
      const content = editor.getHTML();
      const words = content.split(" ").length;

      if (content.length) {
        setTotalWords(content.split(" ").length);
        const computedTime = Math.ceil(words / 200);
        setTimeToRead(computedTime);
        setData({
          ...data,
          newArticle: {
            ...data.newArticle,
            timeToRead: computedTime.toString(),
            content,
          },
        });
      }
    },
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const url = new URL(
    `http://127.0.0.1:8000/api/posts/${
      globalData && globalData.identity ? globalData.identity.id : ""
    }/articles`,
  );

  async function saveImageToServer(data: string, type: string) {
    const url = new URL(join(URL_ENDPOINT_ARTICLES, "upload", "image"));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ data, image_type: type }),
    });

    return response;
  }

  async function postNewArticle() {
    const responseImage = await saveImageToServer(
      data.newArticle.image_cover,
      data.newArticle.image_type,
    );

    if (!responseImage.ok) {
      if (responseImage.status === 413) {
        return toast.error("Upps sorry, your image is too large");
      }
      return toast.error("Upps sorry, cannot save your image");
    }

    const { data: imageData } = await responseImage.json();

    if (imageData) {
      setData({
        ...data,
        newArticle: {
          ...data.newArticle,
          image_cover: imageData.url,
        },
      });
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        status: "published",
        title: data.newArticle.title,
        categories: data.newArticle.categories,
        reading_time: data.newArticle.timeToRead,
        description: data.newArticle.description,
        content: base64Encode(data.newArticle.content),
        slug: data.newArticle.title.toLowerCase().split(" ").join("-"),
        author_id:
          globalData && globalData.identity ? globalData.identity.id : "",
        image_cover: imageData ? imageData.url : data.newArticle.image_cover,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      return toast.error("Upps sorry, cannot save your article");
    }
    toast.success("Your article has been saved", {
      position: "top-right",
    });

    /* const url2 = new URL( join( URL_ENDPOINT_ARTICLES, "posts", "categories",))

    for(let i = 0; i < data.newArticle.categories.length; i++) {
      const response = await fetch(url2, {
        method: "POST",
        body: JSON.stringify({
          label: data.newArticle.categories[i].label,
        }),
      })

      if (!response.ok) {
        toast.error("Upps sorry, cannot save your article");
      }
    } */
  }

  const handleSaveNewArticle = async () => {
    if (!data.newArticle.title || !data.newArticle.content) {
      return toast.error("Title cannot be empty");
    }

    await postNewArticle();
  };

  return (
    <section className={containerWrapper}>
      <UI.Spacer y={10} />

      <EditorMetadataPreview
        metadata={{
          progress,
          timeToRead,
          totalWords,
          title,
          categories: [],
        }}
      />

      <ListCategory />

      <div
        className={cn([
          "container",
          "h-max",
          "mx-auto",
          "max-w-3xl",
          "self-start",
          "px-4",
          "flex",
          "flex-col",
        ])}
      >
        <ImageUploader />
        <UI.Spacer y={2} />
        <input
          aria-label="Title"
          className="h-14 w-full bg-transparent py-2 font-sfmono text-4xl font-bold text-current outline-none placeholder:text-current placeholder:opacity-80 placeholder:focus:opacity-100 max-md:text-xl"
          placeholder="Title..."
          onChange={(e) =>
            setData({
              ...data,
              newArticle: {
                ...data.newArticle,
                title: e.target.value,
              },
            })
          }
        />

        <UI.Spacer y={2} />
        <input
          aria-label="Description"
          className="h-14 w-full bg-transparent py-2 font-sfmono text-xl font-medium text-current outline-none placeholder:text-current placeholder:opacity-80 placeholder:focus:opacity-100 max-md:text-xl"
          placeholder="Description..."
          onChange={(e) =>
            setData({
              ...data,
              newArticle: {
                ...data.newArticle,
                description: e.target.value,
              },
            })
          }
        />
      </div>

      <UI.Spacer y={6} />
      <div className="container mx-auto h-max max-w-3xl">
        <EditorMenu editor={editor} />
      </div>
      <UI.Spacer y={2} />
      <div className="container mx-auto h-max max-w-3xl overflow-y-scroll">
        <EditorContent
          editor={editor}
          autoCorrect="false"
          autoComplete="false"
          autoCapitalize="false"
        />
      </div>

      <div
        className={cn([
          "container",
          "h-max",
          "mx-auto",
          "max-w-3xl",
          "self-start",
          "px-4",
        ])}
      >
        <UI.Spacer y={10} />
        <UI.Button
          type="button"
          size="sm"
          color="default"
          className="w-1/6"
          onPress={handleSaveNewArticle}
        >
          Save
        </UI.Button>
      </div>
    </section>
  );
}

const containerWrapper = cn([
  "container",
  "flex",
  "flex-col",
  "justify-center",
  "items-center",
  "flex-shrink-0",
  "w-full",
  "h-full",
  "my-2",
  "space-y-1",
]);

const editorAttributesClass = cn([
  "w-full",
  "h-[700px]",
  "font-sfmono",
  "p-4",
  "rounded-md",
  "outline-none",
  "dark:selection:bg-[#909090] dark:selection:text-[#252525]",
  "selection:bg-[#909090] darkselection:text-[#252525]",
]);

const contentDefault = `
<h1 id="markdown-tutorial">Markdown Tutorial</h1>
<p>This repository contains a well crafted tutorial that covers the aspects of Markdown, from the basics to advanced techniques.</p>
<p><strong>Please give this repo a ⭐ if you found it helpful!</strong></p>
<p><strong>Feel free to checkout the below video I made for this tutorial as well.</strong></p>
<p><a href="https://www.youtube.com/watch?v=jCgVc9885oQ"><img src="./markdownyt.png" alt="Video"></a></p>
<h2 id="headings">Headings</h2>
<p>Headings play a crucial role in organising your content. Markdown offers six levels of headings, each indicated by an increasing number of hash symbols (#).</p>
<p>These headings provide hierarchy and improve readability, allowing readers to navigate your content effortlessly.</p>
<pre><code># H1 - Heading <span class="hljs-number">1</span>
## H2 - Heading <span class="hljs-number">2</span>
### H3 - Heading <span class="hljs-number">3</span>
#### H4 - Heading <span class="hljs-number">4</span>
##### H5 - Heading <span class="hljs-number">5</span>
###### H6 - Heading <span class="hljs-number">6</span>
</code></pre><p><strong>Output:</strong></p>
<h1 id="h1-heading-1">H1 - Heading 1</h1>
<h2 id="h2-heading-2">H2 - Heading 2</h2>
<h3 id="h3-heading-3">H3 - Heading 3</h3>
<h4 id="h4-heading-4">H4 - Heading 4</h4>
<h5 id="h5-heading-5">H5 - Heading 5</h5>
<h6 id="h6-heading-6">H6 - Heading 6</h6>
<h2 id="codeblocks">CodeBlocks</h2>
</ul>
<p>Output:</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>
<p>Ordered lists use numbers followed by periods and spaces:</p>
<pre><code><span class="hljs-number">1.</span> Step <span class="hljs-number">1</span>
<span class="hljs-number">2.</span> Step <span class="hljs-number">2</span>
<span class="hljs-number">3.</span> Step <span class="hljs-number">3</span>
</code></pre><p>Output:</p>
<ol>
<li>Step 1</li>
<li>Step 2</li>
<li>Step 3</li>
</ol>
<h2 id="checkbox-task-list">CheckBox Task List</h2>
<p>Markdown allows you to create interactive task lists using checkboxes. These lists are handy for tracking to-do items or tasks within your documents.</p>
<pre><code>-<span class="ruby"> [X] Task <span class="hljs-number">1</span>
</span>-<span class="ruby"> [ ] Task <span class="hljs-number">2</span></span>
</code></pre><p><strong>Output:</strong></p>
<ul>
<li>[X] Task 1</li>
<li>[ ] Task 2</li>
</ul>
<h2 id="blockquote-text">Blockquote Text</h2>
<p>Blockquotes are often used to distinguish quoted content from the rest of the text. To create a blockquote, you can use the greater-than symbol (&gt;) at the beginning of the quoted lines.</p>
<pre><code>&gt; This is <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">blockquote</span> text.
</code></pre><p><strong>Output:</strong></p>
<blockquote>
<p>This is a blockquote text.</p>
</blockquote>
<h2 id="bold-italics-strikethrough-text">Bold, Italics &amp; Strikethrough Text</h2>
<p>Markdown offers various text formatting options. For bold text, enclose it with double asterisks (bold text). For italic text, use single asterisks (italic text). And for strikethrough text, use double tildes (strikethrough).</p>
<h3 id="bold">Bold</h3>
<pre><code>**This <span class="hljs-keyword">is</span> a bold <span class="hljs-built_in">text</span>.**
</code></pre><p><strong>Output:</strong></p>
<p><strong>This is a bold text.</strong></p>
<h3 id="italics">Italics</h3>
<pre><code>*This <span class="hljs-keyword">is</span> italic <span class="hljs-built_in">text</span>*
</code></pre><p><strong>Output:</strong></p>
<p><em>This is italic text</em></p>
<h3 id="bold-and-italic">Bold and Italic</h3>
<pre><code>***This <span class="hljs-keyword">is</span> combined <span class="hljs-keyword">of</span> both***
</code></pre><p><strong>Output:</strong></p>
<p><strong><em>This is combined of both</em></strong></p>
<h3 id="strikethrough-text">Strikethrough Text</h3>
<pre><code>~~This <span class="hljs-keyword">is</span> strikethrough <span class="hljs-built_in">text</span>.~~
</code></pre><p><strong>Output:</strong></p>
<p><del>This is strikethrough text.</del></p>
<h2 id="will-be-adding-rest-of-the-sections-very-soon-contributions-are-welcome-">Will be adding rest of the sections very soon! Contributions are welcome!</h2>
`;
