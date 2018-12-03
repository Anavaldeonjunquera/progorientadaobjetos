from flask import json, Blueprint, request
from ..model import array_books
from flask import make_response
from ..model import Book
from flask_cors import CORS

__author__ = 'Ana Maria Valdeon'

routes = Blueprint('book', __name__, url_prefix='/book')

CORS(routes)    # enable CORS for the API blueprint


@routes.route('/<int:number>', methods=['GET'])
def book(number):
    creativelist = array_books.lista_books
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "Book",
                'id': creativelist[x].id,
                'name': creativelist[x].name,
                'isFamilyFriendly': creativelist[x].isFamilyFriendly,
                'isAccessibleForFree': creativelist[x].isAccessibleForFree,
                'copyrightYear': creativelist[x].copyrightYear,
                'version': creativelist[x].version,
                'bookEdition': creativelist[x].bookEdition,
                'isbn': creativelist[x].isbn,
                'numberOfPages': creativelist[x].numberOfPages,
                'abridged': creativelist[x].abridged

            })
    resp = make_response('No se encuentra', 404)
    return resp


@routes.route('/<int:number>', methods=['DELETE'])
def borrabook(number):
    creativelist = array_books.lista_books
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            del creativelist[x]
            resp = make_response('Borrado', 200)
            return resp
    resp = make_response('No encontrado', 404)
    return resp


@routes.route('', methods=['POST'])
def postbook():
    # request.get_data()
    # return request.headers["Accept"]
    decoded = json.loads(request.get_data())
    creativeobject = array_books
    id = creativeobject.lista_books[len(creativeobject.lista_books)-1].id + 1
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    bookEdition = decoded['bookEdition']
    isbn = decoded['isbn']
    numberOfPages = decoded['numberOfPages']
    abridged = decoded['abridged']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None or bookEdition is None or isbn is None or abridged is None or numberOfPages is None:
        resp = make_response('Hay campos nulos', 404)
        return resp
    elif not isinstance(name, str):
        resp = make_response('name no es string', 404)
        return resp
    elif not isinstance(isFamilyFriendly, bool):
        resp = make_response('isFamilyFriendly no es boolean', 404)
        return resp
    elif not isinstance(isAccessibleForFree, bool):
        resp = make_response('isAccessibleForFree no es boolean', 404)
        return resp
    elif not isinstance(version, int):
        resp = make_response('version no es int', 404)
        return resp
    elif not isinstance(copyrightYear, int):
        resp = make_response('copyrightYear no es int', 404)
        return resp
    elif not isinstance(bookEdition, str):
        resp = make_response('bookEdition no es string', 404)
        return resp
    elif not isinstance(isbn, str):
        resp = make_response('isbn no es string', 404)
        return resp
    elif not isinstance(numberOfPages, int):
        resp = make_response('numberOfPages no es int', 404)
        return resp
    elif not isinstance(abridged, bool):
        resp = make_response('abridged no es boolean', 404)
        return resp
    else:
        creative = Book(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version, bookEdition, isbn, numberOfPages, abridged)
        creativeobject.add_book(creative)
        return str(id)


@routes.route('/<int:number>', methods=['PUT'])
def putbook(number):
    decoded = json.loads(request.get_data())
    creativeobject = array_books
    id = number
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    bookEdition = decoded['bookEdition']
    isbn = decoded['isbn']
    numberOfPages = decoded['numberOfPages']
    abridged = decoded['abridged']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None or bookEdition is None or isbn is None or abridged is None or numberOfPages is None:
        resp = make_response('Hay campos nulos', 404)
        return resp
    elif not isinstance(name, str):
        resp = make_response('name no es string', 404)
        return resp
    elif not isinstance(isFamilyFriendly, bool):
        resp = make_response('isFamilyFriendly no es boolean', 404)
        return resp
    elif not isinstance(isAccessibleForFree, bool):
        resp = make_response('isAccessibleForFree no es boolean', 404)
        return resp
    elif not isinstance(version, int):
        resp = make_response('version no es int', 404)
        return resp
    elif not isinstance(copyrightYear, int):
        resp = make_response('copyrightYear no es int', 404)
        return resp
    elif not isinstance(bookEdition, str):
        resp = make_response('bookEdition no es string', 404)
        return resp
    elif not isinstance(isbn, str):
        resp = make_response('isbn no es string', 404)
        return resp
    elif not isinstance(numberOfPages, int):
        resp = make_response('numberOfPages no es int', 404)
        return resp
    elif not isinstance(abridged, bool):
        resp = make_response('abridged no es boolean', 404)
        return resp
    else:
        creative = Book(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version,bookEdition,isbn,numberOfPages,abridged)
        if creativeobject.update_book(creative, id):
            resp = make_response('Modificado', 200)
            return resp
        resp = make_response('No existe ese id', 404)
        return resp


@routes.route('', methods=['GET'])
def getallbook():
    creativeobjectlist = array_books.get_lista_book()
    valor = (request.headers["Accept"]) == 'application/ld+json'
    if valor:
        auxiliar = [{'@context': 'http://schema.org', '@type': 'Book', 'id': v.id, 'name': v.name, 'isFamilyFriendly': v.isFamilyFriendly,
                     'isAccessibleForFree': v.isAccessibleForFree,
                     'copyrightYear': v.copyrightYear, 'version': v.version, 'bookEdition': v.bookEdition,
                     'isbn': v.isbn, 'numberOfPages': v.numberOfPages, 'abridged': v.abridged} for v in creativeobjectlist]
        return json.dumps(auxiliar)
    else:
        auxiliar = "<ul>"
        for i in range(0, len(creativeobjectlist)):
            auxiliar = '{0} <li>{1} {2} {3} {4} {5} {6} {7} {8} {9} {10}</li>'.format(auxiliar,
                                                                                 str(creativeobjectlist[i].id),
                                                                                 str(creativeobjectlist[i].name),
                                                                                 str(creativeobjectlist[i].isFamilyFriendly),
                                                                                 str(creativeobjectlist[i].isAccessibleForFree),
                                                                                 str(creativeobjectlist[i].copyrightYear),
                                                                                 str(creativeobjectlist[i].version),
                                                                                 str(creativeobjectlist[i].bookEdition),
                                                                                 str(creativeobjectlist[i].isbn),
                                                                                 str(creativeobjectlist[i].numberOfPages),
                                                                                 str(creativeobjectlist[i].abridged))
        auxiliar = auxiliar + '</ul>'
        return auxiliar


@routes.route('/', methods=['OPTIONS'])
def retornatrue():
    resp = make_response('Siguiente', 200)
    return resp


@routes.route('/<int:number>', methods=['OPTIONS'])
def retornatrueotravez(number):
    resp = make_response('Siguiente', 200)
    return resp