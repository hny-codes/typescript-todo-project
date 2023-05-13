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
    return this._ul;
  }

  clear(): void {
    this._ul.innerHTML = '';
  }

  render(fullList: FullList): void {
    // Clear list first to prevent duplication
    this.clear();

    // fullList.list.map((listItem) => {
    //   // List item
    //   const list = document.createElement('li');
    //   list.classList.add('item');

    //   // Input
    //   const input = document.createElement('input');
    //   input.type = 'checkbox';
    //   input.id = listItem.id;

    //   // Label
    //   const label = document.createElement('label');
    //   label.htmlFor = input.id;
    //   label.textContent = listItem.item;

    //   // Button
    //   const button = document.createElement('button');
    //   button.classList.add('button');
    //   button.textContent = 'X';

    //   list.append(input, label, button);
    //   this._ul.appendChild(list);
    // });

    fullList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      const check = document.createElement('input') as HTMLInputElement;
      check.type = 'checkbox';
      check.id = item.id;
      check.checked = item.checked;
      li.append(check);

      check.addEventListener('change', () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement('button') as HTMLButtonElement;
      button.className = 'button';
      button.textContent = 'X';
      li.append(button);

      button.addEventListener('click', () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this._ul.append(li);
    });
  }
}
