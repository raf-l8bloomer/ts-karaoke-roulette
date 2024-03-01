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
const submitInput = document.querySelector<HTMLInputElement>('#newPrompt');
const form = document.querySelector<HTMLFormElement>('#new-prompt-form');
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

// function removeCompletedPrompt(arr: Prompt[]) {
//   if (currentPrompt !== null) {
//     completedPrompts.push(currentPrompt);
//     const completedIndex = arr.findIndex(
//       (prompt) => prompt.id === currentPrompt!.id,
//     );
//     console.log(completedIndex);
//     arr.splice(completedIndex, 1);
//     console.log(arr);
//   }
// }

function removePrompt(arr: Prompt[], prompt: Prompt) {
  const promptIndex = arr.findIndex((row) => row.id === prompt.id);
  console.log(promptIndex);
  promptBank.splice(promptIndex, 1);
  console.log(arr);
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
    removePrompt(promptBank, currentPrompt);
  }
  clearPrompt();
  randomPrompt(promptBank);
  generatePrompt();
});

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

  console.log(promptBank);

});

const bank = document.querySelector<HTMLDivElement>('.bank');
const bankUl = document.querySelector<HTMLUListElement>('ul');
const showBank = document.querySelector<HTMLButtonElement>('.show-bank');

function createLi(prompt: Prompt) {
  const promptLi = document.createElement('li');
  const remove = document.createElement('button');
  promptLi.textContent = prompt.theme;
  remove.textContent = 'Remove';
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

function renderBank(arr: Prompt[]) {
  arr.forEach((row) => {
    createLi(row);
  });
}

showBank?.addEventListener('click', () => {
  if (showBank.textContent == 'Show Prompt Bank') {
    bank!.style.display = 'flex';
    showBank.textContent = 'Hide Prompt Bank';
  } else if (showBank.textContent == 'Hide Prompt Bank') {
    bank!.style.display = 'none';
    showBank.textContent = 'Show Prompt Bank';
  }
});

// render bank upon load
renderBank(promptBank);

/**
 * Now need a front end UL and when adding,
 * create a new list item
 * with an edit button - optionAllllll, or after
 * and remove button
 *
 *
 *
 * it'll be like createElement
 * ${}
 */

/** 
 * 
 * <p>NEW THEME<p>
<button>Edit</button> <button>Remove</button>
 * 
 * 
*/
