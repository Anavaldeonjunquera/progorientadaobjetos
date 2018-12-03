class Article extends CreativeWork{
    update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version,articleSection,pagination,wordCount){
        super.update(id,name,isFamilyFriendly,isAccessibleForFree,copyrightYear,version)
        this.articleSection=articleSection;
        this.pagination=pagination;
        this.wordCount=wordCount;
    }
}