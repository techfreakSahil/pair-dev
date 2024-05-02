import { Badge } from "./ui/badge";

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags?.map((tag) => (
        <Badge className="w-fit" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
