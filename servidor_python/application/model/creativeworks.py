__author__ = 'Ana Maria Valdeon'


class Creativeworks:
    def __init__(self, lista=None):
        self.lista = [] if not lista else lista

    def add_creativework(self, creativework):
        self.lista.append(creativework)
        return True

    def remove_creativework(self, id):
        for x in range(0,len(self.lista)):
            if self.lista[x].id == id:
                del self.lista[x]
                return True
        return False

    def update_creativework(self, creativework, id):
        for x in range(0,len(self.lista)):
            if self.lista[x].id == id:
                self.lista[x] = creativework
                return True
        return False

    def get_lista_creativework(self):
        return self.lista

    def get_id_creativework(self, id):
        for x in range(0, len(self.lista)):
            if self.lista[x].id == id:
                return self.lista[x]
        return None
