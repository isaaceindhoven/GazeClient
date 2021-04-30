interface LinkedListItem {
    next: LinkedListItem;
}
declare class LinkedList<T extends LinkedListItem> {
    first: null | T;
    last: null | T;
    add(item: T): void;
}
export { LinkedListItem, LinkedList };
