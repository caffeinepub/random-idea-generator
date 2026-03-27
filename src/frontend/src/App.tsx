import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookMarked,
  BotMessageSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  Dice6,
  Info,
  Share2,
  Sparkles,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Idea } from "./backend.d";
import { useGetCategories, useGetRandomIdea } from "./hooks/useQueries";

const STORAGE_KEY = "idea-generator-favorites";
const HISTORY_STORAGE_KEY = "idea-generator-history";

const CATEGORY_ICONS: Record<string, string> = {
  Games: "🎮",
  Apps: "📱",
  Websites: "🌐",
  Businesses: "💼",
  Stories: "📖",
  Challenges: "🏆",
  Music: "🎵",
  Art: "🎨",
  Science: "🔬",
  Education: "🎓",
  Sports: "⚽",
  Food: "🍕",
  Travel: "✈️",
  Movies: "🎬",
  Fashion: "👗",
  Nature: "🌿",
  Tech: "💻",
  Health: "❤️",
  Pets: "🐾",
  Comedy: "😂",
  DIY: "🔧",
  Finance: "💰",
  Space: "🚀",
};

const TONE_COLORS = {
  serious: "bg-primary/20 text-primary border-primary/30",
  silly: "bg-accent/20 text-accent border-accent/30",
};

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g"];

function loadFavorites(): Idea[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: Idea[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

function loadHistory(): Idea[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(hist: Idea[]) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(hist));
}

function generateDetails(idea: Idea): string {
  const t = idea.text;
  const tl = t.toLowerCase();
  const map: Record<string, string> = {
    Games: `This game concept — "${t}" — puts a fresh spin on interactive entertainment. Players would dive into mechanics designed around curiosity and skill, with progression systems that reward experimentation. It has strong potential on both mobile and desktop, and could support solo play, co-op, or competitive modes depending on the design direction.`,
    Apps: `The app idea "${t}" tackles a genuine user need in a way that feels intuitive from the first launch. Core features would be streamlined for everyday use, keeping friction low and value high. With thoughtful UX, it could easily become a go-to tool — and its utility lends itself naturally to freemium or subscription monetization.`,
    Websites: `Imagine a website built around ${tl}. The experience would lead with clean visual design and content that earns return visits. Whether driven by a community, a curated library, or interactive tools, it could sustain itself through subscriptions, advertising, or a marketplace — and scale well as its audience grows.`,
    Businesses: `"${t}" is a business concept with real commercial legs. The market gap it addresses is meaningful, and the value proposition is clear enough to communicate quickly. A lean launch — validating with a small audience before scaling — would reduce risk while proving out the model. Long-term, there's room to expand the offering or explore adjacent verticals.`,
    Stories: `The story premise "${t}" opens with an immediately compelling hook. Characters navigating this world would face internal and external conflicts that mirror real human experiences, giving readers something to genuinely invest in. Whether told as a novel, screenplay, or serialized format, the core tension is strong enough to carry a full narrative arc.`,
    Challenges: `"${t}" is the kind of challenge that's easy to understand but hard to master — exactly the formula for something that spreads. Participants would be motivated by a mix of personal pride and social visibility, making it well-suited for platform sharing. Add a leaderboard or community component and it becomes an ongoing fixture rather than a one-off moment.`,
    Music: `The musical concept "${t}" explores territory that feels both fresh and emotionally resonant. Sonically, it offers room to blend genres or commit fully to a singular sound — either path leads somewhere interesting. As a single, EP, or full album concept, it has the character to stand out in a crowded landscape and connect with listeners looking for something genuine.`,
    Art: `"${t}" as an art concept invites viewers into a layered visual experience. The subject matter holds symbolic weight that rewards closer looking, and the execution could range from intimate and handmade to large-scale and installation-based. Whether shown in a gallery or shared digitally, it's the kind of work that sparks conversation.`,
    Science: `The scientific premise behind ${tl} opens up genuinely interesting research questions. Investigating it rigorously could yield findings that challenge existing assumptions or fill a notable gap in the literature. It's the sort of inquiry that starts in a lab or a notebook but has the potential to inform real-world applications down the line.`,
    Education: `"${t}" as an educational concept meets learners where curiosity already lives. By grounding instruction in engaging, relevant material, it sidesteps the usual barriers to retention. Whether delivered as a course, curriculum module, or interactive tool, it could meaningfully improve how a subject is understood — by students, self-learners, or professionals looking to upskill.`,
    Sports: `The sporting idea "${t}" combines physical challenge with a competitive structure that's easy to follow from the sidelines. Athletes would find the format demanding in the right ways, and spectators would have clear moments of drama to latch onto. With the right venue and community around it, it has the ingredients to grow from niche to mainstream.`,
    Food: `The culinary concept ${tl} brings something genuinely new to the table — literally. The flavor profile or format challenges expectations while remaining approachable enough for a wide audience. Whether as a restaurant concept, packaged product, or recipe series, it taps into the way people are increasingly looking for food experiences that are both memorable and shareable.`,
    Travel: `"${t}" as a travel experience reframes what a trip can be. Rather than checking boxes, it invites travelers into something more immersive and personally meaningful. Itineraries built around this concept would attract people who've tired of the obvious destinations and want something they'll actually remember — and talk about for years after.`,
    Movies: `The film concept "${t}" arrives with a premise strong enough to carry an entire production. The central conflict or world raises questions that audiences will want answered, and the tonal possibilities — whether grounded drama, elevated genre, or something in between — give a director real creative latitude. It has the feel of a project that would generate genuine buzz at the script stage.`,
    Fashion: `The fashion idea ${tl} sits at the intersection of wearability and statement-making. It respects the body while pushing the conversation around what clothing can mean or do. Whether realized as a capsule collection, a single standout piece, or a full brand identity, it speaks to a consumer who wants to dress with intention and doesn't need the obvious reference points.`,
    Nature: `"${t}" as a nature-focused concept reconnects people with the environment in a way that feels purposeful rather than performative. It could take the form of an experience, a conservation initiative, or a product that leaves the natural world better than it found it. In an era of environmental fatigue, ideas that make sustainability feel alive and personal carry real weight.`,
    Tech: `The technology concept "${t}" addresses a problem that existing solutions have handled clumsily or not at all. The core technical challenge is real, but the path to a working prototype is clear enough to pursue. Developed thoughtfully, it could have applications across multiple industries — and the kind of defensible differentiation that matters when the space gets crowded.`,
    Health: `"${t}" approaches wellness from an angle that feels human rather than clinical. It acknowledges that health behavior is emotional and social, not just informational, and designs around that reality. Whether as an app, a service, or a community model, it could make a measurable difference in how people relate to their own wellbeing — and build lasting loyalty in the process.`,
    Pets: `The pet-focused idea ${tl} taps into just how deeply people care about the animals in their lives. It addresses something owners genuinely think about, whether that's enrichment, health, convenience, or connection. With warm branding and a product or service that delivers real value, it would find a passionate and vocal customer base quickly.`,
    Comedy: `"${t}" mines a vein of humor that's both specific and broadly relatable — the sweet spot for anything that travels. The comedic premise has enough layers to sustain a set, a series, or a content format beyond a single joke. It's the kind of concept that makes people want to share it immediately, which is the most reliable form of distribution comedy has.`,
    DIY: `The DIY concept ${tl} is satisfying on multiple levels: it's achievable, it produces something tangible, and the process itself is half the reward. Clear instructions and a well-chosen materials list would make it accessible to beginners while still offering room for experienced makers to put their own spin on it. As a tutorial, kit, or workshop, it has strong community potential.`,
    Finance: `"${t}" addresses financial behavior in a way that's practical rather than preachy. It meets people at the point of real friction — whether that's budgeting, investing, or understanding what their money is actually doing — and offers a path forward that doesn't require a finance degree. Built with clarity and trust at the center, it could become a genuinely useful part of people's financial lives.`,
    Space: `The space concept "${t}" captures the sense of scale and wonder that makes this domain so compelling. Whether it's a mission architecture, a scientific question, or an experience designed to bring the cosmos closer to everyday life, it pushes at the edges of what's currently possible in the best possible way. It's the kind of idea that reminds people why exploration matters.`,
  };
  return (
    map[idea.category] ??
    `"${t}" is a creative idea with genuine potential. Whether you develop it as a side project, a business, or a personal experiment, the core concept is strong enough to build on. The best ideas often start exactly like this — simple, surprising, and full of room to grow.`
  );
}

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Random",
  ]);
  const [tone, setTone] = useState<"serious" | "silly">("serious");
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [ideaKey, setIdeaKey] = useState(0);
  const [favorites, setFavorites] = useState<Idea[]>(loadFavorites);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [history, setHistory] = useState<Idea[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories();
  const { mutate: fetchIdea, isPending } = useGetRandomIdea();

  const allCategories = ["Random", ...categories];

  const handleCategoryClick = useCallback((cat: string) => {
    if (cat === "Random") {
      setSelectedCategories(["Random"]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(cat);
        if (isSelected) {
          const next = prev.filter((c) => c !== cat);
          return next.length === 0 ? ["Random"] : next;
        }
        return prev.filter((c) => c !== "Random").concat(cat);
      });
    }
  }, []);

  const handleGenerate = useCallback(() => {
    setNoResult(false);
    const cat = selectedCategories.includes("Random")
      ? ""
      : selectedCategories[
          Math.floor(Math.random() * selectedCategories.length)
        ];
    fetchIdea(
      { category: cat, tone },
      {
        onSuccess: (idea) => {
          if (!idea) {
            setNoResult(true);
            setCurrentIdea(null);
          } else {
            setCurrentIdea(idea);
            setIdeaKey((k) => k + 1);
            setShowDetails(false);
            setHistory((prev) => {
              const next = [idea, ...prev].slice(0, 5);
              saveHistory(next);
              return next;
            });
          }
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  }, [selectedCategories, tone, fetchIdea]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    toast.success("History cleared");
  }, []);

  const isFavorited = currentIdea
    ? favorites.some(
        (f) =>
          f.text === currentIdea.text && f.category === currentIdea.category,
      )
    : false;

  const toggleFavorite = useCallback(() => {
    if (!currentIdea) return;
    setFavorites((prev) => {
      const exists = prev.some(
        (f) =>
          f.text === currentIdea.text && f.category === currentIdea.category,
      );
      const next = exists
        ? prev.filter(
            (f) =>
              !(
                f.text === currentIdea.text &&
                f.category === currentIdea.category
              ),
          )
        : [currentIdea, ...prev];
      saveFavorites(next);
      return next;
    });
  }, [currentIdea]);

  const removeFavorite = useCallback((idx: number) => {
    setFavorites((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      saveFavorites(next);
      return next;
    });
  }, []);

  const shareIdea = useCallback(() => {
    if (!currentIdea) return;
    navigator.clipboard.writeText(currentIdea.text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "Share your idea with the world 🚀",
      });
    });
  }, [currentIdea]);

  const developWithAI = useCallback(() => {
    if (!currentIdea) return;
    const prompt = `Help me develop this idea: "${currentIdea.text}" (Category: ${currentIdea.category}). Give me a detailed plan or creative direction for bringing this idea to life.`;
    const url = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [currentIdea]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleGenerate]);

  const currentYear = new Date().getFullYear();

  const showAIButton = currentIdea !== null;

  return (
    <TooltipProvider>
      <div className="min-h-dvh flex flex-col bg-background">
        {/* Background decorative blobs */}
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-8 blur-3xl bg-accent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 opacity-5 blur-3xl bg-highlight" />
        </div>

        {/* Header */}
        <header className="relative z-10 pt-10 pb-6 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl sm:text-4xl font-800 tracking-tight text-gradient-purple">
                Random Idea Generator
              </h1>
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <p className="font-body text-muted-foreground tracking-widest uppercase text-sm">
              Click · Generate · Create
            </p>
          </motion.div>
        </header>

        <main className="relative z-10 flex-1 px-4 pb-8 max-w-3xl mx-auto w-full">
          {/* Category selector */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            aria-label="Categories"
            className="mb-6"
          >
            <p className="text-muted-foreground text-xs font-body uppercase tracking-widest mb-3 text-center">
              Choose categories{" "}
              {!selectedCategories.includes("Random") &&
                selectedCategories.length > 1 && (
                  <span className="normal-case text-primary font-600">
                    ({selectedCategories.length} selected)
                  </span>
                )}
            </p>
            {categoriesLoading ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {SKELETON_KEYS.map((k) => (
                  <Skeleton key={k} className="h-9 w-24 rounded-full" />
                ))}
              </div>
            ) : (
              <fieldset className="flex flex-wrap gap-2 justify-center border-0 p-0 m-0">
                <legend className="sr-only">Category selection</legend>
                {allCategories.map((cat) => {
                  const isActive = selectedCategories.includes(cat);
                  const icon =
                    cat === "Random" ? "🎲" : (CATEGORY_ICONS[cat] ?? "✨");
                  return (
                    <button
                      type="button"
                      key={cat}
                      data-ocid={`category.${cat.toLowerCase().replace(/ /g, "_")}.tab`}
                      onClick={() => handleCategoryClick(cat)}
                      className={[
                        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-600 transition-all duration-200 border",
                        isActive
                          ? "bg-primary/25 text-primary border-primary/50 glow-purple scale-105"
                          : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground hover:bg-secondary",
                      ].join(" ")}
                      aria-pressed={isActive}
                    >
                      <span>{icon}</span>
                      {cat}
                    </button>
                  );
                })}
              </fieldset>
            )}
          </motion.section>

          {/* Tone toggle */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-8 flex justify-center"
            aria-label="Tone selection"
          >
            <div className="flex gap-1 p-1 rounded-full bg-secondary/60 border border-border">
              <button
                type="button"
                data-ocid="tone.serious.toggle"
                onClick={() => setTone("serious")}
                className={[
                  "px-5 py-2 rounded-full text-sm font-body font-600 transition-all duration-200",
                  tone === "serious"
                    ? "bg-primary/30 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
                aria-pressed={tone === "serious"}
              >
                🎯 Serious
              </button>
              <button
                type="button"
                data-ocid="tone.silly.toggle"
                onClick={() => setTone("silly")}
                className={[
                  "px-5 py-2 rounded-full text-sm font-body font-600 transition-all duration-200",
                  tone === "silly"
                    ? "bg-accent/30 text-accent shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
                aria-pressed={tone === "silly"}
              >
                🤪 Silly
              </button>
            </div>
          </motion.section>

          {/* Idea Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-8"
            aria-label="Generated idea"
          >
            <div className="gradient-border rounded-2xl glow-purple">
              <div className="bg-card rounded-2xl p-8 min-h-52 flex flex-col justify-between">
                {isPending ? (
                  <div
                    data-ocid="idea.loading_state"
                    className="flex-1 flex flex-col items-center justify-center gap-4"
                  >
                    <Dice6
                      className="w-12 h-12 text-primary animate-spin"
                      style={{ animationDuration: "1s" }}
                    />
                    <p className="text-muted-foreground font-body text-sm animate-pulse">
                      Generating your idea...
                    </p>
                  </div>
                ) : noResult ? (
                  <div
                    data-ocid="idea.error_state"
                    className="flex-1 flex flex-col items-center justify-center gap-3 text-center"
                  >
                    <p className="text-3xl">🤔</p>
                    <p className="font-display font-700 text-xl text-foreground">
                      No ideas found
                    </p>
                    <p className="text-muted-foreground font-body text-sm">
                      Try a different category or tone, then hit Generate again.
                    </p>
                  </div>
                ) : currentIdea ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ideaKey}
                      initial={{ opacity: 0, y: 18, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-start gap-3 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-xs font-body border ${tone === "serious" ? TONE_COLORS.serious : TONE_COLORS.silly}`}
                          data-ocid="idea.card"
                        >
                          {tone === "serious" ? "🎯 Serious" : "🤪 Silly"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs font-body border border-border text-muted-foreground"
                        >
                          {CATEGORY_ICONS[currentIdea.category] ?? "✨"}{" "}
                          {currentIdea.category || "Random"}
                        </Badge>
                      </div>
                      <p className="font-display font-700 text-2xl sm:text-3xl text-foreground leading-snug">
                        &ldquo;{currentIdea.text}&rdquo;
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              data-ocid="idea.save_button"
                              variant="ghost"
                              size="sm"
                              onClick={toggleFavorite}
                              className={[
                                "rounded-xl flex flex-col items-center gap-0.5 h-auto py-1 px-2 transition-all duration-200",
                                isFavorited
                                  ? "text-yellow-400 hover:text-yellow-300"
                                  : "text-muted-foreground hover:text-yellow-400",
                              ].join(" ")}
                              aria-label={
                                isFavorited
                                  ? "Remove from favorites"
                                  : "Save to favorites"
                              }
                            >
                              <Star
                                className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                              />
                              <span className="text-[10px] font-body leading-none">
                                Favorite
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isFavorited
                              ? "Remove from favorites"
                              : "Save to favorites"}
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              data-ocid="idea.share_button"
                              variant="ghost"
                              size="sm"
                              onClick={shareIdea}
                              className="rounded-xl flex flex-col items-center gap-0.5 h-auto py-1 px-2 text-muted-foreground hover:text-primary transition-all duration-200"
                              aria-label="Copy idea to clipboard"
                            >
                              <Share2 className="w-5 h-5" />
                              <span className="text-[10px] font-body leading-none">
                                Share
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy to clipboard</TooltipContent>
                        </Tooltip>
                        {showAIButton && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                data-ocid="idea.primary_button"
                                variant="ghost"
                                size="sm"
                                onClick={developWithAI}
                                className="rounded-xl flex flex-col items-center gap-0.5 h-auto py-1 px-2 text-muted-foreground hover:text-emerald-400 transition-all duration-200"
                                aria-label="Develop with AI"
                              >
                                <BotMessageSquare className="w-5 h-5" />
                                <span className="text-[10px] font-body leading-none">
                                  Develop AI
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Develop with AI</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      {/* Details toggle */}
                      <div className="border-t border-border/40 pt-3">
                        <button
                          type="button"
                          data-ocid="idea.toggle"
                          onClick={() => setShowDetails((v) => !v)}
                          className="inline-flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors duration-200"
                          aria-expanded={showDetails}
                        >
                          <Info className="w-3.5 h-3.5" />
                          {showDetails ? "Hide details" : "Show details"}
                          {showDetails ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                        <AnimatePresence>
                          {showDetails && (
                            <motion.p
                              key="details"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="mt-3 text-sm font-body text-muted-foreground leading-relaxed overflow-hidden"
                            >
                              {generateDetails(currentIdea)}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div
                    data-ocid="idea.empty_state"
                    className="flex-1 flex flex-col items-center justify-center gap-3 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                      <Zap className="w-7 h-7 text-primary opacity-60" />
                    </div>
                    <p className="font-display font-600 text-xl text-foreground/60">
                      Your next big idea awaits
                    </p>
                    <p className="text-muted-foreground font-body text-sm">
                      Pick a category and hit Generate
                    </p>
                    <p className="text-muted-foreground/50 font-body text-xs mt-1">
                      Tip: Press Space to generate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Generate button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <Button
              data-ocid="idea.primary_button"
              size="lg"
              onClick={handleGenerate}
              disabled={isPending}
              className={
                "relative px-10 py-6 text-lg font-display font-700 rounded-full " +
                "bg-primary/90 hover:bg-primary text-primary-foreground " +
                "transition-all duration-300 glow-purple hover:scale-105 active:scale-95 " +
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              }
            >
              {isPending ? (
                <>
                  <Dice6 className="mr-2 w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generate Idea
                </>
              )}
            </Button>
          </motion.div>

          {/* Recent Ideas (History) section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            aria-label="Recent ideas"
            className="mb-4"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                data-ocid="history.toggle"
                onClick={() => setShowHistory((v) => !v)}
                className="flex-1 flex items-center justify-between px-5 py-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200 group"
                aria-expanded={showHistory}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-display font-700 text-foreground">
                    Recent Ideas
                  </span>
                  {history.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/25 text-primary text-xs font-body font-700">
                      {history.length}
                    </span>
                  )}
                </div>
                {showHistory ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                )}
              </button>
              {history.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      data-ocid="history.delete_button"
                      variant="ghost"
                      size="icon"
                      onClick={clearHistory}
                      className="shrink-0 text-muted-foreground hover:text-destructive transition-colors duration-200 rounded-xl"
                      aria-label="Clear history"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear history</TooltipContent>
                </Tooltip>
              )}
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  key="history-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    {history.length === 0 ? (
                      <div
                        data-ocid="history.empty_state"
                        className="flex flex-col items-center justify-center py-10 text-center"
                      >
                        <Clock className="w-8 h-8 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground font-body text-sm">
                          No ideas generated yet
                        </p>
                      </div>
                    ) : (
                      history.map((item, i) => (
                        <motion.button
                          type="button"
                          key={`${item.text}-${i}`}
                          data-ocid={`history.item.${i + 1}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.25 }}
                          onClick={() => {
                            setCurrentIdea(item);
                            setIdeaKey((k) => k + 1);
                            setShowDetails(false);
                          }}
                          className="w-full text-left flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-200 group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-foreground line-clamp-2">
                              &ldquo;{item.text}&rdquo;
                            </p>
                            <div className="flex gap-1.5 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {CATEGORY_ICONS[item.category] ?? "✨"}{" "}
                                {item.category || "Random"}
                              </span>
                              <span className="text-muted-foreground/40">
                                ·
                              </span>
                              <span className="text-xs text-muted-foreground capitalize">
                                {item.tone}
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Favorites section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            aria-label="Saved favorites"
          >
            <button
              type="button"
              data-ocid="favorites.toggle"
              onClick={() => setShowFavorites((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-200 group"
              aria-expanded={showFavorites}
            >
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-primary" />
                <span className="font-display font-700 text-foreground">
                  Saved Ideas
                </span>
                {favorites.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/25 text-primary text-xs font-body font-700">
                    {favorites.length}
                  </span>
                )}
              </div>
              {showFavorites ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
              )}
            </button>

            <AnimatePresence>
              {showFavorites && (
                <motion.div
                  key="favorites-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    {favorites.length === 0 ? (
                      <div
                        data-ocid="favorites.empty_state"
                        className="flex flex-col items-center justify-center py-10 text-center"
                      >
                        <Star className="w-8 h-8 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground font-body text-sm">
                          No saved ideas yet — star one to keep it!
                        </p>
                      </div>
                    ) : (
                      favorites.map((fav, i) => (
                        <motion.div
                          key={fav.text}
                          data-ocid={`favorites.item.${i + 1}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.25 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-200 group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-foreground line-clamp-2">
                              &ldquo;{fav.text}&rdquo;
                            </p>
                            <div className="flex gap-1.5 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {CATEGORY_ICONS[fav.category] ?? "✨"}{" "}
                                {fav.category || "Random"}
                              </span>
                              <span className="text-muted-foreground/40">
                                ·
                              </span>
                              <span className="text-xs text-muted-foreground capitalize">
                                {fav.tone}
                              </span>
                            </div>
                          </div>
                          <Button
                            data-ocid={`favorites.delete_button.${i + 1}`}
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFavorite(i)}
                            className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200 rounded-full"
                            aria-label="Remove from favorites"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 text-center border-t border-border/50">
          <p className="text-muted-foreground/50 font-body text-xs">
            © {currentYear}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
      <Toaster position="bottom-center" />
    </TooltipProvider>
  );
}
