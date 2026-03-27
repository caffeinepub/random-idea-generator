import { useMutation, useQuery } from "@tanstack/react-query";
import type { Idea } from "../backend.d";
import { useActor } from "./useActor";

const STATIC_CATEGORIES = [
  "Games",
  "Apps",
  "Websites",
  "Businesses",
  "Stories",
  "Challenges",
  "Music",
  "Art",
  "Science",
  "Education",
  "Sports",
  "Food",
  "Travel",
  "Movies",
  "Fashion",
  "Nature",
  "Tech",
  "Health",
  "Pets",
  "Comedy",
  "DIY",
  "Finance",
  "Space",
];

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return STATIC_CATEGORIES;
      try {
        const result = await actor.getCategories();
        return result.length > 0 ? result : STATIC_CATEGORIES;
      } catch {
        return STATIC_CATEGORIES;
      }
    },
    // Use static categories immediately so the UI doesn't wait for the actor
    initialData: STATIC_CATEGORIES,
    enabled: !!actor && !isFetching,
  });
}

export function useGetRandomIdea() {
  const { actor } = useActor();
  return useMutation<Idea | null, Error, { category: string; tone: string }>({
    mutationFn: async ({ category, tone }) => {
      if (!actor) throw new Error("No actor");
      return actor.getRandomIdea(category, tone, BigInt(Date.now()));
    },
  });
}
