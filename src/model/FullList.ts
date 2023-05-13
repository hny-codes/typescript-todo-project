import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  // Singleton
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  set list(list: ListItem[]) {
    this._list = list;
  }

  // Load list items into DOM
  load(): void {
    const storedList: string | null = localStorage.getItem('myList');
    if (typeof storedList != 'string') return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    
    parsedList.forEach(itemObj => {
      const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);

      FullList.instance.addItem(newListItem);
    })
  }

  // Save list items from DOM
  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.slice().filter((item) => item.id !== id);
    this.save();
  }
}
