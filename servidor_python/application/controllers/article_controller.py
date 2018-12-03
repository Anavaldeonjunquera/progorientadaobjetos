from flask import json, Blueprint, request
from ..model import array_articles
from flask import make_response
from ..model import Article
from flask_cors import CORS

__author__ = 'Ana Maria Valdeon'

routes = Blueprint('article', __name__, url_prefix='/article')

CORS(routes)    # enable CORS for the API blueprint


@routes.route('/<int:number>', methods=['GET'])
def article(number):
    creativelist = array_articles.lista_articles
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "Article",
                'id': creativelist[x].id,
                'name': creativelist[x].name,
                'isFamilyFriendly': creativelist[x].isFamilyFriendly,
                'isAccessibleForFree': creativelist[x].isAccessibleForFree,
                'copyrightYear': creativelist[x].copyrightYear,
                'version': creativelist[x].version,
                'articleSection': creativelist[x].articleSection,
                'pagination': creativelist[x].pagination,
                'wordCount': creativelist[x].wordCount
            })
    resp = make_response('No se encuentra', 404)
    return resp


@routes.route('/<int:number>', methods=['DELETE'])
def borraarticle(number):
    creativelist = array_articles.lista_articles
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            del creativelist[x]
            return "borrado"
    resp = make_response('No encontrado', 404)
    return resp


@routes.route('', methods=['POST'])
def postarticle():
    # request.get_data()
    # return request.headers["Accept"]
    decoded = json.loads(request.get_data())
    creativeobject = array_articles
    id = creativeobject.lista_articles[len(creativeobject.lista_articles) - 1].id + 1
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    articleSection = decoded['articleSection']
    pagination = decoded['pagination']
    wordCount = decoded['wordCount']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None or articleSection is None or pagination is None or wordCount is None:
        resp = make_response('Hay campos nulos', 404)
        return resp
    elif not isinstance(name, str):
        resp = make_response('name no es string', 404)
        return resp
    elif not isinstance(isFamilyFriendly, bool):
        resp = make_response('isFamilyFriendly no es boolean', 404)
        return resp
    elif not isinstance(isAccessibleForFree,bool):
        resp = make_response('isAccessibleForFree no es boolean', 404)
        return resp
    elif not isinstance(version, int):
        resp = make_response('version no es int', 404)
        return resp
    elif not isinstance(copyrightYear, int):
        resp = make_response('copyrightYear no es int', 404)
        return resp
    elif not isinstance(articleSection, str):
        resp = make_response('articleSection no es str', 404)
        return resp
    elif not isinstance(pagination, str):
        resp = make_response('pagination no es str', 404)
        return resp
    elif not isinstance(wordCount, int):
        resp = make_response('wordCount no es int', 404)
        return resp
    else:
        creative = Article(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version, articleSection,
                           pagination, wordCount)
        creativeobject.add_article(creative)
        return str(id)


@routes.route('/<int:number>', methods=['PUT'])
def putarticle(number):
    decoded = json.loads(request.get_data())
    creativeobject = array_articles
    id = number
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    articleSection = decoded['articleSection']
    pagination = decoded['pagination']
    wordCount = decoded['wordCount']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None or articleSection is None or pagination is None or wordCount is None:
        resp = make_response('Hay campos nulos', 404)
        return resp
    elif not isinstance(name, str):
        resp = make_response('name no es string', 404)
        return resp
    elif not isinstance(isFamilyFriendly, bool):
        resp = make_response('isFamilyFriendly no es boolean', 404)
        return resp
    elif not isinstance(isAccessibleForFree,bool):
        resp = make_response('isAccessibleForFree no es boolean', 404)
        return resp
    elif not isinstance(version, int):
        resp = make_response('version no es int', 404)
        return resp
    elif not isinstance(copyrightYear, int):
        resp = make_response('copyrightYear no es int', 404)
        return resp
    elif not isinstance(articleSection, str):
        resp = make_response('articleSection no es str', 404)
        return resp
    elif not isinstance(pagination, str):
        resp = make_response('pagination no es str', 404)
        return resp
    elif not isinstance(wordCount, int):
        resp = make_response('wordCount no es int', 404)
        return resp
    else:
        creative = Article(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version, articleSection,
                           pagination, wordCount)
        if creativeobject.update_article(creative, id):
            resp = make_response('Modificado', 200)
            return resp
        resp = make_response('No existe ese id', 404)
        return resp


@routes.route('', methods=['GET'])
def getallarticle():
    creativeobjectlist = array_articles.get_lista_article()
    valor = (request.headers["Accept"]) == 'application/ld+json'
    if valor:
        auxiliar = [{'@context': 'http://schema.org', '@type': 'Article', 'id': v.id, 'name': v.name, 'isFamilyFriendly': v.isFamilyFriendly,
                     'isAccessibleForFree': v.isAccessibleForFree,
                     'copyrightYear': v.copyrightYear, 'version': v.version, 'articleSection': v.articleSection,
                     'pagination': v.pagination, 'wordCount': v.wordCount} for v in creativeobjectlist]
        return json.dumps(auxiliar)
    else:
        auxiliar = "<ul>"
        for i in range(0, len(creativeobjectlist)):
            auxiliar = '{0} <li>{1} {2} {3} {4} {5} {6} {7} {8} {9}</li>'.format(auxiliar,
                                                                                 str(creativeobjectlist[i].id),
                                                                                 str(creativeobjectlist[i].name),
                                                                                 str(creativeobjectlist[i].isFamilyFriendly),
                                                                                 str(creativeobjectlist[i].isAccessibleForFree),
                                                                                 str(creativeobjectlist[i].copyrightYear),
                                                                                 str(creativeobjectlist[i].version),
                                                                                 str(creativeobjectlist[i].articleSection),
                                                                                 str(creativeobjectlist[i].pagination),
                                                                                 str(creativeobjectlist[i].wordCount))
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