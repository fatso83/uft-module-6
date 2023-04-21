export function GetPrivateBooksStub() {
  return {
    success: true,
    result: [
      {
        bookId: 1231,
        name: "Wind in the willows",
        ownerId: "pete@logicroom.co",
        author: "Kenneth Graeme",
      },
      {
        bookId: 1241,
        name: "I, Robot",
        ownerId: "pete@logicroom.co",
        author: "Isaac Asimov",
      },
      {
        bookId: 1251,
        name: "The Hobbit",
        ownerId: "pete@logicroom.co",
        author: "Jrr Tolkein",
      },
    ],
  };
}
