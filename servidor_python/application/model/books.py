__author__ = 'Ana Maria Valdeon'


class Books:
    def __init__(self, lista=None):
        self.lista_books = [] if not lista else lista

    def add_book(self, book):
        self.lista_books.append(book)
        return True

    def remove_book(self,id):
        for x in range(0,len(self.lista_books)):
            if self.lista_books[x].id == id:
                del self.lista_books[x]
                return True
        return False

    def update_book(self, book, id):
        for x in range(0,len(self.lista_books)):
            if self.lista_books[x].id == id:
                self.lista_books[x] = book
                return True
        return False

    def get_lista_book(self):
        return self.lista_books

    def get_id_article(self):
        for x in range(0,len(self.lista_books)):
            if self.lista_books[x].id == id:
                return self.lista_books[x]
        return None
