import { v4 as uuidV4 } from 'uuid';

type Prompt = {
  id: string;
  theme: string;
};

const promptBank: Prompt[] = [
  { id: uuidV4(), theme: "You want a '4 Chair Turn' on The Voice" },
  {
    id: uuidV4(),
    theme: "You have to poop but there's 12 other people in the next room",
  },
  { id: uuidV4(), theme: "You've been chosen as tribute for The Hunger Games" },
  { id: uuidV4(), theme: 'Revenge Era' },
  { id: uuidV4(), theme: 'The last cigarette in the box' },
  { id: uuidV4(), theme: 'Stuck in an elevator with your crush' },
  { id: uuidV4(), theme: "You've just discovered electricity" },
  {
    id: uuidV4(),
    theme:
      'Finding the perfect meme for the groupchat before someone else replies',
  },
  { id: uuidV4(), theme: 'Voicemail song' },
  { id: uuidV4(), theme: 'Empty parking lot acoustics' },
  {
    id: uuidV4(),
    theme: "You're looking out the window and it's pouring rain",
  },
  { id: uuidV4(), theme: 'Just sent a risky text' },
  { id: uuidV4(), theme: 'Heartbreak feels good in a place like this' },
  { id: uuidV4(), theme: 'Love at first sight' },
  {
    id: uuidV4(),
    theme: 'We saw you from across the bar and we really like your vibe',
  },
  { id: uuidV4(), theme: 'Where were you on January 6th?' },
  { id: uuidV4(), theme: 'Trina! A One Woman Show, ft. Chicago' },
  { id: uuidV4(), theme: 'The edible is hitting' },
  { id: uuidV4(), theme: 'I work like a dog DAY AND NIGHT' },
];

let completedPrompts: Prompt[] = [];

const promptEl = document.querySelector<HTMLElement>('.prompt')!;
const spinEl = document.querySelector<HTMLButtonElement>('#spin')!;
const completeEl = document.querySelector<HTMLButtonElement>('#complete');

let currentPrompt: Prompt | null;

function randomPrompt(arr: Prompt[]) {
  let randomPromptIndex: number = Math.floor(Math.random() * arr.length) + 1;
  currentPrompt = arr[randomPromptIndex];
}

function clearPrompt() {
  currentPrompt = null;
  promptEl.innerHTML = '';
}

function generatePrompt() {
  if (currentPrompt != null) {
    promptEl.innerHTML += currentPrompt.theme;
  }
}

function removePrompt(arr: Prompt[]) {
  if (currentPrompt != null) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === currentPrompt.id) {
        console.log(arr[i].id);
        // completedPrompts = arr.slice([i]);
      }
    }
    console.log(completedPrompts);
  }
}

function extractObject(arr: Prompt[], id: string) {
  return arr.filter((row) => row.id === id).pop();
}

spinEl?.addEventListener('click', () => {
  clearPrompt();
  randomPrompt(promptBank);
  generatePrompt();
});

// pull out the currentPrompt from the promptBank and move it to completed while spinning the wheel for the next prompt
completeEl?.addEventListener('click', () => {
  if (currentPrompt !== null) {
    completedPrompts.push(currentPrompt);
    const completedIndex = promptBank.findIndex(prompt => prompt.id === currentPrompt!.id)
    console.log(completedIndex);
    promptBank.splice(completedIndex, 1);
  }
  console.log(completedPrompts);
  console.log(promptBank);
});