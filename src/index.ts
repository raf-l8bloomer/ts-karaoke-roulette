// import { v4 as uuidV4 } from 'uuid';

const promptBank: Prompt[] = [
  { id: 1, theme: "You want a '4 Chair Turn' on The Voice" },
  {
    id: 2,
    theme: "You have to poop but there's 12 other people in the next room",
  },
  { id: 3, theme: "You've been chosen as tribute for The Hunger Games" },
  { id: 3, theme: 'Revenge Era' },
  { id: 4, theme: 'The last cigarette in the box' },
  { id: 5, theme: 'Stuck in an elevator with your crush' },
  { id: 6, theme: "You've just discovered electricity" },
  {
    id: 7,
    theme:
      'Finding the perfect meme for the groupchat before someone else replies',
  },
  { id: 8, theme: 'Voicemail song' },
  { id: 9, theme: 'Empty parking lot acoustics' },
  { id: 10, theme: "You're looking out the window and it's pouring rain" },
  { id: 11, theme: 'Just sent a risky text' },
  { id: 12, theme: 'Heartbreak feels good in a place like this' },
  { id: 13, theme: 'Love at first sight' },
  {
    id: 14,
    theme: 'We saw you from across the bar and we really like your vibe',
  },
  { id: 15, theme: 'Where were you on January 6th?' },
  { id: 16, theme: 'Trina! A One Woman Show, ft. Chicago' },
  { id: 17, theme: 'The edible is hitting' },
  { id: 18, theme: 'I work like a dog DAY AND NIGHT' },
];

type Prompt = {
  id: number;
  theme: string;
};

const promptEl = document.querySelector<HTMLElement>('.prompt')!;
const spinEl = document.querySelector<HTMLButtonElement>('#spin')!;
let currentPrompt: Prompt | null ;

let randomPromptIndex: number;

function randomPrompt(arr: Prompt[]) {
  randomPromptIndex = Math.floor(Math.random() * arr.length) + 1;
  currentPrompt = arr[randomPromptIndex];
}

function clearPrompt() {
  currentPrompt = null;
  promptEl.innerHTML = '';
}

spinEl?.addEventListener('click', () => {
  clearPrompt();
  randomPrompt(promptBank);
  if (currentPrompt!= null) {
  promptEl.innerHTML += currentPrompt.theme;
  }
});
