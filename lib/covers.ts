import data from "@/covers.json";

export type Cover = {
  issue: number;
  month: string;
  year: number;
  monthNum: number;
  file: string;
  label: string;
};

export const COVERS: Cover[] = data as Cover[];

export const YEARS: number[] = Array.from(
  new Set(COVERS.map((c) => c.year))
).sort((a, b) => a - b);

export type SortKey = "issue-asc" | "issue-desc" | "date-asc" | "date-desc";

export function dateKey(c: Cover): number {
  return c.year * 100 + c.monthNum;
}

export function sortCovers(list: Cover[], key: SortKey): Cover[] {
  const out = list.slice();
  switch (key) {
    case "issue-asc":
      return out.sort((a, b) => a.issue - b.issue);
    case "issue-desc":
      return out.sort((a, b) => b.issue - a.issue);
    case "date-asc":
      return out.sort((a, b) => dateKey(a) - dateKey(b) || a.issue - b.issue);
    case "date-desc":
      return out.sort((a, b) => dateKey(b) - dateKey(a) || b.issue - a.issue);
  }
}

export function coverSrc(c: Cover, variant: "full" | "thumb" = "full"): string {
  return variant === "thumb"
    ? `/covers/_thumbs/${c.file}`
    : `/covers/${c.file}`;
}
