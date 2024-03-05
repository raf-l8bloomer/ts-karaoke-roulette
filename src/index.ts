import { v4 as uuidV4 } from 'uuid';

/*************
 * VARIABLES
 ************/

const promptDiv = document.querySelector<HTMLDivElement>('.prompt-div');
const promptEl = document.querySelector<HTMLElement>('.prompt')!;
const spinEl = document.querySelector<HTMLButtonElement>('#spin')!;
const completeEl = document.querySelector<HTMLButtonElement>('#complete');
const submitInput = document.querySelector<HTMLInputElement>('#newPrompt');
const form = document.querySelector<HTMLFormElement>('.new-prompt-form');
const bank = document.querySelector<HTMLDivElement>('.bank');
const bankUl = document.querySelector<HTMLUListElement>('ul');
const showBank = document.querySelector<HTMLButtonElement>('.show-bank');

let completedPrompts: Prompt[] = [];
let currentPrompt: Prompt | null;

type Prompt = {
  id: string;
  theme: string;
};

// preloaded prompts
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

/*************
 * FUNCTIONS
 ************/

// sets random currentPrompt from PromptBank
function randomPrompt(arr: Prompt[]) {
  let randomPromptIndex: number = Math.floor(Math.random() * arr.length) + 1;
  currentPrompt = arr[randomPromptIndex];
}

// removes displayed prompt nad nullifies currentPrompt
function clearPrompt() {
  currentPrompt = null;
  promptEl.innerHTML = '';
}

// adds currentPrompt to the HTML
function generatePrompt() {
  if (currentPrompt != null) {
    promptEl.innerHTML += currentPrompt.theme;
  }
}

// finds index of prompt by matching id  to current prompt and removes 1 prompt from the bank
function removePrompt(arr: Prompt[], prompt: Prompt) {
  const promptIndex = arr.findIndex((row) => row.id === prompt.id);
  promptBank.splice(promptIndex, 1);
}

// render promptBank to HTML
function renderBank(arr: Prompt[]) {
  arr.forEach((row) => {
    createLi(row);
  });
}

// creates prompt into a list item with a remove button to remove it from the list and the bank
function createLi(prompt: Prompt) {
  const promptLi = document.createElement('li');
  const remove = document.createElement('button');
  remove.classList.add('removePrompt');
  promptLi.textContent = prompt.theme;
  remove.textContent = 'X';
  promptLi.appendChild(remove);
  bankUl?.appendChild(promptLi);

  remove.addEventListener('click', () => {
    bankUl?.removeChild(promptLi);
    const promptIndex = promptBank.findIndex(
      (bankTheme) => bankTheme.id === prompt.id,
    );
    console.log(promptIndex);
    promptBank.splice(promptIndex, 1);
    console.log(promptBank);
  });

}

/*************
 * EVENT LISTENERS
 ************/

// clears prompt, randomly selects prompt from the bank, and displays it
spinEl?.addEventListener('click', () => {
  clearPrompt();
  randomPrompt(promptBank);
  generatePrompt();
  if (currentPrompt !== null) {
promptDiv!.style.backgroundColor = "#ffffff";
promptDiv!.style.border = "1px solid #F10ADF";

  }
});

// pull out the currentPrompt from the promptBank and move it to completed while spinning the wheel for the next prompt
completeEl?.addEventListener('click', () => {
  if (currentPrompt !== null) {
    completedPrompts.push(currentPrompt);
    removePrompt(promptBank, currentPrompt);
  }
  clearPrompt();
  randomPrompt(promptBank);
  generatePrompt();
});

// takes input value and turns it into a new prompt, adds it to the bank, and displays it in bank
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (submitInput?.value == '' || submitInput?.value == null) return;

  const newPrompt: Prompt = {
    id: uuidV4(),
    theme: submitInput.value,
  };

  promptBank.push(newPrompt);
  createLi(newPrompt);

  submitInput.value = '';

});



//toggle Prompt Bank display
showBank?.addEventListener('click', () => {
  if (showBank.textContent == 'Show Prompt Bank') {
    bank!.style.display = 'flex';
    showBank.textContent = 'Hide Prompt Bank';
  } else if (showBank.textContent == 'Hide Prompt Bank') {
    bank!.style.display = 'none';
    showBank.textContent = 'Show Prompt Bank';
  }
});

/*************
 * FUNCTION CALL
 ************/

// render bank upon load
renderBank(promptBank);
