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

const STATIC_IDEAS: Idea[] = [
  // Games
  {
    text: "A puzzle game to teach kids math",
    category: "Games",
    tone: "serious",
  },
  {
    text: "A strategy game about building cities",
    category: "Games",
    tone: "serious",
  },
  {
    text: "A language learning adventure game",
    category: "Games",
    tone: "serious",
  },
  {
    text: "A cooperative board game for families",
    category: "Games",
    tone: "serious",
  },
  {
    text: "A virtual reality sports simulation",
    category: "Games",
    tone: "serious",
  },
  {
    text: "A game where you play as a cheese wheel",
    category: "Games",
    tone: "silly",
  },
  { text: "A dance battle game for robots", category: "Games", tone: "silly" },
  {
    text: "A time traveling potato adventure",
    category: "Games",
    tone: "silly",
  },
  {
    text: "A game about herding cats on roller skates",
    category: "Games",
    tone: "silly",
  },
  { text: "A pizza delivery racing game", category: "Games", tone: "silly" },
  // Apps
  {
    text: "An app for tracking personal finances",
    category: "Apps",
    tone: "serious",
  },
  {
    text: "A meditation and mindfulness app",
    category: "Apps",
    tone: "serious",
  },
  { text: "A workout planner and tracker", category: "Apps", tone: "serious" },
  {
    text: "A time management and productivity tool",
    category: "Apps",
    tone: "serious",
  },
  { text: "A mental health support app", category: "Apps", tone: "serious" },
  {
    text: "An app that translates your words into emojis",
    category: "Apps",
    tone: "silly",
  },
  { text: "A virtual pet rock simulator", category: "Apps", tone: "silly" },
  { text: "A daily compliment generator", category: "Apps", tone: "silly" },
  { text: "A random joke of the day app", category: "Apps", tone: "silly" },
  {
    text: "A button that does absolutely nothing",
    category: "Apps",
    tone: "silly",
  },
  // Websites
  {
    text: "A website for online learning courses",
    category: "Websites",
    tone: "serious",
  },
  {
    text: "A professional portfolio builder",
    category: "Websites",
    tone: "serious",
  },
  {
    text: "A community forum for creators",
    category: "Websites",
    tone: "serious",
  },
  {
    text: "A digital art sharing community",
    category: "Websites",
    tone: "serious",
  },
  {
    text: "A collaborative writing platform",
    category: "Websites",
    tone: "serious",
  },
  {
    text: "A website that tells you if it's raining",
    category: "Websites",
    tone: "silly",
  },
  {
    text: "A daily picture of a squirrel doing something funny",
    category: "Websites",
    tone: "silly",
  },
  { text: "A gallery of bad haircuts", category: "Websites", tone: "silly" },
  { text: "A collection of cat memes", category: "Websites", tone: "silly" },
  {
    text: "A map of all the world's rubber duck sightings",
    category: "Websites",
    tone: "silly",
  },
  // Businesses
  {
    text: "A sustainable packaging company",
    category: "Businesses",
    tone: "serious",
  },
  {
    text: "A local organic food delivery service",
    category: "Businesses",
    tone: "serious",
  },
  {
    text: "A coworking space for artists",
    category: "Businesses",
    tone: "serious",
  },
  {
    text: "A subscription box for healthy snacks",
    category: "Businesses",
    tone: "serious",
  },
  {
    text: "A tech repair service for seniors",
    category: "Businesses",
    tone: "serious",
  },
  {
    text: "A store that only sells left shoes",
    category: "Businesses",
    tone: "silly",
  },
  { text: "A pet rock adoption agency", category: "Businesses", tone: "silly" },
  {
    text: "A consulting firm for imaginary friends",
    category: "Businesses",
    tone: "silly",
  },
  {
    text: "A company that organizes pretend birthdays",
    category: "Businesses",
    tone: "silly",
  },
  {
    text: "A shop for personalized rubber duckies",
    category: "Businesses",
    tone: "silly",
  },
  // Stories
  {
    text: "A tale of overcoming adversity in a new city",
    category: "Stories",
    tone: "serious",
  },
  {
    text: "A mystery thriller with a twist ending",
    category: "Stories",
    tone: "serious",
  },
  {
    text: "A coming of age story about finding your passion",
    category: "Stories",
    tone: "serious",
  },
  {
    text: "A drama about family and forgiveness",
    category: "Stories",
    tone: "serious",
  },
  {
    text: "A fantasy epic with dragons and magic",
    category: "Stories",
    tone: "serious",
  },
  {
    text: "A story about a dancing elephant detective",
    category: "Stories",
    tone: "silly",
  },
  { text: "A tale of a superhero potato", category: "Stories", tone: "silly" },
  {
    text: "A mystery set in a world made of cheese",
    category: "Stories",
    tone: "silly",
  },
  {
    text: "A detective story about missing socks",
    category: "Stories",
    tone: "silly",
  },
  {
    text: "A comedy about a wizard who can't remember spells",
    category: "Stories",
    tone: "silly",
  },
  // Challenges
  {
    text: "A 30-day healthy eating challenge",
    category: "Challenges",
    tone: "serious",
  },
  {
    text: "A month-long gratitude journaling challenge",
    category: "Challenges",
    tone: "serious",
  },
  {
    text: "A reading challenge for personal growth",
    category: "Challenges",
    tone: "serious",
  },
  {
    text: "A digital detox week-long challenge",
    category: "Challenges",
    tone: "serious",
  },
  {
    text: "A creative writing prompt series",
    category: "Challenges",
    tone: "serious",
  },
  {
    text: "A challenge to wear mismatched socks for a week",
    category: "Challenges",
    tone: "silly",
  },
  {
    text: "A daily dance like nobody's watching challenge",
    category: "Challenges",
    tone: "silly",
  },
  {
    text: "A challenge to speak only in rhymes for a day",
    category: "Challenges",
    tone: "silly",
  },
  {
    text: "A competition for the best rubber band trick shot",
    category: "Challenges",
    tone: "silly",
  },
  {
    text: "A challenge to create the world's longest paper chain",
    category: "Challenges",
    tone: "silly",
  },
  // Music
  {
    text: "A platform to connect local musicians for gigs",
    category: "Music",
    tone: "serious",
  },
  {
    text: "A music theory course for beginners",
    category: "Music",
    tone: "serious",
  },
  {
    text: "A collaborative album recording platform",
    category: "Music",
    tone: "serious",
  },
  {
    text: "A concert discovery app for indie artists",
    category: "Music",
    tone: "serious",
  },
  {
    text: "A live session streaming platform for musicians",
    category: "Music",
    tone: "serious",
  },
  { text: "A band made entirely of kazoos", category: "Music", tone: "silly" },
  {
    text: "A playlist of songs about breakfast foods",
    category: "Music",
    tone: "silly",
  },
  {
    text: "A rap battle between historical figures",
    category: "Music",
    tone: "silly",
  },
  {
    text: "A symphony composed entirely of sneezes",
    category: "Music",
    tone: "silly",
  },
  {
    text: "A song that changes genre every 10 seconds",
    category: "Music",
    tone: "silly",
  },
  // Art
  {
    text: "A digital gallery for emerging artists",
    category: "Art",
    tone: "serious",
  },
  {
    text: "A community mural project in an underserved area",
    category: "Art",
    tone: "serious",
  },
  {
    text: "A photography series on human resilience",
    category: "Art",
    tone: "serious",
  },
  {
    text: "A marketplace for print-on-demand original art",
    category: "Art",
    tone: "serious",
  },
  {
    text: "A public installation exploring climate change",
    category: "Art",
    tone: "serious",
  },
  {
    text: "A portrait of a potato as a Renaissance noble",
    category: "Art",
    tone: "silly",
  },
  {
    text: "A painting of dogs judging a modern art exhibit",
    category: "Art",
    tone: "silly",
  },
  {
    text: "A comic strip about a superhero with terrible powers",
    category: "Art",
    tone: "silly",
  },
  {
    text: "A mural of famous historical figures eating pizza",
    category: "Art",
    tone: "silly",
  },
  {
    text: "A drawing of your pet as a medieval knight",
    category: "Art",
    tone: "silly",
  },
  // Science
  {
    text: "A citizen science app for tracking local wildlife",
    category: "Science",
    tone: "serious",
  },
  {
    text: "An interactive tool for learning about DNA",
    category: "Science",
    tone: "serious",
  },
  {
    text: "A virtual lab for high school chemistry",
    category: "Science",
    tone: "serious",
  },
  {
    text: "A space exploration simulator for classrooms",
    category: "Science",
    tone: "serious",
  },
  {
    text: "A database of endangered plant species",
    category: "Science",
    tone: "serious",
  },
  {
    text: "An experiment to find out if socks evolve in the dryer",
    category: "Science",
    tone: "silly",
  },
  {
    text: "A study on why cats knock things off tables",
    category: "Science",
    tone: "silly",
  },
  {
    text: "A theory that explains why pizza tastes better at midnight",
    category: "Science",
    tone: "silly",
  },
  {
    text: "An analysis of why dogs tilt their heads",
    category: "Science",
    tone: "silly",
  },
  {
    text: "A controlled experiment on the best pillow fort design",
    category: "Science",
    tone: "silly",
  },
  // Education
  {
    text: "A tutoring platform that matches students with mentors",
    category: "Education",
    tone: "serious",
  },
  {
    text: "An adaptive learning app for children with dyslexia",
    category: "Education",
    tone: "serious",
  },
  {
    text: "A tool for teachers to create interactive quizzes",
    category: "Education",
    tone: "serious",
  },
  {
    text: "A coding bootcamp for underprivileged youth",
    category: "Education",
    tone: "serious",
  },
  {
    text: "An app for learning sign language interactively",
    category: "Education",
    tone: "serious",
  },
  {
    text: "A class where the homework is eating snacks",
    category: "Education",
    tone: "silly",
  },
  {
    text: "A degree program in professional napping",
    category: "Education",
    tone: "silly",
  },
  {
    text: "A masterclass in making the best silly faces",
    category: "Education",
    tone: "silly",
  },
  {
    text: "A textbook written entirely in puns",
    category: "Education",
    tone: "silly",
  },
  {
    text: "A test where every correct answer gets you a sticker",
    category: "Education",
    tone: "silly",
  },
  // Sports
  {
    text: "A platform for connecting youth athletes with coaches",
    category: "Sports",
    tone: "serious",
  },
  {
    text: "A mental performance coaching app for athletes",
    category: "Sports",
    tone: "serious",
  },
  {
    text: "A sports nutrition tracking app for amateurs",
    category: "Sports",
    tone: "serious",
  },
  {
    text: "A platform for scheduling community pickup games",
    category: "Sports",
    tone: "serious",
  },
  {
    text: "A sports history podcast for casual fans",
    category: "Sports",
    tone: "serious",
  },
  {
    text: "A professional competitive couch sitting league",
    category: "Sports",
    tone: "silly",
  },
  {
    text: "A synchronized swimming team for dogs",
    category: "Sports",
    tone: "silly",
  },
  {
    text: "An Olympic event for competitive napping",
    category: "Sports",
    tone: "silly",
  },
  {
    text: "A duel fought entirely with pool noodles",
    category: "Sports",
    tone: "silly",
  },
  {
    text: "A sport where the goal is to lose on purpose",
    category: "Sports",
    tone: "silly",
  },
  // Food
  {
    text: "A meal kit service for people with food allergies",
    category: "Food",
    tone: "serious",
  },
  {
    text: "A food waste tracking app for restaurants",
    category: "Food",
    tone: "serious",
  },
  {
    text: "A recipe app focused on budget-friendly nutrition",
    category: "Food",
    tone: "serious",
  },
  {
    text: "A farm-to-table marketplace connecting growers and chefs",
    category: "Food",
    tone: "serious",
  },
  {
    text: "A global spice subscription box with recipes",
    category: "Food",
    tone: "serious",
  },
  {
    text: "A restaurant where every dish is shaped like a dinosaur",
    category: "Food",
    tone: "silly",
  },
  {
    text: "A pizza with every topping imaginable including gummy bears",
    category: "Food",
    tone: "silly",
  },
  {
    text: "A cooking show where the host has never cooked before",
    category: "Food",
    tone: "silly",
  },
  {
    text: "A food truck that serves only foods beginning with P",
    category: "Food",
    tone: "silly",
  },
  {
    text: "A smoothie made from foods found in sofa cushions",
    category: "Food",
    tone: "silly",
  },
  // Travel
  {
    text: "A solo travel safety app for women",
    category: "Travel",
    tone: "serious",
  },
  {
    text: "A platform for sustainable and eco-friendly travel",
    category: "Travel",
    tone: "serious",
  },
  {
    text: "A city guide curated by local residents",
    category: "Travel",
    tone: "serious",
  },
  {
    text: "A community for travelers with disabilities",
    category: "Travel",
    tone: "serious",
  },
  {
    text: "A tool to plan multi-city itineraries on a budget",
    category: "Travel",
    tone: "serious",
  },
  {
    text: "A tour of the world's worst tourist traps",
    category: "Travel",
    tone: "silly",
  },
  {
    text: "A vacation where your only destination is your couch",
    category: "Travel",
    tone: "silly",
  },
  {
    text: "A hotel where everything is upside down",
    category: "Travel",
    tone: "silly",
  },
  {
    text: "A walking tour guided entirely by a confused parrot",
    category: "Travel",
    tone: "silly",
  },
  {
    text: "A vacation package to the most boring town on Earth",
    category: "Travel",
    tone: "silly",
  },
  // Movies
  {
    text: "A documentary about the untold stories of film extras",
    category: "Movies",
    tone: "serious",
  },
  {
    text: "A film about a journalist uncovering corporate fraud",
    category: "Movies",
    tone: "serious",
  },
  {
    text: "A biographical film about a forgotten inventor",
    category: "Movies",
    tone: "serious",
  },
  {
    text: "A crowdfunded animated series about climate refugees",
    category: "Movies",
    tone: "serious",
  },
  {
    text: "A virtual cinema club for discussing indie films",
    category: "Movies",
    tone: "serious",
  },
  {
    text: "A horror film where the villain is a sentient spreadsheet",
    category: "Movies",
    tone: "silly",
  },
  {
    text: "A buddy cop film starring two golden retrievers",
    category: "Movies",
    tone: "silly",
  },
  {
    text: "A thriller about a missing TV remote",
    category: "Movies",
    tone: "silly",
  },
  {
    text: "A heist film where they steal a giant wheel of cheese",
    category: "Movies",
    tone: "silly",
  },
  {
    text: "A disaster movie about a city-wide shortage of napkins",
    category: "Movies",
    tone: "silly",
  },
  // Fashion
  {
    text: "A sustainable clothing brand using recycled materials",
    category: "Fashion",
    tone: "serious",
  },
  {
    text: "A platform for renting high-end fashion for events",
    category: "Fashion",
    tone: "serious",
  },
  {
    text: "A marketplace for second-hand luxury fashion",
    category: "Fashion",
    tone: "serious",
  },
  {
    text: "An AR try-on tool for online clothing shopping",
    category: "Fashion",
    tone: "serious",
  },
  {
    text: "A subscription box for ethically made accessories",
    category: "Fashion",
    tone: "serious",
  },
  {
    text: "A line of clothing exclusively for cats going to brunch",
    category: "Fashion",
    tone: "silly",
  },
  {
    text: "Pants with 47 pockets for ultimate preparedness",
    category: "Fashion",
    tone: "silly",
  },
  {
    text: "A runway show where all models are penguins",
    category: "Fashion",
    tone: "silly",
  },
  {
    text: "A tuxedo designed for very formal naps",
    category: "Fashion",
    tone: "silly",
  },
  {
    text: "Socks that play music when you wiggle your toes",
    category: "Fashion",
    tone: "silly",
  },
  // Nature
  {
    text: "An app for identifying local plants and wildlife",
    category: "Nature",
    tone: "serious",
  },
  {
    text: "A community garden management platform",
    category: "Nature",
    tone: "serious",
  },
  {
    text: "A national park trip planner with accessibility info",
    category: "Nature",
    tone: "serious",
  },
  {
    text: "A platform connecting volunteers for trail maintenance",
    category: "Nature",
    tone: "serious",
  },
  {
    text: "A podcast about the secret lives of urban wildlife",
    category: "Nature",
    tone: "serious",
  },
  {
    text: "A reality show where squirrels compete for the best nut",
    category: "Nature",
    tone: "silly",
  },
  {
    text: "A weather app narrated by a dramatic seagull",
    category: "Nature",
    tone: "silly",
  },
  {
    text: "A cloud-watching competition with official judges",
    category: "Nature",
    tone: "silly",
  },
  {
    text: "A talking tree who gives unsolicited life advice",
    category: "Nature",
    tone: "silly",
  },
  {
    text: "An app that lets you argue with the weather forecast",
    category: "Nature",
    tone: "silly",
  },
  // Tech
  {
    text: "A no-code tool for building internal business dashboards",
    category: "Tech",
    tone: "serious",
  },
  {
    text: "An AI assistant for summarizing long documents",
    category: "Tech",
    tone: "serious",
  },
  {
    text: "A browser extension that blocks dark UI patterns",
    category: "Tech",
    tone: "serious",
  },
  {
    text: "A tool that audits websites for accessibility issues",
    category: "Tech",
    tone: "serious",
  },
  {
    text: "A smart home energy monitor with AI optimization",
    category: "Tech",
    tone: "serious",
  },
  {
    text: "An app that translates your code into interpretive dance",
    category: "Tech",
    tone: "silly",
  },
  {
    text: "An AI that writes passive-aggressive out-of-office replies",
    category: "Tech",
    tone: "silly",
  },
  {
    text: "A GPS that narrates your drive as a fantasy quest",
    category: "Tech",
    tone: "silly",
  },
  {
    text: "A smart fridge that judges your midnight snack choices",
    category: "Tech",
    tone: "silly",
  },
  {
    text: "A printer that prints motivational quotes on demand",
    category: "Tech",
    tone: "silly",
  },
  // Health
  {
    text: "A symptom tracker app that prepares you for doctor visits",
    category: "Health",
    tone: "serious",
  },
  {
    text: "A mental health check-in tool for remote teams",
    category: "Health",
    tone: "serious",
  },
  {
    text: "A sleep quality coach powered by wearable data",
    category: "Health",
    tone: "serious",
  },
  {
    text: "A telehealth platform for rural communities",
    category: "Health",
    tone: "serious",
  },
  {
    text: "A posture coaching app for people who work at desks",
    category: "Health",
    tone: "serious",
  },
  {
    text: "An app that applauds you for drinking a glass of water",
    category: "Health",
    tone: "silly",
  },
  {
    text: "A meditation app narrated by a very sleepy sloth",
    category: "Health",
    tone: "silly",
  },
  {
    text: "A health app that rewards you with virtual confetti",
    category: "Health",
    tone: "silly",
  },
  {
    text: "A yoga pose named after household appliances",
    category: "Health",
    tone: "silly",
  },
  {
    text: "A diet plan where every meal is shaped like a star",
    category: "Health",
    tone: "silly",
  },
  // Pets
  {
    text: "A lost pet tracking network using community sightings",
    category: "Pets",
    tone: "serious",
  },
  {
    text: "A pet nutrition planner based on breed and age",
    category: "Pets",
    tone: "serious",
  },
  {
    text: "A foster pet matchmaking service for shelters",
    category: "Pets",
    tone: "serious",
  },
  {
    text: "A pet health journal synced with vet records",
    category: "Pets",
    tone: "serious",
  },
  {
    text: "A pet-friendly travel guide for road trips",
    category: "Pets",
    tone: "serious",
  },
  {
    text: "A talent agency for cats who want to be influencers",
    category: "Pets",
    tone: "silly",
  },
  {
    text: "A dog translator that guesses what your pet is thinking",
    category: "Pets",
    tone: "silly",
  },
  {
    text: "A reality TV show where hamsters run for mayor",
    category: "Pets",
    tone: "silly",
  },
  {
    text: "A dating app that matches pets based on their personality",
    category: "Pets",
    tone: "silly",
  },
  {
    text: "A newsletter written entirely by a very opinionated parrot",
    category: "Pets",
    tone: "silly",
  },
  // Comedy
  {
    text: "A platform for emerging stand-up comedians to find gigs",
    category: "Comedy",
    tone: "serious",
  },
  {
    text: "A podcast exploring the science of what makes us laugh",
    category: "Comedy",
    tone: "serious",
  },
  {
    text: "A comedy festival app connecting fans and performers",
    category: "Comedy",
    tone: "serious",
  },
  {
    text: "A comedy therapy program for hospital patients",
    category: "Comedy",
    tone: "serious",
  },
  {
    text: "A mentorship program pairing new comedians with veterans",
    category: "Comedy",
    tone: "serious",
  },
  {
    text: "A stand-up set performed entirely by a malfunctioning robot",
    category: "Comedy",
    tone: "silly",
  },
  {
    text: "A comedian whose only prop is a single potato",
    category: "Comedy",
    tone: "silly",
  },
  {
    text: "A roast of a household appliance",
    category: "Comedy",
    tone: "silly",
  },
  {
    text: "A comedy duo where both members are the straight man",
    category: "Comedy",
    tone: "silly",
  },
  {
    text: "A punchline that arrives three days after the setup",
    category: "Comedy",
    tone: "silly",
  },
  // DIY
  {
    text: "A step-by-step home repair app for first-time homeowners",
    category: "DIY",
    tone: "serious",
  },
  {
    text: "A platform for sharing upcycling and repurposing tutorials",
    category: "DIY",
    tone: "serious",
  },
  {
    text: "A community for people building their own tiny homes",
    category: "DIY",
    tone: "serious",
  },
  {
    text: "A woodworking plan library for beginners",
    category: "DIY",
    tone: "serious",
  },
  {
    text: "A guide to building your own solar panel system",
    category: "DIY",
    tone: "serious",
  },
  {
    text: "A birdhouse shaped exactly like a tiny bank",
    category: "DIY",
    tone: "silly",
  },
  {
    text: "A lamp made from 200 rubber ducks wired together",
    category: "DIY",
    tone: "silly",
  },
  {
    text: "A wind chime made from old spoons and regret",
    category: "DIY",
    tone: "silly",
  },
  {
    text: "A garden scarecrow wearing a business suit",
    category: "DIY",
    tone: "silly",
  },
  { text: "A hammock woven from 400 zip ties", category: "DIY", tone: "silly" },
  // Finance
  {
    text: "A budgeting app designed for freelancers with irregular income",
    category: "Finance",
    tone: "serious",
  },
  {
    text: "A platform teaching teenagers about investing",
    category: "Finance",
    tone: "serious",
  },
  {
    text: "A debt payoff planner with visual progress tracking",
    category: "Finance",
    tone: "serious",
  },
  {
    text: "A small business cash flow forecasting tool",
    category: "Finance",
    tone: "serious",
  },
  {
    text: "A newsletter explaining economic news in plain language",
    category: "Finance",
    tone: "serious",
  },
  {
    text: "A stock market app that predicts prices using astrology",
    category: "Finance",
    tone: "silly",
  },
  {
    text: "A budget tracker that sighs every time you buy coffee",
    category: "Finance",
    tone: "silly",
  },
  {
    text: "A cryptocurrency backed entirely by the concept of naps",
    category: "Finance",
    tone: "silly",
  },
  {
    text: "A piggy bank that judges your spending out loud",
    category: "Finance",
    tone: "silly",
  },
  {
    text: "A money management course taught entirely by a raccoon",
    category: "Finance",
    tone: "silly",
  },
  // Space
  {
    text: "A citizen astronomy app for tracking celestial events",
    category: "Space",
    tone: "serious",
  },
  {
    text: "An educational game simulating Mars colony logistics",
    category: "Space",
    tone: "serious",
  },
  {
    text: "A tool for visualizing the scale of the solar system",
    category: "Space",
    tone: "serious",
  },
  {
    text: "A VR experience of walking on the Moon",
    category: "Space",
    tone: "serious",
  },
  {
    text: "A community for amateur telescope builders",
    category: "Space",
    tone: "serious",
  },
  {
    text: "A Yelp for alien civilizations to review visiting Earth",
    category: "Space",
    tone: "silly",
  },
  {
    text: "A space tourism brochure for the inside of a black hole",
    category: "Space",
    tone: "silly",
  },
  {
    text: "A Mars colony where the HOA rules are extremely strict",
    category: "Space",
    tone: "silly",
  },
  {
    text: "A documentary about aliens who are very disappointed in us",
    category: "Space",
    tone: "silly",
  },
  {
    text: "A star naming service where every star is called Gerald",
    category: "Space",
    tone: "silly",
  },
  // --- CREATIVE TONE ---
  // Games - creative
  {
    text: "A game where you paint living ecosystems that evolve on their own",
    category: "Games",
    tone: "creative",
  },
  {
    text: "A music-driven platformer where the world reshapes to every beat",
    category: "Games",
    tone: "creative",
  },
  {
    text: "A dream architect game where you sculpt other people's nightmares",
    category: "Games",
    tone: "creative",
  },
  {
    text: "A cooperative game where each player controls one sense of a single character",
    category: "Games",
    tone: "creative",
  },
  {
    text: "A game played through writing poetry that changes the environment",
    category: "Games",
    tone: "creative",
  },
  // Apps - creative
  {
    text: "An app that turns your daily mood into an evolving abstract painting",
    category: "Apps",
    tone: "creative",
  },
  {
    text: "A collaborative storytelling app where strangers add one sentence per day",
    category: "Apps",
    tone: "creative",
  },
  {
    text: "An app that remixes your photos into a unique generative art style each morning",
    category: "Apps",
    tone: "creative",
  },
  {
    text: "A soundscape composer app that lets you layer field recordings into music",
    category: "Apps",
    tone: "creative",
  },
  {
    text: "An app that translates your handwriting into custom vector fonts",
    category: "Apps",
    tone: "creative",
  },
  // Websites - creative
  {
    text: "A website where every visitor's cursor leaves a permanent mark on a shared canvas",
    category: "Websites",
    tone: "creative",
  },
  {
    text: "An interactive poetry site where words rearrange themselves based on the weather",
    category: "Websites",
    tone: "creative",
  },
  {
    text: "A gallery of micro-animations inspired by nature submitted by artists worldwide",
    category: "Websites",
    tone: "creative",
  },
  {
    text: "A site where users collaboratively illustrate a never-ending graphic novel",
    category: "Websites",
    tone: "creative",
  },
  {
    text: "A generative music website that creates ambient soundscapes from live news data",
    category: "Websites",
    tone: "creative",
  },
  // Businesses - creative
  {
    text: "A subscription box that sends monthly art supplies with a hidden theme to discover",
    category: "Businesses",
    tone: "creative",
  },
  {
    text: "A studio that turns client data visualizations into fine art prints",
    category: "Businesses",
    tone: "creative",
  },
  {
    text: "A service that composes personalized lullabies for new parents",
    category: "Businesses",
    tone: "creative",
  },
  {
    text: "A pop-up experience business that creates immersive sensory art installations",
    category: "Businesses",
    tone: "creative",
  },
  {
    text: "A creative agency that designs scent-based branding for companies",
    category: "Businesses",
    tone: "creative",
  },
  // Stories - creative
  {
    text: "A story told entirely through found objects left on a park bench",
    category: "Stories",
    tone: "creative",
  },
  {
    text: "A narrative where every chapter is written in a different artistic style",
    category: "Stories",
    tone: "creative",
  },
  {
    text: "A tale of a cartographer who discovers her maps are slowly coming to life",
    category: "Stories",
    tone: "creative",
  },
  {
    text: "A story constructed from the margins notes left in a secondhand library book",
    category: "Stories",
    tone: "creative",
  },
  {
    text: "A painter who realizes each canvas she completes erases a memory from her past",
    category: "Stories",
    tone: "creative",
  },
  // Challenges - creative
  {
    text: "Create a piece of art using only materials found in your kitchen",
    category: "Challenges",
    tone: "creative",
  },
  {
    text: "Write a short story in exactly 100 words where every sentence starts with the next letter of the alphabet",
    category: "Challenges",
    tone: "creative",
  },
  {
    text: "Design a logo for an imaginary country using only found objects you photograph",
    category: "Challenges",
    tone: "creative",
  },
  {
    text: "Compose a song using only percussion sounds made from household items",
    category: "Challenges",
    tone: "creative",
  },
  {
    text: "Remake a famous painting using food as your medium",
    category: "Challenges",
    tone: "creative",
  },
  // Music - creative
  {
    text: "An album where each track is a sonic portrait of a different color",
    category: "Music",
    tone: "creative",
  },
  {
    text: "A live performance where the audience's heartbeats drive the tempo in real time",
    category: "Music",
    tone: "creative",
  },
  {
    text: "A concept album that can only be experienced in complete darkness",
    category: "Music",
    tone: "creative",
  },
  {
    text: "A piece composed entirely from the ambient sounds of an abandoned factory",
    category: "Music",
    tone: "creative",
  },
  {
    text: "An interactive score where listeners rearrange movements to create their own version",
    category: "Music",
    tone: "creative",
  },
  // Art - creative
  {
    text: "A sculpture series that can only be seen completely when viewed from above",
    category: "Art",
    tone: "creative",
  },
  {
    text: "A mural that changes appearance depending on the time of day due to reflective pigments",
    category: "Art",
    tone: "creative",
  },
  {
    text: "An installation made from thousands of handwritten letters from strangers",
    category: "Art",
    tone: "creative",
  },
  {
    text: "A portrait series where subjects are painted using only their own handwriting as texture",
    category: "Art",
    tone: "creative",
  },
  {
    text: "A living artwork where plants grow through a metal structure over the course of a year",
    category: "Art",
    tone: "creative",
  },
  // Science - creative
  {
    text: "Using bioluminescent bacteria to create living, glowing artwork in a lab setting",
    category: "Science",
    tone: "creative",
  },
  {
    text: "A research project exploring how musical frequencies affect plant growth patterns",
    category: "Science",
    tone: "creative",
  },
  {
    text: "Designing buildings whose facades generate electricity from wind vibrations like a musical instrument",
    category: "Science",
    tone: "creative",
  },
  {
    text: "Developing edible packaging that changes flavor based on the food it contains",
    category: "Science",
    tone: "creative",
  },
  {
    text: "Creating a material that hardens under sound waves instead of heat",
    category: "Science",
    tone: "creative",
  },
  // Education - creative
  {
    text: "A history curriculum taught entirely through immersive role-playing scenarios",
    category: "Education",
    tone: "creative",
  },
  {
    text: "A math program that teaches geometry by having students design and build furniture",
    category: "Education",
    tone: "creative",
  },
  {
    text: "A language class where students write and perform an original musical in the new language",
    category: "Education",
    tone: "creative",
  },
  {
    text: "A science course where every lesson begins with a student-led magic trick explained by physics",
    category: "Education",
    tone: "creative",
  },
  {
    text: "An art history class taught in reverse chronological order, starting with street art today",
    category: "Education",
    tone: "creative",
  },
  // Sports - creative
  {
    text: "A sport played on a giant chessboard where athletes move as living chess pieces",
    category: "Sports",
    tone: "creative",
  },
  {
    text: "An underwater obstacle course that incorporates synchronized swimming elements",
    category: "Sports",
    tone: "creative",
  },
  {
    text: "A team relay race where each leg involves a different creative discipline like origami or speed drawing",
    category: "Sports",
    tone: "creative",
  },
  {
    text: "A sport that combines freerunning with collaborative mural painting",
    category: "Sports",
    tone: "creative",
  },
  {
    text: "An architectural design competition scored like an Olympic event with judges and live audiences",
    category: "Sports",
    tone: "creative",
  },
  // Food - creative
  {
    text: "A restaurant where every dish is inspired by a different surrealist painting",
    category: "Food",
    tone: "creative",
  },
  {
    text: "A dessert line that recreates famous literary landscapes in edible form",
    category: "Food",
    tone: "creative",
  },
  {
    text: "A cocktail menu based entirely on emotions, where you order by how you feel",
    category: "Food",
    tone: "creative",
  },
  {
    text: "A bakery that makes bread sculptures of famous architecture",
    category: "Food",
    tone: "creative",
  },
  {
    text: "A tasting menu inspired by different world musical genres, each course paired with a live performance",
    category: "Food",
    tone: "creative",
  },
  // Travel - creative
  {
    text: "A journey through a city visiting only places that inspired famous novels",
    category: "Travel",
    tone: "creative",
  },
  {
    text: "A trip designed entirely around attending one performance art event per country",
    category: "Travel",
    tone: "creative",
  },
  {
    text: "A travel experience where you spend a week living as a local artisan in each destination",
    category: "Travel",
    tone: "creative",
  },
  {
    text: "A world tour visiting cities only at night to experience their hidden luminous identity",
    category: "Travel",
    tone: "creative",
  },
  {
    text: "A journey retracing the exact route of a beloved author's most famous novel",
    category: "Travel",
    tone: "creative",
  },
  // Movies - creative
  {
    text: "A film told entirely from the perspective of a painting hanging in the protagonist's home",
    category: "Movies",
    tone: "creative",
  },
  {
    text: "A documentary where the subject is allowed to direct their own portrayal",
    category: "Movies",
    tone: "creative",
  },
  {
    text: "A movie where the color palette shifts to reflect the emotional arc of each character",
    category: "Movies",
    tone: "creative",
  },
  {
    text: "A story told simultaneously from three characters' perspectives through three different film genres",
    category: "Movies",
    tone: "creative",
  },
  {
    text: "A silent film made in the present day that communicates entirely through visual metaphor",
    category: "Movies",
    tone: "creative",
  },
  // Fashion - creative
  {
    text: "A clothing line where each garment is designed to be worn in multiple completely different ways",
    category: "Fashion",
    tone: "creative",
  },
  {
    text: "A collection inspired by the visual language of musical notation",
    category: "Fashion",
    tone: "creative",
  },
  {
    text: "Wearable sculptures that double as functional fashion pieces for urban environments",
    category: "Fashion",
    tone: "creative",
  },
  {
    text: "A fashion line where garments change texture and drape based on temperature",
    category: "Fashion",
    tone: "creative",
  },
  {
    text: "A collaborative collection where ten artists each design one piece inspired by the same poem",
    category: "Fashion",
    tone: "creative",
  },
  // Nature - creative
  {
    text: "A trail system designed as a living poem carved through a forest",
    category: "Nature",
    tone: "creative",
  },
  {
    text: "A garden designed to bloom in a sequence that spells out a message over the seasons",
    category: "Nature",
    tone: "creative",
  },
  {
    text: "A conservation project that maps migration patterns as visual art installations",
    category: "Nature",
    tone: "creative",
  },
  {
    text: "A sound installation in a forest that amplifies the natural sounds into a composed symphony",
    category: "Nature",
    tone: "creative",
  },
  {
    text: "A living bridge made of trained tree roots grown over decades",
    category: "Nature",
    tone: "creative",
  },
  // Tech - creative
  {
    text: "A browser extension that reimagines every webpage as a hand-illustrated zine",
    category: "Tech",
    tone: "creative",
  },
  {
    text: "An AR tool that lets urban planners visualize future green spaces in real time",
    category: "Tech",
    tone: "creative",
  },
  {
    text: "A keyboard that generates unique ambient music while you type",
    category: "Tech",
    tone: "creative",
  },
  {
    text: "A platform that converts open-source code contributions into generative visual art",
    category: "Tech",
    tone: "creative",
  },
  {
    text: "A tool that turns your sleep data into a personalized morning soundscape",
    category: "Tech",
    tone: "creative",
  },
  // Health - creative
  {
    text: "A wellness program that uses improvisational theater to build emotional resilience",
    category: "Health",
    tone: "creative",
  },
  {
    text: "A therapy approach that uses collaborative mural painting as group healing",
    category: "Health",
    tone: "creative",
  },
  {
    text: "A fitness routine built around the choreography of historical battle dances",
    category: "Health",
    tone: "creative",
  },
  {
    text: "A mindfulness practice delivered through illustrated graphic novels",
    category: "Health",
    tone: "creative",
  },
  {
    text: "A health journal app that turns your entries into visual poetry each week",
    category: "Health",
    tone: "creative",
  },
  // Pets - creative
  {
    text: "A photography series capturing the secret lives of city cats at 3am",
    category: "Pets",
    tone: "creative",
  },
  {
    text: "An agility course designed with artistic obstacles so training doubles as performance art",
    category: "Pets",
    tone: "creative",
  },
  {
    text: "A pet memoir written from the animal's point of view, illustrated by the owner",
    category: "Pets",
    tone: "creative",
  },
  {
    text: "A music album composed from recordings of different pets' sounds harmonized together",
    category: "Pets",
    tone: "creative",
  },
  {
    text: "A fashion line of sculptural accessories designed to complement various dog breeds' natural silhouettes",
    category: "Pets",
    tone: "creative",
  },
  // Comedy - creative
  {
    text: "A stand-up show where the comedian only performs jokes written by their elderly relatives",
    category: "Comedy",
    tone: "creative",
  },
  {
    text: "An improv troupe that performs historical events with completely wrong but plausible details",
    category: "Comedy",
    tone: "creative",
  },
  {
    text: "A comedy podcast where each episode explains a complex topic using only nursery rhyme logic",
    category: "Comedy",
    tone: "creative",
  },
  {
    text: "A sketch show performed entirely in the style of a cooking tutorial",
    category: "Comedy",
    tone: "creative",
  },
  {
    text: "A comedy special where the audience secretly controls the plot through a voting app",
    category: "Comedy",
    tone: "creative",
  },
  // DIY - creative
  {
    text: "Build a home library with secret compartments hidden inside the book spines",
    category: "DIY",
    tone: "creative",
  },
  {
    text: "Create a mosaic floor mural using broken vintage ceramics and tiles you collect at thrift stores",
    category: "DIY",
    tone: "creative",
  },
  {
    text: "Design and build a rain-catching garden sculpture that waters your plants automatically",
    category: "DIY",
    tone: "creative",
  },
  {
    text: "Make a hand-bound book using paper you've made yourself from recycled materials",
    category: "DIY",
    tone: "creative",
  },
  {
    text: "Build a wall-sized magnetic chalkboard with integrated ambient lighting for a home studio",
    category: "DIY",
    tone: "creative",
  },
  // Finance - creative
  {
    text: "A micro-investment platform that lets you invest in independent artists and share in their revenue",
    category: "Finance",
    tone: "creative",
  },
  {
    text: "A community savings club where members fund a rotating artist residency grant",
    category: "Finance",
    tone: "creative",
  },
  {
    text: "A financial literacy game that teaches investing through running a virtual record label",
    category: "Finance",
    tone: "creative",
  },
  {
    text: "A crowdfunding model specifically for restoring public art in neglected neighborhoods",
    category: "Finance",
    tone: "creative",
  },
  {
    text: "A savings app that visualizes your financial goals as a building you design and construct over time",
    category: "Finance",
    tone: "creative",
  },
  // Space - creative
  {
    text: "A space mission designed specifically to compose and record music in zero gravity",
    category: "Space",
    tone: "creative",
  },
  {
    text: "An art installation on the Moon's surface designed to be visible through backyard telescopes",
    category: "Space",
    tone: "creative",
  },
  {
    text: "A project to map constellations from the perspective of other star systems",
    category: "Space",
    tone: "creative",
  },
  {
    text: "A satellite designed to project poetry in light visible from Earth",
    category: "Space",
    tone: "creative",
  },
  {
    text: "A space habitat interior designed by leading visual artists to promote psychological wellbeing on long missions",
    category: "Space",
    tone: "creative",
  },

  // --- DARK TONE ---
  // Games - dark
  {
    text: "A survival horror game where your character slowly loses memories as the game progresses",
    category: "Games",
    tone: "dark",
  },
  {
    text: "A strategy game where you manage the final days of a dying civilization",
    category: "Games",
    tone: "dark",
  },
  {
    text: "A noir detective game where every witness you interview disappears afterward",
    category: "Games",
    tone: "dark",
  },
  {
    text: "A dystopian city builder where you must balance control and dissent to avoid revolution",
    category: "Games",
    tone: "dark",
  },
  {
    text: "A puzzle game set inside the mind of someone unraveling a traumatic secret",
    category: "Games",
    tone: "dark",
  },
  // Apps - dark
  {
    text: "An app that shows you how many hours of your life you've spent on each habit",
    category: "Apps",
    tone: "dark",
  },
  {
    text: "A journal app that unlocks brutally honest analysis of your own writing patterns",
    category: "Apps",
    tone: "dark",
  },
  {
    text: "A sleep tracker that visualizes how sleep deprivation is shortening your lifespan in real time",
    category: "Apps",
    tone: "dark",
  },
  {
    text: "An app that calculates the carbon footprint of every decision you make in a day",
    category: "Apps",
    tone: "dark",
  },
  {
    text: "A doomscrolling timer that charges you a small fee every minute you spend on social media after midnight",
    category: "Apps",
    tone: "dark",
  },
  // Websites - dark
  {
    text: "A site that archives last words and final messages left online by people who have passed",
    category: "Websites",
    tone: "dark",
  },
  {
    text: "A dark history museum website featuring the untold stories behind famous landmarks",
    category: "Websites",
    tone: "dark",
  },
  {
    text: "A database of disappearing languages with interactive tools to preserve dying dialects",
    category: "Websites",
    tone: "dark",
  },
  {
    text: "A site cataloguing the world's abandoned megaprojects and why they failed",
    category: "Websites",
    tone: "dark",
  },
  {
    text: "An anthology of real unsolved local mysteries submitted by community members worldwide",
    category: "Websites",
    tone: "dark",
  },
  // Businesses - dark
  {
    text: "A funeral planning service that turns end-of-life arrangements into a meaningful, personalized experience",
    category: "Businesses",
    tone: "dark",
  },
  {
    text: "A company that converts deceased loved ones' written works into audiobooks using voice synthesis",
    category: "Businesses",
    tone: "dark",
  },
  {
    text: "A consultancy that helps companies prepare honestly for their own inevitable obsolescence",
    category: "Businesses",
    tone: "dark",
  },
  {
    text: "A grief counseling platform designed for people mourning lost careers, not just people",
    category: "Businesses",
    tone: "dark",
  },
  {
    text: "A service that sends you a brutally honest annual report on your own productivity and habits",
    category: "Businesses",
    tone: "dark",
  },
  // Stories - dark
  {
    text: "A scientist who discovers the exact date the sun will go out and must decide whether to tell anyone",
    category: "Stories",
    tone: "dark",
  },
  {
    text: "The last archivist of a language no one else speaks, cataloguing words that describe emotions that no longer exist",
    category: "Stories",
    tone: "dark",
  },
  {
    text: "A city where every person is born knowing their exact lifespan — told from the perspective of someone with one day left",
    category: "Stories",
    tone: "dark",
  },
  {
    text: "A story about the AI tasked with turning off the last remaining server of the old internet",
    category: "Stories",
    tone: "dark",
  },
  {
    text: "A museum curator who discovers the stolen paintings in the collection were the only existing records of an erased culture",
    category: "Stories",
    tone: "dark",
  },
  // Challenges - dark
  {
    text: "Write an honest obituary for a habit or personality trait you need to let go of",
    category: "Challenges",
    tone: "dark",
  },
  {
    text: "Document every moment you feel afraid in a single day and find the pattern",
    category: "Challenges",
    tone: "dark",
  },
  {
    text: "Create a map of every place you've ever felt truly alone",
    category: "Challenges",
    tone: "dark",
  },
  {
    text: "Write the difficult letter you've been meaning to write but keep avoiding",
    category: "Challenges",
    tone: "dark",
  },
  {
    text: "Spend 24 hours with no entertainment and document every uncomfortable thought that surfaces",
    category: "Challenges",
    tone: "dark",
  },
  // Music - dark
  {
    text: "An album exploring the five stages of grief through five distinct musical genres",
    category: "Music",
    tone: "dark",
  },
  {
    text: "A score composed entirely for the moment when a city loses power during a storm",
    category: "Music",
    tone: "dark",
  },
  {
    text: "A concept album narrated by objects left behind in abandoned homes",
    category: "Music",
    tone: "dark",
  },
  {
    text: "A dark ambient piece made from recordings inside hospitals at 3am",
    category: "Music",
    tone: "dark",
  },
  {
    text: "A song cycle about the last thoughts of dying stars",
    category: "Music",
    tone: "dark",
  },
  // Art - dark
  {
    text: "A portrait series where subjects are painted as their greatest regret",
    category: "Art",
    tone: "dark",
  },
  {
    text: "An installation of clocks that all show the time of significant personal losses",
    category: "Art",
    tone: "dark",
  },
  {
    text: "A sculpture garden made entirely from decommissioned weapons transformed into flowering forms",
    category: "Art",
    tone: "dark",
  },
  {
    text: "A series of paintings depicting the last moment before every major historical catastrophe",
    category: "Art",
    tone: "dark",
  },
  {
    text: "A photographic series documenting spaces that were once full of life and are now empty",
    category: "Art",
    tone: "dark",
  },
  // Science - dark
  {
    text: "Research into why humans are psychologically drawn to dangerous and self-destructive behaviors",
    category: "Science",
    tone: "dark",
  },
  {
    text: "A study mapping the spread of misinformation through social networks in real time",
    category: "Science",
    tone: "dark",
  },
  {
    text: "Research exploring how loneliness affects the human brain at a cellular level",
    category: "Science",
    tone: "dark",
  },
  {
    text: "A project cataloguing species that went extinct within the last decade and the human decisions that caused it",
    category: "Science",
    tone: "dark",
  },
  {
    text: "A study on how proximity to conflict zones affects children's cognitive development decades later",
    category: "Science",
    tone: "dark",
  },
  // Education - dark
  {
    text: "A history class dedicated entirely to learning from humanity's greatest repeated mistakes",
    category: "Education",
    tone: "dark",
  },
  {
    text: "A philosophy course built around confronting questions about death, meaning, and the void",
    category: "Education",
    tone: "dark",
  },
  {
    text: "A media literacy curriculum that teaches students how propaganda has worked throughout history",
    category: "Education",
    tone: "dark",
  },
  {
    text: "An ethics course that uses real case studies where every option had catastrophic consequences",
    category: "Education",
    tone: "dark",
  },
  {
    text: "A literature class that exclusively reads novels with no redemptive arc to explore what that teaches us",
    category: "Education",
    tone: "dark",
  },
  // Sports - dark
  {
    text: "An extreme endurance race through genuinely uninhabited wilderness with no outside assistance allowed",
    category: "Sports",
    tone: "dark",
  },
  {
    text: "A competitive sport built around managing fear responses under controlled psychological pressure",
    category: "Sports",
    tone: "dark",
  },
  {
    text: "A solo mountaineering challenge on routes where no one has ever summited in winter",
    category: "Sports",
    tone: "dark",
  },
  {
    text: "A competition for free divers to the deepest unexplored ocean caves",
    category: "Sports",
    tone: "dark",
  },
  {
    text: "A 72-hour sleepless endurance challenge testing mental and physical limits simultaneously",
    category: "Sports",
    tone: "dark",
  },
  // Food - dark
  {
    text: "A restaurant where the menu is entirely composed of the last meals of historical figures",
    category: "Food",
    tone: "dark",
  },
  {
    text: "A culinary exploration of foods that were once considered staples but are now endangered",
    category: "Food",
    tone: "dark",
  },
  {
    text: "A dinner series where guests eat in complete darkness to confront sensory discomfort",
    category: "Food",
    tone: "dark",
  },
  {
    text: "A cookbook dedicated to the foods of civilizations that no longer exist",
    category: "Food",
    tone: "dark",
  },
  {
    text: "A fermentation project recreating flavors lost to history from ancient recipe fragments",
    category: "Food",
    tone: "dark",
  },
  // Travel - dark
  {
    text: "A tour of the world's most significant sites of historical tragedy to understand their lessons",
    category: "Travel",
    tone: "dark",
  },
  {
    text: "A journey through ghost towns and abandoned cities to understand what causes communities to collapse",
    category: "Travel",
    tone: "dark",
  },
  {
    text: "A trip to visit the world's most contested border regions and speak with people living in them",
    category: "Travel",
    tone: "dark",
  },
  {
    text: "A dark tourism expedition to places where significant environmental disasters changed the world",
    category: "Travel",
    tone: "dark",
  },
  {
    text: "A solitary wilderness journey with no communication devices for 30 days",
    category: "Travel",
    tone: "dark",
  },
  // Movies - dark
  {
    text: "A film told entirely from the perspective of a city being slowly abandoned",
    category: "Movies",
    tone: "dark",
  },
  {
    text: "A documentary about the people who clean up after disasters and what that work does to them",
    category: "Movies",
    tone: "dark",
  },
  {
    text: "A thriller where the protagonist is the only person alive who knows a catastrophe is coming but no one believes them",
    category: "Movies",
    tone: "dark",
  },
  {
    text: "A horror film built entirely on mundane dread — no monsters, just the slow unraveling of ordinary life",
    category: "Movies",
    tone: "dark",
  },
  {
    text: "A drama about the last doctor in a rural region closing their practice after 40 years",
    category: "Movies",
    tone: "dark",
  },
  // Fashion - dark
  {
    text: "A collection inspired by the garments found in historical crime archives",
    category: "Fashion",
    tone: "dark",
  },
  {
    text: "A mourning wear revival line designed for modern grief that doesn't fit conventional timelines",
    category: "Fashion",
    tone: "dark",
  },
  {
    text: "A fashion line that incorporates deteriorating fabrics designed to age visibly over years",
    category: "Fashion",
    tone: "dark",
  },
  {
    text: "Clothing designed to be worn only once, then ritually buried or burned as a ceremony of letting go",
    category: "Fashion",
    tone: "dark",
  },
  {
    text: "A collection reconstructed entirely from discarded garments found in landfills worldwide",
    category: "Fashion",
    tone: "dark",
  },
  // Nature - dark
  {
    text: "A research expedition to document the final ecosystem of a dying coral reef system",
    category: "Nature",
    tone: "dark",
  },
  {
    text: "A conservation project preserving seeds of plant species in their last surviving locations",
    category: "Nature",
    tone: "dark",
  },
  {
    text: "A photography project documenting glaciers disappearing in real time over a decade",
    category: "Nature",
    tone: "dark",
  },
  {
    text: "A citizen science project recording the sounds of ecosystems before they are altered by development",
    category: "Nature",
    tone: "dark",
  },
  {
    text: "A forest walk designed to document every dead tree and the cause of its death",
    category: "Nature",
    tone: "dark",
  },
  // Tech - dark
  {
    text: "A tool that shows you exactly how much of your personal data has been sold and to whom",
    category: "Tech",
    tone: "dark",
  },
  {
    text: "A platform that archives websites before they are taken offline forever",
    category: "Tech",
    tone: "dark",
  },
  {
    text: "An algorithm that predicts which jobs will cease to exist in the next decade with 90% accuracy",
    category: "Tech",
    tone: "dark",
  },
  {
    text: "A browser extension that highlights every dark pattern on a website you visit",
    category: "Tech",
    tone: "dark",
  },
  {
    text: "A social media tool that shows you the exact emotional manipulation techniques used in your feed",
    category: "Tech",
    tone: "dark",
  },
  // Health - dark
  {
    text: "A program helping people confront and process medical diagnoses they've been avoiding",
    category: "Health",
    tone: "dark",
  },
  {
    text: "A mental health platform designed specifically for caregivers burning out in silence",
    category: "Health",
    tone: "dark",
  },
  {
    text: "A support system for people experiencing grief that falls outside socially recognized forms of loss",
    category: "Health",
    tone: "dark",
  },
  {
    text: "A research program into the long-term psychological effects of prolonged social isolation",
    category: "Health",
    tone: "dark",
  },
  {
    text: "A therapy model designed for people processing survivor's guilt from large-scale events",
    category: "Health",
    tone: "dark",
  },
  // Pets - dark
  {
    text: "A grief support group and memorial service for people who have lost pets that were their primary companion",
    category: "Pets",
    tone: "dark",
  },
  {
    text: "A documentary about what animals experience in the last hours of their lives in shelters",
    category: "Pets",
    tone: "dark",
  },
  {
    text: "A research project on how pets sense and respond to human depression and illness",
    category: "Pets",
    tone: "dark",
  },
  {
    text: "A sanctuary for animals rescued from illegal wildlife trade who can never be returned to the wild",
    category: "Pets",
    tone: "dark",
  },
  {
    text: "A photographic archive documenting the pets left behind when their elderly owners pass away",
    category: "Pets",
    tone: "dark",
  },
  // Comedy - dark
  {
    text: "A stand-up special that opens with a funeral and ends with the comedian convincing you it was fine",
    category: "Comedy",
    tone: "dark",
  },
  {
    text: "A dark comedy podcast about all the jobs that are slowly becoming obsolete",
    category: "Comedy",
    tone: "dark",
  },
  {
    text: "A sketch show where every scene takes place during an increasingly absurd apocalypse",
    category: "Comedy",
    tone: "dark",
  },
  {
    text: "A comedy show where all the jokes are about things we collectively pretend are not happening",
    category: "Comedy",
    tone: "dark",
  },
  {
    text: "A roast format where the subject is not a person but a failing institution",
    category: "Comedy",
    tone: "dark",
  },
  // DIY - dark
  {
    text: "Build a memorial garden for a pet using plants that attract the wildlife they loved to watch",
    category: "DIY",
    tone: "dark",
  },
  {
    text: "Create a shadow box preserving meaningful items from a chapter of your life that has ended",
    category: "DIY",
    tone: "dark",
  },
  {
    text: "Turn old broken electronics into a sculpture about technological obsolescence",
    category: "DIY",
    tone: "dark",
  },
  {
    text: "Build a time capsule sealed with a letter to your future self about your current fears",
    category: "DIY",
    tone: "dark",
  },
  {
    text: "Construct a dark room for analog photography development using only salvaged materials",
    category: "DIY",
    tone: "dark",
  },
  // Finance - dark
  {
    text: "A financial planning tool that calculates how much money you will need to survive every possible worst case scenario",
    category: "Finance",
    tone: "dark",
  },
  {
    text: "A documentary-style breakdown of how major financial crises were caused by decisions that seemed sensible at the time",
    category: "Finance",
    tone: "dark",
  },
  {
    text: "A radical transparency platform where companies must publish the full cost breakdown of every product they sell",
    category: "Finance",
    tone: "dark",
  },
  {
    text: "A service that helps people honestly calculate the true cost of debt they have been avoiding confronting",
    category: "Finance",
    tone: "dark",
  },
  {
    text: "A report on the economic cost of loneliness showing its exact impact on healthcare and productivity",
    category: "Finance",
    tone: "dark",
  },
  // Space - dark
  {
    text: "A research project calculating the probability that we are completely alone in the observable universe",
    category: "Space",
    tone: "dark",
  },
  {
    text: "A documentary about what happens to a human body left in deep space with no protection",
    category: "Space",
    tone: "dark",
  },
  {
    text: "A simulation of what Earth would look like from space after every major extinction event",
    category: "Space",
    tone: "dark",
  },
  {
    text: "A study of how isolation on long-duration space missions psychologically breaks down even the most resilient people",
    category: "Space",
    tone: "dark",
  },
  {
    text: "A mission to plant a black monolith on Mars with no explanation, purely as a message to future explorers",
    category: "Space",
    tone: "dark",
  },

  // --- INSPIRATIONAL TONE ---
  // Games - inspirational
  {
    text: "A game where you rebuild a community devastated by disaster, one act of kindness at a time",
    category: "Games",
    tone: "inspirational",
  },
  {
    text: "A game about a retired athlete who becomes a coach and transforms the lives of struggling youth",
    category: "Games",
    tone: "inspirational",
  },
  {
    text: "A narrative game following a refugee who builds a new life through small courageous choices",
    category: "Games",
    tone: "inspirational",
  },
  {
    text: "A puzzle game about a scientist racing to find a cure for a disease that took her child",
    category: "Games",
    tone: "inspirational",
  },
  {
    text: "A cooperative game where players mentor each other's characters through generational challenges",
    category: "Games",
    tone: "inspirational",
  },
  // Apps - inspirational
  {
    text: "An app that connects seniors with meaningful volunteer opportunities matched to their unique lifetime skills",
    category: "Apps",
    tone: "inspirational",
  },
  {
    text: "A daily gratitude app that builds a visual mosaic of your life's best moments over years",
    category: "Apps",
    tone: "inspirational",
  },
  {
    text: "A mentorship app that matches first-generation students with professionals from the same background",
    category: "Apps",
    tone: "inspirational",
  },
  {
    text: "An app that sends you a real handwritten letter from a stranger once a month with words of encouragement",
    category: "Apps",
    tone: "inspirational",
  },
  {
    text: "A goal-setting app that breaks impossible dreams into tiny daily actions and celebrates every single one",
    category: "Apps",
    tone: "inspirational",
  },
  // Websites - inspirational
  {
    text: "A website dedicated to publishing the untold success stories of people who overcame extraordinary odds",
    category: "Websites",
    tone: "inspirational",
  },
  {
    text: "A platform where people share the single piece of advice that changed the direction of their lives",
    category: "Websites",
    tone: "inspirational",
  },
  {
    text: "A site that maps every community garden, food bank, and mutual aid network in every city worldwide",
    category: "Websites",
    tone: "inspirational",
  },
  {
    text: "An archive of letters written to future generations from ordinary people living through historic moments",
    category: "Websites",
    tone: "inspirational",
  },
  {
    text: "A site where teachers share the moments a student's life visibly changed because of something they said",
    category: "Websites",
    tone: "inspirational",
  },
  // Businesses - inspirational
  {
    text: "A company that employs formerly incarcerated people exclusively and donates profits to re-entry programs",
    category: "Businesses",
    tone: "inspirational",
  },
  {
    text: "A bookshop that donates one book to a child in need for every book sold",
    category: "Businesses",
    tone: "inspirational",
  },
  {
    text: "A coaching business that helps people reinvent their careers after major life setbacks",
    category: "Businesses",
    tone: "inspirational",
  },
  {
    text: "A nonprofit that teaches entrepreneurship to people in refugee camps to create economic self-sufficiency",
    category: "Businesses",
    tone: "inspirational",
  },
  {
    text: "A bakery that trains and hires adults with developmental disabilities and has a six-month waiting list",
    category: "Businesses",
    tone: "inspirational",
  },
  // Stories - inspirational
  {
    text: "A retired schoolteacher discovers that a student she nearly gave up on became the person who changed the world",
    category: "Stories",
    tone: "inspirational",
  },
  {
    text: "An elderly immigrant writes letters to his grandchildren in a language they don't yet speak, hoping they will learn it to read them",
    category: "Stories",
    tone: "inspirational",
  },
  {
    text: "A young woman with no resources starts a library in her garage that eventually serves ten thousand children",
    category: "Stories",
    tone: "inspirational",
  },
  {
    text: "A story about two rivals who realize the person they've been competing against was the person they needed most",
    category: "Stories",
    tone: "inspirational",
  },
  {
    text: "A farmer in a drought saves his community by solving a water problem engineers said was impossible",
    category: "Stories",
    tone: "inspirational",
  },
  // Challenges - inspirational
  {
    text: "Write a letter of sincere gratitude to three people who shaped you and actually send it to them",
    category: "Challenges",
    tone: "inspirational",
  },
  {
    text: "Do one thing every day for a month that you've been afraid to do",
    category: "Challenges",
    tone: "inspirational",
  },
  {
    text: "Learn and perform one skill you've always told yourself you could never do",
    category: "Challenges",
    tone: "inspirational",
  },
  {
    text: "Spend one hour a week for a year volunteering for a cause that has nothing to do with your own life",
    category: "Challenges",
    tone: "inspirational",
  },
  {
    text: "Read one autobiography of someone whose life circumstances were completely different from yours every month for a year",
    category: "Challenges",
    tone: "inspirational",
  },
  // Music - inspirational
  {
    text: "An album written entirely as love letters to the next generation",
    category: "Music",
    tone: "inspirational",
  },
  {
    text: "A concert series performed in hospitals and care homes for people who cannot come to a show",
    category: "Music",
    tone: "inspirational",
  },
  {
    text: "A project recording musicians from the world's most remote communities to show the universality of song",
    category: "Music",
    tone: "inspirational",
  },
  {
    text: "A children's album that teaches empathy through musical stories about friendship across difference",
    category: "Music",
    tone: "inspirational",
  },
  {
    text: "A nonprofit that provides free instruments and lessons to children in underserved communities with no music programs",
    category: "Music",
    tone: "inspirational",
  },
  // Art - inspirational
  {
    text: "A mural project where local community members design public art celebrating their own neighborhood heroes",
    category: "Art",
    tone: "inspirational",
  },
  {
    text: "A photography series capturing the faces of people the moment they hear they've achieved something they thought impossible",
    category: "Art",
    tone: "inspirational",
  },
  {
    text: "An art installation made entirely from discarded objects donated by people marking a new chapter of their lives",
    category: "Art",
    tone: "inspirational",
  },
  {
    text: "A portrait series painting people in the profession they dreamed of as a child, not the one they ended up in",
    category: "Art",
    tone: "inspirational",
  },
  {
    text: "A community art project where strangers collaborate on a single piece without ever meeting each other",
    category: "Art",
    tone: "inspirational",
  },
  // Science - inspirational
  {
    text: "A research program giving high school students from underrepresented communities access to real scientific fieldwork",
    category: "Science",
    tone: "inspirational",
  },
  {
    text: "A project bringing affordable clean water solutions developed in universities to communities that need them most",
    category: "Science",
    tone: "inspirational",
  },
  {
    text: "A study on how acts of everyday kindness measurably change brain chemistry and health outcomes",
    category: "Science",
    tone: "inspirational",
  },
  {
    text: "Research into indigenous ecological knowledge that outperforms modern conservation science in protecting ecosystems",
    category: "Science",
    tone: "inspirational",
  },
  {
    text: "A program that uses citizen science to give rural communities ownership over environmental data that affects their land",
    category: "Science",
    tone: "inspirational",
  },
  // Education - inspirational
  {
    text: "A school built inside a working farm where every lesson connects to growing food and feeding the community",
    category: "Education",
    tone: "inspirational",
  },
  {
    text: "A tutoring program where university students teach in prisons and are changed as profoundly as the students they teach",
    category: "Education",
    tone: "inspirational",
  },
  {
    text: "A curriculum built around oral history that teaches children to interview their oldest relatives before they are gone",
    category: "Education",
    tone: "inspirational",
  },
  {
    text: "A school model where older students teach younger students, creating mentorship and mastery simultaneously",
    category: "Education",
    tone: "inspirational",
  },
  {
    text: "A program that takes students who have been told they are not academic and teaches them to write and publish their own books",
    category: "Education",
    tone: "inspirational",
  },
  // Sports - inspirational
  {
    text: "A marathon designed for first-timers only, with experienced runners volunteering to run alongside every participant",
    category: "Sports",
    tone: "inspirational",
  },
  {
    text: "A sports program that pairs professional athletes with terminally ill fans for a day of training together",
    category: "Sports",
    tone: "inspirational",
  },
  {
    text: "A Paralympic development league that gives athletes with disabilities their first competitive pathway",
    category: "Sports",
    tone: "inspirational",
  },
  {
    text: "A running club in a prison that prepares inmates for a real race on the day of their release",
    category: "Sports",
    tone: "inspirational",
  },
  {
    text: "A sports scholarship entirely funded by retired athletes who were once recipients of the same scholarship themselves",
    category: "Sports",
    tone: "inspirational",
  },
  // Food - inspirational
  {
    text: "A restaurant where every dish is a recipe that saved someone's life during a difficult time",
    category: "Food",
    tone: "inspirational",
  },
  {
    text: "A cooking program that teaches recently widowed people to cook for themselves for the first time",
    category: "Food",
    tone: "inspirational",
  },
  {
    text: "A community kitchen where immigrant grandmothers teach their recipes to young people who grew up disconnected from their heritage",
    category: "Food",
    tone: "inspirational",
  },
  {
    text: "A food truck staffed entirely by young people aging out of foster care who are learning to run a business",
    category: "Food",
    tone: "inspirational",
  },
  {
    text: "A cookbook compiled from recipes that families cooked during the most difficult weeks of their lives and survived",
    category: "Food",
    tone: "inspirational",
  },
  // Travel - inspirational
  {
    text: "A journey visiting the individuals and communities who are quietly solving the world's hardest problems without recognition",
    category: "Travel",
    tone: "inspirational",
  },
  {
    text: "A trip taken to fulfill the lifelong dream of a parent or grandparent who never got to go themselves",
    category: "Travel",
    tone: "inspirational",
  },
  {
    text: "A travel series documenting communities that rebuilt themselves from nothing after catastrophe",
    category: "Travel",
    tone: "inspirational",
  },
  {
    text: "A solo journey on foot where the only goal is to rely entirely on the generosity of strangers",
    category: "Travel",
    tone: "inspirational",
  },
  {
    text: "A volunteer trip building schools in communities where children walk three hours each way for an education",
    category: "Travel",
    tone: "inspirational",
  },
  // Movies - inspirational
  {
    text: "A documentary following first-generation college students through a single transformative semester",
    category: "Movies",
    tone: "inspirational",
  },
  {
    text: "A film about a coach who turns a team of underdogs into champions by teaching them to believe in each other before themselves",
    category: "Movies",
    tone: "inspirational",
  },
  {
    text: "A story about a librarian in a small town whose reading program quietly produces three Nobel Prize winners over 40 years",
    category: "Movies",
    tone: "inspirational",
  },
  {
    text: "A documentary about ordinary people who spent their entire lives anonymously funding other people's dreams",
    category: "Movies",
    tone: "inspirational",
  },
  {
    text: "A film about the last surviving speaker of an endangered language who teaches it to her entire village before she dies",
    category: "Movies",
    tone: "inspirational",
  },
  // Fashion - inspirational
  {
    text: "A fashion line designed collaboratively with survivors of human trafficking to help them reclaim ownership of their own image",
    category: "Fashion",
    tone: "inspirational",
  },
  {
    text: "Adaptive clothing designed with and for people with disabilities that is genuinely beautiful, not just functional",
    category: "Fashion",
    tone: "inspirational",
  },
  {
    text: "A collection where every garment tells the story of a woman who changed history but was never in the textbooks",
    category: "Fashion",
    tone: "inspirational",
  },
  {
    text: "A fashion brand that publishes the full story of every person in its supply chain so customers know who made their clothes",
    category: "Fashion",
    tone: "inspirational",
  },
  {
    text: "A secondhand clothing program that dresses job seekers for their first interview free of charge",
    category: "Fashion",
    tone: "inspirational",
  },
  // Nature - inspirational
  {
    text: "A reforestation project where every child born in a community is given a tree to plant and tend for their lifetime",
    category: "Nature",
    tone: "inspirational",
  },
  {
    text: "A volunteer program that restores coastlines degraded by plastic waste and documents the return of wildlife",
    category: "Nature",
    tone: "inspirational",
  },
  {
    text: "A community initiative transforming urban rooftops into gardens that supply fresh food to food deserts below",
    category: "Nature",
    tone: "inspirational",
  },
  {
    text: "A river restoration project driven entirely by indigenous communities reclaiming stewardship of their ancestral waterways",
    category: "Nature",
    tone: "inspirational",
  },
  {
    text: "A national park designed and managed by the children of the surrounding communities to ensure it serves the next generation",
    category: "Nature",
    tone: "inspirational",
  },
  // Tech - inspirational
  {
    text: "A platform that connects skilled retirees with startups in developing countries as free mentors",
    category: "Tech",
    tone: "inspirational",
  },
  {
    text: "An open-source tool that helps nonprofits with no technical staff automate their most time-consuming tasks for free",
    category: "Tech",
    tone: "inspirational",
  },
  {
    text: "A voice technology project giving non-verbal people the ability to communicate in their own synthesized voice",
    category: "Tech",
    tone: "inspirational",
  },
  {
    text: "A platform that uses excess computing power from large companies to run climate research on nights and weekends",
    category: "Tech",
    tone: "inspirational",
  },
  {
    text: "A free coding bootcamp that only accepts people who have been told all their lives they are not good with technology",
    category: "Tech",
    tone: "inspirational",
  },
  // Health - inspirational
  {
    text: "A community health program staffed entirely by people who have recovered from the same conditions they now treat",
    category: "Health",
    tone: "inspirational",
  },
  {
    text: "A running program for people in recovery that ends every session with a group meal cooked together",
    category: "Health",
    tone: "inspirational",
  },
  {
    text: "A mental health service delivered through trained peer counselors who have lived experience of the same struggles",
    category: "Health",
    tone: "inspirational",
  },
  {
    text: "A program pairing isolated elderly people with children in after-school care for mutual companionship and growth",
    category: "Health",
    tone: "inspirational",
  },
  {
    text: "A free community gym that asks members to pay by teaching a skill to another member instead of paying money",
    category: "Health",
    tone: "inspirational",
  },
  // Pets - inspirational
  {
    text: "A therapy animal program pairing rescue dogs with veterans navigating PTSD",
    category: "Pets",
    tone: "inspirational",
  },
  {
    text: "A senior pet adoption program matching elderly people with older animals who need calm, permanent homes",
    category: "Pets",
    tone: "inspirational",
  },
  {
    text: "A program training rescue cats to detect low blood sugar episodes in diabetic children",
    category: "Pets",
    tone: "inspirational",
  },
  {
    text: "A rescue organization that trains formerly abused horses to help traumatized teenagers build trust and confidence",
    category: "Pets",
    tone: "inspirational",
  },
  {
    text: "A documentary following the story of a rescue dog who becomes the emotional anchor for an entire neighborhood",
    category: "Pets",
    tone: "inspirational",
  },
  // Comedy - inspirational
  {
    text: "A comedy show performed by nursing home residents who are given full creative control for the first time in their lives",
    category: "Comedy",
    tone: "inspirational",
  },
  {
    text: "A stand-up special by a comedian who lost everything and rebuilt their life through the healing power of laughter",
    category: "Comedy",
    tone: "inspirational",
  },
  {
    text: "A comedy workshop that teaches stand-up to children in underserved communities to build confidence and public speaking",
    category: "Comedy",
    tone: "inspirational",
  },
  {
    text: "A show where comedians perform in the hometowns of audience members and make the whole town the subject",
    category: "Comedy",
    tone: "inspirational",
  },
  {
    text: "An improv group that performs exclusively in refugee centers to give displaced people a moment of pure joy",
    category: "Comedy",
    tone: "inspirational",
  },
  // DIY - inspirational
  {
    text: "Build and donate a Little Free Library in a neighborhood with no bookshop or public library",
    category: "DIY",
    tone: "inspirational",
  },
  {
    text: "Teach yourself to repair and restore one piece of furniture and give it to someone who needs it",
    category: "DIY",
    tone: "inspirational",
  },
  {
    text: "Build a community tool library in your neighborhood so everyone has access to what they need",
    category: "DIY",
    tone: "inspirational",
  },
  {
    text: "Create a hand-sewn quilt using fabric squares from clothing donated by your community that tells a shared story",
    category: "DIY",
    tone: "inspirational",
  },
  {
    text: "Build a sensory garden accessible to wheelchair users in a space that currently has nothing growing",
    category: "DIY",
    tone: "inspirational",
  },
  // Finance - inspirational
  {
    text: "A community investment fund where local residents collectively own and support small businesses on their own street",
    category: "Finance",
    tone: "inspirational",
  },
  {
    text: "A financial literacy program taught entirely by teenagers to their own parents and grandparents",
    category: "Finance",
    tone: "inspirational",
  },
  {
    text: "A savings challenge where participants fund one local student's education over four years through small weekly contributions",
    category: "Finance",
    tone: "inspirational",
  },
  {
    text: "A micro-loan platform where people fund fellow community members with zero interest to start small businesses",
    category: "Finance",
    tone: "inspirational",
  },
  {
    text: "A program that matches every dollar a formerly homeless person saves toward housing stability with three dollars of additional support",
    category: "Finance",
    tone: "inspirational",
  },
  // Space - inspirational
  {
    text: "A mission designed to send the handwritten messages of a million children to the edge of the solar system",
    category: "Space",
    tone: "inspirational",
  },
  {
    text: "A space education program that gives every child alive today the chance to name a star in their own language",
    category: "Space",
    tone: "inspirational",
  },
  {
    text: "A project providing real-time satellite imagery to indigenous communities to help them monitor and protect their own land",
    category: "Space",
    tone: "inspirational",
  },
  {
    text: "A space farming research program whose discoveries are immediately applied to feeding people in drought-affected regions on Earth",
    category: "Space",
    tone: "inspirational",
  },
  {
    text: "A mission to place a library of all human music, art, and literature in orbit as a gift to whatever comes next",
    category: "Space",
    tone: "inspirational",
  },

  // --- WEIRD TONE ---
  // Games - weird
  {
    text: "A game where you play as a sock who is desperately trying to find its missing pair",
    category: "Games",
    tone: "weird",
  },
  {
    text: "A strategy game where you manage a civilization of sentient office chairs",
    category: "Games",
    tone: "weird",
  },
  {
    text: "A dating simulator between a banana and a philosophical refrigerator",
    category: "Games",
    tone: "weird",
  },
  {
    text: "A puzzle game where you are a thumbtack trying to make it through a balloon convention",
    category: "Games",
    tone: "weird",
  },
  {
    text: "A platformer where your character is scared of the ground and must only travel by ceiling",
    category: "Games",
    tone: "weird",
  },
  // Apps - weird
  {
    text: "An app that assigns you a spirit vegetable based on your weekly behavior and judges you accordingly",
    category: "Apps",
    tone: "weird",
  },
  {
    text: "An app that translates your complaints into the formal language of Victorian legal documents",
    category: "Apps",
    tone: "weird",
  },
  {
    text: "An alarm app that only turns off when you correctly identify what the cat in a photo is judging you for",
    category: "Apps",
    tone: "weird",
  },
  {
    text: "A fitness app that communicates exclusively through passive-aggressive fortune cookie messages",
    category: "Apps",
    tone: "weird",
  },
  {
    text: "An app that generates increasingly implausible excuses for why you are late, written in the style of famous authors",
    category: "Apps",
    tone: "weird",
  },
  // Websites - weird
  {
    text: "A website that generates a brand new conspiracy theory every hour and archives them all chronologically",
    category: "Websites",
    tone: "weird",
  },
  {
    text: "A site where you can submit a complaint and receive a formal rebuttal written from the perspective of the inanimate object you are blaming",
    category: "Websites",
    tone: "weird",
  },
  {
    text: "A forum where people debate the geopolitics of fictional countries from novels as if they were real",
    category: "Websites",
    tone: "weird",
  },
  {
    text: "A website that generates elaborate backstories for every single IKEA product name",
    category: "Websites",
    tone: "weird",
  },
  {
    text: "A site that turns your credit card statement into a dramatic reading in the style of Shakespearean tragedy",
    category: "Websites",
    tone: "weird",
  },
  // Businesses - weird
  {
    text: "A service that professionally haunts houses for people who feel their house isn't mysterious enough",
    category: "Businesses",
    tone: "weird",
  },
  {
    text: "A rental company that provides a distinguished-looking stranger to stand silently in the background of your video calls",
    category: "Businesses",
    tone: "weird",
  },
  {
    text: "A company that specializes in organizing elaborate farewell parties for appliances that have finally died",
    category: "Businesses",
    tone: "weird",
  },
  {
    text: "A subscription service that sends you detailed letters from a fictional pen pal who has increasingly suspicious hobbies",
    category: "Businesses",
    tone: "weird",
  },
  {
    text: "A shop that sells custom-blended scents inspired by places that don't exist yet",
    category: "Businesses",
    tone: "weird",
  },
  // Stories - weird
  {
    text: "A bureaucrat discovers the paperwork he's been filing for 30 years has been accidentally creating a parallel universe",
    category: "Stories",
    tone: "weird",
  },
  {
    text: "A woman can only communicate in questions and accidentally starts a cult",
    category: "Stories",
    tone: "weird",
  },
  {
    text: "A sentient elevator that has developed strong opinions about the people it carries and begins leaving passive-aggressive notes",
    category: "Stories",
    tone: "weird",
  },
  {
    text: "A chef whose emotions physically change the flavor of everything he cooks, leading to catastrophe at a diplomatic dinner",
    category: "Stories",
    tone: "weird",
  },
  {
    text: "The moon has been slowly walking toward Earth for years and no one has mentioned it because it seems rude to bring up",
    category: "Stories",
    tone: "weird",
  },
  // Challenges - weird
  {
    text: "Spend one full day responding to everything anyone says to you with only questions",
    category: "Challenges",
    tone: "weird",
  },
  {
    text: "Write a formal complaint letter to an inanimate object that has wronged you this week",
    category: "Challenges",
    tone: "weird",
  },
  {
    text: "Name every object in your home based on its personality and use those names for a full week",
    category: "Challenges",
    tone: "weird",
  },
  {
    text: "Narrate your day out loud in the style of a nature documentary and record the results",
    category: "Challenges",
    tone: "weird",
  },
  {
    text: "Invent a completely new sport using only items currently in your kitchen and write the official rulebook",
    category: "Challenges",
    tone: "weird",
  },
  // Music - weird
  {
    text: "An album recorded entirely using the sounds of a functioning beehive as the rhythm section",
    category: "Music",
    tone: "weird",
  },
  {
    text: "A song cycle in which each track must be listened to while doing a specific mundane household task or it makes no sense",
    category: "Music",
    tone: "weird",
  },
  {
    text: "A concept album that tells the epic story of a parking garage over three decades",
    category: "Music",
    tone: "weird",
  },
  {
    text: "A musical collaboration between a jazz quartet and a washing machine at various spin cycles",
    category: "Music",
    tone: "weird",
  },
  {
    text: "A live performance where the musician only performs when the audience is completely silent and stops the moment anyone makes a sound",
    category: "Music",
    tone: "weird",
  },
  // Art - weird
  {
    text: "A painting series depicting the emotional inner lives of appliances in waiting rooms",
    category: "Art",
    tone: "weird",
  },
  {
    text: "A sculpture of a very important meeting that is entirely attended by staplers",
    category: "Art",
    tone: "weird",
  },
  {
    text: "A portrait gallery of people painted exactly as they would look if they were slightly taller",
    category: "Art",
    tone: "weird",
  },
  {
    text: "An installation of 500 printed apology notes addressed to clouds",
    category: "Art",
    tone: "weird",
  },
  {
    text: "A series of oil paintings depicting the exact faces of cats when they push things off tables",
    category: "Art",
    tone: "weird",
  },
  // Science - weird
  {
    text: "A research study on whether plants grow faster when you argue with them politely versus rudely",
    category: "Science",
    tone: "weird",
  },
  {
    text: "An experiment testing whether meetings are measurably less productive when conducted while everyone is wearing hats",
    category: "Science",
    tone: "weird",
  },
  {
    text: "A study on the exact moment humans decide a piece of cheese is too old and what factors influence this",
    category: "Science",
    tone: "weird",
  },
  {
    text: "Research into why everyone in a crowded elevator looks at their phone at exactly the same time",
    category: "Science",
    tone: "weird",
  },
  {
    text: "A project cataloguing the specific sound every different type of chip bag makes and what information it communicates",
    category: "Science",
    tone: "weird",
  },
  // Education - weird
  {
    text: "A history class taught entirely through competitive interpretive dance recreations of major events",
    category: "Education",
    tone: "weird",
  },
  {
    text: "A mathematics program where every number has a distinct personality and solving problems is treated as conflict resolution",
    category: "Education",
    tone: "weird",
  },
  {
    text: "A language class where students are only allowed to communicate using increasingly elaborate metaphors",
    category: "Education",
    tone: "weird",
  },
  {
    text: "A science curriculum where every lesson is conducted as if the teacher is a time traveler who refuses to explain how they got there",
    category: "Education",
    tone: "weird",
  },
  {
    text: "A geography class that only studies places that should not logically exist but somehow do",
    category: "Education",
    tone: "weird",
  },
  // Sports - weird
  {
    text: "A synchronized swimming competition where all routines must be based on common office meeting scenarios",
    category: "Sports",
    tone: "weird",
  },
  {
    text: "An Olympic-style event for the fastest and most elegant way to assemble flat-pack furniture under pressure",
    category: "Sports",
    tone: "weird",
  },
  {
    text: "A competitive speed-eating event specifically for food that is very difficult to eat with dignity",
    category: "Sports",
    tone: "weird",
  },
  {
    text: "A relay race where each stage requires a different arbitrary skill such as untangling headphones or parallel parking a shopping cart",
    category: "Sports",
    tone: "weird",
  },
  {
    text: "A sport played entirely in the dark where the only indicator of where you are is a very small bell",
    category: "Sports",
    tone: "weird",
  },
  // Food - weird
  {
    text: "A restaurant that serves only dishes inspired by things that happened on this exact date in history regardless of palatability",
    category: "Food",
    tone: "weird",
  },
  {
    text: "A pop-up dinner where every course is designed to taste exactly like a specific childhood memory you haven't thought about in years",
    category: "Food",
    tone: "weird",
  },
  {
    text: "A bakery that sells bread shaped exactly like the faces of local minor celebrities who never asked for this",
    category: "Food",
    tone: "weird",
  },
  {
    text: "A cocktail bar where every drink is named after a logical fallacy and the menu explains the fallacy in excessively formal terms",
    category: "Food",
    tone: "weird",
  },
  {
    text: "A dessert tasting menu themed entirely around furniture types and what they would taste like if they were desserts",
    category: "Food",
    tone: "weird",
  },
  // Travel - weird
  {
    text: "A guided tour of a city visiting only the locations where absolutely nothing of note has ever happened",
    category: "Travel",
    tone: "weird",
  },
  {
    text: "A travel experience where you go to a destination and spend the entire time doing exactly what you would do at home",
    category: "Travel",
    tone: "weird",
  },
  {
    text: "A trip organized entirely around locating and photographing the least remarkable roundabouts in Europe",
    category: "Travel",
    tone: "weird",
  },
  {
    text: "A journey to find and document every place in the world that shares the same name as your hometown",
    category: "Travel",
    tone: "weird",
  },
  {
    text: "A guided vacation where your itinerary is determined entirely by coin flip at every decision point",
    category: "Travel",
    tone: "weird",
  },
  // Movies - weird
  {
    text: "A heist film where the thing being stolen is a concept rather than an object and no one can agree what it is",
    category: "Movies",
    tone: "weird",
  },
  {
    text: "A romantic comedy between two people who are both convinced the other person is a ghost",
    category: "Movies",
    tone: "weird",
  },
  {
    text: "A thriller where the villain's plan is completely legal but very, very annoying",
    category: "Movies",
    tone: "weird",
  },
  {
    text: "A documentary about a man who has spent 15 years trying to have a conversation with a specific pigeon",
    category: "Movies",
    tone: "weird",
  },
  {
    text: "A film where the entire plot hinges on a misunderstanding about a hat and everyone takes it extremely seriously",
    category: "Movies",
    tone: "weird",
  },
  // Fashion - weird
  {
    text: "A clothing line designed to be worn inside out as the preferred orientation, with the tags prominently displayed as art",
    category: "Fashion",
    tone: "weird",
  },
  {
    text: "A collection where every garment has a functional pocket in a location that is deeply inconvenient but technically accessible",
    category: "Fashion",
    tone: "weird",
  },
  {
    text: "A shoe line where every pair makes a different distinct sound with each step so you can compose music while walking",
    category: "Fashion",
    tone: "weird",
  },
  {
    text: "A hat collection where each design makes the wearer appear to be thinking about a very specific unusual topic",
    category: "Fashion",
    tone: "weird",
  },
  {
    text: "A fashion brand whose entire marketing strategy is sending unsolicited, extremely detailed opinions about weather to strangers",
    category: "Fashion",
    tone: "weird",
  },
  // Nature - weird
  {
    text: "A field guide to plants that are technically edible but taste exactly as bad as you'd expect from the name",
    category: "Nature",
    tone: "weird",
  },
  {
    text: "A documentary about the specific sounds animals make that humans have never been able to explain",
    category: "Nature",
    tone: "weird",
  },
  {
    text: "A nature walk focused exclusively on fungi that look uncannily like household objects",
    category: "Nature",
    tone: "weird",
  },
  {
    text: "A citizen science project cataloguing every rock that people have looked at and thought looked like a face",
    category: "Nature",
    tone: "weird",
  },
  {
    text: "A comprehensive guide to the one random patch of weird grass in every park that no one ever sits on",
    category: "Nature",
    tone: "weird",
  },
  // Tech - weird
  {
    text: "A browser extension that replaces all product recommendations with suggestions from a very out-of-touch elderly relative",
    category: "Tech",
    tone: "weird",
  },
  {
    text: "An AI that generates extremely detailed instructions for tasks that are completely unnecessary but technically impressive",
    category: "Tech",
    tone: "weird",
  },
  {
    text: "A social network exclusively for the arguments between different parts of a single person's brain",
    category: "Tech",
    tone: "weird",
  },
  {
    text: "A smart home device that communicates exclusively through passive-aggressive variations of the phrase 'interesting choice'",
    category: "Tech",
    tone: "weird",
  },
  {
    text: "A calendar app that schedules meetings at times that are deeply inconvenient but technically available",
    category: "Tech",
    tone: "weird",
  },
  // Health - weird
  {
    text: "A wellness app that improves your health by routing all requests through an extremely skeptical imaginary doctor from the 1800s",
    category: "Health",
    tone: "weird",
  },
  {
    text: "A fitness plan built entirely around the physical demands of competitive clog dancing",
    category: "Health",
    tone: "weird",
  },
  {
    text: "A sleep tracker that assigns your sleep patterns a dramatic narrative arc and presents it as a bedtime story every morning",
    category: "Health",
    tone: "weird",
  },
  {
    text: "A nutrition guide written from the perspective of a very opinionated piece of celery",
    category: "Health",
    tone: "weird",
  },
  {
    text: "A meditation app where every session is guided by someone who keeps getting distracted and losing their place",
    category: "Health",
    tone: "weird",
  },
  // Pets - weird
  {
    text: "A pet wellness app that translates your cat's behavior into formal legal grievances filed against you",
    category: "Pets",
    tone: "weird",
  },
  {
    text: "A documentary series following one dog's increasingly elaborate theories about where their owners go during the day",
    category: "Pets",
    tone: "weird",
  },
  {
    text: "A pet training method based entirely on negotiation and counter-offers",
    category: "Pets",
    tone: "weird",
  },
  {
    text: "A subscription box that sends your hamster monthly correspondence from a fictional hamster pen pal in another country",
    category: "Pets",
    tone: "weird",
  },
  {
    text: "A reality competition show where dogs judge humans on their fetch-throwing technique and give detailed critical feedback",
    category: "Pets",
    tone: "weird",
  },
  // Comedy - weird
  {
    text: "A stand-up show where the comedian performs the entire set from inside a very large coat",
    category: "Comedy",
    tone: "weird",
  },
  {
    text: "A comedy special delivered entirely in the form of a PowerPoint presentation about why PowerPoints are destroying humanity",
    category: "Comedy",
    tone: "weird",
  },
  {
    text: "An improv show where every scene must include at least one character who refuses to acknowledge the central premise",
    category: "Comedy",
    tone: "weird",
  },
  {
    text: "A comedy format where the audience submits complaints and the comedian formally mediates them as a judge",
    category: "Comedy",
    tone: "weird",
  },
  {
    text: "A sketch show set in an office where everyone is aware they are in a sketch show but still has to complete their actual work",
    category: "Comedy",
    tone: "weird",
  },
  // DIY - weird
  {
    text: "Build a fully functional tiny post office in your garden exclusively for letters between different parts of your yard",
    category: "DIY",
    tone: "weird",
  },
  {
    text: "Create a museum in a single bookshelf dedicated to the history of your most inexplicable possessions",
    category: "DIY",
    tone: "weird",
  },
  {
    text: "Construct a formal portrait gallery of houseplants with handwritten bios for each one",
    category: "DIY",
    tone: "weird",
  },
  {
    text: "Build a working model of a parliament where different household objects vote on domestic disputes",
    category: "DIY",
    tone: "weird",
  },
  {
    text: "Make a hand-lettered guide to every completely arbitrary rule you have in your kitchen and why it exists",
    category: "DIY",
    tone: "weird",
  },
  // Finance - weird
  {
    text: "A financial planning tool that calculates how many more decisions you can make today based on your current decision fatigue level",
    category: "Finance",
    tone: "weird",
  },
  {
    text: "An investment strategy based entirely on the economic behaviors predicted by competitive cheese rolling",
    category: "Finance",
    tone: "weird",
  },
  {
    text: "A budgeting app that speaks exclusively in the dramatic vocabulary of telenovela characters",
    category: "Finance",
    tone: "weird",
  },
  {
    text: "A tax preparation service conducted entirely in the format of an escape room",
    category: "Finance",
    tone: "weird",
  },
  {
    text: "A savings account where withdrawals require you to argue your case before a panel of three stuffed animals",
    category: "Finance",
    tone: "weird",
  },
  // Space - weird
  {
    text: "A space mission to determine once and for all what that one recurring dream everyone seems to have is actually about",
    category: "Space",
    tone: "weird",
  },
  {
    text: "A probe sent to the edge of the solar system carrying a very passive-aggressive note to whoever is out there",
    category: "Space",
    tone: "weird",
  },
  {
    text: "A research project calculating the exact probability that the universe is someone else's science fair project",
    category: "Space",
    tone: "weird",
  },
  {
    text: "A space habitat designed with one room that serves absolutely no purpose but everyone feels better knowing it's there",
    category: "Space",
    tone: "weird",
  },
  {
    text: "A mission brief for humanity's first contact scenario written exclusively in the tone of a passive-aggressive out-of-office email",
    category: "Space",
    tone: "weird",
  },
];

function getStaticRandomIdea(category: string, tone: string): Idea | null {
  const pool = category
    ? STATIC_IDEAS.filter((i) => i.category === category && i.tone === tone)
    : STATIC_IDEAS.filter((i) => i.tone === tone);
  if (pool.length === 0) {
    const fallback = category
      ? STATIC_IDEAS.filter((i) => i.category === category)
      : [...STATIC_IDEAS];
    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

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
    initialData: STATIC_CATEGORIES,
    enabled: !!actor && !isFetching,
  });
}

export function useGetRandomIdea() {
  const { actor } = useActor();
  return useMutation<Idea | null, Error, { category: string; tone: string }>({
    mutationFn: async ({ category, tone }) => {
      if (!actor) {
        return getStaticRandomIdea(category, tone);
      }
      try {
        const result = await actor.getRandomIdea(
          category,
          tone,
          BigInt(Date.now()),
        );
        // Backend returns null when category is empty string (Random), fall back to static
        if (result === null && !category) {
          return getStaticRandomIdea(category, tone);
        }
        return result;
      } catch {
        return getStaticRandomIdea(category, tone);
      }
    },
  });
}
