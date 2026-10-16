// Put the card pictures in ./images/ using these file names (plus questionmark.png).
export const NAMES = ["bell", "grapes", "watermelon", "seven", "cherry", "lemon", "apple", "orange", "banana", "blueberry", "kiwi", "peach"];

const IMAGES = import.meta.glob<string>("./images/*.png", { eager: true, query: "?url", import: "default" });

/** URL of a card's picture, or undefined when the file is missing. */
export const imageFor = (name: string): string | undefined => IMAGES[`./images/${name}.png`];

/** Two of every card, shuffled. Each value is an index into NAMES. */
export function shuffledDeck(): number[] {
  const deck = NAMES.flatMap((_, picture) => [picture, picture]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
