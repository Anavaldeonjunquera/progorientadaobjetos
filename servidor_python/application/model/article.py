from application.model.creativework import CreativeWork

__author__ = 'Ana Maria Valdeon'


class Article(CreativeWork):
    def __init__(self, id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version, articleSection, pagination, wordCount):
        super().__init__(id, name, isFamilyFriendly, isAccessibleForFree, copyrightYear, version)
        self.articleSection = articleSection
        self.pagination = pagination
        self.wordCount = wordCount
