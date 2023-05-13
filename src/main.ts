import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement;
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById('newItem') as HTMLInputElement;
    const newEntryText: string = input.value.trim();

    // return if empty
    if (!newEntryText) return;

    // calculate item id by grabbing the id of the last item in the list
    // if does not exist, make it start at 1
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement;

  clearItems.addEventListener('click', (): void => {
    fullList.clearList(); // clear list
    template.clear(); // clear UI
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initApp);
