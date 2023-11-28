import { cn } from "@/lib/utils";
import * as UI from "@nextui-org/react";

export default function PreviewListPost() {
    return (
        <section
            className={cn([
                "container",
                "flex",
                "flex-col",
                "justify-center",
                "items-center",
                "flex-shrink-0",
                "w-full",
                "h-max",
                "my-8",
                "space-y-5",
            ])}
        >
            {data.map((post) => (
                <UI.Card
                    key={post.id}
                    className="w-full max-w-2xl h-max"
                    style={{ height: "max-content" }}
                >
                    <UI.CardBody>
                        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-stretch justify-center">
                            <div className="relative col-span-6 md:col-span-4">
                                <UI.Image
                                    alt="Album cover"
                                    className="object-cover"
                                    height={200}
                                    shadow="md"
                                    src="http://localhost:3000/assets/images/milad.jpg"
                                    width="100%"
                                />
                            </div>

                            <div className="flex flex-col items-start justify-start col-span-6 md:col-span-8 space-y-2">
                                <h2 className="text-xl font-medium">{post.title}</h2>
                                <p className="text-md font-light">{post.description}</p>
                            </div>
                        </div>
                    </UI.CardBody>
                </UI.Card>
            ))}
        </section>
    );
}

let data: PreviewPostData[] = [
    {
        id: "1",
        title: "Using TypeScript with React for type-safe components & prop validation",
        content: "This is content of post 1",
        description:
            "In the ever-evolving world of web development, React has established itself as a powerful library for building user interfaces.",
        category: "category 1",
        slug: "post-1",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "2",
        title: "Post 2",
        content: "This is content of post 2",
        description: "This is description of post 2",
        category: "category 2",
        slug: "post-2",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "3",
        title: "Post 3",
        content: "This is content of post 3",
        description: "This is description of post 3",
        category: "category 3",
        slug: "post-3",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "4",
        title: "Post 4",
        content: "This is content of post 4",
        description: "This is description of post 4",
        category: "category 4",
        slug: "post-4",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
    },
    {
        id: "5",
        title: "Post 5",
        content: "This is content of post 5",
        description: "This is description of post 5",
        category: "category 5",
        slug: "post-5",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
    },
    {
        id: "6",
        title: "Post 6",
        content: "This is content of post 6",
        description: "This is description of post 6",
        category: "category 6",
        slug: "post-6",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "7",
        title: "Post 7",
        content: "This is content of post 7",
        description: "This is description of post 7",
        category: "category 7",
        slug: "post-7",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "8",
        title: "Post 8",
        content: "This is content of post 8",
        description: "This is description of post 8",
        category: "category 8",
        slug: "post-8",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "9",
        title: "Post 9",
        content: "This is content of post 9",
        description: "This is description of post 9",
        category: "category 9",
        slug: "post-9",
        createdAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
        updatedAt: "2021-09-01",
    },
    {
        id: "10",
        title: "Post 10",
        content: "This is content of post 10",
        description: "This is description of post 10",
        category: "category 10",
        slug: "post-10",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
        image: "http://localhost:3000/assets/images/apple-bubble-background-b2-3840x2160-4051695046.jpeg",
    },
];

export interface PreviewPostData {
    id: string;
    title: string;
    content: string;
    description: string;
    category: string;
    slug: string;
    createdAt: string;
    image: string;
    updatedAt: string;
}
