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
];

function getStaticRandomIdea(category: string, tone: string): Idea | null {
  const pool = category
    ? STATIC_IDEAS.filter((i) => i.category === category && i.tone === tone)
    : STATIC_IDEAS.filter((i) => i.tone === tone);
  if (pool.length === 0) return null;
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
