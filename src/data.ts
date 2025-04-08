// export const data = [
//   {
//     id: 'list1',
//     title: 'list1',
//     cards: [
//       {
//         id: 'card1',
//         title: 'card1',
//         description: 'card1'
//       }
//     ]
//   },
//   {
//     id: 'list2',
//     title: 'list2',
//     cards: [
//       {
//         id: 'card2-1',
//         title: 'card2-1',
//         description: 'card2-1'
//       },
//       {
//         id: 'card2-2',
//         title: 'card2-2',
//         description: 'card2-2'
//       }
//     ]
//   }
// ]

/* add, update, delete, get with array
delete card2-2 in list2
- loop data to find item2.
- loop cards in list2 -> find index card -> delete

const source = 0
const destination = 1

drag drop card in same list
- loop data to find list item.
- loop list.cards to find index of card source (sourceIndex)
- list.cards.splice(sourceIndex, 1); // delete source
- list.cards.splice(destination, 0, source); // add source
*/

// hash object
export const mockData = {
  columns: ['list1', 'list2'],
  lists: {
    list1: {
      id: 'list1',
      title: 'list1',
      cards: ['card1-1']
    },
    list2: {
      id: 'list2',
      title: 'list2',
      cards: ['card2-1', 'card2-2', 'card2-3', 'card2-4']
    }
  },
  cards: {
    "card1-1": {
      id: 'card1-1',
      title: 'card1-1',
      description: 'card1-1'
    },
    "card2-1": {
      id: 'card2-1',
      title: 'card2-1',
      description: 'card2-1'
    },
    "card2-2": {
      id: 'card2-2',
      title: 'card2-2',
      description: 'card2-2'
    },
    "card2-3": {
      id: 'card2-3',
      title: 'card2-3',
      description: 'card2-3'
    },
    "card2-4": {
      id: 'card2-4',
      title: 'card2-4',
      description: 'card2-4'
    },
  }
}

/* 
delete card2-2 in list2
- loop data.columns

const source = 0
const destination = 1
drag drop card in same list
- data.lists['xxx'].cards
- data.lists['xxx'].cards to find index of card source (sourceIndex)
- list.cards.splice(sourceIndex, 1); // delete source
- list.cards.splice(destination, 0, source); // add source
*/
