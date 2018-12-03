from flask import json, Blueprint, request
from ..model import array_creative_works
from ..model import CreativeWork
from flask import make_response
from flask_cors import CORS

__author__ = 'Ana Maria Valdeon'

routes = Blueprint('creativework', __name__, url_prefix='/creativework')

CORS(routes)    # enable CORS for the API blueprint


@routes.route('/<int:number>', methods=['GET'])
def creativework(number):
    creativelist = array_creative_works.lista
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "CreativeWork",
                'id': creativelist[x].id,
                'name': creativelist[x].name,
                'isFamilyFriendly': creativelist[x].isFamilyFriendly,
                'isAccessibleForFree': creativelist[x].isAccessibleForFree,
                'copyrightYear': creativelist[x].copyrightYear,
                'version': creativelist[x].version

            })
    resp = make_response('No se encuentra', 404)
    return resp


@routes.route('/<int:number>', methods=['DELETE'])
def borracreativework(number):
    creativelist = array_creative_works.lista
    for x in range(0, len(creativelist)):
        if creativelist[x].id == number:
            del creativelist[x]
            resp = make_response('Borrado', 200)
            return resp
    resp = make_response('No encontrado', 404)
    return resp


@routes.route('', methods=['POST'])
def postcreativework():
    decoded = json.loads(request.get_data())
    creativeobject = array_creative_works
    id = creativeobject.lista[len(creativeobject.lista)-1].id + 1
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None:
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
    else:
        creative = CreativeWork(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version)
        creativeobject.add_creativework(creative)
        return str(id)


@routes.route('/<int:number>', methods=['PUT'])
def putcreativework(number):
    decoded = json.loads(request.get_data())
    creativeobject = array_creative_works
    id = number
    name = decoded['name']
    isFamilyFriendly = decoded['isFamilyFriendly']
    isAccessibleForFree = decoded['isAccessibleForFree']
    version = decoded['version']
    copyrightYear = decoded['copyrightYear']
    if id is None or name is None or isFamilyFriendly is None or isAccessibleForFree is None or version is None or copyrightYear is None:
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
    else:
        creative = CreativeWork(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version)
        if creativeobject.update_creativework(creative, id):
            resp = make_response('Modificado', 200)
            return resp
        resp = make_response('No existe ese id', 404)
        return resp


@routes.route('', methods=['GET'])
def getallarticle():
    creativeobjectlist = array_creative_works.get_lista_creativework()
    valor = (request.headers["Accept"]) == 'application/ld+json'
    if valor:
        auxiliar = [{'@context': 'http://schema.org', '@type': 'CreativeWork', 'id': v.id, 'name': v.name, 'isFamilyFriendly': v.isFamilyFriendly,
                     'isAccessibleForFree': v.isAccessibleForFree,
                     'copyrightYear': v.copyrightYear, 'version': v.version} for v in creativeobjectlist]
        return json.dumps(auxiliar)
    else:
        auxiliar = "<ul>"
        for i in range(0, len(creativeobjectlist)):
            auxiliar = '{0} <li>{1} {2} {3} {4} {5} {6}</li>'.format(auxiliar,
                                                                                 str(creativeobjectlist[i].id),
                                                                                 str(creativeobjectlist[i].name),
                                                                                 str(creativeobjectlist[i].isFamilyFriendly),
                                                                                 str(creativeobjectlist[i].isAccessibleForFree),
                                                                                 str(creativeobjectlist[i].copyrightYear),
                                                                                 str(creativeobjectlist[i].version))
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