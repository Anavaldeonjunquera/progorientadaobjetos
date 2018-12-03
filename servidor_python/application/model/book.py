from application.model.creativework import CreativeWork

__author__ = 'Ana Maria Valdeon'


class Book(CreativeWork):
    def __init__(self, id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version, bookEdition, isbn, numberOfPages, abridged):
        super().__init__(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version)
        self.bookEdition = bookEdition
        self.isbn = isbn
        self.numberOfPages = numberOfPages
        self.abridged = abridged
