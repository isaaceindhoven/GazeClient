interface LinkedListItem{
    next: LinkedListItem
}

class LinkedList<T extends LinkedListItem> {
    public first: null | T = null;
    public last: null | T = null;

    add(item: T){

        if (this.first === null){
            this.first = item;
        }else{
            this.last.next = item;
        }

        this.last = item;
    }
}

export { LinkedListItem, LinkedList }
