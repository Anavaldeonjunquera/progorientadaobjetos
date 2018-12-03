__author__ = 'Ana Maria Valdeon'


class Articles:
    def __init__(self, lista=None):
        self.lista_articles = [] if not lista else lista

    def add_article(self, article):
        self.lista_articles.append(article)
        return True

    def remove_article(self, id):
        for x in range(0,len(self.lista_articles)):
            if self.lista_articles[x].id == id:
                del self.lista_articles[x]
                return True
        return False

    def update_article(self, article, id):
        for x in range(0,len(self.lista_articles)):
            if self.lista_articles[x].id == id:
                self.lista_articles[x] = article
                return True
        return False

    def get_lista_article(self):
        return self.lista_articles

    def get_id_article(self):
        for x in range(0,len(self.lista_articles)):
            if self.lista_articles[x].id == id:
                return self.lista_articles[x]
        return None