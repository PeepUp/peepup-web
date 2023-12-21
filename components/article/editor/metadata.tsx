import * as UI from "@nextui-org/react";

type Props = {
    metadata: EditorMetadataPreview;
};

type EditorMetadataPreview = {
    timeToRead: number;
    totalWords: number;
    progress: number;
    title: string;
    categories: string[];
};

export function EditorMetadataPreview({ metadata }: Props) {
    const { timeToRead, totalWords, progress, title, categories } = metadata;

    return (
        <div className="container flex-col flex space-y-1 h-max mx-auto max-w-3xl self-start px-4">
            <div className="w-max">
                <UI.Tooltip
                    size="sm"
                    showArrow
                    placement="top-start"
                    content={
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">Custom Content</div>
                            <div className="text-tiny">
                                This is a custom tooltip content
                            </div>
                        </div>
                    }
                >
                    <h4>Metadata: </h4>
                </UI.Tooltip>
            </div>

            <UI.Chip
                size="sm"
                variant="dot"
                color={title.length > 0 ? "default" : "danger"}
            >
                <span className="font-sfmono m-1 font-semibold">
                    Title: {title.length > 0 ? title : "Untitled..."}
                </span>
            </UI.Chip>

            <UI.Chip
                size="sm"
                variant="dot"
                color={categories.length > 0 ? "default" : "danger"}
            >
                <span className="font-sfmono m-1 font-semibold">
                    Categories:{" "}
                    {categories.length > 0
                        ? categories.map((c, i) => {
                              return (
                                  <span className="capitalize" key={i}>
                                      {c}
                                      {i !== categories.length - 1 ? ", " : null}
                                  </span>
                              );
                          })
                        : "[ ... ]"}
                </span>
            </UI.Chip>

            {totalWords > 0 ? (
                <UI.Chip size="sm" variant="dot">
                    <span className="font-sfmono m-1 font-semibold">
                        Words: {totalWords} / 1500
                    </span>
                </UI.Chip>
            ) : null}

            {timeToRead > 0 ? (
                <UI.Chip size="sm" variant="dot">
                    <span className="font-sfmono m-1 font-semibold">
                        Read time: {timeToRead} min(s)
                    </span>
                </UI.Chip>
            ) : null}

            <UI.Spacer y={5} />

      {/* <div className="w-max">
                <UI.Tooltip
                    size="sm"
                    showArrow
                    placement="top-start"
                    content={
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">Custom Content</div>
                            <div className="text-tiny">
                                This is a custom tooltip content
                            </div>
                        </div>
                    }
                >
                    <p>Progress: {progress}%</p>
                </UI.Tooltip>
                <UI.Spacer y={2} />
                <UI.Progress
                    aria-label="Progress"
                    value={progress}
                    color="default"
                    className="max-w-md"
                    size="sm"
                />
            </div>
            <UI.Spacer y={5} />
*/}
        </div>
    );
}
