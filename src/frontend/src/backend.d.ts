import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Idea {
    text: string;
    tone: string;
    category: string;
}
export interface backendInterface {
    getAllIdeas(): Promise<Array<Idea>>;
    getCategories(): Promise<Array<string>>;
    getRandomIdea(category: string, tone: string, seed: bigint): Promise<Idea | null>;
}
