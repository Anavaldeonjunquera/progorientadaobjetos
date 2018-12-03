__author__ = 'Ana Maria Valdeon'


class CreativeWork:
    def __init__(self, id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version):
        self.id = id
        self.name = name
        self.isFamilyFriendly = isFamilyFriendly
        self.isAccessibleForFree = isAccessibleForFree
        self.copyrightYear = copyrightYear
        self.version = version