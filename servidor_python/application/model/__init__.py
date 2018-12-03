from .creativework import CreativeWork
from .creativeworks import Creativeworks
from .book import Book
from .books import Books
from .article import Article
from .articles import Articles

array_creative_works = Creativeworks()
array_creative_works.add_creativework(CreativeWork(0, 'asdf', False, True, 1823, 1))
array_creative_works.add_creativework(CreativeWork(1, 'asdftuytuytuttu', False, True, 1823, 1))
array_books = Books()
array_books.add_book(Book(0, 'libro gordo', False, True, 1323, 2, 'Segunda', '123124asd', 450, False))
array_books.add_book(Book(1, 'libroasdf gordo', False, True, 1323, 2, 'Segunda', '123124asd', 345, False))
array_articles = Articles()
array_articles.add_article(Article(0, 'El gol', True, True, 2018, 32, 'Deportes', '7-9', 123))
array_articles.add_article(Article(1, 'Elasdf gol', True, False, 2018, 32, 'Ocio', '7-9', 123))
