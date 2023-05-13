import FullList from '../model/FullList';

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

// class, export default, implement DOM LIST interface, singleton, clear should just clear all html in ul, render should render the full list

export default class ListTemplate implements DOMList {
  // Singleton
  static instance: ListTemplate = new ListTemplate();

  private constructor(
    private _ul: HTMLUListElement = document.getElementById(
      'listItems'
    ) as HTMLUListElement
  ) {}

  get ul() {
    return this._ul
  }

  clear(): void {
    this._ul.innerHTML = '';
  }

  render(fullList: FullList): void {
    fullList.list.map((listItem) => {
      // List item
      const list = document.createElement('li');
      list.classList.add('item');

      // Input
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = listItem.id;

      // Label
      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.textContent = listItem.item;

      // Button
      const button = document.createElement('button');
      button.classList.add('button');
      button.textContent = 'X';

      list.append(input, label, button);
      this._ul.appendChild(list);
    });
  }
}
